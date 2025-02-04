import { Banner } from '@/components/global/misc/banner';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Toaster } from '@/components/ui/sonner';

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative">
      {/* Gradient background with grain */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e520,#6b5baf20,#4f46e520)] blur-3xl" />
      </div>

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
      <div className="w-full mx-auto max-w-2xl lg:max-w-screen-lg px-4 lg:px-0 pt-10">
        {children}
      </div>
      <Toaster />
    </main>
  );
}
