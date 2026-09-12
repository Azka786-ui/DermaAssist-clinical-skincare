import React from 'react';
import { Stethoscope, Star, ShieldCheck, Calendar, Clock, MapPin, ArrowRight } from 'lucide-react';
import { DERMATOLOGISTS } from '../data/doctors';
import { Doctor } from '../types';

interface DermatologistsDirectoryProps {
  onBookDoctor: (doctor: Doctor) => void;
}

export const DermatologistsDirectory: React.FC<DermatologistsDirectoryProps> = ({ onBookDoctor }) => {
  return (
    <section id="doctors" className="py-24 sm:py-32 relative bg-derma-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-wider uppercase text-derma-gold mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>CERTIFIED MEDICAL EXCELLENCE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight mb-4">
            Consult Board-Certified <span className="font-serif italic font-normal text-derma-gold">Dermatologists</span>
          </h2>

          <p className="text-sm sm:text-base text-derma-muted leading-relaxed">
            Skip months of waiting room delays. Connect directly via high-definition HIPAA-compliant telehealth or schedule an in-clinic medical evaluation with our top clinical specialists.
          </p>
        </div>

        {/* Doctor Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {DERMATOLOGISTS.map((doc) => (
            <div
              key={doc.id}
              className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 hover:border-derma-gold/40 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)] flex flex-col justify-between"
            >
              <div>
                {/* Doctor Avatar & Status */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <img
                      src={doc.avatar}
                      alt={doc.name}
                      className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-derma-gold/40 shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-derma-dark flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 text-xs font-semibold text-derma-gold mb-0.5">
                      <Star className="w-3.5 h-3.5 fill-derma-gold text-derma-gold" />
                      <span>{doc.rating}</span>
                      <span className="text-derma-muted font-normal">({doc.experienceYears} yrs exp)</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight truncate">
                      {doc.name}
                    </h3>
                    <p className="text-xs text-derma-muted truncate">{doc.title}</p>
                  </div>
                </div>

                {/* Badges & Specialty */}
                <div className="space-y-3 mb-6 text-xs">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white/90">
                    <span className="text-derma-gold font-semibold block mb-0.5">Primary Focus:</span>
                    <span>{doc.specialty}</span>
                  </div>

                  <div className="flex items-center gap-2 text-derma-muted">
                    <MapPin className="w-4 h-4 text-derma-gold/80 flex-shrink-0" />
                    <span>{doc.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-white/80">
                    <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Next Slot: <strong className="text-white">{doc.nextAvailable}</strong></span>
                  </div>
                </div>

                {/* Short Bio */}
                <p className="text-xs text-derma-muted leading-relaxed line-clamp-2 mb-6">
                  {doc.bio}
                </p>
              </div>

              {/* Booking Action */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-derma-muted block">Consultation</span>
                  <span className="text-lg font-bold text-white">${doc.consultationFee}</span>
                </div>

                <button
                  onClick={() => onBookDoctor(doc)}
                  className="btn-shimmer-sweep inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-derma-sage to-derma-sage-light border border-derma-gold/40 hover:shadow-[0_0_20px_rgba(198,168,125,0.3)] transition-all"
                >
                  <Calendar className="w-3.5 h-3.5 text-derma-gold" />
                  <span>Book Visit</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
