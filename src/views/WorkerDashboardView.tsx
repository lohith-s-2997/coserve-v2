import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { BookingLifecycle } from '../components/BookingLifecycle';
import { VERIFIED_WORKERS_FOR_INVITE } from '../data/stage2Data';
import {
  Wrench,
  Clock,
  MapPin,
  User,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Play,
  Check,
  Radio,
  Vote,
  Package,
  CheckCheck,
  CheckCircle2,
  Users2,
  TrendingUp,
  Scale,
  Plus,
  Send,
  Eye,
  AlertCircle,
  Coins,
} from 'lucide-react';

export const WorkerDashboardView: React.FC = () => {
  const {
    worker,
    activeWorkerId,
    setActiveWorkerId,
    bookings,
    updateBookingStatus,
    setRole,
    navigate,
    cluster,
    acceptCommunityCluster,
    cooperativeTeams,
    createCoopTeam,
    workerInvitations,
    sendWorkerInvitation,
    growthCredits,
    setIsChooseProfessionalModalOpen,
  } = useApp();

  // OS State
  const [beaconActive, setBeaconActive] = useState<boolean>(true);
  const [votedResolution, setVotedResolution] = useState<'yes' | 'no' | null>(null);
  const [toolCheckedOut, setToolCheckedOut] = useState<boolean>(true);

  // Stage 2 Modals State
  const [viewClusterModalOpen, setViewClusterModalOpen] = useState<boolean>(false);
  const [createTeamModalOpen, setCreateTeamModalOpen] = useState<boolean>(false);
  const [inviteModalOpen, setInviteModalOpen] = useState<boolean>(false);

  // New Team Form State
  const [newTeamName, setNewTeamName] = useState<string>('Anna Nagar HVAC & Electrical Union');
  const [newTeamArea, setNewTeamArea] = useState<string>('Anna Nagar Zone VI');
  const [newTeamServices, setNewTeamServices] = useState<string>('AC Servicing, Electrical Maintenance, Pipe Insulation');

  // Selected Worker for Invite
  const [selectedInviteWorker, setSelectedInviteWorker] = useState(VERIFIED_WORKERS_FOR_INVITE[0]);

  const handleCreateTeamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamName.trim()) return;
    createCoopTeam({
      name: newTeamName,
      locality: newTeamArea,
      services: newTeamServices.split(',').map((s) => s.trim()),
    });
    setCreateTeamModalOpen(false);
  };

  const handleSendInviteSubmit = () => {
    sendWorkerInvitation(
      selectedInviteWorker.name,
      selectedInviteWorker.trade,
      cooperativeTeams[0]?.name || 'Anna Nagar Service Cooperative'
    );
    setInviteModalOpen(false);
  };

  // Find incoming or active bookings assigned to current active worker using stable identifiers
  const workerBookings = bookings.filter((b) => {
    if (activeWorkerId === 'arjun') {
      return (
        b.providerId === 'prov-arjun-ac' ||
        b.providerId === 'arjun-raj' ||
        b.providerId === 'arjun' ||
        b.businessName.toLowerCase().includes('arjun')
      );
    }
    if (activeWorkerId === 'ravi') {
      return (
        b.providerId === 'prov-ravi-elec' ||
        b.providerId === 'ravi-kumar' ||
        b.providerId === 'ravi' ||
        b.businessName.toLowerCase().includes('ravi')
      );
    }
    if (activeWorkerId === 'kumar') {
      return (
        b.providerId === 'prov-kumar-plumb' ||
        b.providerId === 'kumar-p' ||
        b.providerId === 'kumar' ||
        (b.businessName.toLowerCase().includes('kumar') && !b.businessName.toLowerCase().includes('ravi'))
      );
    }
    return (
      b.providerId === activeWorkerId ||
      b.providerName.toLowerCase() === worker.name.toLowerCase()
    );
  });

  return (
    <div className="w-full bg-[#F5F5F2] text-[#0A0A0A] font-mono-code min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Dedicated Worker Operating System (CoServe OS Console Header) */}
        <div className="bg-[#0A0A0A] text-[#F5F5F2] border border-black p-6 sm:p-10 space-y-8">
          {/* Top OS Telemetry Line */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/10 text-[11px]">
            <div className="flex items-center gap-2 text-[#CCFF00] font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-ping" />
              <span>COSERVE WORKER OS v2.6</span>
              <span className="text-white/30">•</span>
              <span className="text-white">NODE: CIVIC TRADE GUILD</span>
            </div>
            <div className="flex items-center gap-4 text-white/60">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]" />
                <span>Direct Payout Route: Verified</span>
              </span>
              <span className="text-black bg-[#CCFF00] px-2 py-0.5 font-bold uppercase">
                TECH ID: #HVAC-044
              </span>
            </div>
          </div>

          {/* Change Professional Action */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/5 border border-white/10 p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#CCFF00] text-black font-black flex items-center justify-center text-xs shrink-0">
                {worker.name.charAt(0)}
              </div>
              <div>
                <div className="text-[10px] text-[#CCFF00] font-bold uppercase tracking-widest">CURRENTLY LOGGED IN PROFESSIONAL</div>
                <div className="text-sm font-bold text-white">{worker.name} — {worker.businessName} ({worker.trade})</div>
              </div>
            </div>
            <button
              onClick={() => setIsChooseProfessionalModalOpen(true)}
              className="w-full sm:w-auto px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition border border-white/20 text-center"
            >
              Change Professional
            </button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="text-xs uppercase tracking-widest text-[#CCFF00] font-bold">
                COOPERATIVE GUILD PARTNER • {worker.trade.toUpperCase()}
              </div>
              <h1 className="text-3xl sm:text-5xl font-black font-display text-white uppercase tracking-tight">
                {worker.businessName}
              </h1>
              <div className="text-xs text-white/70 font-sans">
                Independent Master: <span className="font-bold text-white">{worker.name}</span> • {worker.cooperativeUnit} • Locality: {worker.locality}
              </div>
            </div>

            {/* OS Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setBeaconActive(!beaconActive)}
                className={`w-full sm:w-auto justify-center px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 border ${
                  beaconActive
                    ? 'bg-[#CCFF00] text-[#0A0A0A] border-[#CCFF00]'
                    : 'bg-white/10 text-white/50 border-white/20'
                }`}
              >
                <Radio className="w-3.5 h-3.5" />
                <span>{beaconActive ? 'BEACON: LIVE DISPATCH' : 'BEACON: IDLE'}</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('customer')}
                className="w-full sm:w-auto justify-center px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 text-center"
              >
                <span>View As Customer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Micro-Business Direct Earnings & Repeat Clientele */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/10 text-xs">
            <div className="p-4 bg-white/5 border border-white/10">
              <div className="text-[10px] text-white/40 uppercase">MONTHLY DIRECT PAYOUT</div>
              <div className="text-3xl font-black font-display text-white mt-1">
                ₹{(worker.earningsBase + workerBookings.filter((b) => b.paymentStatus === 'Paid').reduce((sum, b) => sum + (b.price || 500), 0)).toLocaleString('en-IN')}
              </div>
              <div className="text-[10px] text-[#CCFF00] font-bold mt-1">100% Payout (0% Cut)</div>
            </div>

            <div className="p-4 bg-white/5 border border-white/10">
              <div className="text-[10px] text-white/40 uppercase">REPEAT CLIENT RATE</div>
              <div className="text-3xl font-black font-display text-[#CCFF00] mt-1">92%</div>
              <div className="text-[10px] text-white/60 mt-1">Direct Neighbourhood Network</div>
            </div>

            <div className="p-4 bg-white/5 border border-white/10">
              <div className="text-[10px] text-white/40 uppercase">VERIFIED JOBS</div>
              <div className="text-3xl font-black font-display text-white mt-1">
                {worker.completedJobs + workerBookings.filter((b) => b.status === 'Completed').length}
              </div>
              <div className="text-[10px] text-white/60 mt-1">Zero Open Disputes</div>
            </div>

            <div className="p-4 bg-white/5 border border-white/10">
              <div className="text-[10px] text-white/40 uppercase">CO-OP EQUITY DIVIDEND</div>
              <div className="text-3xl font-black font-display text-white mt-1">4,850 Pts</div>
              <div className="text-[10px] text-white/60 mt-1">Equipment Reserve Share</div>
            </div>
          </div>
        </div>

        {/* 2-COLUMN OPERATING SYSTEM GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (8 cols): Inbound Requests & Lifecycle Control */}
          <div className="lg:col-span-8 space-y-6">
            {/* HERO: COMMUNITY DEMAND OPPORTUNITY */}
            <div className="bg-[#0A0A0A] text-[#F5F5F2] border border-black p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="space-y-1">
                  <div className="text-[10px] text-[#CCFF00] font-bold uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
                    <span>COMMUNITY DEMAND OPPORTUNITY</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-white">
                    ANNA NAGAR AC CLUSTER
                  </h2>
                  <div className="text-[10px] text-white/50 font-mono-code">
                    * Note: Anna Nagar is demo scenario data; CoServe operates across any neighborhood service zone.
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-[10px] text-white/40 uppercase">EXPECTED BATCH EARNINGS</div>
                  <div className="text-3xl font-black font-display text-[#CCFF00]">
                    ₹{cluster.clusterPrice * cluster.households.length}
                  </div>
                  <div className="text-[10px] text-white/60 font-mono-code">
                    {cluster.households.length} × ₹{cluster.clusterPrice} (100% Direct Payout)
                  </div>
                </div>
              </div>

              {/* Cluster Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono-code">
                <div className="p-3 bg-white/5 border border-white/10">
                  <div className="text-white/40 text-[9px] uppercase">SERVICE CONCENTRATION</div>
                  <div className="text-base font-black font-display text-white mt-0.5">
                    {cluster.households.length} Nearby Households
                  </div>
                  <div className="text-[10px] text-white/60 mt-0.5">{cluster.serviceName}</div>
                </div>

                <div className="p-3 bg-white/5 border border-white/10">
                  <div className="text-white/40 text-[9px] uppercase">COMPACT CORRIDOR</div>
                  <div className="text-base font-black font-display text-[#CCFF00] mt-0.5">
                    ~{cluster.radiusKm} km Radius
                  </div>
                  <div className="text-[10px] text-white/60 mt-0.5">-68% Duplicate Travel</div>
                </div>

                <div className="p-3 bg-white/5 border border-white/10">
                  <div className="text-white/40 text-[9px] uppercase">OPTIMIZED WINDOW</div>
                  <div className="text-base font-black font-display text-white mt-0.5">
                    Tomorrow Morning
                  </div>
                  <div className="text-[10px] text-white/60 mt-0.5">{cluster.preferredWindow}</div>
                </div>
              </div>

              {/* Cluster Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setViewClusterModalOpen(true)}
                  className="w-full sm:w-1/2 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 border border-white/20"
                >
                  <Eye className="w-4 h-4 text-[#CCFF00]" />
                  <span>VIEW CLUSTER ({cluster.households.length} HOMES)</span>
                </button>

                <button
                  type="button"
                  onClick={acceptCommunityCluster}
                  disabled={cluster.workerAccepted}
                  className={`w-full sm:w-1/2 py-3 font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 ${
                    cluster.workerAccepted
                      ? 'bg-emerald-700 text-white cursor-default'
                      : 'bg-[#CCFF00] hover:bg-[#D4FF00] text-black'
                  }`}
                >
                  {cluster.workerAccepted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-[#CCFF00]" />
                      <span>CLUSTER ACCEPTED & IN SCHEDULE</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>ACCEPT CLUSTER (₹{cluster.clusterPrice * cluster.households.length})</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pb-4 border-b border-black/15">
              <div>
                <div className="text-[11px] text-black/50 font-bold uppercase tracking-widest">
                  REAL-TIME DISPATCH FEED
                </div>
                <h2 className="text-2xl sm:text-3xl font-black font-display uppercase tracking-tight text-black mt-0.5">
                  SERVICE DISPATCH QUEUE ({workerBookings.length})
                </h2>
              </div>
              <span className="text-xs bg-black text-white px-3 py-1 uppercase font-bold tracking-wider">
                FairMatch™ Active
              </span>
            </div>

            {workerBookings.length > 0 ? (
              <div className="space-y-6">
                {workerBookings.map((req) => (
                  <div
                    key={req.id}
                    className="bg-white border border-black/15 shadow-xs overflow-hidden"
                  >
                    {/* Header */}
                    <div className="p-6 bg-black/5 border-b border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="text-[10px] text-black/50 uppercase font-bold">
                          ORDER #{req.id} • {req.scheduledTime}
                        </div>
                        <h3 className="text-2xl font-black font-display uppercase tracking-tight text-black mt-0.5">
                          {req.serviceName}
                        </h3>
                        <div className="text-xs text-black/60 font-sans mt-0.5">
                          Customer: <span className="font-bold text-black">{req.customerName}</span> ({req.customerPhone})
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-[10px] text-black/40 uppercase">ESCROW TARIFF</div>
                          <div className="text-2xl font-black font-display text-black">₹{req.price}</div>
                        </div>
                        <div className="px-3 py-1 bg-black text-white text-xs font-bold uppercase tracking-wider">
                          {req.status}
                        </div>
                      </div>
                    </div>

                    {/* Animated Lifecycle Bar */}
                    <div className="p-6">
                      <BookingLifecycle
                        status={req.status}
                        timeline={req.timeline}
                        workerName={req.providerName}
                        price={req.price}
                      />
                    </div>

                    {/* Customer Location & Notes */}
                    <div className="p-6 bg-black/5 border-t border-black/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                      <div>
                        <div className="text-[10px] font-mono-code uppercase font-bold text-black/40">
                          SERVICE LOCATION
                        </div>
                        <div className="font-bold text-black mt-1 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-black" />
                          <span>{req.location}</span>
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] font-mono-code uppercase font-bold text-black/40">
                          CUSTOMER DIAGNOSTIC NOTES
                        </div>
                        <div className="text-black/70 mt-1 italic">
                          "{req.notes || 'AC cooling diminished, outdoor unit requires jet wash.'}"
                        </div>
                      </div>
                    </div>

                    {/* Step Transitions */}
                    <div className="p-6 bg-white border-t border-black/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="text-xs text-black/60 font-sans max-w-md">
                        {req.status === 'Requested' && 'Confirm your availability to arrive at the doorstep on schedule.'}
                        {req.status === 'Accepted' && 'En route with guild tools. Start service upon arrival at customer premises.'}
                        {req.status === 'In Progress' && 'Service actively underway. Enter verification PIN to release 100% escrow.'}
                        {req.status === 'Completed' && 'Direct funds released to your wallet. Reputational credential updated.'}
                      </div>

                      <div className="flex items-center gap-3">
                        {req.status === 'Requested' && (
                          <button
                            type="button"
                            onClick={() => updateBookingStatus(req.id, 'Accepted')}
                            className="px-6 py-2.5 bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider transition flex items-center gap-2"
                          >
                            <Check className="w-4 h-4 text-[#CCFF00]" />
                            <span>Accept Request</span>
                          </button>
                        )}

                        {req.status === 'Accepted' && (
                          <button
                            type="button"
                            onClick={() => updateBookingStatus(req.id, 'In Progress')}
                            className="px-6 py-2.5 bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider transition flex items-center gap-2"
                          >
                            <Play className="w-4 h-4 text-[#CCFF00]" />
                            <span>Start Service</span>
                          </button>
                        )}

                        {req.status === 'In Progress' && (
                          <button
                            type="button"
                            onClick={() => updateBookingStatus(req.id, 'Completed')}
                            className="px-6 py-2.5 bg-[#CCFF00] hover:bg-[#D4FF00] text-[#0A0A0A] font-bold text-xs uppercase tracking-wider transition flex items-center gap-2"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Complete & Settle</span>
                          </button>
                        )}

                        {req.status === 'Completed' && (
                          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
                            {req.paymentStatus === 'Paid' ? (
                              <div className="px-4 py-2 bg-[#CCFF00] text-black font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>Paid: ₹{req.price} (100% Disbursed)</span>
                              </div>
                            ) : (
                              <div className="px-4 py-2 bg-amber-400 text-black font-bold text-xs uppercase tracking-wider animate-pulse">
                                Awaiting Customer Payment (₹{req.price})
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-black/15 p-12 text-center space-y-4">
                <div className="text-2xl font-black font-display uppercase text-black">
                  QUEUE CLEAR • ZERO PENDING CALLS
                </div>
                <p className="text-xs text-black/60 max-w-sm mx-auto font-sans">
                  Switch perspective back to Customer (Arun Kumar) to simulate booking a direct doorstep service.
                </p>
                <button
                  onClick={() => setRole('customer')}
                  className="px-6 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-wider"
                >
                  Switch to Customer View
                </button>
              </div>
            )}
          </div>

          {/* Right Column (4 cols): Tool Library & Democratic Ballots */}
          <div className="lg:col-span-4 space-y-6">
            {/* MY COOPERATIVE & TEAM ALLIANCES */}
            <div className="bg-[#0A0A0A] text-[#F5F5F2] border border-black p-6 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
                  <Users2 className="w-4 h-4 text-[#CCFF00]" />
                  <span>MY COOPERATIVE & TEAMS</span>
                </div>
                <span className="text-[10px] text-[#CCFF00] font-bold uppercase">
                  Member
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-[10px] text-white/40 uppercase">HOME COOPERATIVE UNIT</div>
                <div className="text-base font-black font-display uppercase text-white">
                  {worker.cooperativeUnit}
                </div>
                <div className="text-xs text-white/60 font-sans">
                  Active Guild: <span className="text-white font-bold">{cooperativeTeams[0]?.name}</span>
                </div>
              </div>

              {/* Action buttons: Create Team & Invite */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setCreateTeamModalOpen(true)}
                  className="py-2.5 px-3 bg-[#CCFF00] hover:bg-[#D4FF00] text-black font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 text-center"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>CREATE TEAM</span>
                </button>

                <button
                  type="button"
                  onClick={() => setInviteModalOpen(true)}
                  className="py-2.5 px-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition flex items-center justify-center gap-1.5 text-center"
                >
                  <Send className="w-3.5 h-3.5 text-[#CCFF00]" />
                  <span>INVITE PRO</span>
                </button>
              </div>

              {/* Sent Invitations Tracker */}
              {workerInvitations.length > 0 && (
                <div className="pt-3 border-t border-white/10 space-y-2">
                  <div className="text-[10px] text-white/40 uppercase font-bold">
                    PENDING GUILD INVITATIONS ({workerInvitations.length})
                  </div>
                  {workerInvitations.map((inv) => (
                    <div key={inv.id} className="p-2.5 bg-white/5 border border-white/10 text-xs flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white">{inv.invitedWorkerName}</div>
                        <div className="text-[10px] text-white/50">{inv.invitedWorkerTrade}</div>
                      </div>
                      <span className="text-[9px] bg-[#CCFF00]/10 border border-[#CCFF00]/30 text-[#CCFF00] px-1.5 py-0.5 uppercase font-bold">
                        {inv.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Growth Credits shortcut */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <div>
                  <div className="text-[9px] text-white/40 uppercase">GROWTH CREDITS</div>
                  <div className="text-xl font-black font-display text-[#CCFF00]">{growthCredits} PTS</div>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/growth')}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-[10px] uppercase font-bold transition flex items-center gap-1 border border-white/15"
                >
                  <span>Redeem Equity</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Tool Library Checkout */}
            <div className="bg-white border border-black/15 p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-black/10">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black">
                  <Package className="w-4 h-4 text-black" />
                  <span>WARD TOOL LIBRARY</span>
                </div>
                <span className="text-[10px] bg-black text-white px-2 py-0.5 font-bold uppercase">
                  Shared Asset Hub
                </span>
              </div>

              <div className="p-4 bg-black/5 border border-black/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-black">Daikin Pressure Jet Washer</span>
                  <span className={`text-[10px] px-1.5 py-0.5 font-bold uppercase ${
                    toolCheckedOut ? 'bg-[#CCFF00] text-black' : 'bg-black/10 text-black/60'
                  }`}>
                    {toolCheckedOut ? 'CHECKED OUT' : 'RETURNED'}
                  </span>
                </div>
                <p className="text-[11px] text-black/60 font-sans">
                  Asset ID: #TL-902 • Inspected by Guild Custodian
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-black/10 text-[11px]">
                  <span className="text-black/50">Return Due:</span>
                  <span className="font-bold text-black">Tomorrow, 18:00</span>
                </div>
                <button
                  type="button"
                  onClick={() => setToolCheckedOut(!toolCheckedOut)}
                  className="w-full mt-2 py-2 text-xs font-bold uppercase tracking-wider bg-black text-white hover:bg-neutral-800 transition text-center"
                >
                  {toolCheckedOut ? 'Extend Checkout (+24h)' : 'Check Out Tool'}
                </button>
              </div>
            </div>

            {/* Democratic Governance Ballot */}
            <div className="bg-[#0A0A0A] text-[#F5F5F2] border border-black p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
                  <Vote className="w-4 h-4 text-[#CCFF00]" />
                  <span>DEMOCRATIC GOVERNANCE</span>
                </div>
                <span className="text-[10px] text-[#CCFF00] font-bold uppercase">
                  1 Member = 1 Vote
                </span>
              </div>

              <div className="space-y-2">
                <div className="text-[10px] text-[#CCFF00] font-bold uppercase">
                  ACTIVE BALLOT #42 • CLOSES IN 3 DAYS
                </div>
                <p className="text-xs text-white/70 font-sans leading-relaxed">
                  "Allocate 8% of Q1 Cooperative Surplus to expand Shared E-Cargo Bike Fleet for local technicians."
                </p>
              </div>

              <div className="pt-2">
                {votedResolution ? (
                  <div className="p-3 bg-white/5 border border-white/20 text-[#CCFF00] text-xs flex items-center gap-2">
                    <CheckCheck className="w-4 h-4" />
                    <span>Your vote ({votedResolution.toUpperCase()}) recorded on guild ledger!</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setVotedResolution('yes')}
                      className="py-2.5 text-xs font-bold uppercase tracking-wider bg-[#CCFF00] hover:bg-[#D4FF00] text-[#0A0A0A] transition text-center"
                    >
                      Vote In Favor
                    </button>
                    <button
                      type="button"
                      onClick={() => setVotedResolution('no')}
                      className="py-2.5 text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/20 transition text-center"
                    >
                      Vote Against
                    </button>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-white/10 text-[10px] text-white/50 flex items-center justify-between">
                <span>Member Turnout:</span>
                <span className="text-white font-bold">78% (66 / 84 members)</span>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL 1: VIEW CLUSTER DETAILS MODAL */}
        <AnimatePresence>
          {viewClusterModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs font-mono-code">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#0A0A0A] text-[#F5F5F2] border border-[#CCFF00] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-8 space-y-6 shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-white/15 pb-4">
                  <div className="space-y-1">
                    <div className="text-[10px] text-[#CCFF00] font-bold uppercase">
                      ZONE DEMAND TOPOLOGY
                    </div>
                    <h3 className="text-2xl font-black font-display uppercase text-white">
                      ANNA NAGAR AC CLUSTER DETAILS
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setViewClusterModalOpen(false)}
                    className="text-white/40 hover:text-white text-xs uppercase"
                  >
                    Close
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-white/5 border border-white/10 text-center">
                    <div className="text-white/40 text-[9px] uppercase">TOTAL CALLS</div>
                    <div className="text-2xl font-black font-display text-white">{cluster.households.length} Homes</div>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10 text-center">
                    <div className="text-white/40 text-[9px] uppercase">DISPATCH RADIUS</div>
                    <div className="text-2xl font-black font-display text-[#CCFF00]">1.5 km Zone</div>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10 text-center">
                    <div className="text-white/40 text-[9px] uppercase">TOTAL REVENUE</div>
                    <div className="text-2xl font-black font-display text-[#CCFF00]">
                      ₹{cluster.clusterPrice * cluster.households.length}
                    </div>
                  </div>
                </div>

                {/* List of customer requests */}
                <div className="space-y-2">
                  <div className="text-xs text-white/50 uppercase font-bold">
                    CONNECTED HOUSEHOLD DISPATCH ROSTER:
                  </div>
                  <div className="space-y-2">
                    {cluster.households.map((h) => (
                      <div key={h.id} className="p-3 bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                        <div>
                          <div className="font-bold text-white font-sans">{h.name}</div>
                          <div className="text-[11px] text-white/60 font-sans">{h.location}</div>
                          <div className="text-[10px] text-white/40">Slot: {h.timeWindow}</div>
                        </div>
                        <div className="text-right">
                          <span className="text-[#CCFF00] font-bold">₹{cluster.clusterPrice}</span>
                          <div className="text-[10px] text-white/40">{h.distanceKm} km transit</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => setViewClusterModalOpen(false)}
                    className="w-full sm:w-1/2 py-3 bg-white/10 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition text-center"
                  >
                    Back to Queue
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      acceptCommunityCluster();
                      setViewClusterModalOpen(false);
                    }}
                    className="w-full sm:w-1/2 py-3 bg-[#CCFF00] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#D4FF00] transition flex items-center justify-center gap-2 text-center"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>ACCEPT ENTIRE CLUSTER</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* MODAL 2: CREATE TEAM MODAL */}
        <AnimatePresence>
          {createTeamModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs font-mono-code">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#0A0A0A] text-[#F5F5F2] border border-[#CCFF00] w-full max-w-lg max-h-[90vh] overflow-y-auto p-4 sm:p-8 space-y-6 shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-white/15 pb-4">
                  <div className="space-y-1">
                    <div className="text-[10px] text-[#CCFF00] font-bold uppercase">
                      FEDERATED GUILD BUILDER
                    </div>
                    <h3 className="text-2xl font-black font-display uppercase text-white">
                      CREATE COOPERATIVE TEAM
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCreateTeamModalOpen(false)}
                    className="text-white/40 hover:text-white text-xs uppercase"
                  >
                    Close
                  </button>
                </div>

                <form onSubmit={handleCreateTeamSubmit} className="space-y-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="text-[10px] text-white/50 uppercase font-bold">Team Name:</label>
                    <input
                      type="text"
                      value={newTeamName}
                      onChange={(e) => setNewTeamName(e.target.value)}
                      required
                      className="w-full p-3 bg-white/5 border border-white/20 text-white font-mono-code focus:border-[#CCFF00] outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] text-white/50 uppercase font-bold">Primary Service Area:</label>
                    <input
                      type="text"
                      value={newTeamArea}
                      onChange={(e) => setNewTeamArea(e.target.value)}
                      required
                      className="w-full p-3 bg-white/5 border border-white/20 text-white font-mono-code focus:border-[#CCFF00] outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] text-white/50 uppercase font-bold">
                      Coordinated Services (Comma Separated):
                    </label>
                    <input
                      type="text"
                      value={newTeamServices}
                      onChange={(e) => setNewTeamServices(e.target.value)}
                      required
                      className="w-full p-3 bg-white/5 border border-white/20 text-white font-mono-code focus:border-[#CCFF00] outline-none"
                    />
                  </div>

                  <div className="p-3 bg-white/5 border border-white/10 text-white/70 font-sans text-xs">
                    Arjun AC Services will act as initial founding craft anchor. You can invite other licensed trades next.
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row gap-3">
                    <button
                      type="button"
                      onClick={() => setCreateTeamModalOpen(false)}
                      className="w-full sm:w-1/2 py-3 bg-white/10 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition text-center"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-full sm:w-1/2 py-3 bg-[#CCFF00] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#D4FF00] transition text-center"
                    >
                      REGISTER GUILD TEAM
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* MODAL 3: INVITE PROFESSIONAL MODAL */}
        <AnimatePresence>
          {inviteModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs font-mono-code">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#0A0A0A] text-[#F5F5F2] border border-[#CCFF00] w-full max-w-lg max-h-[90vh] overflow-y-auto p-4 sm:p-8 space-y-6 shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-white/15 pb-4">
                  <div className="space-y-1">
                    <div className="text-[10px] text-[#CCFF00] font-bold uppercase">
                      FEDERATED GUILD ROSTER
                    </div>
                    <h3 className="text-2xl font-black font-display uppercase text-white">
                      INVITE PROFESSIONAL TO TEAM
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setInviteModalOpen(false)}
                    className="text-white/40 hover:text-white text-xs uppercase"
                  >
                    Close
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="text-white/50 text-[10px] uppercase font-bold">
                    SELECT VERIFIED IN-ZONE ARTISAN:
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {VERIFIED_WORKERS_FOR_INVITE.map((w) => {
                      const isChosen = selectedInviteWorker.id === w.id;
                      return (
                        <div
                          key={w.id}
                          onClick={() => setSelectedInviteWorker(w)}
                          className={`p-3 border transition cursor-pointer flex items-center justify-between ${
                            isChosen
                              ? 'bg-white/15 border-[#CCFF00] text-white'
                              : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                          }`}
                        >
                          <div>
                            <div className="font-bold text-white uppercase">{w.name}</div>
                            <div className="text-[10px] text-white/50">{w.trade} • {w.location}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-[#CCFF00] font-bold">{w.rating} ★</div>
                            <span className="text-[9px] uppercase text-white/40">Verified</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => setInviteModalOpen(false)}
                    className="w-full sm:w-1/2 py-3 bg-white/10 text-white font-bold text-xs uppercase tracking-wider hover:bg-white/20 transition text-center"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSendInviteSubmit}
                    className="w-full sm:w-1/2 py-3 bg-[#CCFF00] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#D4FF00] transition flex items-center justify-center gap-2 text-center"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>SEND GUILD INVITE</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
