import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FairMatchScenario,
  FairMatchCandidate,
  FAIRMATCH_CRITERIA,
} from '../../data/fairMatchData';
import { AnimatedCounter } from './AnimatedCounter';
import {
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Check,
  ShieldCheck,
  MapPin,
  Clock,
  Briefcase,
  Layers,
  Scale,
  Zap,
  Award,
  AlertTriangle,
  ArrowRight,
  Info,
  Activity,
} from 'lucide-react';

export type FairMatchAnimStage = 1 | 2 | 3 | 4 | 5 | 6;

interface FairMatchNetworkVisualProps {
  scenario: FairMatchScenario;
  onSelectWinnerBook?: (candidate: FairMatchCandidate) => void;
  onSkipAnimation?: () => void;
  externalRunTrigger?: number;
  externalSkipTrigger?: number;
}

export const FairMatchNetworkVisual: React.FC<FairMatchNetworkVisualProps> = ({
  scenario,
  onSelectWinnerBook,
  onSkipAnimation,
  externalRunTrigger = 0,
  externalSkipTrigger = 0,
}) => {
  const [stage, setStage] = useState<FairMatchAnimStage>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeCriterionIndex, setActiveCriterionIndex] = useState<number>(0);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [hoveredCandidateId, setHoveredCandidateId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [packetsProcessed, setPacketsProcessed] = useState<number>(12);

  // Timers ref for clean tear-down
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const criterionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const clearAllTimers = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (criterionTimerRef.current) clearInterval(criterionTimerRef.current);
    timerRef.current = null;
    criterionTimerRef.current = null;
  };

  useEffect(() => {
    return () => {
      clearAllTimers();
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  // When scenario changes, reset to beginning
  useEffect(() => {
    resetAnimation();
  }, [scenario.id]);

  // Handle external triggers from Hero section
  useEffect(() => {
    if (externalRunTrigger > 0) {
      startAnimation();
    }
  }, [externalRunTrigger]);

  useEffect(() => {
    if (externalSkipTrigger > 0) {
      skipToFinal();
    }
  }, [externalSkipTrigger]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const resetAnimation = () => {
    clearAllTimers();
    setIsPlaying(false);
    setStage(1);
    setActiveCriterionIndex(0);
    setPacketsProcessed(12);
  };

  const skipToFinal = () => {
    clearAllTimers();
    setIsPlaying(false);
    setStage(6);
    setActiveCriterionIndex(FAIRMATCH_CRITERIA.length - 1);
    setPacketsProcessed(256);

    const winner = scenario.candidates.find((c) => c.isWinner) || scenario.candidates[0];
    showToast(`Animation skipped • Viewing FairMatch explainability results for ${winner.name}`);

    // Call optional callback
    if (onSkipAnimation) {
      onSkipAnimation();
    }

    // Smoothly scroll down to the "Why This Match?" explanation results section
    setTimeout(() => {
      const el = document.getElementById('why-this-match');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 200);
  };

  const startAnimation = () => {
    clearAllTimers();
    setIsPlaying(true);
    setStage(1);
    setActiveCriterionIndex(0);
    setPacketsProcessed(24);
    scheduleNextStage(1);
  };

  const scheduleNextStage = (currentStage: FairMatchAnimStage) => {
    const baseDuration = (ms: number) => ms / speedMultiplier;

    if (currentStage === 1) {
      setPacketsProcessed((prev) => prev + 32);
      timerRef.current = setTimeout(() => {
        setStage(2);
        scheduleNextStage(2);
      }, baseDuration(2400));
    } else if (currentStage === 2) {
      setPacketsProcessed((prev) => prev + 48);
      timerRef.current = setTimeout(() => {
        setStage(3);
        scheduleCriteriaSequence();
      }, baseDuration(2600));
    } else if (currentStage === 3) {
      // Handled in scheduleCriteriaSequence
    } else if (currentStage === 4) {
      setPacketsProcessed((prev) => prev + 64);
      timerRef.current = setTimeout(() => {
        setStage(5);
        scheduleNextStage(5);
      }, baseDuration(3000));
    } else if (currentStage === 5) {
      setPacketsProcessed(256);
      timerRef.current = setTimeout(() => {
        setStage(6);
        setIsPlaying(false);
      }, baseDuration(2600));
    }
  };

  const scheduleCriteriaSequence = () => {
    let critIndex = 0;
    setActiveCriterionIndex(0);

    const baseDuration = (ms: number) => ms / speedMultiplier;

    criterionTimerRef.current = setInterval(() => {
      critIndex += 1;
      setPacketsProcessed((prev) => prev + 16);
      if (critIndex < FAIRMATCH_CRITERIA.length) {
        setActiveCriterionIndex(critIndex);
      } else {
        if (criterionTimerRef.current) clearInterval(criterionTimerRef.current);
        setStage(4);
        scheduleNextStage(4);
      }
    }, baseDuration(1400));
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      clearAllTimers();
      setIsPlaying(false);
    } else {
      if (stage === 6) {
        startAnimation();
      } else {
        setIsPlaying(true);
        scheduleNextStage(stage);
      }
    }
  };

  const winner = scenario.candidates.find((c) => c.isWinner) || scenario.candidates[0];
  const activeCriterion = FAIRMATCH_CRITERIA[activeCriterionIndex] || FAIRMATCH_CRITERIA[0];

  // Helper to compute simulated score reveals up to current active criterion
  const getRevealedScore = (candidate: FairMatchCandidate, criterionKey: string) => {
    const critOrder = ['skill', 'proximity', 'availability', 'reliability', 'workload', 'fairness'];
    const currentCritId = FAIRMATCH_CRITERIA[activeCriterionIndex]?.id;
    const targetIdx = critOrder.indexOf(criterionKey);
    const currentIdx = critOrder.indexOf(currentCritId);

    if (stage < 3) return 0;
    if (stage === 3 && targetIdx > currentIdx) return 0;

    switch (criterionKey) {
      case 'skill':
        return candidate.scores.skillMatch;
      case 'proximity':
        return candidate.scores.proximity;
      case 'availability':
        return candidate.scores.availability;
      case 'reliability':
        return candidate.scores.reliability;
      case 'workload':
        return candidate.scores.currentWorkload;
      case 'fairness':
        return candidate.scores.opportunityFairness;
      default:
        return 0;
    }
  };

  // Helper for running total score
  const getDynamicOverall = (candidate: FairMatchCandidate) => {
    if (stage < 3) return 0;
    if (stage >= 4) return candidate.scores.overall;

    let total = 0;
    let weightSum = 0;
    for (let i = 0; i <= activeCriterionIndex; i++) {
      const c = FAIRMATCH_CRITERIA[i];
      let val = 0;
      if (c.id === 'skill') val = candidate.scores.skillMatch;
      else if (c.id === 'proximity') val = candidate.scores.proximity;
      else if (c.id === 'availability') val = candidate.scores.availability;
      else if (c.id === 'reliability') val = candidate.scores.reliability;
      else if (c.id === 'workload') val = candidate.scores.currentWorkload;
      else if (c.id === 'fairness') val = candidate.scores.opportunityFairness;

      total += val * c.weightFactor;
      weightSum += c.weightFactor;
    }
    return Math.round(weightSum > 0 ? total / weightSum : 0);
  };

  const pipelinePercentage =
    stage < 3 ? 0 : stage === 3 ? Math.round(((activeCriterionIndex + 1) / 6) * 100) : 100;

  return (
    <div
      id="fairmatch-visual-simulator"
      className="bg-[#0A0A0A] border-2 border-black text-[#F5F5F2] overflow-hidden shadow-2xl relative scroll-mt-20"
    >
      {/* Dynamic Toast Feedback when skipped or matched */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-2 left-1/2 -translate-x-1/2 z-50 bg-[#CCFF00] text-black px-4 py-2 text-xs font-mono-code font-bold uppercase shadow-2xl border border-black flex items-center gap-2"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. TOP TELEMETRY CONTROLS & TIMELINE BAR */}
      <div className="bg-[#121212] border-b border-white/10 px-4 sm:px-6 py-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left: Live Stage Status Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 shrink-0">
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isPlaying ? 'bg-[#CCFF00] animate-ping' : 'bg-[#CCFF00]'
              }`}
            />
            <span className="text-xs uppercase font-bold tracking-widest text-[#CCFF00] font-mono-code">
              STAGE {stage} OF 6:
            </span>
          </div>
          <div className="text-sm sm:text-base font-black font-display uppercase tracking-tight text-white line-clamp-1">
            {stage === 1 && 'Customer Service Request Ingestion & Parsing'}
            {stage === 2 && 'Local Candidate Discovery & Radius Scan'}
            {stage === 3 && `Evaluating Criterion: ${activeCriterion.name} (${activeCriterion.weightPercent}%)`}
            {stage === 4 && 'Live Multi-Factor Weighted Scoring Matrix'}
            {stage === 5 && 'Verified Optimal Match Confirmed'}
            {stage === 6 && `Recommendation Locked: ${winner.name}`}
          </div>
        </div>

        {/* Right: Animation Player Controls */}
        <div className="flex flex-wrap items-center gap-2 font-mono-code">
          {/* Primary RUN FAIRMATCH Button */}
          <button
            onClick={togglePlayPause}
            aria-label={isPlaying ? 'Pause simulation' : stage === 6 ? 'Run again' : 'Run FairMatch simulation'}
            className="px-5 py-2.5 bg-[#CCFF00] hover:bg-[#D4FF00] text-[#0A0A0A] text-xs font-black uppercase tracking-wider flex items-center gap-2 transition active:scale-95 shadow-md cursor-pointer border border-[#CCFF00]"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pause</span>
              </>
            ) : stage === 6 ? (
              <>
                <RotateCcw className="w-4 h-4 stroke-[2.5]" />
                <span>Run Again</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Run FairMatch</span>
              </>
            )}
          </button>

          {/* SKIP ANIMATION Button (Jump to matching explanation results) */}
          <button
            onClick={skipToFinal}
            title="Skip animation and immediately view explainability results"
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-[#CCFF00] hover:text-white text-xs uppercase font-bold flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
          >
            <FastForward className="w-4 h-4 stroke-[2.5]" />
            <span>Skip Animation</span>
          </button>

          {/* Reset Button */}
          <button
            onClick={resetAnimation}
            title="Reset simulation to Stage 1"
            className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/15 text-white/70 hover:text-white transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Speed Toggle */}
          <div className="flex items-center bg-black/50 border border-white/15 px-1.5 py-1 text-[10px]">
            <span className="text-white/40 px-1 hidden sm:inline">SPEED:</span>
            {[1, 1.5, 2].map((s) => (
              <button
                key={s}
                onClick={() => setSpeedMultiplier(s)}
                className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold transition ${
                  speedMultiplier === s
                    ? 'bg-white/20 text-[#CCFF00]'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. PROGRESS STEPPER PILLS */}
      <div className="grid grid-cols-6 border-b border-white/10 bg-[#0E0E0E] text-[10px] sm:text-[11px] font-mono-code divide-x divide-white/10 overflow-x-auto">
        {[
          { num: 1, label: '1. Request', desc: 'Customer Ingestion' },
          { num: 2, label: '2. Discovery', desc: '4 Candidates' },
          { num: 3, label: '3. Engine', desc: '6 Criteria' },
          { num: 4, label: '4. Scoring', desc: 'Live Matrix' },
          { num: 5, label: '5. Match', desc: 'Verification' },
          { num: 6, label: '6. Why Arjun?', desc: 'Explainability' },
        ].map((s) => {
          const isPassed = stage >= s.num;
          const isCurrent = stage === s.num;
          return (
            <button
              key={s.num}
              onClick={() => {
                clearAllTimers();
                setIsPlaying(false);
                setStage(s.num as FairMatchAnimStage);
                if (s.num === 3) setActiveCriterionIndex(0);
                if (s.num >= 4) setActiveCriterionIndex(FAIRMATCH_CRITERIA.length - 1);
              }}
              className={`p-2.5 sm:p-3 text-left transition-colors relative flex flex-col justify-center ${
                isCurrent
                  ? 'bg-[#181818] text-[#CCFF00] font-bold'
                  : isPassed
                  ? 'bg-[#0E0E0E] text-white/80 hover:bg-white/5'
                  : 'bg-[#0A0A0A] text-white/30 hover:text-white/50'
              }`}
            >
              {isCurrent && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#CCFF00]" />
              )}
              <div className="flex items-center justify-between">
                <span className="uppercase tracking-wider">{s.label}</span>
                {isPassed && s.num < stage && (
                  <Check className="w-3 h-3 text-[#CCFF00]" />
                )}
              </div>
              <span className="text-[9px] text-white/40 hidden sm:block truncate mt-0.5 font-sans">
                {s.desc}
              </span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 3. CSS/SVG ANIMATED DATA PACKET HIGHWAY (BUS BAR AT TOP OF CANVAS)       */}
      {/* ========================================================================= */}
      <div className="bg-[#0D0D0D] border-b border-white/10 px-4 sm:px-6 py-2.5 relative overflow-hidden">
        {/* Subtle background circuit traces */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs font-mono-code">
          {/* Node Port Indicators */}
          <div className="flex items-center gap-2 text-white/60 text-[11px]">
            <span className="flex items-center gap-1 text-white">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>PORT A: CUSTOMER</span>
            </span>
            <span className="text-white/30">➔</span>
            <span className="flex items-center gap-1 text-[#CCFF00]">
              <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
              <span>PORT B: CORE ENGINE</span>
            </span>
            <span className="text-white/30">➔</span>
            <span className="flex items-center gap-1 text-white">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>PORT C: ARTISAN POOL</span>
            </span>
          </div>

          {/* Micro Telemetry Stats with AnimatedCounter */}
          <div className="flex items-center gap-4 text-[11px] text-white/60">
            <div className="flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-[#CCFF00]" />
              <span>PACKETS STREAMED:</span>
              <strong className="text-[#CCFF00]">
                <AnimatedCounter value={packetsProcessed} duration={300} />
              </strong>
            </div>
            <div className="hidden sm:flex items-center gap-1">
              <span>LATENCY:</span>
              <strong className="text-white">0.14ms</strong>
            </div>
            <div className="hidden sm:flex items-center gap-1">
              <span>MIDDLEMAN FEE:</span>
              <strong className="text-emerald-400 font-bold">₹0 (100% ARTISAN)</strong>
            </div>
          </div>
        </div>

        {/* SVG Animated Highway Conduits and Moving Data Packets */}
        <div className="relative w-full h-8 mt-1.5">
          <svg
            className="w-full h-full"
            viewBox="0 0 1000 32"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <filter id="packetGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Base static gray conduits */}
            <line x1="60" y1="16" x2="500" y2="16" stroke="#262626" strokeWidth="2" />
            <line x1="500" y1="16" x2="940" y2="16" stroke="#262626" strokeWidth="2" />

            {/* Terminal nodes */}
            <circle cx="60" cy="16" r="4" fill="#10B981" />
            <circle cx="500" cy="16" r="5" fill="#CCFF00" />
            <circle cx="940" cy="16" r="4" fill="#06B6D4" />

            {/* Stage 1: Animated dashed conduit Customer -> Engine */}
            {stage === 1 && (
              <line
                x1="60"
                y1="16"
                x2="500"
                y2="16"
                stroke="#CCFF00"
                strokeWidth="2.5"
                strokeDasharray="8 6"
                className="animate-svg-dash-flow"
              />
            )}

            {/* Stage 2 & 3: Animated dashed conduit Engine -> Candidates */}
            {(stage === 2 || stage === 3) && (
              <>
                <line
                  x1="500"
                  y1="16"
                  x2="940"
                  y2="16"
                  stroke="#CCFF00"
                  strokeWidth="2.5"
                  strokeDasharray="8 6"
                  className="animate-svg-dash-flow"
                />
                <line
                  x1="940"
                  y1="16"
                  x2="500"
                  y2="16"
                  stroke="#06B6D4"
                  strokeWidth="1.5"
                  strokeDasharray="6 6"
                  className="animate-svg-dash-reverse"
                />
              </>
            )}

            {/* Stage 4: High velocity scoring matrix conduit */}
            {stage === 4 && (
              <>
                <line
                  x1="60"
                  y1="16"
                  x2="500"
                  y2="16"
                  stroke="#CCFF00"
                  strokeWidth="2"
                  strokeDasharray="6 4"
                  className="animate-svg-dash-flow-fast"
                />
                <line
                  x1="500"
                  y1="16"
                  x2="940"
                  y2="16"
                  stroke="#CCFF00"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                  className="animate-svg-dash-flow-fast"
                />
              </>
            )}

            {/* Stage 5 & 6: Solid locked high-bandwidth dispatch beam */}
            {stage >= 5 && (
              <>
                <line
                  x1="60"
                  y1="16"
                  x2="500"
                  y2="16"
                  stroke="#CCFF00"
                  strokeWidth="2"
                  strokeOpacity="0.8"
                />
                <line
                  x1="500"
                  y1="16"
                  x2="940"
                  y2="16"
                  stroke="#CCFF00"
                  strokeWidth="3"
                  strokeOpacity="1"
                  filter="url(#packetGlow)"
                />
              </>
            )}
          </svg>

          {/* Dynamic Traveling Data Packet Capsules */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Stage 1 Packet: Customer -> Engine */}
            {stage === 1 && (
              <motion.div
                animate={{ left: ['8%', '48%'] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.6 / speedMultiplier,
                  ease: 'linear',
                }}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center gap-1 bg-black border border-[#CCFF00] px-2 py-0.5 rounded text-[9px] font-mono-code font-bold text-[#CCFF00] shadow-lg animate-packet-glow"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-ping" />
                <span>REQ_PKT: {scenario.serviceName.slice(0, 10).toUpperCase()}</span>
              </motion.div>
            )}

            {/* Stage 2 Packet: Engine -> Candidate Discovery */}
            {stage === 2 && (
              <motion.div
                animate={{ left: ['50%', '90%'] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.4 / speedMultiplier,
                  ease: 'linear',
                }}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center gap-1 bg-black border border-cyan-400 px-2 py-0.5 rounded text-[9px] font-mono-code font-bold text-cyan-300 shadow-lg"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>GEO_SCAN: 4 LOCAL ARTISANS</span>
              </motion.div>
            )}

            {/* Stage 3 Packet: Criterion Evaluation Oscillating Beam */}
            {stage === 3 && (
              <motion.div
                animate={{ left: ['50%', '88%', '50%'] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.2 / speedMultiplier,
                  ease: 'easeInOut',
                }}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center gap-1 bg-[#161D07] border border-[#CCFF00] px-2 py-0.5 rounded text-[9px] font-mono-code font-bold text-[#CCFF00] shadow-lg animate-packet-glow"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]" />
                <span>EVAL: {activeCriterion.name.toUpperCase()} ({activeCriterion.weightPercent}%)</span>
              </motion.div>
            )}

            {/* Stage 4 Packet: Scoring Bursts */}
            {stage === 4 && (
              <motion.div
                animate={{ left: ['90%', '52%'] }}
                transition={{
                  repeat: Infinity,
                  duration: 0.9 / speedMultiplier,
                  ease: 'linear',
                }}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center gap-1 bg-black border border-emerald-400 px-2 py-0.5 rounded text-[9px] font-mono-code font-bold text-emerald-300 shadow-lg"
              >
                <span>SCORING_BURST: MULTI_FACTOR_SUM</span>
              </motion.div>
            )}

            {/* Stage 5 & 6: Lock Beam to Winner */}
            {stage >= 5 && (
              <motion.div
                animate={{ left: ['10%', '50%', '90%'] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5 / speedMultiplier,
                  ease: 'linear',
                }}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center gap-1 bg-[#CCFF00] text-black px-2.5 py-0.5 rounded text-[9px] font-mono-code font-black tracking-wider shadow-xl"
              >
                <span>✓ DISPATCH_LOCKED: {winner.name.toUpperCase()} (93%)</span>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* 4. MAIN VISUAL CANVAS: NETWORK + ENGINE PIPELINE */}
      <div className="p-4 sm:p-6 lg:p-8 relative min-h-[580px] flex flex-col justify-between">
        {/* Subtle grid backdrop */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Dynamic Telemetry Subheader */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-4 border-b border-white/10 text-xs text-white/70 font-mono-code">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-white/10 border border-white/20 text-[#CCFF00] font-bold text-[10px] uppercase">
              SEEDED DEMO CASE: {scenario.serviceName}
            </span>
            <span>
              Customer: <strong className="text-white">{scenario.customerName}</strong> ({scenario.customerLocality})
            </span>
          </div>
          <div className="text-[11px] text-white/50 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#CCFF00]" />
            <span>EXPLAINABLE WEIGHTED ENGINE • AUDITABLE PROTOCOL</span>
          </div>
        </div>

        {/* 5. THE INTERACTIVE ANIMATED NETWORK (Customer on LEFT, Engine in CENTER, Candidates on RIGHT) */}
        <div className="relative z-10 my-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* ========================================================= */}
          {/* LEFT: CUSTOMER NODE CARD (Arun Kumar) */}
          {/* ========================================================= */}
          <div className="lg:col-span-3">
            <motion.div
              animate={{
                scale: stage === 1 ? [1, 1.02, 1] : 1,
                borderColor: stage === 1 ? '#CCFF00' : 'rgba(255,255,255,0.15)',
              }}
              transition={{ repeat: stage === 1 ? Infinity : 0, duration: 1.8 }}
              className="bg-[#121212] border-2 p-4 sm:p-5 text-left relative overflow-hidden shadow-xl"
            >
              {/* Top Accent Strip */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#CCFF00] to-white/40" />

              <div className="flex items-center justify-between text-[10px] uppercase text-white/50 font-mono-code mb-2">
                <span>01. SERVICE REQUEST</span>
                <span className="text-[#CCFF00] font-bold">VERIFIED WARD 102</span>
              </div>

              <div className="text-xl font-black font-display uppercase tracking-tight text-white">
                {scenario.customerName}
              </div>
              <div className="text-xs text-white/70 flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3 text-[#CCFF00]" />
                <span>{scenario.customerLocality}</span>
              </div>
              <div className="text-[11px] text-white/50 font-sans mt-0.5">
                {scenario.customerAddress}
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 space-y-2 text-xs font-mono-code">
                <div className="flex justify-between">
                  <span className="text-white/50 text-[10px] uppercase">Service:</span>
                  <span className="text-white font-bold">{scenario.serviceName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50 text-[10px] uppercase">Slot Window:</span>
                  <span className="text-[#CCFF00] font-bold">{scenario.requestedSlot}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/50 text-[10px] uppercase">Tariff Cap:</span>
                  <span className="text-white font-bold">₹{scenario.tariffEstimate} (Direct Escrow)</span>
                </div>
              </div>

              {/* Glowing Pulse Packet Emitter for Stage 1 */}
              {stage >= 1 && (
                <div className="mt-4 p-2 bg-white/5 border border-white/10 text-[10px] font-mono-code flex items-center justify-between">
                  <span className="text-white/60">PACKET STATUS:</span>
                  <span className="text-[#CCFF00] font-bold uppercase flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" />
                    {stage === 1 ? 'Dispatching...' : 'Ingested by Engine'}
                  </span>
                </div>
              )}
            </motion.div>
          </div>

          {/* ========================================================= */}
          {/* CENTER: THE FAIRMATCH ENGINE PIPELINE HUB */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full bg-[#111111] border-2 border-white/20 p-4 sm:p-6 text-center relative shadow-2xl">
              {/* Outer decorative corners */}
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#CCFF00]" />
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#CCFF00]" />
              <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#CCFF00]" />
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#CCFF00]" />

              {/* Engine Header */}
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
                <span className="text-[10px] uppercase tracking-widest text-[#CCFF00] font-mono-code font-bold">
                  FAIRMATCH™ CORE ENGINE
                </span>
                <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight text-white">
                EXPLAINABLE WEIGHTED SIMULATION
              </h3>
              <p className="text-[11px] text-white/60 font-sans max-w-sm mx-auto mt-1">
                Evaluating candidate trade qualifications, localized geography, availability, reliability, and cooperative workload.
              </p>

              {/* 6 Sequential Criteria Pipeline Display */}
              <div className="mt-5 space-y-2 text-left font-mono-code">
                {FAIRMATCH_CRITERIA.map((criterion, idx) => {
                  const isCriterionActive = stage === 3 && activeCriterionIndex === idx;
                  const isCriterionPassed = stage > 3 || (stage === 3 && activeCriterionIndex > idx);

                  return (
                    <motion.div
                      key={criterion.id}
                      animate={{
                        backgroundColor: isCriterionActive
                          ? 'rgba(204,255,0,0.15)'
                          : isCriterionPassed
                          ? 'rgba(255,255,255,0.06)'
                          : 'rgba(255,255,255,0.02)',
                        borderColor: isCriterionActive
                          ? '#CCFF00'
                          : isCriterionPassed
                          ? 'rgba(204,255,0,0.4)'
                          : 'rgba(255,255,255,0.08)',
                      }}
                      className="p-2.5 border transition-all flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                            isCriterionActive
                              ? 'bg-[#CCFF00] text-black'
                              : isCriterionPassed
                              ? 'bg-white/20 text-[#CCFF00]'
                              : 'bg-white/5 text-white/40'
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs font-bold uppercase tracking-wide ${
                                isCriterionActive
                                  ? 'text-[#CCFF00]'
                                  : isCriterionPassed
                                  ? 'text-white'
                                  : 'text-white/50'
                              }`}
                            >
                              {criterion.name}
                            </span>
                            <span className="text-[10px] text-white/40">({criterion.weightPercent}%)</span>
                          </div>
                          <div className="text-[10px] text-white/60 font-sans hidden sm:block line-clamp-1">
                            {criterion.metricLabel}
                          </div>
                        </div>
                      </div>

                      {/* Status indicator */}
                      <div className="text-right">
                        {isCriterionActive ? (
                          <span className="text-[10px] text-[#CCFF00] font-bold uppercase animate-pulse flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            <span>CALCULATING</span>
                          </span>
                        ) : isCriterionPassed ? (
                          <span className="text-[10px] text-emerald-400 font-bold uppercase flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            <span>WEIGHTED</span>
                          </span>
                        ) : (
                          <span className="text-[10px] text-white/30 uppercase">QUEUED</span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Dynamic Overall Engine Progress Bar with AnimatedCounter */}
              <div className="mt-4 pt-3 border-t border-white/10 text-xs font-mono-code">
                <div className="flex justify-between text-[10px] uppercase text-white/50 mb-1">
                  <span>EVALUATION PIPELINE COMPLETION</span>
                  <span className="text-[#CCFF00] font-bold">
                    <AnimatedCounter value={pipelinePercentage} suffix="%" duration={350} />
                  </span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#CCFF00]"
                    initial={{ width: 0 }}
                    animate={{ width: `${pipelinePercentage}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT: 4 CANDIDATE NODES (Arjun, Prakash, Karthik, Suresh) */}
          {/* ========================================================= */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between text-[10px] uppercase text-white/50 font-mono-code px-1">
              <span>02. QUALIFIED ARTISANS</span>
              <span className="text-[#CCFF00]">{scenario.candidates.length} DISCOVERED IN RADIUS</span>
            </div>

            {scenario.candidates.map((candidate) => {
              const isWinner = candidate.isWinner;
              const isDimmed = stage >= 5 && !isWinner;
              const isHighlighted = stage >= 5 && isWinner;
              const dynamicScore = getDynamicOverall(candidate);

              return (
                <motion.div
                  key={candidate.id}
                  onMouseEnter={() => setHoveredCandidateId(candidate.id)}
                  onMouseLeave={() => setHoveredCandidateId(null)}
                  animate={{
                    opacity: stage < 2 ? 0.4 : isDimmed ? 0.35 : 1,
                    scale: isHighlighted ? 1.03 : 1,
                    borderColor: isHighlighted
                      ? '#CCFF00'
                      : hoveredCandidateId === candidate.id
                      ? 'rgba(255,255,255,0.4)'
                      : 'rgba(255,255,255,0.12)',
                    backgroundColor: isHighlighted ? '#161d06' : '#121212',
                  }}
                  transition={{ duration: 0.3 }}
                  className={`p-3.5 border text-left relative transition-all shadow-md ${
                    isHighlighted ? 'ring-1 ring-[#CCFF00]' : ''
                  }`}
                >
                  {isHighlighted && (
                    <div className="absolute -top-2.5 right-3 bg-[#CCFF00] text-black text-[9px] font-black font-display uppercase tracking-widest px-2 py-0.5 shadow">
                      ✓ RANK #1 MATCH
                    </div>
                  )}

                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-black font-display uppercase text-white">
                          {candidate.name}
                        </span>
                        <span className="text-[10px] text-[#CCFF00] font-mono-code">
                          ★ {candidate.rating}
                        </span>
                      </div>
                      <div className="text-[11px] text-white/70 font-sans line-clamp-1">
                        {candidate.business} • <span className="text-white/50">{candidate.trade}</span>
                      </div>
                      <div className="text-[10px] text-white/50 font-mono-code flex items-center gap-2 mt-1">
                        <span>{candidate.distanceText}</span>
                        <span>•</span>
                        <span className={candidate.isAvailableRequestedSlot ? 'text-emerald-400' : 'text-amber-400'}>
                          {candidate.isAvailableRequestedSlot ? 'Slot Open' : 'Slot Busy'}
                        </span>
                      </div>
                    </div>

                    {/* Score readout meter with AnimatedCounter */}
                    <div className="text-right shrink-0">
                      <div className="text-[9px] text-white/40 uppercase font-mono-code">FAIRMATCH</div>
                      <div
                        className={`text-2xl font-black font-display leading-none ${
                          isHighlighted
                            ? 'text-[#CCFF00]'
                            : isDimmed
                            ? 'text-white/40'
                            : 'text-white'
                        }`}
                      >
                        {stage < 3 ? (
                          '--'
                        ) : (
                          <AnimatedCounter
                            value={dynamicScore}
                            suffix="%"
                            duration={isPlaying ? 400 : 0}
                          />
                        )}
                      </div>
                      <div className="text-[9px] text-white/50 font-mono-code mt-0.5">
                        {stage < 3 ? 'Pending' : stage < 5 ? 'Calculating...' : isWinner ? 'Winner' : 'Evaluated'}
                      </div>
                    </div>
                  </div>

                  {/* Criteria Score Mini Bar with AnimatedCounter (visible in stages 3+) */}
                  {stage >= 3 && (
                    <div className="mt-2 pt-2 border-t border-white/10 grid grid-cols-6 gap-1 text-[8px] font-mono-code text-center">
                      <div>
                        <div className="text-white/40">SKL</div>
                        <div className="text-white font-bold">
                          <AnimatedCounter value={getRevealedScore(candidate, 'skill')} duration={isPlaying ? 300 : 0} />
                        </div>
                      </div>
                      <div>
                        <div className="text-white/40">DST</div>
                        <div className="text-white font-bold">
                          <AnimatedCounter value={getRevealedScore(candidate, 'proximity')} duration={isPlaying ? 300 : 0} />
                        </div>
                      </div>
                      <div>
                        <div className="text-white/40">AVL</div>
                        <div className="text-white font-bold">
                          <AnimatedCounter value={getRevealedScore(candidate, 'availability')} duration={isPlaying ? 300 : 0} />
                        </div>
                      </div>
                      <div>
                        <div className="text-white/40">REL</div>
                        <div className="text-white font-bold">
                          <AnimatedCounter value={getRevealedScore(candidate, 'reliability')} duration={isPlaying ? 300 : 0} />
                        </div>
                      </div>
                      <div>
                        <div className="text-white/40">WLD</div>
                        <div className="text-white font-bold">
                          <AnimatedCounter value={getRevealedScore(candidate, 'workload')} duration={isPlaying ? 300 : 0} />
                        </div>
                      </div>
                      <div>
                        <div className="text-white/40">FAR</div>
                        <div className="text-white font-bold">
                          <AnimatedCounter value={getRevealedScore(candidate, 'fairness')} duration={isPlaying ? 300 : 0} />
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 6. MATCH CONFIRMATION & DIRECT ROUTE LOCK (Stages 5 & 6) */}
        {/* ========================================================= */}
        <AnimatePresence>
          {stage >= 5 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className="mt-6 p-4 sm:p-6 bg-[#161D07] border-2 border-[#CCFF00] relative overflow-hidden"
            >
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#CCFF00]/5 rounded-full blur-3xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Left: Lock Banner */}
                <div className="lg:col-span-8 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono-code font-bold uppercase tracking-widest text-[#CCFF00]">
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>ALGORITHMIC RECOMMENDATION LOCKED IN PROTOCOL</span>
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-white">
                    {winner.name} • {winner.business}
                  </h4>
                  <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed">
                    {scenario.summaryExplanation}
                  </p>

                  {/* Connected Nodes Pathway */}
                  <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono-code">
                    <span className="px-2.5 py-1 bg-black/60 border border-white/20 text-white font-bold">
                      {scenario.customerName}
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#CCFF00]" />
                    <span className="px-2.5 py-1 bg-[#CCFF00] text-black font-black">
                      FAIRMATCH ({winner.scores.overall}%)
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#CCFF00]" />
                    <span className="px-2.5 py-1 bg-black/60 border border-[#CCFF00] text-[#CCFF00] font-bold">
                      {winner.name} (Direct Escrow)
                    </span>
                  </div>
                </div>

                {/* Right: Direct CTA to Book Winner */}
                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch gap-2.5 text-center">
                  {onSelectWinnerBook && (
                    <button
                      onClick={() => onSelectWinnerBook(winner)}
                      className="w-full px-6 py-3.5 bg-[#CCFF00] hover:bg-[#D4FF00] text-[#0A0A0A] text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition active:scale-95 cursor-pointer"
                    >
                      <span>Book {winner.name} (₹{scenario.tariffEstimate})</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => {
                      const el = document.getElementById('why-this-match');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/20 text-white/80 hover:text-white text-[11px] font-mono-code uppercase font-bold flex items-center justify-center gap-1.5 transition"
                  >
                    <span>Inspect Explainability Factors</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <div className="text-[10px] text-white/50 font-mono-code">
                    100% Tariff Disbursed to {winner.name} • Zero Middlemen Surcharge
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FairMatchNetworkVisual;
