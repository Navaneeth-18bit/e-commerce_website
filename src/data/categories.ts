import type { Category } from '@/types';

export interface CategoryInfo {
  slug: Category;
  label: string;
  description: string;
  image: string;
}

export const categories: CategoryInfo[] = [
  {
    slug: 'new-arrivals',
    label: 'New Arrivals',
    description: 'Just landed',
    image: 'https://images.pexels.com/photos/37741914/pexels-photo-37741914.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    slug: 'oversized',
    label: 'Oversized',
    description: 'Relaxed & boxy',
    image: 'https://images.pexels.com/photos/30685578/pexels-photo-30685578.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    slug: 'casual',
    label: 'Casual',
    description: 'Everyday essentials',
    image: 'https://images.pexels.com/photos/37070444/pexels-photo-37070444.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    slug: 'formal',
    label: 'Formal',
    description: 'Sharp & tailored',
    image: 'https://images.pexels.com/photos/23879365/pexels-photo-23879365.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    slug: 'linen',
    label: 'Linen',
    description: 'Breathable & light',
    image: 'https://images.pexels.com/photos/22441297/pexels-photo-22441297.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    slug: 'premium',
    label: 'Premium',
    description: 'Crafted to last',
    image: 'https://images.pexels.com/photos/255311/pexels-photo-255311.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    slug: 'sale',
    label: 'Sale',
    description: 'Up to 40% off',
    image: 'https://images.pexels.com/photos/10952730/pexels-photo-10952730.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

export function getCategoryBySlug(slug: string): CategoryInfo | undefined {
  return categories.find((c) => c.slug === slug);
}
