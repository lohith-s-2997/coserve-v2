import React from 'react';
import {
  FairMatchScenario,
  FairMatchCandidate,
  FAIRMATCH_CRITERIA,
} from '../../data/fairMatchData';
import { AnimatedCounter } from './AnimatedCounter';
import {
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Clock,
  Award,
  Zap,
  Briefcase,
  Users,
  ArrowRight,
  Info,
} from 'lucide-react';

interface FairMatchWhySectionProps {
  scenario: FairMatchScenario;
  onBookWinner?: (winner: FairMatchCandidate) => void;
}

export const FairMatchWhySection: React.FC<FairMatchWhySectionProps> = ({
  scenario,
  onBookWinner,
}) => {
  const winner = scenario.candidates.find((c) => c.isWinner) || scenario.candidates[0];

  const factorCards = [
    {
      title: 'Skill Match',
      weight: '25% Weight',
      scoreNum: winner.scores.skillMatch,
      score: `${winner.scores.skillMatch}%`,
      icon: Award,
      summary: winner.qualification,
      detail:
        'Certified trade competence verified through cooperative guilds and vocational testing. Appropriate tooling confirmed for this service request.',
    },
    {
      title: 'Proximity',
      weight: '20% Weight',
      scoreNum: winner.scores.proximity,
      score: `${winner.scores.proximity}%`,
      icon: MapPin,
      summary: `${winner.distanceKm} km transit radius in ${scenario.customerLocality}`,
      detail:
        'Minimizes travel delays, unpaid fuel costs, and carbon emissions by choosing a professional operating right within your neighborhood ward.',
    },
    {
      title: 'Availability',
      weight: '20% Weight',
      scoreNum: winner.scores.availability,
      score: `${winner.scores.availability}%`,
      icon: Clock,
      summary: `Confirmed slot for ${scenario.requestedSlot}`,
      detail:
        'Guaranteed calendar synchronization. Eliminates waiting or last-minute artisan cancellations due to scheduling conflicts.',
    },
    {
      title: 'Reliability',
      weight: '15% Weight',
      scoreNum: winner.scores.reliability,
      score: `${winner.scores.reliability}%`,
      icon: ShieldCheck,
      summary: `★ ${winner.rating} • ${winner.completedJobs} verified jobs • ${winner.repeatCustomerRate}% repeat rate`,
      detail:
        'CoServe escrow records verify high customer satisfaction and dependable job completion with zero unresolved disputes.',
    },
    {
      title: 'Current Workload',
      weight: '10% Weight',
      scoreNum: winner.scores.currentWorkload,
      score: `${winner.scores.currentWorkload}%`,
      icon: Briefcase,
      summary: `${winner.workloadJobsThisWeek} active jobs this week (${winner.workloadStatus} focus buffer)`,
      detail:
        'Prevents worker fatigue and rushed service. A craftsman with balanced workload delivers meticulous, attentive craftsmanship.',
    },
    {
      title: 'Opportunity Fairness',
      weight: '10% Weight',
      scoreNum: winner.scores.opportunityFairness,
      score: `${winner.scores.opportunityFairness}%`,
      icon: Users,
      summary: 'Democratic work rotation among qualified local peers',
      detail:
        'Prevents algorithmic monopoly where 1 worker takes 90% of requests while equally qualified neighbors sit idle. Fair opportunity for all trade-certified peers.',
    },
  ];

  return (
    <div
      id="why-this-match"
      className="bg-[#0A0A0A] border-2 border-black text-[#F5F5F2] p-6 sm:p-8 space-y-8 shadow-2xl scroll-mt-24"
    >
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/10 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono-code font-bold uppercase tracking-widest text-[#CCFF00]">
            <CheckCircle2 className="w-4 h-4" />
            <span>STAGE 6 AUDIT • PLAIN-LANGUAGE EXPLAINABILITY</span>
          </div>
          <h3 className="text-3xl sm:text-5xl font-black font-display uppercase tracking-tight text-white">
            WHY {winner.name.toUpperCase()}?
          </h3>
          <p className="text-sm sm:text-base text-white/80 font-sans max-w-3xl leading-relaxed">
            &ldquo;{scenario.summaryExplanation}&rdquo;
          </p>
        </div>

        <div className="shrink-0 bg-[#161D07] border-2 border-[#CCFF00] p-4 text-center">
          <div className="text-[10px] text-white/60 uppercase font-mono-code">
            OVERALL FAIRMATCH SCORE
          </div>
          <div className="text-5xl sm:text-6xl font-black font-display text-[#CCFF00] leading-none my-1">
            <AnimatedCounter value={winner.scores.overall} suffix="%" duration={600} />
          </div>
          <div className="text-xs text-white font-mono-code font-bold uppercase">
            Rank #1 Deterministic Match
          </div>
        </div>
      </div>

      {/* 6 Visual Factor Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {factorCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-[#121212] border border-white/15 p-5 flex flex-col justify-between space-y-4 hover:border-white/30 transition shadow-md"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono-code mb-2">
                  <span className="text-white/50 uppercase flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 text-[#CCFF00]" />
                    {card.title}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-white/5 border border-white/10 text-white/60">
                    {card.weight}
                  </span>
                </div>

                <div className="flex items-baseline justify-between">
                  <div className="text-2xl font-black font-display text-white">
                    <AnimatedCounter value={card.scoreNum} suffix="%" duration={500} />
                  </div>
                  <div className="text-[10px] text-emerald-400 font-mono-code font-bold uppercase">
                    HIGH FIT
                  </div>
                </div>

                <div className="text-xs font-bold text-[#CCFF00] font-mono-code mt-2">
                  {card.summary}
                </div>

                <p className="text-xs text-white/60 font-sans mt-2 leading-relaxed">
                  {card.detail}
                </p>
              </div>

              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#CCFF00] transition-all duration-700"
                  style={{ width: card.score }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust Philosophy Statement */}
      <div className="bg-[#141414] border border-white/15 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs uppercase tracking-widest text-[#CCFF00] font-bold font-mono-code">
            COSERVE PROTOCOL PROMISE
          </div>
          <div className="text-base sm:text-lg font-bold font-display uppercase text-white">
            FairMatch does not randomly assign work. Every recommendation can be explained.
          </div>
          <div className="text-xs text-white/60 font-sans">
            No sponsored ads • No bidding wars • Qualification first • Balanced opportunity among suitable peers.
          </div>
        </div>

        {onBookWinner && (
          <button
            onClick={() => onBookWinner(winner)}
            className="shrink-0 px-6 py-3 bg-[#CCFF00] hover:bg-[#D4FF00] text-[#0A0A0A] text-xs font-black uppercase tracking-wider flex items-center gap-2 transition active:scale-95 shadow-lg"
          >
            <span>Proceed to Book {winner.name}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
