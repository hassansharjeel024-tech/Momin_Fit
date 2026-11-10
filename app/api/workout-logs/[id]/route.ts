import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';
import { prisma, withDbRetry } from '@/lib/prisma';

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  // Filtering by userId means users can only delete their own entries.
  const result = await withDbRetry(() =>
    prisma.workoutLog.deleteMany({ where: { id: params.id, userId: session.user.id } })
  );
  if (result.count === 0) {
    return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}