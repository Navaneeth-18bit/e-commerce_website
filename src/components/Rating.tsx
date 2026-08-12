import { Star } from 'lucide-react';
import { classNames } from '@/utils/format';

interface RatingProps {
  value: number;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  className?: string;
}

export default function Rating({ value, count, size = 'sm', showCount = true, className }: RatingProps) {
  const sizes = {
    sm: { star: 12, text: 'text-2xs' },
    md: { star: 14, text: 'text-xs' },
    lg: { star: 16, text: 'text-sm' },
  };
  const s = sizes[size];

  return (
    <div className={classNames('flex items-center gap-1.5', className)}>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => {
          const fill = Math.max(0, Math.min(1, value - (i - 1)));
          return (
            <div key={i} className="relative" style={{ width: s.star, height: s.star }}>
              <Star
                size={s.star}
                className="absolute inset-0 text-ink-200"
                strokeWidth={1.5}
              />
              <div className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Star
                  size={s.star}
                  className="text-accent-500 fill-accent-500"
                  strokeWidth={1.5}
                />
              </div>
            </div>
          );
        })}
      </div>
      <span className={classNames('font-medium text-ink-700', s.text)}>
        {value.toFixed(1)}
      </span>
      {showCount && count !== undefined && (
        <span className={classNames('text-ink-400', s.text)}>
          ({count})
        </span>
      )}
    </div>
  );
}
