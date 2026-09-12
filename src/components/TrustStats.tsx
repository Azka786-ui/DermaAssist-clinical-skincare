import React from 'react';
import { ShieldCheck, Award, Microscope, HeartHandshake, Sparkles } from 'lucide-react';

export const TrustStats: React.FC = () => {
  const stats = [
    { value: '50+', label: 'Board-Certified Specialists', sub: 'Harvard, Stanford & Hopkins alumni' },
    { value: '98.4%', label: 'Clinical Efficacy Rate', sub: 'Measured over 12-week trials' },
    { value: '15,000+', label: 'Tailored Skin Regimens', sub: 'Cellular barrier-focused protocols' },
    { value: '24/7', label: 'Encrypted Telehealth', sub: 'Direct asynchronous and live visits' },
  ];

  const pillars = [
    {
      icon: <Microscope className="w-6 h-6 text-derma-gold" />,
      title: 'Cellular Barrier Diagnostics',
      desc: 'We analyze skin at the lipid and stratum corneum level rather than superficial cosmetic masking.',
    },
    {
      icon: <Award className="w-6 h-6 text-derma-gold" />,
      title: 'Evidence-Based Therapeutics',
      desc: 'Formulations strictly adhere to peer-reviewed clinical research and dermatological consensus.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-derma-gold" />,
      title: 'Board-Certified Oversight',
      desc: 'Every treatment protocol is reviewed and authenticated by a licensed physician.',
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-derma-gold" />,
      title: 'Clean, Non-Irritating Safety',
      desc: 'Zero parabens, artificial dyes, phthalates, or unnecessary sensitization agents.',
    },
  ];

  return (
    <section id="about" className="py-24 sm:py-32 relative bg-derma-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-20">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl glass-panel border border-white/10 text-center hover:border-derma-gold/30 transition-all duration-300"
            >
              <div className="text-3xl sm:text-5xl font-light text-white tracking-tight mb-2 font-display">
                <span className="text-shine-gold font-bold">{item.value}</span>
              </div>
              <div className="text-xs sm:text-sm font-semibold text-white/90 mb-1">{item.label}</div>
              <div className="text-[11px] text-derma-muted">{item.sub}</div>
            </div>
          ))}
        </div>

        {/* Clinical Care Pillars */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-wider uppercase text-derma-gold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE DERMAASSIST CLINICAL STANDARD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
            Healthcare First. <span className="font-serif italic font-normal text-derma-gold">Cosmetics Second.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-derma-gold/40 hover:bg-white/[0.07] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-derma-sage/40 border border-derma-sage flex items-center justify-center mb-5">
                {pillar.icon}
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{pillar.title}</h3>
              <p className="text-xs text-derma-muted leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
