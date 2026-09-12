import React, { useState } from 'react';
import { Mail, Check, ShieldCheck, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface FooterProps {
  onNavigateToSection?: (sectionId: string) => void;
  onNavigate?: (path: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateToSection,
  onNavigate,
  onOpenBooking,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');
  const [policyModal, setPolicyModal] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const handleNav = (target: string) => {
    if (target === 'home') {
      if (onNavigate) onNavigate('/');
      else if (onNavigateToSection) onNavigateToSection('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'concerns') {
      if (onNavigate) onNavigate('/skin-concerns');
      else if (onNavigateToSection) onNavigateToSection('concerns');
    } else if (target === 'products') {
      if (onNavigate) onNavigate('/products');
    } else if (target === 'about') {
      if (onNavigateToSection) {
        onNavigateToSection('about');
      } else if (onNavigate) {
        onNavigate('/');
        setTimeout(() => {
          const el = document.getElementById('about');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (target === 'doctors') {
      if (onNavigateToSection) {
        onNavigateToSection('doctors');
      } else if (onNavigate) {
        onNavigate('/');
        setTimeout(() => {
          const el = document.getElementById('doctors');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (target === 'appointments') {
      onOpenBooking();
    }
  };

  return (
    <footer
      className={`pt-16 pb-12 w-full max-w-full overflow-hidden transition-colors duration-400 ${
        isDark
          ? 'bg-[#0b1210] border-t border-white/10 text-white'
          : 'bg-[#EFEAE1] border-t border-[#DDD3BF] text-[#111817]'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 box-border">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b transition-colors ${
            isDark ? 'border-white/10' : 'border-[#DDD3BF]'
          }`}
        >
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/Favicon.png"
                alt="DermaAssist Emblem"
                className="w-8 h-8 object-contain select-none flex-shrink-0"
              />
              <div className="flex flex-col">
                <span
                  className={`font-display tracking-[0.2em] text-lg font-bold transition-colors ${
                    isDark ? 'text-white' : 'text-[#111817]'
                  }`}
                >
                  DERMA<span className="text-derma-gold">ASSIST</span>
                </span>
                <span
                  className={`text-[9.5px] tracking-[0.28em] uppercase font-medium -mt-0.5 transition-colors ${
                    isDark ? 'text-derma-muted' : 'text-[#5C6C63]'
                  }`}
                >
                  CLINICAL SKINCARE
                </span>
              </div>
            </div>

            <p
              className={`text-xs sm:text-sm leading-relaxed max-w-sm transition-colors ${
                isDark ? 'text-derma-muted' : 'text-[#46544D]'
              }`}
            >
              The premier clinical dermatology and personalized skin health platform. Uniting medical science, cellular barrier diagnostics, and board-certified physician care.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="btn-shimmer-sweep inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-derma-sage hover:bg-derma-sage-light border border-derma-gold/40 shadow-sm"
              >
                <span>Book a Medical Consultation</span>
                <ArrowRight className="w-3.5 h-3.5 text-derma-gold" />
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4
              className={`text-xs font-bold uppercase tracking-wider mb-4 transition-colors ${
                isDark ? 'text-derma-gold' : 'text-[#7E6947]'
              }`}
            >
              Navigation
            </h4>
            <ul
              className={`space-y-2.5 text-xs transition-colors ${
                isDark ? 'text-white/60' : 'text-[#5C6C63]'
              }`}
            >
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-[#111817]'}`}
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-[#111817]'}`}
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('doctors')}
                  className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-[#111817]'}`}
                >
                  Certified Doctors
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('concerns')}
                  className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-[#111817]'}`}
                >
                  Skin Concerns
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('products')}
                  className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-[#111817]'}`}
                >
                  Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('appointments')}
                  className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-[#111817]'}`}
                >
                  Appointments
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div>
            <h4
              className={`text-xs font-bold uppercase tracking-wider mb-4 transition-colors ${
                isDark ? 'text-derma-gold' : 'text-[#7E6947]'
              }`}
            >
              Legal & Support
            </h4>
            <ul
              className={`space-y-2.5 text-xs transition-colors ${
                isDark ? 'text-white/60' : 'text-[#5C6C63]'
              }`}
            >
              <li>
                <button
                  onClick={() => setPolicyModal('Privacy Policy')}
                  className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-[#111817]'}`}
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPolicyModal('Terms of Service')}
                  className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-[#111817]'}`}
                >
                  Terms
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPolicyModal('Contact Clinic')}
                  className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-[#111817]'}`}
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => setPolicyModal('HIPAA Compliance')}
                  className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-[#111817]'}`}
                >
                  HIPAA Security
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h4
              className={`text-xs font-bold uppercase tracking-wider mb-4 transition-colors ${
                isDark ? 'text-derma-gold' : 'text-[#7E6947]'
              }`}
            >
              Clinical Journal
            </h4>
            <p
              className={`text-xs mb-3 leading-relaxed transition-colors ${
                isDark ? 'text-white/70' : 'text-[#5C6C63]'
              }`}
            >
              Bi-weekly dermatology digests on active ingredients, clinical research, and skin barrier protocols.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter medical email"
                  className={`w-full px-3 py-2 rounded-lg text-xs transition-colors focus:outline-none ${
                    isDark
                      ? 'bg-white/5 border border-white/15 text-white placeholder-white/40 focus:border-derma-gold'
                      : 'bg-white border border-[#DDD3BF] text-[#111817] placeholder-[#8F9E96] focus:border-derma-sage'
                  }`}
                />
              </div>
              <button
                type="submit"
                className={`w-full py-2 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 ${
                  isDark
                    ? 'text-derma-dark bg-derma-gold hover:bg-derma-gold-light'
                    : 'text-white bg-derma-sage hover:bg-derma-sage-light'
                }`}
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Subscribed</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-3.5 h-3.5" />
                    <span>Subscribe to Journal</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Medical Healthcare Disclaimer */}
        <div
          className={`pt-8 pb-6 border-b text-[11px] leading-relaxed flex items-start gap-3 transition-colors ${
            isDark ? 'border-white/10 text-white/60' : 'border-[#DDD3BF] text-[#5C6C63]'
          }`}
        >
          <ShieldCheck className={`w-4 h-4 flex-shrink-0 mt-0.5 ${isDark ? 'text-derma-gold' : 'text-[#7E6947]'}`} />
          <p>
            <strong>Medical Disclaimer:</strong> The content provided on DermaAssist is for informational, diagnostic education, and consultation scheduling purposes only. It is not intended to substitute professional medical diagnosis or immediate emergency treatment. If you are experiencing sudden severe cutaneous reactions, blistering, or an acute emergency, please contact your local emergency services immediately.
          </p>
        </div>

        {/* Copyright and Locations */}
        <div
          className={`pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs transition-colors ${
            isDark ? 'text-white/50' : 'text-[#7E6947]'
          }`}
        >
          <div className="text-center sm:text-left">
            © {new Date().getFullYear()} DermaAssist Clinical Health, Inc. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-3 gap-y-1.5 text-[11px] text-center sm:text-right">
            <span>Clinics: Boston • San Francisco • Chicago • New York</span>
            <span className="hidden min-[480px]:inline">•</span>
            <span className={isDark ? 'text-white/60' : 'text-[#5C6C63]'}>HIPAA Compliant Telemedicine</span>
          </div>
        </div>
      </div>

      {/* Simple Policy / Contact Modal */}
      {policyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div
            className={`relative w-full max-w-lg rounded-2xl p-6 shadow-2xl transition-colors ${
              isDark
                ? 'bg-[#0E1319] border border-white/20 text-white'
                : 'bg-[#FAF7F2] border border-[#DDD3BF] text-[#111817]'
            }`}
          >
            <h3
              className={`text-lg font-bold mb-3 transition-colors ${
                isDark ? 'text-derma-gold' : 'text-[#7E6947]'
              }`}
            >
              {policyModal}
            </h3>
            <p
              className={`text-xs leading-relaxed mb-4 transition-colors ${
                isDark ? 'text-white/70' : 'text-[#46544D]'
              }`}
            >
              DermaAssist is fully compliant with US health data regulations and HIPAA security guidelines. Patient consultation records, barrier diagnostics, and telehealth notes are encrypted with AES-256 standards. For inquiries, contact clinical-support@dermaassist.health.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setPolicyModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-derma-sage text-white hover:bg-derma-sage-light"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
