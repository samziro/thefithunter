'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface ClientModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ClientModal({ open, onClose }: ClientModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  if (!open) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      setError('Please enter both email and password');
      setLoading(false);
      return;
    }

    try {
      // For demo/development – replace with real auth later
      const defaultEmail = process.env.NEXT_PUBLIC_CLIENT_DEFAULT_EMAIL || 'client@example.com';
      const defaultPass = process.env.NEXT_PUBLIC_CLIENT_DEFAULT_PASSWORD || 'password123';

      if (trimmedEmail === defaultEmail && trimmedPassword === defaultPass) {
        localStorage.setItem('clientAuth', 'true');
        localStorage.setItem('clientEmail', trimmedEmail);
        onClose();
        router.push('/client/dashboard');
        return;
      }

      setError('Incorrect email or password');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#4a4a4a] rounded-lg shadow-2xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-6">
            <Image
              src="/logo.webp"
              alt="Fit Hunter Logo"
              width={64}
              height={64}
              className="mx-auto rounded-full"
            />
            <h3 className="mt-4 text-2xl font-bold text-white ">Client Sign In</h3>
            <p className="mt-2 text-sm text-slate-200 ">
              Sign in to complete your purchase and access your personal dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-200 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-[#292929] border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-600/30 transition"
                placeholder="your@email.com"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-200 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#292929] border border-slate-600 rounded-md text-white placeholder-slate-400 focus:outline-none focus:border-yellow-600 focus:ring-2 focus:ring-yellow-600/30 transition"
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-900/30 border border-red-600/50 rounded-md text-sm text-red-300 text-center">
                {error}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-slate-500 text-slate-200 rounded-md font-medium hover:bg-[#292929] transition "
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-yellow-600 text-white rounded-md font-semibold hover:bg-yellow-700 disabled:opacity-60 disabled:cursor-not-allowed transition "
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </div>
          </form>

          {/* <p className="mt-6 text-center text-xs text-slate-400 ">
            Demo credentials: client@example.com / password123
          </p> */}
        </div>
      </div>
    </div>
  );
}