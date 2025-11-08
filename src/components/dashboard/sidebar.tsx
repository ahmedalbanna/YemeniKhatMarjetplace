'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, Home, Package, ClipboardList, BarChart3, Settings, LogOut } from 'lucide-react';
import { 
    SidebarHeader, 
    SidebarContent, 
    SidebarFooter, 
    SidebarMenu, 
    SidebarMenuItem, 
    SidebarMenuButton, 
    SidebarSeparator 
} from '@/components/ui/sidebar';

const navLinks = [
  { href: '/dashboard', label: 'نظرة عامة', icon: Home },
  { href: '/dashboard/products', label: 'المنتجات', icon: Package },
  { href: '/dashboard/quotes', label: 'طلبات الأسعار', icon: ClipboardList },
  { href: '/dashboard/inventory', label: 'الجرد والسجلات', icon: BarChart3 },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <>
        <SidebarHeader>
            <Link href="/" className="flex items-center gap-2">
                <Leaf className="h-8 w-8 text-primary" />
                <span className="font-bold text-lg font-headline text-sidebar-foreground group-data-[collapsible=icon]:hidden">
                    سوق القات
                </span>
            </Link>
        </SidebarHeader>
        <SidebarContent>
            <SidebarMenu>
                {navLinks.map(link => (
                    <SidebarMenuItem key={link.href}>
                        <SidebarMenuButton
                            asChild
                            isActive={pathname === link.href}
                            tooltip={link.label}
                        >
                            <Link href={link.href}>
                                <link.icon/>
                                <span>{link.label}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <SidebarSeparator/>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton tooltip="الإعدادات">
                        <Settings/>
                        <span>الإعدادات</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton tooltip="تسجيل الخروج" asChild>
                         <Link href="/login">
                            <LogOut/>
                            <span>تسجيل الخروج</span>
                         </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
    </>
  );
}
