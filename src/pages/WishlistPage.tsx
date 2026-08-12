import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { getProductById } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function WishlistPage() {
  const { wishlist } = useStore();
  const wishlistedProducts = wishlist
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined);

  if (wishlistedProducts.length === 0) {
    return (
      <div className="container-app py-20">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-cream-200">
            <Heart size={40} strokeWidth={1} className="text-ink-400" />
          </div>
          <h1 className="font-display text-3xl font-medium">Your Wishlist is Empty</h1>
          <p className="mt-3 max-w-sm text-sm text-ink-400">
            Save pieces you love and they will appear here.
          </p>
          <Link to="/shop" className="btn-primary mt-8">
            Explore Shirts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-app py-8 lg:py-12">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-medium sm:text-4xl">My Wishlist</h1>
        <p className="mt-2 text-sm text-ink-400">
          {wishlistedProducts.length} {wishlistedProducts.length === 1 ? 'item' : 'items'} saved
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
        {wishlistedProducts.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </div>
  );
}
