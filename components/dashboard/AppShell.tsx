'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { LogOut } from 'lucide-react';

import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Log', href: '/dashboard/log' },
  { label: 'Schedule', href: null },
  { label: 'Progress', href: null },
  { label: 'Assistant', href: null },
  { label: 'Settings', href: '/dashboard/settings' },
];

export function AppShell({ userName, children }: { userName: string; children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-stone-950">
      <header className="sticky top-0 z-30 border-b border-stone-800 bg-stone-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link href="/dashboard" className="font-serif text-xl text-amber-300">
            MominFit
          </Link>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-stone-400 sm:inline">{userName}</span>
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="inline-flex items-center gap-2 rounded-lg border border-stone-700 px-3 py-2 text-sm text-stone-300 transition-colors hover:border-stone-500 hover:text-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60"
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
        <nav aria-label="App sections" className="mx-auto max-w-6xl overflow-x-auto px-4 sm:px-6">
          <ul className="flex gap-1 pb-2">
            {NAV_ITEMS.map((item) => {
              const active = item.href !== null && pathname === item.href;
              const baseClass = 'whitespace-nowrap rounded-lg px-3 py-2 text-sm transition-colors';
              if (!item.href) {
                return (
                  <li key={item.label}>
                    <span
                      aria-disabled="true"
                      className={cn(baseClass, 'cursor-not-allowed text-stone-600')}
                    >
                      {item.label}
                      <span className="ml-2 text-[10px] uppercase tracking-wider text-stone-600">
                        Soon
                      </span>
                    </span>
                  </li>
                );
              }
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      baseClass,
                      active
                        ? 'bg-amber-400/15 font-medium text-amber-200'
                        : 'text-stone-400 hover:bg-stone-900 hover:text-stone-100'
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">{children}</main>
    </div>
  );
}