import type { User, Address } from '@/types';

export const mockUser: User = {
  name: 'Arjun Mehta',
  email: 'arjun.mehta@example.com',
  phone: '+91 98765 43210',
  gender: 'Male',
  dob: '1995-03-14',
};

export const mockAddresses: Address[] = [
  {
    fullName: 'Arjun Mehta',
    phone: '+91 98765 43210',
    pincode: '400001',
    addressLine: '12 Marine Drive, Apt 4B',
    city: 'Mumbai',
    state: 'Maharashtra',
    type: 'Home',
  },
  {
    fullName: 'Arjun Mehta',
    phone: '+91 98765 43210',
    pincode: '560001',
    addressLine: '45 Brigade Road, Floor 3',
    city: 'Bengaluru',
    state: 'Karnataka',
    type: 'Work',
  },
];
