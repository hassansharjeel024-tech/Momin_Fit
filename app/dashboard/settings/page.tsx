import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { ProfileForm } from '@/components/profile/ProfileForm';
import { authOptions } from '@/lib/auth';
import { prisma, withDbRetry } from '@/lib/prisma';
import { toProfileValues } from '@/lib/profile';

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');

  const profile = await withDbRetry(() =>
    prisma.fitnessProfile.findUnique({ where: { userId: session.user.id } })
  );

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-2">
        <h1 className="font-serif text-3xl leading-tight text-stone-50 sm:text-4xl">Your profile</h1>
        <p className="text-sm leading-relaxed text-stone-400">
          Update your details any time. Your plan will use the newest values.
        </p>
      </header>
      <ProfileForm mode="settings" initial={toProfileValues(profile)} />
    </div>
  );
}