import React from 'react';
import { Provider } from '../types';
import {
  ShieldCheck,
  Award,
  ArrowRight,
  Star,
  MapPin,
  Clock,
  Sparkles,
} from 'lucide-react';

interface ProviderCardProps {
  provider: Provider;
  onWhyMatch: (provider: Provider) => void;
  onBook: (provider: Provider) => void;
  onViewProfile: (provider: Provider) => void;
  isMainDemo?: boolean;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({
  provider,
  onWhyMatch,
  onBook,
  onViewProfile,
  isMainDemo = false,
}) => {
  return (
    <div
      className={`border transition-all duration-200 font-mono-code relative flex flex-col justify-between ${
        isMainDemo
          ? 'bg-[#0A0A0A] text-[#F5F5F2] border-[#CCFF00] sm:col-span-2 p-6 sm:p-8'
          : 'bg-white text-[#0A0A0A] border-black/15 hover:border-black p-5 sm:p-6'
      }`}
    >
      {/* Top Banner if main match */}
      {isMainDemo && (
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/15 text-xs">
          <div className="flex items-center gap-2 text-[#CCFF00] font-bold uppercase tracking-wider text-[11px]">
            <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
            <span>TOP FAIRMATCH™ RECOMMENDATION</span>
          </div>
          <span className="text-white/60 text-[11px]">OPTIMAL NEIGHBOURHOOD ROUTE</span>
        </div>
      )}

      {/* Main Body */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 font-bold ${
                isMainDemo ? 'bg-white/10 text-[#CCFF00]' : 'bg-black/5 text-black'
              }`}>
                {provider.category}
              </span>
              <span className={`text-[10px] uppercase tracking-wider ${
                isMainDemo ? 'text-white/50' : 'text-black/50'
              }`}>
                {provider.location} • {provider.distanceKm} km
              </span>
            </div>

            <h3
              onClick={() => onViewProfile(provider)}
              className={`text-2xl sm:text-3xl font-black font-display uppercase tracking-tight mt-2 cursor-pointer hover:underline ${
                isMainDemo ? 'text-white' : 'text-black'
              }`}
            >
              {provider.businessName}
            </h3>

            <div className={`text-xs font-sans mt-0.5 ${isMainDemo ? 'text-white/70' : 'text-black/70'}`}>
              Lead Master: <span className="font-bold">{provider.professionalName || 'Certified Professional'}</span> ({provider.experienceYears ?? (provider as any).yearsExperience ?? 5}+ yrs exp)
            </div>
          </div>

          {/* Large Match Score Stamp */}
          <div className="text-right shrink-0">
            <button
              onClick={() => onWhyMatch(provider)}
              title="Inspect transparent matching algorithm weights"
              className={`text-right group cursor-pointer`}
            >
              <div className={`text-3xl sm:text-4xl font-black font-display tracking-tight leading-none ${
                isMainDemo ? 'text-[#CCFF00]' : 'text-black'
              }`}>
                {provider.fairMatch?.overall ?? 90}%
              </div>
              <div className={`text-[9px] uppercase tracking-widest mt-0.5 underline ${
                isMainDemo ? 'text-white/60 group-hover:text-white' : 'text-black/60 group-hover:text-black'
              }`}>
                FAIRMATCH ↗
              </div>
            </button>
          </div>
        </div>

        {/* Verification Seals */}
        <div className="flex items-center gap-2 flex-wrap pt-1 text-[10px]">
          {provider.badges?.identityVerified && (
            <span className={`flex items-center gap-1 px-2 py-0.5 border ${
              isMainDemo ? 'border-white/20 text-white/80' : 'border-black/15 text-black/80'
            }`}>
              <ShieldCheck className="w-3 h-3 text-[#CCFF00]" />
              ID Vetted
            </span>
          )}
          {provider.badges?.skillVerified && (
            <span className={`flex items-center gap-1 px-2 py-0.5 border ${
              isMainDemo ? 'border-white/20 text-white/80' : 'border-black/15 text-black/80'
            }`}>
              <Award className="w-3 h-3 text-[#CCFF00]" />
              Skill Certified
            </span>
          )}
          {provider.badges?.cooperativeMember && (
            <span className={`flex items-center gap-1 px-2 py-0.5 border ${
              isMainDemo ? 'border-[#CCFF00]/40 text-[#CCFF00]' : 'border-black/20 text-black font-bold'
            }`}>
              Co-op Guild Member
            </span>
          )}
        </div>

        {/* Services List Tagged */}
        <div className="pt-2">
          <div className={`text-[10px] uppercase tracking-wider mb-1.5 ${
            isMainDemo ? 'text-white/40' : 'text-black/40'
          }`}>
            Core Service Offerings
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {(provider.serviceTypes ?? []).map((st, i) => (
              <span
                key={i}
                className={`text-[11px] px-2 py-1 border ${
                  isMainDemo
                    ? 'bg-white/5 border-white/10 text-white/90'
                    : 'bg-black/5 border-black/10 text-black/90'
                }`}
              >
                {st}
              </span>
            ))}
          </div>
        </div>

        {/* Vital Metrics Matrix */}
        <div className={`grid grid-cols-3 gap-1 sm:gap-2 p-2 sm:p-3 text-[11px] sm:text-xs border ${
          isMainDemo ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
        }`}>
          <div>
            <div className={`text-[9px] sm:text-[10px] uppercase ${isMainDemo ? 'text-white/40' : 'text-black/40'}`}>
              RATING
            </div>
            <div className="font-bold mt-0.5 text-xs sm:text-sm">★ {provider.rating ?? 4.8} ({provider.reviewCount ?? 20})</div>
          </div>
          <div>
            <div className={`text-[9px] sm:text-[10px] uppercase ${isMainDemo ? 'text-white/40' : 'text-black/40'}`}>
              REPEAT RATE
            </div>
            <div className="font-bold mt-0.5 text-xs sm:text-sm">{provider.repeatCustomerRate ?? (provider as any).metrics?.repeatCustomerRate ?? 92}%</div>
          </div>
          <div>
            <div className={`text-[9px] sm:text-[10px] uppercase ${isMainDemo ? 'text-white/40' : 'text-black/40'}`}>
              JOBS DONE
            </div>
            <div className="font-bold mt-0.5 text-xs sm:text-sm">{provider.completedJobs ?? (provider as any).metrics?.completedJobsCount ?? 120}</div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 mt-6 border-t ${
        isMainDemo ? 'border-white/15' : 'border-black/15'
      }`}>
        <div className="flex sm:flex-col justify-between items-baseline sm:items-start">
          <div className={`text-[10px] uppercase ${isMainDemo ? 'text-white/40' : 'text-black/40'}`}>
            DIRECT TARIFF
          </div>
          <div className="text-xl sm:text-2xl font-bold font-display leading-none mt-0.5">
            ₹{provider.startingPrice}+
          </div>
          <div className="text-[9px] text-emerald-600 sm:text-[#CCFF00] font-bold mt-0.5">
            100% TO WORKER
          </div>
        </div>

        <div className="grid grid-cols-2 sm:flex sm:items-center gap-2">
          <button
            onClick={() => onViewProfile(provider)}
            className={`w-full sm:w-auto px-3.5 py-2.5 sm:py-2 text-xs uppercase tracking-wider border transition text-center ${
              isMainDemo
                ? 'border-white/20 text-white hover:bg-white/10'
                : 'border-black/20 text-black hover:bg-black/5'
            }`}
          >
            Portfolio
          </button>
          <button
            onClick={() => onBook(provider)}
            className={`w-full sm:w-auto px-4 py-2.5 sm:py-2 text-xs uppercase tracking-wider font-bold transition flex items-center justify-center gap-1.5 ${
              isMainDemo
                ? 'bg-[#CCFF00] hover:bg-[#D4FF00] text-[#0A0A0A]'
                : 'bg-black hover:bg-neutral-800 text-white'
            }`}
          >
            <span>Book Visit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
