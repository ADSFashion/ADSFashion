import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav className="flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-ink-400">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {item.to ? (
            <Link to={item.to} className="transition-colors hover:text-gold-600">
              {item.label}
            </Link>
          ) : (
            <span className="text-ink-700">{item.label}</span>
          )}
          {i < items.length - 1 && <ChevronRight size={12} className="text-ink-300" />}
        </span>
      ))}
    </nav>
  );
}
