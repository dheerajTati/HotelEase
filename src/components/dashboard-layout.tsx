
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { Header } from './header';
import { BarChart, Bed, BookOpen, LayoutDashboard, Settings, Users, Home, LifeBuoy } from 'lucide-react';

interface SidebarNavItem {
  href: string;
  title: string;
  icon: React.ElementType;
}

const userNavItems: SidebarNavItem[] = [
  { href: '/', title: 'Home', icon: Home },
  { href: '/dashboard/rooms', title: 'Rooms', icon: Bed },
  { href: '/dashboard/bookings', title: 'My Bookings', icon: BookOpen },
  { href: '/dashboard/support', title: 'Support', icon: LifeBuoy },
];

const adminNavItems: SidebarNavItem[] = [
  { href: '/admin', title: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/rooms', title: 'Manage Rooms', icon: Bed },
  { href: '/admin/bookings', title: 'All Bookings', icon: BookOpen },
  { href: '/admin/users', title: 'Users', icon: Users },
  { href: '/admin/reports', title: 'Reports', icon: BarChart },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [userRole, setUserRole] = useState<'user' | 'admin' | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserRole(user.role);
    } else {
      router.push('/login');
    }
  }, [router]);

  if (!isClient || !userRole) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  const isUserOnAdminPage = pathname.startsWith('/admin');
  const navItems = isUserOnAdminPage ? adminNavItems : userNavItems;

  return (
    <div className="min-h-screen w-full flex">
      <aside className="fixed top-0 left-0 h-full w-64 border-r bg-background z-50 hidden md:flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold tracking-tight">Navigation</h2>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          {navItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant={pathname === item.href ? 'secondary' : 'ghost'}
              className="justify-start"
            >
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </Link>
            </Button>
          ))}
        </nav>
      </aside>
      <div className="flex flex-col w-full md:pl-64">
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-secondary/40">
          {children}
        </main>
      </div>
    </div>
  );
}
