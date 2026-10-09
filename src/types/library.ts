export interface User {
  id: string;
  membershipId: string;
  fullName: string;
  email: string;
  phone: string;
  password?: string;
  preferredBranch: string;
  joinedDate: string;
  avatarBg: string;
}

export type BookCategory =
  | 'All'
  | 'Fiction & Literature'
  | 'Science & Speculative'
  | 'History & Society'
  | 'Arts & Architecture'
  | 'Biography & Memoir'
  | 'Philosophy & Thought';

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  callNumber: string;
  category: BookCategory;
  publicationYear: number;
  pages: number;
  publisher: string;
  borrowPeriodDays: number;
  totalCopies: number;
  availableCopies: number;
  summary: string;
  tags: string[];
  coverStyle: {
    bg: string;
    border: string;
    textColor: string;
    accentColor: string;
    pattern: 'astronomy' | 'botany' | 'architecture' | 'classic' | 'geometry' | 'minimal' | 'vintage';
  };
  featured?: boolean;
}

export interface CartItem {
  bookId: string;
  book: Book;
  addedAt: string;
  projectedDueDate: string;
}

export interface BorrowRecord {
  id: string;
  userId: string;
  membershipId: string;
  bookId: string;
  bookTitle: string;
  bookAuthor: string;
  bookCategory: BookCategory;
  callNumber: string;
  borrowDate: string;
  dueDate: string;
  returnedDate?: string;
  status: 'active' | 'returned' | 'overdue';
  renewalCount: number;
  maxRenewals: number;
  pickupBranch: string;
}

export interface CheckoutReceipt {
  receiptId: string;
  membershipId: string;
  userName: string;
  branch: string;
  timestamp: string;
  items: {
    bookId: string;
    title: string;
    author: string;
    callNumber: string;
    dueDate: string;
  }[];
}

export interface LibraryBranch {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'info' | 'warning' | 'error';
}
