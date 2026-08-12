import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Check, Package, Calendar, MapPin } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { formatPrice, formatDate, getDeliveryRange } from '@/utils/format';

export default function OrderConfirmationPage() {
  const location = useLocation();
  const { orders } = useStore();
  const orderId = (location.state as { orderId?: string })?.orderId;
  const order = orders.find((o) => o.id === orderId) || orders[0];
  const [showCheck, setShowCheck] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowCheck(true), 200);
    window.scrollTo({ top: 0 });
    return () => clearTimeout(timer);
  }, []);

  if (!order) {
    return (
      <div className="container-app py-20 text-center">
        <h1 className="font-display text-3xl font-medium">Order not found</h1>
        <Link to="/shop" className="btn-primary mt-6 inline-flex">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container-app py-12 lg:py-20">
      <div className="mx-auto max-w-2xl text-center">
        {/* Success animation */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-success-50">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-full bg-success-500 transition-all duration-500 ${showCheck ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}
          >
            <Check size={36} strokeWidth={3} className="text-cream-50" />
          </div>
        </div>

        <p className="label-xs mb-2 text-success-600">Success</p>
        <h1 className="font-display text-4xl font-medium sm:text-5xl animate-fade-up">Order Confirmed</h1>
        <p className="mt-3 text-base text-ink-500 animate-fade-up" style={{ animationDelay: '100ms' }}>
          Thank you for your order. We will send you a confirmation shortly.
        </p>

        {/* Order info card */}
        <div className="mt-8 border border-ink-200 bg-cream-100 p-6 text-left animate-fade-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between border-b border-ink-200 pb-4">
            <div>
              <p className="label-xs mb-1">Order Number</p>
              <p className="text-lg font-semibold">{order.id}</p>
            </div>
            <div className="text-right">
              <p className="label-xs mb-1">Order Date</p>
              <p className="text-sm font-medium">{formatDate(order.date)}</p>
            </div>
          </div>

          {/* Items */}
          <div className="space-y-3 py-4">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <img src={item.image} alt={item.name} className="h-16 w-12 object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-ink-400">{item.size} · {item.color} · Qty {item.quantity}</p>
                </div>
                <p className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>

          {/* Delivery info */}
          <div className="border-t border-ink-200 pt-4">
            <div className="flex items-start gap-3">
              <Calendar size={18} strokeWidth={1.5} className="mt-0.5 text-ink-500" />
              <div>
                <p className="label-xs mb-0.5">Estimated Delivery</p>
                <p className="text-sm font-medium">{getDeliveryRange(3, 5)}</p>
              </div>
            </div>
            <div className="mt-3 flex items-start gap-3">
              <MapPin size={18} strokeWidth={1.5} className="mt-0.5 text-ink-500" />
              <div>
                <p className="label-xs mb-0.5">Delivery Address</p>
                <p className="text-sm text-ink-600">
                  {order.address.fullName}<br />
                  {order.address.addressLine}, {order.address.city}, {order.address.state} - {order.address.pincode}
                </p>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="mt-4 flex items-center justify-between border-t border-ink-200 pt-4">
            <span className="text-sm text-ink-500">Total Paid</span>
            <span className="text-lg font-semibold">{formatPrice(order.total)}</span>
          </div>
          <p className="mt-1 text-xs text-ink-400">Paid via {order.paymentMethod}</p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center animate-fade-up" style={{ animationDelay: '300ms' }}>
          <Link to={`/orders/${order.id}`} className="btn-secondary">
            <Package size={16} />
            View Order
          </Link>
          <Link to="/shop" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
