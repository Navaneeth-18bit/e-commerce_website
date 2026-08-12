import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PROMO_IMAGES } from '@/data/products';
import ScrollReveal from '@/components/ScrollReveal';

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <img src={PROMO_IMAGES.formal} alt="NOVA atelier" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink-900/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="mb-3 text-2xs font-medium uppercase tracking-widest text-cream-50/70">Our Story</p>
            <h1 className="font-display text-4xl font-medium text-cream-50 sm:text-5xl lg:text-6xl">
              Crafted With Intention
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container-app py-16 lg:py-24">
        <div className="mx-auto max-w-2xl">
          <ScrollReveal>
            <p className="text-lg leading-relaxed text-ink-600">
              NOVA began with a simple idea: that the everyday shirt deserves the same care and craft as the most
              special piece in your wardrobe. We set out to create shirts that feel considered in every detail —
              from the weight of the fabric to the curve of the collar.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="my-12 grid grid-cols-3 gap-8 border-y border-ink-200 py-10">
              <div className="text-center">
                <p className="font-display text-4xl font-medium">30+</p>
                <p className="mt-1 text-2xs uppercase tracking-widest text-ink-400">Styles</p>
              </div>
              <div className="text-center">
                <p className="font-display text-4xl font-medium">100%</p>
                <p className="mt-1 text-2xs uppercase tracking-widest text-ink-400">Premium Cotton</p>
              </div>
              <div className="text-center">
                <p className="font-display text-4xl font-medium">7-Day</p>
                <p className="mt-1 text-2xs uppercase tracking-widest text-ink-400">Easy Returns</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <h2 className="font-display text-2xl font-medium">Our Philosophy</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-600">
              We believe in fewer, better things. Each NOVA shirt is designed to outlast trends and seasons,
              made from fabrics sourced from the finest mills. We work with skilled artisans who take pride in
              every stitch, ensuring that what you wear is not just clothing, but a testament to thoughtful design.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <h2 className="mt-10 font-display text-2xl font-medium">Sustainability</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-600">
              We are committed to reducing our environmental footprint. Our packaging is recyclable, our cotton
              is responsibly sourced, and we partner with factories that uphold fair labour practices. We believe
              that doing right by the planet and the people who make our clothes is not optional — it is essential.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={250}>
            <div className="mt-12 text-center">
              <Link to="/shop" className="group inline-flex items-center gap-2 bg-ink-900 px-8 py-4 text-sm font-medium uppercase tracking-wider text-cream-50 transition-all hover:bg-ink-800">
                Explore Our Collection
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
