import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { AppShell } from '@/components/dashboard/AppShell';
import { authOptions } from '@/lib/auth';
import { prisma, withDbRetry } from '@/lib/prisma';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  const profile = await withDbRetry(() =>
    prisma.fitnessProfile.findUnique({
      where: { userId: session.user.id },
      select: { id: true },
    })
  );
  if (!profile) redirect('/onboarding');

  return (
    <AppShell userName={session.user.name ?? session.user.email ?? 'Friend'}>{children}</AppShell>
  );
}