import DashboardLayout from '@/components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { bookings, rooms, users } from '@/lib/data';
import { format } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';

export default function ManageBookingsPage() {

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
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight font-headline">All Bookings</h1>
        <p className="text-muted-foreground">View and manage all customer bookings.</p>
      </div>
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Guest</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => {
                const room = rooms.find(r => r.id === booking.roomId);
                const user = users.find(u => u.id === booking.userId);
                
                return (
                  <TableRow key={booking.id}>
                    <TableCell>
                        <div className="font-medium">{user?.name}</div>
                        <div className="text-sm text-muted-foreground">{user?.email}</div>
                    </TableCell>
                    <TableCell>{room?.type} - {room?.roomNumber}</TableCell>
                    <TableCell>
                        {format(booking.checkInDate, 'MMM d, yyyy')} - {format(booking.checkOutDate, 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(booking.status) as any}>{booking.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                        <DropdownMenuItem>Mark as Confirmed</DropdownMenuItem>
                        <DropdownMenuItem>Mark as Paid</DropdownMenuItem>
                        <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Cancel Booking</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    </TableCell>
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
