import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { ProfileForm } from '@/components/profile/ProfileForm';
import { authOptions } from '@/lib/auth';
import { prisma, withDbRetry } from '@/lib/prisma';

export default async function OnboardingPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  const existing = await withDbRetry(() =>
    prisma.fitnessProfile.findUnique({ where: { userId: session.user.id }, select: { id: true } })
  );
  if (existing) redirect('/dashboard');

  const firstName = (session.user.name ?? '').split(' ')[0];

  return (
    <main className="min-h-screen px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl space-y-10">
        <header className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-widest text-amber-300">Step 1 of 1</p>
          <h1 className="font-serif text-3xl leading-tight text-stone-50 sm:text-4xl">
            {firstName ? `Welcome, ${firstName}.` : 'Welcome.'} Let us learn about you.
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-stone-400">
            These details shape your weekly plan. You can change them later in your profile.
          </p>
        </header>
        <ProfileForm mode="onboarding" initial={null} />
      </div>
    </main>
  );
}