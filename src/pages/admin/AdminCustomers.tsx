import { useState } from 'react';
import { Search, Mail } from 'lucide-react';
import { customers as initialCustomers } from '@/data/catalog';
import type { Customer } from '@/types';

export function AdminCustomers() {
  const [items] = useState<Customer[]>(initialCustomers);
  const [search, setSearch] = useState('');

  const filtered = items.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase()),
  );
  const totalSpent = items.reduce((sum, c) => sum + c.spent, 0);
  const totalOrders = items.reduce((sum, c) => sum + c.orders, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink-950">Customers</h2>
          <p className="text-sm text-ink-500">{items.length} registered customers</p>
        </div>
        <div className="flex items-center gap-2 border border-ink-200 bg-cream-50 px-3 py-2">
          <Search size={15} className="text-ink-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search customers…" className="w-40 bg-transparent text-sm focus:outline-none" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total Customers" value={items.length.toString()} />
        <StatCard label="Total Orders" value={totalOrders.toString()} />
        <StatCard label="Lifetime Revenue" value={`$${totalSpent.toLocaleString()}`} />
      </div>

      <div className="overflow-x-auto border border-ink-200/60 bg-cream-50">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink-200/60 bg-cream-100/50 text-xs uppercase tracking-wide text-ink-400">
            <tr>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Joined</th>
              <th className="px-4 py-3 text-right font-medium">Orders</th>
              <th className="px-4 py-3 text-right font-medium">Spent</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {filtered.map((c) => (
              <tr key={c.id} className="text-ink-700 hover:bg-cream-100/40">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {c.avatar ? (
                      <img src={c.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-ink-950 font-display text-sm font-bold text-gold-300">{c.name.charAt(0)}</div>
                    )}
                    <span className="font-medium text-ink-900">{c.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-1.5 text-ink-500"><Mail size={13} /> {c.email}</span>
                </td>
                <td className="px-4 py-3 text-ink-500">{c.joinedAt}</td>
                <td className="px-4 py-3 text-right font-medium text-ink-900">{c.orders}</td>
                <td className="px-4 py-3 text-right font-semibold text-ink-900">${c.spent.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="py-12 text-center text-sm text-ink-400">No customers found.</p>}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-ink-200/60 bg-cream-50 p-5">
      <p className="font-display text-2xl font-bold text-ink-950">{value}</p>
      <p className="text-xs uppercase tracking-wide text-ink-500">{label}</p>
    </div>
  );
}
