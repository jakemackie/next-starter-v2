'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DialogClose } from '@/components/ui/dialog';
import { useRef } from 'react';
import { Icons } from '@/components/icons/icon';

const feedbackSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  feedback: z.string().min(10, 'Feedback must be at least 10 characters'),
});

type FormData = z.infer<typeof feedbackSchema>;

export function FeedbackForm() {
  const closeRef = useRef<HTMLButtonElement>(null);
  const form = useForm<FormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      feedback: '',
    },
  });

  async function onSubmit(values: FormData) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    alert('Thank you for your feedback!');
    closeRef.current?.click();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:space-x-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your first name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your last name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="feedback"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Feedback</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your feedback..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="hidden">
          <DialogClose ref={closeRef} />
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting || !form.formState.isValid}
        >
          {form.formState.isSubmitting ? (
            <>
              <Icons.Spinner />
              Submitting...
            </>
          ) : (
            'Submit Feedback!'
          )}
        </Button>
      </form>
    </Form>
  );
}
