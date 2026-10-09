import React from 'react';
import { BookOpen, Calendar, RotateCcw, AlertCircle, ShieldCheck, Check } from 'lucide-react';

export const RulesView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Editorial Title */}
      <div className="border-b border-stone-200 pb-5 mb-8">
        <span className="text-xs uppercase tracking-widest font-mono text-stone-500 block">
          Patron Guidelines & Lending Charter
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
          Public Circulation & Borrowing Policies
        </h1>
        <p className="text-sm text-stone-600 mt-2">
          Athenaeum Public Library is committed to equitable, free, and open access to knowledge for all registered community cardholders.
        </p>
      </div>

      {/* Policy Cards */}
      <div className="space-y-6">
        
        <div className="bg-white border border-stone-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded bg-amber-50 text-amber-800 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Standard Loan Period: 14 Days
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-2">
            All general circulating books, monographs, and non-fiction volumes are issued for a standard duration of <strong>14 consecutive calendar days</strong>. Reference materials and special rare collections remain on reserve for in-library reading only.
          </p>
        </div>

        <div className="bg-white border border-stone-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded bg-emerald-50 text-emerald-800 flex items-center justify-center">
              <RotateCcw className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Loan Renewals (Up to 2 Extensions)
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-2">
            Items may be renewed up to <strong>two consecutive times (+14 days per renewal)</strong> via the online portal or automated telephone line, provided no other cardholder has placed an active hold on the title.
          </p>
        </div>

        <div className="bg-white border border-stone-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded bg-stone-100 text-stone-800 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Borrowing Limits: 5 Items Per Checkout
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-2">
            To ensure fair circulation across our neighborhood branches, patrons may borrow up to <strong>5 physical volumes per checkout transaction</strong>. New checkouts can be initiated once previous titles are checked back in.
          </p>
        </div>

        <div className="bg-white border border-stone-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded bg-blue-50 text-blue-800 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Fine-Free Public Library Policy
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-2">
            Athenaeum does not assess daily overdue fines. However, borrowing privileges are temporarily suspended when items become more than 21 days past due until the materials are returned in good order or replaced.
          </p>
        </div>

      </div>
    </div>
  );
};
