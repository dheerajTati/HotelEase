import DashboardLayout from '@/components/dashboard-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, Building } from 'lucide-react';

export default function SupportPage() {
  return (
    <DashboardLayout>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Contact Support</CardTitle>
          <CardDescription>We're here to help. Reach out to us with any questions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-4">
            <Mail className="h-6 w-6 text-primary mt-1" />
            <div>
              <h3 className="font-semibold">Email Us</h3>
              <p className="text-muted-foreground">For general inquiries and support.</p>
              <a href="mailto:support@hotelele.com" className="text-primary hover:underline">
                support@hotelele.com
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Phone className="h-6 w-6 text-primary mt-1" />
            <div>
              <h3 className="font-semibold">Call Us</h3>
              <p className="text-muted-foreground">Available 24/7 for urgent matters.</p>
              <a href="tel:+911234567890" className="text-primary hover:underline">
                +91 123 456 7890
              </a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Building className="h-6 w-6 text-primary mt-1" />
            <div>
              <h3 className="font-semibold">Our Address</h3>
              <p className="text-muted-foreground">123 Luxury Lane, Dream City, India</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
