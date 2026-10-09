import React, { useState } from 'react';
import { useLibrary } from '../context/LibraryContext';
import { BookCover } from './BookCover';
import { X, Trash2, Calendar, MapPin, CheckCircle, AlertCircle, ShoppingBag, ShieldCheck, ArrowRight } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    clearCart,
    checkoutCart,
    currentUser,
    openAuthModal,
    branches,
  } = useLibrary();

  const [selectedBranch, setSelectedBranch] = useState(
    currentUser?.preferredBranch || branches[0]?.name || 'Central Athenaeum Library'
  );
  const [agreedTerms, setAgreedTerms] = useState(true);

  if (!isCartOpen) return null;

  // Calculate return date for display (14 days from 2026-10-08 -> 2026-10-22)
  const dueDateObj = new Date('2026-10-08');
  dueDateObj.setDate(dueDateObj.getDate() + 14);
  const formattedDueDate = dueDateObj.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const handleCheckout = () => {
    if (!currentUser) {
      openAuthModal('login');
      return;
    }
    checkoutCart(selectedBranch);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs">
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-stone-50 border-l border-stone-200 shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="bg-stone-900 text-stone-100 px-6 py-5 flex items-center justify-between border-b border-stone-800 shrink-0">
            <div>
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                <h3 className="font-serif text-lg font-bold text-white">
                  Borrowing List ({cart.length}/5)
                </h3>
              </div>
              <p className="text-xs text-stone-400 mt-0.5">
                Review your selections before confirming library checkout
              </p>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-md transition-colors cursor-pointer"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quota Indicator Bar */}
          <div className="px-6 py-3 bg-stone-100 border-b border-stone-200 flex items-center justify-between text-xs">
            <span className="text-stone-600 font-medium">Borrowing Allowance</span>
            <div className="flex items-center gap-2">
              <div className="w-28 h-2 bg-stone-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    cart.length >= 5 ? 'bg-amber-600' : 'bg-emerald-600'
                  }`}
                  style={{ width: `${(cart.length / 5) * 100}%` }}
                />
              </div>
              <span className="font-mono text-stone-700 font-semibold">{cart.length}/5 slots</span>
            </div>
          </div>

          {/* Drawer Body - Book List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 mx-auto rounded-full bg-stone-200 flex items-center justify-center text-stone-400 mb-3">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-base font-semibold text-stone-800">
                  Your borrow list is empty
                </h4>
                <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                  Explore our catalog and click "Add to Borrow List" on any available title to take books home.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-500 pb-1 border-b border-stone-200">
                  <span>Selected Titles</span>
                  <button
                    onClick={clearCart}
                    className="text-stone-500 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>

                {cart.map((item) => (
                  <div
                    key={item.bookId}
                    className="p-3 bg-white border border-stone-200 rounded-md shadow-xs flex items-center gap-3 group"
                  >
                    <BookCover book={item.book} size="sm" />
                    
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-mono uppercase text-amber-800 block truncate">
                        {item.book.category}
                      </span>
                      <h5 className="font-serif text-sm font-semibold text-stone-900 leading-snug line-clamp-1">
                        {item.book.title}
                      </h5>
                      <p className="text-xs text-stone-600 truncate">
                        {item.book.author}
                      </p>
                      
                      <div className="mt-1 flex items-center gap-2 text-[11px] text-stone-500 font-mono">
                        <span>{item.book.callNumber}</span>
                        <span>·</span>
                        <span className="text-emerald-700 font-medium">14-day loan</span>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.bookId)}
                      className="p-2 text-stone-400 hover:text-red-600 hover:bg-stone-50 rounded transition-colors cursor-pointer"
                      title="Remove from list"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Circulation Policy & Due Date Notice */}
            {cart.length > 0 && (
              <div className="mt-6 space-y-4">
                
                {/* Due Date Card */}
                <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-md">
                  <div className="flex items-start gap-2.5">
                    <Calendar className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <span className="font-semibold text-amber-900 block">
                        Estimated Return Due Date:
                      </span>
                      <span className="font-serif text-sm font-bold text-amber-950 mt-0.5 block">
                        {formattedDueDate}
                      </span>
                      <p className="text-[11px] text-amber-800 mt-1">
                        Books may be renewed up to 2 times online if no other patron has placed a hold.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Pickup Branch Selector */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Hold Pickup & Return Branch
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <select
                      value={selectedBranch}
                      onChange={(e) => setSelectedBranch(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-stone-300 rounded focus:ring-2 focus:ring-amber-500/40 text-stone-800"
                    >
                      {branches.map((b) => (
                        <option key={b.id} value={b.name}>
                          {b.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Terms agreement checkbox */}
                <div>
                  <label className="flex items-start gap-2 text-[11px] text-stone-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreedTerms}
                      onChange={(e) => setAgreedTerms(e.target.checked)}
                      className="mt-0.5 rounded border-stone-300 text-amber-600 focus:ring-amber-500"
                    />
                    <span>
                      I agree to return these public library materials by the assigned due date or submit a renewal online.
                    </span>
                  </label>
                </div>

              </div>
            )}
          </div>

          {/* Drawer Footer Actions */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-stone-200 shrink-0 space-y-3">
              {currentUser ? (
                <div className="flex items-center justify-between text-xs pb-1">
                  <span className="text-stone-500">Borrower:</span>
                  <span className="font-semibold text-stone-800 font-mono">
                    {currentUser.fullName} ({currentUser.membershipId})
                  </span>
                </div>
              ) : (
                <div className="p-2.5 bg-stone-100 rounded text-xs text-stone-700 flex items-center justify-between">
                  <span>Sign in to complete checkout:</span>
                  <button
                    onClick={() => openAuthModal('login')}
                    className="text-amber-800 font-semibold underline cursor-pointer"
                  >
                    Log In / Sign Up
                  </button>
                </div>
              )}

              <button
                onClick={handleCheckout}
                disabled={!agreedTerms}
                className="w-full py-3 px-4 bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white font-medium rounded text-sm transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Confirm Checkout ({cart.length} Books)</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
