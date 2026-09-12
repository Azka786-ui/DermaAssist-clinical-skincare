import React from 'react';
import { QuickSearchBar } from '../components/QuickSearchBar';
import { SkinConcernExplorer } from '../components/SkinConcernExplorer';
import { ClinicalProducts } from '../components/ClinicalProducts';
import { Footer } from '../components/Footer';
import { SkinConcern } from '../types';

interface SkinConcernsPageProps {
  onSelectConcern: (concern: SkinConcern) => void;
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const SkinConcernsPage: React.FC<SkinConcernsPageProps> = ({
  onSelectConcern,
  onNavigate,
  onOpenBooking,
}) => {
  return (
    <div className="flex flex-col min-h-screen w-full max-w-full">
      {/* Top spacing ensuring the search bar sits gracefully below the fixed floating Navbar */}
      <div className="pt-24 sm:pt-36 flex-grow w-full max-w-full">
        {/* 1. Docked Quick Search Bar & Quick Concerns */}
        <QuickSearchBar onSelectConcern={onSelectConcern} />

        {/* 2. Clinical Dermatology Compendium, Categories, and Concern Cards */}
        <SkinConcernExplorer onSelectConcern={onSelectConcern} />

        {/* 3. Recommended Care Skincare Product System */}
        <ClinicalProducts onOpenBooking={onOpenBooking} />
      </div>

      {/* Clinical Healthcare Footer */}
      <Footer
        onNavigate={onNavigate}
        onOpenBooking={onOpenBooking}
      />
    </div>
  );
};

export default SkinConcernsPage;
