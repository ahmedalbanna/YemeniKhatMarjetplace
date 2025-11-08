'use client';

import {
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarSeparator
} from '@/components/ui/sidebar';
import { BarChart3, ClipboardList, Home, Leaf, LogOut, Package, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
    { href: '/vendor/dashboard', label: 'نظرة عامة', icon: Home },
    { href: '/vendor/products', label: 'المنتجات', icon: Package },
    { href: '/vendor/quotes', label: 'طلبات الأسعار', icon: ClipboardList },
    { href: '/vendor/inventory', label: 'الجرد والسجلات', icon: BarChart3 },
];

export function VendorSidebar() {
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
                                    <link.icon />
                                    <span>{link.label}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
                <SidebarSeparator />
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="الإعدادات">
                            <Settings />
                            <span>الإعدادات</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip="تسجيل الخروج" asChild>
                            <Link href="/login">
                                <LogOut />
                                <span>تسجيل الخروج</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </>
    );
}
