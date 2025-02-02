'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

const Banner = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'w-full bg-primary text-background px-4 py-3 text-sm',
        className
      )}
      {...props}
    >
      <span className="mx-auto max-w-screen-lg flex items-center gap-2">
        {children}
      </span>
    </div>
  );
});
Banner.displayName = 'Banner';

export { Banner };
