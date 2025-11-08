'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Leaf, User, Package2, ClipboardList, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'السوق' },
  { href: '/orders', label: 'طلباتي' },
  { href: '/support', label: 'الدعم' },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isDashboard = pathname.startsWith('/dashboard');
  if (isDashboard) return null;


  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link
      href={href}
      className={cn(
        "transition-colors hover:text-foreground",
        pathname === href ? "text-foreground font-semibold" : "text-muted-foreground"
      )}
      onClick={() => setMobileMenuOpen(false)}
    >
      {children}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="ml-6 flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline">سوق القات اليمني</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map(link => <NavLink key={link.href} href={link.href}>{link.label}</NavLink>)}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
           <div className="md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">فتح القائمة</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="pr-0 w-[240px]">
                  <Link
                    href="/"
                    className="mb-4 flex items-center space-x-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Leaf className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline">سوق القات</span>
                  </Link>
                  <div className="flex flex-col space-y-3">
                    {navLinks.map(link => <NavLink key={link.href} href={link.href}>{link.label}</NavLink>)}
                  </div>
                </SheetContent>
              </Sheet>
          </div>
          
          <Link href="/" className="flex items-center space-x-2 md:hidden">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="font-bold font-headline">السوق</span>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">فتح قائمة المستخدم</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>حسابي</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><Link href="/orders"><Package2 className="ml-2 h-4 w-4" />طلباتي</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/dashboard"><LayoutDashboard className="ml-2 h-4 w-4" />لوحة تحكم البائع</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/support">الدعم</Link></DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><Link href="/login">تسجيل الدخول</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link href="/register">إنشاء حساب</Link></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
