import { Link } from 'react-router-dom';
import { Heart, Plus } from 'lucide-react';
import type { Product } from '@/types';
import { useStore } from '@/store/StoreContext';
import { formatPrice, classNames } from '@/utils/format';
import Rating from './Rating';
import WishlistButton from './WishlistButton';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart, setCartOpen } = useStore();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id, product.sizes[1] || 'M', product.colors[0].name, 1);
    setCartOpen(true);
  };

  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group block animate-fade-up"
      style={{ animationDelay: `${(index % 8) * 50}ms` }}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-cream-200">
        <img
          src={primaryImage}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover:opacity-0 group-hover:scale-105"
        />
        <img
          src={secondaryImage}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isNewArrival && (
            <span className="bg-ink-900 px-2.5 py-1 text-2xs font-medium uppercase tracking-widest text-cream-50">
              New
            </span>
          )}
          {product.discountPercentage >= 30 && (
            <span className="bg-accent-500 px-2.5 py-1 text-2xs font-medium uppercase tracking-widest text-cream-50">
              {product.discountPercentage}% Off
            </span>
          )}
        </div>

        {/* Wishlist */}
        <div className="absolute right-3 top-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cream-50/90 backdrop-blur-sm transition-opacity duration-200">
            <WishlistButton productId={product.id} size={18} />
          </div>
        </div>

        {/* Quick Add */}
        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="flex w-full items-center justify-center gap-2 bg-ink-900/95 px-4 py-3 text-2xs font-medium uppercase tracking-widest text-cream-50 backdrop-blur-sm transition-colors hover:bg-ink-800"
          >
            <Plus size={14} strokeWidth={2} />
            Quick Add
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 space-y-1">
        <p className="label-xs">{product.brand}</p>
        <h3 className="text-sm font-medium text-ink-900 line-clamp-1">{product.name}</h3>
        <div className="flex items-center gap-2">
          <Rating value={product.rating} count={product.reviewCount} showCount={false} />
        </div>
        <div className="flex items-baseline gap-2 pt-0.5">
          <span className="text-sm font-semibold text-ink-900">{formatPrice(product.discountPrice)}</span>
          <span className="text-xs text-ink-400 line-through">{formatPrice(product.price)}</span>
          <span className={classNames('text-2xs font-medium text-accent-500')}>
            {product.discountPercentage}% Off
          </span>
        </div>
        {/* Color dots */}
        <div className="flex items-center gap-1.5 pt-1">
          {product.colors.slice(0, 4).map((color) => (
            <span
              key={color.name}
              className="h-3 w-3 rounded-full border border-ink-200"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-2xs text-ink-400">+{product.colors.length - 4}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
