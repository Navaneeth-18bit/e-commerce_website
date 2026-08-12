import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { getProductById } from '@/data/products';
import { formatPrice } from '@/utils/format';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartCount,
  } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm animate-fade-in"
        onClick={() => setCartOpen(false)}
      />
      <div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream-50 shadow-xl animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-ink-200 px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} strokeWidth={1.5} />
            <h2 className="text-sm font-medium uppercase tracking-widest">Your Bag</h2>
            <span className="text-xs text-ink-400">({cartCount})</span>
          </div>
          <button onClick={() => setCartOpen(false)} aria-label="Close cart">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Items */}
        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-cream-200">
              <ShoppingBag size={32} strokeWidth={1} className="text-ink-400" />
            </div>
            <p className="font-display text-xl font-medium">Your bag is empty</p>
            <p className="mt-2 text-sm text-ink-400">
              Start exploring our collection and find your next favourite shirt.
            </p>
            <button
              onClick={() => {
                setCartOpen(false);
                navigate('/shop');
              }}
              className="btn-primary mt-6"
            >
              Explore Shirts
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="space-y-5">
                {cart.map((item) => {
                  const product = getProductById(item.productId);
                  if (!product) return null;
                  return (
                    <div
                      key={`${item.productId}-${item.size}-${item.color}`}
                      className="flex gap-4"
                    >
                      <Link
                        to={`/product/${product.slug}`}
                        onClick={() => setCartOpen(false)}
                        className="flex-shrink-0"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-28 w-22 object-cover"
                        />
                      </Link>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-2">
                          <div>
                            <p className="text-2xs uppercase tracking-widest text-ink-400">{product.brand}</p>
                            <Link
                              to={`/product/${product.slug}`}
                              onClick={() => setCartOpen(false)}
                              className="text-sm font-medium text-ink-900 hover:underline"
                            >
                              {product.name}
                            </Link>
                            <p className="mt-0.5 text-xs text-ink-500">
                              {item.size} · {item.color}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.productId, item.size, item.color)}
                            className="text-xs text-ink-400 transition-colors hover:text-accent-500"
                            aria-label="Remove item"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center border border-ink-200">
                            <button
                              onClick={() =>
                                updateQuantity(item.productId, item.size, item.color, item.quantity - 1)
                              }
                              className="flex h-8 w-8 items-center justify-center text-ink-700 transition-colors hover:bg-cream-200"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(item.productId, item.size, item.color, item.quantity + 1)
                              }
                              className="flex h-8 w-8 items-center justify-center text-ink-700 transition-colors hover:bg-cream-200"
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="text-sm font-semibold">
                            {formatPrice(product.discountPrice * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-ink-200 px-5 py-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-ink-500">Subtotal</span>
                <span className="text-lg font-semibold">{formatPrice(cartSubtotal)}</span>
              </div>
              <p className="mb-4 text-xs text-ink-400">
                Shipping and discounts calculated at checkout.
              </p>
              <button
                onClick={() => {
                  setCartOpen(false);
                  navigate('/checkout');
                }}
                className="btn-primary w-full"
              >
                Checkout
                <ArrowRight size={16} />
              </button>
              <button
                onClick={() => {
                  setCartOpen(false);
                  navigate('/cart');
                }}
                className="btn-secondary mt-2 w-full"
              >
                View Bag
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
