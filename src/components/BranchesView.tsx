import React from 'react';
import { useLibrary } from '../context/LibraryContext';
import { MapPin, Clock, Phone, Navigation, Landmark } from 'lucide-react';

export const BranchesView: React.FC = () => {
  const { branches } = useLibrary();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Editorial Title */}
      <div className="border-b border-stone-200 pb-5 mb-8">
        <span className="text-xs uppercase tracking-widest font-mono text-stone-500 block">
          Civic Network & Reading Rooms
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mt-1">
          Branches, Archives & Hours
        </h1>
        <p className="text-sm text-stone-600 mt-2 max-w-2xl">
          Athenaeum Public Library operates five neighborhood reading rooms, specialized research archives, and automated 24-hour return depository book drops.
        </p>
      </div>

      {/* Branches List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {branches.map((branch, index) => (
          <div
            key={branch.id}
            className="bg-white border border-stone-200 rounded-lg p-6 hover:border-stone-400 hover:shadow-sm transition-all"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded bg-stone-100 flex items-center justify-center text-stone-700">
                  <Landmark className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-stone-900 leading-snug">
                    {branch.name}
                  </h3>
                  <span className="text-[10px] font-mono uppercase text-amber-800">
                    Branch #{index + 1} · Circulating Collection
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-2.5 text-xs text-stone-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                <span>{branch.address}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                <span className="font-mono text-stone-700">{branch.hours}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-stone-400 shrink-0" />
                <span className="font-mono">{branch.phone}</span>
              </div>
            </div>

            <div className="mt-5 pt-3.5 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-emerald-700 font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                24/7 Book Drop Active
              </span>
              <span className="text-stone-500 font-mono text-[11px]">
                Wi-Fi & Study Desks Available
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
