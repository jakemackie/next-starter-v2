import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/global/navigation/sidebar';
import { Toaster } from '@/components/ui/sonner';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 my-2 mx-2 md:ml-0 py-2 md:p-4 rounded-lg bg-border/30 border">
        <div className="md:hidden border-b border-secondary px-2 pb-2">
          <SidebarTrigger />
        </div>
        <div className="p-4 md:p-0">{children}</div>
        <Toaster />
      </main>
    </SidebarProvider>
  );
}
