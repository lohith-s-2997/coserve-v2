import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { NetworkVisual } from '../components/NetworkVisual';
import { ServiceUniverse } from '../components/ServiceUniverse';
import { INITIAL_PROVIDERS } from '../data/providers';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Sliders,
  Sparkles,
  ArrowUpRight,
  Activity,
  Check,
  ChevronRight,
  Layers,
  Coins,
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { navigate, setSelectedCategoryFilter, setRole, setBookingModalProvider, setFairMatchModalProvider, setTestBookingModalOpen } = useApp();

  const arjunProvider = INITIAL_PROVIDERS.find((p) => p.id === 'prov-arjun-ac') || INITIAL_PROVIDERS[0];

  const floatingProfessions = [
    { trade: 'HVAC TECHNICIAN', rate: '₹500 Direct', pro: 'Arjun Raj', badge: 'ITI Certified' },
    { trade: 'DEEP SANITATION', rate: '₹650 Direct', pro: 'Kavitha S.', badge: 'Sanitation Guild' },
    { trade: 'LICENSED ELECTRICIAN', rate: '₹400 Direct', pro: 'Murugan V.', badge: 'Grade-A Wireman' },
    { trade: 'MOBILE MECHANIC', rate: '₹350 Direct', pro: 'Velan K.', badge: 'Rapid Assist' },
    { trade: 'WELLNESS & SALON', rate: '₹750 Direct', pro: 'Shifa Banu', badge: 'CIDESCO Certified' },
    { trade: 'MASTER CARPENTER', rate: '₹550 Direct', pro: 'Anand M.', badge: 'Craft Council' },
  ];

  return (
    <div className="w-full bg-[#0A0A0A] text-[#F5F5F2] font-mono-code overflow-hidden">
      {/* ========================================================================= */}
      {/* SECTION 1: FIRST SCREEN (Full Viewport, Minimal, Black #0A0A0A) */}
      {/* ========================================================================= */}
      <section className="min-h-screen relative flex flex-col justify-between px-4 sm:px-6 lg:px-8 pt-8 pb-14 border-b border-white/10 bg-[#0A0A0A]">
        {/* Top Minimal Coordinate Header */}
        <div className="flex items-center justify-between text-[11px] text-white/40 pb-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#CCFF00]" />
            <span className="text-[#CCFF00] font-bold">PUBLIC CIVIC DIRECTORY</span>
            <span className="text-white/20">/</span>
            <span>COOPERATIVE SERVICE NETWORK</span>
          </div>
          <div className="hidden sm:block">
            <span>AUTONOMOUS WORKER COOPERATIVE PROTOCOL</span>
          </div>
        </div>

        {/* Massive Editorial Typography Block */}
        <div className="my-auto py-10 space-y-6">
          <div className="space-y-1">
            <div className="text-xs sm:text-sm uppercase tracking-widest text-[#CCFF00] font-bold">
              TRUST, WITHOUT THE MIDDLEMAN MENTALITY.
            </div>
            <h1 className="text-[clamp(2.75rem,11vw,7.5rem)] font-black font-display tracking-tighter text-white uppercase leading-[0.88] break-words">
              COSERVE
            </h1>
            <div className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-display tracking-tight text-white/90 uppercase mt-2">
              LOCAL SERVICES.<br />
              <span className="text-[#CCFF00]">SHARED GROWTH.</span>
            </div>
          </div>

          <p className="text-sm sm:text-lg text-white/70 max-w-2xl font-sans leading-relaxed pt-2">
            Your neighbourhood already has the skills. CoServe builds the network.
            From home repairs to personal care and mobility support — trusted services, closer to you.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-4">
            <button
              onClick={() => {
                setSelectedCategoryFilter('all');
                navigate('/services');
              }}
              className="w-full sm:w-auto justify-center px-6 sm:px-8 py-3.5 sm:py-4 bg-[#CCFF00] hover:bg-[#D4FF00] text-[#0A0A0A] text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2.5 transition"
            >
              <span>Explore Skilled Network</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setTestBookingModalOpen(true);
              }}
              className="w-full sm:w-auto justify-center px-6 sm:px-8 py-3.5 sm:py-4 bg-white/5 hover:bg-white/10 border border-white/20 text-white text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2.5 transition"
            >
              <span>Test Booking</span>
              <Sparkles className="w-4 h-4 text-[#CCFF00]" />
            </button>
          </div>
        </div>

        {/* Embedded Abstract Service Network Canvas Preview */}
        <div className="pt-8">
          <NetworkVisual />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: “EVERY STREET HAS SKILL.” (Off-White #F5F5F2 Environment) */}
      {/* ========================================================================= */}
      <section className="bg-[#F5F5F2] text-[#0A0A0A] py-24 px-4 sm:px-6 lg:px-8 border-b border-black/10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-black/15">
            <div>
              <div className="text-black/50 text-xs font-bold uppercase tracking-widest">
                TALENT DENSITY IN YOUR NEIGHBOURHOOD
              </div>
              <h2 className="text-5xl sm:text-7xl md:text-8xl font-black font-display text-[#0A0A0A] uppercase tracking-tighter mt-3 leading-[0.9]">
                EVERY STREET<br />HAS SKILL.
              </h2>
            </div>
            <p className="text-black/70 text-sm sm:text-base max-w-md font-sans leading-relaxed">
              Electricians, refrigeration specialists, deep cleaners, masons, carpenters, and beauticians live within
              3 kilometres of your front door. Why pay a remote tech giant 30% to find them?
            </p>
          </div>

          {/* Asymmetrical Grid of Verified Street Trades */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {floatingProfessions.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSelectedCategoryFilter('all');
                  navigate('/services');
                }}
                className="p-6 bg-white border border-black/10 hover:border-black transition-all cursor-pointer group shadow-2xs"
              >
                <div className="flex items-center justify-between text-xs text-black/50">
                  <span className="font-mono-code font-bold">0{idx + 1}</span>
                  <span className="text-[10px] uppercase tracking-wider bg-black/5 px-2 py-0.5 border border-black/10">
                    {item.badge}
                  </span>
                </div>
                <div className="text-xl sm:text-2xl font-black font-display text-black uppercase mt-4 group-hover:underline">
                  {item.trade}
                </div>
                <div className="text-xs text-black/60 font-sans mt-1">
                  Anchor Master: <span className="font-bold text-black">{item.pro}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono-code pt-4 mt-4 border-t border-black/10">
                  <span className="text-black font-bold">{item.rate}</span>
                  <span className="text-black/40 group-hover:text-black flex items-center gap-1 transition">
                    Profile <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: “THE PROBLEM ISN’T THE LACK OF TALENT...” (Black #0A0A0A Data Viz) */}
      {/* ========================================================================= */}
      <section className="bg-[#0A0A0A] text-[#F5F5F2] py-24 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-4 max-w-4xl">
            <div className="text-[#CCFF00] text-xs font-bold uppercase tracking-widest">
              STRUCTURAL DIAGNOSIS
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-display text-white uppercase tracking-tight leading-[0.95]">
              THE PROBLEM ISN’T<br />
              THE LACK OF TALENT.<br />
              <span className="text-[#CCFF00]">IT’S THE LACK OF A NETWORK.</span>
            </h2>
          </div>

          {/* Interactive Visual Contrast: Separated Nodes vs. CoServe Connected Network */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#121212] border border-white/15 p-6 sm:p-10">
            {/* Left Column: Fragmented extractive model */}
            <div className="lg:col-span-5 space-y-4 border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-8">
              <div className="text-[11px] text-red-400 font-bold uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <span>EXTRACTIVE MONOPOLY PLATFORMS</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase">
                Anonymized Labor & Artificial Tolls
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-white/70 font-sans">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold font-mono-code">✕</span>
                  <span>Workers charged 25% to 35% commission on every job.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold font-mono-code">✕</span>
                  <span>Customers masked; workers cannot build repeat client relationships.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold font-mono-code">✕</span>
                  <span>Algorithms prioritize paid advertising over local craft reputation.</span>
                </li>
              </ul>
            </div>

            {/* Right Column: CoServe Cooperative Model */}
            <div className="lg:col-span-7 space-y-4 lg:pl-4">
              <div className="text-[11px] text-[#CCFF00] font-bold uppercase tracking-widest flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#CCFF00]" />
                <span>THE COSERVE COOPERATIVE BRIDGE</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-black text-white uppercase">
                Direct Reputation & Democratic Ownership
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-4 bg-black/60 border border-white/10">
                  <div className="text-xs font-bold text-[#CCFF00] uppercase font-mono-code">
                    100% DIRECT EARNING
                  </div>
                  <div className="text-xs text-white/70 font-sans mt-1">
                    Customers pay the provider directly. Zero commission taken from trade wages.
                  </div>
                </div>
                <div className="p-4 bg-black/60 border border-white/10">
                  <div className="text-xs font-bold text-[#CCFF00] uppercase font-mono-code">
                    FAIRMATCH™ ENGINE
                  </div>
                  <div className="text-xs text-white/70 font-sans mt-1">
                    Algorithmic transparency. Balanced workload distribution without pay-to-play.
                  </div>
                </div>
                <div className="p-4 bg-black/60 border border-white/10">
                  <div className="text-xs font-bold text-[#CCFF00] uppercase font-mono-code">
                    CIVIC TOOL LIBRARIES
                  </div>
                  <div className="text-xs text-white/70 font-sans mt-1">
                    Shared high-grade diagnostic tools, thermal cameras, and pressure jet washers.
                  </div>
                </div>
                <div className="p-4 bg-black/60 border border-white/10">
                  <div className="text-xs font-bold text-[#CCFF00] uppercase font-mono-code">
                    ESCROW REPUTATION
                  </div>
                  <div className="text-xs text-white/70 font-sans mt-1">
                    Mutual protection with verified neighborhood reviews and zero fake ratings.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: “ONE SERVICE. THREE WINNERS.” (Off-White #F5F5F2 Editorial) */}
      {/* ========================================================================= */}
      <section className="bg-[#F5F5F2] text-[#0A0A0A] py-24 px-4 sm:px-6 lg:px-8 border-b border-black/10">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-black/15">
            <div>
              <div className="text-black/50 text-xs font-bold uppercase tracking-widest">
                THE STAKEHOLDER TRIANGLE
              </div>
              <h2 className="text-5xl sm:text-7xl md:text-8xl font-black font-display text-[#0A0A0A] uppercase tracking-tighter mt-3 leading-[0.9]">
                ONE SERVICE.<br />THREE WINNERS.
              </h2>
            </div>
            <p className="text-black/70 text-sm sm:text-base max-w-md font-sans leading-relaxed">
              When gig platforms take 30% tolls, everyone loses. CoServe re-aligns economic incentives so households,
              tradespeople, and neighborhood communities grow together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1: Customer */}
            <div className="p-8 bg-white border border-black/10 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black font-display text-black">01</span>
                <span className="text-[10px] font-mono-code uppercase font-bold tracking-widest bg-black text-white px-2 py-0.5">
                  HOUSEHOLD
                </span>
              </div>
              <h3 className="text-2xl font-black font-display text-black uppercase">
                THE CUSTOMER
              </h3>
              <ul className="space-y-3 text-xs text-black/70 font-sans">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-black shrink-0" />
                  <span>Fair, transparent fixed tariffs with zero surge multipliers.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-black shrink-0" />
                  <span>Direct phone contact and lifelong relationship with your technician.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-black shrink-0" />
                  <span>Escrow safety guarantee backed by local trade guild inspection.</span>
                </li>
              </ul>
            </div>

            {/* Pillar 2: Worker */}
            <div className="p-8 bg-white border border-black/10 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black font-display text-black">02</span>
                <span className="text-[10px] font-mono-code uppercase font-bold tracking-widest bg-black text-white px-2 py-0.5">
                  TRADESPERSON
                </span>
              </div>
              <h3 className="text-2xl font-black font-display text-black uppercase">
                THE WORKER
              </h3>
              <ul className="space-y-3 text-xs text-black/70 font-sans">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-black shrink-0" />
                  <span>Keeps 100% of tariff. Direct bank/UPI transfer upon completion.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-black shrink-0" />
                  <span>Owns customer directory; can receive direct repeat calls.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-black shrink-0" />
                  <span>Cooperative voting rights: 1 member = 1 vote on all policies.</span>
                </li>
              </ul>
            </div>

            {/* Pillar 3: Community */}
            <div className="p-8 bg-white border border-black/10 shadow-xs space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-black font-display text-black">03</span>
                <span className="text-[10px] font-mono-code uppercase font-bold tracking-widest bg-black text-white px-2 py-0.5">
                  CIVIC ZONE
                </span>
              </div>
              <h3 className="text-2xl font-black font-display text-black uppercase">
                THE COMMUNITY
              </h3>
              <ul className="space-y-3 text-xs text-black/70 font-sans">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-black shrink-0" />
                  <span>Capital stays inside the local economy rather than leaving as fees.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-black shrink-0" />
                  <span>Ward tool libraries reduce equipment debt for young apprentices.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-black shrink-0" />
                  <span>Peer dispute arbitration boards resolve grievances within 24 hours.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: INTERACTIVE SERVICE UNIVERSE (Black #0A0A0A) */}
      {/* ========================================================================= */}
      <ServiceUniverse />

      {/* ========================================================================= */}
      {/* SECTION 6: FAIRMATCH TRANSPARENT ENGINE PREVIEW (Off-White #F5F5F2) */}
      {/* ========================================================================= */}
      <section className="bg-[#F5F5F2] text-[#0A0A0A] py-24 px-4 sm:px-6 lg:px-8 border-b border-black/10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-black/15">
            <div>
              <div className="text-black/50 text-xs font-bold uppercase tracking-widest">
                FAIRMATCH ALGORITHMIC AUDIT
              </div>
              <h2 className="text-5xl sm:text-7xl font-black font-display text-[#0A0A0A] uppercase tracking-tight mt-3">
                THE FAIRMATCH™<br />DECISION ENGINE.
              </h2>
            </div>
            <p className="text-black/70 text-sm max-w-md font-sans leading-relaxed">
              No sponsored ad rankings. No secret penalty de-boosts. FairMatch is an open mathematical protocol
              balancing proximity, craft certifications, and equitable workload distribution.
            </p>
          </div>

          {/* Interactive Simulation Radar Showcase */}
          <div className="bg-[#0A0A0A] text-white p-8 sm:p-12 border border-black shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Massive Numeral Score */}
              <div className="lg:col-span-4 text-center lg:text-left space-y-3">
                <div className="text-[11px] text-[#CCFF00] font-bold uppercase tracking-widest">
                  OVERALL MATCH METRIC
                </div>
                <div className="text-8xl sm:text-9xl font-black font-display text-white tracking-tighter leading-none">
                  93
                </div>
                <div className="text-xs uppercase tracking-wider text-white/50">
                  ARJUN AC SERVICES • WARD 102
                </div>
                <button
                  onClick={() => setFairMatchModalProvider(arjunProvider)}
                  className="mt-4 px-5 py-2.5 bg-[#CCFF00] text-[#0A0A0A] text-xs font-bold uppercase tracking-wider hover:bg-[#D4FF00] transition"
                >
                  Inspect Transparent Weights
                </button>
              </div>

              {/* Radiating Factor Telemetry */}
              <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono-code">
                <div className="p-4 bg-white/5 border border-white/10">
                  <div className="text-[10px] text-white/40 uppercase">TRADE SKILL</div>
                  <div className="text-2xl font-bold text-white mt-1">100 / 100</div>
                  <div className="text-[9px] text-white/50 mt-1">ITI Certified HVAC</div>
                </div>
                <div className="p-4 bg-white/5 border border-white/10">
                  <div className="text-[10px] text-white/40 uppercase">PROXIMITY</div>
                  <div className="text-2xl font-bold text-white mt-1">94 / 100</div>
                  <div className="text-[9px] text-white/50 mt-1">1.1 km to residence</div>
                </div>
                <div className="p-4 bg-white/5 border border-white/10">
                  <div className="text-[10px] text-white/40 uppercase">AVAILABILITY</div>
                  <div className="text-2xl font-bold text-white mt-1">100 / 100</div>
                  <div className="text-[9px] text-white/50 mt-1">Available today</div>
                </div>
                <div className="p-4 bg-white/5 border border-white/10">
                  <div className="text-[10px] text-white/40 uppercase">REPUTATION</div>
                  <div className="text-2xl font-bold text-white mt-1">91 / 100</div>
                  <div className="text-[9px] text-white/50 mt-1">92% repeat clients</div>
                </div>
                <div className="p-4 bg-white/5 border border-white/10">
                  <div className="text-[10px] text-white/40 uppercase">WORKLOAD LOAD</div>
                  <div className="text-2xl font-bold text-[#CCFF00] mt-1">84 / 100</div>
                  <div className="text-[9px] text-white/50 mt-1">Healthy 4 jobs/wk</div>
                </div>
                <div className="p-4 bg-white/5 border border-white/10">
                  <div className="text-[10px] text-white/40 uppercase">OPPORTUNITY</div>
                  <div className="text-2xl font-bold text-[#CCFF00] mt-1">89 / 100</div>
                  <div className="text-[9px] text-white/50 mt-1">No monopoly crowding</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: BOOKING INTERFACE PREVIEW & LAUNCH (Black #0A0A0A) */}
      {/* ========================================================================= */}
      <section className="bg-[#0A0A0A] text-[#F5F5F2] py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-white/15">
            <div>
              <div className="text-[#CCFF00] text-xs font-bold uppercase tracking-widest">
                PHYSICAL DOORSTEP JOURNEY
              </div>
              <h2 className="text-4xl sm:text-6xl font-black font-display text-white uppercase tracking-tight mt-3">
                THE BOOKING LIFECYCLE.
              </h2>
            </div>
            <p className="text-white/60 text-xs sm:text-sm max-w-md font-sans leading-relaxed">
              Complete physical state machine advancing from customer request to worker acceptance, in-service execution,
              and OTP-verified escrow release.
            </p>
          </div>

          {/* Physical Stage Progression Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-6 bg-[#121212] border border-white/20">
              <div className="text-[10px] text-[#CCFF00] uppercase font-bold">PHASE 01</div>
              <div className="text-xl font-bold font-display uppercase mt-1">REQUESTED</div>
              <div className="text-xs text-white/60 font-sans mt-2">
                Customer locks slot; tariff held in transparent cooperative escrow.
              </div>
            </div>
            <div className="p-6 bg-[#121212] border border-white/20">
              <div className="text-[10px] text-[#CCFF00] uppercase font-bold">PHASE 02</div>
              <div className="text-xl font-bold font-display uppercase mt-1">ACCEPTED</div>
              <div className="text-xs text-white/60 font-sans mt-2">
                Technician confirms broadcast; customer receives direct phone contact.
              </div>
            </div>
            <div className="p-6 bg-[#121212] border border-white/20">
              <div className="text-[10px] text-[#CCFF00] uppercase font-bold">PHASE 03</div>
              <div className="text-xl font-bold font-display uppercase mt-1">IN SERVICE</div>
              <div className="text-xs text-white/60 font-sans mt-2">
                Master arrives with tool kit; live checklist verified on-site.
              </div>
            </div>
            <div className="p-6 bg-[#121212] border border-[#CCFF00]">
              <div className="text-[10px] text-[#CCFF00] uppercase font-bold">PHASE 04</div>
              <div className="text-xl font-bold font-display text-[#CCFF00] uppercase mt-1">COMPLETED</div>
              <div className="text-xs text-white/60 font-sans mt-2">
                OTP verified; 100% funds released directly to technician's account.
              </div>
            </div>
          </div>

          {/* Direct CTA Launch Block */}
          <div className="p-6 sm:p-10 md:p-12 bg-white text-[#0A0A0A] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
            <div>
              <div className="text-xs font-mono-code uppercase font-bold tracking-widest text-black/60">
                READY TO EXPERIENCE COSERVE?
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black font-display uppercase tracking-tight text-black mt-1">
                EXPLORE THE LIVE PLATFORM
              </h3>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => {
                  setSelectedCategoryFilter('all');
                  navigate('/services');
                }}
                className="w-full sm:w-auto px-6 py-3.5 bg-black text-white hover:bg-neutral-800 text-xs font-bold uppercase tracking-wider transition text-center"
              >
                Find Services Directory
              </button>
              <button
                onClick={() => {
                  navigate('/how-it-works');
                }}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#CCFF00] text-black hover:bg-[#D4FF00] text-xs font-bold uppercase tracking-wider transition text-center"
              >
                How CoServe Works
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
