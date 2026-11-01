'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { PasswordField } from '@/components/ui/PasswordField';
import { Alert } from '@/components/ui/Alert';
import { isValidEmail, isNonEmpty } from '@/lib/validation';

export function AdminLoginForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState<{ email?: string; password?: string }>({});
  const [touched, setTouched] = React.useState<{ email?: boolean; password?: boolean }>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [info, setInfo] = React.useState(false);

  const validateField = (field: 'email' | 'password', val: string) => {
    if (field === 'email') {
      if (!isNonEmpty(val) || !isValidEmail(val)) return 'Enter a valid email address.';
    }
    if (field === 'password') {
      if (!isNonEmpty(val)) return 'Password is required.';
    }
    return undefined;
  };

  const validateAll = () => {
    const e = {
      email: validateField('email', email),
      password: validateField('password', password),
    };
    setErrors(e);
    return !e.email && !e.password;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!validateAll()) return;
    setSubmitting(true);
    // TODO: Connect NextAuth admin sign-in here.
    window.setTimeout(() => {
      setSubmitting(false);
      setInfo(true);
    }, 1200);
  };

  return (
    <>
      <span className="inline-flex items-center gap-2 rounded-full border border-bronze/40 bg-surface px-3 py-1 text-xs font-medium text-sand">
        Trainer / Admin
      </span>

      <div className="mt-4" />

      {info && (
        <Alert tone="info" className="mb-5">
          Demo only: authentication is not connected yet.
        </Alert>
      )}
      {(errors.email || errors.password) && (
        <div role="alert" className="mb-5">
          <Alert tone="error">{[errors.email, errors.password].filter(Boolean).join(' ')}</Alert>
        </div>
      )}

      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
        <TextField
          id="email"
          label="Email"
          type="email"
          value={email}
          onChange={(v) => {
            setEmail(v);
            if (touched.email) setErrors((p) => ({ ...p, email: validateField('email', v) }));
          }}
          onBlur={() => {
            setTouched((p) => ({ ...p, email: true }));
            setErrors((p) => ({ ...p, email: validateField('email', email) }));
          }}
          error={touched.email ? errors.email : undefined}
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          required
        />
        <PasswordField
          id="password"
          label="Password"
          value={password}
          onChange={(v) => {
            setPassword(v);
            if (touched.password) setErrors((p) => ({ ...p, password: validateField('password', v) }));
          }}
          onBlur={() => {
            setTouched((p) => ({ ...p, password: true }));
            setErrors((p) => ({ ...p, password: validateField('password', password) }));
          }}
          error={touched.password ? errors.password : undefined}
          autoComplete="current-password"
          required
        />
        <Button type="submit" size="lg" disabled={submitting} className="mt-1 w-full">
          {submitting ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin-slow rounded-full border-2 border-ink/30 border-t-ink" />
              Logging in…
            </span>
          ) : (
            'Log in'
          )}
        </Button>
      </form>

      <p className="mt-6 text-sm text-taupe">
        <Link href="/login" className="font-medium text-sand hover:text-caramel transition-colors">
          Back to user login
        </Link>
      </p>
    </>
  );
}