import React, { useRef, useEffect } from 'react';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ExpertCareSectionProps {
  onOpenBooking: () => void;
}

export const ExpertCareSection: React.FC<ExpertCareSectionProps> = ({ onOpenBooking }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;

    const playVideo = () => {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay policy fallback
        });
      }
    };

    playVideo();

    // Ensure continuous playback when scrolled into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            playVideo();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  const benefits = [
    {
      title: 'Personalized Diagnosis',
      description: 'In-depth skin barrier analysis and follicular examination tailored to your biological profile.',
    },
    {
      title: 'Customized Treatment Plan',
      description: 'Precision clinical active formulations prescribed for your specific lifestyle and skin tolerance.',
    },
    {
      title: 'Long-Term Skin Health',
      description: 'Continuous cellular health monitoring and proactive barrier maintenance for enduring confidence.',
    },
  ];

  return (
    <section
      id="expert-care"
      className={`py-20 sm:py-28 relative overflow-hidden transition-colors duration-400 ${
        isDark ? 'bg-[#0D1314] text-white' : 'bg-[#F6F2EA] text-[#111817]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* ── LEFT SIDE: LARGE VIDEO CONTAINER ──────────────────── */}
          <div className="lg:col-span-7 relative">
            <div
              className={`relative rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-[16/9.5] flex items-center justify-center transition-all duration-400 ${
                isDark
                  ? 'shadow-[0_25px_60px_rgba(0,0,0,0.6)] border border-white/15 bg-black/60'
                  : 'shadow-[0_20px_50px_rgba(25,35,30,0.14)] border border-[#E5DEC9] bg-[#0E1319]'
              }`}
            >
              <video
                ref={videoRef}
                src="/images/Dermatologist.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                disablePictureInPicture
                controlsList="nodownload nofullscreen noremoteplayback"
                onLoadedMetadata={(e) => {
                  e.currentTarget.muted = true;
                  e.currentTarget.play().catch(() => {});
                }}
                className="w-full h-full object-cover pointer-events-none select-none"
              >
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Micro Credential Tag Below Video */}
            <div
              className={`mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 text-xs px-1 sm:px-2 transition-colors ${
                isDark ? 'text-white/60' : 'text-[#526058]'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-derma-sage inline-block shrink-0" />
                <span className="font-medium text-[11px] sm:text-xs">Filmed at Harvard-Affiliated Dermatology Research Suite</span>
              </div>
              <span className="font-mono text-[10px] sm:text-[11px]">HIPAA Certified Protocol</span>
            </div>
          </div>

          {/* ── RIGHT SIDE: HEADLINE, BENEFITS, AND CTA ─────────────── */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Small Label */}
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-[0.2em] uppercase mb-4 w-fit transition-colors ${
                isDark
                  ? 'bg-white/5 border border-white/10 text-derma-gold'
                  : 'bg-[#EAE2D2] border border-[#DDD3BF] text-derma-sage-dark'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${isDark ? 'text-derma-gold' : 'text-[#7E6947]'}`} />
              <span>EXPERT CARE IN ACTION</span>
            </div>

            {/* Headline */}
            <h2
              className={`text-2xl min-[360px]:text-3xl sm:text-5xl font-light tracking-tight leading-[1.15] mb-5 transition-colors ${
                isDark ? 'text-white' : 'text-[#111817]'
              }`}
            >
              From Diagnosis <br />
              <span
                className={`font-serif italic font-normal ${
                  isDark ? 'text-derma-gold-light' : 'text-derma-sage-dark'
                }`}
              >
                to Visible Results
              </span>
            </h2>

            {/* Supporting Copy */}
            <p
              className={`text-sm sm:text-base leading-relaxed mb-8 transition-colors ${
                isDark ? 'text-white/70' : 'text-[#46544D]'
              }`}
            >
              Watch how our certified dermatologists work closely with patients to understand their concerns, create personalized treatment plans, and guide them toward healthier skin.
            </p>

            {/* 3 Benefit Items */}
            <div className="space-y-4 mb-9">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className={`flex items-start gap-3.5 p-3 rounded-2xl border transition-all duration-400 ${
                    isDark
                      ? 'bg-white/5 border-white/10 shadow-none'
                      : 'bg-white/70 border-[#E5DEC9] shadow-sm'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                      isDark ? 'bg-white/10' : 'bg-[#EAE2D2]'
                    }`}
                  >
                    <CheckCircle2 className={`w-4 h-4 ${isDark ? 'text-derma-gold' : 'text-derma-sage-dark'}`} />
                  </div>
                  <div>
                    <h4
                      className={`text-sm font-semibold transition-colors ${
                        isDark ? 'text-white' : 'text-[#111817]'
                      }`}
                    >
                      {b.title}
                    </h4>
                    <p
                      className={`text-xs leading-relaxed mt-0.5 transition-colors ${
                        isDark ? 'text-white/70' : 'text-[#5C6C63]'
                      }`}
                    >
                      {b.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA: Book Your Consultation → */}
            <div>
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto btn-shimmer-sweep inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs min-[360px]:text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-derma-sage via-derma-sage-light to-derma-sage shadow-[0_4px_25px_rgba(45,84,75,0.35)] hover:shadow-[0_6px_30px_rgba(45,84,75,0.45)] border border-derma-gold/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                <span>Book Your Consultation</span>
                <ArrowRight className="w-4 h-4 text-derma-gold" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ExpertCareSection;
