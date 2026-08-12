import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import type { SortOption } from '@/types';
import { classNames } from '@/utils/format';

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'discount', label: 'Highest Discount' },
];

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = OPTIONS.find((o) => o.value === value);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 border border-ink-200 px-4 py-2.5 text-sm text-ink-700 transition-colors hover:border-ink-900"
      aria-label="Sort products"
      aria-expanded={open}
      aria-haspopup="listbox"
      role="combobox"
      tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen(!open);
          }
        }}
      >
        <span className="text-ink-400">Sort:</span>
        <span className="font-medium text-ink-900">{current?.label}</span>
        <ChevronDown
          size={16}
          className={classNames('transition-transform', open ? 'rotate-180' : '')}
        />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full z-40 mt-1 min-w-56 border border-ink-200 bg-cream-50 shadow-lg animate-scale-in"
          role="listbox"
        >
          {OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={classNames(
                'flex w-full items-center justify-between px-4 py-3 text-left text-sm transition-colors hover:bg-cream-200',
                value === opt.value ? 'text-ink-900 font-medium' : 'text-ink-700'
              )}
              role="option"
              aria-selected={value === opt.value}
            >
              {opt.label}
              {value === opt.value && <Check size={16} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
