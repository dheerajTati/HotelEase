
'use client'

import DashboardLayout from '@/components/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { rooms, users, bookings } from '@/lib/data';
import { Users, Bed, CalendarCheck, DollarSign, BookOpen } from 'lucide-react';
import AnalyticsSummary from '@/components/admin/analytics-summary';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { eachDayOfInterval, format, startOfMonth, endOfMonth } from 'date-fns';

export default function AdminDashboardPage() {
  const totalRooms = rooms.length;
  const roomsBookedToday = bookings.filter(
    (b) => new Date(b.checkInDate).toDateString() === new Date().toDateString()
  ).length;
  const totalUsers = users.length;
  const upcomingCheckIns = bookings.filter(
    (b) => b.checkInDate > new Date() && b.status !== 'Cancelled'
  ).length;

  const analyticsData = {
    totalRooms,
    roomsBookedToday,
    totalUsers,
    upcomingCheckIns,
  };

  // Calculate total bookings and revenue
  const totalBookings = bookings.filter(b => b.status !== 'Cancelled').length;
  const totalRevenue = bookings.reduce((acc, booking) => {
    if (booking.status === 'Cancelled') return acc;
    const room = rooms.find(r => r.id === booking.roomId);
    if (!room) return acc;
    const nights = (booking.checkOutDate.getTime() - booking.checkInDate.getTime()) / (1000 * 3600 * 24);
    return acc + (nights * room.price);
  }, 0);

  // Prepare data for the chart
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const monthlyBookings = daysInMonth.map(day => {
    const formattedDate = format(day, 'MMM d');
    const dailyBookings = bookings.filter(b => {
      const checkIn = new Date(b.checkInDate);
      return format(checkIn, 'MMM d') === formattedDate && b.status !== 'Cancelled';
    });
    return {
      date: formattedDate,
      bookings: dailyBookings.length,
    };
  });
  
  const chartConfig = {
    bookings: {
      label: "Bookings",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Admin Dashboard</h1>
          <p className="text-muted-foreground">Overview of your hotel's performance.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalBookings}</div>
              <p className="text-xs text-muted-foreground">All-time confirmed bookings.</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">All-time generated revenue.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers}</div>
              <p className="text-xs text-muted-foreground">Total registered users.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Rooms</CardTitle>
              <Bed className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRooms}</div>
              <p className="text-xs text-muted-foreground">Total rooms available in the hotel.</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
           <Card>
            <CardHeader>
              <CardTitle className="font-headline">Bookings This Month</CardTitle>
              <CardDescription>A summary of new bookings for the current month.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[250px] w-full">
                <BarChart data={monthlyBookings} accessibilityLayer>
                   <CartesianGrid vertical={false} />
                   <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 6)}
                  />
                   <YAxis tickLine={false} axisLine={false} tickMargin={8} allowDecimals={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="bookings" fill="var(--color-bookings)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
          <AnalyticsSummary data={analyticsData} />
        </div>
      </div>
    </DashboardLayout>
  );
}
