import { Check, Package, Truck, Home, Clock, XCircle } from 'lucide-react';
import type { OrderStatus } from '@/types';
import { classNames } from '@/utils/format';

interface OrderTimelineProps {
  status: OrderStatus;
  orderDate: string;
}

const STEPS: { key: OrderStatus; label: string; icon: typeof Check }[] = [
  { key: 'confirmed', label: 'Order Confirmed', icon: Check },
  { key: 'processing', label: 'Packed', icon: Package },
  { key: 'shipped', label: 'Shipped', icon: Truck },
  { key: 'out-for-delivery', label: 'Out for Delivery', icon: Clock },
  { key: 'delivered', label: 'Delivered', icon: Home },
];

const STATUS_ORDER: OrderStatus[] = ['confirmed', 'processing', 'shipped', 'out-for-delivery', 'delivered'];

export default function OrderTimeline({ status }: OrderTimelineProps) {
  if (status === 'cancelled') {
    return (
      <div className="flex items-center gap-3 border border-ink-200 bg-cream-100 px-5 py-4">
        <XCircle size={24} className="text-accent-500" strokeWidth={1.5} />
        <div>
          <p className="text-sm font-medium text-ink-900">Order Cancelled</p>
          <p className="text-xs text-ink-400">This order was cancelled and will not be delivered.</p>
        </div>
      </div>
    );
  }

  const currentIndex = STATUS_ORDER.indexOf(status);

  return (
    <div className="relative">
      {STEPS.map((step, i) => {
        const isComplete = i < currentIndex;
        const isCurrent = i === currentIndex;
        const Icon = step.icon;

        return (
          <div key={step.key} className="flex gap-4">
            {/* Icon + line column */}
            <div className="flex flex-col items-center">
              <div
                className={classNames(
                  'flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all',
                  isComplete && 'border-success-500 bg-success-500 text-cream-50',
                  isCurrent && 'border-ink-900 bg-ink-900 text-cream-50',
                  !isComplete && !isCurrent && 'border-ink-200 bg-cream-50 text-ink-300'
                )}
              >
                <Icon size={18} strokeWidth={1.5} />
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={classNames(
                    'w-0.5 min-h-[2.5rem] flex-1',
                    i < currentIndex ? 'bg-success-500' : 'bg-ink-200'
                  )}
                />
              )}
            </div>

            {/* Label */}
            <div className={classNames('pb-6 pt-2', i === STEPS.length - 1 && 'pb-0')}>
              <p
                className={classNames(
                  'text-sm font-medium',
                  isComplete || isCurrent ? 'text-ink-900' : 'text-ink-400'
                )}
              >
                {step.label}
              </p>
              {isCurrent && (
                <p className="mt-0.5 text-xs text-ink-400">
                  {i === 0 && 'We have received your order.'}
                  {i === 1 && 'Your items are being carefully packed.'}
                  {i === 2 && 'Your order is on its way.'}
                  {i === 3 && 'Your order is out for delivery today.'}
                  {i === 4 && 'Your order has been delivered.'}
                </p>
              )}
              {isComplete && (
                <p className="mt-0.5 text-xs text-success-600">Completed</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
