import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Book,
  BookCategory,
  BorrowRecord,
  CartItem,
  CheckoutReceipt,
  LibraryBranch,
  ToastMessage,
  User,
} from '../types/library';
import {
  DEMO_USERS,
  INITIAL_BOOKS,
  INITIAL_BORROW_RECORDS,
  LIBRARY_BRANCHES,
} from '../data/mockData';

interface LibraryContextType {
  currentUser: User | null;
  users: User[];
  books: Book[];
  borrowRecords: BorrowRecord[];
  cart: CartItem[];
  recentReceipt: CheckoutReceipt | null;
  branches: LibraryBranch[];
  activeTab: 'catalog' | 'profile' | 'branches' | 'rules';
  isCartOpen: boolean;
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'register';
  selectedBookForModal: Book | null;
  toasts: ToastMessage[];
  // Filters & Search
  searchQuery: string;
  selectedCategory: BookCategory;
  availabilityFilter: 'all' | 'available' | 'checked-out';
  sortBy: 'featured' | 'title' | 'author' | 'year';

  // Actions
  setActiveTab: (tab: 'catalog' | 'profile' | 'branches' | 'rules') => void;
  setIsCartOpen: (open: boolean) => void;
  openAuthModal: (tab?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  setSelectedBookForModal: (book: Book | null) => void;
  setSearchQuery: (q: string) => void;
  setSelectedCategory: (cat: BookCategory) => void;
  setAvailabilityFilter: (f: 'all' | 'available' | 'checked-out') => void;
  setSortBy: (s: 'featured' | 'title' | 'author' | 'year') => void;
  setRecentReceipt: (r: CheckoutReceipt | null) => void;

  // Authentication
  login: (identifier: string, password?: string) => { success: boolean; error?: string };
  register: (userData: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    preferredBranch: string;
  }) => { success: boolean; user?: User; error?: string };
  logout: () => void;
  switchDemoUser: (membershipId: string) => void;

  // Cart & Borrowing
  addToCart: (book: Book) => { success: boolean; message?: string };
  removeFromCart: (bookId: string) => void;
  clearCart: () => void;
  checkoutCart: (pickupBranch: string) => { success: boolean; receipt?: CheckoutReceipt; error?: string };

  // Profile actions
  returnBook: (recordId: string) => void;
  renewBook: (recordId: string) => { success: boolean; message?: string };

