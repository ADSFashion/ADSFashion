import { useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Package, ShoppingCart, Users, TicketPercent,
  Boxes, BarChart3, Menu, X, ArrowLeft, Search,
} from 'lucide-react';
import { Logo } from '@/components/Logo';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products', icon: Package },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingCart },
  { to: '/admin/customers', label: 'Customers', icon: Users },
  { to: '/admin/coupons', label: 'Coupons', icon: TicketPercent },
  { to: '/admin/inventory', label: 'Inventory', icon: Boxes },
  { to: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
];

export function AdminLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const SidebarContent = () => (
    <>
      <div className="px-5 py-5">
        <Logo className="[&_span]:text-cream-50 [&_.text-gold-600]:text-gold-400" />
      </div>
      <div className="mx-4 mb-4 rounded-md bg-gold-400/10 px-3 py-2 text-center">
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-400">Admin Panel</span>
      </div>
      <nav className="flex-1 px-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive ? 'bg-gold-400 text-ink-950' : 'text-cream-200/70 hover:bg-ink-800 hover:text-cream-50'
              }`
            }
          >
            <item.icon size={18} strokeWidth={1.5} />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-ink-800 p-3">
        <Link to="/" className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-cream-200/70 transition-colors hover:bg-ink-800 hover:text-cream-50">
          <ArrowLeft size={18} strokeWidth={1.5} /> Back to Store
        </Link>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-cream-50 lg:flex">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-ink-950 lg:flex">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-ink-950/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 flex h-full w-64 flex-col bg-ink-950 animate-slide-down">
            <button onClick={() => setOpen(false)} className="absolute right-3 top-4 text-cream-200/60"><X size={20} /></button>
            <SidebarContent />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-ink-200/60 bg-cream-50/95 px-4 py-3 backdrop-blur-xl lg:px-8">
          <div className="flex items-center gap-3">
            <button onClick={() => setOpen(true)} className="text-ink-800 lg:hidden"><Menu size={22} /></button>
            <h1 className="font-display text-lg font-bold text-ink-950">
              {navItems.find((n) => n.to === location.pathname || (!n.end && location.pathname.startsWith(n.to) && n.to !== '/admin'))?.label ?? 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 border border-ink-200 bg-cream-100 px-3 py-2 sm:flex">
              <Search size={15} className="text-ink-400" />
              <input placeholder="Search…" className="w-32 bg-transparent text-sm focus:outline-none" />
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-950 font-display text-sm font-bold text-gold-300">A</div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
