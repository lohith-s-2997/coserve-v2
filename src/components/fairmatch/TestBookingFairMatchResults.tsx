import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award,
  Check,
  ChevronDown,
  ChevronUp,
  MapPin,
  Star,
  Clock,
  Briefcase,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Scale,
} from 'lucide-react';
import { FairMatchBookingCandidate } from '../../data/fairMatchBookingData';
import { AnimatedCounter } from './AnimatedCounter';

interface TestBookingFairMatchResultsProps {
  candidates: FairMatchBookingCandidate[];
  jobName: string;
  tariff: number;
  onSelectCandidate: (candidate: FairMatchBookingCandidate) => void;
  onChangeJob: () => void;
  onReplayAnimation: () => void;
}

export const TestBookingFairMatchResults: React.FC<TestBookingFairMatchResultsProps> = ({
  candidates,
  jobName,
  tariff,
  onSelectCandidate,
  onChangeJob,
  onReplayAnimation,
}) => {
  // Track expanded factor breakdown per candidate
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [hasSettled, setHasSettled] = useState<boolean>(false);

  useEffect(() => {
    // Settle animation timing: allows cards to enter and settle
    const timer = setTimeout(() => {
      setHasSettled(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6 font-mono-code text-[#F5F5F2]">
      {/* Top Title & Subtitles */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] text-[#CCFF00] font-bold uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
            <span>TOP FAIRMATCH PROFESSIONALS</span>
          </div>
          <h3 className="text-2xl font-black font-display uppercase tracking-tight text-white mt-0.5">
            Ranked for {jobName}
          </h3>
          <div className="flex flex-wrap items-center gap-2 text-xs text-white/70 font-sans mt-1">
            <span className="text-[#CCFF00] font-bold">3 suitable professionals ranked</span>
            <span className="text-white/30">•</span>
            <span className="text-white/60">Every recommendation can be explained.</span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onChangeJob}
            className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-white/80 hover:text-white transition uppercase font-bold"
          >
            Change Job
          </button>
          <button
            type="button"
            onClick={onReplayAnimation}
            className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-white/80 hover:text-white flex items-center gap-1 transition uppercase font-bold"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Re-run</span>
          </button>
        </div>
      </div>

      {/* 3 Ranked Candidate Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
        {candidates.map((cand, index) => {
          const rankNum = index + 1;
          const isWinner = cand.isWinner;
          const isExpanded = expandedId === cand.id;

          return (
            <motion.div
              key={cand.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: isWinner && hasSettled ? 1.02 : 1,
              }}
              transition={{
                delay: index * 0.2,
                duration: 0.5,
                ease: 'easeOut',
              }}
              className={`relative flex flex-col justify-between border transition-all p-5 ${
                isWinner
                  ? 'bg-[#121212] border-[#CCFF00] shadow-[0_0_25px_rgba(204,255,0,0.15)] ring-1 ring-[#CCFF00]/40'
                  : 'bg-[#0E0E0E] border-white/15 hover:border-white/30'
              }`}
            >
              {/* Card Header Badge */}
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  {isWinner ? (
                    <span className="px-2 py-0.5 bg-[#CCFF00] text-black text-[10px] font-black uppercase tracking-wider flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      <span>#1 BEST MATCH</span>
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-white/10 text-white/80 text-[10px] font-bold uppercase tracking-wider">
                      #{rankNum} QUALIFIED
                    </span>
                  )}
                </div>

                <div className="text-right">
                  <div className="text-[9px] text-white/50 uppercase">MATCH SCORE</div>
                  <div
                    className={`text-xl font-black font-display ${
                      isWinner ? 'text-[#CCFF00]' : 'text-white'
                    }`}
                  >
                    <AnimatedCounter value={cand.scores.overall} suffix="%" duration={600} />
                  </div>
                </div>
              </div>

              {/* Artisan Profile Details */}
              <div className="py-4 space-y-3 flex-1">
                <div>
                  <h4 className="text-lg font-black font-display uppercase tracking-tight text-white">
                    {cand.name}
                  </h4>
                  <div className="text-xs font-bold text-[#CCFF00] uppercase mt-0.5">
                    {cand.business}
                  </div>
                  <div className="text-[11px] text-white/60 uppercase mt-0.5">
                    {cand.trade}
                  </div>
                </div>

                {/* Key Metrics Chips */}
                <div className="grid grid-cols-2 gap-2 text-xs font-sans pt-1">
                  <div className="flex items-center gap-1.5 text-white/80 bg-white/5 px-2.5 py-1.5 border border-white/10">
                    <MapPin className="w-3.5 h-3.5 text-[#CCFF00] shrink-0" />
                    <span>{cand.distanceKm} km</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/80 bg-white/5 px-2.5 py-1.5 border border-white/10">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-current shrink-0" />
                    <span>{cand.rating} ★</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/80 bg-white/5 px-2.5 py-1.5 border border-white/10">
                    <Clock className="w-3.5 h-3.5 text-[#CCFF00] shrink-0" />
                    <span className="truncate">{cand.availabilityText}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-white/80 bg-white/5 px-2.5 py-1.5 border border-white/10">
                    <Briefcase className="w-3.5 h-3.5 text-[#CCFF00] shrink-0" />
                    <span>{cand.completedJobs} jobs</span>
                  </div>
                </div>

                {/* Why This Match Summary */}
                <div className="pt-2">
                  <div className="text-[10px] text-white/40 uppercase font-bold">Why this match:</div>
                  <div className="text-xs text-white/75 font-sans mt-0.5 leading-relaxed">
                    {cand.whyMatchSummary}
                  </div>
                </div>

                {/* Collapsible Factor Breakdown ("Why this match?" expander) */}
                <div className="pt-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => toggleExpand(cand.id)}
                    className="w-full flex items-center justify-between text-[11px] text-[#CCFF00] hover:underline font-bold uppercase py-1"
                  >
                    <span>{isExpanded ? 'Hide Factor Breakdown' : 'Why this match? (Scores)'}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-3.5 h-3.5" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-2 pt-2 text-[11px] overflow-hidden"
                      >
                        <div className="flex justify-between items-center text-white/80">
                          <span className="text-white/50">Skill Match (25%)</span>
                          <span className="font-bold text-white">{cand.scores.skillMatch}</span>
                        </div>
                        <div className="flex justify-between items-center text-white/80">
                          <span className="text-white/50">Proximity (20%)</span>
                          <span className="font-bold text-white">{cand.scores.proximity}</span>
                        </div>
                        <div className="flex justify-between items-center text-white/80">
                          <span className="text-white/50">Availability (20%)</span>
                          <span className="font-bold text-white">{cand.scores.availability}</span>
                        </div>
                        <div className="flex justify-between items-center text-white/80">
                          <span className="text-white/50">Reliability (15%)</span>
                          <span className="font-bold text-white">{cand.scores.reliability}</span>
                        </div>
                        <div className="flex justify-between items-center text-white/80">
                          <span className="text-white/50">Workload (10%)</span>
                          <span className="font-bold text-white">{cand.scores.currentWorkload}</span>
                        </div>
                        <div className="flex justify-between items-center text-white/80">
                          <span className="text-white/50">Opportunity Fairness (10%)</span>
                          <span className="font-bold text-white">{cand.scores.opportunityFairness}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Action Button: Book Candidate */}
              <div className="pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => onSelectCandidate(cand)}
                  className={`w-full py-3 px-4 font-black uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition cursor-pointer ${
                    isWinner
                      ? 'bg-[#CCFF00] hover:bg-[#D4FF00] text-black shadow-lg hover:shadow-[0_0_15px_rgba(204,255,0,0.3)]'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  }`}
                >
                  <span>BOOK {cand.name.split(' ')[0].toUpperCase()}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
