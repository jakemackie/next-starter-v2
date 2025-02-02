import LoginForm from '@/components/global/forms/login';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';

export default async function LoginPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (!error || data?.user) {
    redirect('/dashboard');
  }

  return <LoginForm />;
}
