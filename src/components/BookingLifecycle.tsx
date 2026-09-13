import React from 'react';
import { motion } from 'motion/react';
import { BookingStatus } from '../types';
import {
  Clock,
  CheckCircle2,
  Bike,
  Wrench,
  ShieldCheck,
  Award,
  KeyRound,
  Navigation,
  Check,
} from 'lucide-react';

interface BookingLifecycleProps {
  status: BookingStatus;
  timeline: {
    requestedAt: string;
    acceptedAt?: string;
    startedAt?: string;
    completedAt?: string;
  };
  otp?: string;
  workerName?: string;
  price?: number;
}

const STAGES: {
  key: BookingStatus;
  label: string;
  desc: string;
  eta: string;
  phase: string;
}[] = [
  {
    key: 'Requested',
    phase: 'PHASE 01',
    label: 'REQUESTED',
    desc: 'Dispatched to nearby verified master. Escrow tariff locked.',
    eta: 'Awaiting broadcast reply',
  },
  {
    key: 'Accepted',
    phase: 'PHASE 02',
    label: 'ACCEPTED',
    desc: 'Master accepted. Packing guild tools & in transit.',
    eta: '11 Min Arrival • 1.2 km away',
  },
  {
    key: 'In Progress',
    phase: 'PHASE 03',
    label: 'IN SERVICE',
    desc: 'On-site execution underway. Diagnostic checklist verified.',
    eta: 'Active doorstep service',
  },
  {
    key: 'Completed',
    phase: 'PHASE 04',
    label: 'COMPLETED',
    desc: 'OTP verified. 100% direct payment released to craftsman.',
    eta: 'Service logged in passport',
  },
];

export const BookingLifecycle: React.FC<BookingLifecycleProps> = ({
  status,
  timeline,
  otp = '4920',
  workerName = 'Arjun Raj',
  price = 599,
}) => {
  const getStageIndex = (s: BookingStatus): number => {
    switch (s) {
      case 'Requested':
        return 0;
      case 'Accepted':
        return 1;
      case 'In Progress':
        return 2;
      case 'Completed':
        return 3;
      default:
        return 0;
    }
  };

  const currentIndex = getStageIndex(status);

  return (
    <div className="w-full bg-[#0A0A0A] border border-white/15 p-6 sm:p-8 text-[#F5F5F2] font-mono-code space-y-8">
      {/* Physical Journey Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="text-[11px] text-[#CCFF00] font-bold uppercase tracking-widest flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
            <span>NEIGHBOURHOOD PHYSICAL JOURNEY</span>
          </div>
          <div className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight text-white mt-1">
            TRANSIT & EXECUTION LIFECYCLE
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="p-2.5 bg-white/5 border border-white/10 text-right">
            <div className="text-[9px] text-white/50 uppercase">DIRECT DISPATCH TO</div>
            <div className="font-bold text-white mt-0.5">{workerName}</div>
          </div>
          <div className="p-2.5 bg-white/5 border border-white/10 text-right">
            <div className="text-[9px] text-white/50 uppercase">VERIFICATION OTP</div>
            <div className="font-black text-[#CCFF00] tracking-widest text-sm mt-0.5">{otp}</div>
          </div>
        </div>
      </div>

      {/* Animated Path & Trajectory Vector */}
      <div className="relative py-4">
        {/* Trajectory line with active fill - only visible on sm+ 4-col layout */}
        <div className="hidden sm:block absolute left-6 right-6 top-8 h-1 bg-white/10 -z-0">
          <motion.div
            className="h-full bg-[#CCFF00]"
            initial={{ width: '0%' }}
            animate={{ width: `${(currentIndex / 3) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Stages Display */}
        <div className="relative z-10 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-4">
          {STAGES.map((stage, idx) => {
            const isDone = idx < currentIndex;
            const isCurrent = idx === currentIndex;

            return (
              <div
                key={stage.key}
                className={`p-4 border transition-all ${
                  isCurrent
                    ? 'bg-[#171717] border-[#CCFF00] shadow-md'
                    : isDone
                    ? 'bg-[#121212] border-white/30 text-white/80'
                    : 'bg-[#0A0A0A] border-white/10 text-white/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold tracking-widest ${isCurrent ? 'text-[#CCFF00]' : ''}`}>
                    {stage.phase}
                  </span>
                  {isDone ? (
                    <Check className="w-3.5 h-3.5 text-[#CCFF00]" />
                  ) : isCurrent ? (
                    <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-ping" />
                  ) : null}
                </div>

                <div className={`text-base font-black font-display uppercase tracking-tight mt-2 ${
                  isCurrent ? 'text-white' : ''
                }`}>
                  {stage.label}
                </div>

                <div className="text-[11px] font-sans text-white/60 mt-1 leading-snug">
                  {stage.desc}
                </div>

                <div className="text-[10px] text-[#CCFF00] font-mono-code pt-3 mt-3 border-t border-white/10">
                  {stage.eta}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tool Checklist & Transit Radar Telemetry */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div className="p-4 bg-white/5 border border-white/10 space-y-2">
          <div className="text-[10px] text-white/50 uppercase tracking-wider flex items-center gap-1.5">
            <Wrench className="w-3.5 h-3.5 text-[#CCFF00]" />
            <span>GUILD EQUIPMENT ON-SITE CHECKLIST</span>
          </div>
          <div className="space-y-1.5 text-xs text-white/80 font-sans">
            <div className="flex items-center gap-2">
              <Check className="w-3 h-3 text-[#CCFF00]" />
              <span>High-pressure coil jet washer (Ward 102 Tool Library)</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3 h-3 text-[#CCFF00]" />
              <span>Digital refrigeration manifold & leak detector</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3 h-3 text-[#CCFF00]" />
              <span>Floor protection drop cloth & safety mask</span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white/5 border border-white/10 space-y-2">
          <div className="text-[10px] text-white/50 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#CCFF00]" />
            <span>ESCROW PAYMENT RELEASE PROTOCOL</span>
          </div>
          <div className="space-y-1 text-xs text-white/80 font-sans">
            <div>Tariff: <span className="font-bold text-white">₹{price} direct</span></div>
            <div className="text-white/60 text-[11px]">
              Held in cooperative escrow. 100% transferred to {workerName} instantly when customer confirms OTP {otp}.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
