import { Link } from 'react-router-dom';
import { Send, Mail, Globe, Headphones, Sparkles } from 'lucide-react';
import { Logo } from './Logo';

const footerLinks = [
  {
    title: 'Shop',
    links: [
      { to: '/shop', label: 'All Products' },
      { to: '/new-arrivals', label: 'New Arrivals' },
      { to: '/sale', label: 'Sale' },
      { to: '/men', label: 'Men' },
      { to: '/women', label: 'Women' },
      { to: '/kids', label: 'Kids' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/about', label: 'About Us' },
      { to: '/contact', label: 'Contact' },
      { to: '/admin', label: 'Admin Panel' },
    ],
  },
  {
    title: 'Account',
    links: [
      { to: '/login', label: 'Sign In' },
      { to: '/register', label: 'Create Account' },
      { to: '/profile', label: 'My Profile' },
      { to: '/wishlist', label: 'Wishlist' },
      { to: '/cart', label: 'Cart' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 bg-ink-950 text-cream-100">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo className="[&_span]:text-cream-50 [&_.text-gold-600]:text-gold-400" />
            <p className="mt-5 max-w-xs font-serif text-lg leading-relaxed text-cream-200/80">
              Curated luxury fashion, crafted for the modern wardrobe. Timeless pieces, considered design.
            </p>
            <div className="mt-6 flex gap-3">
              {[Mail, Globe, Headphones, Sparkles].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center border border-cream-200/20 text-cream-200/80 transition-all duration-300 hover:border-gold-400 hover:bg-gold-400 hover:text-ink-950"
                  aria-label="Social link"
                >
                  <Icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">{col.title}</h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-cream-200/70 transition-colors duration-300 hover:text-gold-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="gold-rule my-12 opacity-40" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs tracking-wide text-cream-200/50">
            © {new Date().getFullYear()} ADS Fashion. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs tracking-wide text-cream-200/50">
            <span>Secure payments by</span>
            <span className="font-semibold text-gold-400">Razorpay</span>
            <span className="text-cream-200/30">·</span>
            <span>Powered by</span>
            <span className="font-semibold text-gold-400">Firebase</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function NewsletterCTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
      <div className="relative overflow-hidden border border-gold-300/40 bg-ink-950 px-6 py-16 text-center sm:px-16">
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold-400">The Inner Circle</p>
          <h2 className="mt-4 font-display text-3xl font-bold text-cream-50 sm:text-4xl">
            Join the ADS Newsletter
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-serif text-lg text-cream-200/80">
            Be the first to know about new collections, private sales, and members-only events.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto mt-8 flex max-w-md items-center gap-2 border-b border-cream-200/30 pb-2 focus-within:border-gold-400"
          >
            <input
              type="email"
              required
              placeholder="Your email address"
              className="flex-1 bg-transparent py-2 text-sm text-cream-50 placeholder:text-cream-200/40 focus:outline-none"
            />
            <button
              type="submit"
              className="flex h-10 w-10 items-center justify-center bg-gold-400 text-ink-950 transition-colors hover:bg-gold-300"
              aria-label="Subscribe"
            >
              <Send size={16} />
            </button>
          </form>
          <p className="mt-4 text-xs text-cream-200/40">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  );
}
