import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Home,
  Wrench,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Navigation,
  Clock,
  Zap,
} from 'lucide-react';

export const NetworkVisual: React.FC = () => {
  const { setSelectedProvider, navigate, providers } = useApp();
  const [selectedLocalityNode, setSelectedLocalityNode] = useState<string>('arjun');

  const localityNodes = [
    {
      id: 'arjun',
      name: 'Arjun AC Services',
      professional: 'Arjun Raj',
      service: 'AC General Service & Jet Cleaning',
      locality: 'Anna Nagar Sector 2',
      distance: '0.8 km',
      eta: '4 mins away',
      status: 'Available Today',
      matchScore: 98,
      provId: 'prov-arjun-ac',
      coords: { house: { x: 180, y: 220 }, pro: { x: 720, y: 220 } },
    },
    {
      id: 'ravi',
      name: 'Ravi Electrical Services',
      professional: 'Ravi Kumar',
      service: 'Fan Installation & Wiring Repair',
      locality: 'T. Nagar Main Road',
      distance: '1.2 km',
      eta: '6 mins away',
      status: 'Available Today',
      matchScore: 95,
      provId: 'prov-ravi-elec',
      coords: { house: { x: 200, y: 340 }, pro: { x: 740, y: 300 } },
    },
    {
      id: 'kumar',
      name: 'Kumar Plumbing Services',
      professional: 'Kumar',
      service: 'Tap Leakage & Pipe Sealant',
      locality: 'Adyar Canal Road',
      distance: '0.5 km',
      eta: '2 mins away',
      status: 'On Job / Ready',
      matchScore: 96,
      provId: 'prov-kumar-plumb',
      coords: { house: { x: 160, y: 150 }, pro: { x: 700, y: 180 } },
    },
  ];

  const activeNode = localityNodes.find((n) => n.id === selectedLocalityNode) || localityNodes[0];

  const handleInspect = (provId: string) => {
    const p = providers.find((item) => item.id === provId);
    if (p) {
      setSelectedProvider(p);
      navigate(`/provider/${p.id}`);
    }
  };

  return (
    <div className="w-full bg-[#0A0A0A] border border-white/15 text-[#F5F5F2] font-mono-code overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 bg-[#121212]">
        <div className="space-y-1">
          <div className="text-xs font-bold uppercase tracking-widest text-[#CCFF00] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
            <span>LOCALITY ROUTE & MATCHING MESH</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black font-display text-white uppercase tracking-tight">
            DIRECT PEER-TO-PEER DISPATCH RADAR
          </h2>
        </div>

        {/* Locality Switchers */}
        <div className="flex items-center gap-2 flex-wrap">
          {localityNodes.map((node) => (
            <button
              key={node.id}
              onClick={() => setSelectedLocalityNode(node.id)}
              className={`px-3 py-1.5 text-xs uppercase font-bold tracking-wider transition border ${
                selectedLocalityNode === node.id
                  ? 'bg-[#CCFF00] text-[#0A0A0A] border-[#CCFF00]'
                  : 'bg-white/5 text-white/70 hover:text-white border-white/10'
              }`}
            >
              {node.locality}
            </button>
          ))}
        </div>
      </div>

      {/* Locality Map Canvas */}
      <div className="relative w-full h-[320px] sm:h-[420px] md:h-[480px] bg-[#0A0A0A] overflow-hidden flex items-center justify-center p-2 sm:p-6">
        {/* Street Grid background */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] [background-size:40px_40px]" />

        {/* Locality Label Overlay */}
        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 text-[10px] sm:text-xs text-white/50 space-y-0.5 bg-black/60 sm:bg-transparent p-1.5 sm:p-0">
          <div className="text-white font-bold tracking-widest uppercase">ZONE: {activeNode.locality}</div>
          <div className="hidden sm:block">ACTIVE CORRIDOR: {activeNode.service}</div>
          <div className="text-[#CCFF00]">DISTANCE: {activeNode.distance} • ETA: {activeNode.eta}</div>
        </div>

        <div className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 hidden sm:block text-right text-xs text-white/60 bg-black/80 px-3 py-2 border border-white/15">
          <div className="text-[#CCFF00] font-bold">100% DIRECT PAYOUT</div>
          <div className="text-[10px] text-white/40">Zero Middleman Commission</div>
        </div>

        {/* SVG Route Visualization */}
        <svg className="w-full h-full max-w-4xl" viewBox="0 0 900 400" preserveAspectRatio="xMidYMid meet">
          {/* Street Roads */}
          <g stroke="#333333" strokeWidth="6" fill="none" opacity="0.8">
            <line x1="100" y1="200" x2="800" y2="200" strokeDasharray="8 4" />
            <line x1="450" y1="50" x2="450" y2="350" />
            <path d="M 180 200 Q 450 100 720 200" fill="none" stroke="#222" strokeWidth="12" />
          </g>

          {/* Active Route Line */}
          <motion.path
            d={`M ${activeNode.coords.house.x} ${activeNode.coords.house.y} Q 450 120 ${activeNode.coords.pro.x} ${activeNode.coords.pro.y}`}
            fill="none"
            stroke="#CCFF00"
            strokeWidth="3"
            strokeDasharray="6 6"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />

          {/* Customer House Node */}
          <g transform={`translate(${activeNode.coords.house.x}, ${activeNode.coords.house.y})`}>
            <circle cx="0" cy="0" r="28" fill="#1E1E1E" stroke="#FFFFFF" strokeWidth="2" />
            <foreignObject x="-16" y="-16" width="32" height="32">
              <div className="flex items-center justify-center w-full h-full text-white">
                <Home className="w-5 h-5 text-[#CCFF00]" />
              </div>
            </foreignObject>
            <text x="0" y="44" fill="#FFFFFF" fontSize="11" textAnchor="middle" fontWeight="bold" fontFamily="monospace">
              CUSTOMER HOUSE
            </text>
            <text x="0" y="58" fill="#888888" fontSize="9" textAnchor="middle" fontFamily="monospace">
              {activeNode.locality}
            </text>
          </g>

          {/* Nearby Professional Node */}
          <g transform={`translate(${activeNode.coords.pro.x}, ${activeNode.coords.pro.y})`}>
            <circle cx="0" cy="0" r="32" fill="#CCFF00" stroke="#FFFFFF" strokeWidth="2" />
            <foreignObject x="-18" y="-18" width="36" height="36">
              <div className="flex items-center justify-center w-full h-full text-[#0A0A0A]">
                <Wrench className="w-5 h-5" />
              </div>
            </foreignObject>
            <text x="0" y="48" fill="#CCFF00" fontSize="12" textAnchor="middle" fontWeight="bold" fontFamily="monospace">
              {activeNode.professional}
            </text>
            <text x="0" y="62" fill="#FFFFFF" fontSize="10" textAnchor="middle" fontFamily="monospace">
              {activeNode.name}
            </text>
          </g>

          {/* Distance Indicator Badge in Center */}
          <g transform="translate(450, 140)">
            <rect x="-60" y="-16" width="120" height="32" fill="#0A0A0A" stroke="#CCFF00" strokeWidth="1" />
            <text x="0" y="4" fill="#CCFF00" fontSize="10" textAnchor="middle" fontWeight="bold" fontFamily="monospace">
              {activeNode.distance} • {activeNode.eta}
            </text>
          </g>
        </svg>
      </div>

      {/* Footer Details & Action */}
      <div className="p-5 bg-[#121212] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-0.5 text-xs text-white/70">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">{activeNode.name}</span>
            <span className="text-[#CCFF00] bg-[#CCFF00]/10 px-2 py-0.5 text-[10px]">
              {activeNode.matchScore}% FairMatch™
            </span>
          </div>
          <p className="text-[11px] text-white/50">
            Specialty: {activeNode.service} • Dual-verified skill & background check.
          </p>
        </div>

        <button
          type="button"
          onClick={() => handleInspect(activeNode.provId)}
          className="w-full sm:w-auto justify-center px-5 py-2.5 bg-[#CCFF00] hover:bg-[#b8e600] text-[#0A0A0A] font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 shrink-0"
        >
          <span>Inspect Professional Profile</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
