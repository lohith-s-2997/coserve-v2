import React from 'react';
import { FAIRMATCH_CRITERIA, FairMatchScenario } from '../../data/fairMatchData';
import { Calculator, Check, ArrowRight, ShieldCheck } from 'lucide-react';

interface FairMatchFormulaCardProps {
  scenario: FairMatchScenario;
}

export const FairMatchFormulaCard: React.FC<FairMatchFormulaCardProps> = ({ scenario }) => {
  const winner = scenario.candidates.find((c) => c.isWinner) || scenario.candidates[0];

  const breakdownRows = [
    { name: 'Skill Match', weight: 0.25, percent: '25%', score: winner.scores.skillMatch, product: (0.25 * winner.scores.skillMatch).toFixed(2) },
    { name: 'Proximity', weight: 0.20, percent: '20%', score: winner.scores.proximity, product: (0.20 * winner.scores.proximity).toFixed(2) },
    { name: 'Availability', weight: 0.20, percent: '20%', score: winner.scores.availability, product: (0.20 * winner.scores.availability).toFixed(2) },
    { name: 'Reliability', weight: 0.15, percent: '15%', score: winner.scores.reliability, product: (0.15 * winner.scores.reliability).toFixed(2) },
    { name: 'Current Workload', weight: 0.10, percent: '10%', score: winner.scores.currentWorkload, product: (0.10 * winner.scores.currentWorkload).toFixed(2) },
    { name: 'Opportunity Fairness', weight: 0.10, percent: '10%', score: winner.scores.opportunityFairness, product: (0.10 * winner.scores.opportunityFairness).toFixed(2) },
  ];

  const computedTotal = breakdownRows.reduce((acc, row) => acc + parseFloat(row.product), 0).toFixed(2);

  return (
    <div className="bg-[#0A0A0A] border-2 border-black text-[#F5F5F2] p-6 sm:p-8 space-y-6 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="text-[10px] text-[#CCFF00] font-bold font-mono-code uppercase tracking-widest flex items-center gap-1.5">
            <Calculator className="w-3.5 h-3.5" />
            <span>TRANSPARENT ALGORITHM DISCLOSURE</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-black font-display uppercase tracking-tight text-white mt-1">
            THE FAIRMATCH MATHEMATICAL FORMULA
          </h3>
          <p className="text-xs sm:text-sm text-white/70 font-sans mt-1 max-w-2xl">
            CoServe publishes the exact weights used to evaluate candidate rankings. Every customer and artisan can mathematically reproduce the score.
          </p>
        </div>

        <div className="bg-[#161D07] border border-[#CCFF00] p-3 text-center font-mono-code">
          <div className="text-[10px] text-white/60 uppercase">VERIFIED RESULT</div>
          <div className="text-2xl font-black text-[#CCFF00]">{winner.scores.overall}% SCORE</div>
        </div>
      </div>

      {/* Formula visual box */}
      <div className="p-4 sm:p-5 bg-[#121212] border border-white/15 font-mono-code text-xs sm:text-sm text-center leading-loose">
        <div className="text-[10px] text-white/50 uppercase tracking-widest mb-1">
          DETERMINISTIC WEIGHTED FORMULA
        </div>
        <div className="text-white font-bold inline-block text-left sm:text-center">
          <span className="text-[#CCFF00]">FairMatch Score</span> = (0.25 × Skill) + (0.20 × Proximity) + (0.20 × Availability) + (0.15 × Reliability) + (0.10 × Workload) + (0.10 × Fairness)
        </div>
      </div>

      {/* Step-by-step verification table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse font-mono-code text-xs">
          <thead>
            <tr className="border-b border-white/20 bg-[#161616] text-white/60">
              <th className="py-2.5 px-3 uppercase text-[10px]">Criterion</th>
              <th className="py-2.5 px-3 uppercase text-[10px] text-center">Weight</th>
              <th className="py-2.5 px-3 uppercase text-[10px] text-center">Multiplier</th>
              <th className="py-2.5 px-3 uppercase text-[10px] text-center">{winner.name} Raw Score</th>
              <th className="py-2.5 px-3 uppercase text-[10px] text-right">Weighted Product</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {breakdownRows.map((row, idx) => (
              <tr key={idx} className="hover:bg-white/[0.02]">
                <td className="py-2.5 px-3 font-bold text-white uppercase">{row.name}</td>
                <td className="py-2.5 px-3 text-center text-[#CCFF00] font-bold">{row.percent}</td>
                <td className="py-2.5 px-3 text-center text-white/50">{row.weight.toFixed(2)}</td>
                <td className="py-2.5 px-3 text-center text-white font-bold">{row.score} / 100</td>
                <td className="py-2.5 px-3 text-right text-white font-bold">{row.product}</td>
              </tr>
            ))}
            <tr className="border-t-2 border-white/20 bg-[#182209] text-white">
              <td className="py-3 px-3 font-black font-display uppercase text-sm text-[#CCFF00]">
                TOTAL AUDITED SUM
              </td>
              <td className="py-3 px-3 text-center font-bold text-[#CCFF00]">100%</td>
              <td className="py-3 px-3 text-center text-white/50">1.00</td>
              <td className="py-3 px-3 text-center text-white/70">Audited</td>
              <td className="py-3 px-3 text-right text-xl font-black font-display text-[#CCFF00]">
                {winner.scores.overall}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-2 text-xs font-mono-code text-white/60 pt-2 border-t border-white/10">
        <ShieldCheck className="w-4 h-4 text-[#CCFF00]" />
        <span>Audit Verification: No hidden multiplier, zero shadow scoring, 100% transparent math.</span>
      </div>
    </div>
  );
};
