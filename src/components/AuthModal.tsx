import React, { useState } from 'react';
import { useLibrary } from '../context/LibraryContext';
import { X, KeyRound, Mail, User, Phone, MapPin, CheckCircle, ShieldCheck, CreditCard, Sparkles } from 'lucide-react';
import { DEMO_USERS } from '../data/mockData';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    authModalTab,
    closeAuthModal,
    openAuthModal,
    login,
    register,
    branches,
  } = useLibrary();

  // Form states
  const [tab, setTab] = useState<'login' | 'register'>(authModalTab);

  // Sync tab with context if prop changes
  React.useEffect(() => {
    setTab(authModalTab);
  }, [authModalTab]);

  // Login form
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Register form
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regBranch, setRegBranch] = useState(branches[0]?.name || 'Central Athenaeum Library');
  const [regError, setRegError] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(true);

  if (!isAuthModalOpen) return null;

  // Password strength check
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: 'None', color: 'bg-stone-200' };
    let score = 0;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    switch (score) {
      case 1:
        return { score: 25, label: 'Weak', color: 'bg-red-500' };
      case 2:
        return { score: 50, label: 'Fair', color: 'bg-amber-500' };
      case 3:
        return { score: 75, label: 'Good', color: 'bg-blue-500' };
      case 4:
        return { score: 100, label: 'Strong', color: 'bg-emerald-600' };
      default:
        return { score: 10, label: 'Very Weak', color: 'bg-red-400' };
    }
  };

  const passStrength = getPasswordStrength(regPassword);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (!loginIdentifier.trim()) {
      setLoginError('Please enter your Email or Membership ID.');
      return;
    }
    if (!loginPassword) {
      setLoginError('Please enter your account password.');
      return;
    }

    const res = login(loginIdentifier, loginPassword);
    if (!res.success) {
      setLoginError(res.error || 'Authentication failed.');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);

    if (!regFullName.trim()) {
      setRegError('Full Name is required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(regEmail.trim())) {
      setRegError('Please provide a valid email address.');
      return;
    }

    if (regPassword.length < 8) {
      setRegError('Password must be at least 8 characters in length.');
      return;
    }

    if (!regPhone.trim()) {
      setRegError('Contact telephone number is required for circulation notices.');
      return;
    }

    if (!termsAccepted) {
      setRegError('Please agree to the Athenaeum Public Library circulation policy.');
      return;
    }

    const res = register({
      fullName: regFullName,
      email: regEmail,
      phone: regPhone,
      password: regPassword,
      preferredBranch: regBranch,
    });

    if (!res.success) {
      setRegError(res.error || 'Registration failed.');
    }
  };

  const quickFillDemo = (user: (typeof DEMO_USERS)[0]) => {
    setLoginIdentifier(user.membershipId);
    setLoginPassword(user.password || 'Password123!');
    setLoginError(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-stone-50 border border-stone-200 rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header Ribbon */}
        <div className="bg-stone-900 text-stone-100 px-6 py-5 flex items-center justify-between border-b border-stone-800">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block mb-0.5">
              Athenaeum Public Circulation System
            </span>
            <h3 className="font-serif text-xl font-bold tracking-tight text-white">
              {tab === 'login' ? 'Cardholder Sign In' : 'Apply for Library Membership'}
            </h3>
          </div>
          <button
            onClick={closeAuthModal}
            className="p-1.5 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-md transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 border-b border-stone-200 bg-stone-100/70 p-1">
          <button
            type="button"
            onClick={() => {
              setTab('login');
              setLoginError(null);
            }}
            className={`py-2 text-xs font-semibold rounded transition-colors ${
              tab === 'login'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Sign In with Card / Email
          </button>
          <button
            type="button"
            onClick={() => {
              setTab('register');
              setRegError(null);
            }}
            className={`py-2 text-xs font-semibold rounded transition-colors ${
              tab === 'register'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            New Membership Registration
          </button>
        </div>

        <div className="p-6">
          {tab === 'login' ? (
            /* Login Form */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {loginError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                  {loginError}
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Email Address or Membership ID
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="e.g. eleanor.vance@athenaeum.org or LIB-2026-4821"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-stone-300 rounded focus:outline-hidden focus:ring-2 focus:ring-amber-500/40 focus:border-amber-600"
                    required
                  />
                </div>
                <p className="mt-1 text-[11px] text-stone-500">
                  Tip: You may sign in using either your email address or your printed 13-character Membership ID.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-medium text-stone-700">
                    Account Password
                  </label>
                  <span className="text-[11px] text-amber-700 hover:underline cursor-pointer">
                    Forgot password?
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-stone-300 rounded focus:outline-hidden focus:ring-2 focus:ring-amber-500/40 focus:border-amber-600"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white font-medium rounded text-sm transition-colors shadow-xs"
              >
                Sign In to Library Account
              </button>

              {/* Demo Account Quick-Fill Card */}
              <div className="mt-5 pt-4 border-t border-stone-200">
                <span className="text-[11px] font-mono uppercase tracking-wider text-stone-500 block mb-2 font-medium">
                  Quick Demo Accounts (1-Click Fill)
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {DEMO_USERS.map((demo) => (
                    <button
                      key={demo.id}
                      type="button"
                      onClick={() => quickFillDemo(demo)}
                      className="p-2 text-left bg-white border border-stone-200 rounded hover:border-amber-400 hover:bg-amber-50/50 transition-colors cursor-pointer group"
                    >
                      <div className="text-xs font-medium text-stone-900 group-hover:text-amber-800 flex items-center justify-between">
                        <span>{demo.fullName}</span>
                        <Sparkles className="w-3 h-3 text-amber-500 opacity-60 group-hover:opacity-100" />
                      </div>
                      <div className="font-mono text-[10px] text-stone-500 mt-0.5">
                        {demo.membershipId}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              {regError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-700">
                  {regError}
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Full Legal Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-none text-stone-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={regFullName}
                    onChange={(e) => setRegFullName(e.target.value)}
                    placeholder="e.g. Penelope Crawford"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-stone-300 rounded focus:outline-hidden focus:ring-2 focus:ring-amber-500/40 focus:border-amber-600"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-none text-stone-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="name@domain.com"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-stone-300 rounded focus:outline-hidden focus:ring-2 focus:ring-amber-500/40 focus:border-amber-600"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Contact Telephone <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-none text-stone-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="(555) 000-0000"
                      className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-stone-300 rounded focus:outline-hidden focus:ring-2 focus:ring-amber-500/40 focus:border-amber-600"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Create Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-none text-stone-400">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Minimum 8 characters"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-stone-300 rounded focus:outline-hidden focus:ring-2 focus:ring-amber-500/40 focus:border-amber-600"
                    required
                  />
                </div>
                {/* Password strength meter */}
                {regPassword && (
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-stone-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${passStrength.color} transition-all duration-300`}
                        style={{ width: `${passStrength.score}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-stone-500">
                      {passStrength.label}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Preferred Library Branch <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-none text-stone-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <select
                    value={regBranch}
                    onChange={(e) => setRegBranch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-stone-300 rounded focus:outline-hidden focus:ring-2 focus:ring-amber-500/40 focus:border-amber-600 text-stone-900"
                  >
                    {branches.map((b) => (
                      <option key={b.id} value={b.name}>
                        {b.name} ({b.address})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2 cursor-pointer text-xs text-stone-600">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-0.5 rounded border-stone-300 text-amber-600 focus:ring-amber-500"
                  />
                  <span>
                    I agree to the Athenaeum borrowing terms (14-day loan period, return policy, and notifications). A unique Membership ID will be generated upon completion.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold rounded text-sm transition-colors shadow-xs mt-2 cursor-pointer"
              >
                Issue My Library Membership Card
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
