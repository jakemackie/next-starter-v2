'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { prisma } from '@/lib/prisma';
import { registerSchema } from '@/schemas/register';

export async function register(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
  };

  try {
    registerSchema.parse(data);
  } catch (error) {
    throw new Error((error as string) || 'An unknown error occurred');
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp(data);

  if (error || !user) {
    throw new Error(error?.message || 'An unknown error occurred');
  }

  try {
    await prisma.users.create({
      data: {
        uid: user.id,
        email: user.email!,
        profile: {
          create: {
            isPublic: true,
            isVerified: false,
            showEmail: false,
          },
        },
      },
    });
  } catch (error) {
    throw new Error((error as string) || 'An unknown error occurred');
  }

  revalidatePath('/', 'layout');
}
