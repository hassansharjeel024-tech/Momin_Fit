import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { WorkoutLogPanel } from '@/components/dashboard/WorkoutLogPanel';
import { authOptions } from '@/lib/auth';
import { prisma, withDbRetry } from '@/lib/prisma';
import { dayToDbDate, localDateString } from '@/lib/time';

export default async function LogPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');
  const userId = session.user.id;

  const profile = await withDbRetry(() =>
    prisma.fitnessProfile.findUnique({ where: { userId }, select: { timezone: true } })
  );
  const today = localDateString(profile?.timezone ?? 'UTC');

  const entries = await withDbRetry(() =>
    prisma.workoutLog.findMany({
      where: { userId, logDate: dayToDbDate(today) },
      orderBy: { createdAt: 'asc' },
      select: { id: true, exerciseName: true, durationMinutes: true, notes: true },
    })
  );

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="font-serif text-3xl leading-tight text-stone-50 sm:text-4xl">Workout log</h1>
        <p className="text-sm text-stone-400">Record what you did, and remove anything logged by mistake.</p>
      </header>
      <WorkoutLogPanel initialDate={today} maxDate={today} initialEntries={entries} />
    </div>
  );
}