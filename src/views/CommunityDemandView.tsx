import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import {
  Users,
  Sparkles,
  Zap,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  Share2,
  ShieldCheck,
  TrendingDown,
  RotateCcw,
  Check,
  AlertCircle,
} from 'lucide-react';

export const CommunityDemandView: React.FC = () => {
  const {
    cluster,
    joinCommunityCluster,
    customer,
    role,
    setRole,
    setActiveTab,
    selectedLocalityFilter,
  } = useApp();

  // Visualization stage: 'separate' -> 'detecting' -> 'clustered'
  const [clusterMode, setClusterMode] = useState<'clustered' | 'separate'>('clustered');
  const [isDetecting, setIsDetecting] = useState<boolean>(false);

  const triggerDetectionSequence = () => {
    setIsDetecting(true);
    setClusterMode('separate');
    setTimeout(() => {
      setClusterMode('clustered');
      setIsDetecting(false);
    }, 1200);
  };

  // Node coordinates for custom abstract SVG network
  // Center is around (250, 180)
  const nodePositions = [
    { id: 'req-01', x: 170, y: 130, label: 'Arun (You)', dist: '0.2 km', time: '10:00 AM' },
    { id: 'req-02', x: 330, y: 140, label: 'Meena', dist: '0.8 km', time: '11:00 AM' },
    { id: 'req-03', x: 250, y: 270, label: 'Rahul', dist: '1.3 km', time: '12:00 PM' },
    { id: 'req-04', x: 190, y: 230, label: 'Kavitha (Pending)', dist: '1.1 km', time: '12:30 PM' },
  ];

  const totalDemandSavings = (cluster.individualPrice - cluster.clusterPrice) * cluster.households.length;

  return (
    <div className="w-full bg-[#F5F5F2] text-[#0A0A0A] font-mono-code min-h-screen py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Editorial Section Header */}
        <div className="bg-[#0A0A0A] text-[#F5F5F2] border border-black p-6 sm:p-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div className="space-y-1">
              <div className="text-xs uppercase tracking-widest text-[#CCFF00] font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
                <span>COMMUNITY DEMAND AGGREGATION ENGINE</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black font-display text-white uppercase tracking-tight">
                LOCAL DEMAND CLUSTERING
              </h1>
              <p className="text-xs text-white/70 font-sans max-w-2xl leading-relaxed">
                Instead of treating nearby households requesting the same service as isolated individual calls,
                CoServe detects concurrent demand within the same 1.5 km residential corridor.
                Aggregated demand reduces duplicate technician commute and unlocks coordinated community pricing.
              </p>
            </div>

            <div className="p-4 bg-white/5 border border-white/15 text-right shrink-0">
              <div className="text-[10px] text-white/40 uppercase">CLUSTER STATUS</div>
              <div className="text-xl sm:text-2xl font-black font-display text-[#CCFF00]">
                {cluster.workerAccepted ? 'DISPATCH ACCEPTED' : cluster.userJoined ? 'YOU JOINED' : 'CLUSTER ACTIVE'}
              </div>
              <div className="text-[10px] text-white/60">
                {cluster.households.length} Households • {cluster.serviceName}
              </div>
            </div>
          </div>

          {/* Aggregate Telemetry Metrics */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-4 bg-white/5 border border-white/10">
              <div className="text-[10px] text-white/40 uppercase">CLUSTER PARTICIPANTS</div>
              <div className="text-3xl font-black font-display text-white mt-1">
                {cluster.households.length} <span className="text-xs text-white/50 font-normal">Homes</span>
              </div>
              <div className="text-[10px] text-[#CCFF00] mt-1">Same 1.5 km Zone</div>
            </div>

            <div className="p-4 bg-white/5 border border-white/10">
              <div className="text-[10px] text-white/40 uppercase">COMMUNITY TARIFF</div>
              <div className="text-3xl font-black font-display text-[#CCFF00] mt-1">
                ₹{cluster.clusterPrice}
              </div>
              <div className="text-[10px] text-white/60 mt-1 line-through">
                Individual: ₹{cluster.individualPrice}
              </div>
            </div>

            <div className="p-4 bg-white/5 border border-white/10">
              <div className="text-[10px] text-white/40 uppercase">REDUCED TRAVEL TIME</div>
              <div className="text-3xl font-black font-display text-white mt-1">
                -68%
              </div>
              <div className="text-[10px] text-white/60 mt-1">Zero Duplicate City Transits</div>
            </div>

            <div className="p-4 bg-white/5 border border-white/10">
              <div className="text-[10px] text-white/40 uppercase">WORKER BATCH REVENUE</div>
              <div className="text-3xl font-black font-display text-white mt-1">
                ₹{cluster.clusterPrice * cluster.households.length}
              </div>
              <div className="text-[10px] text-white/60 mt-1">Guaranteed 3-Hour Block</div>
            </div>
          </div>
        </div>

        {/* HERO INTERACTIVE NETWORK VISUALIZATION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Main: Custom Abstract Network Visualizer (8 Cols) */}
          <div className="lg:col-span-8 bg-white border border-black/15 p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-black/10">
              <div>
                <div className="text-[10px] text-black/40 uppercase font-bold tracking-widest">
                  TOPOLOGICAL LOCAL SERVICE RADAR
                </div>
                <h2 className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight text-black">
                  ZONE CORRIDOR DEMAND MESH
                </h2>
              </div>

              {/* Simulation Mode Toggle */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={triggerDetectionSequence}
                  disabled={isDetecting}
                  className="px-3 py-1.5 bg-black text-white text-[10px] uppercase font-bold tracking-wider hover:bg-neutral-800 transition flex items-center gap-1.5"
                >
                  <RotateCcw className={`w-3 h-3 ${isDetecting ? 'animate-spin' : ''}`} />
                  <span>{isDetecting ? 'Detecting...' : 'Replay Cluster Detection'}</span>
                </button>

                <div className="flex border border-black/20 text-[10px] font-bold">
                  <button
                    type="button"
                    onClick={() => setClusterMode('separate')}
                    className={`px-2.5 py-1 uppercase ${
                      clusterMode === 'separate' ? 'bg-black text-white' : 'bg-white text-black/60'
                    }`}
                  >
                    Isolated
                  </button>
                  <button
                    type="button"
                    onClick={() => setClusterMode('clustered')}
                    className={`px-2.5 py-1 uppercase ${
                      clusterMode === 'clustered' ? 'bg-[#CCFF00] text-black' : 'bg-white text-black/60'
                    }`}
                  >
                    Clustered
                  </button>
                </div>
              </div>
            </div>

            {/* ABSTRACT NETWORK CANVAS */}
            <div className="relative w-full h-[380px] sm:h-[440px] bg-[#0A0A0A] border border-black overflow-hidden flex items-center justify-center p-4">
              {/* Subtle background coordinate grid */}
              <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

              {/* Central Locality Telemetry Watermark */}
              <div className="absolute top-4 left-4 z-10 text-[10px] text-white/40 uppercase tracking-widest pointer-events-none">
                <div>SERVICE ZONE: {selectedLocalityFilter.toUpperCase()}</div>
                <div>GRID RESOLUTION: 1.5 KM CORRIDOR</div>
                <div>SERVICE: {cluster.serviceName.toUpperCase()}</div>
              </div>

              <div className="absolute bottom-4 right-4 z-10 text-[10px] text-[#CCFF00] uppercase tracking-widest pointer-events-none text-right">
                <div>{clusterMode === 'clustered' ? '● 3 HOUSEHOLDS LINKED' : '○ SEPARATE INDEPENDENT REQUESTS'}</div>
                <div className="text-white/40">EFFICIENCY INDEX: {clusterMode === 'clustered' ? '96.2%' : '41.0%'}</div>
              </div>

              {/* SVG Network Vectors */}
              <svg className="w-full h-full" viewBox="0 0 500 360">
                <defs>
                  {/* Glowing filter */}
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Cluster Radius Boundary when clustered */}
                <AnimatePresence>
                  {clusterMode === 'clustered' && (
                    <motion.g
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.6 }}
                    >
                      {/* Cluster Center Hub */}
                      <circle
                        cx="250"
                        cy="180"
                        r="115"
                        fill="none"
                        stroke="#CCFF00"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        className="animate-[spin_40s_linear_infinite]"
                      />
                      <circle
                        cx="250"
                        cy="180"
                        r="140"
                        fill="rgba(204, 255, 0, 0.03)"
                        stroke="rgba(204, 255, 0, 0.2)"
                        strokeWidth="1"
                      />
                      <circle
                        cx="250"
                        cy="180"
                        r="4"
                        fill="#CCFF00"
                      />
                      <text
                        x="250"
                        y="165"
                        fill="#CCFF00"
                        fontSize="9"
                        textAnchor="middle"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        CLUSTER FOCUS (~1.5 KM)
                      </text>
                    </motion.g>
                  )}
                </AnimatePresence>

                {/* Connecting Transit Vectors */}
                {clusterMode === 'clustered' && (
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    {/* Node 1 to Node 2 */}
                    <line
                      x1="170"
                      y1="130"
                      x2="330"
                      y2="140"
                      stroke="#CCFF00"
                      strokeWidth="1.5"
                      strokeDasharray="6 4"
                    />
                    <text x="250" y="125" fill="#ffffff" opacity="0.6" fontSize="8" textAnchor="middle" fontFamily="monospace">
                      0.8 km transit
                    </text>

                    {/* Node 2 to Node 3 */}
                    <line
                      x1="330"
                      y1="140"
                      x2="250"
                      y2="270"
                      stroke="#CCFF00"
                      strokeWidth="1.5"
                      strokeDasharray="6 4"
                    />
                    <text x="310" y="215" fill="#ffffff" opacity="0.6" fontSize="8" textAnchor="middle" fontFamily="monospace">
                      0.5 km transit
                    </text>

                    {/* Node 3 to Node 1 */}
                    <line
                      x1="250"
                      y1="270"
                      x2="170"
                      y2="130"
                      stroke="#CCFF00"
                      strokeWidth="1.5"
                      strokeDasharray="6 4"
                    />
                    <text x="190" y="215" fill="#ffffff" opacity="0.6" fontSize="8" textAnchor="middle" fontFamily="monospace">
                      0.7 km transit
                    </text>
                  </motion.g>
                )}

                {/* Isolated travel paths (red/gray crisscross when in separate mode) */}
                {clusterMode === 'separate' && (
                  <g opacity="0.4">
                    <line x1="60" y1="320" x2="170" y2="130" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="60" y1="320" x2="330" y2="140" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 3" />
                    <line x1="60" y1="320" x2="250" y2="270" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 3" />
                    <text x="60" y="340" fill="#ffffff" opacity="0.6" fontSize="8" fontFamily="monospace">
                      Depot (3 duplicate 12 km round-trips)
                    </text>
                  </g>
                )}

                {/* Animated Household Nodes */}
                {/* Node 1: Arun (You) */}
                <g>
                  <circle cx="170" cy="130" r="14" fill="#121212" stroke={cluster.userJoined ? '#CCFF00' : '#ffffff'} strokeWidth="2" />
                  <circle cx="170" cy="130" r="5" fill={cluster.userJoined ? '#CCFF00' : '#ffffff'} />
                  {clusterMode === 'clustered' && (
                    <circle cx="170" cy="130" r="22" fill="none" stroke="#CCFF00" strokeWidth="1" opacity="0.4" className="animate-ping" />
                  )}
                  <text x="170" y="105" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                    Arun (Area A)
                  </text>
                  <text x="170" y="160" fill="#CCFF00" fontSize="8" textAnchor="middle" fontFamily="monospace">
                    10:00 AM • AC Svc
                  </text>
                </g>

                {/* Node 2: Meena */}
                <g>
                  <circle cx="330" cy="140" r="14" fill="#121212" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="330" cy="140" r="5" fill="#ffffff" />
                  <text x="330" y="115" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                    Meena (4th Main)
                  </text>
                  <text x="330" y="170" fill="#CCFF00" fontSize="8" textAnchor="middle" fontFamily="monospace">
                    11:00 AM • +0.8 km
                  </text>
                </g>

                {/* Node 3: Rahul */}
                <g>
                  <circle cx="250" cy="270" r="14" fill="#121212" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="250" cy="270" r="5" fill="#ffffff" />
                  <text x="250" y="300" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                    Rahul (Shanti Col)
                  </text>
                  <text x="250" y="315" fill="#CCFF00" fontSize="8" textAnchor="middle" fontFamily="monospace">
                    12:00 PM • +1.3 km
                  </text>
                </g>
              </svg>
            </div>

            {/* Clarification notes */}
            <div className="p-4 bg-black/5 border border-black/10 text-xs font-sans space-y-1.5">
              <div className="font-bold text-black uppercase font-mono-code text-[11px] flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-black" />
                <span>Demand Aggregation Protocol</span>
              </div>
              <p className="text-black/70 leading-relaxed">
                Potential community pricing through local demand aggregation.
                CoServe bundles adjacent households within a 1.5 km corridor and 3-hour window so cooperative
                technicians avoid zig-zagging across the city.
              </p>
              <div className="text-[10px] text-black/50 font-mono-code pt-1">
                * Note: Demonstration pricing. Not an unconditional guarantee.
              </div>
            </div>
          </div>

          {/* Right Column: Opportunity Card & Join Action (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Community Service Opportunity Box */}
            <div className="bg-[#0A0A0A] text-[#F5F5F2] border border-black p-6 space-y-6">
              <div className="space-y-1 pb-4 border-b border-white/10">
                <div className="text-[10px] text-[#CCFF00] font-bold uppercase tracking-widest">
                  COOPERATIVE PROPOSAL
                </div>
                <h3 className="text-xl font-black font-display uppercase text-white">
                  COMMUNITY SERVICE OPPORTUNITY
                </h3>
                <div className="text-xs text-white/60 font-sans">
                  Service: <span className="text-white font-bold">{cluster.serviceName}</span>
                </div>
              </div>

              {/* Pricing Comparison */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10 text-xs">
                  <div>
                    <div className="text-white/50 text-[10px] uppercase">Individual Service Price</div>
                    <div className="text-white/80 font-sans">Standard one-off visit</div>
                  </div>
                  <div className="text-xl font-black font-display text-white/60 line-through">
                    ₹{cluster.individualPrice}
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-[#CCFF00]/10 border border-[#CCFF00]/30 text-xs">
                  <div>
                    <div className="text-[#CCFF00] font-bold text-[10px] uppercase">Potential Community Price</div>
                    <div className="text-white/80 font-sans">Aggregated corridor visit</div>
                  </div>
                  <div className="text-2xl font-black font-display text-[#CCFF00]">
                    ₹{cluster.clusterPrice}
                  </div>
                </div>

                <div className="text-[11px] text-white/50 text-right">
                  Potential saving: <span className="text-[#CCFF00] font-bold">₹{cluster.individualPrice - cluster.clusterPrice}</span> per household
                </div>
              </div>

              {/* Action Button: Join Cluster */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={joinCommunityCluster}
                  className={`w-full py-3.5 text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 ${
                    cluster.userJoined
                      ? 'bg-white/15 hover:bg-white/20 text-white border border-white/30'
                      : 'bg-[#CCFF00] hover:bg-[#D4FF00] text-[#0A0A0A]'
                  }`}
                >
                  {cluster.userJoined ? (
                    <>
                      <Check className="w-4 h-4 text-[#CCFF00]" />
                      <span>YOU JOINED THIS CLUSTER (Click to Leave)</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>JOIN COMMUNITY SERVICE (₹{cluster.clusterPrice})</span>
                    </>
                  )}
                </button>

                {cluster.userJoined && (
                  <div className="p-3 bg-[#CCFF00]/10 border border-[#CCFF00]/30 text-[#CCFF00] text-xs font-bold uppercase flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>You are registered for tomorrow's 10:00 AM – 01:00 PM batch!</span>
                  </div>
                )}
              </div>

              {/* Cluster Spec Breakdown */}
              <div className="space-y-2 pt-2 border-t border-white/10 text-xs">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/40">Zone Radius:</span>
                  <span className="text-white font-bold">~{cluster.radiusKm} km Cluster</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/40">Target Window:</span>
                  <span className="text-white font-bold">{cluster.preferredWindow}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-white/40">Assigned Guild:</span>
                  <span className="text-white font-bold">
                    {cluster.workerAccepted ? 'Arjun AC Services' : 'Pending Worker Acceptance'}
                  </span>
                </div>
              </div>
            </div>

            {/* Households in Cluster List */}
            <div className="bg-white border border-black/15 p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-black/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-black">
                  CONNECTED HOUSEHOLDS ({cluster.households.length})
                </h4>
                <span className="text-[10px] bg-black text-white px-2 py-0.5 font-bold uppercase">
                  Verified In-Area
                </span>
              </div>

              <div className="space-y-3">
                {cluster.households.map((h, idx) => (
                  <div key={h.id} className="p-3 bg-black/5 border border-black/10 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-black font-sans flex items-center gap-1.5">
                        <span>{h.name}</span>
                        {h.isCurrentUser && (
                          <span className="text-[9px] bg-[#CCFF00] text-black px-1.5 font-mono-code font-bold uppercase">
                            YOU
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-black/50 font-sans mt-0.5">{h.location}</div>
                      <div className="text-[10px] text-black/40 font-mono-code">Slot: {h.timeWindow}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-black font-mono-code">{h.distanceKm} km</div>
                      <span className="text-[9px] text-emerald-600 font-bold uppercase">Linked</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
