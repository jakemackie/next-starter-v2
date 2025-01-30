import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  ChevronUp,
  ChevronDown,
  MessageCircleQuestion as FAQ,
  Send as Feedback,
  User2,
  Home,
  MessageSquareText,
} from 'lucide-react';

import Link from 'next/link';
import { FeedbackDialog } from '@/components/global/dialogs/feedback-dialog';

export function AppSidebar() {
  const topLevelNavItems = [
    { title: 'Home', url: '/dashboard', icon: Home },
    { title: 'FAQs', url: '/dashboard/faq', icon: FAQ },
  ];

  const helpNavItems = [
    {
      title: 'Feedback',
      icon: Feedback,
      dialog: true,
    },
    {
      title: 'Contact',
      icon: MessageSquareText,
      url: '/dashboard/contact',
    }
  ];

  return (
    <Sidebar variant="floating">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {topLevelNavItems.map((navItem) => (
                <SidebarMenuItem key={navItem.title}>
                  <SidebarMenuButton asChild>
                    <a href={navItem.url}>
                      <navItem.icon />
                      <span>{navItem.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                Help
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {helpNavItems.map((navItem) => (
                    <SidebarMenuItem key={navItem.title}>
                      {navItem.dialog ? (
                        <FeedbackDialog>
                          <SidebarMenuButton>
                            <navItem.icon />
                            <span>{navItem.title}</span>
                          </SidebarMenuButton>
                        </FeedbackDialog>
                      ) : (
                        <SidebarMenuButton asChild>
                          <a href={navItem.url}>
                            <navItem.icon />
                            <span>{navItem.title}</span>
                          </a>
                        </SidebarMenuButton>
                      )}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <Link href="/dashboard/account">
                  <DropdownMenuItem className="cursor-pointer">
                    <span>Account</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <Link href="/logout">
                  <DropdownMenuItem className="cursor-pointer">
                    <span>Logout</span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
