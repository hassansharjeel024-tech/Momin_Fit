import type { Metadata } from 'next';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AdminLoginForm } from '@/components/auth/AdminLoginForm';

export const metadata: Metadata = {
  title: 'Trainer / Admin sign in',
  description: 'Trainer and Admin sign in to manage exercises, plan templates and the reviewed motivation list.',
};

export default function AdminLoginPage() {
  return (
    <AuthLayout
      title="Trainer and Admin sign in"
      subtitle="Manage exercises, plan templates and the reviewed motivation list."
    >
      <AdminLoginForm />
    </AuthLayout>
  );
}
