import { useState } from 'react';
import { ChevronDown, X, SlidersHorizontal } from 'lucide-react';
import type { Filters, SortOption } from '@/types';
import { categories } from '@/data/categories';
import { ALL_SIZES, ALL_FITS, ALL_PATTERNS, ALL_COLORS } from '@/data/products';
import { classNames } from '@/utils/format';

interface FilterPanelProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  onSortChange: (sort: SortOption) => void;
  sort: SortOption;
  productCount: number;
  isMobile?: boolean;
  onClose?: () => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'discount', label: 'Highest Discount' },
];

const PRICE_RANGES: { label: string; value: [number, number] }[] = [
  { label: 'Under ₹1,000', value: [0, 999] },
  { label: '₹1,000 – ₹1,500', value: [1000, 1500] },
  { label: '₹1,500 – ₹2,000', value: [1500, 2000] },
  { label: '₹2,000 – ₹2,500', value: [2000, 2500] },
  { label: 'Above ₹2,500', value: [2500, 5000] },
];

const RATINGS = [4, 3, 2, 1];

function FilterSection({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-ink-200 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-sm font-medium uppercase tracking-wider">{title}</span>
        <ChevronDown
          size={16}
          className={classNames('transition-transform', open ? 'rotate-180' : '')}
        />
      </button>
      {open && <div className="mt-3 space-y-2">{children}</div>}
    </div>
  );
}

