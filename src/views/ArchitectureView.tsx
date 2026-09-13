import React from 'react';
import { motion } from 'motion/react';
import {
  Layers,
  Database,
  Server,
  Cloud,
  Cpu,
  ShieldCheck,
  Bell,
  CreditCard,
  MapPin,
  CheckCircle2,
  Workflow,
  Sparkles,
} from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-wider font-semibold text-teal-800 font-mono">
          Smart India Hackathon 2026 Specification
        </span>
        <h1 className="text-3xl sm:text-4xl font-black font-display text-slate-950 tracking-tight">
          Technical Architecture & Roadmap
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Transparent evaluation matrix comparing our working first-stage prototype with the planned
          production deployment stack.
        </p>
      </div>

      {/* Two Column Layout: Current Prototype vs Intended Production */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left: CURRENT DEMO IMPLEMENTATION */}
        <div className="bg-white rounded-3xl border-2 border-teal-500/80 p-6 sm:p-8 shadow-md relative overflow-hidden space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                Live In This App
              </span>
              <h2 className="text-2xl font-bold font-display text-slate-950 mt-1">
                Current Demo Implementation
              </h2>
            </div>
            <div className="w-10 h-10 rounded-xl bg-teal-800 text-white flex items-center justify-center font-bold">
              v1.0
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Engineered as a zero-dependency, self-contained interactive prototype optimized for reliable,
            instant demonstration on projector hardware during SIH jury evaluation without external network points of failure.
          </p>

          <div className="space-y-3">
            {[
              {
                title: 'React 19 & TypeScript Frontend',
                desc: 'Single-page architecture with strict type contracts, modular components, and fluid layout.',
                icon: Layers,
              },
              {
                title: 'Seeded Local Neighbourhood Dataset',
                desc: 'Realistic Anna Nagar tradespeople dataset with authentic pricing, reviews, and credentials.',
                icon: Database,
              },
              {
                title: 'Local State & Reactive Sync',
                desc: 'Fast in-memory state with synchronous UI re-rendering and contextual updates.',
                icon: Workflow,
              },
              {
                title: 'localStorage Cross-Session Persistence',
                desc: 'Persists active bookings, status transitions, and user roles across browser refreshes.',
                icon: Server,
              },
              {
                title: 'Simulated Instant Role Switching',
                desc: '1-click toggling between Customer (Arun Kumar), Worker (Arjun Raj), and Admin views.',
                icon: Cpu,
              },
              {
                title: 'Simulated Provider Verification Tiers',
                desc: 'Identity, trade skill, and cooperative council badges with transparent audit indicators.',
                icon: ShieldCheck,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-teal-50/40 border border-teal-200/70 flex items-start gap-3 text-xs"
              >
                <div className="w-7 h-7 rounded-lg bg-teal-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <item.icon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">{item.title}</span>
                  <span className="text-slate-600 mt-0.5 block leading-normal">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 font-mono">
            Status: Fully operational in this browser session. Zero API keys required.
          </div>
        </div>

        {/* Right: INTENDED PRODUCTION ARCHITECTURE */}
        <div className="bg-[#0F172A] text-white rounded-3xl border border-slate-800 p-6 sm:p-8 shadow-xl relative overflow-hidden space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded">
                Production Roadmap
              </span>
              <h2 className="text-2xl font-bold font-display text-white mt-1">
                Intended Production Architecture
              </h2>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-emerald-400 flex items-center justify-center font-bold">
              v2.0
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Multi-tier cloud architecture planned for the nationwide Smart India Hackathon deployment
            phase to support thousands of municipal cooperative clusters simultaneously.
          </p>

          <div className="space-y-3">
            {[
              {
                title: 'React Progressive Web Application (PWA)',
                desc: 'Offline-ready mobile worker interface with background GPS sync and lightweight battery footprint.',
                icon: Layers,
              },
              {
                title: 'Firebase Authentication & Aadhaar e-KYC',
                desc: 'Government identity API integration with SMS OTP sign-in and police verification audits.',
                icon: ShieldCheck,
              },
              {
                title: 'Cloud Firestore Realtime Database',
                desc: 'Multi-region sub-second synchronization for live doorstep dispatching and status streams.',
                icon: Cloud,
              },
              {
                title: 'Cloud Functions Event Handlers',
                desc: 'Serverless execution for FairMatch calculation, dispute escalation, and tariff splits.',
                icon: Cpu,
              },
              {
                title: 'Real-time Push Notifications (FCM / WhatsApp API)',
                desc: 'Automated SMS and WhatsApp dispatch pings to technicians upon customer booking creation.',
                icon: Bell,
              },
              {
                title: 'UPI & Escrow Payment Gateway Integration',
                desc: 'Instant split payments via NPCI UPI with cooperative warranty escrow and dispute freeze.',
                icon: CreditCard,
              },
              {
                title: 'Location & Geospatial Radius Matching (PostGIS / Maps API)',
                desc: 'Real-time polygon clustering for 5 km municipal ward coverage and live route tracking.',
                icon: MapPin,
              },
              {
                title: 'FairMatch Weighted Engine & Community Clustering',
                desc: 'Automated municipal demand grouping and workload-balancing quadratic distribution algorithms.',
                icon: Workflow,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-3 text-xs"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center justify-center shrink-0 mt-0.5">
                  <item.icon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-bold text-white block">{item.title}</span>
                  <span className="text-slate-400 mt-0.5 block leading-normal">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 font-mono">
            Note: This demo does not simulate or pretend to connect to external paid cloud services.
          </div>
        </div>
      </div>
    </div>
  );
};
