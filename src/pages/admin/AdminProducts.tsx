import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Search } from 'lucide-react';
import { products as initialProducts } from '@/data/catalog';
import type { Product } from '@/types';

export function AdminProducts() {
  const [items, setItems] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  const filtered = items.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSave = (product: Product) => {
    setItems((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      return exists ? prev.map((p) => (p.id === product.id ? product : p)) : [product, ...prev];
    });
    setShowForm(false);
    setEditing(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink-950">Products</h2>
          <p className="text-sm text-ink-500">{items.length} products in catalog</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 border border-ink-200 bg-cream-50 px-3 py-2">
            <Search size={15} className="text-ink-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search…" className="w-32 bg-transparent text-sm focus:outline-none" />
          </div>
          <button onClick={() => { setEditing(null); setShowForm(true); }} className="btn-shine flex items-center gap-2 bg-ink-950 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-cream-50 hover:bg-gold-500 hover:text-ink-950">
            <Plus size={15} /> Add Product
          </button>
        </div>
      </div>

      <div className="overflow-x-auto border border-ink-200/60 bg-cream-50">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink-200/60 bg-cream-100/50 text-xs uppercase tracking-wide text-ink-400">
            <tr>
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {filtered.map((p) => (
              <tr key={p.id} className="text-ink-700 hover:bg-cream-100/40">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={p.images[0]} alt="" className="h-12 w-10 rounded object-cover" />
                    <div>
                      <p className="font-medium text-ink-900">{p.name}</p>
                      <p className="text-xs text-ink-400">{p.brand}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 capitalize">{p.category}</td>
                <td className="px-4 py-3 font-semibold text-ink-900">${p.price}</td>
                <td className="px-4 py-3">
                  <span className={p.inventory < 20 ? 'text-amber-600' : 'text-ink-700'}>{p.inventory}</span>
                </td>
                <td className="px-4 py-3">
                  {p.isOnSale ? <span className="bg-gold-400/20 px-2 py-0.5 text-[10px] font-semibold uppercase text-gold-700">On Sale</span> : p.isNew ? <span className="bg-ink-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-ink-600">New</span> : <span className="text-xs text-ink-400">—</span>}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => { setEditing(p); setShowForm(true); }} className="flex h-8 w-8 items-center justify-center border border-ink-200 text-ink-600 hover:border-ink-900 hover:text-ink-900"><Pencil size={14} /></button>
                    <button onClick={() => handleDelete(p.id)} className="flex h-8 w-8 items-center justify-center border border-red-200 text-red-500 hover:bg-red-50"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && <ProductForm product={editing} onClose={() => setShowForm(false)} onSave={handleSave} />}
    </div>
  );
}

function ProductForm({ product, onClose, onSave }: { product: Product | null; onClose: () => void; onSave: (p: Product) => void }) {
  const [form, setForm] = useState<Product>(
    product ?? {
      id: `p${Date.now()}`,
      name: '', brand: 'ADS Signature', description: '', price: 0, category: 'men',
      subcategory: '', images: [''], colors: ['Black'], sizes: ['S', 'M', 'L'],
      rating: 5, reviewsCount: 0, tags: [], inventory: 0, createdAt: new Date().toISOString().slice(0, 10),
    },
  );

  const update = (k: keyof Product, v: string | number | string[]) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto animate-scale-in border border-ink-200 bg-cream-50 p-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl font-bold text-ink-950">{product ? 'Edit Product' : 'Add Product'}</h3>
          <button onClick={onClose} className="text-ink-500"><X size={20} /></button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSave(form); }} className="mt-5 space-y-4">
          <FormField label="Name" value={form.name} onChange={(v) => update('name', v)} />
          <FormField label="Brand" value={form.brand} onChange={(v) => update('brand', v)} />
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Price ($)" type="number" value={String(form.price)} onChange={(v) => update('price', Number(v))} />
            <FormField label="Inventory" type="number" value={String(form.inventory)} onChange={(v) => update('inventory', Number(v))} />
          </div>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-ink-700">Category</span>
            <select value={form.category} onChange={(e) => update('category', e.target.value)} className="mt-1.5 w-full border border-ink-200 bg-cream-50 px-3 py-2.5 text-sm focus:border-gold-400 focus:outline-none">
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
              <option value="accessories">Accessories</option>
            </select>
          </label>
          <FormField label="Image URL" value={form.images[0]} onChange={(v) => update('images', [v])} />
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-ink-700">Description</span>
            <textarea value={form.description} onChange={(e) => update('description', e.target.value)} rows={3} className="mt-1.5 w-full resize-none border border-ink-200 bg-cream-50 px-3 py-2.5 text-sm focus:border-gold-400 focus:outline-none" />
          </label>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="border border-ink-200 px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-ink-700 hover:border-ink-900">Cancel</button>
            <button type="submit" className="btn-shine flex-1 bg-ink-950 py-2.5 text-xs font-semibold uppercase tracking-wide text-cream-50 hover:bg-gold-500 hover:text-ink-950">{product ? 'Save Changes' : 'Add Product'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormField({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wide text-ink-700">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="mt-1.5 w-full border border-ink-200 bg-cream-50 px-3 py-2.5 text-sm focus:border-gold-400 focus:outline-none" />
    </label>
  );
}
