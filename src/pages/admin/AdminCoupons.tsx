import { useState } from 'react';
import { Plus, Trash2, X, TicketPercent } from 'lucide-react';
import { coupons as initialCoupons } from '@/data/catalog';
import type { Coupon } from '@/types';

export function AdminCoupons() {
  const [items, setItems] = useState<Coupon[]>(initialCoupons);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Coupon>({
    id: '', code: '', type: 'percent', value: 10, minOrder: 0, active: true,
  });

  const handleAdd = () => {
    const newCoupon: Coupon = { ...form, id: `c${Date.now()}` };
    setItems((prev) => [newCoupon, ...prev]);
    setShowForm(false);
    setForm({ id: '', code: '', type: 'percent', value: 10, minOrder: 0, active: true });
  };

  const handleDelete = (id: string) => setItems((prev) => prev.filter((c) => c.id !== id));

  const toggleActive = (id: string) =>
    setItems((prev) => prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c)));

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink-950">Coupons</h2>
          <p className="text-sm text-ink-500">{items.length} discount codes</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-shine flex items-center gap-2 bg-ink-950 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-cream-50 hover:bg-gold-500 hover:text-ink-950">
          <Plus size={15} /> Add Coupon
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => (
          <div key={c.id} className="relative border border-ink-200/60 bg-cream-50 p-5 card-hover">
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gold-400/15 text-gold-600">
                <TicketPercent size={18} strokeWidth={1.5} />
              </div>
              <button onClick={() => toggleActive(c.id)} className={`relative h-6 w-11 rounded-full transition-colors ${c.active ? 'bg-green-500' : 'bg-ink-200'}`}>
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${c.active ? 'left-5' : 'left-0.5'}`} />
              </button>
            </div>
            <h3 className="mt-4 font-display text-2xl font-bold tracking-wide text-ink-950">{c.code}</h3>
            <p className="mt-1 text-sm text-ink-600">
              {c.type === 'percent' ? `${c.value}% off` : `$${c.value} off`}
              {c.minOrder > 0 && ` · Min $${c.minOrder}`}
            </p>
            {c.expiresAt && <p className="mt-1 text-xs text-ink-400">Expires {c.expiresAt}</p>}
            <div className="mt-4 flex items-center justify-between border-t border-ink-100 pt-3">
              <span className={`text-[10px] font-semibold uppercase tracking-wide ${c.active ? 'text-green-600' : 'text-ink-400'}`}>{c.active ? 'Active' : 'Inactive'}</span>
              <button onClick={() => handleDelete(c.id)} className="flex h-8 w-8 items-center justify-center border border-red-200 text-red-500 hover:bg-red-50"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative w-full max-w-md animate-scale-in border border-ink-200 bg-cream-50 p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl font-bold text-ink-950">Add Coupon</h3>
              <button onClick={() => setShowForm(false)} className="text-ink-500"><X size={20} /></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleAdd(); }} className="mt-5 space-y-4">
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wide text-ink-700">Code</span>
                <input value={form.code} onChange={(e) => setForm((p) => ({ ...p, code: e.target.value.toUpperCase() }))} required placeholder="SUMMER15" className="mt-1.5 w-full border border-ink-200 bg-cream-50 px-3 py-2.5 text-sm uppercase focus:border-gold-400 focus:outline-none" />
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wide text-ink-700">Type</span>
                  <select value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value as 'percent' | 'fixed' }))} className="mt-1.5 w-full border border-ink-200 bg-cream-50 px-3 py-2.5 text-sm focus:border-gold-400 focus:outline-none">
                    <option value="percent">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-wide text-ink-700">Value</span>
                  <input type="number" value={form.value} onChange={(e) => setForm((p) => ({ ...p, value: Number(e.target.value) }))} required className="mt-1.5 w-full border border-ink-200 bg-cream-50 px-3 py-2.5 text-sm focus:border-gold-400 focus:outline-none" />
                </label>
              </div>
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wide text-ink-700">Minimum Order ($)</span>
                <input type="number" value={form.minOrder} onChange={(e) => setForm((p) => ({ ...p, minOrder: Number(e.target.value) }))} className="mt-1.5 w-full border border-ink-200 bg-cream-50 px-3 py-2.5 text-sm focus:border-gold-400 focus:outline-none" />
              </label>
              <button type="submit" className="btn-shine w-full bg-ink-950 py-3 text-xs font-semibold uppercase tracking-wide text-cream-50 hover:bg-gold-500 hover:text-ink-950">Create Coupon</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
