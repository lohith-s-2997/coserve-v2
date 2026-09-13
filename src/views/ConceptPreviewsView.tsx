import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Users2,
  TrendingUp,
  Sparkles,
  Coins,
  ShieldCheck,
  Calendar,
  Layers,
  Award,
  ArrowRight,
  Clock,
  CheckCircle2,
} from 'lucide-react';

interface ConceptPreviewsViewProps {
  conceptId: string;
}

export const ConceptPreviewsView: React.FC<ConceptPreviewsViewProps> = ({ conceptId }) => {
  const { role, customer, worker, admin, navigate, setRole } = useApp();

  const getConceptDetails = () => {
    switch (conceptId) {
      case 'trusted-network':
        return {
          title: 'My Trusted Local Network',
          category: 'Customer Community Circle',
          tag: 'Repeat Tradespeople Network',
          lead: 'Arun Kumar’s personal directory of verified local technicians who have serviced his residence.',
          stat1: { label: 'Saved Professionals', val: '4 Tradespeople' },
          stat2: { label: 'Repeat Loyalty Tier', val: 'Gold Tier (92% Match)' },
          stat3: { label: 'Direct Escrow History', val: '₹6,400 Protected' },
          points: [
            'Direct priority dispatch to Arjun AC Services and Kavitha Home Care.',
            'Keyless scheduled access verification for gated apartment complexes in Anna Nagar.',
            'Zero platform surcharge for repeat customer re-bookings.',
          ],
          actionText: 'Find More Local Professionals',
          onAction: () => navigate('/services'),
        };

      case 'community-demand':
        return {
          title: 'Community Demand Clustering',
          category: 'Collective Bargaining & Route Optimization',
          tag: 'Apartment Aggregation Engine',
          lead: 'Group seasonal service requests with your neighbours in Anna Nagar to unlock 20% collective discounts and minimize technician commute travel.',
          stat1: { label: 'Active Clusters in Anna Nagar', val: '7 Residential Blocks' },
          stat2: { label: 'Upcoming Cluster', val: 'Sunshine Apts • AC Pre-Summer' },
          stat3: { label: 'Carbon Emissions Saved', val: '42 kg CO2 / week' },
          points: [
            'Sunshine Apartments: 6 flats joined for June AC Jet Wash with Arjun Raj.',
            'Shanti Colony Villa Society: 12 households clustered for eco-pest control.',
            'Technicians service 5 adjacent flats in one trip instead of crisscrossing Chennai.',
          ],
          actionText: 'Explore Service Categories',
          onAction: () => navigate('/'),
        };

      case 'cooperative-teams':
        return {
          title: 'Cooperative Multi-Disciplinary Teams',
          category: 'Shared Workforces',
          tag: 'Cross-Trade Collaboration',
          lead: 'Local tradespeople forming synergistic cooperative guilds for complex home renovations (e.g. Electrician + Carpenter + AC Specialist).',
          stat1: { label: 'Active Co-op Guilds', val: '3 Teams in Ward 102' },
          stat2: { label: 'Lead Specialist', val: 'Arjun Raj (HVAC Anchor)' },
          stat3: { label: 'Combined Reliability', val: '96.8% Score' },
          points: [
            'Anna Nagar Renovation Guild: Arjun AC + Anand Carpentry + Murugan Electricals.',
            'Single composite invoice with unified cooperative escrow warranty.',
            'Workers share referrals directly instead of competing against algorithms.',
          ],
          actionText: 'View Cooperative Roster',
          onAction: () => setRole('admin'),
        };

      case 'service-history':
        return {
          title: 'Verifiable Service History & Warranty Vault',
          category: 'Immutable Service Ledgers',
          tag: 'Cooperative Audit Trail',
          lead: 'Permanent digital ledger of all home repairs, replaced capacitors, sanitized split units, and appliance warranties.',
          stat1: { label: 'Past Inspections', val: '6 Records Logged' },
          stat2: { label: 'Active Warranties', val: '90-Day AC Service Guarantee' },
          stat3: { label: 'Escrow Settlements', val: '100% On-Time' },
          points: [
            'Download PDF service certificate for resale or tenant turnover documentation.',
            'Direct technician recall guarantee in case of leakage within 30 days.',
            'Cooperative audit trail visible to housing society management.',
          ],
          actionText: 'View Active Bookings',
          onAction: () => navigate('/bookings'),
        };

      case 'coserve-credits':
        return {
          title: 'CoServe Community Growth Credits',
          category: 'Cooperative Dividend Program',
          tag: 'Value Retention Tokens',
          lead: 'Arun Kumar has accumulated 650 CoServe Community Credits from verified reviews and timely payment confirmations.',
          stat1: { label: 'Credit Balance', val: '650 Credits (₹650)' },
          stat2: { label: 'Community Tier', val: 'Civic Steward' },
          stat3: { label: 'Subsidized Bookings', val: '2 Used This Year' },
          points: [
            'Redeemable for 100% discount on minor vehicle punctures or plumbing diagnostics.',
            'Earn credits by vouching for newly joined verified tradespeople.',
            'Contribute excess credits to Anna Nagar Senior Citizens Utility Pool.',
          ],
          actionText: 'Book with Credits',
          onAction: () => navigate('/services'),
        };

      case 'my-services':
      case 'requests':
        return {
          title: 'Worker Request Queue & Service Configurator',
          category: 'Worker Micro-Business Operations',
          tag: 'Real-Time Dispatch',
          lead: 'Manage active inbound bookings, configure tariff schedules, and review automated FairMatch score allocations.',
          stat1: { label: 'Dispatched Queue', val: '1 Active Request' },
          stat2: { label: 'Acceptance Window', val: '15 Mins SLA' },
          stat3: { label: 'Commission Skim', val: '0% (Cooperative Guarantee)' },
          points: [
            'Instant SMS/Push dispatch for Anna Nagar residential clusters.',
            'Zero algorithmic penalties for rejecting jobs outside safe operating hours.',
            'Transparent customer profile and verified household safety badge.',
          ],
          actionText: 'Go to Worker Dashboard',
          onAction: () => navigate('/worker'),
        };

      case 'my-reputation':
        return {
          title: 'Arjun Raj’s Verified Micro-Business Reputation',
          category: 'Digital Identity & Trust Equity',
          tag: 'Non-Platform-Locked Equity',
          lead: 'In traditional gig platforms, your ratings disappear if you leave. On CoServe, your 4.8-star reputation is your permanent micro-business property.',
          stat1: { label: 'Verified Community Stars', val: '4.8 / 5.0 (34 Reviews)' },
          stat2: { label: 'Repeat Customer Ratio', val: '92% (Top 1% in Ward)' },
          stat3: { label: 'Trade Certification', val: 'ITI Guindy HVAC Master' },
          points: [
            'Exportable verifiable credential compatible with national skill registers.',
            'Customer reviews linked to verified physical addresses in Anna Nagar.',
            'Zero fake reviews: only customers with paid escrow milestones can rate.',
          ],
          actionText: 'View Public Profile',
          onAction: () => navigate('/provider/prov-arjun-ac'),
        };

      case 'my-coop-team':
        return {
          title: 'Anna Nagar Ward 102 Service Guild',
          category: 'Cooperative Membership',
          tag: 'Worker Mutual Aid & Equipment Pool',
          lead: 'Arjun Raj is a founding member of the Ward 102 trades collective, sharing specialized tools, bulk wholesale filters, and mutual medical protection.',
          stat1: { label: 'Guild Members', val: '84 Local Crafts' },
          stat2: { label: 'Shared Tools Pool', val: '6 Jet Washers, 2 Inverter Analyzers' },
          stat3: { label: 'Emergency Fund', val: '₹1,14,500 Available' },
          points: [
            'Access to shared high-pressure jet cleaning equipment without private debt.',
            'Peer backup: if Arjun is unwell, qualified peer technician takes over without customer penalty.',
            'Annual cooperative dividend paid out from corporate cluster contracts.',
          ],
          actionText: 'Audit Guild Status',
          onAction: () => setRole('admin'),
        };

      case 'workers-roster':
      case 'community-growth':
      case 'work-distribution':
      default:
        return {
          title: 'Cooperative Governance & Demand Engine',
          category: 'Municipal Administration',
          tag: 'Smart India Hackathon Feature Preview',
          lead: 'Administrative tools for municipal cooperative councils to oversee fair work allocation, dispute mitigation, and skill upgrading.',
          stat1: { label: 'FairMatch Index', val: '98.4% Balanced' },
          stat2: { label: 'Cluster Demand', val: '14 Active Societies' },
          stat3: { label: 'Cooperative Reserve', val: '₹1,14,500' },
          points: [
            'Transparent workload heatmaps preventing worker overexertion.',
            'Automated dispute escalation to Anna Nagar neighborhood council.',
            'Upcoming module: NPCI UPI instant split payments and Aadhaar e-KYC.',
          ],
          actionText: 'Go to Cooperative Dashboard',
          onAction: () => navigate('/admin'),
        };
    }
  };

  const details = getConceptDetails();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200 px-2.5 py-1 rounded-lg">
              {details.tag}
            </span>
            <span className="text-xs text-slate-500 font-mono">
              SIH 2026 Cooperative Module
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded">
            Cooperative Feature Overview
          </span>
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-800 block">
            {details.category}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-slate-950 tracking-tight mt-1">
            {details.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mt-2 max-w-2xl">
            {details.lead}
          </p>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] text-slate-500 font-mono block">{details.stat1.label}</span>
            <div className="text-lg font-bold font-display text-slate-900 mt-1">{details.stat1.val}</div>
          </div>
          <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-200">
            <span className="text-[11px] text-teal-800 font-mono block">{details.stat2.label}</span>
            <div className="text-lg font-bold font-display text-teal-950 mt-1">{details.stat2.val}</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[11px] text-slate-500 font-mono block">{details.stat3.label}</span>
            <div className="text-lg font-bold font-display text-slate-900 mt-1">{details.stat3.val}</div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block font-mono">
            Key Architecture Capabilities:
          </span>
          {details.points.map((pt, i) => (
            <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{pt}</span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-slate-100">
          <span className="text-xs text-slate-500">
            Exploring verified cooperative platform capabilities.
          </span>
          <button
            type="button"
            onClick={details.onAction}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition flex items-center justify-center gap-2"
          >
            <span>{details.actionText}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
