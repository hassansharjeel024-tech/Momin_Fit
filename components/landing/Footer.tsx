import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';

const links = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Log in', href: '/login' },
  { label: 'Register', href: '/register' },
];

export function Footer() {
  return (
    <footer className="bg-ink py-12">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <Link href="/" aria-label="MominFit home">
              <Logo />
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-taupe">
              Consistent fitness, built around your faith.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-3" aria-label="Footer">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-taupe transition-colors hover:text-cream"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 border-t border-line/60 pt-6">
          <p className="text-xs leading-relaxed text-mute">
            General fitness information only. Not medical advice or a religious ruling.
          </p>
          <div className="mt-3 flex flex-col gap-1 text-xs text-mute sm:flex-row sm:justify-between">
            <span>Semester project — SCD Fall 2026, Section 5A</span>
            <span>© 2026 MominFit</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
