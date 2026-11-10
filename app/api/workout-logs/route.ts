import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';
import { prisma, withDbRetry } from '@/lib/prisma';
import { dayParamSchema, workoutLogSchema } from '@/lib/schemas';
import { dayToDbDate, dbDateToDay, localDateString } from '@/lib/time';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const userId = session.user.id;

  const profile = await withDbRetry(() =>
    prisma.fitnessProfile.findUnique({ where: { userId }, select: { timezone: true } })
  );
  const requestedDay = new URL(request.url).searchParams.get('date');

  let day: string;
  if (requestedDay) {
    const parsedDay = dayParamSchema.safeParse(requestedDay);
    if (!parsedDay.success) {
      return NextResponse.json({ error: 'Invalid date' }, { status: 400 });
    }
    day = parsedDay.data;
  } else {
    day = localDateString(profile?.timezone ?? 'UTC');
  }

  const entries = await withDbRetry(() =>
    prisma.workoutLog.findMany({
      where: { userId, logDate: dayToDbDate(day) },
      orderBy: { createdAt: 'asc' },
      select: { id: true, exerciseName: true, durationMinutes: true, notes: true, logDate: true },
    })
  );

  return NextResponse.json({
    date: day,
    entries: entries.map((entry) => ({ ...entry, logDate: dbDateToDay(entry.logDate) })),
  });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json().catch(() => null);
  const parsed = workoutLogSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Invalid input' },
      { status: 400 }
    );
  }

  const entry = await withDbRetry(() =>
    prisma.workoutLog.create({
      data: {
        userId: session.user.id,
        logDate: dayToDbDate(parsed.data.date),
        exerciseName: parsed.data.exerciseName,
        durationMinutes: parsed.data.durationMinutes,
        notes: parsed.data.notes,
      },
      select: { id: true, exerciseName: true, durationMinutes: true, notes: true, logDate: true },
    })
  );

  return NextResponse.json(
    { entry: { ...entry, logDate: dbDateToDay(entry.logDate) } },
    { status: 201 }
  );
}