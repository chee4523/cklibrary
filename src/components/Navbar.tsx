import React, { useState } from 'react';
import { useLibrary } from '../context/LibraryContext';
import { BookOpen, ShoppingBag, User as UserIcon, LogOut, ChevronDown, Check, Menu, X, Landmark, RefreshCw } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    cart,
    borrowRecords,
    activeTab,
    setActiveTab,
    setIsCartOpen,
    openAuthModal,
    logout,
    switchDemoUser,
    users,
  } = useLibrary();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Active loans for user
  const activeLoansCount = currentUser
    ? borrowRecords.filter((r) => r.userId === currentUser.id && r.status === 'active').length
    : 0;

  return (
    <header className="sticky top-0 z-30 bg-stone-900 text-stone-100 border-b border-stone-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          
          {/* Zone 1: Brand Wordmark (Single text element wordmark in serif display face) */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('catalog')}
              className="flex items-center gap-2.5 text-left focus:outline-hidden group"
            >
              <div className="w-8 h-8 rounded-sm bg-amber-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:border-amber-400 transition-colors">
                <Landmark className="w-4 h-4" />
              </div>
              <div>
                <span className="font-serif text-lg font-semibold tracking-tight text-stone-100 whitespace-nowrap block">
                  Athenaeum Library
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: 4 Single-line Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            <button
              onClick={() => setActiveTab('catalog')}
              className={`whitespace-nowrap transition-colors py-1 border-b-2 ${
                activeTab === 'catalog'
                  ? 'text-amber-400 border-amber-400 font-semibold'
                  : 'text-stone-300 border-transparent hover:text-stone-100'
              }`}
            >
              Catalog
            </button>
            <button
              onClick={() => {
                if (!currentUser) {
                  openAuthModal('login');
                } else {
                  setActiveTab('profile');
                }
              }}
              className={`whitespace-nowrap transition-colors py-1 border-b-2 flex items-center gap-1.5 ${
                activeTab === 'profile'
                  ? 'text-amber-400 border-amber-400 font-semibold'
                  : 'text-stone-300 border-transparent hover:text-stone-100'
              }`}
            >
              <span>My Borrowed Books</span>
              {currentUser && activeLoansCount > 0 && (
                <span className="font-mono text-xs px-1.5 py-0.2 bg-amber-500/20 text-amber-300 rounded-full">
                  {activeLoansCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('branches')}
              className={`whitespace-nowrap transition-colors py-1 border-b-2 ${
                activeTab === 'branches'
                  ? 'text-amber-400 border-amber-400 font-semibold'
                  : 'text-stone-300 border-transparent hover:text-stone-100'
              }`}
            >
              Branches & Hours
            </button>
            <button
              onClick={() => setActiveTab('rules')}
              className={`whitespace-nowrap transition-colors py-1 border-b-2 ${
                activeTab === 'rules'
                  ? 'text-amber-400 border-amber-400 font-semibold'
                  : 'text-stone-300 border-transparent hover:text-stone-100'
              }`}
            >
              Borrowing Policies
            </button>
          </nav>

          {/* Zone 3: Primary Action & Membership Account Status */}
          <div className="flex items-center gap-3 shrink-0">
            
            {/* Cart / Borrowing List Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-stone-200 bg-stone-800/80 hover:bg-stone-800 border border-stone-700 rounded-md transition-colors whitespace-nowrap cursor-pointer"
              title="View Borrow List"
              aria-label="View Borrow List"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Borrow List</span>
              <span
                className={`font-mono text-xs px-1.5 py-0.2 rounded-full ${
                  cart.length > 0
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'bg-stone-700 text-stone-300'
                }`}
              >
                {cart.length}/5
              </span>
            </button>

            {/* Authenticated User Menu or Sign In */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 text-xs font-medium bg-stone-800 hover:bg-stone-750 border border-stone-700 rounded-md transition-colors text-stone-200 cursor-pointer"
                >
                  <div
                    className={`w-6 h-6 rounded-full ${currentUser.avatarBg} text-white flex items-center justify-center font-bold text-[11px]`}
                  >
                    {currentUser.fullName.charAt(0)}
                  </div>
                  <div className="hidden sm:block text-left">
                    <span className="block text-stone-100 font-medium leading-none truncate max-w-[110px]">
                      {currentUser.fullName}
                    </span>
                    <span className="font-mono text-[10px] text-amber-400/90 leading-none block mt-0.5">
                      {currentUser.membershipId}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
                </button>

                {isUserMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-72 bg-stone-900 border border-stone-800 rounded-md shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
                    onMouseLeave={() => setIsUserMenuOpen(false)}
                  >
                    {/* User Summary Card */}
                    <div className="px-4 py-2.5 border-b border-stone-800">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-stone-200">Library Cardholder</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800/60 rounded">
                          ACTIVE
                        </span>
                      </div>
                      <p className="text-sm font-serif font-medium text-stone-100 mt-1 truncate">
                        {currentUser.fullName}
                      </p>
                      <p className="font-mono text-xs text-amber-400 mt-0.5">
                        {currentUser.membershipId}
                      </p>
                      <p className="text-[11px] text-stone-400 truncate mt-1">
                        Branch: {currentUser.preferredBranch}
                      </p>
                    </div>

                    {/* Nav Actions */}
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setActiveTab('profile');
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-stone-200 hover:bg-stone-800 flex items-center gap-2 cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                        <span>Borrowed Books & Loan Status</span>
                      </button>
                    </div>

                    {/* Switch Demo Account Helper */}
                    <div className="px-4 py-2 border-t border-stone-800">
                      <span className="text-[10px] uppercase font-mono text-stone-400 tracking-wider block mb-1.5">
                        Switch Cardholder Account
                      </span>
                      <div className="space-y-1">
                        {users.map((u) => (
                          <button
                            key={u.id}
                            onClick={() => {
                              switchDemoUser(u.membershipId);
                              setIsUserMenuOpen(false);
                            }}
                            className={`w-full text-left px-2 py-1.5 rounded text-xs flex items-center justify-between ${
                              u.id === currentUser.id
                                ? 'bg-stone-800 text-amber-400 font-medium'
                                : 'text-stone-300 hover:bg-stone-800/60'
                            }`}
                          >
                            <span className="truncate">{u.fullName}</span>
                            {u.id === currentUser.id && <Check className="w-3 h-3 text-amber-400" />}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Logout */}
                    <div className="pt-1 border-t border-stone-800">
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-stone-800 flex items-center gap-2 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out of Library</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal('login')}
                  className="px-3 py-1.5 text-xs font-medium text-stone-300 hover:text-stone-100 hover:bg-stone-800 rounded-md transition-colors cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => openAuthModal('register')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors cursor-pointer whitespace-nowrap shadow-sm"
                >
                  Get Library Card
                </button>
              </div>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-stone-400 hover:text-stone-100 focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-stone-800 py-3 space-y-2">
            <button
              onClick={() => {
                setActiveTab('catalog');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm rounded ${
                activeTab === 'catalog' ? 'bg-stone-800 text-amber-400 font-semibold' : 'text-stone-300'
              }`}
            >
              Browse Catalog
            </button>
            <button
              onClick={() => {
                if (!currentUser) {
                  openAuthModal('login');
                } else {
                  setActiveTab('profile');
                }
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm rounded flex items-center justify-between ${
                activeTab === 'profile' ? 'bg-stone-800 text-amber-400 font-semibold' : 'text-stone-300'
              }`}
            >
              <span>My Borrowed Books</span>
              {currentUser && (
                <span className="font-mono text-xs px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-full">
                  {activeLoansCount} Active
                </span>
              )}
            </button>
            <button
              onClick={() => {
                setActiveTab('branches');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm rounded ${
                activeTab === 'branches' ? 'bg-stone-800 text-amber-400 font-semibold' : 'text-stone-300'
              }`}
            >
              Branches & Hours
            </button>
            <button
              onClick={() => {
                setActiveTab('rules');
                setIsMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm rounded ${
                activeTab === 'rules' ? 'bg-stone-800 text-amber-400 font-semibold' : 'text-stone-300'
              }`}
            >
              Borrowing Policies & Fines
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
