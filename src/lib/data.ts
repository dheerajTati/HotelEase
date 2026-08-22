import type { User, Room, Booking } from './definitions';

export const users: User[] = [
  { id: '1', name: 'Admin User', email: 'admin@hotelele.com', role: 'admin' },
  { id: '2', name: 'John Doe', email: 'john.doe@example.com', role: 'user' },
  { id: '3', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'user' },
];

export const rooms: Room[] = [
  { id: '101', roomNumber: '101', type: 'Single', price: 800, isAvailable: true },
  { id: '102', roomNumber: '102', type: 'Single', price: 150, isAvailable: false },
  { id: '103', roomNumber: '103', type: 'Single', price: 750, isAvailable: true },
  { id: '104', roomNumber: '104', type: 'Single', price: 850, isAvailable: true },
  { id: '201', roomNumber: '201', type: 'Double', price: 1500, isAvailable: true },
  { id: '202', roomNumber: '202', type: 'Deluxe', price: 1749, isAvailable: true },
  { id: '203', roomNumber: '203', type: 'Double', price: 1400, isAvailable: true },
  { id: '204', roomNumber: '204', type: 'Double', price: 1600, isAvailable: true },
  { id: '301', roomNumber: '301', type: 'Suite', price: 450, isAvailable: false },
  { id: '302', roomNumber: '302', type: 'Suite', price: 2099, isAvailable: true },
  { id: '303', roomNumber: '303', type: 'Suite', price: 2500, isAvailable: true },
];

const today = new Date();
export const bookings: Booking[] = [
  {
    id: 'b1',
    userId: '2',
    roomId: '102',
    checkInDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5),
    checkOutDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2),
    status: 'Completed',
  },
  {
    id: 'b2',
    userId: '3',
    roomId: '301',
    checkInDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1),
    checkOutDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
    status: 'Confirmed',
  },
   {
    id: 'b3',
    userId: '2',
    roomId: '201',
    checkInDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7),
    checkOutDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10),
    status: 'Paid',
  },
];
