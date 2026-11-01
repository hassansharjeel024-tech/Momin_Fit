import * as React from 'react';

export type TextFieldProps = {
  id: string;
  label: string;
  type?: 'text' | 'email';
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string;
  autoComplete?: string;
  inputMode?: 'email' | 'text' | 'numeric';
  placeholder?: string;
  hint?: string;
  required?: boolean;
};

export function TextField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  autoComplete,
  inputMode,
  placeholder,
  hint,
  required,
}: TextFieldProps) {
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
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        required={required}
        className={`w-full rounded-xl bg-surface-raised px-4 py-3 text-base text-cream placeholder:text-mute outline-none transition-colors min-h-[44px] border ${
          error
            ? 'border-danger focus-visible:border-danger'
            : 'border-line focus-visible:border-caramel'
        }`}
      />
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
