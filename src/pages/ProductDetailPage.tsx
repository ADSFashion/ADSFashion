import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Heart, Minus, Plus, ShoppingBag, Star, Truck, RefreshCw, ShieldCheck, ChevronRight } from 'lucide-react';
import { getProduct } from '@/store/StoreContext';
import { useStore } from '@/store/StoreContext';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/catalog';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProduct(id) : undefined;
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState(product?.sizes[0] ?? '');
  const [color, setColor] = useState(product?.colors[0] ?? '');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-32 text-center">
        <h1 className="font-display text-3xl text-ink-900">Product not found</h1>
        <Link to="/shop" className="mt-6 inline-block text-gold-600 underline">Back to Shop</Link>
      </div>
    );
  }

  const wished = isWishlisted(product.id);
  const discount = product.compareAt
    ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
    : 0;
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    addToCart(product, size, color, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Shop', to: '/shop' }, { label: product.name }]} />

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div className="flex flex-col gap-4">
          <div className="img-zoom relative overflow-hidden bg-cream-100">
            <img src={product.images[activeImg]} alt={product.name} className="aspect-[3/4] w-full object-cover" />
            {discount > 0 && (
              <span className="absolute left-4 top-4 bg-gold-500 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-ink-950">
                -{discount}%
              </span>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`overflow-hidden border-2 transition-colors ${activeImg === i ? 'border-gold-500' : 'border-transparent hover:border-ink-300'}`}
                >
                  <img src={img} alt="" className="h-24 w-20 object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="lg:pt-4">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-600">{product.brand}</p>
          <h1 className="mt-2 font-display text-3xl font-bold text-ink-950 sm:text-4xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={15} className={i < Math.round(product.rating) ? 'fill-gold-400 text-gold-400' : 'text-ink-300'} strokeWidth={0} />
              ))}
            </div>
            <span className="text-sm text-ink-500">{product.rating} · {product.reviewsCount} reviews</span>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-display text-3xl font-bold text-ink-950">${product.price}</span>
            {product.compareAt && <span className="text-lg text-ink-400 line-through">${product.compareAt}</span>}
          </div>

          <p className="mt-5 font-serif text-lg leading-relaxed text-ink-600">{product.description}</p>

          {/* Color */}
          <div className="mt-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-900">Color: <span className="text-ink-500">{color}</span></p>
            <div className="mt-3 flex gap-2.5">
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`border px-4 py-2.5 text-xs font-medium transition-all ${color === c ? 'border-ink-950 bg-ink-950 text-cream-50' : 'border-ink-200 text-ink-700 hover:border-ink-900'}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-900">Size</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`min-w-12 border px-3 py-2.5 text-xs font-medium transition-all ${size === s ? 'border-ink-950 bg-ink-950 text-cream-50' : 'border-ink-200 text-ink-700 hover:border-ink-900'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Qty + actions */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center border border-ink-200">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-12 w-12 items-center justify-center text-ink-700 hover:bg-cream-100"><Minus size={16} /></button>
              <span className="w-12 text-center font-semibold text-ink-900">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="flex h-12 w-12 items-center justify-center text-ink-700 hover:bg-cream-100"><Plus size={16} /></button>
            </div>
            <button
              onClick={handleAdd}
              className="btn-shine flex flex-1 items-center justify-center gap-2 bg-ink-950 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-cream-50 transition-colors hover:bg-gold-500 hover:text-ink-950"
            >
              <ShoppingBag size={16} />
              {added ? 'Added to Bag' : 'Add to Bag'}
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`flex h-12 w-12 items-center justify-center border transition-all ${wished ? 'border-gold-500 bg-gold-500 text-ink-950' : 'border-ink-200 text-ink-700 hover:border-ink-900'}`}
              aria-label="Wishlist"
            >
              <Heart size={18} fill={wished ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Trust */}
          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-ink-200/60 pt-6">
            {[
              { icon: Truck, text: 'Free shipping over $250' },
              { icon: RefreshCw, text: '30-day easy returns' },
              { icon: ShieldCheck, text: 'Secure checkout' },
            ].map((t, i) => (
              <div key={i} className="flex flex-col items-center gap-2 text-center">
                <t.icon size={20} strokeWidth={1.5} className="text-gold-600" />
                <p className="text-[11px] leading-tight text-ink-500">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-24">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-ink-950 sm:text-3xl">You May Also Like</h2>
            <Link to="/shop" className="group flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-ink-700 hover:text-gold-600">
              View All <ChevronRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </section>
      )}
    </div>
  );
}
