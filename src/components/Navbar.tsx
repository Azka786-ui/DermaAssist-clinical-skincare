import React, { useState, useEffect } from 'react';
import { Calendar, Menu, X, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  currentPath?: string;
  onOpenBooking: () => void;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath = '/',
  onOpenBooking,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const isHomepage = currentPath === '/' || currentPath === '';
  const isSkinConcerns = currentPath.startsWith('/skin-concerns');
  const isProducts = currentPath.startsWith('/products');
  const isInternalPage = isSkinConcerns || isProducts;

  const homepageLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about' },
    { name: 'Certified Doctors', href: '#doctors' },
  ];

  const internalNavLinks = [
    { name: 'Home', href: '/' },
    { name: 'Skin Concerns', href: '/skin-concerns' },
    { name: 'Products', href: '/products' },
    { name: 'Appointments', href: '#appointments' },
  ];

  // Mobile menu strictly contains Home, Skin Concerns, Products, Appointments (never Certified Doctors or About)
  const mobileNavLinks = internalNavLinks;

  const navLinks = isInternalPage ? internalNavLinks : homepageLinks;

  const handleLinkClick = (link: { name: string; href: string }) => {
    setMobileMenuOpen(false);
    if (link.name === 'Appointments' || link.href === '#appointments') {
      onOpenBooking();
    } else if (link.href === '/' || link.name === 'Home') {
      onNavigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link.href === '/skin-concerns' || link.name === 'Skin Concerns') {
      onNavigate('/skin-concerns');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link.href === '/products' || link.name === 'Products') {
      onNavigate('/products');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link.name === 'About' || link.href === '#about') {
      if (!isHomepage) {
        onNavigate('/');
        setTimeout(() => {
          const el = document.getElementById('about');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById('about');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (link.name === 'Certified Doctors' || link.href === '#doctors') {
      if (!isHomepage) {
        onNavigate('/');
        setTimeout(() => {
          const el = document.getElementById('doctors');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const el = document.getElementById('doctors');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 box-border ${
        isDark
          ? isScrolled
            ? 'bg-derma-dark/85 backdrop-blur-md border-b border-white/10 py-3 sm:py-3.5 shadow-2xl text-white'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-3.5 sm:py-5 text-white'
          : isScrolled
          ? 'bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E5DEC9] py-3 sm:py-3.5 shadow-sm text-[#111817]'
          : 'bg-gradient-to-b from-[#FAF7F2]/95 via-[#FAF7F2]/75 to-transparent py-3.5 sm:py-5 text-[#111817]'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 box-border">
        <div className="flex items-center justify-between w-full">
          
          {/* Brand Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              onNavigate('/');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 sm:gap-3 group focus:outline-none min-w-0 flex-shrink"
            aria-label="DermaAssist Home"
          >
            {/* Favicon Logo Icon */}
            <img
              src="/Favicon.png"
              alt="DermaAssist Emblem"
              className="w-7 h-7 min-[360px]:w-8 min-[360px]:h-8 sm:w-11 sm:h-11 md:w-12 md:h-12 object-contain select-none transition-transform duration-300 group-hover:scale-105 flex-shrink-0"
            />

            <div className="flex flex-col min-w-0">
              <span
                className={`font-display tracking-[0.14em] sm:tracking-[0.22em] text-sm min-[360px]:text-base sm:text-lg md:text-xl font-semibold transition-colors duration-300 truncate ${
                  isDark ? 'text-white group-hover:text-derma-gold' : 'text-[#111817] group-hover:text-derma-sage-dark'
                }`}
              >
                DERMA<span className="text-derma-gold">ASSIST</span>
              </span>
              <span
                className={`text-[7.5px] min-[360px]:text-[8.5px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] uppercase font-medium -mt-0.5 sm:-mt-1 transition-colors truncate ${
                  isDark ? 'text-derma-muted' : 'text-[#5C6C63]'
                }`}
              >
                Clinical Skincare
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive =
                (link.href === '/' && isHomepage) ||
                (link.href === '/skin-concerns' && isSkinConcerns) ||
                (link.href === '/products' && isProducts);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link);
                  }}
                  className={`text-sm font-medium transition-colors duration-200 tracking-wide relative py-1 group ${
                    isActive
                      ? 'text-derma-gold font-semibold'
                      : isDark
                      ? 'text-white/80 hover:text-white'
                      : 'text-[#2B3830] hover:text-[#111817]'
                  }`}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-derma-gold transition-all duration-300 group-hover:w-full ${
                      isActive ? 'w-full' : 'w-0'
                    }`}
                  ></span>
                </a>
              );
            })}
          </nav>

          {/* Right Action Group */}
          <div className="hidden md:flex items-center gap-3.5 sm:gap-4">
            {/* Elegant Theme Toggle Button */}
            <ThemeToggle />

            {/* Book Appointment CTA */}
            <button
              onClick={onOpenBooking}
              className="btn-shimmer-sweep group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-derma-sage via-derma-sage-light to-derma-sage shadow-[0_0_20px_rgba(45,84,75,0.4)] hover:shadow-[0_0_25px_rgba(198,168,125,0.45)] border border-derma-gold/30 hover:border-derma-gold transition-all duration-300 active:scale-95"
            >
              <Calendar className="w-4 h-4 text-derma-gold transition-transform group-hover:scale-110" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Actions: ThemeToggle + Menu Toggle Button */}
          <div className="md:hidden flex items-center gap-1.5 min-[360px]:gap-2 flex-shrink-0">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-1.5 min-[360px]:p-2 rounded-lg focus:outline-none transition-colors ${
                isDark
                  ? 'text-white/80 hover:text-white hover:bg-white/10'
                  : 'text-[#111817] hover:bg-black/5'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 min-[360px]:w-6 min-[360px]:h-6" /> : <Menu className="w-5 h-5 min-[360px]:w-6 min-[360px]:h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden border-t px-4 min-[380px]:px-5 pt-3.5 pb-6 mt-2 animate-fadeInUp w-full box-border ${
            isDark
              ? 'glass-panel border-white/10 text-white'
              : 'bg-[#FAF7F2] border-[#E5DEC9] shadow-xl text-[#111817]'
          }`}
        >
          <div className="flex flex-col gap-2.5">
            {mobileNavLinks.map((link) => {
              const isActive =
                (link.href === '/' && isHomepage) ||
                (link.href === '/skin-concerns' && isSkinConcerns) ||
                (link.href === '/products' && isProducts);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link);
                  }}
                  className={`flex items-center justify-between text-base font-medium py-2 border-b transition-colors ${
                    isDark ? 'border-white/5' : 'border-[#E5DEC9]/60'
                  } ${
                    isActive
                      ? 'text-derma-gold font-semibold'
                      : isDark
                      ? 'text-white/90 hover:text-derma-gold'
                      : 'text-[#2B3830] hover:text-[#111817]'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-derma-gold' : 'text-derma-muted'}`} />
                </a>
              );
            })}

            {/* Theme Toggle row in mobile drawer */}
            <div
              className={`flex items-center justify-between py-2 border-b transition-colors ${
                isDark ? 'border-white/5' : 'border-[#E5DEC9]/60'
              }`}
            >
              <span className={`text-sm font-medium ${isDark ? 'text-white/80' : 'text-[#2B3830]'}`}>
                Theme Mode
              </span>
              <ThemeToggle />
            </div>
            
            <div className="pt-2 flex flex-col">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full btn-shimmer-sweep flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-derma-sage to-derma-sage-light border border-derma-gold/40 shadow-lg active:scale-95"
              >
                <Calendar className="w-4 h-4 text-derma-gold" />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
