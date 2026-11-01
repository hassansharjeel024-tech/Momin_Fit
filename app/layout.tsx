import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'MominFit — Consistent fitness, built around your faith',
    template: '%s — MominFit',
  },
  description:
    'MominFit suggests a workout plan, schedules it around prayer times, reminds you when it is time, and answers your fitness questions — free.',
  themeColor: '#0B0907',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-ink text-cream font-sans antialiased">{children}</body>
    </html>
  );
}
