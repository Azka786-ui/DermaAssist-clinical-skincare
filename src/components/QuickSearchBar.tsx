import React, { useState, useRef, useEffect } from 'react';
import { Search, Sparkles, X, ArrowUpRight } from 'lucide-react';
import { SKIN_CONCERNS } from '../data/skinConcerns';
import { SkinConcern } from '../types';
import { useTheme } from '../context/ThemeContext';

interface QuickSearchBarProps {
  onSelectConcern: (concern: SkinConcern) => void;
  onFilterCategory?: (category: string) => void;
}

export const QuickSearchBar: React.FC<QuickSearchBarProps> = ({ onSelectConcern }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const quickTags = [
    { label: 'Acne', id: 'acne-vulgaris' },
    { label: 'Blackheads', id: 'blackheads-comedones' },
    { label: 'Dark Circles', id: 'dark-circles' },
    { label: 'Dry Skin', id: 'dry-skin-impaired-barrier' },
    { label: 'Oily Skin', id: 'oily-congested-skin' },
    { label: 'Melasma', id: 'hyperpigmentation-melasma' },
  ];

  const filteredConcerns = query.trim()
    ? SKIN_CONCERNS.filter((c) => {
        const q = query.toLowerCase();
        return (
          c.name.toLowerCase().includes(q) ||
          c.tag.toLowerCase().includes(q) ||
          c.summary.toLowerCase().includes(q) ||
          c.symptoms.some((s) => s.toLowerCase().includes(q)) ||
          c.recommendedActives.some((a) => a.name.toLowerCase().includes(q))
        );
      })
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectTag = (id: string) => {
    const found = SKIN_CONCERNS.find((c) => c.id === id);
    if (found) {
      onSelectConcern(found);
    }
  };

  return (
    <div className="relative -mt-6 sm:-mt-10 z-40 w-full max-w-5xl mx-auto px-3.5 sm:px-6 box-border">
      <div
        ref={dropdownRef}
        className={`w-full max-w-full box-border rounded-2xl p-3.5 sm:p-5 backdrop-blur-xl transition-all duration-300 ${
          isDark
            ? 'glass-panel border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:border-derma-gold/30'
            : 'bg-[#FAF7F2] border border-[#DDD3BF] shadow-[0_20px_40px_rgba(100,90,70,0.08)] hover:border-derma-sage/40'
        }`}
      >
        <div className="flex flex-col md:flex-row items-center gap-3 sm:gap-4 w-full">
          {/* Search Input Field */}
          <div className="relative flex-1 w-full min-w-0">
            <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none">
              <Search className={`h-4.5 w-4.5 sm:h-5 sm:w-5 ${isDark ? 'text-derma-gold' : 'text-[#7E6947]'}`} />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              placeholder="Search a skin concern (e.g. acne, melasma)..."
              className={`w-full min-w-0 max-w-full box-border pl-10 sm:pl-12 pr-9 py-2.5 sm:py-3.5 rounded-xl text-xs sm:text-sm focus:outline-none transition-all duration-200 truncate placeholder:truncate ${
                isDark
                  ? 'bg-white/5 border border-white/10 text-white placeholder-white/50 focus:ring-2 focus:ring-derma-gold/50 focus:border-derma-gold/50'
                  : 'bg-white border border-[#DDD3BF] text-[#111817] placeholder-[#8F9E96] focus:ring-2 focus:ring-derma-sage/30 focus:border-derma-sage'
              }`}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className={`absolute inset-y-0 right-0 pr-3 flex items-center transition-colors ${
                  isDark ? 'text-white/40 hover:text-white' : 'text-gray-400 hover:text-black'
                }`}
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Clinical Symptom Checker Label */}
          <div
            className={`hidden lg:flex items-center gap-2 text-xs whitespace-nowrap pl-2 border-l transition-colors ${
              isDark ? 'text-derma-muted border-white/10' : 'text-[#5C6C63] border-[#DDD3BF]'
            }`}
          >
            <Sparkles className={`w-4 h-4 ${isDark ? 'text-derma-gold' : 'text-[#7E6947]'}`} />
            <span>Instant Clinical Actives & Care Match</span>
          </div>
        </div>

        {/* Quick Tag Pills - Horizontally scrollable inside its own container */}
        <div
          className={`flex items-center gap-2 mt-3 pt-3 border-t overflow-x-auto pb-1.5 w-full max-w-full scrollbar-none transition-colors touch-pan-x ${
            isDark ? 'border-white/5' : 'border-[#DDD3BF]'
          }`}
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <span
            className={`text-xs whitespace-nowrap flex-shrink-0 mr-1 font-medium transition-colors ${
              isDark ? 'text-white/50' : 'text-[#7E6947]'
            }`}
          >
            Quick Concerns:
          </span>
          <div className="flex items-center gap-1.5 sm:gap-2 flex-nowrap flex-shrink-0">
            {quickTags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => handleSelectTag(tag.id)}
                className={`inline-flex items-center gap-1 px-2.5 sm:px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all duration-200 border ${
                  isDark
                    ? 'text-white/80 bg-white/5 hover:bg-derma-sage hover:text-white border-white/10 hover:border-derma-gold/40'
                    : 'text-[#111817] bg-[#EAE2D2] hover:bg-[#DDD3BF] border-[#DDD3BF] hover:border-derma-sage'
                }`}
              >
                <span>{tag.label}</span>
                <ArrowUpRight className={`w-3 h-3 ${isDark ? 'text-derma-gold opacity-70' : 'text-[#7E6947]'}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Autocomplete Dropdown */}
        {isOpen && query.trim().length > 0 && (
          <div
            className={`absolute left-0 right-0 top-full mt-2 backdrop-blur-xl rounded-2xl p-3 shadow-2xl z-50 max-h-80 sm:max-h-96 overflow-y-auto border w-full max-w-full box-border transition-colors ${
              isDark
                ? 'bg-derma-surface/95 border-derma-border text-white'
                : 'bg-[#FAF7F2] border-[#DDD3BF] text-[#111817]'
            }`}
          >
            {filteredConcerns.length > 0 ? (
              <div className="space-y-1">
                <div
                  className={`text-[11px] font-semibold uppercase tracking-wider px-3 py-1.5 ${
                    isDark ? 'text-derma-gold' : 'text-[#7E6947]'
                  }`}
                >
                  Matching Clinical Conditions ({filteredConcerns.length})
                </div>
                {filteredConcerns.map((concern) => (
                  <div
                    key={concern.id}
                    onClick={() => {
                      onSelectConcern(concern);
                      setIsOpen(false);
                      setQuery('');
                    }}
                    className={`flex items-start justify-between p-3 rounded-xl cursor-pointer transition-colors group ${
                      isDark ? 'hover:bg-white/5' : 'hover:bg-[#EAE2D2]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-semibold transition-colors ${
                            isDark ? 'text-white group-hover:text-derma-gold' : 'text-[#111817] group-hover:text-derma-sage-dark'
                          }`}
                        >
                          {concern.name}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-derma-sage/40 text-derma-cream border border-derma-sage">
                          {concern.category}
                        </span>
                      </div>
                      <p className={`text-xs line-clamp-1 mt-1 ${isDark ? 'text-derma-muted' : 'text-[#5C6C63]'}`}>
                        {concern.summary}
                      </p>
                      <div className={`flex items-center gap-2 mt-1.5 text-[11px] ${isDark ? 'text-white/60' : 'text-[#7E6947]'}`}>
                        <span>Actives:</span>
                        <span className={`font-medium ${isDark ? 'text-derma-gold-light' : 'text-[#2D544B]'}`}>
                          {concern.recommendedActives.map((a) => a.name).slice(0, 3).join(', ')}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity mt-1 ${isDark ? 'text-derma-gold' : 'text-derma-sage-dark'}`} />
                  </div>
                ))}
              </div>
            ) : (
              <div className={`p-6 text-center text-xs ${isDark ? 'text-derma-muted' : 'text-[#5C6C63]'}`}>
                No matching skin concerns found for &ldquo;{query}&rdquo;.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickSearchBar;
