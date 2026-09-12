import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Stethoscope } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface HeroSectionProps {
  onExploreConcerns: () => void;
  onConsultDermatologist: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreConcerns,
  onConsultDermatologist,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      className={`relative min-h-[90vh] lg:min-h-screen w-full flex flex-col justify-center overflow-hidden select-none pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 transition-colors duration-500 ${
        isDark ? 'bg-derma-dark text-white' : 'bg-[#FAF7F2] text-[#111817]'
      }`}
      aria-label="DermaAssist Hero"
    >
      {/* ── FULL-WIDTH BACKGROUND IMAGE VISUAL ─────────────────── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/hero.png"
          alt="DermaAssist Clinical Skincare"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center right' }}
          loading="eager"
        />

        {/* ── LEFT-SIDE SUBTLE CREAM READABILITY GRADIENT ─────────── */}
        {isDark ? (
          <>
            {/* Dark mode soft atmospheric framing */}
            <div
              className="absolute inset-0 z-10 pointer-events-none hidden lg:block"
              style={{
                background:
                  'linear-gradient(to right, rgba(10, 14, 18, 0.94) 0%, rgba(10, 14, 18, 0.78) 36%, rgba(10, 14, 18, 0.4) 52%, transparent 68%)',
              }}
            />
            <div
              className="absolute inset-0 z-10 pointer-events-none lg:hidden"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(10, 14, 18, 0.9) 0%, rgba(10, 14, 18, 0.75) 60%, rgba(10, 14, 18, 0.5) 100%)',
              }}
            />
          </>
        ) : (
          <>
            {/* Light mode: pure warm cream gradient disappearing before woman's face */}
            <div
              className="absolute inset-0 z-10 pointer-events-none hidden lg:block"
              style={{
                background:
                  'linear-gradient(to right, rgba(248, 244, 236, 0.95) 0%, rgba(248, 244, 236, 0.88) 32%, rgba(248, 244, 236, 0.45) 50%, transparent 66%)',
              }}
            />
            <div
              className="absolute inset-0 z-10 pointer-events-none lg:hidden"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(248, 244, 236, 0.92) 0%, rgba(248, 244, 236, 0.75) 65%, rgba(248, 244, 236, 0.4) 100%)',
              }}
            />
          </>
        )}
      </div>

      {/* ── FOREGROUND CONTENT: ANCHORED ON THE LEFT ───────────── */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full my-auto flex items-center">
        {/* Desktop Content Width: 42–46% */}
        <div className="w-full lg:w-[46%] xl:w-[44%]">

          {/* Eyebrow Label */}
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-[0.2em] uppercase mb-5 sm:mb-6 transition-all duration-700 ${
              isDark
                ? 'bg-white/8 border border-white/15 text-derma-cream'
                : 'bg-[#EFEAE1]/90 border border-[#DDD3BF] text-[#2B3830]'
            } ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-derma-gold animate-pulse" />
            <Sparkles className="w-3 h-3 text-derma-gold" />
            <span>ABOUT DERMAASSIST</span>
          </div>

          {/* Main Headline: Editorial Serif Typography */}
          <h1
            className={`text-[1.85rem] min-[380px]:text-3xl sm:text-4xl md:text-5xl lg:text-[3.85rem] xl:text-[4.4rem] font-serif font-light tracking-[-0.015em] leading-[1.14] sm:leading-[1.12] mb-5 sm:mb-6 transition-all duration-1000 delay-200 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <span
              className={`block font-normal ${
                isDark ? 'text-white' : 'text-[#111817]'
              }`}
            >
              More Than Skin Care.
            </span>
            <span
              className={`block italic font-normal mt-1 sm:mt-2 ${
                isDark ? 'text-derma-gold-light' : 'text-[#9F8055]'
              }`}
            >
              A Healthier You.
            </span>
          </h1>

          {/* Supporting Paragraph */}
          <p
            className={`text-sm sm:text-base md:text-[17px] font-sans font-normal leading-[1.75] max-w-[540px] mb-5 sm:mb-6 transition-all duration-1000 delay-300 ${
              isDark ? 'text-white/75' : 'text-[#46544D]'
            } ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          >
            At DermaAssist, we believe healthy skin can change how you feel, how you live, and how you show up in the world. We combine medical expertise, advanced technology, and personalized care to help you achieve healthier, more confident skin.
          </p>

          {/* Supporting Trust Line */}
          <div
            className={`flex items-center flex-wrap gap-y-1.5 gap-x-2 text-xs sm:text-[13px] font-medium tracking-wide mb-8 sm:mb-10 transition-all duration-1000 delay-400 ${
              isDark ? 'text-white/65' : 'text-[#5C6C63]'
            } ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <span>Science-Backed Care</span>
            <span className="text-derma-gold select-none mx-0.5 sm:mx-1">•</span>
            <span>Personalized Treatment</span>
            <span className="text-derma-gold select-none mx-0.5 sm:mx-1">•</span>
            <span>Board-Certified Expertise</span>
          </div>

          {/* ── EXISTING HERO CTA BUTTONS (UNCHANGED) ──────────── */}
          <div
            className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-5 transition-all duration-1000 delay-500 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {/* Primary CTA */}
            <button
              onClick={onExploreConcerns}
              className="btn-shimmer-sweep group relative inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-[13px] sm:py-[14px] rounded-full text-xs min-[360px]:text-sm sm:text-[15px] font-semibold tracking-wide text-white bg-gradient-to-r from-derma-sage via-derma-sage-light to-derma-sage border border-derma-gold/45 shadow-[0_0_28px_rgba(45,84,75,0.45)] hover:shadow-[0_0_36px_rgba(198,168,125,0.5)] hover:scale-[1.025] active:scale-[0.975] transition-all duration-300 cursor-pointer"
            >
              <span>Explore Skin Concerns</span>
              <ArrowRight className="w-4 h-4 text-derma-gold/90 transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>

            {/* Secondary CTA */}
            <button
              onClick={onConsultDermatologist}
              className={`group inline-flex items-center justify-center gap-2.5 sm:gap-3 px-5 sm:px-7 py-[13px] sm:py-[14px] rounded-full text-xs min-[360px]:text-sm sm:text-[15px] font-medium backdrop-blur-md transition-all duration-300 hover:scale-[1.025] active:scale-[0.975] cursor-pointer ${
                isDark
                  ? 'text-white/85 bg-white/[0.08] hover:bg-white/[0.13] border border-white/18 hover:border-white/35 hover:text-white'
                  : 'text-[#111817] bg-white/80 hover:bg-white border border-[#DDD3BF] hover:border-derma-sage shadow-sm'
              }`}
            >
              <Stethoscope className="w-4 h-4 text-derma-gold transition-transform duration-300 group-hover:scale-110" />
              <span>Consult a Dermatologist</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
