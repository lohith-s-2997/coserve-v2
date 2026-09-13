import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import {
  Wrench,
  Sparkles,
  Scissors,
  Bike,
  GraduationCap,
  Package,
  ArrowRight,
  Check,
} from 'lucide-react';

interface CatalogSection {
  id: string;
  code: string;
  group: string;
  headline: string;
  sub: string;
  icon: React.ComponentType<{ className?: string }>;
  services: { name: string; estimate: string; duration: string }[];
  categoryKey: string;
}

const SECTIONS: CatalogSection[] = [
  {
    id: 'home',
    code: '01',
    group: 'HOME',
    headline: 'Structural & Mechanical Trades',
    sub: 'Plumbing, electrical wiring, AC diagnostics, custom carpentry, wall waterproofing & appliance repairs.',
    icon: Wrench,
    categoryKey: 'Home Repair & Maintenance',
    services: [
      { name: 'AC Service & Jet Clean', estimate: '₹500+', duration: '60 min' },
      { name: 'Plumbing & Pipe Line Leak', estimate: '₹350+', duration: '45 min' },
      { name: 'Electrical & MCB Tripping', estimate: '₹400+', duration: '45 min' },
      { name: 'Carpentry & Cabinet Tuning', estimate: '₹450+', duration: '60 min' },
      { name: 'Wall Painting & Patchwork', estimate: '₹800+', duration: 'Half Day' },
      { name: 'Washing Machine / Refrigerator', estimate: '₹450+', duration: '60 min' },
    ],
  },
  {
    id: 'care',
    code: '02',
    group: 'CARE',
    headline: 'Hygiene & Property Preservation',
    sub: 'Full home deep sanitization, eco-friendly pest control, lawn restoration and balcony gardening.',
    icon: Sparkles,
    categoryKey: 'Cleaning & Home Care',
    services: [
      { name: 'Full Home Deep Sanitization', estimate: '₹850+', duration: '120 min' },
      { name: 'Kitchen Degreasing & Hood Clean', estimate: '₹650+', duration: '90 min' },
      { name: 'Anti-Microbial Bathroom Wash', estimate: '₹450+', duration: '45 min' },
      { name: 'Organic Pest & Termite Control', estimate: '₹750+', duration: '60 min' },
      { name: 'Balcony & Garden Landscaping', estimate: '₹500+', duration: '90 min' },
    ],
  },
  {
    id: 'personal',
    code: '03',
    group: 'PERSONAL',
    headline: 'Wellness & Doorstep Grooming',
    sub: 'Certified cosmetologists, organic facials, bridal preparation, haircutting, and spa massages at home.',
    icon: Scissors,
    categoryKey: 'Personal Care at Home',
    services: [
      { name: 'Herbal & Hydra Facial', estimate: '₹750+', duration: '60 min' },
      { name: 'Doorstep Salon & Waxing', estimate: '₹500+', duration: '60 min' },
      { name: 'Men’s Grooming & Beard Sculpt', estimate: '₹350+', duration: '40 min' },
      { name: 'Aroma Therapy & Scalp Massage', estimate: '₹800+', duration: '60 min' },
    ],
  },
  {
    id: 'mobility',
    code: '04',
    group: 'MOBILITY',
    headline: 'Urban Vehicle Assistance',
    sub: 'On-demand doorstep motorcycle repairs, tubeless puncture fixes, engine oil servicing, and jumpstarts.',
    icon: Bike,
    categoryKey: 'Mobility & Vehicle Help',
    services: [
      { name: 'Doorstep Two-Wheeler Service', estimate: '₹450+', duration: '60 min' },
      { name: 'Emergency Tubeless Puncture', estimate: '₹250+', duration: '20 min' },
      { name: 'Brake Pad & Chain Tuning', estimate: '₹350+', duration: '45 min' },
      { name: 'Mobile Mechanic Diagnostics', estimate: '₹350+', duration: '30 min' },
    ],
  },
  {
    id: 'learning',
    code: '05',
    group: 'LEARNING',
    headline: 'Knowledge & Digital Literacy',
    sub: 'One-on-one academic tutoring, elder smartphone guidance, Wi-Fi router setup, and computer troubleshooting.',
    icon: GraduationCap,
    categoryKey: 'Learning & Digital Skills',
    services: [
      { name: 'K-12 Subject Mentorship', estimate: '₹400/hr', duration: '60 min' },
      { name: 'Elder Digital & UPI Guidance', estimate: '₹300+', duration: '60 min' },
      { name: 'Home Wi-Fi & PC Setup', estimate: '₹400+', duration: '45 min' },
    ],
  },
  {
    id: 'specialized',
    code: '06',
    group: 'SPECIALIZED',
    headline: 'Community & Event Support',
    sub: 'Compassionate pet walking, electronics restoration, small event audio/visual setup, and furniture assembly.',
    icon: Package,
    categoryKey: 'Specialized Community Support',
    services: [
      { name: 'Pet Care & Walking Routine', estimate: '₹300/walk', duration: '45 min' },
      { name: 'Audio/Lighting Event Setup', estimate: '₹1,200+', duration: '180 min' },
      { name: 'Smartphone & Gadget Repair', estimate: '₹450+', duration: '60 min' },
    ],
  },
];

