import type { Metadata } from 'next';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { RegisterForm } from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Create your account',
  description: 'Create a free MominFit account.',
};

export default function RegisterPage() {
  return (
    <AuthLayout title="Create your account" subtitle="It's free.">
      <RegisterForm />
    </AuthLayout>
  );
}
