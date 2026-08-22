
'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import DashboardLayout from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { rooms } from '@/lib/data';
import { differenceInCalendarDays, format } from 'date-fns';
import { ArrowLeft, CheckCircle, CalendarDays, BedDouble, Users, IndianRupee } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { bookings } from '@/lib/data';

function BookingConfirmation() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  const roomId = searchParams.get('roomId');
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  const room = rooms.find(r => r.id === roomId);

  if (!room || !from || !to) {
    return (
      <DashboardLayout>
        <Card>
          <CardHeader>
            <CardTitle>Booking Not Found</CardTitle>
            <CardDescription>The booking details are incomplete. Please select a room and dates again.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push('/dashboard/rooms')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Rooms
            </Button>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  const checkInDate = new Date(from);
  const checkOutDate = new Date(to);
  const nights = differenceInCalendarDays(checkOutDate, checkInDate);
  const total = nights * room.price;

  const handleConfirmBooking = () => {
    // This is a mock booking creation
    const newBooking = {
      id: `b${bookings.length + 1}`,
      userId: '2', // Mocked user ID
      roomId: room.id,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      status: 'Confirmed' as const,
    };
    bookings.push(newBooking);
    
    // Update room availability
    const roomToUpdate = rooms.find(r => r.id === roomId);
    if(roomToUpdate) {
        roomToUpdate.isAvailable = false;
    }
    
    toast({
      title: "Booking Confirmed!",
      description: `Your booking for ${room.type} Room from ${format(checkInDate, 'PPP')} to ${format(checkOutDate, 'PPP')} is confirmed.`,
    });
    router.push('/dashboard/bookings');
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <Card className="overflow-hidden shadow-xl">
          <div className="md:flex">
            <div className="md:w-1/2">
              <Image
                src={`https://picsum.photos/600/400?random=${room.id}`}
                alt={room.type}
                width={600}
                height={400}
                className="object-cover w-full h-full"
                data-ai-hint="hotel room"
              />
            </div>
            <div className="md:w-1/2">
              <CardHeader>
                <CardTitle className="text-3xl font-headline">Confirm Your Booking</CardTitle>
                <CardDescription>Review the details below before confirming your stay.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold">{room.type} Room - {room.roomNumber}</h3>
                  <div className="flex items-center gap-4 text-muted-foreground mt-2">
                    <span className="flex items-center gap-1"><BedDouble className="w-4 h-4" /> {room.type}</span>
                    <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {room.type === 'Single' ? '1-2 Guests' : '2-4 Guests'}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="flex items-start gap-2">
                     <CalendarDays className="w-5 h-5 mt-1 text-primary" />
                     <div>
                        <p className="font-semibold">Check-in</p>
                        <p className="text-muted-foreground">{format(checkInDate, 'eee, MMM d, yyyy')}</p>
                     </div>
                  </div>
                   <div className="flex items-start gap-2">
                     <CalendarDays className="w-5 h-5 mt-1 text-primary" />
                     <div>
                        <p className="font-semibold">Check-out</p>
                        <p className="text-muted-foreground">{format(checkOutDate, 'eee, MMM d, yyyy')}</p>
                     </div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                    <div className="flex justify-between items-center font-semibold">
                        <span>{nights} night{nights > 1 ? 's' : ''}</span>
                        <span>₹{total.toFixed(2)}</span>
                    </div>
                     <p className="text-sm text-muted-foreground">Taxes and fees included</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" onClick={handleConfirmBooking}>
                  <CheckCircle className="mr-2 h-5 w-5" /> Confirm and Book
                </Button>
              </CardFooter>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}


export default function BookingPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BookingConfirmation />
        </Suspense>
    )
}
