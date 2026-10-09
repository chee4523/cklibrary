/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { LibraryProvider, useLibrary } from './context/LibraryContext';
import { Navbar } from './components/Navbar';
import { CatalogView } from './components/CatalogView';
import { UserProfileView } from './components/UserProfileView';
import { BranchesView } from './components/BranchesView';
import { RulesView } from './components/RulesView';
import { BookDetailModal } from './components/BookDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutReceiptModal } from './components/CheckoutReceiptModal';
import { AuthModal } from './components/AuthModal';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/Footer';

const LibraryAppContent: React.FC = () => {
  const { activeTab } = useLibrary();

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      <Navbar />

      <main className="flex-1">
        {activeTab === 'catalog' && <CatalogView />}
        {activeTab === 'profile' && <UserProfileView />}
        {activeTab === 'branches' && <BranchesView />}
        {activeTab === 'rules' && <RulesView />}
      </main>

      <Footer />

      {/* Global Modals & Drawers */}
      <BookDetailModal />
      <CartDrawer />
      <CheckoutReceiptModal />
      <AuthModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <LibraryProvider>
      <LibraryAppContent />
    </LibraryProvider>
  );
}
