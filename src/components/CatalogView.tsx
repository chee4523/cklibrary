import React from 'react';
import { useLibrary } from '../context/LibraryContext';
import { BookCard } from './BookCard';
import { BookCategory } from '../types/library';
import { Search, SlidersHorizontal, BookOpen, Check, X, Sparkles, Filter } from 'lucide-react';

const CATEGORIES: BookCategory[] = [
  'All',
  'Fiction & Literature',
  'Science & Speculative',
  'History & Society',
  'Arts & Architecture',
  'Biography & Memoir',
  'Philosophy & Thought',
];

export const CatalogView: React.FC = () => {
  const {
    books,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    availabilityFilter,
    setAvailabilityFilter,
    sortBy,
    setSortBy,
  } = useLibrary();

  // Filter books
  const filteredBooks = books.filter((book) => {
    // Search query matches title, author, isbn, or call number
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = book.title.toLowerCase().includes(q);
      const matchAuthor = book.author.toLowerCase().includes(q);
      const matchIsbn = book.isbn.toLowerCase().includes(q);
      const matchCall = book.callNumber.toLowerCase().includes(q);
      const matchTags = book.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchAuthor && !matchIsbn && !matchCall && !matchTags) {
        return false;
      }
    }

    // Category filter
    if (selectedCategory !== 'All' && book.category !== selectedCategory) {
      return false;
    }

    // Availability filter
    if (availabilityFilter === 'available' && book.availableCopies <= 0) {
      return false;
    }
    if (availabilityFilter === 'checked-out' && book.availableCopies > 0) {
      return false;
    }

    return true;
  });

  // Sort books
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === 'author') {
      return a.author.localeCompare(b.author);
    }
    if (sortBy === 'year') {
      return b.publicationYear - a.publicationYear;
    }
    // Default: featured first, then available copies
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return b.availableCopies - a.availableCopies;
  });

  // Count metrics
  const totalAvailableCount = books.reduce((acc, b) => acc + b.availableCopies, 0);
  const totalTitlesCount = books.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      
      {/* Editorial Catalog Hero Header */}
      <div className="border-b border-stone-200 pb-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-mono text-stone-500">
              <span>Collection Register</span>
              <span>·</span>
              <span className="text-amber-800 font-semibold">Circulating Physical Catalog</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight mt-1.5 text-balance">
              Browse Available Library Books
            </h1>
            <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-2xl font-sans">
              Discover curated monographs, literature, and scholarly volumes available for 14-day checkout across Athenaeum library reading rooms.
            </p>
          </div>

          {/* Operational Metrics Strip */}
          <div className="flex items-center gap-4 text-xs font-mono text-stone-600 shrink-0 bg-stone-100/80 p-3 rounded border border-stone-200/70">
            <div>
              <span className="text-stone-400 block text-[10px] uppercase">Catalog Titles</span>
              <span className="font-bold text-stone-900 text-sm">{totalTitlesCount} Works</span>
            </div>
            <div className="w-px h-7 bg-stone-200" />
            <div>
              <span className="text-stone-400 block text-[10px] uppercase">Copies on Shelf</span>
              <span className="font-bold text-emerald-700 text-sm">{totalAvailableCount} Ready</span>
            </div>
            <div className="w-px h-7 bg-stone-200" />
            <div>
              <span className="text-stone-400 block text-[10px] uppercase">Standard Loan</span>
              <span className="font-bold text-stone-900 text-sm">14 Days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar & Filter Controls Bar */}
      <div className="bg-white border border-stone-200 rounded-lg p-4 sm:p-5 shadow-xs mb-8 space-y-4">
        
        {/* Top Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Title, Author, ISBN (e.g. 978-0-14...), or Call Number (e.g. 720.1)..."
            className="w-full pl-10 pr-10 py-2.5 bg-stone-50 border border-stone-200 rounded-md text-sm text-stone-900 placeholder:text-stone-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500/40 focus:border-amber-600 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Controls Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2 border-t border-stone-100">
          
          {/* Category Filter Buttons (Functional segmented buttons per frontend-design) */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-stone-500 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" />
              <span>Genre:</span>
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 text-xs rounded transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-stone-900 text-white font-medium shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Secondary Controls: Availability & Sort */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            
            {/* Availability Filter Segment */}
            <div className="flex items-center gap-1 bg-stone-100 p-0.5 rounded text-xs">
              <button
                onClick={() => setAvailabilityFilter('all')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  availabilityFilter === 'all'
                    ? 'bg-white text-stone-900 font-semibold shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                All Statuses
              </button>
              <button
                onClick={() => setAvailabilityFilter('available')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center gap-1 ${
                  availabilityFilter === 'available'
                    ? 'bg-white text-emerald-800 font-semibold shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                Available Now
              </button>
              <button
                onClick={() => setAvailabilityFilter('checked-out')}
                className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  availabilityFilter === 'checked-out'
                    ? 'bg-white text-stone-900 font-semibold shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Checked Out
              </button>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-stone-500 font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-stone-200 rounded px-2 py-1 text-xs text-stone-800 focus:outline-hidden focus:ring-1 focus:ring-amber-500"
              >
                <option value="featured">Curated & Featured</option>
                <option value="title">Title (A–Z)</option>
                <option value="author">Author (A–Z)</option>
                <option value="year">Newest Publication</option>
              </select>
            </div>

          </div>
        </div>

      </div>

      {/* Catalog Grid */}
      {sortedBooks.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-lg p-12 text-center max-w-lg mx-auto">
          <BookOpen className="w-10 h-10 mx-auto text-stone-300 mb-3" />
          <h3 className="font-serif text-lg font-bold text-stone-800">
            No Matching Books Found
          </h3>
          <p className="text-xs text-stone-500 mt-1 mb-5">
            We couldn't find any titles matching your search criteria or filter configuration.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setAvailabilityFilter('all');
            }}
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-semibold transition-colors cursor-pointer"
          >
            Reset Catalog Filters
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between text-xs text-stone-500 mb-4 font-mono">
            <span>
              Showing {sortedBooks.length} of {books.length} titles
            </span>
            {searchQuery && (
              <span>
                Search results for: <strong className="text-stone-800">"{searchQuery}"</strong>
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
