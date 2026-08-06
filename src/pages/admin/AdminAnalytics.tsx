import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Eye } from 'lucide-react';
import { products, orders, customers } from '@/data/catalog';

export function AdminAnalytics() {
  const metrics = [
    { label: 'Revenue', value: '$48,290', change: '+12.5%', up: true, icon: DollarSign },
    { label: 'Conversion Rate', value: '3.2%', change: '+0.4%', up: true, icon: ShoppingCart },
    { label: 'Avg. Order Value', value: '$284', change: '+8.1%', up: true, icon: TrendingUp },
    { label: 'Page Views', value: '124K', change: '-2.3%', up: false, icon: Eye },
  ];

  const monthlyRevenue = [
    { m: 'Jan', v: 32 }, { m: 'Feb', v: 45 }, { m: 'Mar', v: 38 },
    { m: 'Apr', v: 58 }, { m: 'May', v: 48 }, { m: 'Jun', v: 72 },
    { m: 'Jul', v: 65 }, { m: 'Aug', v: 88 },
  ];
  const maxRev = Math.max(...monthlyRevenue.map((d) => d.v));

  const trafficSources = [
    { label: 'Organic Search', pct: 38, color: 'bg-ink-950' },
    { label: 'Direct', pct: 27, color: 'bg-gold-500' },
    { label: 'Social', pct: 21, color: 'bg-gold-300' },
    { label: 'Referral', pct: 14, color: 'bg-ink-300' },
  ];

  const categoryRevenue = [
    { label: 'Women', value: 20400 },
    { label: 'Men', value: 15200 },
    { label: 'Accessories', value: 8600 },
    { label: 'Kids', value: 4090 },
  ];
  const totalCatRev = categoryRevenue.reduce((s, c) => s + c.value, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-ink-950">Analytics</h2>
        <p className="text-sm text-ink-500">Performance insights for your store</p>
      </div>

      {/* Metric cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m, i) => (
          <div key={i} className="border border-ink-200/60 bg-cream-50 p-5 card-hover">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-ink-950 text-gold-300">
                <m.icon size={18} strokeWidth={1.5} />
              </div>
              <span className={`flex items-center gap-1 text-xs font-semibold ${m.up ? 'text-green-600' : 'text-red-500'}`}>
                {m.up ? <TrendingUp size={13} /> : <TrendingDown size={13} />} {m.change}
              </span>
            </div>
            <p className="mt-4 font-display text-2xl font-bold text-ink-950">{m.value}</p>
            <p className="text-xs uppercase tracking-wide text-ink-500">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div className="border border-ink-200/60 bg-cream-50 p-6">
        <h3 className="font-display text-lg font-bold text-ink-950">Revenue Trend</h3>
        <p className="text-xs text-ink-500">Monthly revenue · last 8 months</p>
        <div className="mt-6 flex h-56 items-end gap-2 sm:gap-4">
          {monthlyRevenue.map((d, i) => (
            <div key={i} className="group flex flex-1 flex-col items-center gap-2">
              <div className="relative flex w-full items-end" style={{ height: '100%' }}>
                <div
                  className="w-full rounded-t bg-gradient-to-t from-ink-900 to-gold-400 transition-all duration-700 group-hover:from-ink-950"
                  style={{ height: `${(d.v / maxRev) * 100}%` }}
                >
                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-ink-700 opacity-0 transition-opacity group-hover:opacity-100">${d.v}K</span>
                </div>
              </div>
              <span className="text-[10px] text-ink-400">{d.m}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Traffic sources */}
        <div className="border border-ink-200/60 bg-cream-50 p-6">
          <h3 className="font-display text-lg font-bold text-ink-950">Traffic Sources</h3>
          <div className="mt-6 space-y-4">
            {trafficSources.map((t, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-ink-700">{t.label}</span>
                  <span className="text-ink-500">{t.pct}%</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-cream-200">
                  <div className={`h-full rounded-full ${t.color}`} style={{ width: `${t.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue by category */}
        <div className="border border-ink-200/60 bg-cream-50 p-6">
          <h3 className="font-display text-lg font-bold text-ink-950">Revenue by Category</h3>
          <div className="mt-6 space-y-4">
            {categoryRevenue.map((c, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-ink-700">{c.label}</span>
                  <span className="text-ink-500">${c.value.toLocaleString()}</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-cream-200">
                  <div className="h-full rounded-full bg-gradient-to-r from-ink-900 to-gold-400" style={{ width: `${(c.value / totalCatRev) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="border border-ink-200/60 bg-cream-50 p-5">
          <Users size={20} className="text-gold-600" />
          <p className="mt-3 font-display text-2xl font-bold text-ink-950">{customers.length}</p>
          <p className="text-xs uppercase tracking-wide text-ink-500">Active Customers</p>
        </div>
        <div className="border border-ink-200/60 bg-cream-50 p-5">
          <ShoppingCart size={20} className="text-gold-600" />
          <p className="mt-3 font-display text-2xl font-bold text-ink-950">{orders.length}</p>
          <p className="text-xs uppercase tracking-wide text-ink-500">Recent Orders</p>
        </div>
        <div className="border border-ink-200/60 bg-cream-50 p-5">
          <DollarSign size={20} className="text-gold-600" />
          <p className="mt-3 font-display text-2xl font-bold text-ink-950">${orders.reduce((s, o) => s + o.total, 0).toLocaleString()}</p>
          <p className="text-xs uppercase tracking-wide text-ink-500">Order Revenue</p>
        </div>
      </div>
    </div>
  );
}
