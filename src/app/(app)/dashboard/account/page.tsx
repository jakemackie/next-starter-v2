import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";

export default async function AccountPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const account = await prisma.users.findUnique({
    where: {
      uid: user?.id
    },
    select: {
      firstName: true,
      lastName: true,
    }
  });

  const fullName = {
    firstName: account?.firstName || 'Guest',
    lastName: account?.lastName || ''
  };

  return (
    <div>
      <p>
        Welcome back, {fullName?.firstName || 'Guest'} {fullName?.lastName || ''}
      </p>
    </div>
  );
}