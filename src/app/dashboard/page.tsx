
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Shield } from 'lucide-react';
import type { User } from '@/lib/definitions';

export default function DashboardHomePage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Welcome Back!</CardTitle>
              <CardDescription>
                We're glad to see you again. You can manage your bookings or find a new room to stay in.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button asChild>
                  <Link href="/dashboard/rooms">
                    Find a Room <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="secondary" asChild>
                  <Link href="/dashboard/bookings">View My Bookings</Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/admin">
                        Admin <Shield className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </DashboardLayout>
  );
}
