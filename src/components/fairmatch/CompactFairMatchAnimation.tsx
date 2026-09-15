import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Zap,
  MapPin,
  Clock,
  ShieldCheck,
  Scale,
  Award,
  FastForward,
  Check,
  Layers,
  ArrowDown,
} from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

interface CompactFairMatchAnimationProps {
  jobName: string;
  categoryName: string;
  tariff: number;
  onComplete: () => void;
}

export const CompactFairMatchAnimation: React.FC<CompactFairMatchAnimationProps> = ({
  jobName,
  categoryName,
  tariff,
  onComplete,
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [activeStage, setActiveStage] = useState<number>(1); // 1: Request, 2: Core, 3: Criteria, 4: Top Matches

  useEffect(() => {
    const startTime = Date.now();
    const duration = 5000; // 5.0 seconds total

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed < 1200) {
        setActiveStage(1);
      } else if (elapsed < 2400) {
        setActiveStage(2);
      } else if (elapsed < 4000) {
        setActiveStage(3);
      } else {
        setActiveStage(4);
      }

      if (elapsed >= duration) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 300);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  const criteria = [
    { label: 'Skill Match', weight: '25%', icon: Award, score: 100 },
    { label: 'Proximity', weight: '20%', icon: MapPin, score: 94 },
    { label: 'Availability', weight: '20%', icon: Clock, score: 100 },
    { label: 'Reliability', weight: '15%', icon: ShieldCheck, score: 91 },
    { label: 'Workload', weight: '10%', icon: Scale, score: 84 },
    { label: 'Opportunity Fairness', weight: '10%', icon: Sparkles, score: 89 },
  ];

  return (
    <div className="relative w-full bg-[#0E0E0E] border border-white/15 p-5 sm:p-7 space-y-6 font-mono-code text-[#F5F5F2] overflow-hidden">
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #CCFF00 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Header & Skip Action */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] text-[#CCFF00] font-bold uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-ping" />
            <span>FINDING YOUR BEST PROFESSIONALS...</span>
          </div>
          <h3 className="text-xl font-black font-display uppercase tracking-tight text-white">
            Calculating FairMatch for {jobName}
          </h3>
          <p className="text-xs text-white/60 font-sans">
            Evaluating active qualified local professionals via explainable weighted matching.
          </p>
        </div>

        <button
          type="button"
          onClick={onComplete}
          className="px-3.5 py-2 bg-white/10 hover:bg-[#CCFF00] hover:text-black border border-white/20 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition cursor-pointer shrink-0"
        >
          <FastForward className="w-3.5 h-3.5" />
          <span>Skip Animation</span>
        </button>
      </div>

      {/* Overall Progress Meter */}
      <div className="relative z-10 space-y-1.5">
        <div className="flex justify-between text-[11px]">
          <span className="text-white/60 uppercase">
            {activeStage === 1 && '1/4 Ingesting Customer Service Request...'}
            {activeStage === 2 && '2/4 Scanning Local Ward 102 Guild Pool...'}
            {activeStage === 3 && '3/4 Evaluating 6 Ethical Weighted Criteria...'}
            {activeStage === 4 && '4/4 Locking Top 3 Ranked Matches...'}
          </span>
          <span className="text-[#CCFF00] font-bold">{progress}% COMPLETE</span>
        </div>
        <div className="w-full h-1.5 bg-white/10 overflow-hidden">
          <motion.div
            className="h-full bg-[#CCFF00]"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'linear' }}
          />
        </div>
      </div>

      {/* Main Multi-Stage Visual Pipeline */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
        {/* Step 1: Customer Request */}
        <div
          className={`p-4 border transition-all ${
            activeStage >= 1
              ? 'bg-[#141414] border-[#CCFF00]/50 shadow-[0_0_15px_rgba(204,255,0,0.1)]'
              : 'bg-white/5 border-white/10 opacity-50'
          }`}
        >
          <div className="text-[10px] text-white/50 uppercase tracking-wider flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]" />
            <span>CUSTOMER REQUEST</span>
          </div>
          <div className="text-sm font-black font-display uppercase text-white mt-1">
            {jobName}
          </div>
          <div className="text-xs text-white/60 mt-1 font-sans">
            Tariff: <span className="text-[#CCFF00] font-bold">₹{tariff}</span> • Anna Nagar
          </div>
          <div className="mt-3 flex items-center gap-1 text-[10px] text-[#CCFF00] font-bold">
            <Check className="w-3 h-3 stroke-[3]" />
            <span>Request Ingested</span>
          </div>
        </div>

        {/* Step 2: ✦ FairMatch Engine */}
        <div
          className={`p-4 border transition-all ${
            activeStage >= 2
              ? 'bg-[#141414] border-[#CCFF00] shadow-[0_0_15px_rgba(204,255,0,0.15)]'
              : 'bg-white/5 border-white/10 opacity-50'
          }`}
        >
          <div className="text-[10px] text-[#CCFF00] uppercase tracking-wider font-bold flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>✦ FAIRMATCH ENGINE</span>
          </div>
          <div className="text-sm font-black font-display uppercase text-white mt-1">
            Multi-Criteria Audit
          </div>
          <div className="text-xs text-white/60 mt-1 font-sans">
            Ward 102 Cluster • 8 Artisans
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[10px]">
            <span
              className={`w-2 h-2 rounded-full ${
                activeStage === 2 ? 'bg-[#CCFF00] animate-ping' : 'bg-[#CCFF00]'
              }`}
            />
            <span className="text-[#CCFF00] font-bold">
              {activeStage >= 2 ? 'Weighted Processing' : 'Standby'}
            </span>
          </div>
        </div>

        {/* Step 3: Six Criteria Matrix */}
        <div
          className={`p-4 border md:col-span-1 transition-all ${
            activeStage >= 3
              ? 'bg-[#141414] border-[#CCFF00]/50 shadow-[0_0_15px_rgba(204,255,0,0.1)]'
              : 'bg-white/5 border-white/10 opacity-50'
          }`}
        >
          <div className="text-[10px] text-white/50 uppercase tracking-wider flex items-center gap-1">
            <Scale className="w-3 h-3 text-[#CCFF00]" />
            <span>6-CRITERIA SCAN</span>
          </div>
          <div className="text-sm font-black font-display uppercase text-white mt-1">
            Ethical Balance
          </div>
          <div className="text-xs text-white/60 mt-1 font-sans">
            Zero ad priority • Anti-fatigue
          </div>
          <div className="mt-3 text-[10px] text-[#CCFF00] font-bold">
            {activeStage >= 3 ? 'Scores Calculated' : 'Queued'}
          </div>
        </div>

        {/* Step 4: Top Matches */}
        <div
          className={`p-4 border transition-all ${
            activeStage >= 4
              ? 'bg-[#141414] border-[#CCFF00] shadow-[0_0_20px_rgba(204,255,0,0.2)]'
              : 'bg-white/5 border-white/10 opacity-50'
          }`}
        >
          <div className="text-[10px] text-[#CCFF00] uppercase tracking-wider font-bold flex items-center gap-1">
            <Award className="w-3 h-3" />
            <span>TOP MATCHES</span>
          </div>
          <div className="text-sm font-black font-display uppercase text-white mt-1">
            Top 3 Ranked
          </div>
          <div className="text-xs text-white/60 mt-1 font-sans">
            Rank #1 Best Match Locked
          </div>
          <div className="mt-3 flex items-center gap-1 text-[10px] text-[#CCFF00] font-bold">
            <Check className="w-3 h-3 stroke-[3]" />
            <span>Recommendation Ready</span>
          </div>
        </div>
      </div>

      {/* Criteria Breakdown Grid with Live Pulsing Elements */}
      <div className="relative z-10 bg-black/40 border border-white/10 p-4 space-y-3">
        <div className="flex items-center justify-between text-[11px] text-white/60 border-b border-white/10 pb-2">
          <span className="uppercase text-[#CCFF00] font-bold">
            Live Criteria Audit Weight Distribution (100% Total)
          </span>
          <span className="text-white/40">Deterministic Algorithm</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {criteria.map((c, i) => {
            const IconComp = c.icon;
            const isAudited = activeStage >= 3 || progress > (i + 1) * 15;
            return (
              <div
                key={c.label}
                className={`p-2.5 border transition-all flex items-center justify-between ${
                  isAudited
                    ? 'bg-white/5 border-[#CCFF00]/40 text-white'
                    : 'bg-white/2 border-white/5 text-white/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <IconComp
                    className={`w-3.5 h-3.5 ${
                      isAudited ? 'text-[#CCFF00]' : 'text-white/30'
                    }`}
                  />
                  <div>
                    <div className="text-[11px] font-bold uppercase leading-tight">
                      {c.label}
                    </div>
                    <div className="text-[9px] text-white/50">Weight: {c.weight}</div>
                  </div>
                </div>
                <div className="text-right font-mono-code">
                  <span
                    className={`text-xs font-bold ${
                      isAudited ? 'text-[#CCFF00]' : 'text-white/20'
                    }`}
                  >
                    {isAudited ? `${c.score}%` : '—'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
