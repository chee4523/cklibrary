import React from 'react';
import { Book } from '../types/library';
import { useLibrary } from '../context/LibraryContext';
import { BookCover } from './BookCover';
import { ShoppingBag, Check, Eye } from 'lucide-react';

interface BookCardProps {
  book: Book;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { setSelectedBookForModal, addToCart, cart } = useLibrary();

  const isAvailable = book.availableCopies > 0;
  const isInCart = cart.some((item) => item.bookId === book.id);

  return (
    <div className="group bg-white border border-stone-200/90 rounded-md p-4 sm:p-5 flex flex-col justify-between hover:border-stone-400 hover:shadow-md transition-all duration-200">
      
      {/* Top Section with Book Cover + Main Details */}
      <div className="flex gap-4 items-start">
        {/* Cover Preview (Clickable) */}
        <button
          onClick={() => setSelectedBookForModal(book)}
          className="shrink-0 focus:outline-hidden cursor-pointer"
          aria-label={`View details for ${book.title}`}
        >
          <BookCover book={book} size="md" />
        </button>

        {/* Text Details */}
        <div className="flex-1 min-w-0">
          
          {/* Unboxed Metadata Line with typographic separators (anti-slop rule) */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-1.5 truncate">
            <span className="font-semibold text-amber-800">{book.category}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">{book.publicationYear}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">{book.pages}p</span>
          </div>

          {/* Title */}
          <h3
            onClick={() => setSelectedBookForModal(book)}
            className="font-serif text-base sm:text-lg font-bold text-stone-900 group-hover:text-amber-900 transition-colors cursor-pointer line-clamp-2 leading-snug"
          >
            {book.title}
          </h3>

          {/* Author */}
          <p className="text-xs sm:text-sm text-stone-600 mt-1 font-medium truncate">
            by {book.author}
          </p>

          {/* Summary Excerpt */}
          <p className="text-xs text-stone-500 mt-2 line-clamp-2 leading-relaxed">
            {book.summary}
          </p>

          {/* Call Number & Shelf Location */}
          <div className="mt-2.5 flex items-center gap-2 text-[11px] font-mono text-stone-500">
            <span className="px-1.5 py-0.5 bg-stone-100 rounded text-stone-700 font-semibold border border-stone-200/60">
              {book.callNumber}
            </span>
            <span className="text-stone-400">·</span>
            <span>Stack 4B</span>
          </div>
        </div>
      </div>

      {/* Card Footer: Availability Indicator & Action Buttons */}
      <div className="mt-4 pt-3.5 border-t border-stone-100 flex items-center justify-between gap-3">
        
        {/* Status Indicator (Text + Color Dot with Explicit Count) */}
        <div className="text-xs">
          {isAvailable ? (
            <div className="flex items-center gap-1.5 font-medium text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-600" />
              <span>Available ({book.availableCopies}/{book.totalCopies})</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 font-medium text-stone-500">
              <span className="w-2 h-2 rounded-full bg-stone-400" />
              <span>Checked Out (0/{book.totalCopies})</span>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedBookForModal(book)}
            className="px-2.5 py-1.5 text-xs text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded transition-colors flex items-center gap-1 cursor-pointer"
            title="View Details"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Details</span>
          </button>

          {isAvailable ? (
            <button
              onClick={() => addToCart(book)}
              disabled={isInCart}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors flex items-center gap-1.5 cursor-pointer ${
                isInCart
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 cursor-default'
                  : 'bg-stone-900 hover:bg-stone-800 text-white shadow-xs'
              }`}
            >
              {isInCart ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>In List</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                  <span>Borrow</span>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={() => setSelectedBookForModal(book)}
              className="px-3 py-1.5 text-xs font-medium text-stone-500 bg-stone-100 hover:bg-stone-200 rounded transition-colors cursor-pointer"
            >
              View Holds
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
