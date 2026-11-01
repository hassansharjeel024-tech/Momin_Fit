import * as React from 'react';
import Link from 'next/link';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'md' | 'lg';

const variants: Record<Variant, string> = {
  primary:
    'bg-caramel text-ink hover:bg-sand font-semibold',
  secondary:
    'bg-transparent text-cream border border-line hover:border-bronze hover:bg-surface-raised',
  ghost: 'bg-transparent text-taupe hover:text-cream hover:bg-surface-raised',
};

const sizes: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm min-h-[44px]',
  lg: 'px-6 py-3 text-base min-h-[44px]',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps & {
  as?: 'button';
  type?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: () => void;
};

type ButtonAsLink = CommonProps & {
  as: 'link';
  href: string;
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = 'primary', size = 'md', className = '', children } = props;
  const cls = `inline-flex items-center justify-center gap-2 rounded-xl transition-colors duration-200 focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-caramel focus-visible:outline-offset-2 disabled:opacity-60 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`;

  if (props.as === 'link') {
    return (
      <Link href={props.href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type={props.type ?? 'button'}
      disabled={props.disabled}
      onClick={props.onClick}
      className={cls}
    >
      {children}
    </button>
  );
}
