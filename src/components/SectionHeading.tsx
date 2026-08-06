export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
}) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl text-left'}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold-600">{eyebrow}</p>
      )}
      <h2 className="mt-3 font-display text-3xl font-bold text-ink-950 sm:text-4xl md:text-[2.75rem]">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 font-serif text-lg leading-relaxed text-ink-500 ${align === 'center' ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
      <div className={`mt-6 h-px w-16 bg-gold-400 ${align === 'center' ? 'mx-auto' : ''}`} />
    </div>
  );
}
