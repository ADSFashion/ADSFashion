import { useState } from 'react';
import { Search, AlertTriangle, Package } from 'lucide-react';
import { products } from '@/data/catalog';

export function AdminInventory() {
  const [search, setSearch] = useState('');
  const filtered = products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  const totalUnits = products.reduce((s, p) => s + p.inventory, 0);
  const lowStock = products.filter((p) => p.inventory < 20).length;
  const outOfStock = products.filter((p) => p.inventory === 0).length;
  const stockValue = products.reduce((s, p) => s + p.inventory * p.price, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink-950">Inventory</h2>
          <p className="text-sm text-ink-500">Track stock levels across all products</p>
        </div>
        <div className="flex items-center gap-2 border border-ink-200 bg-cream-50 px-3 py-2">
          <Search size={15} className="text-ink-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search…" className="w-32 bg-transparent text-sm focus:outline-none" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Package} label="Total Units" value={totalUnits.toString()} />
        <StatCard icon={AlertTriangle} label="Low Stock" value={lowStock.toString()} highlight={lowStock > 0} />
        <StatCard icon={AlertTriangle} label="Out of Stock" value={outOfStock.toString()} highlight={outOfStock > 0} />
        <StatCard icon={Package} label="Stock Value" value={`$${stockValue.toLocaleString()}`} />
      </div>

      <div className="overflow-x-auto border border-ink-200/60 bg-cream-50">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink-200/60 bg-cream-100/50 text-xs uppercase tracking-wide text-ink-400">
            <tr>
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">SKU</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Stock Level</th>
              <th className="px-4 py-3 text-right font-medium">Units</th>
              <th className="px-4 py-3 text-right font-medium">Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {filtered.map((p) => {
              const pct = Math.min(100, (p.inventory / 60) * 100);
              const isLow = p.inventory < 20;
              const isOut = p.inventory === 0;
              return (
                <tr key={p.id} className="text-ink-700 hover:bg-cream-100/40">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.images[0]} alt="" className="h-10 w-8 rounded object-cover" />
                      <span className="font-medium text-ink-900">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-ink-500">{p.id.toUpperCase()}</td>
                  <td className="px-4 py-3 capitalize">{p.category}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-cream-200">
                        <div className={`h-full rounded-full ${isOut ? 'bg-red-500' : isLow ? 'bg-amber-500' : 'bg-green-500'}`} style={{ width: `${pct}%` }} />
                      </div>
                      {isLow && !isOut && <AlertTriangle size={13} className="text-amber-500" />}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={isOut ? 'font-semibold text-red-500' : isLow ? 'font-semibold text-amber-600' : 'text-ink-900'}>{p.inventory}</span>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-ink-900">${(p.inventory * p.price).toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, highlight }: { icon: typeof Package; label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`border bg-cream-50 p-5 ${highlight ? 'border-amber-300/60' : 'border-ink-200/60'}`}>
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-md ${highlight ? 'bg-amber-100 text-amber-600' : 'bg-ink-950 text-gold-300'}`}>
          <Icon size={18} strokeWidth={1.5} />
        </div>
        <div>
          <p className="font-display text-xl font-bold text-ink-950">{value}</p>
          <p className="text-xs uppercase tracking-wide text-ink-500">{label}</p>
        </div>
      </div>
    </div>
  );
}
