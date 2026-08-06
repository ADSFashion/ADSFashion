import { Link } from 'react-router-dom';
import {
  DollarSign, ShoppingCart, Users, Package, TrendingUp, TrendingDown, ArrowUpRight,
} from 'lucide-react';
import { products, orders, customers } from '@/data/catalog';

export function AdminDashboard() {
  const stats = [
    { label: 'Revenue', value: '$48,290', change: '+12.5%', up: true, icon: DollarSign },
    { label: 'Orders', value: '1,042', change: '+8.2%', up: true, icon: ShoppingCart },
    { label: 'Customers', value: '3,481', change: '+5.1%', up: true, icon: Users },
    { label: 'Products', value: products.length.toString(), change: '-2.0%', up: false, icon: Package },
  ];

  const recentOrders = orders.slice(0, 4);
  const topProducts = [...products].sort((a, b) => b.reviewsCount - a.reviewsCount).slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div key={i} className="border border-ink-200/60 bg-cream-50 p-5 card-hover">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-ink-950 text-gold-300">
                <s.icon size={18} strokeWidth={1.5} />
              </div>
              <span className={`flex items-center gap-1 text-xs font-semibold ${s.up ? 'text-green-600' : 'text-red-500'}`}>
                {s.up ? <TrendingUp size={13} /> : <TrendingDown size={13} />} {s.change}
              </span>
            </div>
            <p className="mt-4 font-display text-2xl font-bold text-ink-950">{s.value}</p>
            <p className="text-xs uppercase tracking-wide text-ink-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="border border-ink-200/60 bg-cream-50 p-6">
          <h3 className="font-display text-lg font-bold text-ink-950">Revenue Overview</h3>
          <p className="text-xs text-ink-500">Last 7 months</p>
          <div className="mt-6 flex h-48 items-end gap-2 sm:gap-4">
            {[42, 55, 38, 68, 52, 78, 95].map((h, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-t bg-gradient-to-t from-ink-900 to-gold-400 transition-all duration-700 hover:from-ink-950" style={{ height: `${h}%` }} />
                <span className="text-[10px] text-ink-400">{['Jan','Feb','Mar','Apr','May','Jun','Jul'][i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="border border-ink-200/60 bg-cream-50 p-6">
          <h3 className="font-display text-lg font-bold text-ink-950">Sales by Category</h3>
          <div className="mt-6 space-y-4">
            {[
              { label: 'Women', pct: 42, color: 'bg-ink-950' },
              { label: 'Men', pct: 31, color: 'bg-gold-500' },
              { label: 'Accessories', pct: 18, color: 'bg-gold-300' },
              { label: 'Kids', pct: 9, color: 'bg-ink-300' },
            ].map((c, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-ink-700">{c.label}</span>
                  <span className="text-ink-500">{c.pct}%</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-cream-200">
                  <div className={`h-full rounded-full ${c.color}`} style={{ width: `${c.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent orders + top products */}
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="border border-ink-200/60 bg-cream-50 p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-bold text-ink-950">Recent Orders</h3>
            <Link to="/admin/orders" className="flex items-center gap-1 text-xs font-semibold text-gold-600 hover:text-gold-700">View all <ArrowUpRight size={12} /></Link>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-ink-200/60 text-xs uppercase tracking-wide text-ink-400">
                <tr><th className="pb-2 font-medium">Order</th><th className="pb-2 font-medium">Customer</th><th className="pb-2 font-medium">Status</th><th className="pb-2 text-right font-medium">Total</th></tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {recentOrders.map((o) => (
                  <tr key={o.id} className="text-ink-700">
                    <td className="py-3 font-medium text-ink-900">{o.id}</td>
                    <td className="py-3">{o.customerName}</td>
                    <td className="py-3"><StatusBadge status={o.status} /></td>
                    <td className="py-3 text-right font-semibold text-ink-900">${o.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="border border-ink-200/60 bg-cream-50 p-6">
          <h3 className="font-display text-lg font-bold text-ink-950">Top Products</h3>
          <div className="mt-4 space-y-3">
            {topProducts.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="text-sm font-bold text-ink-300">{i + 1}</span>
                <img src={p.images[0]} alt="" className="h-12 w-10 rounded object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink-900">{p.name}</p>
                  <p className="text-xs text-ink-500">{p.reviewsCount} reviews</p>
                </div>
                <span className="text-sm font-semibold text-ink-900">${p.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700',
    processing: 'bg-blue-100 text-blue-700',
    shipped: 'bg-purple-100 text-purple-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  };
  return <span className={`px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${styles[status] ?? 'bg-ink-100 text-ink-600'}`}>{status}</span>;
}
