'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { Alert, AlertDescription } from '@/components/ui/shadcn/alert';
import { Button } from '@/components/ui/shadcn/button';
import { Input } from '@/components/ui/shadcn/input';
import { Label } from '@/components/ui/shadcn/label';
import { cn } from '@/lib/utils';
import {
  EQUIPMENT_LABELS,
  EQUIPMENT_OPTIONS,
  FITNESS_LEVELS,
  GOAL_LABELS,
  GOALS,
  LEVEL_LABELS,
} from '@/lib/schemas';
import type { ProfileValues } from '@/lib/profile';

type ProfileFormProps = {
  mode: 'onboarding' | 'settings';
  initial: ProfileValues | null;
};

type FormState = {
  age: string;
  heightCm: string;
  weightKg: string;
  goal: ProfileValues['goal'] | null;
  fitnessLevel: ProfileValues['fitnessLevel'] | null;
  equipment: ProfileValues['equipment'];
  timezone: string;
};

function browserTimeZone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

function toFormState(initial: ProfileValues | null): FormState {
  if (!initial) {
    return {
      age: '',
      heightCm: '',
      weightKg: '',
      goal: null,
      fitnessLevel: null,
      equipment: [],
      timezone: '',
    };
  }
  return {
    age: String(initial.age),
    heightCm: String(initial.heightCm),
    weightKg: String(initial.weightKg),
    goal: initial.goal,
    fitnessLevel: initial.fitnessLevel,
    equipment: initial.equipment,
    timezone: initial.timezone,
  };
}

function toggleEquipment(
  current: ProfileValues['equipment'],
  option: (typeof EQUIPMENT_OPTIONS)[number]
): ProfileValues['equipment'] {
  if (option === 'none') return current.includes('none') ? [] : ['none'];
  const withoutNone = current.filter((item) => item !== 'none');
  return withoutNone.includes(option)
    ? withoutNone.filter((item) => item !== option)
    : [...withoutNone, option];
}

const optionButtonClass =
  'rounded-xl border px-4 py-3 text-left text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60';
const selectedClass = 'border-amber-400 bg-amber-400/10 text-amber-100';
const unselectedClass = 'border-stone-700 bg-stone-900 text-stone-300 hover:border-stone-500';

export function ProfileForm({ mode, initial }: ProfileFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(() => toFormState(initial));
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!initial) setForm((current) => ({ ...current, timezone: browserTimeZone() }));
  }, [initial]);

  const allTimeZones = getTimeZones();
  const timeZoneOptions =
    form.timezone && !allTimeZones.includes(form.timezone)
      ? [form.timezone, ...allTimeZones]
      : allTimeZones;

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setSaved(false);
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSaved(false);

    if (!form.goal || !form.fitnessLevel) {
      setError('Choose a goal and a fitness level.');
      return;
    }
    if (form.equipment.length === 0) {
      setError('Choose at least one equipment option.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          age: Number(form.age),
          heightCm: Number(form.heightCm),
          weightKg: Number(form.weightKg),
          goal: form.goal,
          fitnessLevel: form.fitnessLevel,
          equipment: form.equipment,
          timezone: form.timezone,
        }),
      });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setError(data?.error ?? 'Could not save your profile. Please try again.');
        return;
      }

      if (mode === 'onboarding') {
        router.push('/dashboard');
        router.refresh();
        return;
      }
      setSaved(true);
      router.refresh();
    } catch {
      setError('Could not reach the server. Check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      {error && (
        <Alert variant="destructive" role="alert">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {saved && (
        <Alert role="status" className="border-emerald-700 bg-emerald-950/40 text-emerald-200">
          <AlertDescription>Your profile is saved.</AlertDescription>
        </Alert>
      )}

      <section className="space-y-4">
        <h2 className="font-serif text-xl text-stone-50">About you</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <NumberField
            id="age"
            label="Age"
            unit="years"
            value={form.age}
            onChange={(value) => update('age', value)}
          />
          <NumberField
            id="heightCm"
            label="Height"
            unit="cm"
            value={form.heightCm}
            onChange={(value) => update('heightCm', value)}
          />
          <NumberField
            id="weightKg"
            label="Weight"
            unit="kg"
            step="0.1"
            value={form.weightKg}
            onChange={(value) => update('weightKg', value)}
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-xl text-stone-50">Your goal</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {GOALS.map((goal) => (
            <button
              key={goal}
              type="button"
              aria-pressed={form.goal === goal}
              onClick={() => update('goal', goal)}
              className={cn(
                optionButtonClass,
                form.goal === goal ? selectedClass : unselectedClass
              )}
            >
              {GOAL_LABELS[goal]}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-xl text-stone-50">Fitness level</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {FITNESS_LEVELS.map((level) => (
            <button
              key={level}
              type="button"
              aria-pressed={form.fitnessLevel === level}
              onClick={() => update('fitnessLevel', level)}
              className={cn(
                optionButtonClass,
                form.fitnessLevel === level ? selectedClass : unselectedClass
              )}
            >
              {LEVEL_LABELS[level]}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="font-serif text-xl text-stone-50">Equipment you have</h2>
          <p className="mt-1 text-sm text-stone-400">Select all that apply.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {EQUIPMENT_OPTIONS.map((option) => {
            const selected = form.equipment.includes(option);
            return (
              <button
                key={option}
                type="button"
                aria-pressed={selected}
                onClick={() => update('equipment', toggleEquipment(form.equipment, option))}
                className={cn(
                  'rounded-full border px-4 py-2 text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60',
                  selected ? selectedClass : unselectedClass
                )}
              >
                {EQUIPMENT_LABELS[option]}
              </button>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="timezone" className="font-serif text-xl text-stone-50">
            Time zone
          </Label>
          <p className="text-sm text-stone-400">
            Your days start and end in this time zone. We detected it from your browser.
          </p>
        </div>
        <select
          id="timezone"
          value={form.timezone}
          onChange={(event) => update('timezone', event.target.value)}
          className="h-11 w-full rounded-lg border border-stone-700 bg-stone-900 px-3 text-sm text-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
        >
          {timeZoneOptions.map((zone) => (
            <option key={zone} value={zone}>
              {zone}
            </option>
          ))}
        </select>
      </section>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full rounded-lg bg-amber-400 text-base font-semibold text-stone-950 hover:bg-amber-300 sm:w-auto sm:px-10"
      >
        {isSubmitting ? 'Saving...' : mode === 'onboarding' ? 'Save and continue' : 'Save changes'}
      </Button>
    </form>
  );
}

function getTimeZones(): string[] {
  const intl = Intl as typeof Intl & { supportedValuesOf?: (key: string) => string[] };
  return intl.supportedValuesOf ? intl.supportedValuesOf('timeZone') : [];
}

function NumberField({
  id,
  label,
  unit,
  step,
  value,
  onChange,
}: {
  id: string;
  label: string;
  unit: string;
  step?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-stone-300">
        {label} <span className="text-stone-500">({unit})</span>
      </Label>
      <Input
        id={id}
        type="number"
        inputMode="decimal"
        step={step ?? '1'}
        required
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 rounded-lg border-stone-700 bg-stone-900 text-stone-100 focus-visible:ring-amber-400/60"
      />
    </div>
  );
}