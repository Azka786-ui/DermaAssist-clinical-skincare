import React, { useState } from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, HeartHandshake, Microscope, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [modalOpen, setModalOpen] = useState(false);

  const features = [
    {
      title: 'Evidence-Based Treatments',
      description: 'Peer-reviewed therapeutics formulated with high-potency bio-compatible active molecules.',
      icon: Microscope,
    },
    {
      title: 'Personalized Care Plans',
      description: 'Customized barrier restoration and cellular health regimens crafted for your unique epidermis.',
      icon: Sparkles,
    },
    {
      title: 'Board-Certified Dermatologists',
      description: 'Direct care delivered exclusively by verified FAAD-fellow physicians and clinical researchers.',
      icon: ShieldCheck,
    },
    {
      title: 'Long-Term Skin Health',
      description: 'Preventive dermatological education designed to sustain barrier integrity across every season.',
      icon: HeartHandshake,
    },
  ];

  return (
    <section
      id="about"
      className={`py-20 sm:py-28 relative overflow-hidden transition-colors duration-400 ${
        isDark
          ? 'bg-[#0D1314] text-white border-t border-white/10'
          : 'bg-[#F6F2EA] text-[#111817] border-t border-[#EAE2D2]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ── LEFT SIDE: EDITORIAL COPY, 4 FEATURES, AND CTA ─────── */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Small Label */}
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-[0.2em] uppercase mb-4 w-fit transition-colors ${
                isDark
                  ? 'bg-white/5 border border-white/10 text-derma-gold'
                  : 'bg-[#EAE2D2] border border-[#DDD3BF] text-derma-sage-dark'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${isDark ? 'text-derma-gold' : 'text-[#7E6947]'}`} />
              <span>ABOUT DERMAASSIST</span>
            </div>

            {/* Large Headline */}
            <h2
              className={`text-2xl min-[360px]:text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.12] mb-6 transition-colors ${
                isDark ? 'text-white' : 'text-[#111817]'
              }`}
            >
              Science-Backed Care <br />
              <span
                className={`font-serif italic font-normal ${
                  isDark ? 'text-derma-gold-light' : 'text-derma-sage-dark'
                }`}
              >
                for Healthier, Happier Skin
              </span>
            </h2>

            {/* Supporting Text */}
            <p
              className={`text-sm sm:text-base lg:text-lg leading-relaxed mb-8 max-w-2xl font-normal transition-colors ${
                isDark ? 'text-white/70' : 'text-[#46544D]'
              }`}
            >
              At DermaAssist, we believe everyone deserves clear, healthy and confident skin. Our mission is to make expert dermatological care accessible, personalized, and results-driven. We combine medical expertise, advanced technology, and a patient-first approach to help people make informed decisions about their skin.
            </p>

            {/* 4 Feature Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-9">
              {features.map((f) => {
                const IconComponent = f.icon;
                return (
                  <div
                    key={f.title}
                    className={`p-4 rounded-2xl border transition-all duration-400 ${
                      isDark
                        ? 'bg-[#151D1E] border-white/10 shadow-[0_10px_25px_rgba(0,0,0,0.3)] hover:border-derma-gold/40'
                        : 'bg-white/80 border-[#E5DEC9] shadow-sm hover:border-derma-sage/40'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                          isDark ? 'bg-white/10 text-derma-gold' : 'bg-[#EAE2D2] text-derma-sage-dark'
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <h4
                        className={`text-sm font-semibold transition-colors ${
                          isDark ? 'text-white' : 'text-[#111817]'
                        }`}
                      >
                        {f.title}
                      </h4>
                    </div>
                    <p
                      className={`text-xs leading-relaxed transition-colors ${
                        isDark ? 'text-white/70' : 'text-[#5C6C63]'
                      }`}
                    >
                      {f.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* CTA: Learn More About Us → */}
            <div>
              <button
                onClick={() => setModalOpen(true)}
                className="w-full sm:w-auto btn-shimmer-sweep inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs min-[360px]:text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-derma-sage via-derma-sage-light to-derma-sage shadow-[0_4px_25px_rgba(45,84,75,0.35)] hover:shadow-[0_6px_30px_rgba(45,84,75,0.45)] border border-derma-gold/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4 text-derma-gold" />
              </button>
            </div>
          </div>

          {/* ── RIGHT SIDE: EDITORIAL HEALTHCARE PHOTOGRAPHY + QUOTE CARD ── */}
          <div className="lg:col-span-5 relative">
            <div
              className={`relative rounded-3xl overflow-hidden aspect-[4/5.2] group transition-all duration-400 ${
                isDark
                  ? 'shadow-[0_25px_60px_rgba(0,0,0,0.6)] border border-white/15 bg-black/60'
                  : 'shadow-[0_25px_60px_rgba(25,35,30,0.16)] border border-[#E5DEC9] bg-[#EAE2D2]'
              }`}
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop"
                alt="Healthy adult woman with radiant, natural-looking skin"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />

              {/* Natural warm light vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none" />

              {/* Emotional Quote Card Overlay */}
              <div
                className={`absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6 p-3.5 sm:p-6 rounded-2xl backdrop-blur-md shadow-xl text-left transition-all duration-400 ${
                  isDark
                    ? 'bg-[#151D1E]/95 border border-white/15 text-white'
                    : 'bg-white/95 border border-[#DDD3BF] text-[#111817]'
                }`}
              >
                <div className="flex items-center gap-1.5 text-[10px] min-[360px]:text-[11px] font-bold tracking-[0.25em] uppercase text-derma-gold mb-1.5 sm:mb-2">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>OUR CLINICAL PHILOSOPHY</span>
                </div>

                <blockquote
                  className={`text-lg min-[360px]:text-xl sm:text-2xl font-serif italic font-normal leading-snug mb-2.5 sm:mb-3 transition-colors ${
                    isDark ? 'text-white' : 'text-[#111817]'
                  }`}
                >
                  &ldquo;Healthy Skin <br />
                  Builds <span className={isDark ? 'text-derma-gold-light font-medium' : 'text-derma-sage font-medium'}>Confident Lives.</span>&rdquo;
                </blockquote>

                <div
                  className={`flex items-center justify-between border-t pt-2.5 sm:pt-3 text-xs transition-colors ${
                    isDark ? 'border-white/10' : 'border-[#EAE2D2]'
                  }`}
                >
                  <span
                    className={`font-display font-bold tracking-[0.2em] transition-colors ${
                      isDark ? 'text-white' : 'text-[#111817]'
                    }`}
                  >
                    DERMA<span className="text-derma-gold">ASSIST</span>
                  </span>
                  <span
                    className={`text-[10px] sm:text-[11px] uppercase tracking-wider font-medium transition-colors ${
                      isDark ? 'text-white/60' : 'text-[#5C6C63]'
                    }`}
                  >
                    Clinical Skincare
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* About Mission & Clinical Standards Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div
            className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-5 sm:p-8 shadow-2xl transition-colors ${
              isDark
                ? 'bg-[#151D1E] border border-white/15 text-white'
                : 'bg-white border border-[#E5DEC9] text-[#111817]'
            }`}
          >
            <button
              onClick={() => setModalOpen(false)}
              className={`absolute top-4 sm:top-5 right-4 sm:right-5 p-2 rounded-full transition-colors ${
                isDark ? 'hover:bg-white/10 text-white/70 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-black'
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 transition-colors ${
                isDark
                  ? 'bg-white/10 text-derma-gold border border-white/10'
                  : 'bg-[#EAE2D2] text-derma-sage-dark'
              }`}
            >
              <span>Medical Mission & Standards</span>
            </div>

            <h3
              className={`text-xl sm:text-3xl font-serif mb-4 transition-colors ${
                isDark ? 'text-white' : 'text-[#111817]'
              }`}
            >
              Pioneering Cellular Barrier Health
            </h3>

            <p
              className={`text-xs sm:text-sm leading-relaxed mb-4 transition-colors ${
                isDark ? 'text-white/75' : 'text-[#46544D]'
              }`}
            >
              DermaAssist was founded by an alliance of board-certified dermatologists, cellular biochemists, and telehealth clinicians. We recognize that true skin vitality stems from cellular harmony, healthy microflora, and precise medical intervention.
            </p>

            <div
              className={`space-y-3 mb-6 text-xs sm:text-sm transition-colors ${
                isDark ? 'text-white/80' : 'text-[#2B3830]'
              }`}
            >
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-derma-sage flex-shrink-0 mt-0.5" />
                <span>Zero untested fads: every formulation and telehealth protocol is grounded in peer-reviewed clinical studies.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-derma-sage flex-shrink-0 mt-0.5" />
                <span>100% board-certified dermatologists licensed across 50 US states with HIPAA-compliant telemedicine.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-derma-sage flex-shrink-0 mt-0.5" />
                <span>Holistic long-term skin health programs focused on barrier restoration rather than temporary quick fixes.</span>
              </div>
            </div>

            <div
              className={`flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2.5 sm:gap-3 pt-4 border-t transition-colors ${
                isDark ? 'border-white/10' : 'border-gray-100'
              }`}
            >
              <button
                onClick={() => setModalOpen(false)}
                className={`w-full sm:w-auto px-5 py-2.5 rounded-full text-xs font-medium transition-colors text-center ${
                  isDark ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-black'
                }`}
              >
                Close
              </button>
              <button
                onClick={() => {
                  setModalOpen(false);
                  onOpenBooking();
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-derma-sage hover:bg-derma-sage-light transition-colors text-center"
              >
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AboutSection;
