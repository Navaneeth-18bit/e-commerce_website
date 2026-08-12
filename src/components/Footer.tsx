import { Link } from 'react-router-dom';
import { Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  const sections = [
    {
      title: 'Shop',
      links: [
        { label: 'New Arrivals', path: '/shop/new-arrivals' },
        { label: 'All Shirts', path: '/shop' },
        { label: 'Collections', path: '/shop' },
        { label: 'Sale', path: '/shop/sale' },
      ],
    },
    {
      title: 'Help',
      links: [
        { label: 'Contact Us', path: '/contact' },
        { label: 'Shipping', path: '/contact' },
        { label: 'Returns', path: '/contact' },
        { label: 'Size Guide', path: '/contact' },
      ],
    },
    {
      title: 'About',
      links: [
        { label: 'Our Story', path: '/about' },
        { label: 'Sustainability', path: '/about' },
        { label: 'Careers', path: '/about' },
        { label: 'Press', path: '/about' },
      ],
    },
  ];

  return (
    <footer className="mt-20 border-t border-ink-200 bg-cream-100">
      <div className="container-app py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block">
              <span className="font-display text-3xl font-bold tracking-[0.15em]">NOVA</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-500">
              Everyday shirts, refined for every moment. Crafted with intention, designed to last.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="flex h-9 w-9 items-center justify-center border border-ink-200 text-ink-700 transition-colors hover:border-ink-900 hover:text-ink-900"
                aria-label="Instagram"
              >
                <Instagram size={16} strokeWidth={1.5} />
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="flex h-9 w-9 items-center justify-center border border-ink-200 text-ink-700 transition-colors hover:border-ink-900 hover:text-ink-900"
                aria-label="Facebook"
              >
                <Facebook size={16} strokeWidth={1.5} />
              </a>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="flex h-9 w-9 items-center justify-center border border-ink-200 text-ink-700 transition-colors hover:border-ink-900 hover:text-ink-900"
                aria-label="Pinterest"
              >
                <span className="text-xs font-semibold">P</span>
              </a>
            </div>
          </div>

          {/* Link sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h4 className="label-xs mb-4">{section.title}</h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-ink-500 transition-colors hover:text-ink-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink-200 pt-8 sm:flex-row">
          <p className="text-xs text-ink-400">
            © 2025 NOVA. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a href="#" onClick={(e) => e.preventDefault()} className="text-xs text-ink-400 transition-colors hover:text-ink-900">Privacy Policy</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="text-xs text-ink-400 transition-colors hover:text-ink-900">Terms of Service</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="text-xs text-ink-400 transition-colors hover:text-ink-900">Shipping Policy</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="text-xs text-ink-400 transition-colors hover:text-ink-900">Returns</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
