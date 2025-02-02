import { Banner } from '@/components/global/misc/banner';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Toaster } from '@/components/ui/sonner';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Banner>
        <span className="w-full text-center lg:text-left text-muted-foreground">
          {/* Mobile text */}
          <span className="inline lg:hidden">Keep up to date. </span>

          {/* Desktop text */}
          <span className="hidden lg:inline">
            See the latest changes being developed for this template.{' '}
          </span>
          <Link
            href="/"
            className="inline-flex ml-2 items-center gap-2 text-primary-foreground group"
          >
            View changelog
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 duration-300 ease-in-out" />
          </Link>
        </span>
      </Banner>
      <div className="w-full mx-auto max-w-screen-lg">{children}</div>
      <Toaster />
    </main>
  );
}