export const ServiceUniverse: React.FC = () => {
  const { setSelectedCategoryFilter, navigate } = useApp();
  const [selectedSectionId, setSelectedSectionId] = useState<string>('home');

  const currentSection = SECTIONS.find((s) => s.id === selectedSectionId) || SECTIONS[0];

  const handleOpenDiscovery = (categoryKey: string) => {
    setSelectedCategoryFilter(categoryKey);
    navigate('/services');
  };

  return (
    <div className="w-full bg-[#0A0A0A] text-[#F5F5F2] py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10 font-mono-code">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/15">
          <div>
            <div className="text-[#CCFF00] text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <span>VERIFIED SERVICE CATALOG</span>
              <span>•</span>
              <span>100% SERVICE-BASED INFRASTRUCTURE</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black font-display text-white tracking-tight uppercase mt-2">
              THE SERVICE UNIVERSE.
            </h2>
          </div>
          <p className="text-white/60 text-xs max-w-md font-sans leading-relaxed">
            From technical refrigeration to doorstep wellness and emergency puncture resuscitation — all fulfilled by
            vetted, independent neighbourhood micro-enterprises.
          </p>
        </div>

        {/* Category Horizontal Selector (Tab Array) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {SECTIONS.map((sec) => {
            const isSelected = sec.id === selectedSectionId;
            const Icon = sec.icon;
            return (
              <button
                key={sec.id}
                onClick={() => setSelectedSectionId(sec.id)}
                className={`p-4 text-left border transition-all ${
                  isSelected
                    ? 'bg-[#F5F5F2] text-[#0A0A0A] border-[#F5F5F2]'
                    : 'bg-[#121212] text-white/70 hover:text-white border-white/10 hover:border-white/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-bold ${isSelected ? 'text-[#0A0A0A]' : 'text-[#CCFF00]'}`}>
                    {sec.code}
                  </span>
                  <Icon className="w-4 h-4 opacity-70" />
                </div>
                <div className="text-base font-display font-black tracking-tight uppercase mt-3">
                  {sec.group}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Category Reveal Panel (High Contrast Editorial Architecture) */}
        <div className="border border-white/15 bg-[#121212] p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left metadata column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-block text-[11px] text-[#CCFF00] border border-[#CCFF00]/40 px-2 py-0.5 uppercase tracking-wider">
                CATEGORY {currentSection.code} • {currentSection.group}
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight">
                {currentSection.headline}
              </h3>
              <p className="text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
                {currentSection.sub}
              </p>

              <div className="pt-4">
                <button
                  onClick={() => handleOpenDiscovery(currentSection.categoryKey)}
                  className="px-6 py-3 bg-[#CCFF00] hover:bg-[#D4FF00] text-[#0A0A0A] text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition"
                >
                  <span>Explore All {currentSection.group} Pros</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: Concrete service tariff matrix */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentSection.services.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleOpenDiscovery(currentSection.categoryKey)}
                  className="p-4 bg-black/50 border border-white/10 hover:border-[#CCFF00]/60 transition cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-white group-hover:text-[#CCFF00] transition-colors">
                    <span className="text-xs font-bold font-sans">{item.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-white/50 mt-3 pt-2 border-t border-white/10 font-mono-code">
                    <span>Est: {item.estimate}</span>
                    <span>{item.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
