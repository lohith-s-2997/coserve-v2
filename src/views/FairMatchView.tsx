import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  ALL_SCENARIOS,
  PRIMARY_AC_SCENARIO,
  FairMatchScenario,
  FairMatchCandidate,
} from '../data/fairMatchData';
import { FairMatchNetworkVisual } from '../components/fairmatch/FairMatchNetworkVisual';
import { FairMatchWhySection } from '../components/fairmatch/FairMatchWhySection';
import { FairMatchScoreBoard } from '../components/fairmatch/FairMatchScoreBoard';
import { FairMatchOpportunitySim } from '../components/fairmatch/FairMatchOpportunitySim';
import { FairMatchFormulaCard } from '../components/fairmatch/FairMatchFormulaCard';
import { FairMatchTraceLog } from '../components/fairmatch/FairMatchTraceLog';
import {
  ShieldCheck,
  CheckCircle2,
  Scale,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Award,
  Layers,
  Zap,
  RotateCcw,
  Play,
  FastForward,
} from 'lucide-react';

export const FairMatchView: React.FC = () => {
  const { providers, setBookingModalProvider, setTestBookingModalOpen, navigate } = useApp();
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('ac-general-service');
  const [runTrigger, setRunTrigger] = useState<number>(0);
  const [skipTrigger, setSkipTrigger] = useState<number>(0);

  const currentScenario: FairMatchScenario =
    ALL_SCENARIOS[selectedScenarioId] || PRIMARY_AC_SCENARIO;

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBookWinner = (candidate: FairMatchCandidate) => {
    // Look up provider in global providers list
    const targetProvider = providers.find(
      (p) => p.id === candidate.providerId || p.professionalName.includes(candidate.name)
    );

    if (targetProvider) {
      setBookingModalProvider(targetProvider);
    } else {
      // Fallback: open instant test booking modal
      setTestBookingModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F2] text-[#0A0A0A] pb-24 selection:bg-[#CCFF00] selection:text-black">
      {/* 1. TOP ANNOUNCEMENT TICKER */}
      <div className="bg-[#0A0A0A] text-[#CCFF00] border-b border-black py-2 px-4 text-[11px] font-mono-code flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
          <span className="font-bold uppercase tracking-wider">
            COSERVE PROTOCOL AUDIT :: EXPLAINABLE WEIGHTED DISPATCH ACTIVE
          </span>
        </div>
        <div className="text-white/60 hidden sm:flex items-center gap-4 text-[10px]">
          <span>ZERO SPONSORED PROMOTIONS</span>
          <span>•</span>
          <span>NO BLACK-BOX SCORING</span>
          <span>•</span>
          <span>ANTI-MONOPOLY OPPORTUNITY ROTATION</span>
        </div>
      </div>

      {/* 2. HERO HEADER SECTION */}
      <div className="border-b-2 border-black bg-white px-4 sm:px-6 lg:px-12 py-10 lg:py-14">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Breadcrumb / Category indicator */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono-code uppercase tracking-widest text-black/60">
              <span className="px-2 py-0.5 bg-black text-[#CCFF00] font-bold">
                PATENT-FREE COOPERATIVE ALGORITHM
              </span>
              <span>/</span>
              <span>CUSTOMER AUDIT SUITE</span>
            </div>

            {/* Interactive Scenario Switcher Pills */}
            <div className="flex items-center gap-1.5 bg-[#F0F0EC] border border-black/15 p-1 text-xs font-mono-code">
              <span className="text-[10px] text-black/40 px-2 uppercase font-bold hidden md:inline">
                TEST SCENARIO:
              </span>
              {[
                { id: 'ac-general-service', label: 'AC Service (Arjun)' },
                { id: 'electrical-repair', label: 'Electrical (Ravi)' },
                { id: 'plumbing-repair', label: 'Plumbing (Kumar)' },
              ].map((scen) => (
                <button
                  key={scen.id}
                  onClick={() => setSelectedScenarioId(scen.id)}
                  className={`px-3 py-1.5 uppercase font-bold text-[11px] transition ${
                    selectedScenarioId === scen.id
                      ? 'bg-black text-[#CCFF00] shadow'
                      : 'text-black/70 hover:text-black hover:bg-black/5'
                  }`}
                >
                  {scen.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Title & Subtitle */}
          <div className="space-y-3">
            <div className="text-sm sm:text-base font-mono-code font-bold uppercase tracking-widest text-black/50 flex items-center gap-2">
              <span>COSERVE FAIRMATCH™</span>
              <span className="w-8 h-[2px] bg-black/30 inline-block" />
              <span className="text-black">DEMOCRATIC WORK DISPATCH</span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display uppercase tracking-tight text-black leading-none">
              THE RIGHT PROFESSIONAL — FOR EXPLAINABLE REASONS.
            </h1>
            <p className="text-lg sm:text-xl text-black/80 font-sans max-w-3xl leading-relaxed">
              Not random. Not a black box. FairMatch evaluates qualified professionals across service fit, location, availability, reliability, workload, and opportunity fairness.
            </p>
          </div>

          {/* Key Principles Checklist */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono-code border-t border-black/10">
            <div className="p-3 bg-[#F8F8F6] border border-black/10 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-black shrink-0 mt-0.5" />
              <div>
                <strong className="text-black uppercase block">QUALIFICATION FIRST</strong>
                <span className="text-black/60 text-[11px] font-sans">
                  Every artisan is ITI or trade-certified before consideration.
                </span>
              </div>
            </div>
            <div className="p-3 bg-[#F8F8F6] border border-black/10 flex items-start gap-2.5">
              <Scale className="w-4 h-4 text-black shrink-0 mt-0.5" />
              <div>
                <strong className="text-black uppercase block">DEMOCRATIC ROTATION</strong>
                <span className="text-black/60 text-[11px] font-sans">
                  Prevents single-worker crowding while maintaining high craft standards.
                </span>
              </div>
            </div>
            <div className="p-3 bg-[#F8F8F6] border border-black/10 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-black shrink-0 mt-0.5" />
              <div>
                <strong className="text-black uppercase block">AUDITABLE FORMULA</strong>
                <span className="text-black/60 text-[11px] font-sans">
                  Every percentage and rank is mathematically verifiable.
                </span>
              </div>
            </div>
          </div>

          {/* Direct Hero Interactive Triggers */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                setRunTrigger((prev) => prev + 1);
                document.getElementById('fairmatch-visual-simulator')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3.5 bg-black hover:bg-neutral-800 text-[#CCFF00] font-black text-xs font-mono-code uppercase tracking-wider flex items-center gap-2 shadow-lg transition active:scale-95 cursor-pointer border-2 border-black"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Run FairMatch Simulation</span>
            </button>
            <button
              onClick={() => {
                setSkipTrigger((prev) => prev + 1);
              }}
              className="px-5 py-3.5 bg-white hover:bg-black/5 border-2 border-black text-black font-bold text-xs font-mono-code uppercase tracking-wider flex items-center gap-2 transition active:scale-95 cursor-pointer"
            >
              <FastForward className="w-4 h-4 stroke-[2.5]" />
              <span>Skip Animation (Jump to Results)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. MAIN CONTENT CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-10 space-y-12">
        {/* ======================================================== */}
        {/* SECTION 1: WATCH FAIRMATCH WORK (ANIMATED ENGINE CANVAS) */}
        {/* ======================================================== */}
        <section aria-labelledby="watch-fairmatch-work-title" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="text-xs uppercase tracking-widest text-black/50 font-mono-code font-bold">
                EXPERIENCE 01 // INTERACTIVE ALGORITHM SIMULATION
              </div>
              <h2
                id="watch-fairmatch-work-title"
                className="text-3xl sm:text-4xl font-black font-display uppercase tracking-tight text-black"
              >
                WATCH FAIRMATCH WORK
              </h2>
            </div>
            <div className="text-xs text-black/60 font-mono-code">
              Demonstrating active match for:{' '}
              <strong className="text-black underline">{currentScenario.serviceName}</strong>
            </div>
          </div>

          <FairMatchNetworkVisual
            scenario={currentScenario}
            onSelectWinnerBook={handleBookWinner}
            externalRunTrigger={runTrigger}
            externalSkipTrigger={skipTrigger}
          />
        </section>

        {/* ======================================================== */}
        {/* SECTION 2: WHY THIS MATCH? (PLAIN-LANGUAGE EXPLANATION) */}
        {/* ======================================================== */}
        <section aria-labelledby="why-this-match-title" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="text-xs uppercase tracking-widest text-black/50 font-mono-code font-bold">
                EXPERIENCE 02 // TRANSPARENT RATIONALE
              </div>
              <h2
                id="why-this-match-title"
                className="text-3xl sm:text-4xl font-black font-display uppercase tracking-tight text-black"
              >
                WHY THIS MATCH?
              </h2>
            </div>
            <div className="text-xs text-black/60 font-mono-code">
              6-Factor breakdown explaining the winning recommendation
            </div>
          </div>

          <FairMatchWhySection
            scenario={currentScenario}
            onBookWinner={handleBookWinner}
          />
        </section>

        {/* ======================================================== */}
        {/* SECTION 3: CANDIDATE COMPARISON MATRIX (TABLE)           */}
        {/* ======================================================== */}
        <section aria-labelledby="candidate-comparison-title" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="text-xs uppercase tracking-widest text-black/50 font-mono-code font-bold">
                EXPERIENCE 03 // FULL TRANSPARENCY
              </div>
              <h2
                id="candidate-comparison-title"
                className="text-3xl sm:text-4xl font-black font-display uppercase tracking-tight text-black"
              >
                CANDIDATE COMPARISON MATRIX
              </h2>
            </div>
            <div className="text-xs text-black/60 font-mono-code">
              Side-by-side audit of all candidate evaluation metrics
            </div>
          </div>

          <FairMatchScoreBoard scenario={currentScenario} />
        </section>

        {/* ======================================================== */}
        {/* SECTION 4: FAIR OPPORTUNITY & WORKLOAD DISTRIBUTION      */}
        {/* ======================================================== */}
        <section aria-labelledby="fair-opportunity-title" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="text-xs uppercase tracking-widest text-black/50 font-mono-code font-bold">
                EXPERIENCE 04 // WORKLOAD BALANCE & COOPERATIVE HEALTH
              </div>
              <h2
                id="fair-opportunity-title"
                className="text-3xl sm:text-4xl font-black font-display uppercase tracking-tight text-black"
              >
                FAIR OPPORTUNITY DISTRIBUTION
              </h2>
            </div>
            <div className="text-xs text-black/60 font-mono-code">
              How democratic dispatch prevents burnout and preserves craft quality
            </div>
          </div>

          <FairMatchOpportunitySim />
        </section>

        {/* ======================================================== */}
        {/* SECTION 5: MATHEMATICAL FORMULA & CALCULATION TRACE       */}
        {/* ======================================================== */}
        <section aria-labelledby="mathematical-formula-title" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="text-xs uppercase tracking-widest text-black/50 font-mono-code font-bold">
                EXPERIENCE 05 // OPEN-SOURCE MATHEMATICS
              </div>
              <h2
                id="mathematical-formula-title"
                className="text-3xl sm:text-4xl font-black font-display uppercase tracking-tight text-black"
              >
                THE DETERMINISTIC FORMULA
              </h2>
            </div>
            <div className="text-xs text-black/60 font-mono-code">
              Exact weighting multipliers and audited calculation proof
            </div>
          </div>

          <FairMatchFormulaCard scenario={currentScenario} />
        </section>

        {/* ======================================================== */}
        {/* SECTION 6: CHRONOLOGICAL MATCH TRACE LOG                 */}
        {/* ======================================================== */}
        <section aria-labelledby="match-trace-title" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <div className="text-xs uppercase tracking-widest text-black/50 font-mono-code font-bold">
                EXPERIENCE 06 // IMMUTABLE EXECUTION LOG
              </div>
              <h2
                id="match-trace-title"
                className="text-3xl sm:text-4xl font-black font-display uppercase tracking-tight text-black"
              >
                MATCH TRACE LOG
              </h2>
            </div>
            <div className="text-xs text-black/60 font-mono-code">
              Step-by-step verified telemetry log
            </div>
          </div>

          <FairMatchTraceLog scenario={currentScenario} />
        </section>

        {/* ======================================================== */}
        {/* SECTION 7: FINAL CALL TO ACTION & DIRECT BOOKING BRIDGE */}
        {/* ======================================================== */}
        <section className="bg-black text-white p-8 sm:p-12 border-2 border-black relative overflow-hidden shadow-2xl">
          {/* Subtle accent blur */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#CCFF00]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#CCFF00] text-black text-xs font-mono-code font-black uppercase">
              READY TO DISPATCH
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight leading-tight">
              PROCEED WITH VERIFIED FAIRMATCH DISPATCH
            </h2>
            <p className="text-base sm:text-lg text-white/80 font-sans leading-relaxed">
              Experience transparent local trade without middlemen markups. Every rupee goes directly to your matched artisan with protected escrow satisfaction.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 font-mono-code">
              <button
                onClick={() => {
                  const winner = currentScenario.candidates.find((c) => c.isWinner);
                  if (winner) handleBookWinner(winner);
                }}
                className="px-8 py-4 bg-[#CCFF00] hover:bg-[#D4FF00] text-[#0A0A0A] text-sm font-black uppercase tracking-wider flex items-center justify-center gap-3 transition shadow-xl active:scale-95 cursor-pointer"
              >
                <span>Book Matched Professional (₹{currentScenario.tariffEstimate})</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>

              <button
                onClick={() => setTestBookingModalOpen(true)}
                className="px-6 py-4 bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs uppercase font-bold flex items-center justify-center gap-2 transition"
              >
                <span>Open Instant Test Booking</span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
export default FairMatchView;
