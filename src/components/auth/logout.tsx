'use client';

import { useForm } from 'react-hook-form';
import { logout } from '@/actions/user/account/logout';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Form } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormField, FormItem, FormControl } from '@/components/ui/form';
import { useRouter } from 'next/navigation';

const FormSchema = z.object({
  confirm: z.boolean().refine((val) => val === true, {
    message: 'You must confirm to log out',
  }),
});

type FormData = z.infer<typeof FormSchema>;

export default function SignOutPage() {
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      confirm: false,
    },
  });

  async function onSubmit(values: FormData) {
    if (values.confirm) {
      try {
        await logout();
        toast.success('Signed out successfully');
        router.push('/login');
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
        <div className="flex items-center">
          <FormField
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    id="confirm-logout"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <label htmlFor="confirm-logout" className="ml-2">
                  I confirm that I want to log out.
                </label>
              </FormItem>
            )}
          />
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
