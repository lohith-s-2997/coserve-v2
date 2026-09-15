import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  FairMatchScenario,
  FAIRMATCH_CRITERIA,
  FairMatchCandidate,
} from '../../data/fairMatchData';
import { AnimatedCounter } from './AnimatedCounter';
import { Check, ShieldCheck, Scale, Award, Info, AlertTriangle } from 'lucide-react';

interface FairMatchScoreBoardProps {
  scenario: FairMatchScenario;
}

export const FairMatchScoreBoard: React.FC<FairMatchScoreBoardProps> = ({ scenario }) => {
  const [selectedCandidateId, setSelectedCandidateId] = useState<string>(
    scenario.winnerCandidateId
  );

  const selectedCandidate =
    scenario.candidates.find((c) => c.id === selectedCandidateId) ||
    scenario.candidates[0];

  const criteriaList = [
    {
      id: 'skill',
      name: 'Skill Match',
      weight: '25%',
      key: 'skillMatch' as const,
      desc: 'Vocational trade certification & specialized tooling capability',
    },
    {
      id: 'proximity',
      name: 'Proximity',
      weight: '20%',
      key: 'proximity' as const,
      desc: 'Localized distance and low-carbon neighborhood routing',
    },
    {
      id: 'availability',
      name: 'Availability',
      weight: '20%',
      key: 'availability' as const,
      desc: 'Direct slot sync with the customer requested window',
    },
    {
      id: 'reliability',
      name: 'Reliability',
      weight: '15%',
      key: 'reliability' as const,
      desc: 'Repeat customer retention and verified job completion history',
    },
    {
      id: 'workload',
      name: 'Workload Balance',
      weight: '10%',
      key: 'currentWorkload' as const,
      desc: 'Worker fatigue protection buffer (optimal 3-6 jobs/week)',
    },
    {
      id: 'fairness',
      name: 'Opportunity Fairness',
      weight: '10%',
      key: 'opportunityFairness' as const,
      desc: 'Anti-monopoly rotation among suitable qualified local peers',
    },
  ];

  return (
    <div className="bg-[#0A0A0A] border-2 border-black text-[#F5F5F2] p-6 sm:p-8 space-y-8 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="text-[10px] text-[#CCFF00] font-bold font-mono-code uppercase tracking-widest flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5" />
            <span>TRANSPARENT EVALUATION MATRIX • 6 CRITERIA AUDIT</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-black font-display uppercase tracking-tight text-white mt-1">
            CANDIDATE COMPARISON BOARD
          </h3>
          <p className="text-xs sm:text-sm text-white/70 font-sans mt-1 max-w-2xl">
            Every candidate evaluated for this service is shown below. CoServe does not hide candidates behind sponsored bids. All scores trace directly to the deterministic formula.
          </p>
        </div>

        <div className="text-xs font-mono-code text-white/60 bg-white/5 border border-white/10 p-3">
          <div>Formula: <strong className="text-[#CCFF00]">Σ (Criterion Score × Weight)</strong></div>
          <div className="text-[10px] text-white/40 mt-0.5">Scale: 0 - 100 • Deterministic Evaluation</div>
        </div>
      </div>

      {/* The Matrix Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse font-mono-code text-xs">
          <thead>
            <tr className="border-b-2 border-white/20 bg-[#141414] text-white/70">
              <th className="py-3 px-4 uppercase tracking-wider text-[11px] font-bold">
                EVALUATION CRITERION
              </th>
              <th className="py-3 px-3 uppercase tracking-wider text-[10px] text-white/50 text-center">
                WEIGHT
              </th>
              {scenario.candidates.map((cand) => (
                <th
                  key={cand.id}
                  onClick={() => setSelectedCandidateId(cand.id)}
                  className={`py-3 px-4 cursor-pointer transition text-center ${
                    cand.isWinner
                      ? 'bg-[#182109] text-[#CCFF00] border-t-2 border-x-2 border-[#CCFF00]'
                      : selectedCandidateId === cand.id
                      ? 'bg-white/10 text-white'
                      : 'hover:bg-white/5 text-white/80'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <span className="font-display font-black text-sm uppercase">
                      {cand.name}
                    </span>
                    <span className="text-[10px] opacity-70 font-normal font-sans">
                      {cand.business}
                    </span>
                    {cand.isWinner && (
                      <span className="mt-1 px-1.5 py-0.5 bg-[#CCFF00] text-black text-[9px] font-bold uppercase">
                        Rank #1 Winner
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {criteriaList.map((crit) => (
              <tr key={crit.id} className="hover:bg-white/[0.02] transition">
                <td className="py-3.5 px-4 font-bold text-white">
                  <div className="text-xs uppercase">{crit.name}</div>
                  <div className="text-[10px] text-white/50 font-sans font-normal mt-0.5 hidden sm:block">
                    {crit.desc}
                  </div>
                </td>
                <td className="py-3.5 px-3 text-center text-white/60 font-bold text-[11px]">
                  {crit.weight}
                </td>
                {scenario.candidates.map((cand) => {
                  const val = cand.scores[crit.key];
                  const isHigh = val >= 90;
                  const isLow = val < 70;
                  const isWinnerCol = cand.isWinner;

                  return (
                    <td
                      key={cand.id}
                      onClick={() => setSelectedCandidateId(cand.id)}
                      className={`py-3.5 px-4 text-center cursor-pointer transition ${
                        isWinnerCol ? 'bg-[#161f08]/60 border-x-2 border-[#CCFF00]/40' : ''
                      }`}
                    >
                      <div className="inline-flex flex-col items-center">
                        <span
                          className={`font-black text-sm ${
                            isWinnerCol
                              ? 'text-[#CCFF00]'
                              : isHigh
                              ? 'text-white font-bold'
                              : isLow
                              ? 'text-amber-400'
                              : 'text-white/80'
                          }`}
                        >
                          <AnimatedCounter value={val} duration={400} />
                        </span>
                        {/* Tiny meter bar */}
                        <div className="w-16 h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
                          <div
                            className={`h-full transition-all duration-500 ${
                              isWinnerCol
                                ? 'bg-[#CCFF00]'
                                : isLow
                                ? 'bg-amber-400'
                                : 'bg-white/60'
                            }`}
                            style={{ width: `${val}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}

            {/* Overall Row */}
            <tr className="border-t-2 border-white/20 bg-[#161616]">
              <td className="py-4 px-4 font-black uppercase text-white font-display text-sm">
                FINAL FAIRMATCH INDEX
              </td>
              <td className="py-4 px-3 text-center text-[10px] text-white/40 uppercase">
                100%
              </td>
              {scenario.candidates.map((cand) => (
                <td
                  key={cand.id}
                  onClick={() => setSelectedCandidateId(cand.id)}
                  className={`py-4 px-4 text-center cursor-pointer ${
                    cand.isWinner
                      ? 'bg-[#1e2b0b] border-x-2 border-b-2 border-[#CCFF00]'
                      : ''
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <span
                      className={`text-2xl sm:text-3xl font-black font-display ${
                        cand.isWinner ? 'text-[#CCFF00]' : 'text-white'
                      }`}
                    >
                      <AnimatedCounter value={cand.scores.overall} suffix="%" duration={500} />
                    </span>
                    <span className="text-[10px] text-white/60 uppercase mt-0.5">
                      {cand.isWinner ? 'BEST MATCH' : 'QUALIFIED'}
                    </span>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Selected Candidate Audit Card */}
      <div className="bg-[#121212] border border-white/15 p-4 sm:p-6 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase text-white/50 font-mono-code">
              AUDIT DRILLDOWN:
            </span>
            <span className="text-base font-black font-display uppercase text-white">
              {selectedCandidate.name} ({selectedCandidate.business})
            </span>
            {selectedCandidate.isWinner && (
              <span className="px-2 py-0.5 bg-[#CCFF00] text-black text-[10px] font-bold uppercase">
                Winning Match
              </span>
            )}
          </div>
          <div className="text-xs font-mono-code text-[#CCFF00] font-bold">
            FairMatch Index: {selectedCandidate.scores.overall}%
          </div>
        </div>

        <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed">
          {selectedCandidate.explanationWhy}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 font-mono-code text-xs">
          <div className="p-2.5 bg-white/5 border border-white/10">
            <div className="text-[10px] text-white/40 uppercase">DISTANCE</div>
            <div className="text-white font-bold mt-0.5">{selectedCandidate.distanceText}</div>
          </div>
          <div className="p-2.5 bg-white/5 border border-white/10">
            <div className="text-[10px] text-white/40 uppercase">SLOT AVAILABILITY</div>
            <div className="text-white font-bold mt-0.5">{selectedCandidate.availabilityText}</div>
          </div>
          <div className="p-2.5 bg-white/5 border border-white/10">
            <div className="text-[10px] text-white/40 uppercase">ACTIVE WEEKLY LOAD</div>
            <div className="text-white font-bold mt-0.5">
              {selectedCandidate.workloadJobsThisWeek} jobs ({selectedCandidate.workloadStatus})
            </div>
          </div>
          <div className="p-2.5 bg-white/5 border border-white/10">
            <div className="text-[10px] text-white/40 uppercase">REPUTATION HISTORY</div>
            <div className="text-white font-bold mt-0.5">
              ★ {selectedCandidate.rating} ({selectedCandidate.completedJobs} jobs)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
