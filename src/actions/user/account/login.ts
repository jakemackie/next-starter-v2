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
    // First, let's check if we can find any users in the database
    const allUsers = await prisma.users.findMany();
    console.log('All users in database:', allUsers);

    // Now try to find our specific user
    const prismaUser = await prisma.users.findUnique({
      where: {
        uid: user.user.id,
      },
    });
    console.log('Found Prisma user:', prismaUser);

    try {
      if (!prismaUser) {
        console.error('User not found in database for uid:', user.user.id);

        // Create a new user in the database
        const newUser = await prisma.users.create({
          data: {
            uid: user.user.id,
            email: data.email, // Assuming you want to store the email
            lastLogin: new Date(),
            // Add any other default values you want to set for a new user
          },
        });
        console.log('New user created:', newUser);
      } else {
        console.log('Updating existing user:', prismaUser.uid);
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
  redirect('/');
}
