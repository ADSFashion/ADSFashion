import { Link } from 'react-router-dom';
import { Heart, Star } from 'lucide-react';
import type { Product } from '@/types';
import { useStore } from '@/store/StoreContext';

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { toggleWishlist, isWishlisted, addToCart } = useStore();
  const wished = isWishlisted(product.id);
  const discount = product.compareAt
    ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
    : 0;

  return (
    <div
      className="group flex flex-col animate-fade-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative img-zoom overflow-hidden bg-cream-100">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="aspect-[3/4] w-full object-cover"
          />
        </Link>

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="bg-ink-950 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-cream-50">
              New
            </span>
          )}
          {discount > 0 && (
            <span className="bg-gold-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-ink-950">
              -{discount}%
            </span>
          )}
        </div>

        <button
          onClick={() => toggleWishlist(product.id)}
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300 ${
            wished ? 'bg-gold-500 text-ink-950' : 'bg-cream-50/80 text-ink-800 hover:bg-cream-50'
          }`}
          aria-label="Toggle wishlist"
        >
          <Heart size={16} strokeWidth={1.5} fill={wished ? 'currentColor' : 'none'} />
        </button>

        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={() => addToCart(product)}
            className="btn-shine w-full bg-ink-950/95 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-cream-50 backdrop-blur-md transition-colors hover:bg-gold-500 hover:text-ink-950"
          >
            Add to Bag
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold-600">{product.brand}</p>
        <Link to={`/product/${product.id}`}>
          <h3 className="mt-1.5 font-serif text-lg leading-snug text-ink-900 transition-colors hover:text-gold-700">
            {product.name}
          </h3>
        </Link>
        <div className="mt-1.5 flex items-center gap-1 text-xs text-ink-500">
          <Star size={13} className="fill-gold-400 text-gold-400" strokeWidth={0} />
          <span className="font-medium text-ink-700">{product.rating}</span>
          <span>({product.reviewsCount})</span>
        </div>
        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="font-display text-lg font-semibold text-ink-950">${product.price}</span>
          {product.compareAt && (
            <span className="text-sm text-ink-400 line-through">${product.compareAt}</span>
          )}
        </div>
      </div>
    </div>
  );
}
