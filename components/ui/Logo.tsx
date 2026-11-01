import * as React from 'react';

export function Logo({
  className = '',
  markColor = 'text-caramel',
  textColor = 'text-cream',
}: {
  className?: string;
  markColor?: string;
  textColor?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        className={markColor}
        aria-hidden="true"
      >
        <rect
          x="2"
          y="2"
          width="24"
          height="24"
          rx="7"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M9 19V9h3.5a2.8 2.8 0 0 1 0 5.6H9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 11.5c0-1 .8-1.5 1.8-1.5s1.7.5 1.7 1.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span className={`font-display text-xl font-bold tracking-tight ${textColor}`}>
        MominFit
      </span>
    </span>
  );
}
