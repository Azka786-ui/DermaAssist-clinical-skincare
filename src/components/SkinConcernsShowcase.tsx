import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export interface SkinConcernItem {
  id: string;
  name: string;
  shortDescription: string;
  clinicalTag: string;
  image: string;
  focusArea: string;
  keyActives: string[];
}

export const SHOWCASE_CONCERNS: SkinConcernItem[] = [
  {
    id: 'acne',
    name: 'ACNE',
    shortDescription: 'Effective treatments to reduce breakouts and support clearer, healthier-looking skin.',
    clinicalTag: 'Inflammatory & Comedonal Acne',
    image: '/acne.png',
    focusArea: 'Cheeks & Jawline',
    keyActives: ['Salicylic Acid (2%)', 'Benzoyl Peroxide', 'Encapsulated Retinoids'],
  },
  {
    id: 'blackheads',
    name: 'BLACKHEADS',
    shortDescription: 'Targeted pore-clearing protocols that dissolve oxidized sebum and refine congested skin texture.',
    clinicalTag: 'Open Comedones & Follicular Congestion',
    image: '/blackheads.png',
    focusArea: 'T-Zone & Nasal Area',
    keyActives: ['BHA (Salicylic Acid)', 'Zinc PCA', 'Kaolin Clay'],
  },
  {
    id: 'dark-circles',
    name: 'DARK CIRCLES',
    shortDescription: 'Restorative vascular and pigmentary solutions to brighten and revitalize under-eye contours.',
    clinicalTag: 'Periorbital Hyperpigmentation',
    image: '/darkCircles.png',
    focusArea: 'Periorbital Contour',
    keyActives: ['Vitamin K Oxide', 'Caffeine Micro-delivery', 'Haloxyl™ Peptides'],
  },
  {
    id: 'dry-skin',
    name: 'DRY SKIN',
    shortDescription: 'Lipid-replenishing barrier therapy that restores stratum corneum hydration and eliminates flaking.',
    clinicalTag: 'Impaired Epidermal Barrier',
    image: '/drySkin.png',
    focusArea: 'Face & Neck',
    keyActives: ['Ceramides NP/AP/EOP', 'Multi-weight Hyaluronic Acid', 'Madecassoside'],
  },
  {
    id: 'oily-skin',
    name: 'OILY SKIN',
    shortDescription: 'Sebum-regulating clinical actives that rebalance shine without stripping protective skin moisture.',
    clinicalTag: 'Excess Sebum & Shine',
    image: '/oilyskin.png',
    focusArea: 'Forehead & Central Face',
    keyActives: ['Niacinamide (5%)', 'Zinc PCA', 'LHA Micro-exfoliant'],
  },
  {
    id: 'pigmentation',
    name: 'PIGMENTATION',
    shortDescription: 'Evidence-based brightening formulations to fade localized dark patches, melasma, and sun damage.',
    clinicalTag: 'Melasma & Sun-Induced Lentigines',
    image: '/pigmentation.jpg',
    focusArea: 'Cheekbones & Forehead',
    keyActives: ['Tranexamic Acid (3%)', 'Azelaic Acid', 'Mineral SPF 50+'],
  },
  {
    id: 'facial-hair',
    name: 'FACIAL HAIR',
    shortDescription: 'Specialized dermatology-guided care for follicle sensitivity, ingrown hair relief, and smooth barrier comfort.',
    clinicalTag: 'Follicular Sensitivity & Dermaplaning Care',
    image: '/faical_hair.jpg',
    focusArea: 'Jawline & Upper Lip',
    keyActives: ['Azelaic Acid', 'Soothing Allantoin', 'Gentle Keratolytics'],
  },
  {
    id: 'uneven-skin-tone',
    name: 'UNEVEN SKIN TONE',
    shortDescription: 'Multi-pathway clinical protocols that unify complexion tone, calm redness, and enhance skin radiance.',
    clinicalTag: 'Post-Inflammatory Erythema & Tone Irregularity',
    image: '/unSkin.jpg',
    focusArea: 'Full Facial Canvas',
    keyActives: ['Stable Vitamin C (THD)', 'Alpha Arbutin', 'Licorice Root Extract'],
  },
];

