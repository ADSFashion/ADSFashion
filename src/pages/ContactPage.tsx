import { useState } from 'react';
import { Mail, MapPin, Phone, Send, Clock } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SectionHeading } from '@/components/SectionHeading';

export function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />

      <div className="mt-8 text-center">
        <SectionHeading eyebrow="We're Here to Help" title="Get in Touch" subtitle="Our client care team is available around the clock." />
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.3fr]">
        {/* Info */}
        <div className="space-y-6">
          {[
            { icon: MapPin, title: 'Visit Us', lines: ['Via Montenapoleone 12', '20121 Milan, Italy'] },
            { icon: Phone, title: 'Call Us', lines: ['+39 02 1234 5678', 'Mon–Sat, 9am–7pm CET'] },
            { icon: Mail, title: 'Email Us', lines: ['clientcare@adsfashion.com', 'press@adsfashion.com'] },
            { icon: Clock, title: 'Opening Hours', lines: ['Monday – Friday: 9am – 8pm', 'Saturday: 10am – 6pm'] },
          ].map((c, i) => (
            <div key={i} className="flex gap-4 border border-ink-200/60 bg-cream-100/40 p-5 card-hover">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-gold-300/50 bg-cream-50 text-gold-600">
                <c.icon size={20} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-ink-950">{c.title}</h3>
                {c.lines.map((l, j) => <p key={j} className="text-sm text-ink-500">{l}</p>)}
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="border border-ink-200/60 bg-cream-50 p-8">
          {sent ? (
            <div className="flex h-full flex-col items-center justify-center py-16 text-center animate-scale-in">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gold-400 text-ink-950">
                <Send size={28} strokeWidth={1.5} />
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold text-ink-950">Message Sent</h3>
              <p className="mt-2 font-serif text-lg text-ink-500">Thank you for reaching out. We'll respond within 24 hours.</p>
              <button onClick={() => setSent(false)} className="mt-6 text-xs font-semibold uppercase tracking-[0.15em] text-gold-600">
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-5">
              <h3 className="font-display text-2xl font-bold text-ink-950">Send a Message</h3>
              <div className="grid gap-5 sm:grid-cols-2">
                <Input label="First Name" />
                <Input label="Last Name" />
              </div>
              <Input label="Email" type="email" />
              <Input label="Subject" />
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-700">Message</span>
                <textarea
                  required
                  rows={5}
                  className="mt-2 w-full resize-none border border-ink-200 bg-cream-50 px-4 py-3 text-sm text-ink-900 focus:border-gold-400 focus:outline-none"
                />
              </label>
              <button className="btn-shine flex w-full items-center justify-center gap-2 bg-ink-950 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-cream-50 hover:bg-gold-500 hover:text-ink-950">
                Send Message <Send size={14} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function Input({ label, type = 'text' }: { label: string; type?: string }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-700">{label}</span>
      <input
        type={type}
        required
        className="mt-2 w-full border border-ink-200 bg-cream-50 px-4 py-3 text-sm text-ink-900 focus:border-gold-400 focus:outline-none"
      />
    </label>
  );
}
