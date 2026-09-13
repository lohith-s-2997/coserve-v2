import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  RotateCcw,
  FileText,
  Star,
  Users,
  Coins,
  CreditCard,
  Layers,
  Repeat,
  ShieldCheck,
  Check,
} from 'lucide-react';

export const DemoGuideView: React.FC = () => {
  const {
    role,
    setRole,
    activeTab,
    setActiveTab,
    bookings,
    setSelectedCategoryFilter,
    setSelectedLocalityFilter,
    setFairMatchModalProvider,
    providers,
    resetDemoData,
    cluster,
    teamRequests,
    growthCredits,
    customerCredits,
    growthPoolBalance,
    trustedNetwork,
    setPaymentModalBooking,
    setInvoiceModalBooking,
    setRatingModalBooking,
  } = useApp();

  const arjun = providers.find((p) => p.id === 'prov-arjun-ac') || providers[0];
  const activeArjunBooking = bookings.find((b) => b.businessName.includes('Arjun'));
  const paidBooking = bookings.find((b) => b.paymentStatus === 'Paid');
  const repeatBooking = bookings.find((b) => b.isRepeatBooking);
  const arjunInTrusted = trustedNetwork.some((t) => t.businessName.includes('Arjun'));

  const steps = [
    {
      step: 1,
      title: 'Open Find Services',
      description: 'Navigate to the service discovery portal designed for direct doorstep trade exploration.',
      actionText: 'Go to Find Services',
      onAction: () => {
        setRole('customer');
        setActiveTab('services');
      },
      isCompleted: activeTab === 'services' || activeTab === 'find-services' || bookings.length > 0,
    },
    {
      step: 2,
      title: 'Choose AC Service in Anna Nagar',
      description: 'Filter category to Home Repair & Maintenance and set locality to Anna Nagar.',
      actionText: 'Apply AC & Locality Filters',
      onAction: () => {
        setRole('customer');
        setSelectedCategoryFilter('Home Repair & Maintenance');
        setSelectedLocalityFilter('Anna Nagar');
        setActiveTab('services');
      },
      isCompleted: bookings.length > 0,
    },
    {
      step: 3,
      title: 'View nearby professionals',
      description: 'Observe multiple nearby tradespeople with transparent verified badges and authentic ratings.',
      actionText: 'View Providers Grid',
      onAction: () => {
        setActiveTab('services');
      },
      isCompleted: bookings.length > 0,
    },
    {
      step: 4,
      title: 'Open “Why this match?”',
      description: 'Inspect the explainable FairMatch modal revealing skill, proximity, workload, and fairness weights.',
      actionText: 'Open FairMatch for Arjun',
      onAction: () => {
        setFairMatchModalProvider(arjun);
      },
      isCompleted: false,
    },
    {
      step: 5,
      title: 'Choose Arjun AC Services',
      description: 'Select Arjun Raj’s digital micro-business card (1.1 km away, 92% repeat client rate).',
      actionText: 'View Arjun’s Profile',
      onAction: () => {
        setActiveTab('provider-profile');
      },
      isCompleted: bookings.length > 0,
    },
    {
      step: 6,
      title: 'Request service',
      description: 'Submit an AC General Service request for Tomorrow 10:30 AM at ₹500 directly.',
      actionText: 'Open Service Booking',
      onAction: () => {
        setRole('customer');
        setActiveTab('services');
      },
      isCompleted: bookings.length > 0,
    },
    {
      step: 7,
      title: 'Switch to Worker (Arjun Raj)',
      description: 'Use the persistent role switcher to switch into the worker perspective and see inbound dispatch.',
      actionText: 'Switch to Worker Role',
      onAction: () => {
        setRole('worker');
      },
      isCompleted: role === 'worker',
    },
    {
      step: 8,
      title: 'Accept request',
      description: 'In the Worker Dashboard, click “Accept Request” to transition state to Accepted.',
      actionText: 'Open Worker Dashboard',
      onAction: () => {
        setRole('worker');
        setActiveTab('worker-dashboard');
      },
      isCompleted:
        activeArjunBooking?.status === 'Accepted' ||
        activeArjunBooking?.status === 'In Progress' ||
        activeArjunBooking?.status === 'Completed',
    },
    {
      step: 9,
      title: 'Start service',
      description: 'Click “Start Service” when arriving at customer residence; status transitions to In Progress.',
      actionText: 'Go to Worker Actions',
      onAction: () => {
        setRole('worker');
        setActiveTab('worker-dashboard');
      },
      isCompleted: activeArjunBooking?.status === 'In Progress' || activeArjunBooking?.status === 'Completed',
    },
    {
      step: 10,
      title: 'Complete service',
      description: 'Click “Complete Service” upon job finish to finalize the doorstep milestone.',
      actionText: 'Go to Worker Dashboard',
      onAction: () => {
        setRole('worker');
        setActiveTab('worker-dashboard');
      },
      isCompleted: activeArjunBooking?.status === 'Completed',
    },
    {
      step: 11,
      title: 'Switch back to Customer',
      description: 'Toggle persistent role switcher back to Customer (Arun Kumar).',
      actionText: 'Switch to Customer Role',
      onAction: () => {
        setRole('customer');
      },
      isCompleted: role === 'customer' && Boolean(activeArjunBooking),
    },
    {
      step: 12,
      title: 'Verify booking status',
      description: 'Check My Bookings to observe the animated completed lifecycle and synchronized status.',
      actionText: 'View My Bookings',
      onAction: () => {
        setRole('customer');
        setActiveTab('my-bookings');
      },
      isCompleted: activeArjunBooking?.status === 'Completed' && activeTab === 'my-bookings',
    },
    // STAGE 2 EXPANSIONS
    {
      step: 13,
      title: 'Explore Community Demand Clustering',
      description:
        'Inspect the hero demand aggregation engine grouping concurrent neighborhood requests into efficient 1.5 km corridors.',
      actionText: 'Open Community Demand View',
      onAction: () => {
        setActiveTab('community-demand');
      },
      isCompleted: activeTab === 'community-demand' || cluster.userJoined,
    },
    {
      step: 14,
      title: 'Join or Accept Community Cluster',
      description:
        'Simulate joining as a customer for ₹475 (saving ₹75) or accepting the 3-job batch as Worker Arjun for ₹1,425 guaranteed income.',
      actionText: cluster.userJoined ? 'View Scheduled Cluster' : 'Join Demand Cluster',
      onAction: () => {
        setActiveTab('community-demand');
      },
      isCompleted: cluster.userJoined || cluster.workerAccepted,
    },
    {
      step: 15,
      title: 'Explore Cooperative Teams & Multi-Trade Bundles',
      description:
        'Inspect cross-trade alliances (electrical, plumbing, carpentry, painting) offering joint packages under a single contract.',
      actionText: 'Explore Co-op Teams',
      onAction: () => {
        setActiveTab('cooperative-teams');
      },
      isCompleted: activeTab === 'cooperative-teams' || (teamRequests && teamRequests.length > 0),
    },
    {
      step: 16,
      title: 'Test Fair Work Distribution Engine',
      description:
        'Run the live algorithmic fairness balancing simulator to contrast anti-monopoly fair queuing against corporate winner-take-all algorithms.',
      actionText: 'Run Fair Distribution Engine',
      onAction: () => {
        setActiveTab('fair-work-distribution');
      },
      isCompleted: activeTab === 'fair-work-distribution',
    },
    {
      step: 17,
      title: 'Worker Progression & Gig-to-Growth',
      description:
        'Examine the verified 4-tier artisan mastery track, tool mastery credentials, and redeemable community equity credits.',
      actionText: 'View Worker Growth Ladder',
      onAction: () => {
        setRole('worker');
        setActiveTab('gig-to-growth');
      },
      isCompleted: activeTab === 'gig-to-growth',
    },
    {
      step: 18,
      title: 'Explore the Generative Network Loop',
      description:
        'Witness the systemic economic flywheel demonstrating how local density produces lower transit overhead and zero extraction.',
      actionText: 'View Network Loop Diagram',
      onAction: () => {
        setActiveTab('network-loop');
      },
      isCompleted: activeTab === 'network-loop',
    },
    // STAGE 3 EXPANSIONS (STEPS 19 TO 23)
    {
      step: 19,
      title: 'Execute Protected Payment (WOW Moment)',
      description:
        'Execute transparent escrow settlement (₹525 total: ₹500 direct to Arjun, ₹15 platform ops, ₹10 to Community Growth Pool) with live money-split animation.',
      actionText: paidBooking ? 'View Payment Details' : 'Open Payment Split Modal',
      onAction: () => {
        setRole('customer');
        setActiveTab('my-bookings');
        if (activeArjunBooking) setPaymentModalBooking(activeArjunBooking);
      },
      isCompleted: Boolean(paidBooking),
    },
    {
      step: 20,
      title: 'Inspect Digital Tax Invoice (CS-INV-1042)',
      description:
        'Examine the auditable digital GST invoice detailing the 100% artisan compensation, platform upkeep, and community pool deposit.',
      actionText: 'Inspect Digital Invoice',
      onAction: () => {
        setRole('customer');
        if (paidBooking) setInvoiceModalBooking(paidBooking);
        else if (activeArjunBooking) setInvoiceModalBooking(activeArjunBooking);
        else setActiveTab('my-bookings');
      },
      isCompleted: Boolean(paidBooking),
    },
    {
      step: 21,
      title: 'Submit Cooperative Rating & Add to Trusted Network',
      description:
        'Record a 5-star review in Arjun’s cooperative reputation ledger and add his business card to your personal neighborhood service circle.',
      actionText: arjunInTrusted ? 'View Trusted Network' : 'Rate Pro & Add to Network',
      onAction: () => {
        setRole('customer');
        if (paidBooking) setRatingModalBooking(paidBooking);
        else setActiveTab('trusted-network');
      },
      isCompleted: arjunInTrusted,
    },
    {
      step: 22,
      title: 'Rebook with Discounted Repeat Fee (₹10)',
      description:
        'Experience seamless 1-click repeat rebooking of Arjun AC Services from My Trusted Network with a 60% discounted protection fee (₹10 vs ₹25).',
      actionText: 'Open Trusted Network',
      onAction: () => {
        setRole('customer');
        setActiveTab('trusted-network');
      },
      isCompleted: Boolean(repeatBooking) || activeTab === 'trusted-network',
    },
    {
      step: 23,
      title: 'Community Growth Pool & Circular Reinvestment',
      description:
        'Inspect the live Ward 102 treasury balance (₹84,260), allocation breakdown (skills, tool pools, safety gear), and the non-extractive circular economy flywheel.',
      actionText: 'View Community Treasury',
      onAction: () => {
        setActiveTab('community-growth-pool');
      },
      isCompleted: activeTab === 'community-growth-pool',
    },
  ];

  const completedStepsCount = steps.filter((s) => s.isCompleted).length;
  const progressPercent = Math.round((completedStepsCount / steps.length) * 100);

  return (
    <div className="w-full bg-[#F5F5F2] text-[#0A0A0A] font-mono-code min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Editorial Header */}
        <div className="bg-[#0A0A0A] text-[#F5F5F2] border border-black p-6 sm:p-10 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-bold text-[#CCFF00]">
                  STAGES 1, 2 & 3 COMPLETE SYSTEM WALKTHROUGH
                </span>
                <span className="text-[10px] bg-white/10 text-white border border-white/20 px-2 py-0.5 font-bold uppercase">
                  23 Sequenced Milestones
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight uppercase mt-1">
                COSERVE REVIEW MODE
              </h1>
              <p className="text-xs text-white/70 font-sans max-w-2xl leading-relaxed mt-1">
                Comprehensive evaluation guide: test explainable FairMatch, animated escrow disbursement (₹525), auditable digital invoices, community demand clustering, cooperative teams, and the trusted repeat network.
              </p>
            </div>

            {/* Reset Demo Data Button */}
            <button
              type="button"
              onClick={resetDemoData}
              className="px-5 py-3 bg-white/10 border border-white/20 hover:bg-[#CCFF00] hover:text-black text-white text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 shrink-0 self-start sm:self-center"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Demo State</span>
            </button>
          </div>

          {/* PROGRESS TRACKER BAR */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-white/60 font-bold uppercase tracking-wider">
                COMPREHENSIVE PROTOTYPE VERIFICATION PROGRESS
              </span>
              <span className="text-[#CCFF00] font-black font-display">
                {completedStepsCount} of {steps.length} Milestones Verified ({progressPercent}%)
              </span>
            </div>
            <div className="w-full h-2.5 bg-white/10 border border-white/20 overflow-hidden">
              <div
                className="h-full bg-[#CCFF00] transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Live System Telemetry Strip */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3 bg-white/5 border border-white/10">
              <span className="text-white/40 block text-[10px] uppercase font-bold">CURRENT PERSPECTIVE</span>
              <span className="text-[#CCFF00] font-black font-display text-lg uppercase mt-0.5 block">
                {role}
              </span>
            </div>

            <div className="p-3 bg-white/5 border border-white/10">
              <span className="text-white/40 block text-[10px] uppercase font-bold">ACTIVE BOOKINGS</span>
              <span className="text-white font-black font-display text-lg mt-0.5 block">
                {bookings.length} Registered
              </span>
            </div>

            <div className="p-3 bg-white/5 border border-white/10">
              <span className="text-white/40 block text-[10px] uppercase font-bold">COMMUNITY POOL</span>
              <span className="text-white font-black font-display text-lg mt-0.5 block">
                ₹{growthPoolBalance.toLocaleString('en-IN')}
              </span>
            </div>

            <div className="p-3 bg-white/5 border border-white/10">
              <span className="text-white/40 block text-[10px] uppercase font-bold">CUSTOMER CREDITS</span>
              <span className="text-[#CCFF00] font-black font-display text-lg mt-0.5 block">
                {customerCredits} PTS
              </span>
            </div>
          </div>
        </div>

        {/* The 23 Steps List */}
        <div className="space-y-3">
          {steps.map((item) => (
            <div
              key={item.step}
              className={`p-5 border transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                item.isCompleted
                  ? 'bg-white border-black/30 shadow-xs'
                  : 'bg-white/80 border-black/15 hover:border-black'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 flex items-center justify-center font-black font-display text-sm shrink-0 border ${
                    item.isCompleted
                      ? 'bg-black text-[#CCFF00] border-black'
                      : 'bg-black/5 text-black/70 border-black/15'
                  }`}
                >
                  {item.isCompleted ? <CheckCircle2 className="w-5 h-5 text-[#CCFF00]" /> : item.step}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black font-display uppercase tracking-tight text-black">
                      {item.step}. {item.title}
                    </h3>
                    {item.isCompleted && (
                      <span className="text-[9px] font-bold bg-[#CCFF00] text-black px-1.5 py-0.5 uppercase tracking-wider">
                        Verified
                      </span>
                    )}
                    {item.step >= 19 && (
                      <span className="text-[9px] font-bold bg-black text-white px-1.5 py-0.5 uppercase tracking-wider">
                        Stage 3
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-black/70 font-sans leading-relaxed max-w-2xl">
                    {item.description}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={item.onAction}
                className="w-full sm:w-auto px-4 py-2.5 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider shrink-0 transition flex items-center justify-center gap-2 self-stretch sm:self-center text-center"
              >
                <span>{item.actionText}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#CCFF00]" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
