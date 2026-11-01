import * as React from 'react';
import { AlertIcon, InfoIcon, CheckIcon } from '@/components/icons';

type Tone = 'error' | 'info' | 'success';

const tones: Record<Tone, { wrap: string; icon: string }> = {
  error: {
    wrap: 'border-danger/40 bg-danger/10 text-danger',
    icon: 'text-danger',
  },
  info: {
    wrap: 'border-caramel/30 bg-caramel/10 text-cream',
    icon: 'text-caramel',
  },
  success: {
    wrap: 'border-success/40 bg-success/10 text-success',
    icon: 'text-success',
  },
};

const iconMap = {
  error: AlertIcon,
  info: InfoIcon,
  success: CheckIcon,
};

export function Alert({
  tone = 'info',
  children,
  className = '',
}: {
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
}) {
  const t = tones[tone];
  const Icon = iconMap[tone];
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${t.wrap} ${className}`}
    >
      <Icon width={18} height={18} className={`mt-0.5 shrink-0 ${t.icon}`} />
      <div className="leading-relaxed">{children}</div>
    </div>
  );
}
