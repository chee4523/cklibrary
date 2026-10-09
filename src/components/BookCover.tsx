import React from 'react';
import { Book } from '../types/library';

interface BookCoverProps {
  book: Book;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const BookCover: React.FC<BookCoverProps> = ({ book, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-20 h-28 text-[9px]',
    md: 'w-36 h-52 text-[11px]',
    lg: 'w-48 h-68 text-xs',
  };

  const { bg, border, textColor, accentColor, pattern } = book.coverStyle;

  return (
    <div
      className={`relative rounded-sm overflow-hidden select-none shrink-0 shadow-md transition-transform duration-200 group-hover:scale-[1.02] flex flex-col justify-between p-3 ${sizeClasses[size]} ${className}`}
      style={{
        backgroundColor: bg,
        borderColor: border,
        borderWidth: '1px',
        color: textColor,
        boxShadow:
          '2px 4px 10px rgba(0,0,0,0.18), inset 4px 0 6px -2px rgba(255,255,255,0.08), inset -2px 0 4px rgba(0,0,0,0.25)',
      }}
    >
      {/* Book Spine Shadow Effect on left */}
      <div
        className="absolute left-0 top-0 bottom-0 w-2.5 pointer-events-none opacity-40"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.4), rgba(255,255,255,0.15) 60%, transparent)',
        }}
      />

      {/* Background Graphic Pattern based on category/motif */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        {pattern === 'astronomy' && (
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke={accentColor}>
            <circle cx="50" cy="50" r="38" strokeWidth="0.8" strokeDasharray="2,2" />
            <circle cx="50" cy="50" r="24" strokeWidth="0.8" />
            <circle cx="50" cy="50" r="8" strokeWidth="1" />
            <line x1="10" y1="50" x2="90" y2="50" strokeWidth="0.6" />
            <line x1="50" y1="10" x2="50" y2="90" strokeWidth="0.6" />
            <polygon points="50,20 54,35 68,38 56,48 60,62 50,52 40,62 44,48 32,38 46,35" strokeWidth="0.6" />
          </svg>
        )}

        {pattern === 'botany' && (
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke={accentColor}>
            <path d="M50 85 C50 50 20 40 18 20 C35 25 45 45 50 60 C55 45 65 25 82 20 C80 40 50 50 50 85 Z" strokeWidth="0.9" />
            <path d="M50 85 L50 15" strokeWidth="1" />
            <path d="M50 45 Q35 38 30 30" strokeWidth="0.7" />
            <path d="M50 45 Q65 38 70 30" strokeWidth="0.7" />
            <path d="M50 60 Q38 55 34 50" strokeWidth="0.7" />
            <path d="M50 60 Q62 55 66 50" strokeWidth="0.7" />
          </svg>
        )}

        {pattern === 'architecture' && (
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke={accentColor}>
            <rect x="18" y="18" width="64" height="64" strokeWidth="0.8" />
            <line x1="18" y1="18" x2="82" y2="82" strokeWidth="0.6" />
            <line x1="18" y1="82" x2="82" y2="18" strokeWidth="0.6" />
            <circle cx="50" cy="50" r="22" strokeWidth="0.8" />
            <line x1="50" y1="0" x2="50" y2="100" strokeWidth="0.5" strokeDasharray="3,2" />
          </svg>
        )}

        {pattern === 'classic' && (
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke={accentColor}>
            <rect x="12" y="12" width="76" height="76" strokeWidth="1" />
            <rect x="16" y="16" width="68" height="68" strokeWidth="0.5" strokeDasharray="2,2" />
            <circle cx="50" cy="20" r="4" strokeWidth="0.7" />
            <circle cx="50" cy="80" r="4" strokeWidth="0.7" />
          </svg>
        )}

        {pattern === 'geometry' && (
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke={accentColor}>
            <polygon points="50,15 85,75 15,75" strokeWidth="0.8" />
            <polygon points="50,85 85,25 15,25" strokeWidth="0.5" strokeDasharray="2,2" />
            <circle cx="50" cy="50" r="16" strokeWidth="0.7" />
          </svg>
        )}

        {pattern === 'minimal' && (
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke={accentColor}>
            <line x1="25" y1="20" x2="75" y2="20" strokeWidth="1.5" />
            <line x1="25" y1="28" x2="60" y2="28" strokeWidth="1" />
            <rect x="25" y="45" width="50" height="2" fill={accentColor} />
          </svg>
        )}

        {pattern === 'vintage' && (
          <svg className="w-full h-full" viewBox="0 0 100 100" fill="none" stroke={accentColor}>
            <rect x="14" y="14" width="72" height="72" strokeWidth="0.8" rx="2" />
            <rect x="18" y="18" width="64" height="64" strokeWidth="0.5" strokeDasharray="2,2" />
            <path d="M14 26 C26 26 26 14 26 14" strokeWidth="0.7" />
            <path d="M86 26 C74 26 74 14 74 14" strokeWidth="0.7" />
            <path d="M14 74 C26 74 26 86 26 86" strokeWidth="0.7" />
            <path d="M86 74 C74 74 74 86 74 86" strokeWidth="0.7" />
          </svg>
        )}
      </div>

      {/* Top Foil Border & Category Sub-label */}
      <div className="relative z-10">
        <div
          className="text-[8px] uppercase tracking-widest font-mono opacity-80 truncate"
          style={{ color: accentColor }}
        >
          {book.category.split(' ')[0]}
        </div>
      </div>

      {/* Center Title & Author */}
      <div className="relative z-10 my-auto text-center px-1">
        <h4
          className="font-serif font-semibold leading-tight line-clamp-3 text-balance"
          style={{
            fontSize: size === 'sm' ? '10px' : size === 'lg' ? '15px' : '12px',
          }}
        >
          {book.title}
        </h4>
        <div
          className="mt-1.5 text-[9px] font-sans tracking-wide uppercase opacity-75 truncate"
          style={{ color: accentColor }}
        >
          {book.author}
        </div>
      </div>

      {/* Bottom Library Call Number Spine Label (Tactile public library detail) */}
      <div className="relative z-10 flex items-end justify-between pt-1 border-t border-white/10">
        <span className="font-mono text-[8px] px-1 py-0.5 bg-stone-900/60 rounded-xs text-stone-200 tracking-wider">
          {book.callNumber}
        </span>
        <span className="text-[8px] opacity-60 font-mono">{book.publicationYear}</span>
      </div>
    </div>
  );
};
