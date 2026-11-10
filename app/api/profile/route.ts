import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';
import { prisma, withDbRetry } from '@/lib/prisma';
import { profileSchema } from '@/lib/schemas';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const profile = await withDbRetry(() =>
    prisma.fitnessProfile.findUnique({ where: { userId: session.user.id } })
  );
  return NextResponse.json({ profile });
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json().catch(() => null);
  const parsed = profileSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? 'Invalid input' },
      { status: 400 }
    );
  }

  const profile = await withDbRetry(() =>
    prisma.fitnessProfile.upsert({
      where: { userId: session.user.id },
      create: { ...parsed.data, userId: session.user.id },
      update: parsed.data,
    })
  );
  return NextResponse.json({ profile });
}