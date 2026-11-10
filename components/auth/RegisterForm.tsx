'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { PasswordField } from '@/components/ui/PasswordField';
import { Alert } from '@/components/ui/Alert';
import { isValidEmail, isNonEmpty, isMinLength, passwordsMatch } from '@/lib/validation';

export function RegisterForm() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirm, setConfirm] = React.useState('');
  const [errors, setErrors] = React.useState<{
    name?: string;
    email?: string;
    password?: string;
    confirm?: string;
  }>({});
  const [touched, setTouched] = React.useState<{
    name?: boolean;
    email?: boolean;
    password?: boolean;
    confirm?: boolean;
  }>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [serverError, setServerError] = React.useState('');

  const validateField = (field: 'name' | 'email' | 'password' | 'confirm', val: string) => {
    switch (field) {
      case 'name':
        if (!isNonEmpty(val)) return 'Full name is required.';
        break;
      case 'email':
        if (!isNonEmpty(val) || !isValidEmail(val)) return 'Enter a valid email address.';
        break;
      case 'password':
        if (!isNonEmpty(val)) return 'Password is required.';
        if (!isMinLength(val, 8)) return 'Use at least 8 characters.';
        break;
      case 'confirm':
        if (!isNonEmpty(val)) return 'Passwords do not match.';
        if (!passwordsMatch(password, val)) return 'Passwords do not match.';
        break;
    }
    return undefined;
  };

  const validateAll = () => {
    const e = {
      name: validateField('name', name),
      email: validateField('email', email),
      password: validateField('password', password),
      confirm: validateField('confirm', confirm),
    };
    setErrors(e);
    return !e.name && !e.email && !e.password && !e.confirm;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true, confirm: true });
    setServerError('');
    if (!validateAll()) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setServerError(data.error || 'Something went wrong. Please try again.');
        setSubmitting(false);
        return;
      }
      window.location.href = '/login';
    } catch {
      setServerError('Network error. Please try again.');
      setSubmitting(false);
    }
  };

  const errList = [errors.name, errors.email, errors.password, errors.confirm].filter(Boolean) as string[];

  return (
    <>
      {serverError && (
        <Alert tone="error" className="mb-5">
          {serverError}
        </Alert>
      )}
      {errList.length > 0 && (
        <div role="alert" className="mb-5">
          <Alert tone="error">{errList.join(' ')}</Alert>
        </div>
      )}

      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
        <TextField
          id="name"
          label="Full name"
          value={name}
          onChange={(v) => {
            setName(v);
            if (touched.name) setErrors((p) => ({ ...p, name: validateField('name', v) }));
          }}
          onBlur={() => {
            setTouched((p) => ({ ...p, name: true }));
            setErrors((p) => ({ ...p, name: validateField('name', name) }));
          }}
          error={touched.name ? errors.name : undefined}
          autoComplete="name"
          inputMode="text"
          placeholder="Your full name"
          required
        />
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
            if (touched.confirm) setErrors((p) => ({ ...p, confirm: validateField('confirm', confirm) }));
          }}
          onBlur={() => {
            setTouched((p) => ({ ...p, password: true }));
            setErrors((p) => ({ ...p, password: validateField('password', password) }));
          }}
          error={touched.password ? errors.password : undefined}
          autoComplete="new-password"
          hint="At least 8 characters."
          required
        />
        <PasswordField
          id="confirm"
          label="Confirm password"
          value={confirm}
          onChange={(v) => {
            setConfirm(v);
            if (touched.confirm) setErrors((p) => ({ ...p, confirm: validateField('confirm', v) }));
          }}
          onBlur={() => {
            setTouched((p) => ({ ...p, confirm: true }));
            setErrors((p) => ({ ...p, confirm: validateField('confirm', confirm) }));
          }}
          error={touched.confirm ? errors.confirm : undefined}
          autoComplete="new-password"
          required
        />
        <Button type="submit" size="lg" disabled={submitting} className="mt-1 w-full">
          {submitting ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 animate-spin-slow rounded-full border-2 border-ink/30 border-t-ink" />
              Creating account…
            </span>
          ) : (
            'Create account'
          )}
        </Button>
      </form>

      <p className="mt-4 text-sm text-taupe">
        After signing up you will set up your profile: goal, level, equipment and city.
      </p>
      <p className="mt-2 text-xs text-mute">We collect only the data needed for the features.</p>

      <p className="mt-5 text-sm text-taupe">
        Already have an account?{' '}
        <Link href="/login" className="font-medium text-sand hover:text-caramel transition-colors">
          Log in
        </Link>
      </p>
    </>
  );
}