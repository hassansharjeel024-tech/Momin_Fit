import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { ClipboardList, Settings } from 'lucide-react';

import { authOptions } from '@/lib/auth';
import { FITNESS_LEVELS, GOAL_LABELS, GOALS, LEVEL_LABELS } from '@/lib/schemas';
import { prisma, withDbRetry } from '@/lib/prisma';
import { dayToDbDate, localDateString } from '@/lib/time';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');
  const userId = session.user.id;

  const profile = await withDbRetry(() =>
    prisma.fitnessProfile.findUnique({ where: { userId } })
  );
  if (!profile) redirect('/onboarding');

  const today = localDateString(profile.timezone ?? 'UTC');
  const todayEntries = await withDbRetry(() =>
    prisma.workoutLog.findMany({
      where: { userId, logDate: dayToDbDate(today) },
      select: { durationMinutes: true },
    })
  );
  const todayMinutes = todayEntries.reduce((sum, entry) => sum + (entry.durationMinutes ?? 0), 0);

  const firstName = (session.user.name ?? '').split(' ')[0];
  const goalLabel = profile.goal ? GOAL_LABELS[profile.goal as (typeof GOALS)[number]] : 'Not set';
  const levelLabel = profile.fitnessLevel
    ? LEVEL_LABELS[profile.fitnessLevel as (typeof FITNESS_LEVELS)[number]]
    : 'Not set';

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h1 className="font-serif text-3xl leading-tight text-stone-50 sm:text-4xl">
          {firstName ? `Welcome back, ${firstName}.` : 'Welcome back.'}
        </h1>
        <p className="text-sm text-stone-400">Consistent fitness, built around your faith.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="flex flex-col justify-between gap-6 rounded-2xl border border-stone-800 bg-stone-900/60 p-6">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-widest text-stone-500">Today</p>
            <p className="font-serif text-4xl text-amber-200">{todayMinutes} min</p>
            <p className="text-sm text-stone-400">
              {todayEntries.length === 0
                ? 'No workout logged yet today.'
                : `${todayEntries.length} ${todayEntries.length === 1 ? 'entry' : 'entries'} logged today.`}
            </p>
          </div>
          <Link
            href="/dashboard/log"
            className="inline-flex w-fit items-center gap-2 rounded-lg bg-amber-400 px-4 py-2.5 text-sm font-semibold text-stone-950 transition-colors hover:bg-amber-300"
          >
            <ClipboardList className="h-4 w-4" aria-hidden="true" />
            Log a workout
          </Link>
        </section>

        <section className="space-y-5 rounded-2xl border border-stone-800 bg-stone-900/60 p-6">
          <div className="flex items-center justify-between">
            <p className="text-sm uppercase tracking-widest text-stone-500">Your profile</p>
            <Link
              href="/dashboard/settings"
              className="inline-flex items-center gap-1.5 text-sm text-amber-300 transition-colors hover:text-amber-200"
            >
              <Settings className="h-4 w-4" aria-hidden="true" />
              Edit
            </Link>
          </div>
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-stone-500">Goal</dt>
              <dd className="mt-1 text-stone-100">{goalLabel}</dd>
            </div>
            <div>
              <dt className="text-stone-500">Level</dt>
              <dd className="mt-1 text-stone-100">{levelLabel}</dd>
            </div>
            <div>
              <dt className="text-stone-500">Equipment</dt>
              <dd className="mt-1 text-stone-100">
                {profile.equipment.length} {profile.equipment.length === 1 ? 'option' : 'options'}
              </dd>
            </div>
            <div>
              <dt className="text-stone-500">Time zone</dt>
              <dd className="mt-1 break-words text-stone-100">{profile.timezone ?? 'Not set'}</dd>
            </div>
          </dl>
        </section>
      </div>
    </div>
  );
}