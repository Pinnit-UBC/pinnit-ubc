'use client';

import * as React from 'react';
import { Home, Bookmark, Compass, Calendar, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  SidebarProvider,
} from '@/components/ui/sidebar';

const menuItems = [
  { icon: Home, label: 'Home', href: '/dashboard' },
  { icon: Bookmark, label: 'Saved', href: '/dashboard/saved' },
  { icon: Compass, label: 'Explore', href: '/dashboard/explore' },
  { icon: Calendar, label: 'Calendar', href: '/dashboard/calendar' },
];

export default function DashboardSidebar() {
  const [activeItem, setActiveItem] = React.useState('Home');

  return (
    <SidebarProvider>
      <Sidebar className="w-30 bg-gray-100 border-r"> {/* Reduced width to w-48 */}
        {/* Sidebar Header */}
        <SidebarHeader className="p-4 border-b">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder.svg?height=48&width=48" alt="User Avatar" />
            <AvatarFallback>US</AvatarFallback>
          </Avatar>
        </SidebarHeader>

        {/* Sidebar Content */}
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  isActive={activeItem === item.label}
                  onClick={() => setActiveItem(item.label)}
                  tooltip={item.label}
                >
                  <a href={item.href} className="flex items-center gap-4 text-gray-700">
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        {/* Sidebar Footer */}
        <SidebarFooter className="p-4 border-t">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Profile">
                <a href="/dashboard/profile" className="flex items-center gap-4 text-gray-700">
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>

        {/* Sidebar Rail */}
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  );
}
