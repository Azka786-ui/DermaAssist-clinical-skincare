import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, ChevronLeft, ChevronRight, Award, GraduationCap, MapPin, Star } from 'lucide-react';
import { DERMATOLOGISTS } from '../data/doctors';
import { Doctor } from '../types';
import { useTheme } from '../context/ThemeContext';

interface CertifiedDoctorsSectionProps {
  onBookDoctor?: (doctor: Doctor) => void;
  onOpenBooking: () => void;
}

export const CertifiedDoctorsSection: React.FC<CertifiedDoctorsSectionProps> = ({
  onOpenBooking,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? DERMATOLOGISTS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === DERMATOLOGISTS.length - 1 ? 0 : prev + 1));
  };

  const stats = [
    { value: '15+', label: 'Certified Dermatologists' },
    { value: '10K+', label: 'Happy Patients' },
    { value: '98%', label: 'Satisfaction Rate' },
    { value: '12+', label: 'Years of Trusted Care' },
  ];

  return (
    <section
      id="doctors"
      className={`py-20 sm:py-28 relative overflow-hidden transition-colors duration-400 ${
        isDark
          ? 'bg-[#0B1210] text-white border-t border-white/10'
          : 'bg-[#FAF7F2] text-[#111817] border-t border-[#EAE2D2]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-[0.2em] uppercase mb-4 transition-colors ${
                isDark
                  ? 'bg-white/5 border border-white/10 text-derma-gold'
                  : 'bg-[#EAE2D2] border border-[#DDD3BF] text-derma-sage-dark'
              }`}
            >
              <Award className={`w-3.5 h-3.5 ${isDark ? 'text-derma-gold' : 'text-[#7E6947]'}`} />
              <span>CERTIFIED DOCTORS</span>
            </div>

            <h2
              className={`text-2xl min-[360px]:text-3xl sm:text-5xl font-light tracking-tight leading-[1.15] mb-4 transition-colors ${
                isDark ? 'text-white' : 'text-[#111817]'
              }`}
            >
              Meet Our <br />
              <span
                className={`font-serif italic font-normal ${
                  isDark ? 'text-derma-gold-light' : 'text-derma-sage-dark'
                }`}
              >
                Certified Dermatologists
              </span>
            </h2>

            <p
              className={`text-sm sm:text-base leading-relaxed transition-colors ${
                isDark ? 'text-white/70' : 'text-[#46544D]'
              }`}
            >
              Our board-certified dermatologists bring years of experience, medical expertise, and a passion for healthier skin. You&apos;re in trusted hands with our team.
            </p>
          </div>

          {/* Controls for carousel on tablet/mobile */}
          <div className="flex items-center gap-3">
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={handlePrev}
                className={`p-2.5 rounded-full shadow-sm active:scale-95 transition-all ${
                  isDark
                    ? 'bg-white/10 border border-white/15 text-white hover:border-derma-gold/50'
                    : 'bg-white border border-[#DDD3BF] hover:border-derma-sage text-[#111817]'
                }`}
                aria-label="Previous Doctor"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className={`p-2.5 rounded-full shadow-sm active:scale-95 transition-all ${
                  isDark
                    ? 'bg-white/10 border border-white/15 text-white hover:border-derma-gold/50'
                    : 'bg-white border border-[#DDD3BF] hover:border-derma-sage text-[#111817]'
                }`}
                aria-label="Next Doctor"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onOpenBooking}
              className={`group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold transition-colors border-b pb-0.5 ${
                isDark
                  ? 'text-derma-gold hover:text-white border-derma-gold'
                  : 'text-derma-sage-dark hover:text-derma-sage border-derma-sage-dark'
              }`}
            >
              <span>VIEW ALL DOCTORS</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* ── 4-CARD DESKTOP GRID / RESPONSIVE CAROUSEL ─────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {DERMATOLOGISTS.map((doc) => (
            <div
              key={doc.id}
              className={`group rounded-3xl p-5 transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between ${
                isDark
                  ? 'bg-[#151D1E] border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.7)] hover:border-derma-gold/60 text-white'
                  : 'bg-white border border-[#E5DEC9] shadow-[0_10px_30px_rgba(30,40,35,0.06)] hover:shadow-[0_20px_40px_rgba(45,84,75,0.14)] hover:border-derma-gold/70 text-[#111817]'
              }`}
            >
              <div>
                {/* Doctor Portrait with Verification Badge */}
                <div
                  className={`relative aspect-[4/4.4] rounded-2xl overflow-hidden mb-5 shadow-sm transition-colors ${
                    isDark ? 'bg-black/40' : 'bg-[#EAE2D2]'
                  }`}
                >
                  <img
                    src={doc.avatar}
                    alt={doc.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes('hero-3.jpg')) {
                        target.src = '/images/hero-3.jpg';
                      }
                    }}
                  />
                  {/* Gold Board-Certification Badge */}
                  <div
                    className={`absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full backdrop-blur-md shadow-md text-[11px] font-semibold transition-colors ${
                      isDark
                        ? 'bg-black/70 border border-derma-gold/40 text-derma-cream'
                        : 'bg-white/95 border border-derma-gold/50 text-derma-sage-dark'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-derma-gold fill-derma-gold/20" />
                    <span>FAAD Certified</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md text-white flex items-center justify-between text-xs">
                    <span className="text-[11px] text-derma-cream font-medium">Rating {doc.rating}</span>
                    <div className="flex items-center text-derma-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-2.5 h-2.5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Doctor Name & Credentials */}
                <h3
                  className={`text-lg font-bold transition-colors mb-1 ${
                    isDark ? 'text-white group-hover:text-derma-gold' : 'text-[#111817] group-hover:text-derma-sage-dark'
                  }`}
                >
                  {doc.name}
                </h3>

                <p
                  className={`text-xs font-semibold uppercase tracking-wider mb-2 transition-colors ${
                    isDark ? 'text-derma-gold-light' : 'text-derma-sage'
                  }`}
                >
                  {doc.title}
                </p>

                {/* Institution & Medical School */}
                <div
                  className={`flex items-center gap-1.5 text-xs mb-3 transition-colors ${
                    isDark ? 'text-white/60' : 'text-[#5C6C63]'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5 text-derma-gold flex-shrink-0" />
                  <span className="line-clamp-1">{doc.credentials}</span>
                </div>

                {/* Specialty */}
                <div
                  className={`p-2.5 rounded-xl border mb-4 transition-colors ${
                    isDark
                      ? 'bg-white/5 border-white/10'
                      : 'bg-[#F6F2EA] border-[#EAE2D2]'
                  }`}
                >
                  <span
                    className={`text-[10.5px] uppercase font-bold tracking-wide block mb-0.5 transition-colors ${
                      isDark ? 'text-derma-gold' : 'text-[#7E6947]'
                    }`}
                  >
                    Focus Specialty:
                  </span>
                  <p
                    className={`text-xs font-medium leading-snug line-clamp-2 transition-colors ${
                      isDark ? 'text-white/85' : 'text-[#2B3830]'
                    }`}
                  >
                    {doc.specialty}
                  </p>
                </div>

                {/* Location */}
                <div
                  className={`flex items-center gap-1.5 text-[11px] pt-1 transition-colors ${
                    isDark ? 'text-white/60' : 'text-[#718278]'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 text-derma-gold flex-shrink-0" />
                  <span>{doc.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── TRUST STATISTICS STRIP ────────────────────────────────── */}
        <div
          className={`mt-16 sm:mt-20 pt-12 border-t transition-colors ${
            isDark ? 'border-white/10' : 'border-[#E5DEC9]'
          }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
            {stats.map((item) => (
              <div
                key={item.label}
                className={`p-3.5 sm:p-6 rounded-2xl border text-center transition-all duration-400 ${
                  isDark
                    ? 'bg-[#151D1E] border-white/10 shadow-sm'
                    : 'bg-white border-[#E5DEC9] shadow-sm'
                }`}
              >
                <div
                  className={`text-2xl min-[360px]:text-3xl sm:text-4xl font-light tracking-tight font-serif mb-1 transition-colors ${
                    isDark ? 'text-derma-gold-light' : 'text-[#111817]'
                  }`}
                >
                  {item.value}
                </div>
                <div
                  className={`text-[11px] min-[360px]:text-xs sm:text-sm font-medium tracking-wide transition-colors ${
                    isDark ? 'text-white/70' : 'text-[#526058]'
                  }`}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default CertifiedDoctorsSection;
