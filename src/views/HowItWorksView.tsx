import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import {
  Search,
  CheckCircle2,
  Scale,
  Send,
  Wrench,
  Award,
  ArrowRight,
  ShieldCheck,
  Users2,
  Sparkles,
  HeartHandshake,
  TrendingUp,
} from 'lucide-react';

export const HowItWorksView: React.FC = () => {
  const { navigate } = useApp();

  const steps = [
    {
      num: '01',
      title: 'Customer needs service',
      desc: 'Customer selects required service category (e.g. AC Jet Cleaning) and Anna Nagar neighbourhood locality.',
      icon: Search,
      tag: 'Demand Signal',
    },
    {
      num: '02',
      title: 'CoServe discovers verified nearby professionals',
      desc: 'Platform retrieves multi-layer verified tradespeople within the optimal 5 km service radius.',
      icon: ShieldCheck,
      tag: 'Trust Verification',
    },
    {
      num: '03',
      title: 'FairMatch ranks suitable providers',
      desc: 'Explainable algorithm balances technical skill, proximity, availability, reliability, workload, and fair opportunity.',
      icon: Scale,
      tag: 'Transparent Dispatch',
    },
    {
      num: '04',
      title: 'Customer requests service',
      desc: 'Direct booking created with 100% transparent cooperative tariff and scheduled doorstep arrival time.',
      icon: Send,
      tag: 'Zero Commission',
    },
    {
      num: '05',
      title: 'Worker accepts request',
      desc: 'Local professional receives instant dispatch ping with customer location and symptom details.',
      icon: CheckCircle2,
      tag: 'Worker Autonomy',
    },
    {
      num: '06',
      title: 'Doorstep service is performed',
      desc: 'Service progresses through transparent milestones: Requested → Accepted → In Progress → Completed.',
      icon: Wrench,
      tag: 'Verified Execution',
    },
    {
      num: '07',
      title: 'Worker builds reputation & repeat opportunity',
      desc: 'Worker accumulates permanent verified repeat-customer relationships, review equity, and cooperative dividend tokens.',
      icon: Award,
      tag: 'Shared Growth',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-wider font-semibold text-teal-800 font-mono">
          Platform Mechanics & Philosophy
        </span>
        <h1 className="text-3xl sm:text-4xl font-black font-display text-slate-950 tracking-tight">
          How CoServe Works
        </h1>
        <p className="text-base text-slate-600 leading-relaxed">
          From customer demand to cooperative micro-enterprise growth, here is how CoServe powers a modern,
          fair local service economy.
        </p>
      </div>

      {/* The 7 Core Lifecycle Steps */}
      <div className="space-y-4">
        {steps.map((step, idx) => {
          const StepIcon = step.icon;
          return (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs hover:shadow-sm transition flex flex-col sm:flex-row items-start sm:items-center gap-5"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-teal-300 flex items-center justify-center font-bold text-base font-display shrink-0">
                {step.num}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-teal-50 text-teal-800 px-2 py-0.5 rounded border border-teal-200">
                    {step.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold font-display text-slate-900">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 shrink-0 self-end sm:self-center">
                <StepIcon className="w-5 h-5" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Critical Cooperative Philosophy Callout (Exact User Mandate) */}
      <div className="bg-gradient-to-br from-teal-950 via-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-10 space-y-5 border border-teal-900 shadow-xl">
        <div className="flex items-center gap-2">
          <HeartHandshake className="w-5 h-5 text-teal-300" />
          <span className="text-xs font-mono uppercase font-bold tracking-wider text-teal-400">
            Cooperative Relationship Philosophy
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
          Not An Artificial Barrier Between Workers & Customers
        </h2>

        <div className="text-sm text-slate-300 space-y-4 leading-relaxed max-w-3xl">
          <p>
            Traditional predatory aggregator apps use hidden phone numbers, penalize direct contact, and try
            to trap both parties inside high commission tolls.
          </p>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-white font-medium italic">
            “CoServe is not intended to keep workers and customers artificially separated. Its long-term model is to continuously add value through trust, protection, records, rewards, cooperative benefits, community demand, and professional growth.”
          </div>
          <p>
            When customers book through CoServe, they get certified warranty escrow, verified municipal
            background credentials, dispute resolution from the Anna Nagar Cooperative, and loyalty reward
            credits. Workers gain health risk pools, cooperative tools sharing, and fair job distribution.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <button
            onClick={() => navigate('/services')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition flex items-center justify-center gap-2 text-center"
          >
            <span>Try Live Service Booking</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
