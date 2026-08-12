import { CheckCircle2, ThumbsUp } from 'lucide-react';
import type { Review } from '@/types';
import Rating from './Rating';
import { formatDate } from '@/utils/format';

export default function ReviewCard({ review }: { review: Review }) {
  const initials = review.author.charAt(0).toUpperCase();

  return (
    <div className="border-b border-ink-200 py-6 last:border-b-0">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-ink-900 text-sm font-medium text-cream-50">
          {initials}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-sm font-medium text-ink-900">{review.author}</span>
            {review.verified && (
              <span className="flex items-center gap-1 text-2xs text-success-600">
                <CheckCircle2 size={12} />
                Verified Purchase
              </span>
            )}
            <span className="text-2xs text-ink-400">{formatDate(review.date)}</span>
          </div>
          <div className="mt-1.5">
            <Rating value={review.rating} showCount={false} size="sm" />
          </div>
          <h4 className="mt-2 text-sm font-medium text-ink-900">{review.title}</h4>
          <p className="mt-1 text-sm leading-relaxed text-ink-600">{review.body}</p>
          <button
            type="button"
            onClick={(e) => e.preventDefault()}
            className="mt-3 flex items-center gap-1.5 text-xs text-ink-400 transition-colors hover:text-ink-900"
          >
            <ThumbsUp size={12} />
            Helpful ({review.helpful})
          </button>
        </div>
      </div>
    </div>
  );
}
