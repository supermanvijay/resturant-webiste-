import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, ShieldCheck, ArrowLeft, Sparkles, KeyRound } from 'lucide-react';
import { adminAuthService } from '../../services/adminAuth';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBackToWebsite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToWebsite }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      const res = adminAuthService.login(username, password);
      setIsLoading(false);
      if (res.success) {
        onLoginSuccess();
      } else {
        setError(res.error || 'Authentication failed. Please verify credentials.');
      }
    }, 400);
  };

  const fillDemoCredentials = () => {
    setUsername('123456789');
    setPassword('123456789');
    setError(null);
  };

  return (
    <div className="min-h-screen w-full bg-[#070709] text-gray-100 flex flex-col justify-center items-center px-4 py-8 relative overflow-hidden font-sans selection:bg-[#d4af37] selection:text-black">
      {/* Ambient background gold glow & subtle grid */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-[#ebb340]/10 rounded-full blur-3xl pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#d4af37 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Top Bar with back link */}
      <div className="w-full max-w-md mb-4 flex items-center justify-between z-10">
        <button
          onClick={onBackToWebsite}
          className="inline-flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-[#d4af37] transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Restaurant Website</span>
        </button>
        <span className="text-[11px] uppercase tracking-widest text-[#d4af37]/70 font-mono">
          Security Portal
        </span>
      </div>

      {/* Glassmorphism Luxury Card */}
      <div className="w-full max-w-md relative z-10 rounded-2xl bg-[#0f0f14]/80 backdrop-blur-xl border border-[#d4af37]/25 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(212,175,55,0.08)] overflow-hidden">
        {/* Top Gold Accent Bar */}
        <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />

        <div className="p-7 sm:p-9">
          {/* Header & Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1c1b18] to-[#0b0a08] border border-[#d4af37]/40 shadow-[0_0_20px_rgba(212,175,55,0.15)] mb-4">
              <span className="text-2xl">👑</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-white mb-1">
              Royal Bites
            </h1>
            <p className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-semibold mb-2">
              Executive Management Suite
            </p>
            <p className="text-xs text-gray-400">
              Sign in with administrative credentials to manage menu, featured dishes, and media.
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="mb-6 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2 animate-shake">
              <ShieldCheck className="w-4 h-4 text-red-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-gray-300 mb-1.5">
                Admin Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <User className="w-4 h-4 text-[#d4af37]/80" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter Username"
                  required
                  autoFocus
                  className="w-full bg-[#16161f]/90 border border-gray-700 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] text-white text-sm rounded-xl pl-10 pr-3 py-2.5 outline-none transition-all placeholder-gray-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-gray-300 mb-1.5">
                Security Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock className="w-4 h-4 text-[#d4af37]/80" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                  required
                  className="w-full bg-[#16161f]/90 border border-gray-700 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] text-white text-sm rounded-xl pl-10 pr-10 py-2.5 outline-none transition-all placeholder-gray-500 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Quick Demo Credentials Helper */}
            <div className="pt-1 flex items-center justify-between text-xs">
              <span className="text-gray-400 text-[11px]">Demo: 123456789</span>
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="inline-flex items-center gap-1 text-[11px] text-[#d4af37] hover:text-[#f5d59f] underline transition cursor-pointer"
              >
                <KeyRound className="w-3 h-3" />
                <span>Fill Credentials</span>
              </button>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full relative group overflow-hidden bg-gradient-to-r from-[#d4af37] via-[#f1cb68] to-[#d4af37] hover:brightness-110 active:scale-[0.99] text-black font-semibold text-sm py-3 px-4 rounded-xl shadow-[0_4px_20px_rgba(212,175,55,0.3)] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-black" />
                    <span>Access Executive Dashboard</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Security Badge */}
          <div className="mt-8 pt-5 border-t border-gray-800/80 flex items-center justify-center gap-2 text-[11px] text-gray-500">
            <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Encrypted Session Authentication • Strict Role Validation</span>
          </div>
        </div>
      </div>
    </div>
  );
};
