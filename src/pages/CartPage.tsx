import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, X, ShoppingBag, Tag, ArrowRight } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { getProductById } from '@/data/products';
import { formatPrice, classNames } from '@/utils/format';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useStore();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  function handleApplyCoupon() {
    if (!couponCode.trim()) return;
    const result = applyCoupon(couponCode.trim());
    setCouponMessage({ type: result.success ? 'success' : 'error', text: result.message });
    if (result.success) setCouponCode('');
  }

  if (cart.length === 0) {
    return (
      <div className="container-app py-20">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-cream-200">
            <ShoppingBag size={40} strokeWidth={1} className="text-ink-400" />
          </div>
          <h1 className="font-display text-3xl font-medium">Your Bag is Empty</h1>
          <p className="mt-3 max-w-sm text-sm text-ink-400">
            Start exploring our collection and find your next favourite shirt.
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
      <h1 className="mb-8 font-display text-3xl font-medium sm:text-4xl">Your Bag</h1>

      <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
        {/* Items */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {cart.map((item) => {
              const product = getProductById(item.productId);
              if (!product) return null;
              return (
                <div
                  key={`${item.productId}-${item.size}-${item.color}`}
                  className="flex gap-4 border-b border-ink-200 pb-6"
                >
                  <Link to={`/product/${product.slug}`} className="flex-shrink-0">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-36 w-28 object-cover sm:h-40 sm:w-32"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-4">
                      <div>
                        <p className="text-2xs uppercase tracking-widest text-ink-400">{product.brand}</p>
                        <Link
                          to={`/product/${product.slug}`}
                          className="text-base font-medium text-ink-900 hover:underline"
                        >
                          {product.name}
                        </Link>
                        <div className="mt-2 flex items-center gap-3 text-xs text-ink-500">
                          <span>Size: {item.size}</span>
                          <span className="text-ink-200">|</span>
                          <span className="flex items-center gap-1.5">
                            Color:
                            <span
                              className="inline-block h-3 w-3 rounded-full border border-ink-200"
                              style={{ backgroundColor: product.colors.find((c) => c.name === item.color)?.hex }}
                            />
                            {item.color}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.productId, item.size, item.color)}
                        className="text-ink-400 transition-colors hover:text-accent-500"
                        aria-label="Remove item"
                      >
                        <X size={18} />
                      </button>
                    </div>
                    <div className="mt-auto flex items-end justify-between pt-4">
                      <div className="flex items-center border border-ink-200">
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                          className="flex h-9 w-9 items-center justify-center text-ink-700 transition-colors hover:bg-cream-200"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                          className="flex h-9 w-9 items-center justify-center text-ink-700 transition-colors hover:bg-cream-200"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-base font-semibold">{formatPrice(product.discountPrice * item.quantity)}</p>
                        <p className="text-xs text-ink-400 line-through">{formatPrice(product.price * item.quantity)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <Link
            to="/shop"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink-700 hover:text-ink-900"
          >
            <ArrowRight size={14} className="rotate-180" />
            Continue Shopping
          </Link>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-36 border border-ink-200 bg-cream-100 p-6">
            <h2 className="mb-4 text-sm font-medium uppercase tracking-wider">Order Summary</h2>

            {/* Coupon */}
            <div className="mb-5">
              {appliedCoupon ? (
                <div className="flex items-center justify-between border border-success-500 bg-success-50 px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <Tag size={14} className="text-success-600" />
                    <span className="text-sm font-medium text-success-700">{appliedCoupon.code}</span>
                  </div>
                  <button
                    onClick={() => {
                      removeCoupon();
                      setCouponMessage(null);
                    }}
                    className="text-xs text-ink-400 hover:text-accent-500"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                      placeholder="Coupon code"
                      className="flex-1 border border-ink-200 bg-cream-50 px-3 py-2.5 text-sm uppercase placeholder:normal-case"
                    />
                    <button onClick={handleApplyCoupon} className="btn-secondary px-4 py-2.5">
                      Apply
                    </button>
                  </div>
                  {couponMessage && (
                    <p
                      className={classNames(
                        'mt-2 text-xs',
                        couponMessage.type === 'success' ? 'text-success-600' : 'text-accent-500'
                      )}
                    >
                      {couponMessage.text}
                    </p>
                  )}
                  <p className="mt-2 text-2xs text-ink-400">
                    Try: NOVA10, NOVA20, FLAT200, WELCOME15
                  </p>
                </div>
              )}
            </div>

            {/* Breakdown */}
            <div className="space-y-2.5 border-t border-ink-200 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-ink-500">Subtotal</span>
                <span className="font-medium">{formatPrice(cartSubtotal)}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-success-600">Discount</span>
                  <span className="font-medium text-success-600">-{formatPrice(cartDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-ink-500">Shipping</span>
                <span className="font-medium">
                  {cartShipping === 0 ? <span className="text-success-600">Free</span> : formatPrice(cartShipping)}
                </span>
              </div>
            </div>

            <div className="mt-4 flex justify-between border-t border-ink-200 pt-4">
              <span className="text-base font-medium">Total</span>
              <span className="text-xl font-semibold">{formatPrice(cartTotal)}</span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="btn-primary mt-6 w-full"
            >
              Proceed to Checkout
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
