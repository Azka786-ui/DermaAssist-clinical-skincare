import React from 'react';
import { X, ShieldCheck, Stethoscope, AlertTriangle, ArrowRight, CheckCircle2, FlaskConical, Sparkles } from 'lucide-react';
import { SkinConcern, Product } from '../types';
import { CLINICAL_PRODUCTS } from '../data/products';
import { useTheme } from '../context/ThemeContext';

interface SkinConcernModalProps {
  concern: SkinConcern | null;
  onClose: () => void;
  onConsultDermatologist: (concernName?: string) => void;
  onSelectProduct?: (product: Product) => void;
}

export const SkinConcernModal: React.FC<SkinConcernModalProps> = ({
  concern,
  onClose,
  onConsultDermatologist,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  if (!concern) return null;

  const matchingProducts = CLINICAL_PRODUCTS.filter((p) =>
    p.targetConcerns.includes(concern.id)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeInUp">
      <div
        className={`relative w-full max-w-3xl rounded-3xl p-4 min-[380px]:p-6 sm:p-10 my-4 sm:my-8 max-h-[92vh] overflow-y-auto shadow-2xl transition-colors duration-300 ${
          isDark
            ? 'glass-panel border border-white/20 text-white'
            : 'bg-[#FAF7F2] border border-[#DDD3BF] text-[#111817]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 sm:top-6 right-4 sm:right-6 p-2 rounded-full transition-colors ${
            isDark
              ? 'bg-white/10 hover:bg-white/20 text-white/70 hover:text-white'
              : 'bg-[#EAE2D2] hover:bg-[#DDD3BF] text-[#111817]'
          }`}
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-8 pr-6 sm:pr-8">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider mb-3 transition-colors ${
              isDark
                ? 'bg-derma-sage/40 border border-derma-sage text-derma-cream'
                : 'bg-[#EAE2D2] border border-[#DDD3BF] text-derma-sage-dark'
            }`}
          >
            <Sparkles className={`w-3 h-3 ${isDark ? 'text-derma-gold' : 'text-[#7E6947]'}`} />
            <span>{concern.category}</span>
          </div>

          <h2 className={`text-xl min-[360px]:text-2xl sm:text-4xl font-semibold tracking-tight mb-3 transition-colors ${isDark ? 'text-white' : 'text-[#111817]'}`}>
            {concern.name}
          </h2>

          <p className={`text-sm sm:text-base leading-relaxed transition-colors ${isDark ? 'text-derma-muted' : 'text-[#46544D]'}`}>
            {concern.summary}
          </p>
        </div>

        {/* Two-column Clinical Breakdown: Symptoms & Causes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Symptoms */}
          <div
            className={`rounded-2xl p-5 border transition-colors ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-[#F1ECE1] border-[#DDD3BF]'
            }`}
          >
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 transition-colors ${isDark ? 'text-derma-gold' : 'text-[#7E6947]'}`}>
              <CheckCircle2 className="w-4 h-4" />
              Primary Symptoms
            </h4>
            <ul className={`space-y-2 text-xs sm:text-sm ${isDark ? 'text-white/80' : 'text-[#2B3830]'}`}>
              {concern.symptoms.map((sym, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${isDark ? 'bg-derma-gold' : 'bg-derma-sage'}`} />
                  <span>{sym}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Causes */}
          <div
            className={`rounded-2xl p-5 border transition-colors ${
              isDark ? 'bg-white/5 border-white/10' : 'bg-[#F1ECE1] border-[#DDD3BF]'
            }`}
          >
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 transition-colors ${isDark ? 'text-derma-gold' : 'text-[#7E6947]'}`}>
              <AlertTriangle className="w-4 h-4" />
              Physiological Causes
            </h4>
            <ul className={`space-y-2 text-xs sm:text-sm ${isDark ? 'text-white/80' : 'text-[#2B3830]'}`}>
              {concern.causes.map((cau, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${isDark ? 'bg-derma-sage-light' : 'bg-[#7E6947]'}`} />
                  <span>{cau}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recommended Active Ingredients */}
        <div className="mb-8">
          <h4 className={`text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2 transition-colors ${isDark ? 'text-white' : 'text-[#111817]'}`}>
            <FlaskConical className={`w-4 h-4 ${isDark ? 'text-derma-gold' : 'text-[#7E6947]'}`} />
            Targeted Active Ingredients (Clinical Protocol)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {concern.recommendedActives.map((active, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl border transition-colors ${
                  isDark
                    ? 'bg-white/5 border-white/10 hover:border-derma-gold/30'
                    : 'bg-[#F1ECE1] border-[#DDD3BF] hover:border-derma-sage/50'
                }`}
              >
                <div className={`text-xs sm:text-sm font-semibold mb-1 transition-colors ${isDark ? 'text-derma-gold' : 'text-[#2D544B]'}`}>
                  {active.name}
                </div>
                <div className={`text-xs leading-relaxed transition-colors ${isDark ? 'text-derma-muted' : 'text-[#5C6C63]'}`}>
                  {active.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dermatologist Clinical Tip */}
        <div
          className={`p-5 rounded-2xl border mb-8 transition-colors ${
            isDark
              ? 'bg-gradient-to-r from-derma-sage/30 to-derma-sage-dark/40 border-derma-sage/50'
              : 'bg-[#EAE2D2] border-[#DDD3BF]'
          }`}
        >
          <div className="flex items-start gap-3">
            <ShieldCheck className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isDark ? 'text-derma-gold' : 'text-[#2D544B]'}`} />
            <div>
              <div className={`text-xs font-bold uppercase tracking-wider mb-1 transition-colors ${isDark ? 'text-derma-gold-light' : 'text-[#7E6947]'}`}>
                Dermatologist Practice Note
              </div>
              <p className={`text-xs sm:text-sm leading-relaxed transition-colors ${isDark ? 'text-white/90' : 'text-[#2B3830]'}`}>
                {concern.dermatologistTip}
              </p>
            </div>
          </div>
        </div>

        {/* Matched Products */}
        {matchingProducts.length > 0 && (
          <div className="mb-8">
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 transition-colors ${isDark ? 'text-white/70' : 'text-[#7E6947]'}`}>
              Clinically Vetted Formulations for {concern.tag}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {matchingProducts.slice(0, 2).map((prod) => (
                <div
                  key={prod.id}
                  className={`flex items-center gap-4 p-3.5 rounded-xl border transition-colors ${
                    isDark
                      ? 'bg-white/5 border-white/10 hover:border-white/20'
                      : 'bg-[#F1ECE1] border-[#DDD3BF] hover:border-derma-sage/40'
                  }`}
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-14 h-14 rounded-lg object-cover bg-white/10 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className={`text-xs font-semibold truncate ${isDark ? 'text-white' : 'text-[#111817]'}`}>{prod.name}</div>
                    <div className={`text-[11px] truncate ${isDark ? 'text-derma-muted' : 'text-[#5C6C63]'}`}>{prod.activeIngredients.join(', ')}</div>
                    <div className={`text-xs font-semibold mt-1 ${isDark ? 'text-derma-gold' : 'text-[#2D544B]'}`}>${prod.price.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className={`pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors ${isDark ? 'border-white/10' : 'border-[#DDD3BF]'}`}>
          <div className={`text-xs text-center sm:text-left transition-colors ${isDark ? 'text-derma-muted' : 'text-[#5C6C63]'}`}>
            Need a personalized prescription? Consult with our board-certified dermatologists.
          </div>
          <button
            onClick={() => {
              onClose();
              onConsultDermatologist(concern.name);
            }}
            className={`btn-shimmer-sweep w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-lg ${
              isDark
                ? 'text-white bg-gradient-to-r from-derma-sage to-derma-sage-light border border-derma-gold/40 hover:shadow-derma-gold/25'
                : 'text-white bg-[#2D544B] border border-[#7E6947]/40 hover:bg-[#23433c]'
            }`}
          >
            <Stethoscope className={`w-4 h-4 ${isDark ? 'text-derma-gold' : 'text-[#E2C799]'}`} />
            <span>Consult Doctor for {concern.tag}</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkinConcernModal;
