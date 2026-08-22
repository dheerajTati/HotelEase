
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BedDouble, Calendar, Wifi, Shield } from 'lucide-react';
import Logo from '@/components/logo';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import HomeHeaderNav from '@/components/home-header-nav';

export default function Home() {
  const galleryImages = [
    { src: 'https://picsum.photos/800/600?random=1', alt: 'Hotel Pool', hint: 'hotel pool' },
    { src: 'https://picsum.photos/800/600?random=2', alt: 'Hotel Restaurant', hint: 'hotel restaurant' },
    { src: 'https://picsum.photos/800/600?random=3', alt: 'Deluxe Suite', hint: 'hotel suite' },
    { src: 'https://picsum.photos/800/600?random=4', alt: 'Hotel Gym', hint: 'hotel gym' },
    { src: 'https://picsum.photos/800/600?random=5', alt: 'Lobby Area', hint: 'hotel lobby' },
    { src: 'https://picsum.photos/800/600?random=6', alt: 'Ocean View', hint: 'ocean view' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
            <span className="font-bold">HotelEase</span>
          </Link>
          <HomeHeaderNav />
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[400px] rounded-lg overflow-hidden m-4">
          <Image
            src="https://picsum.photos/1200/400"
            alt="Beautiful hotel view"
            fill
            objectFit="cover"
            className="brightness-75"
            data-ai-hint="hotel exterior"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4 bg-black/30">
            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Welcome to HotelEase</h1>
            <p className="text-lg md:text-xl max-w-2xl mb-8">
              Your ultimate destination for comfort and luxury. Explore our world-class amenities and book your dream stay.
            </p>
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/dashboard/rooms">
                Find a Room <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 md:px-6 my-12">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex-row items-center gap-4">
                <BedDouble className="w-10 h-10 text-primary" />
                <div>
                  <CardTitle>Luxury Rooms</CardTitle>
                  <CardDescription>Elegantly designed for your comfort.</CardDescription>
                </div>
              </CardHeader>
            </Card>
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex-row items-center gap-4">
                <Calendar className="w-10 h-10 text-primary" />
                <div>
                  <CardTitle>Easy Booking</CardTitle>
                  <CardDescription>Reserve your stay in just a few clicks.</CardDescription>
                </div>
              </CardHeader>
            </Card>
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex-row items-center gap-4">
                <Wifi className="w-10 h-10 text-primary" />
                <div>
                  <CardTitle>Free High-Speed WiFi</CardTitle>
                  <CardDescription>Stay connected throughout the hotel.</CardDescription>
                </div>
              </CardHeader>
            </Card>
          </div>
        </section>
        
        {/* Gallery Section */}
        <section className="my-12">
          <h2 className="text-3xl font-bold tracking-tight font-headline mb-6 text-center">Explore Our Hotel</h2>
          <Carousel opts={{ loop: true }} className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {galleryImages.map((image, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                         <Image
                          src={image.src}
                          alt={image.alt}
                          width={400}
                          height={300}
                          className="aspect-[4/3] w-full object-cover"
                          data-ai-hint={image.hint}
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>
      </main>

      <footer className="py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <div className="container mx-auto flex justify-between items-center">
          <p className="text-xs text-muted-foreground">&copy; 2024 HotelEase. All rights reserved.</p>
          <nav className="flex gap-4">
            <Link href="#" className="text-xs hover:underline underline-offset-4 text-muted-foreground">
              Terms of Service
            </Link>
            <Link href="#" className="text-xs hover:underline underline-offset-4 text-muted-foreground">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
