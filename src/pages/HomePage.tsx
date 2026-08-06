import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, ShieldCheck, RefreshCw, Headphones } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { SectionHeading } from '@/components/SectionHeading';
import { NewsletterCTA } from '@/components/Footer';
import { products, categories, reviews } from '@/data/catalog';
import { useReveal } from '@/hooks/useReveal';

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function HeroBanner() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative h-[88vh] min-h-[560px] w-full overflow-hidden bg-ink-950">
      <div
        className={`absolute inset-0 bg-cover bg-center transition-transform duration-[2s] ease-out ${
          loaded ? 'scale-100' : 'scale-110'
        }`}
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=80')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-950/90 via-ink-950/55 to-ink-950/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />

      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 lg:px-8">
        <div className={`max-w-xl transition-all duration-1000 ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold-400">Autumn / Winter 2025</p>
          <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] text-cream-50 sm:text-6xl md:text-7xl">
            Luxury, <span className="gold-text">Redefined</span>
          </h1>
          <p className="mt-6 max-w-md font-serif text-xl leading-relaxed text-cream-200/85">
            Discover the new season — a curated edit of timeless tailoring, fluid silhouettes, and considered craftsmanship.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              to="/shop"
              className="btn-shine group inline-flex items-center justify-center gap-2 bg-cream-50 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-ink-950 transition-colors hover:bg-gold-400"
            >
              Shop the Collection
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/new-arrivals"
              className="inline-flex items-center justify-center gap-2 border border-cream-200/40 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-cream-50 transition-colors hover:border-gold-400 hover:text-gold-300"
            >
              New Arrivals
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-cream-200/50 md:flex">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="h-12 w-px animate-pulse bg-gradient-to-b from-gold-400 to-transparent" />
      </div>
    </section>
  );
}

function Marquee() {
  const items = ['Free Shipping Over $250', 'Members-Only Access', 'Crafted in Italy', '30-Day Returns', 'Secure Checkout'];
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-ink-200/50 bg-cream-100 py-4">
      <div className="flex w-max animate-marquee items-center gap-12">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-12 text-xs font-medium uppercase tracking-[0.25em] text-ink-600">
            {item}
            <span className="text-gold-500">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function FeaturedCategories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
      <Reveal>
        <SectionHeading
          eyebrow="Explore"
          title="Shop by Category"
          subtitle="Four worlds of style. Find your edit."
        />
      </Reveal>
      <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {categories.map((cat, i) => (
          <Reveal key={cat.id} delay={i * 100}>
            <Link to={`/${cat.id}`} className="group relative block aspect-[3/4] overflow-hidden bg-ink-900">
              <img
                src={cat.image}
                alt={cat.name}
                loading="lazy"
                className="h-full w-full object-cover opacity-85 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-center">
                <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-gold-400">{cat.tagline}</p>
                <h3 className="mt-1.5 font-display text-2xl font-bold text-cream-50">{cat.name}</h3>
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-cream-200/70 transition-colors group-hover:text-gold-300">
                  Discover
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProductRow({ title, eyebrow, items, viewAllTo }: { title: string; eyebrow: string; items: typeof products; viewAllTo: string }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
      <Reveal>
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading eyebrow={eyebrow} title={title} align="left" />
          <Link
            to={viewAllTo}
            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-ink-800 transition-colors hover:text-gold-600"
          >
            View All
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </Reveal>
      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
        {items.slice(0, 4).map((p, i) => (
          <Reveal key={p.id} delay={i * 80}>
            <ProductCard product={p} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FlashSale() {
  const [time, setTime] = useState({ h: 8, m: 42, s: 15 });
  useEffect(() => {
    const t = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;
        s -= 1;
        if (s < 0) { s = 59; m -= 1; }
        if (m < 0) { m = 59; h -= 1; }
        if (h < 0) { h = 23; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  const pad = (n: number) => String(n).padStart(2, '0');
  const saleItems = products.filter((p) => p.isOnSale || p.compareAt).slice(0, 3);

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
      <Reveal>
        <div className="relative overflow-hidden border border-gold-300/40 bg-gradient-to-br from-ink-950 to-ink-900 px-6 py-12 sm:px-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold-500/15 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold-400">Limited Time</p>
              <h2 className="mt-4 font-display text-4xl font-bold text-cream-50 sm:text-5xl">Flash Sale</h2>
              <p className="mt-4 font-serif text-lg text-cream-200/80">
                Up to 30% off selected pieces. Ends soon.
              </p>
              <div className="mt-8 flex gap-3">
                {[
                  { label: 'Hours', val: pad(time.h) },
                  { label: 'Mins', val: pad(time.m) },
                  { label: 'Secs', val: pad(time.s) },
                ].map((t) => (
                  <div key={t.label} className="flex flex-col items-center">
                    <div className="flex h-16 w-16 items-center justify-center border border-gold-400/40 bg-ink-900 font-display text-2xl font-bold text-gold-300">
                      {t.val}
                    </div>
                    <span className="mt-2 text-[10px] uppercase tracking-[0.2em] text-cream-200/50">{t.label}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/sale"
                className="btn-shine mt-8 inline-flex items-center gap-2 bg-gold-400 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-ink-950 transition-colors hover:bg-gold-300"
              >
                Shop the Sale <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {saleItems.map((p, i) => (
                <Link key={p.id} to={`/product/${p.id}`} className="group block">
                  <div className="img-zoom overflow-hidden bg-ink-800">
                    <img src={p.images[0]} alt={p.name} loading="lazy" className="aspect-[3/4] w-full object-cover opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100" />
                  </div>
                  <p className="mt-2 truncate text-xs text-cream-200/80">{p.name}</p>
                  <p className="text-sm font-semibold text-gold-300">${p.price}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function CustomerReviews() {
  return (
    <section className="bg-cream-100 py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Loved Worldwide"
            title="What Our Clients Say"
            subtitle="Over 50,000 members across 40 countries."
          />
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r, i) => (
            <Reveal key={r.id} delay={i * 100}>
              <div className="flex h-full flex-col border border-ink-200/50 bg-cream-50 p-6 card-hover">
                <div className="flex gap-0.5">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Star key={j} size={15} className="fill-gold-400 text-gold-400" strokeWidth={0} />
                  ))}
                </div>
                <p className="mt-4 flex-1 font-serif text-lg leading-relaxed text-ink-700">"{r.text}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ink-950 font-display text-sm font-bold text-gold-300">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink-900">{r.name}</p>
                    <p className="text-xs text-ink-500">{r.location}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ValueProps() {
  const props = [
    { icon: Truck, title: 'Free Shipping', text: 'On all orders over $250' },
    { icon: ShieldCheck, title: 'Secure Payment', text: 'Razorpay & Firebase secured' },
    { icon: RefreshCw, title: 'Easy Returns', text: '30-day return policy' },
    { icon: Headphones, title: '24/7 Support', text: 'Dedicated client care' },
  ];
  return (
    <section className="border-y border-ink-200/50 bg-cream-50 py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 lg:grid-cols-4 lg:px-8">
        {props.map((p, i) => (
          <Reveal key={i} delay={i * 80}>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-gold-300/50 bg-cream-100 text-gold-600">
                <p.icon size={20} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-semibold text-ink-900">{p.title}</p>
                <p className="text-xs text-ink-500">{p.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function HomePage() {
  const trending = products.filter((p) => p.isTrending);
  const bestSellers = products.filter((p) => p.isBestSeller);

  return (
    <div>
      <HeroBanner />
      <Marquee />
      <FeaturedCategories />
      <ProductRow eyebrow="This Season" title="Trending Now" items={trending} viewAllTo="/shop" />
      <FlashSale />
      <ProductRow eyebrow="Most Loved" title="Best Sellers" items={bestSellers} viewAllTo="/shop" />
      <ValueProps />
      <CustomerReviews />
      <NewsletterCTA />
    </div>
  );
}
