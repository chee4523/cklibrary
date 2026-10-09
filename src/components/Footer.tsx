import React from 'react';
import { useLibrary } from '../context/LibraryContext';
import { Landmark } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useLibrary();

  return (
    <footer className="mt-auto bg-stone-900 text-stone-400 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Wordmark & Public Service */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-stone-100">
              <Landmark className="w-4 h-4 text-amber-400" />
              <span className="font-serif text-base font-semibold tracking-tight">
                Athenaeum Public Library System
              </span>
            </div>
            <p className="text-stone-400 max-w-sm leading-relaxed text-xs">
              Dedicated to free public inquiry, archival preservation, and lifelong reading since 1894. All residents are eligible for immediate borrowing privileges.
            </p>
            <p className="text-[11px] text-stone-500 font-mono">
              Central Branch: 450 Monument Ave · (555) 234-8900
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="font-mono uppercase tracking-wider text-[11px] text-stone-200 font-semibold mb-3">
              Library Access
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveTab('catalog')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Search Online Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('branches')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Branch Locations & Hours
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('rules')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Circulation & Renewals
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('profile')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Cardholder Account
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Circulation Guidelines */}
          <div>
            <h4 className="font-mono uppercase tracking-wider text-[11px] text-stone-200 font-semibold mb-3">
              Lending Summary
            </h4>
            <div className="space-y-1.5 text-[11px] text-stone-400">
              <p>Standard Loan: 14 Days</p>
              <p>Borrowing Limit: Max 5 Titles</p>
              <p>Online Renewals: 2 Extensions</p>
              <p>Return Drop: 24/7 Available</p>
            </div>
          </div>

        </div>

        {/* Bottom Hairline & Legal */}
        <div className="mt-8 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500">
          <p>© 2026 Athenaeum Public Library System. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Fine-Free Public Library</span>
            <span>·</span>
            <span>Accessibility Compliant</span>
            <span>·</span>
            <span>Interlibrary Loan Network</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
