import * as React from 'react';

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'center' | 'left';
  className?: string;
}) {
  const isCenter = align === 'center';
  return (
    <div
      className={`${isCenter ? 'mx-auto text-center' : 'text-left'} max-w-2xl ${className}`}
    >
      {eyebrow && (
        <p className="text-sm font-medium uppercase tracking-[0.14em] text-caramel mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-[28px] leading-tight sm:text-[34px] lg:text-[40px] font-bold text-cream">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-taupe">{description}</p>
      )}
    </div>
  );
}
