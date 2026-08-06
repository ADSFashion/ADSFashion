import { useState } from 'react';
import { Search, Eye, X } from 'lucide-react';
import { orders as initialOrders } from '@/data/catalog';
import type { Order } from '@/types';
import { StatusBadge } from './AdminDashboard';

export function AdminOrders() {
  const [items] = useState<Order[]>(initialOrders);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewing, setViewing] = useState<Order | null>(null);

  const filtered = items.filter((o) => {
    const matchesSearch = o.id.toLowerCase().includes(search.toLowerCase()) || o.customerName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink-950">Orders</h2>
          <p className="text-sm text-ink-500">{items.length} total orders</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 border border-ink-200 bg-cream-50 px-3 py-2">
            <Search size={15} className="text-ink-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search…" className="w-32 bg-transparent text-sm focus:outline-none" />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border border-ink-200 bg-cream-50 px-3 py-2 text-sm focus:border-gold-400 focus:outline-none">
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto border border-ink-200/60 bg-cream-50">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink-200/60 bg-cream-100/50 text-xs uppercase tracking-wide text-ink-400">
            <tr>
              <th className="px-4 py-3 font-medium">Order ID</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Items</th>
              <th className="px-4 py-3 font-medium">Payment</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Total</th>
              <th className="px-4 py-3 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {filtered.map((o) => (
              <tr key={o.id} className="text-ink-700 hover:bg-cream-100/40">
                <td className="px-4 py-3 font-medium text-ink-900">{o.id}</td>
                <td className="px-4 py-3">{o.customerName}</td>
                <td className="px-4 py-3 text-ink-500">{o.createdAt}</td>
                <td className="px-4 py-3">{o.items.length}</td>
                <td className="px-4 py-3 text-xs">{o.paymentMethod}</td>
                <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                <td className="px-4 py-3 text-right font-semibold text-ink-900">${o.total}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => setViewing(o)} className="inline-flex h-8 w-8 items-center justify-center border border-ink-200 text-ink-600 hover:border-ink-900 hover:text-ink-900"><Eye size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="py-12 text-center text-sm text-ink-400">No orders found.</p>}
      </div>

      {viewing && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm" onClick={() => setViewing(null)} />
          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto animate-scale-in border border-ink-200 bg-cream-50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-xl font-bold text-ink-950">{viewing.id}</h3>
                <p className="text-sm text-ink-500">{viewing.createdAt}</p>
              </div>
              <button onClick={() => setViewing(null)} className="text-ink-500"><X size={20} /></button>
            </div>
            <div className="mt-5 space-y-1 border-y border-ink-200/60 py-4 text-sm">
              <p className="font-medium text-ink-900">{viewing.customerName}</p>
              <p className="text-ink-500">{viewing.customerEmail}</p>
              <p className="text-ink-500">{viewing.address}</p>
            </div>
            <div className="mt-4 space-y-3">
              {viewing.items.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <img src={item.image} alt="" className="h-14 w-12 rounded object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-ink-900">{item.name}</p>
                    <p className="text-xs text-ink-500">{item.size} · {item.color} · Qty {item.quantity}</p>
                  </div>
                  <span className="text-sm font-semibold text-ink-900">${item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-ink-200/60 pt-4">
              <div><StatusBadge status={viewing.status} /></div>
              <div className="text-right">
                <p className="text-xs text-ink-500">Total</p>
                <p className="font-display text-xl font-bold text-ink-950">${viewing.total}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
