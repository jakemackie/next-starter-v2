import { Banner } from '@/components/global/misc/banner';
import { Toaster } from '@/components/ui/sonner';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Banner>Click me</Banner>
      <div className="w-full mx-auto max-w-screen-lg">{children}</div>
      <Toaster />
    </main>
  );
}
