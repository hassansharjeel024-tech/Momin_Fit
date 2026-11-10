'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { PasswordField } from '@/components/ui/PasswordField';
import { Alert } from '@/components/ui/Alert';
import { isValidEmail, isNonEmpty } from '@/lib/validation';
import { signIn } from 'next-auth/react';

export function LoginForm() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errors, setErrors] = React.useState<{
    email?: string;
    password?: string;
  }>({});
  const [touched, setTouched] = React.useState<{ email?: boolean; password?: boolean }>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [serverError, setServerError] = React.useState('');

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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    setServerError('');
    if (!validateAll()) return;
    setSubmitting(true);
    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      if (res?.error) {
        setServerError('Invalid email or password.');
        setSubmitting(false);
        return;
      }
      window.location.href = '/';
    } catch {
      setServerError('Network error. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <>
      {serverError && (
        <Alert tone="error" className="mb-5">
          {serverError}
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

      <div className="mt-6 flex flex-col gap-3 text-sm">
        <p className="text-taupe">
          New to MominFit?{' '}
          <Link href="/register" className="font-medium text-sand hover:text-caramel transition-colors">
            Create an account
          </Link>
        </p>
        <p className="text-taupe">
          Trainer or Admin?{' '}
          <Link href="/admin/login" className="font-medium text-sand hover:text-caramel transition-colors">
            Log in here
          </Link>
        </p>
        <Link
          href="/"
          className="inline-flex w-fit items-center gap-1.5 text-mute hover:text-taupe transition-colors"
        >
          Back to home
        </Link>
      </div>
    </>
  );
}