import React, { useState } from 'react';
import { useLibrary } from '../context/LibraryContext';
import {
  CreditCard,
  BookOpen,
  Calendar,
  RotateCcw,
  CheckCircle2,
  Clock,
  Landmark,
  User as UserIcon,
  Phone,
  Mail,
  MapPin,
  AlertTriangle,
  Bookmark,
  ShieldCheck,
} from 'lucide-react';

export const UserProfileView: React.FC = () => {
  const {
    currentUser,
    borrowRecords,
    returnBook,
    renewBook,
    openAuthModal,
    setActiveTab,
  } = useLibrary();

  const [subTab, setSubTab] = useState<'current' | 'history' | 'card'>('current');

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white border border-stone-200 rounded-lg text-center shadow-sm">
        <div className="w-12 h-12 mx-auto rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mb-4">
          <CreditCard className="w-6 h-6" />
        </div>
        <h3 className="font-serif text-xl font-bold text-stone-900">
          Library Cardholder Sign In Required
        </h3>
        <p className="text-xs text-stone-600 mt-2 mb-6">
          Sign in with your Email or Membership ID to view your active loans, renew books, and access your digital card.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => openAuthModal('login')}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-semibold cursor-pointer"
          >
            Sign In
          </button>
          <button
            onClick={() => openAuthModal('register')}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded text-xs font-semibold cursor-pointer"
          >
            Apply for Membership
          </button>
        </div>
      </div>
    );
  }

  // Filter records for current user
  const userRecords = borrowRecords.filter((r) => r.userId === currentUser.id);
  const activeRecords = userRecords.filter((r) => r.status === 'active');
  const pastRecords = userRecords.filter((r) => r.status === 'returned');

  // Calculate days remaining from today (2026-10-08)
  const getDaysRemaining = (dueDateStr: string) => {
    const today = new Date('2026-10-08');
    const due = new Date(dueDateStr);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Top Banner / Cardholder Overview */}
      <div className="bg-stone-900 text-stone-100 rounded-lg p-6 sm:p-8 border border-stone-800 shadow-md mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div
              className={`w-14 h-14 rounded-md ${currentUser.avatarBg} text-white flex items-center justify-center font-serif text-2xl font-bold shadow-inner shrink-0`}
            >
              {currentUser.fullName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl font-bold text-white tracking-tight">
                  {currentUser.fullName}
                </h1>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800/80 rounded">
                  ACTIVE CARDHOLDER
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-stone-400">
                <span className="font-mono text-amber-400 font-semibold">
                  Card ID: {currentUser.membershipId}
                </span>
                <span>·</span>
                <span>Home Branch: {currentUser.preferredBranch}</span>
                <span>·</span>
                <span>Member Since {currentUser.joinedDate}</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3">
            <div className="bg-stone-800/80 border border-stone-700/80 px-4 py-2.5 rounded text-center">
              <span className="block font-mono text-xl font-bold text-amber-400">
                {activeRecords.length}
              </span>
              <span className="text-[11px] text-stone-400 uppercase tracking-wider font-mono">
                Active Loans
              </span>
            </div>
            <div className="bg-stone-800/80 border border-stone-700/80 px-4 py-2.5 rounded text-center">
              <span className="block font-mono text-xl font-bold text-stone-200">
                {pastRecords.length}
              </span>
              <span className="text-[11px] text-stone-400 uppercase tracking-wider font-mono">
                Past Returns
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Subtabs */}
      <div className="flex border-b border-stone-200 mb-6 gap-6">
        <button
          onClick={() => setSubTab('current')}
          className={`pb-3 text-sm font-semibold transition-colors border-b-2 flex items-center gap-2 cursor-pointer ${
            subTab === 'current'
              ? 'text-stone-900 border-amber-600'
              : 'text-stone-500 border-transparent hover:text-stone-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Currently Borrowed ({activeRecords.length})</span>
        </button>
        <button
          onClick={() => setSubTab('history')}
          className={`pb-3 text-sm font-semibold transition-colors border-b-2 flex items-center gap-2 cursor-pointer ${
            subTab === 'history'
              ? 'text-stone-900 border-amber-600'
              : 'text-stone-500 border-transparent hover:text-stone-800'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Borrowing History ({pastRecords.length})</span>
        </button>
        <button
          onClick={() => setSubTab('card')}
          className={`pb-3 text-sm font-semibold transition-colors border-b-2 flex items-center gap-2 cursor-pointer ${
            subTab === 'card'
              ? 'text-stone-900 border-amber-600'
              : 'text-stone-500 border-transparent hover:text-stone-800'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Digital Library Card</span>
        </button>
      </div>

      {/* TAB 1: Currently Borrowed Books */}
      {subTab === 'current' && (
        <div className="space-y-4">
          {activeRecords.length === 0 ? (
            <div className="bg-white border border-stone-200 rounded-md p-10 text-center">
              <BookOpen className="w-10 h-10 mx-auto text-stone-300 mb-3" />
              <h3 className="font-serif text-lg font-semibold text-stone-800">
                No Books Currently Checked Out
              </h3>
              <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto mb-5">
                Browse our curated public catalog, select titles for loan, and check them out directly.
              </p>
              <button
                onClick={() => setActiveTab('catalog')}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-semibold cursor-pointer"
              >
                Browse Library Catalog
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeRecords.map((record) => {
                const daysLeft = getDaysRemaining(record.dueDate);
                const isOverdue = daysLeft < 0;
                const isDueSoon = daysLeft <= 3 && daysLeft >= 0;

                return (
                  <div
                    key={record.id}
                    className="bg-white border border-stone-200 rounded-md p-5 shadow-xs flex flex-col justify-between hover:border-stone-300 transition-colors"
                  >
                    <div>
                      {/* Top Header */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="text-[10px] font-mono uppercase text-amber-800 tracking-wider">
                          {record.bookCategory}
                        </span>

                        {/* Status Badge */}
                        {isOverdue ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                            <AlertTriangle className="w-3 h-3" />
                            Overdue by {Math.abs(daysLeft)} days
                          </span>
                        ) : isDueSoon ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                            <Clock className="w-3 h-3" />
                            Due in {daysLeft} {daysLeft === 1 ? 'day' : 'days'}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                            <Calendar className="w-3 h-3" />
                            Due in {daysLeft} days
                          </span>
                        )}
                      </div>

                      {/* Title & Author */}
                      <h4 className="font-serif text-lg font-bold text-stone-900 leading-snug">
                        {record.bookTitle}
                      </h4>
                      <p className="text-xs text-stone-600 mt-0.5 font-medium">
                        by {record.bookAuthor}
                      </p>

                      {/* Loan Details List */}
                      <div className="mt-4 pt-3 border-t border-stone-100 grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-[10px] text-stone-400 uppercase font-mono block">
                            Borrowed On
                          </span>
                          <span className="font-mono text-stone-700 font-medium">
                            {record.borrowDate}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-stone-400 uppercase font-mono block">
                            Due Date
                          </span>
                          <span className="font-mono text-stone-900 font-bold">
                            {record.dueDate}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-stone-400 uppercase font-mono block">
                            Renewals
                          </span>
                          <span className="font-mono text-stone-700">
                            {record.renewalCount} of {record.maxRenewals} used
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-stone-400 uppercase font-mono block">
                            Call Number
                          </span>
                          <span className="font-mono text-stone-700 font-medium">
                            {record.callNumber}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions: Return & Renew */}
                    <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                      <button
                        onClick={() => renewBook(record.id)}
                        disabled={record.renewalCount >= record.maxRenewals}
                        className={`flex-1 py-2 px-3 rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                          record.renewalCount >= record.maxRenewals
                            ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                            : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300'
                        }`}
                        title="Renew loan for 14 days"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Renew Loan (+14d)</span>
                      </button>

                      <button
                        onClick={() => returnBook(record.id)}
                        className="flex-1 py-2 px-3 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Return Book</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Borrowing History */}
      {subTab === 'history' && (
        <div className="bg-white border border-stone-200 rounded-md overflow-hidden">
          {pastRecords.length === 0 ? (
            <div className="p-10 text-center text-xs text-stone-500">
              No previous return history found on this membership record.
            </div>
          ) : (
            <div className="divide-y divide-stone-200">
              {pastRecords.map((record) => (
                <div
                  key={record.id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-stone-50/60 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono uppercase text-stone-500 block">
                      {record.bookCategory} · {record.callNumber}
                    </span>
                    <h4 className="font-serif text-base font-bold text-stone-900 leading-snug">
                      {record.bookTitle}
                    </h4>
                    <p className="text-xs text-stone-600 font-medium">
                      by {record.bookAuthor}
                    </p>
                  </div>

                  <div className="flex items-center gap-6 text-xs font-mono text-stone-600 shrink-0">
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase block">Borrowed</span>
                      <span>{record.borrowDate}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-400 uppercase block">Returned</span>
                      <span className="text-emerald-700 font-semibold">
                        {record.returnedDate || 'Completed'}
                      </span>
                    </div>
                    <span className="px-2 py-0.5 bg-stone-100 rounded text-stone-600 text-[11px] font-mono">
                      Returned to Collection
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Digital Library Card */}
      {subTab === 'card' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Card Presentation */}
          <div className="bg-gradient-to-br from-stone-900 via-stone-850 to-stone-900 border border-stone-700 rounded-xl p-6 sm:p-7 text-stone-100 shadow-xl relative overflow-hidden select-none">
            {/* Magnetic Stripe Accent / Watermark */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
                  <Landmark className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-serif text-base font-bold tracking-tight block leading-tight">
                    ATHENAEUM PUBLIC LIBRARY
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-amber-400/80 font-mono">
                    Official Borrower Card
                  </span>
                </div>
              </div>

              <span className="font-mono text-xs px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800/80 rounded">
                VALID
              </span>
            </div>

            {/* Member Info */}
            <div className="my-6">
              <div className="text-[10px] uppercase font-mono text-stone-400">Cardholder Name</div>
              <div className="font-serif text-xl font-bold tracking-wide text-white mt-0.5">
                {currentUser.fullName}
              </div>
              <div className="text-[11px] text-stone-400 mt-1 font-mono">
                Branch: {currentUser.preferredBranch}
              </div>
            </div>

            {/* Barcode & Membership ID */}
            <div className="pt-4 border-t border-stone-800">
              <div className="flex flex-col items-center">
                <div className="flex items-end h-8 gap-0.5 w-full justify-center opacity-85">
                  {[2, 5, 1, 4, 2, 4, 1, 3, 5, 2, 1, 4, 3, 1, 5, 2, 4, 1, 3, 2, 5, 1, 4, 2, 3, 1, 4, 2].map(
                    (w, idx) => (
                      <div
                        key={idx}
                        className="bg-stone-100"
                        style={{
                          width: `${w * 1.5}px`,
                          height: `${22 + (idx % 3) * 3}px`,
                        }}
                      />
                    )
                  )}
                </div>
                <div className="font-mono text-xs tracking-widest text-amber-300 font-bold mt-2">
                  {currentUser.membershipId}
                </div>
              </div>
            </div>
          </div>

          {/* Account Profile Details */}
          <div className="bg-white border border-stone-200 rounded-md p-6 shadow-xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-200 pb-2">
              Patron Profile Information
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3">
                <UserIcon className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-stone-500 block">Full Legal Name</span>
                  <span className="font-medium text-stone-800">{currentUser.fullName}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-stone-500 block">Registered Email</span>
                  <span className="font-medium text-stone-800">{currentUser.email}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-stone-500 block">Phone Contact</span>
                  <span className="font-medium text-stone-800">{currentUser.phone}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-stone-500 block">Home Pickup Branch</span>
                  <span className="font-medium text-stone-800">{currentUser.preferredBranch}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-stone-500 block">Borrowing Privilege</span>
                  <span className="font-medium text-emerald-700">Good Standing (Max 5 items per loan)</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 text-[11px] text-stone-500">
              Need to update your contact details or report a lost card? Visit any Athenaeum circulation desk with valid photo identification.
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