interface SkinConcernsShowcaseProps {
  onExploreConcerns: () => void;
  onOpenBooking: () => void;
}

export const SkinConcernsShowcase: React.FC<SkinConcernsShowcaseProps> = ({
  onExploreConcerns,
  onOpenBooking,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const activeConcern = SHOWCASE_CONCERNS[activeIndex];

  // Autoplay function: auto-advance every 4.5 seconds unless paused by hover
  useEffect(() => {
    if (isHovered) {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      return;
    }

    autoplayTimerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SHOWCASE_CONCERNS.length);
    }, 4500);

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [isHovered]);

  const restartAutoplay = () => {
    if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    if (!isHovered) {
      autoplayTimerRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % SHOWCASE_CONCERNS.length);
      }, 4500);
    }
  };

  const handleSelectConcern = (index: number) => {
    setActiveIndex(index);
    restartAutoplay();
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + SHOWCASE_CONCERNS.length) % SHOWCASE_CONCERNS.length);
    restartAutoplay();
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % SHOWCASE_CONCERNS.length);
    restartAutoplay();
  };

  // Keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'ArrowRight') handleNext();
  };

  return (
    <section
      id="concerns-showcase"
      className={`relative py-20 sm:py-28 overflow-hidden transition-colors duration-400 ${
        isDark
          ? 'bg-[#0b1210] text-white border-t border-white/10'
          : 'bg-[#F6F1E8] text-[#111817] border-t border-[#E5DEC9]'
      }`}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      aria-label="Common Skin Concerns Showcase"
    >
      {/* Background ambient medical glow */}
      <div
        className={`absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[380px] blur-[140px] rounded-full pointer-events-none transition-colors duration-500 ${
          isDark ? 'bg-derma-sage/15' : 'bg-[#E2D6C3]/40'
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-[0.2em] uppercase mb-4 shadow-sm transition-colors ${
              isDark
                ? 'bg-white/5 border border-white/10 text-derma-gold'
                : 'bg-[#EAE2D2] border border-[#DDD3BF] text-[#7E6947]'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${isDark ? 'text-derma-gold' : 'text-[#7E6947]'}`} />
            <span>SKIN CONCERNS</span>
          </div>

          <h2
            className={`text-2xl min-[360px]:text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight mb-5 leading-[1.15] transition-colors ${
              isDark ? 'text-white' : 'text-[#111817]'
            }`}
          >
            Real Solutions <br />
            <span
              className={`font-serif italic font-normal ${
                isDark ? 'text-derma-gold-light' : 'text-[#7E6947]'
              }`}
            >
              for Real Skin Concerns
            </span>
          </h2>

          <p
            className={`text-sm sm:text-base leading-relaxed max-w-2xl mx-auto transition-colors ${
              isDark ? 'text-white/70' : 'text-[#5C6C63]'
            }`}
          >
            Explore common skin concerns and discover how our experts can help you achieve clear, healthy, confident skin.
          </p>
        </div>

        {/* ── SMOOTH CONTINUOUS TICKER / CONCERN NAVIGATION ──────────── */}
        <div className="mb-10 sm:mb-12">
          {/* Interactive Tag Pills */}
          <div className="flex items-center justify-start lg:justify-center gap-2.5 overflow-x-auto pb-3 scrollbar-none px-2">
            {SHOWCASE_CONCERNS.map((concern, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={concern.id}
                  onClick={() => handleSelectConcern(idx)}
                  className={`px-3.5 min-[380px]:px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 whitespace-nowrap flex items-center gap-2 border ${
                    isActive
                      ? 'bg-derma-sage text-white border-derma-gold shadow-[0_0_22px_rgba(45,84,75,0.65)] scale-105'
                      : isDark
                      ? 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border-white/10 hover:border-white/20'
                      : 'bg-[#EAE2D2] text-[#46544D] hover:text-[#111817] hover:bg-[#DDD3BF] border-[#DDD3BF]'
                  }`}
                  aria-selected={isActive}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      isActive ? 'bg-derma-gold animate-pulse' : 'bg-transparent'
                    }`}
                  />
                  <span>{concern.name}</span>
                </button>
              );
            })}
          </div>

          {/* Continuous Infinite Ticker Strip (Moves LEFT → RIGHT) */}
          <div
            className={`w-full overflow-hidden py-3.5 mt-4 select-none marquee-container transition-colors ${
              isDark
                ? 'border-y border-white/10 bg-black/30'
                : 'border-y border-[#E5DEC9] bg-[#EAE2D2]/60'
            }`}
          >
            <div
              className="marquee-track marquee-track--right flex items-center whitespace-nowrap will-change-transform py-1"
            >
              {/* 4 repetitions ensures 2 identical 50% halves (16 items each half) for 100% seamless infinite loop */}
              {[...SHOWCASE_CONCERNS, ...SHOWCASE_CONCERNS, ...SHOWCASE_CONCERNS, ...SHOWCASE_CONCERNS].map((item, i) => {
                const itemIndex = i % SHOWCASE_CONCERNS.length;
                const isItemActive = itemIndex === activeIndex;
                return (
                  <div key={`${item.id}-${i}`} className="inline-flex items-center shrink-0">
                    <button
                      type="button"
                      onClick={() => handleSelectConcern(itemIndex)}
                      className={`text-xs sm:text-sm tracking-[0.22em] uppercase font-semibold transition-all duration-200 cursor-pointer px-2 sm:px-3 py-1 ${
                        isItemActive
                          ? isDark
                            ? 'text-derma-gold font-bold scale-105 drop-shadow-[0_0_8px_rgba(198,168,125,0.5)]'
                            : 'text-[#2D544B] font-bold scale-105 drop-shadow-sm'
                          : isDark
                          ? 'text-white/50 hover:text-white/90'
                          : 'text-[#5C6C63] hover:text-[#111817]'
                      }`}
                      title={`Select ${item.name}`}
                    >
                      {item.name}
                    </button>
                    <span
                      className={`mx-3 sm:mx-4 text-xs select-none transition-colors ${
                        isDark ? 'text-derma-gold/70' : 'text-[#c6a87d]'
                      }`}
                      aria-hidden="true"
                    >
                      •
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── PROMINENT SHOWCASE CARD ──────────────────────────────── */}
        <div
          className={`rounded-3xl p-4 min-[400px]:p-6 sm:p-10 backdrop-blur-2xl relative overflow-hidden transition-all duration-400 ${
            isDark
              ? 'glass-panel border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.6)]'
              : 'bg-[#FAF7F2] border border-[#E5DEC9] shadow-[0_20px_50px_rgba(100,90,70,0.08)]'
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Exact Local Asset Dermatology Image with Smooth 500ms Crossfade */}
            <div className="lg:col-span-6 relative">
              <div
                className={`relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden shadow-2xl transition-colors duration-400 group ${
                  isDark
                    ? 'border border-white/15 bg-black/50'
                    : 'border border-[#DDD3BF] bg-black/5'
                }`}
              >
                {/* Crossfade Image Stack (All local assets preloaded for zero-flash transitions) */}
                {SHOWCASE_CONCERNS.map((concern, idx) => {
                  const isVisible = idx === activeIndex;
                  return (
                    <img
                      key={concern.id}
                      src={concern.image}
                      alt={concern.name}
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out ${
                        isVisible
                          ? 'opacity-100 scale-100 z-10'
                          : 'opacity-0 scale-105 pointer-events-none z-0'
                      }`}
                      loading="eager"
                    />
                  );
                })}

                {/* Subtle Gradient Shadow Overlay for Contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-20" />

                {/* Badge Overlay */}
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex flex-wrap items-center justify-between gap-1.5 text-xs text-white z-20">
                  <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20">
                    <ShieldCheck className="w-3.5 h-3.5 text-derma-gold shrink-0" />
                    <span className="font-medium text-[10px] min-[360px]:text-[11px] tracking-wide text-derma-cream">
                      {activeConcern.clinicalTag}
                    </span>
                  </div>

                  <span className="text-[10px] min-[360px]:text-[11px] text-white/80 bg-black/50 px-2 sm:px-2.5 py-1 rounded-md backdrop-blur-md">
                    Focus: {activeConcern.focusArea}
                  </span>
                </div>
              </div>

              {/* Navigation Arrows on Card */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className={`p-2.5 rounded-full transition-all active:scale-95 ${
                      isDark
                        ? 'bg-white/5 hover:bg-white/15 border border-white/10 hover:border-derma-gold/50 text-white/80 hover:text-white'
                        : 'bg-[#EAE2D2] hover:bg-[#DDD3BF] border border-[#DDD3BF] hover:border-derma-gold text-[#111817]'
                    }`}
                    aria-label="Previous Concern"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className={`p-2.5 rounded-full transition-all active:scale-95 ${
                      isDark
                        ? 'bg-white/5 hover:bg-white/15 border border-white/10 hover:border-derma-gold/50 text-white/80 hover:text-white'
                        : 'bg-[#EAE2D2] hover:bg-[#DDD3BF] border border-[#DDD3BF] hover:border-derma-gold text-[#111817]'
                    }`}
                    aria-label="Next Concern"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Counter & Indicator: 01 / 08 ... 08 / 08 */}
                <div
                  className={`flex items-center gap-3 text-xs font-mono transition-colors ${
                    isDark ? 'text-white/60' : 'text-[#7E6947]'
                  }`}
                >
                  <span className={`font-semibold ${isDark ? 'text-derma-gold' : 'text-[#2D544B]'}`}>
                    0{activeIndex + 1}
                  </span>
                  <span>/</span>
                  <span>0{SHOWCASE_CONCERNS.length}</span>
                </div>
              </div>
            </div>

            {/* Right: Concern Details & Clinical Actives */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div
                key={activeConcern.id}
                className="transition-opacity duration-500 ease-out"
              >
                <div
                  className={`inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase mb-3 transition-colors ${
                    isDark ? 'text-derma-gold' : 'text-[#7E6947]'
                  }`}
                >
                  <span>Dermatologist-Approved Protocol</span>
                </div>

                <h3
                  className={`text-2xl sm:text-4xl font-light tracking-tight mb-4 transition-colors ${
                    isDark ? 'text-white' : 'text-[#111817]'
                  }`}
                >
                  {activeConcern.name}
                </h3>

                <p
                  className={`text-base sm:text-lg font-normal leading-relaxed mb-6 transition-colors ${
                    isDark ? 'text-white/80' : 'text-[#46544D]'
                  }`}
                >
                  &ldquo;{activeConcern.shortDescription}&rdquo;
                </p>

                {/* Key Clinical Actives */}
                <div
                  className={`mb-8 p-4 rounded-xl border transition-colors ${
                    isDark
                      ? 'bg-white/5 border-white/10'
                      : 'bg-[#F1ECE1] border-[#DDD3BF]'
                  }`}
                >
                  <div
                    className={`text-xs font-semibold uppercase tracking-wider mb-2.5 transition-colors ${
                      isDark ? 'text-derma-gold' : 'text-[#7E6947]'
                    }`}
                  >
                    Targeted Active Formulations:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeConcern.keyActives.map((active) => (
                      <span
                        key={active}
                        className={`text-xs px-3 py-1 rounded-md border transition-colors ${
                          isDark
                            ? 'bg-derma-sage/30 text-derma-cream border-derma-sage/50'
                            : 'bg-[#FAF7F2] text-[#2D544B] border-[#DDD3BF] font-medium'
                        }`}
                      >
                        {active}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <button
                    onClick={onExploreConcerns}
                    className="btn-shimmer-sweep inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-derma-sage via-derma-sage-light to-derma-sage border border-derma-gold/40 shadow-lg hover:shadow-[0_0_25px_rgba(198,168,125,0.4)] transition-all active:scale-95"
                  >
                    <span>Explore Full Compendium</span>
                    <ArrowRight className="w-4 h-4 text-derma-gold" />
                  </button>

                  <button
                    onClick={onOpenBooking}
                    className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-medium transition-all ${
                      isDark
                        ? 'text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15'
                        : 'text-[#111817] hover:text-[#2D544B] bg-[#EAE2D2] hover:bg-[#DDD3BF] border border-[#DDD3BF]'
                    }`}
                  >
                    <span>Consult a Specialist</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default SkinConcernsShowcase;
