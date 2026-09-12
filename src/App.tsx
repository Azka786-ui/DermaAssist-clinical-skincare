import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SkinConcernsShowcase } from './components/SkinConcernsShowcase';
import { ExpertCareSection } from './components/ExpertCareSection';
import { CertifiedDoctorsSection } from './components/CertifiedDoctorsSection';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { SkinConcernModal } from './components/SkinConcernModal';
import { BookingModal } from './components/BookingModal';
import { SkinConcernsPage } from './pages/SkinConcernsPage';
import { ProductsPage } from './pages/ProductsPage';
import { SkinConcern, Doctor } from './types';

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/';
  });

  const [selectedConcern, setSelectedConcern] = useState<SkinConcern | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [preselectedDoctor, setPreselectedDoctor] = useState<Doctor | null>(null);
  const [preselectedConcernName, setPreselectedConcernName] = useState<string>('');

  // Synchronize route on browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (to: string) => {
    if (window.location.pathname !== to) {
      window.history.pushState({}, '', to);
    }
    setCurrentPath(to);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleOpenBooking = (doctor?: Doctor | null, concernName?: string) => {
    setPreselectedDoctor(doctor || null);
    setPreselectedConcernName(concernName || '');
    setBookingModalOpen(true);
  };

  const isSkinConcernsPage = currentPath.startsWith('/skin-concerns');
  const isProductsPage = currentPath.startsWith('/products');

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#111817] dark:bg-derma-dark dark:text-derma-light selection:bg-derma-sage selection:text-white flex flex-col font-sans transition-colors duration-400 w-full max-w-full">
      {/* ── GLOBAL NAVBAR ────────────────────────────────────────── */}
      {/* Sticky while scrolling; dynamically switches between Homepage minimal and Internal full navbar */}
      <Navbar
        currentPath={currentPath}
        onOpenBooking={() => handleOpenBooking()}
        onNavigate={handleNavigate}
      />

      {/* ── ROUTE CONTENT ────────────────────────────────────────── */}
      {isProductsPage ? (
        /* Dedicated Recommended Care / Skincare Catalog */
        <ProductsPage
          currentPath={currentPath}
          onNavigate={handleNavigate}
          onOpenBooking={() => handleOpenBooking()}
        />
      ) : isSkinConcernsPage ? (
        /* Internal Page: Dedicated Skin Concerns Discovery System */
        <SkinConcernsPage
          onSelectConcern={(concern) => setSelectedConcern(concern)}
          onNavigate={handleNavigate}
          onOpenBooking={() => handleOpenBooking()}
        />
      ) : (
        /* Homepage: Exact 5-Section Sequential Architecture + Footer */
        <main className="flex-grow w-full max-w-full">
          {/* SECTION 1: EXISTING HERO SECTION (UNTOUCHED) */}
          <HeroSection
            onExploreConcerns={() => handleNavigate('/skin-concerns')}
            onConsultDermatologist={() => handleOpenBooking()}
          />

          {/* SECTION 2: COMMON SKIN CONCERNS (DARK DEEP-GREEN/CHARCOAL SHOWCASE WITH SMOOTH TICKER) */}
          <SkinConcernsShowcase
            onExploreConcerns={() => handleNavigate('/skin-concerns')}
            onOpenBooking={() => handleOpenBooking()}
          />

          {/* SECTION 3: EXPERT CARE IN ACTION (LIGHT CREAM/BEIGE CLINICAL VIDEO PANEL) */}
          <ExpertCareSection
            onOpenBooking={() => handleOpenBooking()}
          />

          {/* SECTION 4: CERTIFIED DOCTORS (4-CARD GRID OF BOARD-CERTIFIED PHYSICIANS + TRUST STATS) */}
          <CertifiedDoctorsSection
            onBookDoctor={(doc) => handleOpenBooking(doc)}
            onOpenBooking={() => handleOpenBooking()}
          />

          {/* SECTION 5: ABOUT SECTION (MUST BE THE FINAL MAJOR CONTENT SECTION) */}
          <AboutSection
            onOpenBooking={() => handleOpenBooking()}
          />

          {/* FOOTER: SOPHISTICATED CLINICAL HEALTHCARE FOOTER */}
          <Footer
            onNavigate={handleNavigate}
            onOpenBooking={() => handleOpenBooking()}
          />
        </main>
      )}

      {/* ── SHARED CLINICAL MODALS ───────────────────────────────── */}
      {/* Detailed Skin Concern Clinical Protocol Modal */}
      <SkinConcernModal
        concern={selectedConcern}
        onClose={() => setSelectedConcern(null)}
        onConsultDermatologist={(concernName) => handleOpenBooking(null, concernName)}
      />

      {/* Interactive Consultation Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => {
          setBookingModalOpen(false);
          setPreselectedDoctor(null);
          setPreselectedConcernName('');
        }}
        preselectedDoctor={preselectedDoctor}
        preselectedConcernName={preselectedConcernName}
      />
    </div>
  );
}

export default App;
