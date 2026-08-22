
'use client'
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DashboardLayout from '@/components/dashboard-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Users, BedDouble, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { rooms } from '@/lib/data';
import type { Room } from '@/lib/definitions';

export default function RoomsPage() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 3)),
  });

  const getBookingUrl = (roomId: string) => {
    if (!date?.from || !date?.to) return '#';
    const from = date.from.toISOString();
    const to = date.to.toISOString();
    return `/dashboard/rooms/book?roomId=${roomId}&from=${from}&to=${to}`;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">Find Your Perfect Room</h1>
            <p className="text-muted-foreground">Select your dates to see available rooms.</p>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className="w-full md:w-[300px] justify-start text-left font-normal shadow-sm"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rooms.filter(room => room.isAvailable).map((room: Room) => (
            <Card key={room.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-56 w-full">
                <Image 
                  src={`https://picsum.photos/400/300?random=${room.id}`} 
                  alt={room.type} 
                  width={400}
                  height={300}
                  className="object-cover w-full h-full"
                  data-ai-hint="hotel room"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline">{room.type} Room - {room.roomNumber}</CardTitle>
                <CardDescription>A perfect choice for your stay.</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <BedDouble className="h-4 w-4" />
                        <span>{room.type}</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{room.type === 'Single' ? '1-2 Guests' : '2-4 Guests'}</span>
                    </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between bg-secondary/30 p-4">
                <p className="text-xl font-bold">₹{room.price}<span className="text-sm font-normal text-muted-foreground">/night</span></p>
                <Button asChild className="bg-accent hover:bg-accent/90">
                  <Link href={getBookingUrl(room.id)}>
                    Book Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
