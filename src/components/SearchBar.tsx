import { useEffect, useRef, useState } from 'react';
import { Search, X, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { formatPrice } from '@/utils/format';
import { classNames } from '@/utils/format';

const RECENT_KEY = 'nova-recent-searches';

function getRecentSearches(): string[] {
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
  } catch {
    return [];
  }
}

function addRecentSearch(term: string) {
  const recent = getRecentSearches().filter((s) => s !== term);
  recent.unshift(term);
  localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, 5)));
}

const SUGGESTIONS = ['Oversized', 'Linen', 'Oxford', 'Formal', 'Black', 'Premium'];

interface SearchBarProps {
  fullWidth?: boolean;
  onClose?: () => void;
}

export default function SearchBar({ fullWidth = false, onClose }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setRecent(getRecentSearches());
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const matchingProducts = query
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.brand.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const matchingCategories = query
    ? categories.filter((c) => c.label.toLowerCase().includes(query.toLowerCase())).slice(0, 3)
    : [];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    addRecentSearch(query.trim());
    setRecent(getRecentSearches());
    navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
    setIsOpen(false);
    setQuery('');
    onClose?.();
  }

  function handleSuggestionClick(term: string) {
    setQuery(term);
    addRecentSearch(term);
    setRecent(getRecentSearches());
    navigate(`/shop?q=${encodeURIComponent(term)}`);
    setIsOpen(false);
    setQuery('');
    onClose?.();
  }

  return (
    <div ref={containerRef} className={classNames('relative', fullWidth ? 'w-full' : 'w-full max-w-md')}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
            strokeWidth={1.5}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Search shirts, brands, categories..."
            className="w-full border border-ink-200 bg-cream-50 py-2.5 pl-10 pr-10 text-sm text-ink-900 placeholder:text-ink-400 transition-colors focus:border-ink-900"
            aria-label="Search products"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setIsOpen(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-900"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </form>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[70vh] overflow-y-auto border border-ink-200 bg-cream-50 shadow-lg animate-scale-in">
          {!query && (
            <div className="p-4">
              {recent.length > 0 && (
                <div className="mb-4">
                  <p className="label-xs mb-2">Recent searches</p>
                  <div className="flex flex-wrap gap-2">
                    {recent.map((term) => (
                      <button
                        key={term}
                        onClick={() => handleSuggestionClick(term)}
                        className="border border-ink-200 px-3 py-1.5 text-xs text-ink-700 transition-colors hover:border-ink-900 hover:text-ink-900"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className="label-xs mb-2">Trending</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleSuggestionClick(term)}
                      className="flex items-center gap-1.5 border border-ink-200 px-3 py-1.5 text-xs text-ink-700 transition-colors hover:border-ink-900 hover:text-ink-900"
                    >
                      <TrendingUp size={12} className="text-ink-400" />
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {query && matchingProducts.length === 0 && matchingCategories.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-sm text-ink-400">No results for "{query}"</p>
            </div>
          )}

          {query && (matchingProducts.length > 0 || matchingCategories.length > 0) && (
            <div className="p-2">
              {matchingCategories.length > 0 && (
                <div className="mb-2">
                  <p className="label-xs px-2 py-1.5">Categories</p>
                  {matchingCategories.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => {
                        navigate(`/shop/${cat.slug}`);
                        setIsOpen(false);
                        setQuery('');
                        onClose?.();
                      }}
                      className="flex w-full items-center gap-3 px-2 py-2 text-left text-sm text-ink-700 transition-colors hover:bg-cream-200"
                    >
                      <span className="font-medium">{cat.label}</span>
                      <span className="text-xs text-ink-400">{cat.description}</span>
                    </button>
                  ))}
                </div>
              )}
              {matchingProducts.length > 0 && (
                <div>
                  <p className="label-xs px-2 py-1.5">Products</p>
                  {matchingProducts.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        navigate(`/product/${product.slug}`);
                        setIsOpen(false);
                        setQuery('');
                        onClose?.();
                      }}
                      className="flex w-full items-center gap-3 px-2 py-2 text-left transition-colors hover:bg-cream-200"
                    >
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-14 w-12 flex-shrink-0 object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-ink-400">{product.brand}</p>
                        <p className="truncate text-sm font-medium text-ink-900">{product.name}</p>
                        <p className="text-xs font-semibold text-ink-900">
                          {formatPrice(product.discountPrice)}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
