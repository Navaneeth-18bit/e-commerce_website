import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Heart, ShoppingBag, User, Search } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { categories } from '@/data/categories';
import SearchBar from './SearchBar';
import { classNames } from '@/utils/format';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const { cartCount, wishlist, setCartOpen } = useStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Men', path: '/shop' },
    { label: 'Women', path: '/shop' },
    { label: 'Collections', path: '/shop' },
    ...categories.slice(0, 5).map((c) => ({ label: c.label, path: `/shop/${c.slug}` })),
  ];

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-ink-900 px-4 py-2 text-center text-2xs font-medium uppercase tracking-widest text-cream-50">
        Free shipping on orders above ₹999 · Use code WELCOME15 for 15% off
      </div>

      <header
        className={classNames(
          'sticky top-0 z-40 transition-all duration-300',
          scrolled
            ? 'border-b border-ink-200 bg-cream-50/95 backdrop-blur-md'
            : 'border-b border-transparent bg-cream-50'
        )}
      >
        <div className="container-app">
          <div className="flex h-16 items-center justify-between gap-4 lg:h-20">
            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <span className="font-display text-2xl font-bold tracking-[0.15em] lg:text-3xl">
                NOVA
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden flex-1 items-center justify-center gap-8 lg:flex">
              {navLinks.slice(0, 3).map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className="link-underline text-sm font-medium uppercase tracking-wider text-ink-700 transition-colors hover:text-ink-900"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop search */}
            <div className="hidden flex-1 max-w-xs lg:block">
              <SearchBar />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                className="lg:hidden"
                aria-label="Search"
              >
                <Search size={20} strokeWidth={1.5} />
              </button>
              <Link
                to="/wishlist"
                className="relative p-2 transition-colors hover:text-ink-500"
                aria-label="Wishlist"
              >
                <Heart size={20} strokeWidth={1.5} />
                {wishlist.length > 0 && (
                  <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent-500 px-1 text-2xs font-semibold text-cream-50">
                    {wishlist.length}
                  </span>
                )}
              </Link>
              <Link
                to="/account"
                className="hidden p-2 transition-colors hover:text-ink-500 sm:block"
                aria-label="Account"
              >
                <User size={20} strokeWidth={1.5} />
              </Link>
              <button
                type="button"
                onClick={() => setCartOpen(true)}
                className="relative p-2 transition-colors hover:text-ink-500"
                aria-label="Shopping bag"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-ink-900 px-1 text-2xs font-semibold text-cream-50">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile search */}
          {mobileSearchOpen && (
            <div className="pb-4 lg:hidden">
              <SearchBar fullWidth onClose={() => setMobileSearchOpen(false)} />
            </div>
          )}

          {/* Desktop category bar */}
          <nav className="hidden border-t border-ink-200 lg:block">
            <div className="flex items-center justify-center gap-8 py-3">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/shop/${cat.slug}`}
                  className={classNames(
                    'link-underline text-2xs font-medium uppercase tracking-widest transition-colors hover:text-ink-900',
                    location.pathname === `/shop/${cat.slug}` ? 'text-ink-900' : 'text-ink-500'
                  )}
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile menu drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[85%] max-w-sm bg-cream-50 shadow-xl animate-slide-in-right">
            <div className="flex items-center justify-between border-b border-ink-200 px-4 py-4">
              <span className="font-display text-2xl font-bold tracking-[0.15em]">NOVA</span>
              <button onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>
            <div className="overflow-y-auto p-4">
              <div className="space-y-1">
                <p className="label-xs mb-2 px-3">Shop</p>
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => {
                      navigate(`/shop/${cat.slug}`);
                      setMobileMenuOpen(false);
                    }}
                    className="flex w-full items-center justify-between px-3 py-3 text-left text-sm font-medium text-ink-900 transition-colors hover:bg-cream-200"
                  >
                    {cat.label}
                    <span className="text-xs text-ink-400">{cat.description}</span>
                  </button>
                ))}
              </div>
              <div className="mt-6 space-y-1 border-t border-ink-200 pt-6">
                <button
                  onClick={() => {
                    navigate('/account');
                    setMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-3 px-3 py-3 text-left text-sm font-medium text-ink-900 transition-colors hover:bg-cream-200"
                >
                  <User size={18} strokeWidth={1.5} />
                  My Account
                </button>
                <button
                  onClick={() => {
                    navigate('/wishlist');
                    setMobileMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-3 px-3 py-3 text-left text-sm font-medium text-ink-900 transition-colors hover:bg-cream-200"
                >
                  <Heart size={18} strokeWidth={1.5} />
                  Wishlist
                  {wishlist.length > 0 && (
                    <span className="ml-auto text-xs text-ink-400">{wishlist.length}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
