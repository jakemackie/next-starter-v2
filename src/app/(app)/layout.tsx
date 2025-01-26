import { SidebarProvider } from '@/components/ui/sidebar';
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
      <main className="flex-1 my-2 mx-2 md:ml-0 p-4 rounded-lg bg-border border">
        {children}
        <Toaster />
      </main>
    </SidebarProvider>
  );
}
