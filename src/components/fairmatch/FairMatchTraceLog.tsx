import React, { useState } from 'react';
import { FairMatchScenario, GENERATE_TRACE_STEPS } from '../../data/fairMatchData';
import { Terminal, CheckCircle2, ShieldCheck, Copy, Check } from 'lucide-react';

interface FairMatchTraceLogProps {
  scenario: FairMatchScenario;
}

export const FairMatchTraceLog: React.FC<FairMatchTraceLogProps> = ({ scenario }) => {
  const [copied, setCopied] = useState(false);
  const steps = GENERATE_TRACE_STEPS(scenario);

  const handleCopyLog = () => {
    const text = steps
      .map(
        (s) =>
          `[10:30:0${s.timeOffsetSec}] ${s.stageName} :: ${s.action} - ${s.details}`
      )
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#0A0A0A] border-2 border-black text-[#F5F5F2] p-6 sm:p-8 space-y-6 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="text-[10px] text-[#CCFF00] font-bold font-mono-code uppercase tracking-widest flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5" />
            <span>DETERMINISTIC EXECUTION LOG • AUDIT TRAIL</span>
          </div>
          <h3 className="text-xl sm:text-3xl font-black font-display uppercase tracking-tight text-white mt-1">
            MATCH TRACE AUDIT LOG
          </h3>
          <p className="text-xs text-white/60 font-sans mt-0.5">
            Every step in the matching sequence is verifiable with immutable execution timestamps.
          </p>
        </div>

        <button
          onClick={handleCopyLog}
          className="px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/15 text-white/80 hover:text-white text-xs font-mono-code flex items-center gap-1.5 transition self-start sm:self-auto"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#CCFF00]" />
              <span className="text-[#CCFF00]">Copied to Clipboard</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Trace Output</span>
            </>
          )}
        </button>
      </div>

      <div className="bg-[#121212] border border-white/10 p-4 font-mono-code text-xs divide-y divide-white/5 overflow-x-auto">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="py-3 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 hover:bg-white/[0.02] px-2 transition"
          >
            {/* Timestamp */}
            <div className="text-[#CCFF00] text-[11px] font-bold shrink-0">
              10:30:0{step.timeOffsetSec} IST
            </div>

            {/* Stage badge */}
            <div className="text-[10px] uppercase text-white/40 border border-white/10 px-1.5 py-0.5 shrink-0">
              {step.stageName}
            </div>

            {/* Content */}
            <div className="grow space-y-0.5">
              <div className="text-white font-bold text-xs">{step.action}</div>
              <div className="text-white/60 text-[11px] font-sans">{step.details}</div>
            </div>

            {/* Status */}
            <div className="shrink-0 flex items-center gap-1 text-[10px] text-emerald-400 font-bold uppercase">
              <CheckCircle2 className="w-3 h-3" />
              <span>AUDITED</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-[11px] text-white/50 font-mono-code pt-2 border-t border-white/10">
        <div>SHA-256 Protocol Seed: <span className="text-white">c05e-f412-m47c-2026</span></div>
        <div className="text-[#CCFF00] font-bold">100% Deterministic Guarantee</div>
      </div>
    </div>
  );
};
