import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useParams, Link } from 'react-router-dom';
import { SlidersHorizontal, X, Search } from 'lucide-react';
import { products } from '@/data/products';
import { getCategoryBySlug } from '@/data/categories';
import type { Filters, SortOption, Product } from '@/types';
import FilterPanel from '@/components/FilterPanel';
import SortDropdown from '@/components/SortDropdown';
import ProductGrid from '@/components/ProductGrid';
import { classNames } from '@/utils/format';

const DEFAULT_FILTERS: Filters = {
  categories: [],
  sizes: [],
  colors: [],
  priceRange: [0, 5000],
  fits: [],
  patterns: [],
  minRating: 0,
  minDiscount: 0,
};

export default function ProductsPage() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortOption>('recommended');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const categoryInfo = category ? getCategoryBySlug(category) : null;
  const pageTitle = categoryInfo ? categoryInfo.label : query ? `Search: "${query}"` : 'All Shirts';

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, [category, query, filters, sort]);

  // Apply category from URL
  useEffect(() => {
    if (category && category !== 'sale') {
      setFilters((prev) => ({ ...prev, categories: [category as never] }));
    } else {
      setFilters((prev) => ({ ...prev, categories: [] }));
    }
  }, [category]);

  const filteredProducts = useMemo(() => {
    let result: Product[] = [...products];

    // Category filter (from URL or sidebar)
    if (category === 'sale') {
      result = result.filter((p) => p.discountPercentage >= 30);
    } else if (filters.categories.length > 0) {
      result = result.filter((p) => filters.categories.includes(p.category));
    }

    // Search query
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Size filter
    if (filters.sizes.length > 0) {
      result = result.filter((p) => p.sizes.some((s) => filters.sizes.includes(s)));
    }

    // Color filter
    if (filters.colors.length > 0) {
      result = result.filter((p) => p.colors.some((c) => filters.colors.includes(c.name)));
    }

    // Price filter
    result = result.filter(
      (p) => p.discountPrice >= filters.priceRange[0] && p.discountPrice <= filters.priceRange[1]
    );

    // Fit filter
    if (filters.fits.length > 0) {
      result = result.filter((p) => filters.fits.includes(p.fit));
    }

    // Pattern filter
    if (filters.patterns.length > 0) {
      result = result.filter((p) => filters.patterns.includes(p.pattern));
    }

    // Rating filter
    if (filters.minRating > 0) {
      result = result.filter((p) => p.rating >= filters.minRating);
    }

    // Discount filter
    if (filters.minDiscount > 0) {
      result = result.filter((p) => p.discountPercentage >= filters.minDiscount);
    }

    // Sort
    switch (sort) {
      case 'newest':
        result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
        break;
      case 'price-asc':
        result.sort((a, b) => a.discountPrice - b.discountPrice);
        break;
      case 'price-desc':
        result.sort((a, b) => b.discountPrice - a.discountPrice);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        result.sort((a, b) => b.discountPercentage - a.discountPercentage);
        break;
      default:
        // recommended: featured first, then by rating
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0) || b.rating - a.rating);
    }

    return result;
  }, [category, query, filters, sort]);

  return (
    <div className="container-app py-8 lg:py-12">
      {/* Page header */}
      <div className="mb-8">
        <nav className="mb-3 flex items-center gap-2 text-2xs text-ink-400">
          <Link to="/" className="hover:text-ink-900">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-ink-900">Shop</Link>
          {categoryInfo && (
            <>
              <span>/</span>
              <span className="text-ink-700">{categoryInfo.label}</span>
            </>
          )}
        </nav>
        <h1 className="font-display text-3xl font-medium sm:text-4xl lg:text-5xl">{pageTitle}</h1>
        <p className="mt-2 text-sm text-ink-400">
          {loading ? 'Loading...' : `${filteredProducts.length} ${filteredProducts.length === 1 ? 'product' : 'products'}`}
        </p>
      </div>

      {/* Mobile controls */}
      <div className="mb-6 flex items-center gap-3 lg:hidden">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="flex flex-1 items-center justify-center gap-2 border border-ink-200 px-4 py-2.5 text-sm font-medium transition-colors hover:border-ink-900"
        >
          <SlidersHorizontal size={16} strokeWidth={1.5} />
          Filters
        </button>
        <SortDropdown value={sort} onChange={setSort} />
      </div>

      <div className="flex gap-8 lg:gap-12">
        {/* Desktop sidebar */}
        <aside className="hidden w-64 flex-shrink-0 lg:block">
          <FilterPanel
            filters={filters}
            onChange={setFilters}
            onSortChange={setSort}
            sort={sort}
            productCount={filteredProducts.length}
          />
        </aside>

        {/* Product grid */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i}>
                  <div className="aspect-[3/4] skeleton" />
                  <div className="mt-3 space-y-2">
                    <div className="h-3 w-1/3 skeleton" />
                    <div className="h-4 w-2/3 skeleton" />
                    <div className="h-3 w-1/2 skeleton" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-cream-200">
                <Search size={32} strokeWidth={1} className="text-ink-400" />
              </div>
              <p className="font-display text-xl font-medium">No products found</p>
              <p className="mt-2 max-w-xs text-sm text-ink-400">
                Try adjusting your filters or search to find what you are looking for.
              </p>
              <button
                onClick={() => {
                  setFilters(DEFAULT_FILTERS);
                  setSort('recommended');
                }}
                className="btn-secondary mt-6"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <ProductGrid products={filteredProducts} columns={4} />
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <FilterPanel
          filters={filters}
          onChange={setFilters}
          onSortChange={setSort}
          sort={sort}
          productCount={filteredProducts.length}
          isMobile
          onClose={() => setMobileFiltersOpen(false)}
        />
      )}
    </div>
  );
}
