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

  // Validate the input
  try {
    registerSchema.parse(data);
  } catch (error) {
    throw new Error((error as string) || 'An unknown error occurred');
  }

  // Sign up with Supabase
  const {
    data: { user },
    error,
  } = await supabase.auth.signUp(data);

  if (error || !user) {
    throw new Error(error?.message || 'An unknown error occurred');
  }

  console.log('Registration - Supabase user:', {
    id: user.id,
    email: user.email,
    emailConfirmed: user.email_confirmed_at,
  });

  try {
    // Create the user record in Prisma
    const prismaUser = await prisma.users.create({
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
    console.log('Registration - Created Prisma user:', prismaUser);
  } catch (error) {
    console.error('Registration - Prisma creation error:', error);
    throw new Error((error as string) || 'An unknown error occurred');
  }

  revalidatePath('/', 'layout');
  redirect('/verify-email');
}
