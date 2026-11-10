'use client';

import { useState } from 'react';
import { Loader2, Plus, Trash2 } from 'lucide-react';

import { Alert, AlertDescription } from '@/components/ui/shadcn/alert';
import { Button } from '@/components/ui/shadcn/button';
import { Input } from '@/components/ui/shadcn/input';
import { Label } from '@/components/ui/shadcn/label';
import { Textarea } from '@/components/ui/shadcn/textarea';

export type WorkoutLogEntry = {
  id: string;
  exerciseName: string | null;
  durationMinutes: number | null;
  notes: string | null;
};

type WorkoutLogPanelProps = {
  initialDate: string;
  maxDate: string;
  initialEntries: WorkoutLogEntry[];
};

const fieldClassName =
  'h-11 rounded-lg border-stone-700 bg-stone-900 text-stone-100 placeholder:text-stone-500 focus-visible:ring-amber-400/60';

async function fetchDay(day: string): Promise<WorkoutLogEntry[]> {
  const response = await fetch(`/api/workout-logs?date=${encodeURIComponent(day)}`);
  if (!response.ok) throw new Error('Could not load this day.');
  const data = await response.json();
  return data.entries;
}

export function WorkoutLogPanel({ initialDate, maxDate, initialEntries }: WorkoutLogPanelProps) {
  const [date, setDate] = useState(initialDate);
  const [entries, setEntries] = useState<WorkoutLogEntry[]>(initialEntries);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingDay, setIsLoadingDay] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function loadDay(day: string) {
    setDate(day);
    setError(null);
    setIsLoadingDay(true);
    try {
      setEntries(await fetchDay(day));
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Could not load this day.');
    } finally {
      setIsLoadingDay(false);
    }
  }

  async function handleAdd(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setError(null);
    setIsSaving(true);
    try {
      const response = await fetch('/api/workout-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date,
          exerciseName: data.get('exerciseName'),
          durationMinutes: Number(data.get('durationMinutes')),
          notes: data.get('notes') || undefined,
        }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok) {
        setError(result?.error ?? 'Could not save this entry. Please try again.');
        return;
      }
      form.reset();
      setEntries(await fetchDay(date));
    } catch {
      setError('Could not reach the server. Check your connection and try again.');
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(id: string) {
    setError(null);
    setDeletingId(id);
    try {
      const response = await fetch(`/api/workout-logs/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        setError('Could not delete this entry. Please try again.');
        return;
      }
      setEntries((current) => current.filter((entry) => entry.id !== id));
    } catch {
      setError('Could not reach the server. Check your connection and try again.');
    } finally {
      setDeletingId(null);
    }
  }

  const totalMinutes = entries.reduce((sum, entry) => sum + (entry.durationMinutes ?? 0), 0);

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      <section className="h-fit rounded-2xl border border-stone-800 bg-stone-900/60 p-6">
        <h2 className="font-serif text-2xl text-stone-50">Add a workout</h2>
        <form onSubmit={handleAdd} className="mt-6 space-y-5">
          {error && (
            <Alert variant="destructive" role="alert">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="log-date" className="text-stone-300">
              Day
            </Label>
            <Input
              id="log-date"
              type="date"
              value={date}
              max={maxDate}
              onChange={(event) => {
                if (event.target.value) loadDay(event.target.value);
              }}
              className={fieldClassName}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="exerciseName" className="text-stone-300">
              Exercise
            </Label>
            <Input
              id="exerciseName"
              name="exerciseName"
              placeholder="e.g. Brisk walk, Push-ups"
              maxLength={80}
              required
              className={fieldClassName}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="durationMinutes" className="text-stone-300">
              Duration <span className="text-stone-500">(minutes)</span>
            </Label>
            <Input
              id="durationMinutes"
              name="durationMinutes"
              type="number"
              inputMode="numeric"
              min={1}
              max={300}
              required
              className={fieldClassName}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-stone-300">
              Note <span className="text-stone-500">(optional)</span>
            </Label>
            <Textarea
              id="notes"
              name="notes"
              maxLength={300}
              rows={3}
              className="rounded-lg border-stone-700 bg-stone-900 text-stone-100 placeholder:text-stone-500 focus-visible:ring-amber-400/60"
            />
          </div>
          <Button
            type="submit"
            disabled={isSaving}
            className="h-11 w-full rounded-lg bg-amber-400 font-semibold text-stone-950 hover:bg-amber-300"
          >
            {isSaving ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <Plus className="h-4 w-4" aria-hidden="true" />
            )}
            <span className="ml-2">{isSaving ? 'Saving...' : 'Add to log'}</span>
          </Button>
        </form>
      </section>

      <section className="space-y-4" aria-live="polite">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-serif text-2xl text-stone-50">
            {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
          </h2>
          <p className="text-sm text-stone-400">{totalMinutes} minutes in total</p>
        </div>

        {isLoadingDay ? (
          <p className="rounded-xl border border-dashed border-stone-800 p-8 text-center text-sm text-stone-500">
            Loading this day...
          </p>
        ) : entries.length === 0 ? (
          <p className="rounded-xl border border-dashed border-stone-800 p-8 text-center text-sm text-stone-500">
            Nothing logged for this day yet.
          </p>
        ) : (
          <ul className="space-y-3">
            {entries.map((entry) => (
              <li
                key={entry.id}
                className="flex items-start justify-between gap-4 rounded-xl border border-stone-800 bg-stone-900/60 p-4 transition-colors hover:border-stone-700"
              >
                <div className="min-w-0 space-y-1">
                  <p className="font-medium text-stone-100">{entry.exerciseName}</p>
                  <p className="text-sm text-amber-300">{entry.durationMinutes} min</p>
                  {entry.notes && (
                    <p className="whitespace-pre-line break-words text-sm text-stone-400">
                      {entry.notes}
                    </p>
                  )}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(entry.id)}
                  disabled={deletingId === entry.id}
                  aria-label={`Delete ${entry.exerciseName}`}
                  className="shrink-0 text-stone-400 hover:bg-red-950/40 hover:text-red-300"
                >
                  {deletingId === entry.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  )}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}