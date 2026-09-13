import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Provider } from '../types';
import {
  X,
  ShieldCheck,
  CheckCircle,
  Clock,
  Briefcase,
  Users,
  MapPin,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface FairMatchModalProps {
  provider: Provider | null;
  onClose: () => void;
  onSelectBook?: (provider: Provider) => void;
}

export const FairMatchModal: React.FC<FairMatchModalProps> = ({ provider, onClose, onSelectBook }) => {
  const [simulationMode, setSimulationMode] = useState<'balanced' | 'proximity' | 'fairness'>('balanced');

  if (!provider) return null;

  const fm = provider.fairMatch;

  const getSimulatedScore = () => {
    if (simulationMode === 'proximity') {
      return Math.min(99, Math.round(fm.proximity * 0.45 + fm.skillMatch * 0.35 + fm.reliability * 0.2));
    }
    if (simulationMode === 'fairness') {
      return Math.min(99, Math.round(fm.opportunityFairness * 0.45 + fm.currentWorkload * 0.25 + fm.skillMatch * 0.3));
    }
    return fm.overall;
  };

  const currentScore = getSimulatedScore();

  const factors = [
    { label: 'SKILL', value: fm.skillMatch, note: 'ITI Trade Certification & Specialized Tooling Suitability' },
    { label: 'DISTANCE', value: fm.proximity, note: `${provider.distanceKm} km transit radius via low-carbon routing` },
    { label: 'AVAILABILITY', value: fm.availability, note: 'Direct slot match today without delayed customer wait' },
    { label: 'RELIABILITY', value: fm.reliability, note: `${provider.repeatCustomerRate}% repeat clients across ${provider.completedJobs} jobs` },
    { label: 'WORKLOAD', value: fm.currentWorkload, note: `${provider.recentWorkload} - protects worker from fatigue` },
    { label: 'OPPORTUNITY', value: fm.opportunityFairness, note: 'Rotates requests to prevent monopoly crowding' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto font-mono-code">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Modal Window: Dark Immersive Decision Engine */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0A0A0A] border border-white/20 text-[#F5F5F2] shadow-2xl p-4 sm:p-8 md:p-10 my-8 z-10 space-y-6 sm:space-y-8"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-2 text-[11px] text-[#CCFF00] font-bold uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
                <span>FAIRMATCH™ DECISION ENGINE</span>
                <span className="text-white/30">/</span>
                <span>OPEN ALGORITHMIC AUDIT</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-white mt-1">
                TRANSPARENT MATCH TELEMETRY
              </h2>
              <div className="text-xs text-white/60 font-sans mt-0.5">
                Target Professional: <span className="text-white font-bold">{provider.businessName}</span> ({provider.professionalName})
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-white/60 hover:text-white border border-white/15 hover:border-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Central Decision Engine Visualization */}
          <div className="bg-[#121212] border border-white/15 p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Massive Center Score Stamp */}
              <div className="lg:col-span-4 text-center lg:text-left space-y-2 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-6">
                <div className="text-[10px] text-white/40 uppercase tracking-widest">
                  ALGORITHMIC SCORE
                </div>
                <div className="text-7xl sm:text-8xl font-black font-display tracking-tighter text-[#CCFF00] leading-none">
                  {currentScore}
                </div>
                <div className="text-sm font-black font-display uppercase text-white tracking-wide">
                  FAIRMATCH
                </div>
                <div className="text-[10px] text-white/50 pt-1">
                  Engine Mode: <span className="text-white uppercase font-bold">{simulationMode}</span>
                </div>
              </div>

              {/* Connecting Factors Matrix */}
              <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-3 text-left">
                {factors.map((f, i) => (
                  <div key={i} className="p-3 bg-black/60 border border-white/10 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[10px] text-white/50 uppercase">{f.label}</span>
                      <span className="font-bold text-[#CCFF00]">{f.value}</span>
                    </div>
                    <div className="text-[10px] text-white/70 font-sans leading-tight line-clamp-2">
                      {f.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mode Simulator Selector */}
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="text-[11px] text-white/60 uppercase">Experiment with Weights:</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSimulationMode('balanced')}
                  className={`px-3 py-1 text-[11px] uppercase tracking-wider border transition ${
                    simulationMode === 'balanced'
                      ? 'bg-white text-black font-bold border-white'
                      : 'bg-white/5 text-white/70 border-white/10'
                  }`}
                >
                  Balanced (Default)
                </button>
                <button
                  onClick={() => setSimulationMode('proximity')}
                  className={`px-3 py-1 text-[11px] uppercase tracking-wider border transition ${
                    simulationMode === 'proximity'
                      ? 'bg-white text-black font-bold border-white'
                      : 'bg-white/5 text-white/70 border-white/10'
                  }`}
                >
                  Proximity Priority
                </button>
                <button
                  onClick={() => setSimulationMode('fairness')}
                  className={`px-3 py-1 text-[11px] uppercase tracking-wider border transition ${
                    simulationMode === 'fairness'
                      ? 'bg-white text-black font-bold border-white'
                      : 'bg-white/5 text-white/70 border-white/10'
                  }`}
                >
                  Fair Rotation
                </button>
              </div>
            </div>
          </div>

          {/* Transparent Guarantees: Why FairMatch is Fair */}
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-widest text-[#CCFF00] font-bold">
              THE 4 ANTI-EXTRACTIVE GUARANTEES
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-sans">
              <div className="p-3.5 bg-white/5 border border-white/10 space-y-1">
                <div className="font-bold text-white uppercase font-mono-code text-[11px]">
                  01. ZERO PAID ADVERTISING
                </div>
                <div className="text-white/70 text-xs">
                  Providers cannot pay CoServe to jump ahead of more skilled or closer local craftspeople.
                </div>
              </div>
              <div className="p-3.5 bg-white/5 border border-white/10 space-y-1">
                <div className="font-bold text-white uppercase font-mono-code text-[11px]">
                  02. NO PREDATORY BIDDING WARS
                </div>
                <div className="text-white/70 text-xs">
                  Fixed transparent tariffs protect skilled workers from race-to-the-bottom undercut bidding.
                </div>
              </div>
              <div className="p-3.5 bg-white/5 border border-white/10 space-y-1">
                <div className="font-bold text-white uppercase font-mono-code text-[11px]">
                  03. ANTI-MONOPOLY WORK ROTATION
                </div>
                <div className="text-white/70 text-xs">
                  Guarantees qualified apprentices and secondary micro-enterprises receive steady neighborhood dispatches.
                </div>
              </div>
              <div className="p-3.5 bg-white/5 border border-white/10 space-y-1">
                <div className="font-bold text-white uppercase font-mono-code text-[11px]">
                  04. PREVENTS WORKER BURNOUT
                </div>
                <div className="text-white/70 text-xs">
                  Incorporates rest intervals and recent job volume into match calculations so quality never slips.
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div className="text-xs text-white/50 text-center sm:text-left">
              Audit Hash: <span className="font-mono-code text-white">SHA256-FM93-CHENNAI</span>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 text-xs text-white/70 hover:text-white uppercase tracking-wider text-center"
              >
                Close Audit
              </button>
              {onSelectBook && (
                <button
                  onClick={() => {
                    onClose();
                    onSelectBook(provider);
                  }}
                  className="px-6 py-3 bg-[#CCFF00] hover:bg-[#D4FF00] text-[#0A0A0A] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg"
                >
                  <span>Proceed to Book (₹{provider.startingPrice})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
