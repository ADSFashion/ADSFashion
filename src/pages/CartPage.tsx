import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export function CartPage() {
  const { cart, updateQty, removeFromCart, cartSubtotal } = useStore();
  const shipping = cartSubtotal > 250 || cartSubtotal === 0 ? 0 : 15;
  const total = cartSubtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center border border-ink-200 bg-cream-100 text-ink-400">
          <ShoppingBag size={32} strokeWidth={1.2} />
        </div>
        <h1 className="mt-8 font-display text-3xl font-bold text-ink-950">Your Bag is Empty</h1>
        <p className="mt-3 font-serif text-lg text-ink-500">Discover pieces worth carrying home.</p>
        <Link
          to="/shop"
          className="btn-shine mt-8 inline-flex items-center gap-2 bg-ink-950 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-cream-50 transition-colors hover:bg-gold-500 hover:text-ink-950"
        >
          Start Shopping <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Cart' }]} />
      <h1 className="mt-4 font-display text-3xl font-bold text-ink-950 sm:text-4xl">Shopping Bag</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div className="divide-y divide-ink-200/60">
          {cart.map((item) => (
            <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4 py-6">
              <Link to={`/product/${item.productId}`} className="img-zoom w-24 shrink-0 overflow-hidden bg-cream-100 sm:w-32">
                <img src={item.image} alt={item.name} className="aspect-[3/4] w-full object-cover" />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-2">
                  <div>
                    <Link to={`/product/${item.productId}`} className="font-serif text-lg text-ink-900 hover:text-gold-700">{item.name}</Link>
                    <p className="mt-1 text-xs text-ink-500">Size: {item.size} · Color: {item.color}</p>
                  </div>
                  <p className="font-display text-lg font-semibold text-ink-950">${(item.price * item.quantity).toFixed(0)}</p>
                </div>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="flex items-center border border-ink-200">
                    <button onClick={() => updateQty(item.productId, item.size, item.color, item.quantity - 1)} className="flex h-9 w-9 items-center justify-center text-ink-700 hover:bg-cream-100"><Minus size={14} /></button>
                    <span className="w-9 text-center text-sm font-semibold">{item.quantity}</span>
                    <button onClick={() => updateQty(item.productId, item.size, item.color, item.quantity + 1)} className="flex h-9 w-9 items-center justify-center text-ink-700 hover:bg-cream-100"><Plus size={14} /></button>
                  </div>
                  <button onClick={() => removeFromCart(item.productId, item.size, item.color)} className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.15em] text-ink-400 transition-colors hover:text-red-600">
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit border border-ink-200/60 bg-cream-100/50 p-6">
          <h2 className="font-display text-xl font-bold text-ink-950">Order Summary</h2>
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between text-ink-600"><span>Subtotal</span><span className="font-medium text-ink-900">${cartSubtotal.toFixed(0)}</span></div>
            <div className="flex justify-between text-ink-600"><span>Shipping</span><span className="font-medium text-ink-900">{shipping === 0 ? 'Free' : `$${shipping}`}</span></div>
            <div className="border-t border-ink-200/60 pt-3 flex justify-between text-base">
              <span className="font-semibold text-ink-900">Total</span>
              <span className="font-display text-xl font-bold text-ink-950">${total.toFixed(0)}</span>
            </div>
          </div>
          <Link
            to="/checkout"
            className="btn-shine mt-6 flex w-full items-center justify-center gap-2 bg-ink-950 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-cream-50 transition-colors hover:bg-gold-500 hover:text-ink-950"
          >
            Proceed to Checkout <ArrowRight size={14} />
          </Link>
          <Link to="/shop" className="mt-3 block text-center text-xs font-medium uppercase tracking-[0.15em] text-ink-500 hover:text-gold-600">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
