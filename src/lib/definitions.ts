export type User = {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
};

export type Room = {
  id: string;
  roomNumber: string;
  type: 'Single' | 'Double' | 'Suite' | 'Deluxe';
  price: number;
  isAvailable: boolean;
};

export type Booking = {
  id: string;
  userId: string;
  roomId: string;
  checkInDate: Date;
  checkOutDate: Date;
  status: 'Confirmed' | 'Completed' | 'Cancelled' | 'Paid';
};
