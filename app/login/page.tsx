import type { Metadata } from 'next';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { LoginForm } from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Log in',
  description: 'Log in to MominFit to continue your plan.',
};

export default function LoginPage() {
  return (
    <AuthLayout title="Welcome back" subtitle="Log in to continue your plan.">
      <LoginForm />
    </AuthLayout>
  );
}