  // Toast
  addToast: (title: string, description?: string, type?: ToastMessage['type']) => void;
  removeToast: (id: string) => void;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current user state (persisted)
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('athenaeum_current_user');
      return saved ? JSON.parse(saved) : DEMO_USERS[0]; // Default to Eleanor Vance for instant rich preview
    } catch {
      return DEMO_USERS[0];
    }
  });

  // Users database
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem('athenaeum_users');
      return saved ? JSON.parse(saved) : DEMO_USERS;
    } catch {
      return DEMO_USERS;
    }
  });

  // Books catalog
  const [books, setBooks] = useState<Book[]>(() => {
    try {
      const saved = localStorage.getItem('athenaeum_books');
      return saved ? JSON.parse(saved) : INITIAL_BOOKS;
    } catch {
      return INITIAL_BOOKS;
    }
  });

  // Borrow records
  const [borrowRecords, setBorrowRecords] = useState<BorrowRecord[]>(() => {
    try {
      const saved = localStorage.getItem('athenaeum_records');
      return saved ? JSON.parse(saved) : INITIAL_BORROW_RECORDS;
    } catch {
      return INITIAL_BORROW_RECORDS;
    }
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('athenaeum_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI state
  const [recentReceipt, setRecentReceipt] = useState<CheckoutReceipt | null>(null);
  const [activeTab, setActiveTab] = useState<'catalog' | 'profile' | 'branches' | 'rules'>('catalog');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'register'>('login');
  const [selectedBookForModal, setSelectedBookForModal] = useState<Book | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<BookCategory>('All');
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'available' | 'checked-out'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'title' | 'author' | 'year'>('featured');

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('athenaeum_current_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('athenaeum_current_user');
      }
    } catch {}
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem('athenaeum_users', JSON.stringify(users));
    } catch {}
  }, [users]);

  useEffect(() => {
    try {
      localStorage.setItem('athenaeum_books', JSON.stringify(books));
    } catch {}
  }, [books]);

  useEffect(() => {
    try {
      localStorage.setItem('athenaeum_records', JSON.stringify(borrowRecords));
    } catch {}
  }, [borrowRecords]);

  useEffect(() => {
    try {
      localStorage.setItem('athenaeum_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  // Toast Helpers
  const addToast = (title: string, description?: string, type: ToastMessage['type'] = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const openAuthModal = (tab: 'login' | 'register' = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // Auth Operations
  const login = (identifier: string, password?: string) => {
    const trimmed = identifier.trim().toLowerCase();
    const found = users.find(
      (u) =>
        u.email.toLowerCase() === trimmed ||
        u.membershipId.toLowerCase() === trimmed
    );

    if (!found) {
      return { success: false, error: 'No membership found matching that Email or Membership ID.' };
    }

    if (password && found.password && found.password !== password) {
      return { success: false, error: 'Incorrect password. Please verify and try again.' };
    }

    setCurrentUser(found);
    setIsAuthModalOpen(false);
    addToast('Welcome back', `Signed in as ${found.fullName} (${found.membershipId})`, 'success');
    return { success: true };
  };

  const register = (userData: {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    preferredBranch: string;
  }) => {
    const trimmedEmail = userData.email.trim().toLowerCase();
    const exists = users.some((u) => u.email.toLowerCase() === trimmedEmail);
    if (exists) {
      return { success: false, error: 'An account with this email address already exists.' };
    }

    const uniqueNum = Math.floor(1000 + Math.random() * 9000);
    const membershipId = `LIB-2026-${uniqueNum}`;
    const avatarColors = [
      'bg-amber-700',
      'bg-emerald-700',
      'bg-indigo-700',
      'bg-stone-700',
      'bg-teal-700',
      'bg-rose-700',
    ];
    const avatarBg = avatarColors[Math.floor(Math.random() * avatarColors.length)];

    const newUser: User = {
      id: `user-${Date.now()}`,
      membershipId,
      fullName: userData.fullName.trim(),
      email: trimmedEmail,
      phone: userData.phone.trim(),
      password: userData.password,
      preferredBranch: userData.preferredBranch,
      joinedDate: '2026-10-08',
      avatarBg,
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setCurrentUser(newUser);
    setIsAuthModalOpen(false);
    addToast(
      'Library Card Issued',
      `Welcome to Athenaeum! Your Membership ID is ${membershipId}.`,
      'success'
    );
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
    addToast('Signed Out', 'You have been logged out of your session.', 'info');
  };

  const switchDemoUser = (membershipId: string) => {
    const user = users.find((u) => u.membershipId === membershipId);
    if (user) {
      setCurrentUser(user);
      addToast('Profile Switched', `Viewing as ${user.fullName} (${user.membershipId})`, 'info');
    }
  };

  // Cart Operations
  const addToCart = (book: Book) => {
    if (book.availableCopies <= 0) {
      addToast('Currently Unavailable', `All copies of "${book.title}" are presently on loan.`, 'warning');
      return { success: false, message: 'No copies available' };
    }

    const alreadyInCart = cart.some((item) => item.bookId === book.id);
    if (alreadyInCart) {
      addToast('Already in Borrow List', `"${book.title}" is already in your borrow list.`, 'info');
      return { success: false, message: 'Already in cart' };
    }

    if (cart.length >= 5) {
      addToast(
        'Borrow Limit Reached',
        'Public library policy limits active checkout transactions to 5 titles.',
        'warning'
      );
      return { success: false, message: 'Max 5 books per transaction' };
    }

    // Calculate due date (14 days from now)
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + (book.borrowPeriodDays || 14));
    const projectedDueDate = dueDate.toISOString().split('T')[0];

    const newItem: CartItem = {
      bookId: book.id,
      book,
      addedAt: new Date().toISOString(),
      projectedDueDate,
    };

    setCart((prev) => [...prev, newItem]);
    addToast('Added to Borrow List', `"${book.title}" added (${cart.length + 1}/5 slots used).`, 'success');
    return { success: true };
  };

  const removeFromCart = (bookId: string) => {
    setCart((prev) => prev.filter((item) => item.bookId !== bookId));
    addToast('Removed from List', 'Item removed from your borrowing list.', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Checkout Operation
  const checkoutCart = (pickupBranch: string) => {
    if (cart.length === 0) {
      return { success: false, error: 'Your borrow list is empty.' };
    }

    if (!currentUser) {
      openAuthModal('login');
      addToast('Membership Required', 'Please sign in or register to complete your book checkout.', 'warning');
      return { success: false, error: 'User not signed in' };
    }

    const todayStr = '2026-10-08';
    const dueDateObj = new Date('2026-10-08');
    dueDateObj.setDate(dueDateObj.getDate() + 14);
    const dueDateStr = dueDateObj.toISOString().split('T')[0];

    // Create borrow records
    const newRecords: BorrowRecord[] = cart.map((item, idx) => ({
      id: `rec-${Date.now()}-${idx}`,
      userId: currentUser.id,
      membershipId: currentUser.membershipId,
      bookId: item.book.id,
      bookTitle: item.book.title,
      bookAuthor: item.book.author,
      bookCategory: item.book.category,
      callNumber: item.book.callNumber,
      borrowDate: todayStr,
      dueDate: dueDateStr,
      status: 'active',
      renewalCount: 0,
      maxRenewals: 2,
      pickupBranch,
    }));

    // Update books inventory (decrement availableCopies)
    setBooks((prevBooks) =>
      prevBooks.map((b) => {
        const inCheckout = cart.some((item) => item.bookId === b.id);
        if (inCheckout) {
          return {
            ...b,
            availableCopies: Math.max(0, b.availableCopies - 1),
          };
        }
        return b;
      })
    );

    // Save borrow records
    setBorrowRecords((prev) => [...newRecords, ...prev]);

    // Create receipt
    const receipt: CheckoutReceipt = {
      receiptId: `RCP-${Math.floor(100000 + Math.random() * 900000)}`,
      membershipId: currentUser.membershipId,
      userName: currentUser.fullName,
      branch: pickupBranch,
      timestamp: new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      items: cart.map((item) => ({
        bookId: item.book.id,
        title: item.book.title,
        author: item.book.author,
        callNumber: item.book.callNumber,
        dueDate: dueDateStr,
      })),
    };

    setRecentReceipt(receipt);
    setCart([]);
    setIsCartOpen(false);

    addToast(
      'Checkout Confirmed!',
      `Successfully borrowed ${receipt.items.length} book${receipt.items.length > 1 ? 's' : ''}. Due: ${dueDateStr}.`,
      'success'
    );

    return { success: true, receipt };
  };

  // Return Book
  const returnBook = (recordId: string) => {
    const record = borrowRecords.find((r) => r.id === recordId);
    if (!record) return;

    const todayStr = '2026-10-08';

    // Update record
    setBorrowRecords((prev) =>
      prev.map((r) => (r.id === recordId ? { ...r, status: 'returned', returnedDate: todayStr } : r))
    );

    // Increment book inventory
    setBooks((prev) =>
      prev.map((b) => (b.id === record.bookId ? { ...b, availableCopies: Math.min(b.totalCopies, b.availableCopies + 1) } : b))
    );

    addToast('Book Returned', `"${record.bookTitle}" has been checked back into the library collection.`, 'success');
  };

  // Renew Book
  const renewBook = (recordId: string) => {
    const record = borrowRecords.find((r) => r.id === recordId);
    if (!record) return { success: false, message: 'Record not found' };

    if (record.renewalCount >= record.maxRenewals) {
      addToast(
        'Renewal Limit Reached',
        `This item has reached its maximum of ${record.maxRenewals} permitted loan renewals.`,
        'warning'
      );
      return { success: false, message: 'Maximum renewals reached' };
    }

    const currentDueDate = new Date(record.dueDate);
    currentDueDate.setDate(currentDueDate.getDate() + 14);
    const newDueDateStr = currentDueDate.toISOString().split('T')[0];

    setBorrowRecords((prev) =>
      prev.map((r) =>
        r.id === recordId
          ? {
              ...r,
              dueDate: newDueDateStr,
              renewalCount: r.renewalCount + 1,
            }
          : r
      )
    );

    addToast(
      'Loan Renewed (+14 Days)',
      `New return due date for "${record.bookTitle}" is ${newDueDateStr}.`,
      'success'
    );

    return { success: true };
  };

  return (
    <LibraryContext.Provider
      value={{
        currentUser,
        users,
        books,
        borrowRecords,
        cart,
        recentReceipt,
        branches: LIBRARY_BRANCHES,
        activeTab,
        isCartOpen,
        isAuthModalOpen,
        authModalTab,
        selectedBookForModal,
        toasts,
        searchQuery,
        selectedCategory,
        availabilityFilter,
        sortBy,
        setActiveTab,
        setIsCartOpen,
        openAuthModal,
        closeAuthModal,
        setSelectedBookForModal,
        setSearchQuery,
        setSelectedCategory,
        setAvailabilityFilter,
        setSortBy,
        setRecentReceipt,
        login,
        register,
        logout,
        switchDemoUser,
        addToCart,
        removeFromCart,
        clearCart,
        checkoutCart,
        returnBook,
        renewBook,
        addToast,
        removeToast,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = (): LibraryContextType => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};
