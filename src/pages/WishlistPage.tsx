import { Link } from 'react-router-dom';
import { Heart, ArrowRight } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/catalog';

export function WishlistPage() {
  const { wishlist } = useStore();
  const items = products.filter((p) => wishlist.includes(p.id));

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center border border-ink-200 bg-cream-100 text-ink-400">
          <Heart size={32} strokeWidth={1.2} />
        </div>
        <h1 className="mt-8 font-display text-3xl font-bold text-ink-950">Your Wishlist is Empty</h1>
        <p className="mt-3 font-serif text-lg text-ink-500">Save the pieces you love for later.</p>
        <Link
          to="/shop"
          className="btn-shine mt-8 inline-flex items-center gap-2 bg-ink-950 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-cream-50 transition-colors hover:bg-gold-500 hover:text-ink-950"
        >
          Explore the Collection <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Wishlist' }]} />
      <h1 className="mt-4 font-display text-3xl font-bold text-ink-950 sm:text-4xl">My Wishlist</h1>
      <p className="mt-2 text-sm text-ink-500">{items.length} {items.length === 1 ? 'piece' : 'pieces'} saved</p>
      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
        {items.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
      </div>
    </div>
  );
}
