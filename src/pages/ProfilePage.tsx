import { Link, Navigate } from 'react-router-dom';
import { Package, Heart, ShoppingBag, LogOut, User, MapPin, Settings } from 'lucide-react';
import { useAuth } from '@/store/AuthContext';
import { useStore } from '@/store/StoreContext';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { orders } from '@/data/catalog';

export function ProfilePage() {
  const { user, signOut, loading } = useAuth();
  const { wishlist, cartCount } = useStore();

  if (loading) {
    return <div className="flex min-h-[60vh] items-center justify-center"><p className="font-serif text-xl text-ink-400">Loading…</p></div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const myOrders = orders.slice(0, 2);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Profile' }]} />

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_2fr]">
        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="border border-ink-200/60 bg-cream-100/40 p-6 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-ink-950 font-display text-2xl font-bold text-gold-300">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h2 className="mt-4 font-display text-xl font-bold text-ink-950">{user.name}</h2>
            <p className="text-sm text-ink-500">{user.email}</p>
            <span className="mt-3 inline-block bg-gold-400/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-700">Gold Member</span>
          </div>
          <nav className="space-y-1">
            {[
              { icon: User, label: 'Account Details', active: true },
              { icon: Package, label: 'My Orders', to: '#' },
              { icon: Heart, label: 'Wishlist', to: '/wishlist', count: wishlist.length },
              { icon: ShoppingBag, label: 'Shopping Bag', to: '/cart', count: cartCount },
              { icon: MapPin, label: 'Addresses', to: '#' },
              { icon: Settings, label: 'Settings', to: '#' },
            ].map((item, i) => (
              <Link
                key={i}
                to={item.to ?? '#'}
                className={`flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${item.active ? 'bg-ink-950 text-cream-50' : 'text-ink-700 hover:bg-cream-100'}`}
              >
                <span className="flex items-center gap-3"><item.icon size={16} strokeWidth={1.5} /> {item.label}</span>
                {item.count !== undefined && item.count > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gold-500 px-1.5 text-[10px] font-bold text-ink-950">{item.count}</span>
                )}
              </Link>
            ))}
            <button onClick={signOut} className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50">
              <LogOut size={16} strokeWidth={1.5} /> Sign Out
            </button>
          </nav>
        </aside>

        {/* Content */}
        <div className="space-y-8">
          <div className="border border-ink-200/60 bg-cream-100/40 p-6">
            <h3 className="font-display text-xl font-bold text-ink-950">Account Details</h3>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Detail label="Full Name" value={user.name} />
              <Detail label="Email" value={user.email} />
              <Detail label="Member Since" value="2025" />
              <Detail label="Membership" value="Gold" />
            </div>
          </div>

          <div className="border border-ink-200/60 bg-cream-100/40 p-6">
            <h3 className="font-display text-xl font-bold text-ink-950">Recent Orders</h3>
            {myOrders.length === 0 ? (
              <p className="mt-4 text-sm text-ink-500">No orders yet.</p>
            ) : (
              <div className="mt-5 space-y-4">
                {myOrders.map((o) => (
                  <div key={o.id} className="flex flex-col gap-3 border border-ink-200/60 bg-cream-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold text-ink-900">{o.id}</p>
                      <p className="text-xs text-ink-500">{o.createdAt} · {o.items.length} item(s)</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] ${o.status === 'delivered' ? 'bg-green-100 text-green-700' : 'bg-gold-400/20 text-gold-700'}`}>{o.status}</span>
                      <span className="font-display text-lg font-bold text-ink-950">${o.total}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-500">{label}</p>
      <p className="mt-1 text-sm font-medium text-ink-900">{value}</p>
    </div>
  );
}
