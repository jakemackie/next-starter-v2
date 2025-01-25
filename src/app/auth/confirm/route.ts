import { type EmailOtpType } from '@supabase/supabase-js';
import { type NextRequest } from 'next/server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = searchParams.get('next') ?? '/';

  if (token_hash && type) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (!error && data.user) {
      // Update Prisma user with new ID if needed
      const prismaUser = await prisma.users.findUnique({
        where: {
          email: data.user.email!,
        },
      });

      if (prismaUser && prismaUser.uid !== data.user.id) {
        await prisma.users.update({
          where: { email: data.user.email! },
          data: { uid: data.user.id },
        });
      }

      redirect(next);
    }
  }

  // redirect the user to an error page with some instructions
  redirect('/error');
}
