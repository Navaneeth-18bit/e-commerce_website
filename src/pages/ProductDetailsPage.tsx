import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Truck, RefreshCw, Shield, Check, ChevronRight, Minus, Plus } from 'lucide-react';
import { getProductBySlug, getRelatedProducts } from '@/data/products';
import { getReviewsForProduct } from '@/data/reviews';
import { useStore } from '@/store/StoreContext';
import ProductGallery from '@/components/ProductGallery';
import SizeSelector from '@/components/SizeSelector';
import ColorSelector from '@/components/ColorSelector';
import Rating from '@/components/Rating';
import ReviewCard from '@/components/ReviewCard';
import ProductGrid from '@/components/ProductGrid';
import { formatPrice, classNames } from '@/utils/format';

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = slug ? getProductBySlug(slug) : undefined;
  const { addToCart, setCartOpen } = useStore();

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'reviews'>('description');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]?.name || null);
      setSelectedSize(null);
      setQuantity(1);
      setError('');
      setAdded(false);
      setActiveTab('description');
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [slug]);

  if (!product) {
    return (
      <div className="container-app py-20 text-center">
        <h1 className="font-display text-3xl font-medium">Product not found</h1>
        <Link to="/shop" className="btn-primary mt-6 inline-flex">Back to Shop</Link>
      </div>
    );
  }

  const reviews = getReviewsForProduct(product.id);
  const related = getRelatedProducts(product, 4);

  function handleAddToCart() {
    if (!selectedSize) {
      setError('Please select a size');
      return;
    }
    if (!selectedColor) {
      setError('Please select a color');
      return;
    }
    setError('');
    addToCart(product!.id, selectedSize, selectedColor, quantity);
    setAdded(true);
    setTimeout(() => {
      setCartOpen(true);
      setAdded(false);
    }, 600);
  }

  function handleBuyNow() {
    if (!selectedSize) {
      setError('Please select a size');
      return;
    }
    if (!selectedColor) {
      setError('Please select a color');
      return;
    }
    setError('');
    addToCart(product!.id, selectedSize, selectedColor, quantity);
    navigate('/checkout');
  }

  return (
    <div className="container-app py-8 lg:py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-2xs text-ink-400">
        <Link to="/" className="hover:text-ink-900">Home</Link>
        <ChevronRight size={12} />
        <Link to="/shop" className="hover:text-ink-900">Shop</Link>
        <ChevronRight size={12} />
        <Link to={`/shop/${product.category}`} className="capitalize hover:text-ink-900">{product.category.replace('-', ' ')}</Link>
        <ChevronRight size={12} />
        <span className="text-ink-700">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Gallery */}
        <div className="lg:sticky lg:top-36 lg:self-start">
          <ProductGallery images={product.images} name={product.name} />
        </div>

        {/* Info */}
        <div>
          <p className="label-xs mb-2">{product.brand}</p>
          <h1 className="font-display text-3xl font-medium leading-tight sm:text-4xl">{product.name}</h1>

          <div className="mt-3 flex items-center gap-3">
            <Rating value={product.rating} count={product.reviewCount} size="md" />
            <button
              onClick={() => setActiveTab('reviews')}
              className="text-xs text-ink-400 underline underline-offset-2 hover:text-ink-900"
            >
              Read reviews
            </button>
          </div>

          {/* Price */}
          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-2xl font-semibold text-ink-900">{formatPrice(product.discountPrice)}</span>
            <span className="text-base text-ink-400 line-through">{formatPrice(product.price)}</span>
            <span className="text-sm font-medium text-accent-500">{product.discountPercentage}% Off</span>
          </div>
          <p className="mt-1 text-xs text-ink-400">Inclusive of all taxes</p>

          {/* Color */}
          <div className="mt-8">
            <ColorSelector
              colors={product.colors}
              selected={selectedColor}
              onChange={setSelectedColor}
            />
          </div>

          {/* Size */}
          <div className="mt-6">
            <SizeSelector
              sizes={product.sizes}
              unavailableSizes={product.unavailableSizes}
              selected={selectedSize}
              onChange={setSelectedSize}
            />
          </div>

          {/* Quantity */}
          <div className="mt-6">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-sm font-medium uppercase tracking-wider">Quantity</span>
            </div>
            <div className="flex items-center border border-ink-200">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex h-11 w-11 items-center justify-center text-ink-700 transition-colors hover:bg-cream-200"
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span className="w-12 text-center text-sm font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="flex h-11 w-11 items-center justify-center text-ink-700 transition-colors hover:bg-cream-200"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="mt-4 text-sm text-accent-500 animate-fade-in">{error}</p>
          )}

          {/* Actions */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleAddToCart}
              className={classNames('btn-primary flex-1', added && 'bg-success-500 hover:bg-success-500')}
            >
              {added ? (
                <>
                  <Check size={18} />
                  Added to Bag
                </>
              ) : (
                'Add to Bag'
              )}
            </button>
            <button onClick={handleBuyNow} className="btn-secondary flex-1">
              Buy Now
            </button>
          </div>

          {/* Trust badges */}
          <div className="mt-8 grid grid-cols-3 gap-4 border-y border-ink-200 py-6">
            <div className="flex flex-col items-center gap-2 text-center">
              <Truck size={20} strokeWidth={1.5} className="text-ink-700" />
              <p className="text-2xs text-ink-500">Free shipping<br />above ₹999</p>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <RefreshCw size={20} strokeWidth={1.5} className="text-ink-700" />
              <p className="text-2xs text-ink-500">7-day easy<br />returns</p>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <Shield size={20} strokeWidth={1.5} className="text-ink-700" />
              <p className="text-2xs text-ink-500">100% authentic<br />products</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-8">
            <div className="flex gap-6 border-b border-ink-200">
              {[
                { key: 'description' as const, label: 'Description' },
                { key: 'details' as const, label: 'Details' },
                { key: 'reviews' as const, label: `Reviews (${reviews.length})` },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={classNames(
                    'border-b-2 pb-3 text-sm font-medium uppercase tracking-wider transition-colors',
                    activeTab === tab.key
                      ? 'border-ink-900 text-ink-900'
                      : 'border-transparent text-ink-400 hover:text-ink-700'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="py-6">
              {activeTab === 'description' && (
                <div className="space-y-4 animate-fade-in">
                  <p className="text-sm leading-relaxed text-ink-600">{product.description}</p>
                  <div className="space-y-2 pt-2">
                    <div className="flex gap-3">
                      <span className="w-24 flex-shrink-0 text-xs font-medium uppercase tracking-wider text-ink-400">Material</span>
                      <span className="text-sm text-ink-700">{product.material}</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="w-24 flex-shrink-0 text-xs font-medium uppercase tracking-wider text-ink-400">Fit</span>
                      <span className="text-sm text-ink-700">{product.fit}</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="w-24 flex-shrink-0 text-xs font-medium uppercase tracking-wider text-ink-400">Pattern</span>
                      <span className="text-sm text-ink-700">{product.pattern}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'details' && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h4 className="mb-2 text-sm font-medium uppercase tracking-wider">Care Instructions</h4>
                    <ul className="space-y-1">
                      {product.care.map((c) => (
                        <li key={c} className="flex items-center gap-2 text-sm text-ink-600">
                          <span className="h-1 w-1 rounded-full bg-ink-400" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2 text-sm font-medium uppercase tracking-wider">Delivery Information</h4>
                    <p className="text-sm leading-relaxed text-ink-600">
                      Free standard delivery on orders above ₹999. Estimated delivery within 3-5 business days. Express delivery available at checkout. Cash on delivery available for select pin codes.
                    </p>
                  </div>
                  <div>
                    <h4 className="mb-2 text-sm font-medium uppercase tracking-wider">Returns & Exchange</h4>
                    <p className="text-sm leading-relaxed text-ink-600">
                      Easy 7-day returns and exchanges. Items must be unworn with original tags attached. Refunds are processed within 5-7 business days.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="animate-fade-in">
                  {reviews.length > 0 ? (
                    <div>
                      <div className="mb-6 flex items-center gap-6 border border-ink-200 bg-cream-100 px-6 py-5">
                        <div className="text-center">
                          <p className="font-display text-4xl font-medium">{product.rating.toFixed(1)}</p>
                          <Rating value={product.rating} showCount={false} size="sm" className="mt-1 justify-center" />
                          <p className="mt-1 text-2xs text-ink-400">{product.reviewCount} reviews</p>
                        </div>
                        <div className="flex-1 space-y-1.5">
                          {[5, 4, 3, 2, 1].map((star) => {
                            const pct = star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 7 : star === 2 ? 2 : 1;
                            return (
                              <div key={star} className="flex items-center gap-2">
                                <span className="w-8 text-2xs text-ink-400">{star}★</span>
                                <div className="h-1.5 flex-1 overflow-hidden bg-ink-200">
                                  <div className="h-full bg-accent-500" style={{ width: `${pct}%` }} />
                                </div>
                                <span className="w-8 text-2xs text-ink-400">{pct}%</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div>
                        {reviews.map((review) => (
                          <ReviewCard key={review.id} review={review} />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="py-8 text-center text-sm text-ink-400">No reviews yet. Be the first to review this product.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-8 font-display text-2xl font-medium sm:text-3xl">You May Also Like</h2>
          <ProductGrid products={related} columns={4} />
        </section>
      )}
    </div>
  );
}
