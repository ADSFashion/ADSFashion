import { useMemo, useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { products as allProducts } from '@/data/catalog';
import type { Category } from '@/types';

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'newest' | 'rating';

interface ShopPageProps {
  title: string;
  eyebrow?: string;
  bannerImage?: string;
  category?: Category;
  filter?: (p: typeof allProducts[number]) => boolean;
  breadcrumbs: { label: string; to?: string }[];
}

export function ShopPage({ title, eyebrow, bannerImage, category, filter, breadcrumbs }: ShopPageProps) {
  const [sort, setSort] = useState<SortKey>('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 700]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const base = useMemo(() => {
    let list = category ? allProducts.filter((p) => p.category === category) : [...allProducts];
    if (filter) list = allProducts.filter(filter);
    return list;
  }, [category, filter]);

  const allSizes = useMemo(() => {
    const s = new Set<string>();
    base.forEach((p) => p.sizes.forEach((sz) => s.add(sz)));
    return Array.from(s);
  }, [base]);

  const filtered = useMemo(() => {
    let list = base.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (selectedSizes.length) {
      list = list.filter((p) => p.sizes.some((s) => selectedSizes.includes(s)));
    }
    switch (sort) {
      case 'price-asc': list = [...list].sort((a, b) => a.price - b.price); break;
      case 'price-desc': list = [...list].sort((a, b) => b.price - a.price); break;
      case 'newest': list = [...list].sort((a, b) => b.createdAt.localeCompare(a.createdAt)); break;
      case 'rating': list = [...list].sort((a, b) => b.rating - a.rating); break;
      default: break;
    }
    return list;
  }, [base, priceRange, selectedSizes, sort]);

  const toggleSize = (s: string) =>
    setSelectedSizes((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));

  const FilterPanel = () => (
    <div className="space-y-8">
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-900">Price Range</h4>
        <div className="mt-4 flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={700}
            step={10}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            className="flex-1 accent-gold-500"
          />
          <span className="text-sm font-medium text-ink-700">${priceRange[1]}</span>
        </div>
      </div>
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-900">Size</h4>
        <div className="mt-4 flex flex-wrap gap-2">
          {allSizes.map((s) => (
            <button
              key={s}
              onClick={() => toggleSize(s)}
              className={`min-w-10 border px-3 py-2 text-xs font-medium transition-all ${
                selectedSizes.includes(s)
                  ? 'border-ink-950 bg-ink-950 text-cream-50'
                  : 'border-ink-200 text-ink-700 hover:border-ink-900'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      {(selectedSizes.length > 0 || priceRange[1] < 700) && (
        <button
          onClick={() => { setSelectedSizes([]); setPriceRange([0, 700]); }}
          className="text-xs font-medium uppercase tracking-[0.15em] text-gold-600 hover:text-gold-700"
        >
          Clear Filters
        </button>
      )}
    </div>
  );

  return (
    <div>
      {bannerImage && (
        <div className="relative h-[42vh] min-h-[280px] w-full overflow-hidden bg-ink-950">
          <img src={bannerImage} alt={title} className="h-full w-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/30 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
            {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold-400">{eyebrow}</p>}
            <h1 className="mt-3 font-display text-4xl font-bold text-cream-50 sm:text-5xl md:text-6xl">{title}</h1>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className={bannerImage ? '' : 'pt-4'}>
          {!bannerImage && (
            <>
              {eyebrow && <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold-600">{eyebrow}</p>}
              <h1 className="mt-2 font-display text-4xl font-bold text-ink-950 sm:text-5xl">{title}</h1>
            </>
          )}
          <div className="mt-6">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4 border-y border-ink-200/60 py-3">
          <button
            onClick={() => setShowFilters(true)}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-ink-800 lg:hidden"
          >
            <SlidersHorizontal size={14} /> Filters
          </button>
          <p className="hidden text-sm text-ink-500 lg:block">{filtered.length} pieces</p>
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium uppercase tracking-[0.15em] text-ink-500">Sort</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="border border-ink-200 bg-cream-50 px-3 py-2 text-sm text-ink-800 focus:border-gold-400 focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        <div className="mt-8 flex gap-10">
          <aside className="hidden w-56 shrink-0 lg:block">
            <FilterPanel />
          </aside>
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <p className="font-serif text-xl text-ink-500">No pieces match your filters.</p>
                <button
                  onClick={() => { setSelectedSizes([]); setPriceRange([0, 700]); }}
                  className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-gold-600"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 xl:grid-cols-3">
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
          <div className="absolute right-0 top-0 h-full w-[82%] max-w-sm animate-slide-down overflow-y-auto bg-cream-50 p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-bold text-ink-950">Filters</h3>
              <button onClick={() => setShowFilters(false)} className="text-ink-700"><X size={20} /></button>
            </div>
            <div className="mt-8"><FilterPanel /></div>
          </div>
        </div>
      )}
    </div>
  );
}
