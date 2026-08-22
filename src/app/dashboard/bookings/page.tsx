import DashboardLayout from '@/components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { bookings, rooms } from '@/lib/data';
import { format } from 'date-fns';

export default function MyBookingsPage() {
  const userBookings = bookings.filter(b => b.userId === '2'); // Mock: assuming user with ID '2' is logged in

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'default';
      case 'Paid':
        return 'secondary';
      case 'Completed':
        return 'outline';
      case 'Cancelled':
        return 'destructive';
      default:
        return 'default';
    }
  };

  return (
    <DashboardLayout>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">My Bookings</CardTitle>
          <CardDescription>View your past and upcoming reservations.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Room</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Check-out</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userBookings.map((booking) => {
                const room = rooms.find(r => r.id === booking.roomId);
                if (!room) return null;
                const nights = (booking.checkOutDate.getTime() - booking.checkInDate.getTime()) / (1000 * 3600 * 24);
                const total = nights * room.price;

                return (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{room.type} - {room.roomNumber}</TableCell>
                    <TableCell>{format(booking.checkInDate, 'PPP')}</TableCell>
                    <TableCell>{format(booking.checkOutDate, 'PPP')}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(booking.status) as any}>{booking.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">₹{total.toFixed(2)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
