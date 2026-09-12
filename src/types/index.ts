export interface CarouselSlide {
  id: number;
  image: string;
  tagline: string;
  subtitle: string;
  focusPoint?: string;
}

export interface SkinConcern {
  id: string;
  name: string;
  category: 'Acne & Blemishes' | 'Pigmentation' | 'Aging & Texture' | 'Sensitivity & Barrier';
  tag: string;
  summary: string;
  symptoms: string[];
  causes: string[];
  recommendedActives: {
    name: string;
    description: string;
  }[];
  dermatologistTip: string;
  severityGuide: string;
  colorTheme: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  activeIngredients: string[];
  targetConcerns: string[];
  skinTypes: string[];
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  clinicalNote: string;
  badges: string[];
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  credentials: string;
  specialty: string;
  experienceYears: number;
  clinic: string;
  location: string;
  rating: number;
  consultationFee: number;
  nextAvailable: string;
  avatar: string;
  languages: string[];
  bio: string;
}

export interface BookingFormData {
  concernId: string;
  doctorId: string;
  date: string;
  timeSlot: string;
  consultationType: 'telehealth' | 'in-clinic';
  fullName: string;
  email: string;
  phone: string;
  notes: string;
}
