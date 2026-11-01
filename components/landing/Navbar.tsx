'use client';

import * as React from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { MenuIcon, CloseIcon } from '@/components/icons';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Assistant', href: '#assistant' },
  { label: 'FAQ', href: '#faq' },
];

export function Navbar() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-ink/80 backdrop-blur-md">
      <Container>
        <nav className="flex items-center justify-between py-3.5">
          <Link href="/" aria-label="MominFit home">
            <Logo />
          </Link>

          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-taupe transition-colors hover:text-cream"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Button as="link" href="/login" variant="ghost" size="md">
              Log in
            </Button>
            <Button as="link" href="/register" variant="primary" size="md">
              Get started
            </Button>
          </div>

          <button
            type="button"
            className="rounded-lg p-2 text-cream md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-surface-raised transition-colors"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? (
              <CloseIcon width={24} height={24} />
            ) : (
              <MenuIcon width={24} height={24} />
            )}
          </button>
        </nav>
      </Container>

      {open && (
        <div
          id="mobile-menu"
          className="border-t border-line/60 bg-coal md:hidden"
        >
          <Container>
            <div className="flex flex-col gap-1 py-4">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-cream hover:bg-surface-raised transition-colors min-h-[44px]"
                >
                  {l.label}
                </a>
              ))}
              <div className="mt-2 flex flex-col gap-2 border-t border-line/60 pt-3">
                <Button as="link" href="/login" variant="secondary" size="md" className="w-full">
                  Log in
                </Button>
                <Button as="link" href="/register" variant="primary" size="md" className="w-full">
                  Get started
                </Button>
              </div>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}