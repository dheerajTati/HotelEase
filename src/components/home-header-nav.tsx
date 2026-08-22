
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UserNav } from '@/components/user-nav';
import { Shield } from 'lucide-react';

export default function HomeHeaderNav() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <nav className="flex items-center space-x-6 text-sm font-medium ml-auto">
      <Link
        href="/dashboard"
        className="transition-colors hover:text-foreground/80 text-foreground/60"
      >
        Dashboard
      </Link>
      <Button variant="outline" asChild>
        <Link href="/admin">
          Admin Panel <Shield className="ml-2 h-4 w-4" />
        </Link>
      </Button>
      {user ? (
        <UserNav />
      ) : (
        <Button asChild>
          <Link href="/login">Sign In</Link>
        </Button>
      )}
    </nav>
  );
}
