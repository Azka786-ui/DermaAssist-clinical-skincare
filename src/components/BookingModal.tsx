import React, { useState } from 'react';
import { X, Calendar, Clock, Video, Building2, CheckCircle2, User, Mail, Phone, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { DERMATOLOGISTS } from '../data/doctors';
import { SKIN_CONCERNS } from '../data/skinConcerns';
import { Doctor } from '../types';
import { useTheme } from '../context/ThemeContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedDoctor?: Doctor | null;
  preselectedConcernName?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedDoctor,
  preselectedConcernName,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [step, setStep] = useState<number>(1);
  const [consultType, setConsultType] = useState<'telehealth' | 'in-clinic'>('telehealth');
  const [selectedConcern, setSelectedConcern] = useState<string>(preselectedConcernName || 'Acne Vulgaris');
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(preselectedDoctor?.id || DERMATOLOGISTS[0].id);
  const [selectedDate, setSelectedDate] = useState<string>('Tomorrow, 10:30 AM');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const activeDoc = DERMATOLOGISTS.find((d) => d.id === selectedDoctorId) || DERMATOLOGISTS[0];

  const timeSlots = [
    'Tomorrow, 10:30 AM',
    'Tomorrow, 2:00 PM',
    'Thursday, 11:15 AM',
    'Thursday, 4:30 PM',
    'Friday, 9:00 AM',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 min-[380px]:p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeInUp">
      <div
        className={`relative w-full max-w-2xl rounded-3xl p-4 min-[380px]:p-6 sm:p-8 my-4 sm:my-8 max-h-[94vh] overflow-y-auto shadow-2xl transition-colors duration-300 ${
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
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          /* Confirmation Screen */
          <div className="py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center mx-auto mb-5 text-emerald-400">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 transition-colors ${
                isDark
                  ? 'bg-white/5 border border-white/10 text-derma-gold'
                  : 'bg-[#EAE2D2] border border-[#DDD3BF] text-[#7E6947]'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CONFIRMATION CODE: DA-{Math.floor(100000 + Math.random() * 900000)}</span>
            </div>

            <h3 className={`text-2xl sm:text-3xl font-bold mb-2 transition-colors ${isDark ? 'text-white' : 'text-[#111817]'}`}>
              Consultation Scheduled
            </h3>
            <p className={`text-sm max-w-md mx-auto mb-6 transition-colors ${isDark ? 'text-derma-muted' : 'text-[#5C6C63]'}`}>
              A calendar invitation with encrypted HIPAA video link and preparation guidelines has been dispatched to{' '}
              <strong className={isDark ? 'text-white' : 'text-[#111817]'}>{email || 'your email'}</strong>.
            </p>

            <div
              className={`p-4 rounded-2xl max-w-md mx-auto text-left mb-6 text-xs space-y-2 border transition-colors ${
                isDark ? 'bg-white/5 border-white/10' : 'bg-[#F1ECE1] border-[#DDD3BF]'
              }`}
            >
              <div className="flex justify-between">
                <span className={isDark ? 'text-derma-muted' : 'text-[#5C6C63]'}>Specialist:</span>
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#111817]'}`}>{activeDoc.name}</span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-derma-muted' : 'text-[#5C6C63]'}>Focus Concern:</span>
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#111817]'}`}>{selectedConcern}</span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-derma-muted' : 'text-[#5C6C63]'}>Appointment Slot:</span>
                <span className={`font-semibold ${isDark ? 'text-derma-gold' : 'text-[#2D544B]'}`}>{selectedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-derma-muted' : 'text-[#5C6C63]'}>Format:</span>
                <span className={`capitalize ${isDark ? 'text-white' : 'text-[#111817]'}`}>
                  {consultType === 'telehealth' ? 'HIPAA Encrypted Telehealth' : 'In-Clinic Center'}
                </span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full sm:w-auto px-8 py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-derma-sage hover:bg-derma-sage-light border border-derma-gold/40 transition-all"
            >
              Done & Return to Homepage
            </button>
          </div>
        ) : (
          /* Multi-Step Booking Form */
          <div>
            <div className="mb-6">
              <div
                className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider mb-2 transition-colors ${
                  isDark
                    ? 'bg-derma-sage/40 border border-derma-sage text-derma-cream'
                    : 'bg-[#EAE2D2] border border-[#DDD3BF] text-derma-sage-dark'
                }`}
              >
                <Sparkles className={`w-3.5 h-3.5 ${isDark ? 'text-derma-gold' : 'text-[#7E6947]'}`} />
                <span>DIRECT DERMATOLOGIST ACCESS</span>
              </div>
              <h2 className={`text-xl min-[360px]:text-2xl sm:text-3xl font-bold tracking-tight transition-colors ${isDark ? 'text-white' : 'text-[#111817]'}`}>
                Schedule a Clinical Consultation
              </h2>
              <p className={`text-xs sm:text-sm mt-1 transition-colors ${isDark ? 'text-derma-muted' : 'text-[#5C6C63]'}`}>
                Step {step} of 3: {step === 1 ? 'Care Format & Concern' : step === 2 ? 'Select Physician & Slot' : 'Patient Information'}
              </p>
            </div>

            {/* Step Progress Bar */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    s <= step
                      ? isDark
                        ? 'bg-derma-gold'
                        : 'bg-derma-sage'
                      : isDark
                      ? 'bg-white/10'
                      : 'bg-[#DDD3BF]'
                  }`}
                />
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {/* STEP 1: Format & Concern */}
              {step === 1 && (
                <div className="space-y-5 animate-fadeInUp">
                  {/* Format Selection */}
                  <div>
                    <label className={`text-xs font-semibold uppercase tracking-wider block mb-2 transition-colors ${isDark ? 'text-derma-gold' : 'text-[#7E6947]'}`}>
                      1. Consultation Modality
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setConsultType('telehealth')}
                        className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all ${
                          consultType === 'telehealth'
                            ? isDark
                              ? 'bg-derma-sage/40 border-derma-gold shadow-lg text-white'
                              : 'bg-[#EAE2D2] border-derma-sage text-[#111817] shadow-sm'
                            : isDark
                            ? 'bg-white/5 border-white/10 text-white/70 hover:text-white'
                            : 'bg-white border-[#DDD3BF] text-[#46544D] hover:border-derma-sage/40'
                        }`}
                      >
                        <Video className={`w-5 h-5 mb-2 ${isDark ? 'text-derma-gold' : 'text-[#2D544B]'}`} />
                        <div className="text-sm font-semibold">Virtual Telehealth</div>
                        <div className={`text-[11px] ${isDark ? 'text-derma-muted' : 'text-[#5C6C63]'}`}>HD HIPAA video from anywhere</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setConsultType('in-clinic')}
                        className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all ${
                          consultType === 'in-clinic'
                            ? isDark
                              ? 'bg-derma-sage/40 border-derma-gold shadow-lg text-white'
                              : 'bg-[#EAE2D2] border-derma-sage text-[#111817] shadow-sm'
                            : isDark
                            ? 'bg-white/5 border-white/10 text-white/70 hover:text-white'
                            : 'bg-white border-[#DDD3BF] text-[#46544D] hover:border-derma-sage/40'
                        }`}
                      >
                        <Building2 className={`w-5 h-5 mb-2 ${isDark ? 'text-derma-gold' : 'text-[#2D544B]'}`} />
                        <div className="text-sm font-semibold">In-Clinic Evaluation</div>
                        <div className={`text-[11px] ${isDark ? 'text-derma-muted' : 'text-[#5C6C63]'}`}>Regional DermaAssist Centers</div>
                      </button>
                    </div>
                  </div>

                  {/* Primary Skin Concern */}
                  <div>
                    <label className={`text-xs font-semibold uppercase tracking-wider block mb-2 transition-colors ${isDark ? 'text-derma-gold' : 'text-[#7E6947]'}`}>
                      2. Primary Skin Concern
                    </label>
                    <select
                      value={selectedConcern}
                      onChange={(e) => setSelectedConcern(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors ${
                        isDark
                          ? 'bg-white/5 border border-white/15 text-white focus:border-derma-gold'
                          : 'bg-white border border-[#DDD3BF] text-[#111817] focus:border-derma-sage'
                      }`}
                    >
                      {SKIN_CONCERNS.map((c) => (
                        <option
                          key={c.id}
                          value={c.name}
                          className={isDark ? 'bg-derma-surface text-white' : 'bg-white text-[#111817]'}
                        >
                          {c.name} ({c.category})
                        </option>
                      ))}
                      <option
                        value="General Checkup / Other"
                        className={isDark ? 'bg-derma-surface text-white' : 'bg-white text-[#111817]'}
                      >
                        General Full-Body Skin Check / Other
                      </option>
                    </select>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full sm:w-auto btn-shimmer-sweep inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-derma-sage hover:bg-derma-sage-light border border-derma-gold/40"
                    >
                      <span>Continue to Doctor Selection</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Doctor & Time Slot */}
              {step === 2 && (
                <div className="space-y-5 animate-fadeInUp">
                  <div>
                    <label className={`text-xs font-semibold uppercase tracking-wider block mb-2 transition-colors ${isDark ? 'text-derma-gold' : 'text-[#7E6947]'}`}>
                      Select Board-Certified Dermatologist
                    </label>
                    <div className="space-y-2.5">
                      {DERMATOLOGISTS.map((doc) => (
                        <div
                          key={doc.id}
                          onClick={() => setSelectedDoctorId(doc.id)}
                          className={`flex items-center gap-4 p-3 rounded-2xl border cursor-pointer transition-all ${
                            selectedDoctorId === doc.id
                              ? isDark
                                ? 'bg-derma-sage/40 border-derma-gold shadow-md'
                                : 'bg-[#EAE2D2] border-derma-sage shadow-sm'
                              : isDark
                              ? 'bg-white/5 border-white/10 hover:border-white/20'
                              : 'bg-white border-[#DDD3BF] hover:border-derma-sage/50'
                          }`}
                        >
                          <img
                            src={doc.avatar}
                            alt={doc.name}
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          <div className="flex-1 min-w-0 text-left">
                            <div className={`text-xs font-bold truncate ${isDark ? 'text-white' : 'text-[#111817]'}`}>{doc.name}</div>
                            <div className={`text-[11px] truncate ${isDark ? 'text-derma-muted' : 'text-[#5C6C63]'}`}>{doc.specialty}</div>
                          </div>
                          <div className="text-right">
                            <span className={`text-xs font-bold ${isDark ? 'text-derma-gold' : 'text-[#2D544B]'}`}>${doc.consultationFee}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                    {/* Time Slots */}
                    <div>
                      <label className={`text-xs font-semibold uppercase tracking-wider block mb-2 transition-colors ${isDark ? 'text-derma-gold' : 'text-[#7E6947]'}`}>
                        Choose Available Time Slot
                      </label>
                      <div className="grid grid-cols-1 min-[360px]:grid-cols-2 sm:grid-cols-3 gap-2">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setSelectedDate(slot)}
                            className={`p-2.5 rounded-xl text-xs font-medium border text-center transition-all ${
                              selectedDate === slot
                                ? isDark
                                  ? 'bg-derma-gold text-derma-dark border-derma-gold font-bold shadow'
                                  : 'bg-derma-sage text-white border-derma-sage font-semibold shadow-sm'
                                : isDark
                                ? 'bg-white/5 text-white/80 border-white/10 hover:border-white/25'
                                : 'bg-white text-[#46544D] border-[#DDD3BF] hover:border-derma-sage'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 flex flex-col-reverse sm:flex-row sm:justify-between items-stretch sm:items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className={`px-5 py-2.5 rounded-full text-xs font-medium transition-colors text-center ${
                          isDark ? 'text-white/70 hover:text-white' : 'text-[#5C6C63] hover:text-[#111817]'
                        }`}
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="btn-shimmer-sweep inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-derma-sage hover:bg-derma-sage-light border border-derma-gold/40 text-center"
                      >
                        <span>Continue to Patient Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Patient Information */}
                {step === 3 && (
                  <div className="space-y-4 animate-fadeInUp">
                    <div>
                      <label className={`text-xs font-semibold uppercase tracking-wider block mb-1 transition-colors ${isDark ? 'text-derma-gold' : 'text-[#7E6947]'}`}>
                        Full Legal Name
                      </label>
                      <div className="relative">
                        <User className={`w-4 h-4 absolute left-3.5 top-3.5 ${isDark ? 'text-derma-muted' : 'text-[#7E6947]'}`} />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Sarah Jenkins"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none transition-colors ${
                            isDark
                              ? 'bg-white/5 border border-white/15 text-white focus:border-derma-gold'
                              : 'bg-white border border-[#DDD3BF] text-[#111817] placeholder-[#8F9E96] focus:border-derma-sage'
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`text-xs font-semibold uppercase tracking-wider block mb-1 transition-colors ${isDark ? 'text-derma-gold' : 'text-[#7E6947]'}`}>
                        Email Address (for encrypted session link)
                      </label>
                      <div className="relative">
                        <Mail className={`w-4 h-4 absolute left-3.5 top-3.5 ${isDark ? 'text-derma-muted' : 'text-[#7E6947]'}`} />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="sarah@example.com"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none transition-colors ${
                            isDark
                              ? 'bg-white/5 border border-white/15 text-white focus:border-derma-gold'
                              : 'bg-white border border-[#DDD3BF] text-[#111817] placeholder-[#8F9E96] focus:border-derma-sage'
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`text-xs font-semibold uppercase tracking-wider block mb-1 transition-colors ${isDark ? 'text-derma-gold' : 'text-[#7E6947]'}`}>
                        Phone Number (for SMS reminders)
                      </label>
                      <div className="relative">
                        <Phone className={`w-4 h-4 absolute left-3.5 top-3.5 ${isDark ? 'text-derma-muted' : 'text-[#7E6947]'}`} />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 (555) 234-5678"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm focus:outline-none transition-colors ${
                            isDark
                              ? 'bg-white/5 border border-white/15 text-white focus:border-derma-gold'
                              : 'bg-white border border-[#DDD3BF] text-[#111817] placeholder-[#8F9E96] focus:border-derma-sage'
                          }`}
                        />
                      </div>
                    </div>

                    <div
                      className={`p-3.5 rounded-xl text-xs flex items-center gap-2.5 border transition-colors ${
                        isDark
                          ? 'bg-white/5 border-white/10 text-derma-muted'
                          : 'bg-[#F1ECE1] border-[#DDD3BF] text-[#46544D]'
                      }`}
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>Protected by 256-bit AES HIPAA encryption. Medical records remain confidential.</span>
                    </div>

                    <div className="pt-4 flex flex-col-reverse sm:flex-row sm:justify-between items-stretch sm:items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className={`px-5 py-2.5 rounded-full text-xs font-medium transition-colors text-center ${
                          isDark ? 'text-white/70 hover:text-white' : 'text-[#5C6C63] hover:text-[#111817]'
                        }`}
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        className="btn-shimmer-sweep inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-derma-sage via-derma-sage-light to-derma-sage border border-derma-gold/50 shadow-lg"
                      >
                        <CheckCircle2 className="w-4 h-4 text-derma-gold" />
                        <span>Confirm & Book Appointment</span>
                      </button>
                    </div>
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
