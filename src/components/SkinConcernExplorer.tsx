import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Activity, Droplets, Sun, AlertCircle } from 'lucide-react';
import { SKIN_CONCERNS } from '../data/skinConcerns';
import { SkinConcern } from '../types';
import { useTheme } from '../context/ThemeContext';

interface SkinConcernExplorerProps {
  onSelectConcern: (concern: SkinConcern) => void;
}

export const SkinConcernExplorer: React.FC<SkinConcernExplorerProps> = ({ onSelectConcern }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Acne & Blemishes',
    'Pigmentation',
    'Sensitivity & Barrier',
  ];

  const filteredConcerns = activeCategory === 'All'
    ? SKIN_CONCERNS
    : SKIN_CONCERNS.filter((c) => c.category === activeCategory);

  const getConcernIcon = (id: string) => {
    const iconColor = isDark ? 'text-derma-gold' : 'text-[#7E6947]';
    switch (id) {
      case 'acne-vulgaris':
      case 'blackheads-comedones':
      case 'oily-congested-skin':
        return <Activity className={`w-5 h-5 ${iconColor}`} />;
      case 'dark-circles':
      case 'hyperpigmentation-melasma':
        return <Sun className={`w-5 h-5 ${iconColor}`} />;
      case 'dry-skin-impaired-barrier':
        return <Droplets className={`w-5 h-5 ${iconColor}`} />;
      default:
        return <AlertCircle className={`w-5 h-5 ${iconColor}`} />;
    }
  };

  return (
    <section
      id="concerns"
      className={`py-16 sm:py-24 md:py-32 relative overflow-hidden w-full max-w-full transition-colors duration-400 ${
        isDark ? 'bg-derma-dark text-white' : 'bg-[#FAF7F2] text-[#111817]'
      }`}
    >
      {/* Subtle background ambient medical glow */}
      <div
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[320px] sm:w-[500px] md:w-[600px] h-[250px] sm:h-[350px] max-w-full blur-[100px] sm:blur-[130px] rounded-full pointer-events-none transition-colors duration-500 ${
          isDark ? 'bg-derma-sage-dark/20' : 'bg-[#EAE2D2]/50'
        }`}
      />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 box-border">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 transition-colors ${
              isDark
                ? 'bg-white/5 border border-white/10 text-derma-gold'
                : 'bg-[#EAE2D2] border border-[#DDD3BF] text-[#7E6947]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>CLINICAL DERMATOLOGY COMPENDIUM</span>
          </div>

          <h2
            className={`text-[clamp(1.5rem,5.5vw,2.75rem)] font-light tracking-tight mb-4 sm:mb-5 leading-[1.2] transition-colors break-words ${
              isDark ? 'text-white' : 'text-[#111817]'
            }`}
          >
            Identify & Understand{' '}
            <span
              className={`font-serif italic font-normal block sm:inline ${
                isDark ? 'text-derma-gold' : 'text-[#7E6947]'
              }`}
            >
              Your Skin Condition
            </span>
          </h2>

          <p
            className={`text-xs sm:text-base leading-relaxed max-w-2xl mx-auto px-2 transition-colors ${
              isDark ? 'text-derma-muted' : 'text-[#46544D]'
            }`}
          >
            Every skin condition operates at the cellular level. Explore clinical diagnoses, root physiological triggers, and targeted active ingredients formulated to restore barrier balance.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-6 sm:mt-8 px-2 w-full max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-derma-sage text-white border border-derma-gold/50 shadow-[0_0_20px_rgba(45,84,75,0.4)]'
                    : isDark
                    ? 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
                    : 'bg-[#EAE2D2] text-[#46544D] hover:text-[#111817] hover:bg-[#DDD3BF] border border-[#DDD3BF]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Concern Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 w-full max-w-full">
          {filteredConcerns.map((concern) => (
            <div
              key={concern.id}
              onClick={() => onSelectConcern(concern)}
              className={`group relative rounded-2xl p-5 sm:p-7 transition-all duration-500 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between w-full max-w-full box-border ${
                isDark
                  ? 'glass-panel border border-white/10 hover:border-derma-gold/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] text-white'
                  : 'bg-white border border-[#E5DEC9] shadow-[0_10px_30px_rgba(30,40,35,0.06)] hover:shadow-[0_20px_40px_rgba(45,84,75,0.12)] hover:border-derma-sage text-[#111817]'
              }`}
            >
              {/* Card Top: Icon & Category */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                      isDark
                        ? 'bg-white/5 border border-white/10 group-hover:border-derma-gold/50 group-hover:bg-derma-sage/30'
                        : 'bg-[#EAE2D2] border border-[#DDD3BF] group-hover:border-derma-sage/50'
                    }`}
                  >
                    {getConcernIcon(concern.id)}
                  </div>
                  <span
                    className={`text-[11px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full border transition-colors ${
                      isDark
                        ? 'bg-white/5 border-white/10 text-white/70'
                        : 'bg-[#F1ECE1] border-[#DDD3BF] text-[#7E6947]'
                    }`}
                  >
                    {concern.tag}
                  </span>
                </div>

                <h3
                  className={`text-xl font-semibold transition-colors mb-2.5 ${
                    isDark ? 'text-white group-hover:text-derma-gold' : 'text-[#111817] group-hover:text-derma-sage-dark'
                  }`}
                >
                  {concern.name}
                </h3>

                <p
                  className={`text-xs sm:text-sm leading-relaxed mb-6 transition-colors ${
                    isDark ? 'text-derma-muted' : 'text-[#46544D]'
                  }`}
                >
                  {concern.summary}
                </p>

                {/* Key Recommended Actives */}
                <div className="space-y-2 mb-6">
                  <div
                    className={`text-[11px] font-semibold tracking-wider uppercase transition-colors ${
                      isDark ? 'text-derma-gold' : 'text-[#7E6947]'
                    }`}
                  >
                    Key Clinical Actives:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {concern.recommendedActives.slice(0, 3).map((active) => (
                      <span
                        key={active.name}
                        className={`text-[11px] px-2.5 py-1 rounded-md border transition-colors ${
                          isDark
                            ? 'bg-white/5 border-white/10 text-white/80 group-hover:border-white/20'
                            : 'bg-[#F1ECE1] border-[#DDD3BF] text-[#2D544B] font-medium'
                        }`}
                      >
                        {active.name.split(' (')[0]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: Action button */}
              <div
                className={`pt-4 border-t flex items-center justify-between text-xs font-semibold transition-colors ${
                  isDark
                    ? 'border-white/10 text-white/90 group-hover:text-derma-gold'
                    : 'border-[#EAE2D2] text-derma-sage-dark group-hover:text-derma-sage'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className={`w-3.5 h-3.5 ${isDark ? 'text-derma-gold' : 'text-[#7E6947]'}`} />
                  View Clinical Protocol
                </span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkinConcernExplorer;
