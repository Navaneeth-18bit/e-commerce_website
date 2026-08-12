import { Link } from 'react-router-dom';
import { Package, ChevronRight } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { formatPrice, formatDate, classNames } from '@/utils/format';
import type { OrderStatus } from '@/types';

const STATUS_STYLES: Record<OrderStatus, { label: string; class: string }> = {
  confirmed: { label: 'Confirmed', class: 'bg-ink-100 text-ink-700' },
  processing: { label: 'Processing', class: 'bg-warning-100 text-warning-500' },
  shipped: { label: 'Shipped', class: 'bg-accent-50 text-accent-600' },
  'out-for-delivery': { label: 'Out for Delivery', class: 'bg-accent-50 text-accent-600' },
  delivered: { label: 'Delivered', class: 'bg-success-50 text-success-600' },
  cancelled: { label: 'Cancelled', class: 'bg-cream-200 text-accent-500' },
};

export default function OrdersPage() {
  const { orders } = useStore();

  if (orders.length === 0) {
    return (
      <div className="container-app py-20">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-cream-200">
            <Package size={40} strokeWidth={1} className="text-ink-400" />
          </div>
          <h1 className="font-display text-3xl font-medium">No Orders Yet</h1>
          <p className="mt-3 max-w-sm text-sm text-ink-400">
            When you place an order, it will appear here so you can track its status.
          </p>
          <Link to="/shop" className="btn-primary mt-8">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-app py-8 lg:py-12">
      <h1 className="mb-8 font-display text-3xl font-medium sm:text-4xl">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => {
          const statusStyle = STATUS_STYLES[order.status];
          return (
            <Link
              key={order.id}
              to={`/orders/${order.id}`}
              className="group block border border-ink-200 bg-cream-50 p-5 transition-all hover:border-ink-900 hover:shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="label-xs mb-0.5">Order</p>
                    <p className="text-sm font-semibold">{order.id}</p>
                  </div>
                  <span className={classNames('rounded-full px-3 py-1 text-2xs font-medium uppercase tracking-wider', statusStyle.class)}>
                    {statusStyle.label}
                  </span>
                </div>
                <div className="text-right">
                  <p className="label-xs mb-0.5">Placed On</p>
                  <p className="text-sm text-ink-600">{formatDate(order.date)}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-4 border-t border-ink-200 pt-4">
                <div className="flex -space-x-3">
                  {order.items.slice(0, 3).map((item, i) => (
                    <img
                      key={i}
                      src={item.image}
                      alt={item.name}
                      className="h-14 w-11 border-2 border-cream-50 object-cover"
                    />
                  ))}
                  {order.items.length > 3 && (
                    <div className="flex h-14 w-11 items-center justify-center border-2 border-cream-50 bg-cream-200 text-xs font-medium text-ink-500">
                      +{order.items.length - 3}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-ink-600">
                    {order.items.length} {order.items.length === 1 ? 'item' : 'items'} · {formatPrice(order.total)}
                  </p>
                  {order.status !== 'cancelled' && (
                    <p className="text-xs text-ink-400">
                      Expected by {formatDate(order.estimatedDelivery)}
                    </p>
                  )}
                </div>
                <ChevronRight size={18} className="text-ink-400 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
