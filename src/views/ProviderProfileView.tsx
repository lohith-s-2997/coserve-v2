import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Provider } from '../types';
import {
  ShieldCheck,
  Award,
  Users2,
  Star,
  MapPin,
  Clock,
  Sparkles,
  ArrowLeft,
  Check,
  Phone,
  Wrench,
  ChevronRight,
} from 'lucide-react';

export const ProviderProfileView: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const {
    selectedProvider,
    setSelectedProvider,
    providers,
    setBookingModalProvider,
    setFairMatchModalProvider,
    goBack,
  } = useApp();

  const provider: Provider =
    (id ? providers.find((p) => p.id === id) : null) ||
    selectedProvider ||
    providers.find((p) => p.id === 'prov-arjun-ac') ||
    providers[0];

  useEffect(() => {
    if (provider && (!selectedProvider || selectedProvider.id !== provider.id)) {
      setSelectedProvider(provider);
    }
  }, [provider, selectedProvider, setSelectedProvider]);

  return (
    <div className="w-full bg-[#F5F5F2] text-[#0A0A0A] font-mono-code min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Navigation Breadcrumb */}
        <button
          onClick={() => goBack()}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black/60 hover:text-black transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return</span>
        </button>

        {/* Hero Header: Serious Local Business & Master Portfolio */}
        <div className="bg-[#0A0A0A] text-[#F5F5F2] border border-black p-6 sm:p-12 space-y-8">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-white/15 pb-8">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[11px] text-[#CCFF00] font-bold uppercase tracking-widest">
                <span>VERIFIED MICRO-BUSINESS</span>
                <span>•</span>
                <span>{provider.category.toUpperCase()}</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-black font-display text-white uppercase tracking-tight leading-none">
                {provider.businessName}
              </h1>
              <div className="text-sm sm:text-base text-white/80 font-sans">
                Master Craftsman: <span className="font-bold text-white">{provider.professionalName}</span> ({provider.experienceYears}+ Years Certified Practice)
              </div>
              <div className="text-xs text-white/50 flex items-center gap-2 pt-1">
                <MapPin className="w-3.5 h-3.5 text-[#CCFF00]" />
                <span>Base: {provider.location} • {provider.serviceRadiusKm} km Direct Doorstep Radius</span>
              </div>
            </div>

            {/* Quick FairMatch & Direct Booking Block */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => setFairMatchModalProvider(provider)}
                className="w-full px-5 py-2.5 bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-bold uppercase tracking-wider text-white transition flex items-center justify-between gap-3"
              >
                <span>FairMatch Engine</span>
                <span className="text-[#CCFF00] font-bold font-display text-sm">{provider.fairMatch.overall}%</span>
              </button>
              <button
                onClick={() => setBookingModalProvider(provider)}
                className="w-full px-6 py-3 bg-[#CCFF00] hover:bg-[#D4FF00] text-[#0A0A0A] text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 text-center"
              >
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>Book Direct Visit (From ₹{provider.startingPrice})</span>
              </button>
            </div>
          </div>

          {/* Visual Statistics (Massive Numerals) */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="p-4 bg-white/5 border border-white/10">
              <div className="text-[10px] text-white/40 uppercase">COMMUNITY RATING</div>
              <div className="text-3xl sm:text-4xl font-black font-display text-white mt-1">
                {provider.rating} <span className="text-xs font-normal text-white/50 font-mono-code">/ 5.0</span>
              </div>
              <div className="text-[10px] text-white/60 mt-1">{provider.reviewCount} Verified Reviews</div>
            </div>

            <div className="p-4 bg-white/5 border border-white/10">
              <div className="text-[10px] text-white/40 uppercase">JOBS COMPLETED</div>
              <div className="text-3xl sm:text-4xl font-black font-display text-white mt-1">
                {provider.completedJobs}
              </div>
              <div className="text-[10px] text-white/60 mt-1">Zero Open Disputes</div>
            </div>

            <div className="p-4 bg-white/5 border border-white/10">
              <div className="text-[10px] text-white/40 uppercase">REPEAT RATE</div>
              <div className="text-3xl sm:text-4xl font-black font-display text-[#CCFF00] mt-1">
                {provider.repeatCustomerRate}%
              </div>
              <div className="text-[10px] text-white/60 mt-1">Direct Repeat Clients</div>
            </div>

            <div className="p-4 bg-white/5 border border-white/10">
              <div className="text-[10px] text-white/40 uppercase">SERVICE RANGE</div>
              <div className="text-3xl sm:text-4xl font-black font-display text-white mt-1">
                {provider.serviceRadiusKm} <span className="text-xs font-normal text-white/50 font-mono-code">KM</span>
              </div>
              <div className="text-[10px] text-white/60 mt-1">Direct Rapid Dispatch</div>
            </div>
          </div>

          {/* Cooperative Verification Seals */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs text-white/90 p-2.5 bg-white/5 border border-white/10">
              <ShieldCheck className="w-4 h-4 text-[#CCFF00] shrink-0" />
              <span>Identity Verified ✓</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/90 p-2.5 bg-white/5 border border-white/10">
              <Award className="w-4 h-4 text-[#CCFF00] shrink-0" />
              <span>Skill Certified ✓</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/90 p-2.5 bg-white/5 border border-white/10">
              <Users2 className="w-4 h-4 text-[#CCFF00] shrink-0" />
              <span>Cooperative Member ✓</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/90 p-2.5 bg-white/5 border border-white/10">
              <Wrench className="w-4 h-4 text-[#CCFF00] shrink-0" />
              <span>Equipment Verified ✓</span>
            </div>
          </div>
        </div>

        {/* Two-Column Business Details Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Service Menu & Fixed Pricing */}
          <div className="lg:col-span-8 space-y-8">
            {/* Service Menu */}
            <div className="bg-white border border-black/15 p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-black/10">
                <h2 className="text-2xl font-black font-display uppercase tracking-tight text-black">
                  SERVICE TARIFF MENU
                </h2>
                <span className="text-[10px] uppercase font-bold text-black/50">100% Direct Payout</span>
              </div>

              <div className="space-y-4">
                {provider.specializations.map((spec, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-black/5 border border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="text-base font-bold text-black font-sans">{spec}</div>
                      <div className="text-xs text-black/60 font-sans">
                        Full inspection, certified execution, and post-service warranty documentation.
                      </div>
                      <div className="text-[10px] text-black/40 font-mono-code">Est. Duration: 60-90 mins</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-2xl font-black font-display text-black">
                        ₹{provider.startingPrice + idx * 150}
                      </div>
                      <button
                        onClick={() => setBookingModalProvider(provider)}
                        className="mt-1 px-3 py-1 bg-black text-white text-[10px] uppercase font-bold tracking-wider hover:bg-neutral-800 transition"
                      >
                        Request
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cooperative Tool Pool Equipment Used */}
            <div className="bg-white border border-black/15 p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-black font-display uppercase tracking-tight text-black">
                COOPERATIVE GUILD TOOLS ACCESSED
              </h2>
              <p className="text-xs text-black/60 font-sans">
                Professional technicians maintain guild membership to access high-grade diagnostic and sanitization gear
                from the local ward tool library:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 bg-black/5 border border-black/10 text-xs">
                  <div className="font-bold text-black">Master Pressure Jet</div>
                  <div className="text-[10px] text-black/50 mt-0.5">140 Bar Coil Sanitizer</div>
                </div>
                <div className="p-3 bg-black/5 border border-black/10 text-xs">
                  <div className="font-bold text-black">Fluke Thermal Imager</div>
                  <div className="text-[10px] text-black/50 mt-0.5">Refrigerant Leak Radar</div>
                </div>
                <div className="p-3 bg-black/5 border border-black/10 text-xs">
                  <div className="font-bold text-black">Digital Gauge Manifold</div>
                  <div className="text-[10px] text-black/50 mt-0.5">Pressure & Micron Accuracy</div>
                </div>
              </div>
            </div>

            {/* Verified Community Reviews */}
            <div className="bg-white border border-black/15 p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-black/10">
                <h2 className="text-2xl font-black font-display uppercase tracking-tight text-black">
                  COMMUNITY REVIEWS ({provider.reviews.length})
                </h2>
                <div className="text-xs font-bold text-black">Verified In-Person Bookings</div>
              </div>

              <div className="space-y-4">
                {provider.reviews.map((rev) => (
                  <div key={rev.id} className="p-4 bg-black/5 border border-black/10 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-black">{rev.customerName}</div>
                      <div className="text-[10px] text-black/40">{rev.date}</div>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 text-xs">
                      {'★'.repeat(rev.rating)}
                    </div>
                    <p className="text-xs text-black/70 font-sans leading-relaxed">
                      "{rev.comment}"
                    </p>
                    <div className="text-[10px] text-black/50 pt-1 border-t border-black/10 flex items-center justify-between">
                      <span>Service: {rev.serviceType}</span>
                      <span className="text-black/70 font-bold">Verified Escrow Complete</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Direct Contact & Cooperative Micro-Enterprise Status */}
          <div className="lg:col-span-4 space-y-6">
            {/* Direct Contact Card */}
            <div className="bg-white border border-black/15 p-6 space-y-4">
              <h3 className="text-lg font-black font-display uppercase text-black">
                DIRECT CONTACT
              </h3>
              <div className="space-y-2 text-xs">
                <div className="text-black/50 uppercase text-[10px]">PHONE & WHATSAPP</div>
                <div className="font-bold text-black font-mono-code">+91 98401 22890</div>
                <div className="text-black/50 uppercase text-[10px] pt-2">DIRECT DISPATCH HOURS</div>
                <div className="font-bold text-black">08:00 AM – 08:30 PM (Mon–Sat)</div>
                <div className="text-black/50 uppercase text-[10px] pt-2">COOPERATIVE UNIT</div>
                <div className="font-bold text-black">{provider.cooperativeUnit}</div>
              </div>

              <button
                onClick={() => setBookingModalProvider(provider)}
                className="w-full mt-2 py-3 bg-[#0A0A0A] hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider transition"
              >
                Schedule Doorstep Service
              </button>
            </div>

            {/* Transparent Economic Model */}
            <div className="bg-[#0A0A0A] text-[#F5F5F2] p-6 border border-black space-y-3">
              <div className="text-[10px] text-[#CCFF00] font-bold uppercase tracking-widest">
                ZERO EXPLOITATION GUARANTEE
              </div>
              <h4 className="text-base font-bold font-display uppercase text-white">
                HOW YOUR PAYMENT WORKS
              </h4>
              <p className="text-xs text-white/70 font-sans leading-relaxed">
                When you pay ₹{provider.startingPrice}, 100% goes into {provider.professionalName}’s direct account.
                No 30% aggregator platform deduction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
