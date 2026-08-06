import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '@/store/AuthContext';
import { Logo } from '@/components/Logo';

export function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      setError(error);
    } else {
      navigate('/profile');
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink-950 px-4 py-16">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
      <div className="relative w-full max-w-md animate-scale-in">
        <div className="mb-8 flex justify-center"><Logo className="[&_span]:text-cream-50 [&_.text-gold-600]:text-gold-400" /></div>
        <div className="border border-cream-200/15 bg-ink-900/60 p-8 backdrop-blur-xl">
          <h1 className="text-center font-display text-3xl font-bold text-cream-50">Welcome Back</h1>
          <p className="mt-2 text-center font-serif text-base text-cream-200/60">Sign in to your ADS account</p>

          {error && (
            <div className="mt-6 flex items-center gap-2 border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-cream-200/70">Email</span>
              <div className="mt-2 flex items-center gap-3 border-b border-cream-200/20 pb-2 focus-within:border-gold-400">
                <Mail size={16} className="text-cream-200/40" />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 bg-transparent text-sm text-cream-50 placeholder:text-cream-200/30 focus:outline-none" placeholder="you@email.com" />
              </div>
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-cream-200/70">Password</span>
              <div className="mt-2 flex items-center gap-3 border-b border-cream-200/20 pb-2 focus-within:border-gold-400">
                <Lock size={16} className="text-cream-200/40" />
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="flex-1 bg-transparent text-sm text-cream-50 placeholder:text-cream-200/30 focus:outline-none" placeholder="••••••••" />
              </div>
            </label>
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-cream-200/60">
                <input type="checkbox" className="accent-gold-500" /> Remember me
              </label>
              <a href="#" className="text-gold-400 hover:text-gold-300">Forgot password?</a>
            </div>
            <button disabled={loading} className="btn-shine flex w-full items-center justify-center gap-2 bg-gold-400 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-ink-950 transition-colors hover:bg-gold-300 disabled:opacity-50">
              {loading ? 'Signing in…' : 'Sign In'} {!loading && <ArrowRight size={14} />}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-cream-200/60">
            New to ADS?{' '}
            <Link to="/register" className="font-semibold text-gold-400 hover:text-gold-300">Create an account</Link>
          </p>
        </div>
        <p className="mt-6 text-center text-xs text-cream-200/40">
          <Link to="/" className="hover:text-gold-400">← Back to home</Link>
        </p>
      </div>
    </div>
  );
}
