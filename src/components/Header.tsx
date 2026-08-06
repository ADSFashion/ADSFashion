import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { Logo } from './Logo';
import { useStore } from '@/store/StoreContext';
import { useAuth } from '@/store/AuthContext';

const navLinks = [
  { to: '/shop', label: 'Shop' },
  { to: '/men', label: 'Men' },
  { to: '/women', label: 'Women' },
  { to: '/kids', label: 'Kids' },
  { to: '/new-arrivals', label: 'New Arrivals' },
  { to: '/sale', label: 'Sale' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartCount, wishlist } = useStore();
  const { user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <div className="bg-ink-950 text-cream-100">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2 text-center text-[11px] font-medium tracking-[0.2em] uppercase">
          <span className="hidden sm:inline">Complimentary shipping over $250</span>
          <span className="sm:hidden">Free shipping over $250</span>
          <span className="text-gold-400">·</span>
          <span>Use code WELCOME10 for 10% off</span>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-cream-50/95 shadow-[0_1px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl' : 'bg-cream-50'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center text-ink-900 transition-colors hover:text-gold-600 lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>
            <Logo />
          </div>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative text-[13px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-gold-500 after:transition-all after:duration-300 hover:text-gold-600 ${
                    isActive ? 'text-gold-700 after:w-full' : 'text-ink-800 after:w-0 hover:after:w-full'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setSearchOpen((s) => !s)}
              className="flex h-10 w-10 items-center justify-center text-ink-800 transition-colors hover:text-gold-600"
              aria-label="Search"
            >
              <Search size={20} strokeWidth={1.5} />
            </button>
            <Link
              to="/wishlist"
              className="relative flex h-10 w-10 items-center justify-center text-ink-800 transition-colors hover:text-gold-600"
              aria-label="Wishlist"
            >
              <Heart size={20} strokeWidth={1.5} />
              {wishlist.length > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold-500 px-1 text-[10px] font-bold text-ink-950">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link
              to={user ? '/profile' : '/login'}
              className="hidden h-10 w-10 items-center justify-center text-ink-800 transition-colors hover:text-gold-600 sm:flex"
              aria-label="Account"
            >
              <User size={20} strokeWidth={1.5} />
            </Link>
            <Link
              to="/cart"
              className="relative flex h-10 w-10 items-center justify-center text-ink-800 transition-colors hover:text-gold-600"
              aria-label="Cart"
            >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-ink-950 px-1 text-[10px] font-bold text-gold-300">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {searchOpen && (
          <div className="animate-slide-down border-t border-ink-200/60 bg-cream-50">
            <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-4 lg:px-8">
              <Search size={18} className="text-ink-400" strokeWidth={1.5} />
              <input
                autoFocus
                type="search"
                placeholder="Search for coats, dresses, bags…"
                className="flex-1 bg-transparent text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none"
              />
              <button onClick={() => setSearchOpen(false)} className="text-ink-500 hover:text-ink-900">
                <X size={18} />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${mobileOpen ? '' : 'pointer-events-none'}`}
        aria-hidden={!mobileOpen}
      >
        <div
          className={`absolute inset-0 bg-ink-950/60 backdrop-blur-sm transition-opacity duration-400 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileOpen(false)}
        />
        <aside
          className={`absolute left-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-cream-50 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-ink-200/60 px-5 py-4">
            <Logo onClick={() => setMobileOpen(false)} />
            <button onClick={() => setMobileOpen(false)} className="text-ink-700" aria-label="Close menu">
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>
          <nav className="flex flex-col px-2 py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `border-b border-ink-100 px-3 py-4 text-sm font-medium uppercase tracking-[0.2em] transition-colors ${
                    isActive ? 'text-gold-700' : 'text-ink-800 hover:text-gold-600'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link to="/about" className="border-b border-ink-100 px-3 py-4 text-sm font-medium uppercase tracking-[0.2em] text-ink-800 hover:text-gold-600">
              About
            </Link>
            <Link to="/contact" className="border-b border-ink-100 px-3 py-4 text-sm font-medium uppercase tracking-[0.2em] text-ink-800 hover:text-gold-600">
              Contact
            </Link>
            <Link to="/admin" className="px-3 py-4 text-sm font-medium uppercase tracking-[0.2em] text-ink-500 hover:text-gold-600">
              Admin Panel
            </Link>
          </nav>
          <div className="mt-auto border-t border-ink-200/60 p-5">
            <Link
              to={user ? '/profile' : '/login'}
              className="flex items-center gap-3 text-sm font-medium text-ink-800"
            >
              <User size={18} strokeWidth={1.5} />
              {user ? `Hi, ${user.name}` : 'Sign In / Register'}
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
