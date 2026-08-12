import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { formatPrice, formatDate, classNames } from '@/utils/format';
import OrderTimeline from '@/components/OrderTimeline';
import type { OrderStatus } from '@/types';

const STATUS_STYLES: Record<OrderStatus, { label: string; class: string }> = {
  confirmed: { label: 'Confirmed', class: 'bg-ink-100 text-ink-700' },
  processing: { label: 'Processing', class: 'bg-warning-100 text-warning-500' },
  shipped: { label: 'Shipped', class: 'bg-accent-50 text-accent-600' },
  'out-for-delivery': { label: 'Out for Delivery', class: 'bg-accent-50 text-accent-600' },
  delivered: { label: 'Delivered', class: 'bg-success-50 text-success-600' },
  cancelled: { label: 'Cancelled', class: 'bg-cream-200 text-accent-500' },
};

export default function OrderDetailsPage() {
  const { id } = useParams();
  const { orders } = useStore();
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="container-app py-20 text-center">
        <h1 className="font-display text-3xl font-medium">Order not found</h1>
        <Link to="/orders" className="btn-primary mt-6 inline-flex">View All Orders</Link>
      </div>
    );
  }

  const statusStyle = STATUS_STYLES[order.status];

  return (
    <div className="container-app py-8 lg:py-12">
      <Link to="/orders" className="mb-6 inline-flex items-center gap-2 text-sm text-ink-500 hover:text-ink-900">
        <ArrowLeft size={16} />
        Back to Orders
      </Link>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-medium sm:text-4xl">{order.id}</h1>
          <p className="mt-1 text-sm text-ink-400">Placed on {formatDate(order.date)}</p>
        </div>
        <span className={classNames('rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-wider', statusStyle.class)}>
          {statusStyle.label}
        </span>
      </div>

      <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
        <div className="lg:col-span-2 space-y-8">
          {/* Timeline */}
          <div className="border border-ink-200 bg-cream-50 p-6">
            <h2 className="mb-5 text-sm font-medium uppercase tracking-wider">Order Tracking</h2>
            <OrderTimeline status={order.status} orderDate={order.date} />
          </div>

          {/* Items */}
          <div className="border border-ink-200 bg-cream-50 p-6">
            <h2 className="mb-5 text-sm font-medium uppercase tracking-wider">Items in Order</h2>
            <div className="space-y-4">
              {order.items.map((item, i) => (
                <div key={i} className="flex gap-4 border-b border-ink-200 pb-4 last:border-b-0 last:pb-0">
                  <img src={item.image} alt={item.name} className="h-20 w-16 object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-ink-400">{item.size} · {item.color} · Qty {item.quantity}</p>
                    <p className="mt-1 text-xs text-ink-400">{formatPrice(item.price)} each</p>
                  </div>
                  <p className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Price details */}
          <div className="border border-ink-200 bg-cream-100 p-6">
            <h2 className="mb-4 text-sm font-medium uppercase tracking-wider">Price Details</h2>
            <div className="space-y-2.5">
              <div className="flex justify-between text-sm">
                <span className="text-ink-500">Subtotal</span>
                <span className="font-medium">{formatPrice(order.subtotal)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-success-600">Discount</span>
                  <span className="font-medium text-success-600">-{formatPrice(order.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-ink-500">Shipping</span>
                <span className="font-medium">
                  {order.shipping === 0 ? <span className="text-success-600">Free</span> : formatPrice(order.shipping)}
                </span>
              </div>
            </div>
            <div className="mt-4 flex justify-between border-t border-ink-200 pt-4">
              <span className="text-base font-medium">Total</span>
              <span className="text-lg font-semibold">{formatPrice(order.total)}</span>
            </div>
            <p className="mt-2 text-xs text-ink-400">Paid via {order.paymentMethod}</p>
          </div>

          {/* Delivery address */}
          <div className="border border-ink-200 bg-cream-100 p-6">
            <h2 className="mb-4 text-sm font-medium uppercase tracking-wider">Delivery Address</h2>
            <p className="text-sm font-medium">{order.address.fullName}</p>
            <p className="mt-1 text-sm text-ink-500">
              {order.address.addressLine}<br />
              {order.address.city}, {order.address.state}<br />
              {order.address.pincode}
            </p>
            <p className="mt-2 text-sm text-ink-500">{order.address.phone}</p>
            <span className="mt-3 inline-block border border-ink-200 px-2 py-0.5 text-2xs text-ink-500">{order.address.type}</span>
          </div>

          {order.status !== 'cancelled' && (
            <div className="border border-ink-200 bg-cream-100 p-6 text-center">
              <p className="label-xs mb-1">Estimated Delivery</p>
              <p className="text-lg font-semibold">{formatDate(order.estimatedDelivery)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
