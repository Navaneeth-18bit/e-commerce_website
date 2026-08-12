import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Check, ChevronRight, MapPin, CreditCard, Wallet, Banknote, Loader2 } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { getProductById } from '@/data/products';
import { formatPrice, generateOrderId, getDeliveryEstimate, classNames } from '@/utils/format';
import type { Order, Address, OrderItem } from '@/types';

export default function CheckoutPage() {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    appliedCoupon,
    addresses,
    addOrder,
  } = useStore();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [selectedAddressIdx, setSelectedAddressIdx] = useState(0);
  const [showNewAddress, setShowNewAddress] = useState(addresses.length === 0);
  const [newAddress, setNewAddress] = useState<Address>({
    fullName: '',
    phone: '',
    pincode: '',
    addressLine: '',
    city: '',
    state: '',
    type: 'Home',
  });
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [placing, setPlacing] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="container-app py-20 text-center">
        <h1 className="font-display text-3xl font-medium">Your bag is empty</h1>
        <Link to="/shop" className="btn-primary mt-6 inline-flex">Explore Shirts</Link>
      </div>
    );
  }

  const activeAddress = showNewAddress ? newAddress : addresses[selectedAddressIdx];

  function handlePlaceOrder() {
    setPlacing(true);
    setTimeout(() => {
      const orderItems: OrderItem[] = cart.map((item) => {
        const product = getProductById(item.productId)!;
        return {
          productId: item.productId,
          name: product.name,
          image: product.images[0],
          size: item.size,
          color: item.color,
          quantity: item.quantity,
          price: product.discountPrice,
        };
      });

      const order: Order = {
        id: generateOrderId(),
        date: new Date().toISOString().split('T')[0],
        status: 'confirmed',
        items: orderItems,
        subtotal: cartSubtotal,
        discount: cartDiscount,
        shipping: cartShipping,
        total: cartTotal,
        address: activeAddress,
        paymentMethod,
        estimatedDelivery: getDeliveryEstimate(4),
      };

      addOrder(order);
      setPlacing(false);
      navigate('/order-confirmation', { state: { orderId: order.id } });
    }, 1800);
  }

  const paymentMethods = [
    { id: 'UPI', label: 'UPI', desc: 'Pay using any UPI app', icon: Wallet },
    { id: 'Credit / Debit Card', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay', icon: CreditCard },
    { id: 'Cash on Delivery', label: 'Cash on Delivery', desc: 'Pay when you receive', icon: Banknote },
  ];

  return (
    <div className="container-app py-8 lg:py-12">
      <h1 className="mb-8 font-display text-3xl font-medium sm:text-4xl">Checkout</h1>

      {/* Steps indicator */}
      <div className="mb-8 flex items-center gap-2 text-sm">
        {[
          { num: 1, label: 'Address' },
          { num: 2, label: 'Summary' },
          { num: 3, label: 'Payment' },
        ].map((s, i) => (
          <div key={s.num} className="flex items-center gap-2">
            <div
              className={classNames(
                'flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-medium transition-all',
                step >= s.num ? 'border-ink-900 bg-ink-900 text-cream-50' : 'border-ink-200 text-ink-400'
              )}
            >
              {step > s.num ? <Check size={14} /> : s.num}
            </div>
            <span className={classNames('text-xs font-medium uppercase tracking-wider', step >= s.num ? 'text-ink-900' : 'text-ink-400')}>
              {s.label}
            </span>
            {i < 2 && <ChevronRight size={14} className="text-ink-300" />}
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
        <div className="lg:col-span-2">
          {/* Step 1: Address */}
          {step === 1 && (
            <div className="animate-fade-in">
              <h2 className="mb-4 text-lg font-medium">Delivery Address</h2>

              {addresses.length > 0 && !showNewAddress && (
                <div className="space-y-3">
                  {addresses.map((addr, i) => (
                    <label
                      key={i}
                      className={classNames(
                        'flex cursor-pointer gap-4 border p-4 transition-all',
                        selectedAddressIdx === i ? 'border-ink-900 bg-cream-100' : 'border-ink-200 hover:border-ink-400'
                      )}
                    >
                      <input
                        type="radio"
                        name="address"
                        checked={selectedAddressIdx === i}
                        onChange={() => setSelectedAddressIdx(i)}
                        className="mt-1 h-4 w-4 accent-ink-900"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-ink-900">{addr.fullName}</span>
                          <span className="border border-ink-200 px-2 py-0.5 text-2xs text-ink-500">{addr.type}</span>
                        </div>
                        <p className="mt-1 text-sm text-ink-500">
                          {addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}
                        </p>
                        <p className="mt-1 text-sm text-ink-500">{addr.phone}</p>
                      </div>
                    </label>
                  ))}
                  <button
                    onClick={() => setShowNewAddress(true)}
                    className="flex w-full items-center justify-center gap-2 border border-dashed border-ink-300 py-3 text-sm text-ink-500 transition-colors hover:border-ink-900 hover:text-ink-900"
                  >
                    <MapPin size={16} />
                    Add New Address
                  </button>
                </div>
              )}

              {showNewAddress && (
                <div className="space-y-4 border border-ink-200 p-5">
                  <h3 className="text-sm font-medium">New Address</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="label-xs mb-1.5 block">Full Name</label>
                      <input
                        type="text"
                        value={newAddress.fullName}
                        onChange={(e) => setNewAddress({ ...newAddress, fullName: e.target.value })}
                        className="w-full border border-ink-200 bg-cream-50 px-3 py-2.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="label-xs mb-1.5 block">Phone</label>
                      <input
                        type="tel"
                        value={newAddress.phone}
                        onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                        className="w-full border border-ink-200 bg-cream-50 px-3 py-2.5 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="label-xs mb-1.5 block">Address Line</label>
                    <input
                      type="text"
                      value={newAddress.addressLine}
                      onChange={(e) => setNewAddress({ ...newAddress, addressLine: e.target.value })}
                      className="w-full border border-ink-200 bg-cream-50 px-3 py-2.5 text-sm"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <label className="label-xs mb-1.5 block">City</label>
                      <input
                        type="text"
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                        className="w-full border border-ink-200 bg-cream-50 px-3 py-2.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="label-xs mb-1.5 block">State</label>
                      <input
                        type="text"
                        value={newAddress.state}
                        onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                        className="w-full border border-ink-200 bg-cream-50 px-3 py-2.5 text-sm"
                      />
                    </div>
                    <div>
                      <label className="label-xs mb-1.5 block">Pincode</label>
                      <input
                        type="text"
                        value={newAddress.pincode}
                        onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                        className="w-full border border-ink-200 bg-cream-50 px-3 py-2.5 text-sm"
                      />
                    </div>
                  </div>
                  {addresses.length > 0 && (
                    <button
                      onClick={() => setShowNewAddress(false)}
                      className="text-sm text-ink-400 hover:text-ink-900"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              )}

              <button
                onClick={() => setStep(2)}
                disabled={!activeAddress?.fullName || !activeAddress?.addressLine}
                className="btn-primary mt-6"
              >
                Continue to Summary
              </button>
            </div>
          )}

          {/* Step 2: Order Summary */}
          {step === 2 && (
            <div className="animate-fade-in">
              <h2 className="mb-4 text-lg font-medium">Order Summary</h2>
              <div className="space-y-4">
                {cart.map((item) => {
                  const product = getProductById(item.productId);
                  if (!product) return null;
                  return (
                    <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4 border-b border-ink-200 pb-4">
                      <img src={product.images[0]} alt={product.name} className="h-20 w-16 object-cover" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{product.name}</p>
                        <p className="text-xs text-ink-400">{item.size} · {item.color} · Qty {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold">{formatPrice(product.discountPrice * item.quantity)}</p>
                    </div>
                  );
                })}
              </div>

              {/* Delivery address preview */}
              <div className="mt-6 border border-ink-200 bg-cream-100 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="label-xs mb-1">Delivering To</p>
                    <p className="text-sm font-medium">{activeAddress?.fullName}</p>
                    <p className="text-sm text-ink-500">{activeAddress?.addressLine}, {activeAddress?.city}, {activeAddress?.state} - {activeAddress?.pincode}</p>
                  </div>
                  <button onClick={() => setStep(1)} className="text-xs text-ink-400 underline hover:text-ink-900">Change</button>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button onClick={() => setStep(1)} className="btn-secondary">Back</button>
                <button onClick={() => setStep(3)} className="btn-primary">Continue to Payment</button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="animate-fade-in">
              <h2 className="mb-4 text-lg font-medium">Payment Method</h2>
              <div className="space-y-3">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <label
                      key={method.id}
                      className={classNames(
                        'flex cursor-pointer items-center gap-4 border p-4 transition-all',
                        paymentMethod === method.id ? 'border-ink-900 bg-cream-100' : 'border-ink-200 hover:border-ink-400'
                      )}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === method.id}
                        onChange={() => setPaymentMethod(method.id)}
                        className="h-4 w-4 accent-ink-900"
                      />
                      <Icon size={20} strokeWidth={1.5} className="text-ink-700" />
                      <div>
                        <p className="text-sm font-medium">{method.label}</p>
                        <p className="text-xs text-ink-400">{method.desc}</p>
                      </div>
                    </label>
                  );
                })}
              </div>

              <p className="mt-4 text-xs text-ink-400">
                This is a mock checkout. No real payment will be processed.
              </p>

              <div className="mt-6 flex gap-3">
                <button onClick={() => setStep(2)} className="btn-secondary" disabled={placing}>Back</button>
                <button onClick={handlePlaceOrder} className="btn-primary flex-1" disabled={placing}>
                  {placing ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Place Order · ${formatPrice(cartTotal)}`
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Summary sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-36 border border-ink-200 bg-cream-100 p-6">
            <h2 className="mb-4 text-sm font-medium uppercase tracking-wider">Price Details</h2>
            <div className="space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="text-ink-500">Subtotal ({cart.length} items)</span>
                <span className="font-medium">{formatPrice(cartSubtotal)}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-success-600">
                    Discount {appliedCoupon && `(${appliedCoupon.code})`}
                  </span>
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
          </div>
        </div>
      </div>
    </div>
  );
}
