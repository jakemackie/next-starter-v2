'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { loginSchema } from '@/schemas/login';
import { prisma } from '@/lib/prisma';

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  try {
    loginSchema.parse(data);
  } catch (error) {
    console.error('Validation error:', error);
    redirect('/error');
  }

  const { data: user, error } = await supabase.auth.signInWithPassword(data);

  if (error || !user) {
    console.error('Login error:', error);
    redirect('/error');
  }

  console.log('Supabase user ID:', user.user.id);

  try {
    const prismaUser = await prisma.users.findUnique({
      where: {
        uid: user.user.id,
      },
    });

    try {
      if (!prismaUser) {
        await prisma.users.create({
          data: {
            uid: user.user.id,
            email: data.email,
            lastLogin: new Date(),
          },
        });
      } else {
        await prisma.users.update({
          where: {
            uid: user.user.id,
          },
          data: {
            lastLogin: new Date(),
          },
        });
      }
    } catch (error) {
      throw new Error((error as string) || 'An unknown error occurred');
    }
  } catch (error) {
    throw new Error((error as string) || 'An unknown error occurred');
  }

  revalidatePath('/', 'layout');
}
