import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Stethoscope, ArrowRight, X, CheckCircle2, FlaskConical, ExternalLink } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import {
  CONCERN_LIST,
  RECOMMENDED_CARE_DATA,
  SkinConcernKey,
  RecommendedProduct,
} from '../data/recommendedCare';

interface ClinicalProductsProps {
  onOpenBooking?: () => void;
}

export const ClinicalProducts: React.FC<ClinicalProductsProps> = ({ onOpenBooking }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [activeConcern, setActiveConcern] = useState<SkinConcernKey>('ACNE');
  const [selectedProduct, setSelectedProduct] = useState<RecommendedProduct | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const handleConcernChange = (concern: SkinConcernKey) => {
    if (concern === activeConcern) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveConcern(concern);
      setIsTransitioning(false);
    }, 180);
  };

  const activeProducts = RECOMMENDED_CARE_DATA[activeConcern] || [];
  const isThreeColumn = activeProducts.length === 3;

  return (
    <section
      id="products"
      className={`py-20 sm:py-28 relative overflow-hidden transition-colors duration-400 ${
        isDark
          ? 'bg-[#0B1210] text-white border-t border-white/10'
          : 'bg-[#FAF7F2] text-[#111817] border-t border-[#EAE2D2]'
      }`}
      aria-label="Recommended Care Skincare Products"
    >
      {/* Background ambient medical glow */}
      <div
        className={`absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[380px] blur-[140px] rounded-full pointer-events-none transition-colors duration-500 ${
          isDark ? 'bg-derma-sage/10' : 'bg-[#EAE2D2]/60'
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── SECTION HEADER ─────────────────────────────────────── */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div
            className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-[0.2em] uppercase mb-4 shadow-sm transition-colors ${
              isDark
                ? 'bg-white/5 border border-white/10 text-derma-gold'
                : 'bg-[#EAE2D2] border border-[#DDD3BF] text-[#7E6947]'
            }`}
          >
            <Sparkles className={`w-3.5 h-3.5 ${isDark ? 'text-derma-gold' : 'text-[#7E6947]'}`} />
            <span>RECOMMENDED CARE</span>
          </div>

          <h2
            className={`text-2xl min-[360px]:text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight mb-5 leading-[1.15] transition-colors ${
              isDark ? 'text-white' : 'text-[#111817]'
            }`}
          >
            Personalized Skincare <br />
            <span
              className={`font-serif italic font-normal ${
                isDark ? 'text-derma-gold-light' : 'text-[#7E6947]'
              }`}
            >
              for Your Skin
            </span>
          </h2>

          <p
            className={`text-sm sm:text-base leading-relaxed max-w-2xl mx-auto transition-colors ${
              isDark ? 'text-white/70' : 'text-[#5C6C63]'
            }`}
          >
            Explore carefully selected skincare categories designed to support healthier-looking skin. Choose a concern to discover the care options most relevant to it.
          </p>
        </div>

        {/* ── CONCERN SELECTOR ───────────────────────────────────── */}
        <div className="mb-12 sm:mb-14">
          <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-3 scrollbar-none px-1">
            {CONCERN_LIST.map((concern) => {
              const isSelected = concern === activeConcern;
              return (
                <button
                  key={concern}
                  type="button"
                  onClick={() => handleConcernChange(concern)}
                  className={`px-3.5 min-[380px]:px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 whitespace-nowrap flex items-center gap-2 border cursor-pointer ${
                    isSelected
                      ? isDark
                        ? 'bg-derma-sage text-white border-derma-gold shadow-[0_0_20px_rgba(45,84,75,0.65)] scale-105'
                        : 'bg-derma-sage text-white border-derma-gold shadow-[0_0_18px_rgba(45,84,75,0.35)] scale-105'
                      : isDark
                      ? 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border-white/10'
                      : 'bg-[#EAE2D2] text-[#46544D] hover:text-[#111817] hover:bg-[#DDD3BF] border-[#DDD3BF]'
                  }`}
                  aria-pressed={isSelected}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      isSelected ? 'bg-derma-gold animate-pulse' : 'bg-transparent'
                    }`}
                  />
                  <span>{concern}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── PRODUCT CARDS CONTAINER ────────────────────────────── */}
        <div
          className={`transition-all duration-300 transform ${
            isTransitioning
              ? 'opacity-0 translate-y-3 scale-[0.99]'
              : 'opacity-100 translate-y-0 scale-100'
          }`}
        >
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7 ${
              isThreeColumn
                ? 'lg:grid-cols-3 max-w-5xl mx-auto'
                : 'lg:grid-cols-4'
            }`}
          >
            {activeProducts.map((product) => {
              const isConsultation = product.isConsultation;

              return (
                <div
                  key={product.id}
                  className={`group rounded-3xl overflow-hidden border transition-all duration-400 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between ${
                    isDark
                      ? 'bg-[#151D1E] border-white/10 hover:border-derma-gold/50 shadow-[0_15px_35px_rgba(0,0,0,0.4)] text-white'
                      : 'bg-white border-[#E5DEC9] hover:border-derma-sage shadow-[0_10px_30px_rgba(30,40,35,0.06)] text-[#111817]'
                  }`}
                >
                  <div>
                    {/* Product Image Area */}
                    <div
                      className={`relative aspect-[4/3.3] w-full overflow-hidden transition-colors ${
                        isDark ? 'bg-black/40' : 'bg-[#F5F0E6]'
                      }`}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                        onError={(e) => {
                          // Fallback to high-res local asset to avoid broken images
                          const target = e.currentTarget;
                          if (!target.src.includes('hero-2.jpg')) {
                            target.src = '/images/hero-2.jpg';
                          }
                        }}
                      />

                      {/* Routine Step Pill */}
                      <div className="absolute top-3 left-3">
                        <span
                          className={`text-[10.5px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full backdrop-blur-md shadow-sm transition-colors ${
                            isDark
                              ? 'bg-black/70 text-derma-cream border border-white/10'
                              : 'bg-white/95 text-[#2B3830] border border-[#DDD3BF]'
                          }`}
                        >
                          {product.routineStep}
                        </span>
                      </div>

                      {/* Clinical Quality Indicator */}
                      <div className="absolute top-3 right-3">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-md shadow-sm transition-colors ${
                            isDark
                              ? 'bg-black/70 text-derma-gold border border-white/10'
                              : 'bg-white/95 text-[#7E6947] border border-[#DDD3BF]'
                          }`}
                        >
                          {isConsultation ? (
                            <Stethoscope className="w-3.5 h-3.5 text-derma-gold" />
                          ) : (
                            <FlaskConical className="w-3.5 h-3.5 text-derma-gold" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Card Content Area */}
                    <div className="p-5 sm:p-6">
                      {/* Product Category */}
                      <div className="mb-2">
                        <span
                          className={`inline-block text-[10.5px] uppercase font-bold tracking-[0.16em] px-2.5 py-0.5 rounded-full transition-colors ${
                            isDark
                              ? 'bg-white/5 text-derma-gold border border-white/10'
                              : 'bg-[#F4EFE6] text-[#7E6947] border border-[#DDD3BF]'
                          }`}
                        >
                          {product.category}
                        </span>
                      </div>

                      {/* Product Name */}
                      <h3
                        className={`text-lg font-bold transition-colors mb-2 line-clamp-1 ${
                          isDark
                            ? 'text-white group-hover:text-derma-gold'
                            : 'text-[#111817] group-hover:text-derma-sage'
                        }`}
                      >
                        {product.name}
                      </h3>

                      {/* Educational 1-Line Description */}
                      <p
                        className={`text-xs sm:text-[13px] leading-relaxed mb-4 line-clamp-2 transition-colors ${
                          isDark ? 'text-white/70' : 'text-[#5C6C63]'
                        }`}
                      >
                        {product.description}
                      </p>

                      {/* Key Actives Pill preview */}
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {product.keyActives.slice(0, 2).map((active, idx) => (
                          <span
                            key={idx}
                            className={`text-[10px] px-2 py-0.5 rounded-md font-medium transition-colors ${
                              isDark
                                ? 'bg-white/5 text-white/60'
                                : 'bg-[#EAE2D2]/60 text-[#5C6C63]'
                            }`}
                          >
                            {active}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom Action */}
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1">
                    {isConsultation ? (
                      <button
                        type="button"
                        onClick={() => onOpenBooking && onOpenBooking()}
                        className="btn-shimmer-sweep w-full py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-derma-sage via-derma-sage-light to-derma-sage border border-derma-gold/45 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 active:scale-95"
                      >
                        <Stethoscope className="w-4 h-4 text-derma-gold" />
                        <span>Book Consultation</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setSelectedProduct(product)}
                        className={`w-full py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 active:scale-95 border ${
                          isDark
                            ? 'bg-white/5 hover:bg-white/10 text-white/90 hover:text-white border-white/15 hover:border-derma-gold/50'
                            : 'bg-white hover:bg-derma-sage hover:text-white text-[#2B3830] border-[#DDD3BF] hover:border-derma-sage shadow-sm'
                        }`}
                      >
                        <span>View Product</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── RESPONSIBLE CLINICAL GUIDANCE CALLOUT ────────────────── */}
        <div
          className={`mt-14 sm:mt-16 p-6 sm:p-8 rounded-3xl border transition-colors flex flex-col md:flex-row items-center justify-between gap-6 ${
            isDark
              ? 'bg-[#151D1E] border-white/10 text-white'
              : 'bg-[#F4EFE6] border-[#DDD3BF] text-[#111817]'
          }`}
        >
          <div className="flex items-start gap-4 max-w-2xl">
            <div
              className={`p-3 rounded-2xl flex-shrink-0 mt-0.5 ${
                isDark ? 'bg-white/5 border border-white/10 text-derma-gold' : 'bg-white border border-[#DDD3BF] text-derma-sage'
              }`}
            >
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4
                className={`text-base sm:text-lg font-bold mb-1 transition-colors ${
                  isDark ? 'text-white' : 'text-[#111817]'
                }`}
              >
                Medical Skincare Responsibility
              </h4>
              <p
                className={`text-xs sm:text-sm leading-relaxed transition-colors ${
                  isDark ? 'text-white/70' : 'text-[#5C6C63]'
                }`}
              >
                Skincare products are formulated to support daily skin health and barrier balance. Persistent, painful, or severe conditions benefit from professional diagnostic evaluation by a board-certified dermatologist.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenBooking && onOpenBooking()}
            className="w-full sm:w-auto btn-shimmer-sweep justify-center px-6 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-derma-sage via-derma-sage-light to-derma-sage border border-derma-gold/45 shadow-md hover:shadow-lg flex items-center gap-2.5 whitespace-nowrap cursor-pointer transition-all duration-300 active:scale-95 flex-shrink-0"
          >
            <Stethoscope className="w-4 h-4 text-derma-gold" />
            <span>Consult a Dermatologist</span>
          </button>
        </div>

      </div>

      {/* ── PRODUCT DETAILS MODAL ──────────────────────────────────── */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeInUp">
          <div
            className={`relative w-full max-w-2xl rounded-3xl p-4 min-[380px]:p-6 sm:p-9 my-4 sm:my-8 max-h-[92vh] overflow-y-auto shadow-2xl transition-colors duration-300 ${
              isDark
                ? 'glass-panel border border-white/20 text-white'
                : 'bg-[#FAF7F2] border border-[#DDD3BF] text-[#111817]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className={`absolute top-4 sm:top-6 right-4 sm:right-6 p-2 rounded-full transition-colors ${
                isDark
                  ? 'bg-white/10 hover:bg-white/20 text-white/70 hover:text-white'
                  : 'bg-[#EAE2D2] hover:bg-[#DDD3BF] text-[#111817]'
              }`}
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-6 items-center mb-6 pr-0 sm:pr-6">
              {/* Product Visual */}
              <div className="sm:col-span-5 relative aspect-square rounded-2xl overflow-hidden border border-white/10">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span
                    className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full backdrop-blur-md ${
                      isDark ? 'bg-black/70 text-derma-gold' : 'bg-white/95 text-derma-sage-dark'
                    }`}
                  >
                    {selectedProduct.routineStep}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="sm:col-span-7">
                <span
                  className={`inline-block text-[11px] uppercase font-bold tracking-[0.2em] px-3 py-1 rounded-full mb-2 ${
                    isDark ? 'bg-white/5 text-derma-gold' : 'bg-[#EAE2D2] text-[#7E6947]'
                  }`}
                >
                  {selectedProduct.category}
                </span>
                <h3 className="text-2xl font-bold mb-2">
                  {selectedProduct.name}
                </h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-white/75' : 'text-[#5C6C63]'}`}>
                  {selectedProduct.description}
                </p>
              </div>
            </div>

            {/* Key Clinical Actives */}
            <div className="mb-6">
              <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 ${isDark ? 'text-derma-gold' : 'text-[#7E6947]'}`}>
                Key Clinical Ingredients
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {selectedProduct.keyActives.map((active, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border text-xs font-medium flex items-center gap-2 ${
                      isDark ? 'bg-white/5 border-white/10 text-white/90' : 'bg-white border-[#E5DEC9] text-[#2B3830]'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-derma-gold flex-shrink-0" />
                    <span>{active}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* How to Use */}
            <div
              className={`p-4 rounded-2xl border mb-6 ${
                isDark ? 'bg-white/5 border-white/10' : 'bg-[#F4EFE6] border-[#DDD3BF]'
              }`}
            >
              <h5 className={`text-xs font-bold uppercase tracking-wider mb-1 ${isDark ? 'text-derma-gold' : 'text-[#7E6947]'}`}>
                Application Guidance
              </h5>
              <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-white/80' : 'text-[#46544D]'}`}>
                {selectedProduct.usage}
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedProduct(null);
                  if (onOpenBooking) onOpenBooking();
                }}
                className="w-full btn-shimmer-sweep py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-derma-sage to-derma-sage-light border border-derma-gold/45 shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Stethoscope className="w-4 h-4 text-derma-gold" />
                <span>Discuss with a Dermatologist</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedProduct(null)}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold border transition-colors cursor-pointer ${
                  isDark ? 'bg-white/5 hover:bg-white/10 text-white/80 border-white/15' : 'bg-white hover:bg-gray-100 text-[#111817] border-[#DDD3BF]'
                }`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ClinicalProducts;
