import type { Order, Coupon } from '@/types';

export const mockOrders: Order[] = [
  {
    id: 'ORD-847291',
    date: '2025-08-09',
    status: 'shipped',
    items: [
      {
        productId: 'oversized-cotton-essential-shirt',
        name: 'Oversized Cotton Essential Shirt',
        image: 'https://images.pexels.com/photos/37741914/pexels-photo-37741914.jpeg?auto=compress&cs=tinysrgb&w=400',
        size: 'M',
        color: 'Black',
        quantity: 2,
        price: 899,
      },
      {
        productId: 'minimal-stripe-shirt',
        name: 'Minimal Stripe Shirt',
        image: 'https://images.pexels.com/photos/14325513/pexels-photo-14325513.jpeg?auto=compress&cs=tinysrgb&w=400',
        size: 'L',
        color: 'White',
        quantity: 1,
        price: 999,
      },
    ],
    subtotal: 2797,
    discount: 280,
    shipping: 0,
    total: 2517,
    address: {
      fullName: 'Arjun Mehta',
      phone: '+91 98765 43210',
      pincode: '400001',
      addressLine: '12 Marine Drive, Apt 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      type: 'Home',
    },
    paymentMethod: 'UPI',
    estimatedDelivery: '2025-08-13',
  },
  {
    id: 'ORD-847188',
    date: '2025-08-02',
    status: 'delivered',
    items: [
      {
        productId: 'classic-oxford-shirt',
        name: 'Classic Oxford Shirt',
        image: 'https://images.pexels.com/photos/36104301/pexels-photo-36104301.jpeg?auto=compress&cs=tinysrgb&w=400',
        size: 'L',
        color: 'White',
        quantity: 1,
        price: 1399,
      },
    ],
    subtotal: 1399,
    discount: 0,
    shipping: 0,
    total: 1399,
    address: {
      fullName: 'Arjun Mehta',
      phone: '+91 98765 43210',
      pincode: '400001',
      addressLine: '12 Marine Drive, Apt 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      type: 'Home',
    },
    paymentMethod: 'Credit / Debit Card',
    estimatedDelivery: '2025-08-06',
  },
  {
    id: 'ORD-847022',
    date: '2025-07-21',
    status: 'cancelled',
    items: [
      {
        productId: 'relaxed-linen-resort-shirt',
        name: 'Relaxed Linen Resort Shirt',
        image: 'https://images.pexels.com/photos/18153495/pexels-photo-18153495.jpeg?auto=compress&cs=tinysrgb&w=400',
        size: 'M',
        color: 'Sage',
        quantity: 1,
        price: 1599,
      },
    ],
    subtotal: 1599,
    discount: 160,
    shipping: 0,
    total: 1439,
    address: {
      fullName: 'Arjun Mehta',
      phone: '+91 98765 43210',
      pincode: '400001',
      addressLine: '12 Marine Drive, Apt 4B',
      city: 'Mumbai',
      state: 'Maharashtra',
      type: 'Home',
    },
    paymentMethod: 'Cash on Delivery',
    estimatedDelivery: '2025-07-25',
  },
];

export const coupons: Coupon[] = [
  { code: 'NOVA10', type: 'percentage', value: 10, minOrder: 999, description: '10% off on orders above ₹999' },
  { code: 'NOVA20', type: 'percentage', value: 20, minOrder: 2499, description: '20% off on orders above ₹2,499' },
  { code: 'FLAT200', type: 'flat', value: 200, minOrder: 1499, description: '₹200 off on orders above ₹1,499' },
  { code: 'WELCOME15', type: 'percentage', value: 15, minOrder: 0, description: '15% off — first order welcome gift' },
];

export function getCoupon(code: string): Coupon | undefined {
  return coupons.find((c) => c.code.toUpperCase() === code.toUpperCase());
}
