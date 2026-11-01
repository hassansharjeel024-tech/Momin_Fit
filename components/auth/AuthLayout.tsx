import * as React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { CheckIcon, ArrowLeftIcon } from '@/components/icons';

const bullets = [
  'Prayer-time-aware schedule',
  'Reminders and missed-day record',
  'Free AI assistant with safety rules',
];

export function AuthLayout({
  children,
  title,
  subtitle,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-12">
      {/* Brand panel — desktop only */}
      <aside className="lattice-radial relative hidden flex-col justify-between border-r border-line/60 p-10 lg:flex lg:col-span-5 xl:col-span-5">
        <div>
          <Link href="/" aria-label="MominFit home">
            <Logo />
          </Link>
        </div>
        <div className="max-w-sm">
          <p className="font-display text-3xl font-bold leading-tight text-cream xl:text-4xl">
            Consistent fitness, built around your faith.
          </p>
          <ul className="mt-8 space-y-4">
            {bullets.map((b) => (
              <li key={b} className="flex items-center gap-3 text-base text-taupe">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-bronze/30 bg-surface text-caramel">
                  <CheckIcon width={16} height={16} />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-mute">© 2026 MominFit</p>
      </aside>

      {/* Form area */}
      <div className="flex flex-col lg:col-span-7 xl:col-span-7">
        {/* Mobile top bar */}
        <div className="flex items-center justify-between border-b border-line/60 bg-coal px-5 py-3.5 lg:hidden">
          <Link href="/" aria-label="MominFit home">
            <Logo />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-taupe transition-colors hover:text-cream min-h-[44px] px-2"
          >
            <ArrowLeftIcon width={16} height={16} />
            Back to home
          </Link>
        </div>

        <main className="flex flex-1 items-center justify-center px-5 py-10 sm:px-6 lg:px-8">
          <div className="w-full max-w-[440px]">
            <h1 className="font-display text-[28px] font-bold text-cream sm:text-[32px]">
              {title}
            </h1>
            <p className="mt-2 text-base text-taupe">{subtitle}</p>
            <div className="mt-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
