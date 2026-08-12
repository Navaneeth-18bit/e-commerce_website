import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { products, HERO_IMAGES, PROMO_IMAGES } from '@/data/products';
import { categories } from '@/data/categories';
import ProductGrid from '@/components/ProductGrid';
import ScrollReveal from '@/components/ScrollReveal';

export default function HomePage() {
  const featured = products.filter((p) => p.isFeatured).slice(0, 8);
  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] w-full overflow-hidden lg:h-[85vh]">
        <img
          src={HERO_IMAGES.primary}
          alt="Model wearing a NOVA shirt"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-ink-900/10 to-ink-900/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="container-app pb-16 lg:pb-24">
            <div className="max-w-xl">
              <p className="mb-4 text-2xs font-medium uppercase tracking-widest text-cream-50/80 animate-fade-up">
                Autumn / Winter 2025
              </p>
              <h1 className="font-display text-5xl font-medium leading-[1.05] text-cream-50 sm:text-6xl lg:text-7xl animate-fade-up" style={{ animationDelay: '100ms' }}>
                The New
                <br />
                Essentials
              </h1>
              <p className="mt-5 max-w-md text-base leading-relaxed text-cream-50/90 animate-fade-up" style={{ animationDelay: '200ms' }}>
                Everyday shirts, refined for every moment.
              </p>
              <Link
                to="/shop"
                className="group mt-8 inline-flex items-center gap-2 bg-cream-50 px-8 py-4 text-sm font-medium uppercase tracking-wider text-ink-900 transition-all hover:bg-ink-900 hover:text-cream-50 animate-fade-up"
                style={{ animationDelay: '300ms' }}
              >
                Shop Collection
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-app py-16 lg:py-24">
        <ScrollReveal>
          <div className="mb-10 text-center">
            <p className="label-xs mb-2">Explore</p>
            <h2 className="font-display text-3xl font-medium sm:text-4xl">Shop by Category</h2>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7 lg:gap-3">
          {categories.map((cat, i) => (
            <ScrollReveal key={cat.slug} delay={i * 50}>
              <Link
                to={`/shop/${cat.slug}`}
                className="group block overflow-hidden bg-cream-200"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.label}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 text-center">
                  <p className="text-sm font-medium text-ink-900">{cat.label}</p>
                  <p className="mt-0.5 text-2xs text-ink-400">{cat.description}</p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container-app pb-16 lg:pb-24">
        <ScrollReveal>
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="label-xs mb-2">Handpicked</p>
              <h2 className="font-display text-3xl font-medium sm:text-4xl">Curated For You</h2>
            </div>
            <Link
              to="/shop"
              className="group hidden items-center gap-1.5 text-sm font-medium uppercase tracking-wider text-ink-700 hover:text-ink-900 sm:flex"
            >
              View All
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
        <ProductGrid products={featured} columns={4} />
      </section>

      {/* Promo 1 — Essential Shirts */}
      <section className="relative overflow-hidden">
        <div className="grid lg:grid-cols-2">
          <div className="relative aspect-[4/5] lg:aspect-auto lg:min-h-[500px]">
            <img
              src={PROMO_IMAGES.essentials}
              alt="Essential shirts collection"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="flex items-center justify-center bg-cream-100 px-8 py-16 lg:px-16">
            <div className="max-w-md">
              <p className="label-xs mb-3">Collection</p>
              <h2 className="font-display text-4xl font-medium leading-tight sm:text-5xl">
                Essential Shirts
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-500">
                Designed for everyday wear. Cut from premium fabrics, built to last beyond the season.
              </p>
              <Link
                to="/shop/casual"
                className="group mt-8 inline-flex items-center gap-2 border-b border-ink-900 pb-1 text-sm font-medium uppercase tracking-wider text-ink-900 transition-all hover:gap-3"
              >
                Explore
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="container-app py-16 lg:py-24">
        <ScrollReveal>
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="label-xs mb-2">Just Landed</p>
              <h2 className="font-display text-3xl font-medium sm:text-4xl">New Arrivals</h2>
            </div>
            <Link
              to="/shop/new-arrivals"
              className="group hidden items-center gap-1.5 text-sm font-medium uppercase tracking-wider text-ink-700 hover:text-ink-900 sm:flex"
            >
              View All
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
        <ProductGrid products={newArrivals} columns={4} />
      </section>

      {/* Promo 2 — Sale */}
      <section className="relative overflow-hidden bg-ink-900">
        <div className="container-app py-20 lg:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <ScrollReveal>
              <p className="label-xs mb-3 text-cream-50/60">Limited Time</p>
              <h2 className="font-display text-5xl font-medium text-cream-50 sm:text-6xl">
                Up to 40% Off
              </h2>
              <p className="mt-4 text-base text-cream-50/70">
                Selected styles. Refresh your wardrobe without compromise.
              </p>
              <Link
                to="/shop/sale"
                className="group mt-8 inline-flex items-center gap-2 bg-cream-50 px-8 py-4 text-sm font-medium uppercase tracking-wider text-ink-900 transition-all hover:bg-accent-500 hover:text-cream-50"
              >
                Shop Sale
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Promo 3 — Linen */}
      <section className="relative overflow-hidden">
        <div className="grid lg:grid-cols-2">
          <div className="order-2 flex items-center justify-center bg-cream-100 px-8 py-16 lg:order-1 lg:px-16">
            <div className="max-w-md">
              <p className="label-xs mb-3">Collection</p>
              <h2 className="font-display text-4xl font-medium leading-tight sm:text-5xl">
                The Linen Edit
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-500">
                Breathable, lightweight, and effortlessly elegant. Discover shirts made for warm days and easy evenings.
              </p>
              <Link
                to="/shop/linen"
                className="group mt-8 inline-flex items-center gap-2 border-b border-ink-900 pb-1 text-sm font-medium uppercase tracking-wider text-ink-900 transition-all hover:gap-3"
              >
                Explore
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="order-1 relative aspect-[4/5] lg:order-2 lg:aspect-auto lg:min-h-[500px]">
            <img
              src={PROMO_IMAGES.linen}
              alt="Linen collection"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
