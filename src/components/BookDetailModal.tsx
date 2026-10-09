import React from 'react';
import { useLibrary } from '../context/LibraryContext';
import { BookCover } from './BookCover';
import { X, Check, ShoppingBag, BookMarked, Calendar, Hash, Building2, MapPin, AlertCircle } from 'lucide-react';

export const BookDetailModal: React.FC = () => {
  const { selectedBookForModal, setSelectedBookForModal, addToCart, cart } = useLibrary();

  if (!selectedBookForModal) return null;

  const book = selectedBookForModal;
  const isAvailable = book.availableCopies > 0;
  const isInCart = cart.some((item) => item.bookId === book.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-stone-50 border border-stone-200 rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Top Header */}
        <div className="bg-stone-900 text-stone-100 px-6 py-4 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2 text-xs font-mono text-stone-400">
            <span>CALL NO: {book.callNumber}</span>
            <span>·</span>
            <span>ISBN: {book.isbn}</span>
          </div>
          <button
            onClick={() => setSelectedBookForModal(null)}
            className="p-1.5 text-stone-400 hover:text-stone-100 hover:bg-stone-800 rounded-md transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
            
            {/* Book Cover Visual with shadow */}
            <div className="flex flex-col items-center mx-auto sm:mx-0">
              <BookCover book={book} size="lg" />
              
              {/* Call Number Library Spine Sticker */}
              <div className="mt-3 text-center">
                <span className="font-mono text-xs px-2.5 py-1 bg-stone-200 text-stone-800 border border-stone-300 rounded font-semibold tracking-wider">
                  {book.callNumber}
                </span>
                <span className="block text-[11px] text-stone-500 mt-1 font-mono">
                  Stack 4B · Main Floor
                </span>
              </div>
            </div>

            {/* Book Information */}
            <div className="flex-1 min-w-0">
              
              {/* Category & Status Row */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-amber-800">
                  {book.category}
                </span>

                {isAvailable ? (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    Available ({book.availableCopies} of {book.totalCopies} copies)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 bg-stone-200 border border-stone-300 px-2.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-500" />
                    Checked Out (0 of {book.totalCopies} copies)
                  </span>
                )}
              </div>

              {/* Title & Author */}
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
                {book.title}
              </h2>
              <p className="text-base text-stone-700 mt-1 font-medium">
                by {book.author}
              </p>

              {/* Synopsis */}
              <div className="mt-4 pt-4 border-t border-stone-200">
                <h4 className="text-xs uppercase tracking-wider font-mono text-stone-500 font-medium mb-1.5">
                  Archival Synopsis
                </h4>
                <p className="text-sm text-stone-600 leading-relaxed font-sans">
                  {book.summary}
                </p>
              </div>

              {/* Metadata Grid */}
              <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3 bg-stone-100/70 p-3.5 rounded border border-stone-200/80 text-xs">
                <div>
                  <span className="text-[11px] text-stone-500 block">Loan Period</span>
                  <span className="font-medium text-stone-800 flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-700" />
                    14 Days (Renewable)
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-stone-500 block">Publisher</span>
                  <span className="font-medium text-stone-800 flex items-center gap-1 mt-0.5 truncate">
                    <Building2 className="w-3.5 h-3.5 text-stone-500" />
                    {book.publisher}
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-stone-500 block">Length</span>
                  <span className="font-medium text-stone-800 mt-0.5 block">
                    {book.pages} pages · {book.publicationYear}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex items-center gap-3">
                {isAvailable ? (
                  <button
                    onClick={() => {
                      addToCart(book);
                    }}
                    disabled={isInCart}
                    className={`flex-1 py-2.5 px-4 rounded text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                      isInCart
                        ? 'bg-emerald-700 text-white cursor-default'
                        : 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-sm'
                    }`}
                  >
                    {isInCart ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>In Your Borrow List</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Add to Borrow List</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="flex-1 py-2.5 px-4 bg-stone-200 text-stone-600 rounded text-sm font-medium flex items-center justify-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>All copies checked out · Reserve at Circulation Desk</span>
                  </div>
                )}

                <button
                  onClick={() => setSelectedBookForModal(null)}
                  className="py-2.5 px-4 border border-stone-300 hover:bg-stone-100 text-stone-700 rounded text-sm font-medium transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
