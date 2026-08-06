import { Link } from 'react-router-dom';
import { ArrowRight, Award, Globe, Leaf, Sparkles } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SectionHeading } from '@/components/SectionHeading';
import { NewsletterCTA } from '@/components/Footer';
import { useReveal } from '@/hooks/useReveal';

function Reveal({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useReveal();
  return <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function AboutPage() {
  const stats = [
    { value: '50K+', label: 'Members' },
    { value: '40+', label: 'Countries' },
    { value: '1,200+', label: 'Curated Pieces' },
    { value: '4.8★', label: 'Avg. Rating' },
  ];
  const values = [
    { icon: Award, title: 'Craftsmanship', text: 'Every piece is finished by hand in our ateliers across Italy and Portugal.' },
    { icon: Leaf, title: 'Responsible', text: 'Responsibly sourced materials and transparent supply chains.' },
    { icon: Globe, title: 'Global Reach', text: 'Shipping to over 40 countries with complimentary returns.' },
    { icon: Sparkles, title: 'Considered Design', text: 'Timeless silhouettes built to last beyond a single season.' },
  ];

  return (
    <div>
      <div className="relative h-[50vh] min-h-[320px] w-full overflow-hidden bg-ink-950">
        <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=2000&q=80" alt="Atelier" className="h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gold-400">Our Story</p>
          <h1 className="mt-4 font-display text-4xl font-bold text-cream-50 sm:text-5xl md:text-6xl">The House of ADS</h1>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'About' }]} />
      </div>

      <section className="mx-auto max-w-4xl px-4 pb-16 text-center lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Est. 2015" title="Luxury, Considered" />
          <p className="mt-6 font-serif text-xl leading-relaxed text-ink-600">
            ADS Fashion was founded on a simple belief: that luxury should be felt, not shouted. We curate
            timeless pieces with a reverence for craft — each garment designed to outlast trends and earn its
            place in your wardrobe season after season.
          </p>
          <p className="mt-4 font-serif text-xl leading-relaxed text-ink-600">
            From our ateliers in Milan and Porto, we work with generational artisans to bring you considered
            design, responsibly sourced materials, and the kind of quiet confidence that only true quality
            can deliver.
          </p>
        </Reveal>
      </section>

      <section className="bg-ink-950 py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 lg:grid-cols-4 lg:px-8">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="text-center">
                <p className="font-display text-4xl font-bold text-gold-300 sm:text-5xl">{s.value}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.25em] text-cream-200/60">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="What We Stand For" title="Our Values" />
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="flex h-full flex-col border border-ink-200/60 bg-cream-100/40 p-6 card-hover">
                <div className="flex h-12 w-12 items-center justify-center border border-gold-300/50 bg-cream-50 text-gold-600">
                  <v.icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-ink-950">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden bg-gradient-to-br from-ink-900 to-ink-950 px-6 py-16 text-center sm:px-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold-500/10 blur-3xl" />
            <h2 className="relative font-display text-3xl font-bold text-cream-50 sm:text-4xl">Join the ADS Family</h2>
            <p className="relative mx-auto mt-4 max-w-md font-serif text-lg text-cream-200/80">
              Discover a wardrobe curated with intention.
            </p>
            <Link to="/shop" className="btn-shine relative mt-8 inline-flex items-center gap-2 bg-gold-400 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-ink-950 hover:bg-gold-300">
              Shop the Collection <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>
      </section>

      <NewsletterCTA />
    </div>
  );
}
