import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Lock, CreditCard, ArrowRight } from 'lucide-react';
import { useStore } from '@/store/StoreContext';
import { useAuth } from '@/store/AuthContext';
import { Breadcrumbs } from '@/components/Breadcrumbs';

export function CheckoutPage() {
  const { cart, cartSubtotal, clearCart } = useStore();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState<'info' | 'payment' | 'done'>('info');
  const [form, setForm] = useState({
    email: user?.email ?? '',
    name: user?.name ?? '',
    address: '',
    city: '',
    zip: '',
    country: '',
    card: '',
    expiry: '',
    cvc: '',
  });

  const shipping = cartSubtotal > 250 || cartSubtotal === 0 ? 0 : 15;
  const total = cartSubtotal + shipping;

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  if (cart.length === 0 && step !== 'done') {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl text-ink-950">Your bag is empty</h1>
        <Link to="/shop" className="mt-6 inline-block text-gold-600 underline">Continue Shopping</Link>
      </div>
    );
  }

  if (step === 'done') {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold-400 text-ink-950 animate-scale-in">
          <CheckCircle2 size={40} strokeWidth={1.5} />
        </div>
        <h1 className="mt-8 font-display text-3xl font-bold text-ink-950 sm:text-4xl">Order Confirmed</h1>
        <p className="mt-4 font-serif text-lg text-ink-500">
          Thank you, {form.name || 'valued customer'}. Your order has been placed and a confirmation has been sent to {form.email || 'your email'}.
        </p>
        <div className="mt-8 border border-ink-200/60 bg-cream-100/50 p-6 text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">Order Reference</p>
          <p className="mt-1 font-display text-2xl font-bold text-ink-950">ADS-{Math.floor(1000 + Math.random() * 9000)}</p>
          <p className="mt-4 text-sm text-ink-600">Estimated delivery: 3–5 business days</p>
        </div>
        <Link to="/shop" className="btn-shine mt-8 inline-flex items-center gap-2 bg-ink-950 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-cream-50 hover:bg-gold-500 hover:text-ink-950">
          Continue Shopping <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Cart', to: '/cart' }, { label: 'Checkout' }]} />
      <h1 className="mt-4 font-display text-3xl font-bold text-ink-950 sm:text-4xl">Checkout</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          {/* Steps indicator */}
          <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.15em]">
            <span className={step === 'info' ? 'text-gold-600' : 'text-ink-300'}>1. Information</span>
            <span className="h-px flex-1 bg-ink-200" />
            <span className={step === 'payment' ? 'text-gold-600' : 'text-ink-300'}>2. Payment</span>
          </div>

          {step === 'info' && (
            <form
              onSubmit={(e) => { e.preventDefault(); setStep('payment'); }}
              className="mt-8 space-y-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full Name" value={form.name} onChange={(v) => update('name', v)} required />
                <Field label="Email" type="email" value={form.email} onChange={(v) => update('email', v)} required />
              </div>
              <Field label="Address" value={form.address} onChange={(v) => update('address', v)} required />
              <div className="grid gap-5 sm:grid-cols-3">
                <Field label="City" value={form.city} onChange={(v) => update('city', v)} required />
                <Field label="ZIP / Postal" value={form.zip} onChange={(v) => update('zip', v)} required />
                <Field label="Country" value={form.country} onChange={(v) => update('country', v)} required />
              </div>
              <button className="btn-shine flex w-full items-center justify-center gap-2 bg-ink-950 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-cream-50 hover:bg-gold-500 hover:text-ink-950">
                Continue to Payment <ArrowRight size={14} />
              </button>
            </form>
          )}

          {step === 'payment' && (
            <form
              onSubmit={(e) => { e.preventDefault(); clearCart(); setStep('done'); }}
              className="mt-8 space-y-5"
            >
              <div className="flex items-center gap-3 border border-gold-300/50 bg-cream-100/60 p-4">
                <CreditCard size={20} className="text-gold-600" />
                <div>
                  <p className="text-sm font-semibold text-ink-900">Razorpay Secure Checkout</p>
                  <p className="text-xs text-ink-500">Your payment is encrypted and protected.</p>
                </div>
              </div>
              <Field label="Card Number" value={form.card} onChange={(v) => update('card', v)} placeholder="0000 0000 0000 0000" required />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Expiry" value={form.expiry} onChange={(v) => update('expiry', v)} placeholder="MM / YY" required />
                <Field label="CVC" value={form.cvc} onChange={(v) => update('cvc', v)} placeholder="123" required />
              </div>
              <div className="flex items-center gap-3 text-xs text-ink-500">
                <Lock size={14} className="text-gold-600" />
                Payments are processed securely via Razorpay. We never store your card details.
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setStep('info')} className="border border-ink-200 px-6 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-ink-700 hover:border-ink-900">
                  Back
                </button>
                <button className="btn-shine flex flex-1 items-center justify-center gap-2 bg-ink-950 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-cream-50 hover:bg-gold-500 hover:text-ink-950">
                  Pay ${total.toFixed(0)}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Summary */}
        <div className="h-fit border border-ink-200/60 bg-cream-100/50 p-6">
          <h2 className="font-display text-xl font-bold text-ink-950">Order Summary</h2>
          <div className="mt-5 space-y-4">
            {cart.map((item) => (
              <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-3">
                <div className="relative w-16 shrink-0 overflow-hidden bg-cream-100">
                  <img src={item.image} alt={item.name} className="aspect-[3/4] w-full object-cover" />
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-ink-950 text-[10px] font-bold text-cream-50">{item.quantity}</span>
                </div>
                <div className="flex flex-1 flex-col">
                  <p className="text-sm font-medium text-ink-900">{item.name}</p>
                  <p className="text-xs text-ink-500">{item.size} · {item.color}</p>
                  <p className="mt-auto text-sm font-semibold text-ink-900">${(item.price * item.quantity).toFixed(0)}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-2 border-t border-ink-200/60 pt-4 text-sm">
            <div className="flex justify-between text-ink-600"><span>Subtotal</span><span className="font-medium text-ink-900">${cartSubtotal.toFixed(0)}</span></div>
            <div className="flex justify-between text-ink-600"><span>Shipping</span><span className="font-medium text-ink-900">{shipping === 0 ? 'Free' : `$${shipping}`}</span></div>
            <div className="border-t border-ink-200/60 pt-2 flex justify-between text-base">
              <span className="font-semibold text-ink-900">Total</span>
              <span className="font-display text-xl font-bold text-ink-950">${total.toFixed(0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = 'text', placeholder, required }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-700">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full border border-ink-200 bg-cream-50 px-4 py-3 text-sm text-ink-900 placeholder:text-ink-300 focus:border-gold-400 focus:outline-none"
      />
    </label>
  );
}
