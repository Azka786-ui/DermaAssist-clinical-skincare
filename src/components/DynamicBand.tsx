import React from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * DynamicBand — Premium opposing-motion section
 *
 * Row 1: Skin concern names scroll LEFT  (marquee-track--left)
 * Row 2: Skincare images scroll RIGHT    (marquee-track--right)
 *
 * Uses the same 3 hero images from public/images/.
 * Content is duplicated in each track to create a seamless infinite loop.
 */

const CONCERNS = [
  'ACNE',
  'BLACKHEADS',
  'DARK CIRCLES',
  'DRY SKIN',
  'OILY SKIN',
  'PIGMENTATION',
  'FACIAL HAIR',
  'UNEVEN SKIN TONE',
  'ROSACEA',
  'HYPERPIGMENTATION',
  'MELASMA',
  'ENLARGED PORES',
];

/** Dot separator between concern names */
const DOT = (
  <span className="mx-5 sm:mx-7 text-derma-gold/40 text-[10px] select-none" aria-hidden>
    ✦
  </span>
);

const HERO_IMAGES = [
  { src: '/images/hero-1.jpg', alt: 'Radiant skin — cellular health' },
  { src: '/images/hero-2.jpg', alt: 'Clinical dermatology formulations' },
  { src: '/images/hero-3.jpg', alt: 'Board-certified dermatologist' },
];

export const DynamicBand: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Duplicate items twice for a seamless loop
  const doubleConcerns = [...CONCERNS, ...CONCERNS];
  const doubleImages = [...HERO_IMAGES, ...HERO_IMAGES, ...HERO_IMAGES, ...HERO_IMAGES];

  return (
    <div
      className={`relative border-y py-12 sm:py-16 overflow-hidden transition-colors duration-400 ${
        isDark ? 'bg-derma-dark border-white/[0.05]' : 'bg-[#FAF7F2] border-[#DDD3BF]'
      }`}
    >
      {/* Ambient sage glow — very subtle depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(45,84,75,0.07) 0%, transparent 75%)'
            : 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(226,214,195,0.4) 0%, transparent 75%)',
        }}
      />

      {/* ── ROW 1: Concern names → scroll LEFT ───────────────── */}
      <div className="marquee-outer marquee-container mb-6 sm:mb-8">
        <div className="marquee-track marquee-track--left">
          {doubleConcerns.map((concern, idx) => (
            <span key={idx} className="inline-flex items-center shrink-0">
              <span
                className={`text-[11px] sm:text-[12.5px] font-semibold tracking-[0.22em] uppercase whitespace-nowrap transition-colors duration-300 cursor-default ${
                  isDark ? 'text-white/40 hover:text-white/70' : 'text-[#7E6947] hover:text-[#111817]'
                }`}
                style={{ fontFamily: '"Outfit", system-ui, sans-serif' }}
              >
                {concern}
              </span>
              {DOT}
            </span>
          ))}
        </div>
      </div>

      {/* ── ROW 2: Images → scroll RIGHT ──────────────────────── */}
      <div className="marquee-outer marquee-container">
        <div className="marquee-track marquee-track--right">
          {doubleImages.map((img, idx) => (
            <div
              key={idx}
              className="relative shrink-0 mx-2 sm:mx-3 rounded-xl overflow-hidden"
              style={{ width: '160px', height: '90px' }}
              aria-hidden={idx >= HERO_IMAGES.length}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                style={{ objectPosition: 'center 30%' }}
                loading="lazy"
              />
              {/* Elegant thin overlay so images don't compete with the band */}
              <div
                className="absolute inset-0 rounded-xl"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(10,14,18,0.28) 0%, rgba(10,14,18,0.08) 50%, rgba(10,14,18,0.32) 100%)',
                }}
              />
              {/* Bottom micro-border accent */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-derma-gold/40 to-transparent" />
            </div>
          ))}
        </div>
      </div>

      {/* Edge fade masks — prevents hard cut on both sides */}
      <div
        className="absolute inset-y-0 left-0 w-20 sm:w-32 pointer-events-none z-10"
        style={{
          background: isDark
            ? 'linear-gradient(to right, #0a0e12 0%, transparent 100%)'
            : 'linear-gradient(to right, #FAF7F2 0%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-y-0 right-0 w-20 sm:w-32 pointer-events-none z-10"
        style={{
          background: isDark
            ? 'linear-gradient(to left, #0a0e12 0%, transparent 100%)'
            : 'linear-gradient(to left, #FAF7F2 0%, transparent 100%)',
        }}
      />
    </div>
  );
};