export default function FilterPanel({
  filters,
  onChange,
  onSortChange,
  sort,
  productCount,
  isMobile = false,
  onClose,
}: FilterPanelProps) {
  function toggleCategory(slug: string) {
    const newCats = filters.categories.includes(slug as never)
      ? filters.categories.filter((c) => c !== slug)
      : [...filters.categories, slug as never];
    onChange({ ...filters, categories: newCats });
  }

  function toggleSize(size: string) {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];
    onChange({ ...filters, sizes: newSizes });
  }

  function toggleColor(color: string) {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color];
    onChange({ ...filters, colors: newColors });
  }

  function toggleFit(fit: string) {
    const newFits = filters.fits.includes(fit)
      ? filters.fits.filter((f) => f !== fit)
      : [...filters.fits, fit];
    onChange({ ...filters, fits: newFits });
  }

  function togglePattern(pattern: string) {
    const newPatterns = filters.patterns.includes(pattern)
      ? filters.patterns.filter((p) => p !== pattern)
      : [...filters.patterns, pattern];
    onChange({ ...filters, patterns: newPatterns });
  }

  function setPriceRange(range: [number, number]) {
    onChange({ ...filters, priceRange: range });
  }

  function setMinRating(rating: number) {
    onChange({ ...filters, minRating: filters.minRating === rating ? 0 : rating });
  }

  function setMinDiscount(discount: number) {
    onChange({ ...filters, minDiscount: filters.minDiscount === discount ? 0 : discount });
  }

  function clearAll() {
    onChange({
      categories: [],
      sizes: [],
      colors: [],
      priceRange: [0, 5000],
      fits: [],
      patterns: [],
      minRating: 0,
      minDiscount: 0,
    });
  }

  const activeCount =
    filters.categories.length +
    filters.sizes.length +
    filters.colors.length +
    filters.fits.length +
    filters.patterns.length +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.minDiscount > 0 ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 5000 ? 1 : 0);

  const content = (
    <div>
      {/* Mobile sort */}
      {isMobile && (
        <div className="mb-4 border-b border-ink-200 pb-4">
          <p className="label-xs mb-2">Sort by</p>
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="w-full border border-ink-200 bg-cream-50 px-3 py-2.5 text-sm"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Desktop sort */}
      {!isMobile && (
        <div className="border-b border-ink-200 pb-4">
          <p className="label-xs mb-2">Sort by</p>
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="w-full border border-ink-200 bg-cream-50 px-3 py-2.5 text-sm"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <FilterSection title="Category">
        {categories.map((cat) => (
          <label key={cat.slug} className="flex cursor-pointer items-center gap-2.5 text-sm">
            <input
              type="checkbox"
              checked={filters.categories.includes(cat.slug)}
              onChange={() => toggleCategory(cat.slug)}
              className="h-4 w-4 accent-ink-900"
            />
            <span className="text-ink-700">{cat.label}</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Price">
        {PRICE_RANGES.map((range) => {
          const isActive = filters.priceRange[0] === range.value[0] && filters.priceRange[1] === range.value[1];
          return (
            <label key={range.label} className="flex cursor-pointer items-center gap-2.5 text-sm">
              <input
                type="radio"
                name="price"
                checked={isActive}
                onChange={() => setPriceRange(range.value)}
                className="h-4 w-4 accent-ink-900"
              />
              <span className="text-ink-700">{range.label}</span>
            </label>
          );
        })}
      </FilterSection>

      <FilterSection title="Size">
        <div className="flex flex-wrap gap-2">
          {ALL_SIZES.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={classNames(
                'flex h-9 min-w-9 items-center justify-center border px-3 text-sm font-medium transition-colors',
                filters.sizes.includes(size)
                  ? 'border-ink-900 bg-ink-900 text-cream-50'
                  : 'border-ink-200 text-ink-700 hover:border-ink-900'
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Color">
        <div className="flex flex-wrap gap-2">
          {ALL_COLORS.map((color) => (
            <button
              key={color.name}
              onClick={() => toggleColor(color.name)}
              title={color.name}
              className={classNames(
                'flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all',
                filters.colors.includes(color.name)
                  ? 'border-ink-900 ring-1 ring-ink-900 ring-offset-1'
                  : 'border-ink-200 hover:border-ink-400'
              )}
            >
              <span
                className="h-5 w-5 rounded-full"
                style={{ backgroundColor: color.hex }}
              />
            </button>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Fit" defaultOpen={false}>
        {ALL_FITS.map((fit) => (
          <label key={fit} className="flex cursor-pointer items-center gap-2.5 text-sm">
            <input
              type="checkbox"
              checked={filters.fits.includes(fit)}
              onChange={() => toggleFit(fit)}
              className="h-4 w-4 accent-ink-900"
            />
            <span className="text-ink-700">{fit}</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Pattern" defaultOpen={false}>
        {ALL_PATTERNS.map((pattern) => (
          <label key={pattern} className="flex cursor-pointer items-center gap-2.5 text-sm">
            <input
              type="checkbox"
              checked={filters.patterns.includes(pattern)}
              onChange={() => togglePattern(pattern)}
              className="h-4 w-4 accent-ink-900"
            />
            <span className="text-ink-700">{pattern}</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Rating">
        {RATINGS.map((rating) => (
          <label key={rating} className="flex cursor-pointer items-center gap-2.5 text-sm">
            <input
              type="checkbox"
              checked={filters.minRating === rating}
              onChange={() => setMinRating(rating)}
              className="h-4 w-4 accent-ink-900"
            />
            <span className="text-ink-700">{rating}★ & above</span>
          </label>
        ))}
      </FilterSection>

      <FilterSection title="Discount">
        {[10, 20, 30, 40].map((discount) => (
          <label key={discount} className="flex cursor-pointer items-center gap-2.5 text-sm">
            <input
              type="checkbox"
              checked={filters.minDiscount === discount}
              onChange={() => setMinDiscount(discount)}
              className="h-4 w-4 accent-ink-900"
            />
            <span className="text-ink-700">{discount}% & above</span>
          </label>
        ))}
      </FilterSection>
    </div>
  );

  if (isMobile) {
    return (
      <div className="fixed inset-0 z-50 lg:hidden">
        <div className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm animate-fade-in" onClick={onClose} />
        <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto bg-cream-50 animate-slide-up">
          <div className="sticky top-0 flex items-center justify-between border-b border-ink-200 bg-cream-50 px-5 py-4">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={18} strokeWidth={1.5} />
              <h2 className="text-sm font-medium uppercase tracking-widest">Filters</h2>
              {activeCount > 0 && (
                <span className="rounded-full bg-ink-900 px-2 py-0.5 text-2xs font-semibold text-cream-50">
                  {activeCount}
                </span>
              )}
            </div>
            <button onClick={onClose} aria-label="Close filters">
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>
          <div className="px-5">
            {content}
          </div>
          <div className="sticky bottom-0 flex gap-3 border-t border-ink-200 bg-cream-50 px-5 py-4">
            <button onClick={clearAll} className="btn-secondary flex-1">
              Clear All
            </button>
            <button onClick={onClose} className="btn-primary flex-1">
              Show {productCount} Results
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sticky top-36 max-h-[calc(100vh-10rem)] overflow-y-auto pr-2">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-medium uppercase tracking-widest">Filters</h2>
        {activeCount > 0 && (
          <button onClick={clearAll} className="text-xs text-accent-500 hover:underline">
            Clear all ({activeCount})
          </button>
        )}
      </div>
      {content}
    </div>
  );
}
