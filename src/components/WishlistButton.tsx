import { Heart } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { classNames } from '@/utils/format';

interface WishlistButtonProps {
  productId: string;
  className?: string;
  size?: number;
}

export default function WishlistButton({ productId, className, size = 20 }: WishlistButtonProps) {
  const { wishlist, toggleWishlist } = useStore();
  const isWishlisted = wishlist.includes(productId);

  return (
    <button
      type="button"
      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(productId);
      }}
      className={classNames(
        'flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95',
        className
      )}
    >
      <Heart
        size={size}
        strokeWidth={1.5}
        className={classNames(
          'transition-all duration-200',
          isWishlisted ? 'fill-accent-500 text-accent-500 animate-pop' : 'text-ink-700 hover:text-ink-900'
        )}
      />
    </button>
  );
}
