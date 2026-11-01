'use client';

import * as React from 'react';
import { EyeIcon, EyeOffIcon } from '@/components/icons';

type PasswordFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string;
  autoComplete?: 'current-password' | 'new-password';
  hint?: string;
  required?: boolean;
};

export function PasswordField({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  autoComplete = 'current-password',
  hint,
  required,
}: PasswordFieldProps) {
  const [show, setShow] = React.useState(false);
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
    .filter(Boolean)
    .join(' ');
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium text-cream"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy || undefined}
          required={required}
          className={`w-full rounded-xl bg-surface-raised px-4 py-3 pr-12 text-base text-cream placeholder:text-mute outline-none transition-colors min-h-[44px] border ${
            error
              ? 'border-danger focus-visible:border-danger'
              : 'border-line focus-visible:border-caramel'
          }`}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? 'Hide password' : 'Show password'}
          aria-pressed={show}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-2 text-mute hover:text-cream transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          {show ? (
            <EyeOffIcon width={20} height={20} />
          ) : (
            <EyeIcon width={20} height={20} />
          )}
        </button>
      </div>
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-mute">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}