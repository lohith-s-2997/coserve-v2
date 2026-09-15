import React, { useState } from 'react';
import { Users, AlertTriangle, ShieldCheck, Check, Scale } from 'lucide-react';

export const FairMatchOpportunitySim: React.FC = () => {
  const [viewMode, setViewMode] = useState<'coserve' | 'traditional'>('coserve');

  // 15 jobs distributed
  const traditionalDistribution = [
    { name: 'Ad Sponsor / Top Bidder', count: 12, percent: '80%', status: 'Burned out (delays & fatigue)' },
    { name: 'Prakash N. (Qualified)', count: 1, percent: '7%', status: 'Starved of local work' },
    { name: 'Karthik S. (Qualified)', count: 1, percent: '7%', status: 'Under-utilized craft' },
    { name: 'Suresh M. (Qualified)', count: 1, percent: '6%', status: 'Zero ad budget penalty' },
  ];

  const coserveDistribution = [
    { name: 'Arjun Raj (ITI Master)', count: 5, percent: '33%', status: 'Optimal focus (no fatigue)' },
    { name: 'Prakash N. (Technician)', count: 4, percent: '27%', status: 'Steady neighborhood income' },
    { name: 'Karthik S. (Senior Tech)', count: 3, percent: '20%', status: 'Balanced local schedule' },
    { name: 'Suresh M. (AC Tech)', count: 3, percent: '20%', status: 'Sustainable cooperative growth' },
  ];

  const currentList = viewMode === 'coserve' ? coserveDistribution : traditionalDistribution;

  return (
    <div className="bg-[#0A0A0A] border-2 border-black text-[#F5F5F2] p-6 sm:p-8 space-y-6 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="text-[10px] text-[#CCFF00] font-bold font-mono-code uppercase tracking-widest flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5" />
            <span>COMMUNITY WORKLOAD SAFEGUARD • 15 JOB DISPATCH SIMULATION</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-black font-display uppercase tracking-tight text-white mt-1">
            WHY FAIR OPPORTUNITY MATTERS
          </h3>
          <p className="text-xs sm:text-sm text-white/70 font-sans mt-1 max-w-2xl">
            CoServe considers workload and opportunity distribution <em>after qualification</em>, helping suitable professionals receive visibility without sacrificing service quality.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 font-mono-code text-xs bg-white/5 border border-white/10 p-1">
          <button
            onClick={() => setViewMode('coserve')}
            className={`px-3 py-1.5 uppercase font-bold transition ${
              viewMode === 'coserve'
                ? 'bg-[#CCFF00] text-black'
                : 'text-white/60 hover:text-white'
            }`}
          >
            CoServe FairMatch
          </button>
          <button
            onClick={() => setViewMode('traditional')}
            className={`px-3 py-1.5 uppercase font-bold transition ${
              viewMode === 'traditional'
                ? 'bg-amber-400 text-black'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Ad-Driven Platform
          </button>
        </div>
      </div>

      {/* Core comparison statement */}
      <div
        className={`p-4 border text-xs sm:text-sm font-sans flex items-start gap-3 ${
          viewMode === 'coserve'
            ? 'bg-[#161D07] border-[#CCFF00]/60 text-white/90'
            : 'bg-amber-950/40 border-amber-500/40 text-amber-200/90'
        }`}
      >
        {viewMode === 'coserve' ? (
          <ShieldCheck className="w-5 h-5 text-[#CCFF00] shrink-0 mt-0.5" />
        ) : (
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        )}
        <div>
          {viewMode === 'coserve' ? (
            <div>
              <strong className="text-[#CCFF00] uppercase font-mono-code">
                COSERVE DEMOCRATIC BALANCING:
              </strong>{' '}
              All 15 jobs in Anna Nagar this month are distributed fairly among all 4 qualified HVAC artisans. No worker is burned out, arrival times are respected, and no craftsman is starved out for refusing to pay ad commissions.
            </div>
          ) : (
            <div>
              <strong className="text-amber-400 uppercase font-mono-code">
                EXTRACTIVE PLATFORM MONOPOLY:
              </strong>{' '}
              A single top bidder pays high lead fees and receives 80% of local jobs (12 jobs). The artisan suffers severe burnout, arrives 3 hours late, while 3 equally certified neighbors sit idle.
            </div>
          )}
        </div>
      </div>

      {/* Visual Bars for 15 Jobs */}
      <div className="space-y-4">
        <div className="text-xs uppercase font-mono-code text-white/60 flex justify-between">
          <span>DISPATCH DISTRIBUTION OF 15 NEIGHBORHOOD JOBS</span>
          <span className="text-[#CCFF00] font-bold">{viewMode === 'coserve' ? 'Balanced (5-4-3-3)' : 'Skewed (12-1-1-1)'}</span>
        </div>

        <div className="space-y-3 font-mono-code text-xs">
          {currentList.map((item, idx) => (
            <div key={idx} className="p-3 bg-[#121212] border border-white/10 space-y-1.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="font-bold text-white uppercase">{item.name}</span>
                <span className="text-xs text-white/50">{item.status}</span>
              </div>

              {/* Progress bar container */}
              <div className="flex items-center gap-3">
                <div className="grow h-3 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      viewMode === 'coserve'
                        ? 'bg-[#CCFF00]'
                        : idx === 0
                        ? 'bg-amber-400'
                        : 'bg-white/30'
                    }`}
                    style={{ width: `${(item.count / 15) * 100}%` }}
                  />
                </div>
                <div className="w-16 text-right font-black font-display text-sm text-white shrink-0">
                  {item.count} jobs
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quote callout */}
      <div className="pt-2 border-t border-white/10 text-center text-xs sm:text-sm font-mono-code text-white/70">
        &ldquo;Qualification first. Fair opportunity among suitable professionals.&rdquo;
      </div>
    </div>
  );
};
