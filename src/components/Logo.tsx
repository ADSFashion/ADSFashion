import { Link } from 'react-router-dom';

export function Logo({ className = '', onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link to="/" onClick={onClick} className={`group inline-flex items-center gap-2.5 ${className}`}>
      <span className="flex h-9 w-9 items-center justify-center border border-gold-400/80 bg-ink-950 transition-colors duration-500 group-hover:bg-gold-400">
        <span className="font-display text-lg font-bold tracking-tight text-gold-300 transition-colors duration-500 group-hover:text-ink-950">
          A
        </span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-xl font-bold tracking-[0.18em] text-ink-950">ADS</span>
        <span className="text-[9px] font-medium uppercase tracking-[0.45em] text-gold-600">Fashion</span>
      </span>
    </Link>
  );
}
