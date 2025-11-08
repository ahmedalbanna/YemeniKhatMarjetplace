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
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

const navLinks = [
    { href: '/customer', label: 'نظرة عامة', icon: Home },
    { href: '/customer/wallet', label: 'المحفظة', icon: Package },
    { href: '/customer/orders', label: 'طلبات', icon: ClipboardList },
    { href: '/customer/profile', label: 'الملف التعريفي', icon: BarChart3 },
];

export function CustomerSidebar() {
    const pathname = usePathname();
    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/');
    };

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
                        <SidebarMenuButton tooltip="تسجيل الخروج" onClick={handleLogout}>
                            <LogOut />
                            <span>تسجيل الخروج</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </>
    );
}
