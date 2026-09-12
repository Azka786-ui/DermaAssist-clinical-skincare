import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Stethoscope,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  FlaskConical,
  Clock,
  Layers,
  HeartHandshake,
  AlertCircle,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import {
  CONCERN_LIST,
  RECOMMENDED_CARE_DATA,
  SkinConcernKey,
  RecommendedProduct,
  getProductBySlug,
} from '../data/recommendedCare';
import { Footer } from '../components/Footer';

interface ProductsPageProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenBooking: () => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  currentPath,
  onNavigate,
  onOpenBooking,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [activeConcern, setActiveConcern] = useState<SkinConcernKey>('ACNE');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Extract slug if currentPath is /products/:slug
  const cleanPath = currentPath.replace(/\/$/, '');
  const pathParts = cleanPath.split('/').filter(Boolean);
  const isDetailView = pathParts.length >= 2 && pathParts[0] === 'products';
  const productSlug = isDetailView ? pathParts[1] : null;
  const detailedProduct = productSlug ? getProductBySlug(productSlug) : null;

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

  // ──────────────────────────────────────────────────────────────────────────
  // VIEW A: DEDICATED PRODUCT DETAIL VIEW (/products/:slug)
  // ──────────────────────────────────────────────────────────────────────────
  if (isDetailView) {
    if (!detailedProduct) {
      return (
        <div className="flex flex-col min-h-screen pt-28 sm:pt-36">
          <div className="max-w-4xl mx-auto px-4 py-16 text-center flex-grow">
            <AlertCircle className="w-12 h-12 text-derma-gold mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Product Not Found</h2>
            <p className="text-sm text-gray-500 mb-6">
              The product you are looking for may have been moved or updated.
            </p>
            <button
              onClick={() => onNavigate('/products')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-derma-sage hover:bg-derma-sage-light transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Products</span>
            </button>
          </div>
          <Footer onNavigate={onNavigate} onOpenBooking={onOpenBooking} />
        </div>
      );
    }

    return (
      <div className="flex flex-col min-h-screen">
        <main className="pt-28 sm:pt-36 flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {/* Breadcrumb Navigation & Back Link */}
            <div className="flex items-center justify-between gap-4 mb-8 pb-4 border-b border-black/5 dark:border-white/10">
              <button
                type="button"
                onClick={() => onNavigate('/products')}
                className={`inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide transition-colors cursor-pointer group ${
                  isDark ? 'text-derma-gold hover:text-white' : 'text-derma-sage-dark hover:text-derma-sage'
                }`}
              >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span>Back to Products Catalog</span>
              </button>

              <div className="text-xs text-gray-400 hidden sm:flex items-center gap-2">
                <span>Products</span>
                <span>/</span>
                <span className="text-derma-gold uppercase font-medium">{detailedProduct.concern}</span>
                <span>/</span>
                <span className={isDark ? 'text-white' : 'text-gray-700'}>{detailedProduct.name}</span>
              </div>
            </div>

            {/* Product Details Two-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Left Column: Product Photography Card */}
              <div className="lg:col-span-5 relative">
                <div
                  className={`rounded-3xl overflow-hidden border shadow-xl p-6 sm:p-8 transition-colors ${
                    isDark
                      ? 'bg-[#151D1E] border-white/10'
                      : 'bg-white border-[#E5DEC9]'
                  }`}
                >
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-black/5 dark:bg-black/30">
                    <img
                      src={detailedProduct.image}
                      alt={detailedProduct.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.src.includes('hero-2.jpg')) {
                          target.src = '/images/hero-2.jpg';
                        }
                      }}
                    />
                    {/* Routine Step Pill */}
                    <div className="absolute top-4 left-4">
                      <span
                        className={`text-xs uppercase tracking-wider font-semibold px-3 py-1 rounded-full backdrop-blur-md shadow-sm ${
                          isDark
                            ? 'bg-black/70 text-derma-cream border border-white/10'
                            : 'bg-white/95 text-[#2B3830] border border-[#DDD3BF]'
                        }`}
                      >
                        {detailedProduct.routineStep}
                      </span>
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div
                      className={`p-3 rounded-xl border text-center transition-colors ${
                        isDark ? 'bg-white/5 border-white/10 text-white/80' : 'bg-[#FAF7F2] border-[#E5DEC9] text-[#46544D]'
                      }`}
                    >
                      <ShieldCheck className="w-4 h-4 text-derma-gold mx-auto mb-1" />
                      <span className="text-[11px] font-semibold block">Evidence-Based</span>
                    </div>
                    <div
                      className={`p-3 rounded-xl border text-center transition-colors ${
                        isDark ? 'bg-white/5 border-white/10 text-white/80' : 'bg-[#FAF7F2] border-[#E5DEC9] text-[#46544D]'
                      }`}
                    >
                      <FlaskConical className="w-4 h-4 text-derma-gold mx-auto mb-1" />
                      <span className="text-[11px] font-semibold block">Active Formulation</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Detailed Product Information */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                {/* Category & Concern Pill */}
                <div className="flex items-center gap-2.5 mb-3">
                  <span
                    className={`inline-block text-xs uppercase font-bold tracking-[0.18em] px-3 py-1 rounded-full transition-colors ${
                      isDark ? 'bg-white/10 text-derma-gold border border-white/15' : 'bg-[#EAE2D2] text-[#7E6947] border border-[#DDD3BF]'
                    }`}
                  >
                    {detailedProduct.category}
                  </span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-derma-gold">
                    {detailedProduct.concern} CARE
                  </span>
                </div>

                {/* Product Name */}
                <h1
                  className={`text-2xl min-[360px]:text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mb-4 ${
                    isDark ? 'text-white' : 'text-[#111817]'
                  }`}
                >
                  {detailedProduct.name}
                </h1>

                {/* Short Overview Description */}
                <p
                  className={`text-sm sm:text-base lg:text-lg leading-relaxed mb-6 ${
                    isDark ? 'text-white/80' : 'text-[#46544D]'
                  }`}
                >
                  {detailedProduct.description}
                </p>

                {/* What it is for (Key Purpose) */}
                <div
                  className={`p-4 sm:p-5 rounded-2xl border mb-6 transition-colors ${
                    isDark ? 'bg-white/5 border-white/10' : 'bg-[#FAF7F2] border-[#E5DEC9]'
                  }`}
                >
                  <span className={`text-[11px] uppercase font-bold tracking-wider block mb-1 ${isDark ? 'text-derma-gold' : 'text-[#7E6947]'}`}>
                    Primary Purpose:
                  </span>
                  <p className={`text-sm sm:text-base font-medium ${isDark ? 'text-white' : 'text-[#111817]'}`}>
                    {detailedProduct.purpose}
                  </p>
                </div>

                {/* Suitable For Label */}
                <div className="mb-6 flex items-center gap-2 text-xs sm:text-sm">
                  <span className="font-semibold text-derma-gold uppercase tracking-wider text-[11px]">
                    Suitable For:
                  </span>
                  <span className={isDark ? 'text-white/80' : 'text-[#3E4F45]'}>
                    {detailedProduct.suitableFor}
                  </span>
                </div>

                {/* Key Skincare Benefits */}
                <div className="mb-8">
                  <h3 className={`text-xs font-bold uppercase tracking-wider mb-3 ${isDark ? 'text-derma-gold' : 'text-[#7E6947]'}`}>
                    Key Skincare Benefits
                  </h3>
                  <div className="space-y-2.5">
                    {detailedProduct.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-derma-gold flex-shrink-0 mt-0.5" />
                        <span className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-white/85' : 'text-[#3B4741]'}`}>
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Routine Fit & Application Guidance */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <div
                    className={`p-4 rounded-2xl border ${
                      isDark ? 'bg-white/5 border-white/10' : 'bg-white border-[#E5DEC9]'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Layers className="w-4 h-4 text-derma-gold" />
                      <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-[#111817]'}`}>
                        Routine Placement
                      </span>
                    </div>
                    <p className={`text-xs sm:text-sm ${isDark ? 'text-white/70' : 'text-[#5C6C63]'}`}>
                      {detailedProduct.routineStep} in your daily skin support regimen.
                    </p>
                  </div>

                  <div
                    className={`p-4 rounded-2xl border ${
                      isDark ? 'bg-white/5 border-white/10' : 'bg-white border-[#E5DEC9]'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-derma-gold" />
                      <span className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-[#111817]'}`}>
                        Application Guidance
                      </span>
                    </div>
                    <p className={`text-xs sm:text-sm ${isDark ? 'text-white/70' : 'text-[#5C6C63]'}`}>
                      {detailedProduct.usage}
                    </p>
                  </div>
                </div>

                {/* Important Medical / Responsibility Notes */}
                <div
                  className={`p-4 rounded-2xl border mb-8 text-xs sm:text-[13px] leading-relaxed flex items-start gap-3 ${
                    isDark ? 'bg-white/5 border-white/10 text-white/70' : 'bg-[#F4EFE6] border-[#DDD3BF] text-[#5C6C63]'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-derma-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-derma-gold block mb-0.5">Clinical Transparency:</span>
                    <span>{detailedProduct.importantNotes}</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="btn-shimmer-sweep px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-derma-sage via-derma-sage-light to-derma-sage border border-derma-gold/45 shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 cursor-pointer active:scale-95 transition-all"
                  >
                    <Stethoscope className="w-4 h-4 text-derma-gold" />
                    <span>Consult a Dermatologist</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate('/products')}
                    className={`px-7 py-3.5 rounded-full text-sm font-semibold border flex items-center justify-center gap-2 cursor-pointer transition-all ${
                      isDark
                        ? 'bg-white/5 hover:bg-white/10 text-white border-white/15'
                        : 'bg-white hover:bg-gray-50 text-[#111817] border-[#DDD3BF]'
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Products</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer onNavigate={onNavigate} onOpenBooking={onOpenBooking} />
      </div>
    );
  }

  // ──────────────────────────────────────────────────────────────────────────
  // VIEW B: DEDICATED PRODUCTS CATALOG PAGE (/products)
  // ──────────────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top spacing below the fixed floating Navbar */}
      <main className="pt-28 sm:pt-36 flex-grow">
        <section
          id="products-catalog"
          className="relative pb-24 sm:pb-32 overflow-hidden"
          aria-label="DermaAssist Recommended Care Skincare Catalog"
        >
          {/* Background ambient medical glow */}
          <div
            className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[380px] blur-[140px] rounded-full pointer-events-none transition-colors duration-500 ${
              isDark ? 'bg-derma-sage/15' : 'bg-[#EAE2D2]/60'
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

              <h1
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
              </h1>

              <p
                className={`text-sm sm:text-base leading-relaxed max-w-2xl mx-auto transition-colors ${
                  isDark ? 'text-white/70' : 'text-[#5C6C63]'
                }`}
              >
                Explore carefully selected skincare categories designed to support healthier-looking skin. Choose a skin concern to discover the care options most relevant to it.
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

                          {/* Clinical Badge Indicator */}
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

                          {/* Short Description */}
                          <p
                            className={`text-xs sm:text-[13px] leading-relaxed mb-3 line-clamp-2 transition-colors ${
                              isDark ? 'text-white/70' : 'text-[#5C6C63]'
                            }`}
                          >
                            {product.description}
                          </p>

                          {/* Key Purpose */}
                          <div
                            className={`p-2.5 rounded-xl border mb-3 text-xs transition-colors ${
                              isDark ? 'bg-white/5 border-white/10' : 'bg-[#FAF7F2] border-[#EAE2D2]'
                            }`}
                          >
                            <span className={`font-bold block text-[10.5px] uppercase tracking-wide mb-0.5 ${isDark ? 'text-derma-gold' : 'text-[#7E6947]'}`}>
                              Purpose:
                            </span>
                            <span className={`line-clamp-1 font-medium ${isDark ? 'text-white/80' : 'text-[#3E4F45]'}`}>
                              {product.purpose}
                            </span>
                          </div>

                          {/* Suitable-For Label */}
                          <div className="flex items-center gap-1.5 text-[11px] mb-2">
                            <span className="font-semibold text-derma-gold uppercase tracking-wider text-[10px]">
                              Suitable for:
                            </span>
                            <span className={`line-clamp-1 ${isDark ? 'text-white/60' : 'text-[#6A7B72]'}`}>
                              {product.suitableFor}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Card Bottom Action */}
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1">
                        {isConsultation ? (
                          <button
                            type="button"
                            onClick={onOpenBooking}
                            className="btn-shimmer-sweep w-full py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-derma-sage via-derma-sage-light to-derma-sage border border-derma-gold/45 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 active:scale-95"
                          >
                            <Stethoscope className="w-4 h-4 text-derma-gold" />
                            <span>Book Consultation</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => onNavigate(`/products/${product.slug}`)}
                            className={`w-full py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 active:scale-95 border ${
                              isDark
                                ? 'bg-white/5 hover:bg-white/10 text-white/90 hover:text-white border-white/15 hover:border-derma-gold/50'
                                : 'bg-white hover:bg-derma-sage hover:text-white text-[#2B3830] border-[#DDD3BF] hover:border-derma-sage shadow-sm'
                            }`}
                          >
                            <span>View Details</span>
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
                onClick={onOpenBooking}
                className="w-full sm:w-auto btn-shimmer-sweep justify-center px-6 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-derma-sage via-derma-sage-light to-derma-sage border border-derma-gold/45 shadow-md hover:shadow-lg flex items-center gap-2.5 whitespace-nowrap cursor-pointer transition-all duration-300 active:scale-95 flex-shrink-0"
              >
                <Stethoscope className="w-4 h-4 text-derma-gold" />
                <span>Consult a Dermatologist</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer onNavigate={onNavigate} onOpenBooking={onOpenBooking} />
    </div>
  );
};

export default ProductsPage;
