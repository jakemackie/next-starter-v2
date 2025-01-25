'use client';

import { useForm } from 'react-hook-form';
import { logout } from '@/actions/user/account/logout';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Form } from '@/components/ui/form';

type FormData = {
  confirm: boolean;
};

export default function SignOutPage() {
  const form = useForm<FormData>({
    defaultValues: {
      confirm: false,
    },
  });

  async function onSubmit(values: FormData) {
    if (values.confirm) {
      try {
        await logout();
        toast.success('Signed out successfully');
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error('An unknown error occurred');
        }
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <p>Are you sure you want to sign out?</p>
        <div>
          <label>
            <input type="checkbox" {...form.register('confirm')} />I confirm
          </label>
        </div>
        <Button
          type="submit"
          disabled={form.formState.isSubmitting || !form.formState.isValid}
        >
          {form.formState.isSubmitting ? 'Signing out...' : 'Sign Out'}
        </Button>
      </form>
    </Form>
  );
}
