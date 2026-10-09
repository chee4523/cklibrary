import React from 'react';
import { useLibrary } from '../context/LibraryContext';
import { X, CheckCircle, Printer, BookOpen, Landmark, ArrowRight } from 'lucide-react';

export const CheckoutReceiptModal: React.FC = () => {
  const { recentReceipt, setRecentReceipt, setActiveTab } = useLibrary();

  if (!recentReceipt) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white border border-stone-300 rounded-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Close */}
        <div className="absolute top-3 right-3">
          <button
            onClick={() => setRecentReceipt(null)}
            className="p-1 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close receipt"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Library Thermal Slip / Receipt Content */}
        <div className="p-6 sm:p-8 font-mono text-stone-800 text-xs">
          
          {/* Header */}
          <div className="text-center pb-4 border-b border-dashed border-stone-300">
            <div className="w-10 h-10 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-stone-800 mb-2">
              <Landmark className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold tracking-tight text-stone-900">
              ATHENAEUM PUBLIC LIBRARY
            </h3>
            <p className="text-[11px] text-stone-500 mt-0.5">
              CIRCULATION & LOANS DIVISION
            </p>
            <p className="text-[10px] text-stone-400 mt-0.5">
              {recentReceipt.branch}
            </p>
          </div>

          {/* Receipt Metadata */}
          <div className="py-3 border-b border-dashed border-stone-300 space-y-1 text-[11px]">
            <div className="flex justify-between">
              <span className="text-stone-500">RECEIPT NO:</span>
              <span className="font-bold">{recentReceipt.receiptId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">DATE & TIME:</span>
              <span>{recentReceipt.timestamp}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">PATRON NAME:</span>
              <span className="font-medium">{recentReceipt.userName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">CARD ID:</span>
              <span className="font-bold text-amber-900">{recentReceipt.membershipId}</span>
            </div>
          </div>

          {/* Itemized Loans */}
          <div className="py-4 border-b border-dashed border-stone-300 space-y-3">
            <div className="text-[10px] uppercase tracking-wider text-stone-500 font-bold">
              CHECKED OUT TITLES ({recentReceipt.items.length})
            </div>

            {recentReceipt.items.map((item, index) => (
              <div key={item.bookId} className="space-y-0.5">
                <div className="flex items-start justify-between">
                  <span className="font-medium text-stone-900 line-clamp-1 pr-2">
                    {index + 1}. {item.title}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-stone-500">
                  <span>{item.author} · {item.callNumber}</span>
                  <span className="font-bold text-stone-900 bg-stone-100 px-1 py-0.2 rounded">
                    DUE: {item.dueDate}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Return Terms & Barcode */}
          <div className="pt-4 text-center space-y-3">
            <p className="text-[10px] text-stone-600 leading-relaxed">
              Standard borrowing period: 14 days.<br />
              Renew online anytime or return materials to any 24-hour return book drop box across the city.
            </p>

            {/* Simulated Digital Barcode */}
            <div className="py-2 flex flex-col items-center">
              <div className="flex items-end h-9 gap-0.5 max-w-[200px] w-full justify-center">
                {[
                  2, 4, 1, 3, 2, 5, 1, 4, 3, 2, 1, 4, 2, 5, 1, 3, 2, 4, 1, 5, 2, 3, 4, 1, 2, 4, 3, 1,
                  2, 4,
                ].map((w, idx) => (
                  <div
                    key={idx}
                    className="bg-stone-900"
                    style={{
                      width: `${w * 1.2}px`,
                      height: `${24 + (idx % 3) * 4}px`,
                    }}
                  />
                ))}
              </div>
              <span className="text-[9px] tracking-widest text-stone-500 mt-1">
                *{recentReceipt.membershipId}*
              </span>
            </div>
          </div>

          {/* Modal Action Buttons */}
          <div className="mt-5 pt-3 border-t border-stone-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setRecentReceipt(null);
                setActiveTab('profile');
              }}
              className="w-full py-2.5 px-3 bg-stone-900 hover:bg-stone-800 text-white rounded font-sans font-medium text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>View in My Borrowed Books</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handlePrint}
              className="w-full py-2 px-3 border border-stone-300 hover:bg-stone-100 text-stone-700 rounded font-sans text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Loan Receipt</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
