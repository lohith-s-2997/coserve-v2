import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { Booking } from '../types';
import {
  AlertTriangle,
  ShieldCheck,
  X,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

interface DisputeModalProps {
  booking: Booking;
  onClose: () => void;
}

export const DisputeModal: React.FC<DisputeModalProps> = ({ booking, onClose }) => {
  const { raiseDisputeIssue } = useApp();

  const disputeCategories = [
    { id: 'SERVICE QUALITY', label: 'Service Quality', desc: "I'm not satisfied with the service." },
    { id: 'INCOMPLETE SERVICE', label: 'Incomplete Service', desc: 'The work was not fully completed.' },
    { id: 'PROFESSIONAL DID NOT ARRIVE', label: 'Professional Did Not Arrive', desc: 'The professional did not show up.' },
    { id: 'PAYMENT / BILLING ISSUE', label: 'Payment / Billing Issue', desc: 'There is a problem with the amount or payment.' },
    { id: 'PROFESSIONAL BEHAVIOUR', label: 'Professional Behaviour', desc: "I had an issue with the professional's conduct." },
    { id: 'SERVICE DIFFERENT FROM BOOKING', label: 'Service Different From Booking', desc: 'The service provided was not what I booked.' },
    { id: 'OTHER', label: 'Other', desc: 'Something else went wrong.' },
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>('SERVICE QUALITY');
  const [description, setDescription] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(!!booking.disputeCase);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    raiseDisputeIssue(booking.id, selectedCategory, description || 'Customer reported issue regarding service delivery.');
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#0A0A0A] text-[#F5F5F2] border border-white/20 shadow-2xl p-4 sm:p-8 font-mono-code my-8"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 text-white/50 hover:text-white hover:bg-white/10 transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-widest mb-3">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>COOPERATIVE DISPUTE ASSISTANCE</span>
              </div>
              <h2 className="text-3xl font-black font-display uppercase tracking-tight text-white">
                WHAT WENT WRONG?
              </h2>
              <p className="text-xs text-white/60 font-sans mt-1">
                Raising an issue for booking <strong className="text-white">#{booking.id}</strong> ({booking.serviceName}) with <strong className="text-white">{booking.businessName}</strong>.
              </p>
            </div>

            {/* Category Selector */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-white/60 tracking-wider block">
                SELECT ISSUE CATEGORY
              </label>
              <div className="space-y-2">
                {disputeCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full p-3 text-left transition border flex items-center justify-between gap-4 ${
                      selectedCategory === cat.id
                        ? 'bg-amber-500 text-black border-amber-500 font-bold'
                        : 'bg-white/5 text-white border-white/15 hover:border-white/30'
                    }`}
                  >
                    <div>
                      <div className="text-xs uppercase font-bold">{cat.label}</div>
                      <div className={`text-[11px] font-sans mt-0.5 ${selectedCategory === cat.id ? 'text-black/80' : 'text-white/60'}`}>
                        {cat.desc}
                      </div>
                    </div>
                    {selectedCategory === cat.id && <CheckCircle2 className="w-4 h-4 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Description Textarea */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-white/60 tracking-wider block">
                TELL US WHAT HAPPENED (OPTIONAL)
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxLength={400}
                className="w-full bg-white/5 border border-white/15 p-3 text-xs text-white placeholder-white/40 focus:outline-hidden focus:border-amber-400 font-sans"
                placeholder="Provide details about the issue..."
              />
              <div className="text-right text-[10px] text-white/40">{description.length}/400 chars</div>
            </div>

            <div className="p-3 bg-white/5 border border-white/10 text-xs text-white/70 font-sans space-y-1">
              <span className="font-bold text-white uppercase text-[11px] block">
                🛡️ Cooperative Mediation Guarantee
              </span>
              <p className="text-[11px] leading-relaxed">
                Your case is reviewed by the Anna Nagar Ward 102 Service Steward who coordinates directly with the artisan.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-black text-xs font-black uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg"
            >
              <span>SUBMIT ISSUE</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>TICKET #{booking.disputeCase?.caseId || 'CS-1042'}</span>
              </div>
              <h2 className="text-3xl font-black font-display uppercase tracking-tight text-white">
                ISSUE SUBMITTED
              </h2>
              <p className="text-xs text-white/60 font-sans">
                Status: <strong className="text-amber-400">Under Cooperative Review</strong>
              </p>
            </div>

            {/* Timeline */}
            <div className="p-5 bg-white/5 border border-white/10 space-y-4">
              <div className="text-[10px] uppercase font-bold text-white/40 tracking-wider">
                RESOLUTION TIMELINE
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-black flex items-center justify-center font-bold text-xs">✓</div>
                  <div>
                    <span className="font-bold text-white block">Submitted</span>
                    <span className="text-[11px] text-white/60">Ticket logged and linked to escrow booking #{booking.id}.</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500 text-black flex items-center justify-center font-bold text-xs animate-pulse">2</div>
                  <div>
                    <span className="font-bold text-white block">Cooperative Review</span>
                    <span className="text-[11px] text-white/60">Anna Nagar Ward 102 Steward reviewing case details.</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 opacity-50">
                  <div className="w-6 h-6 rounded-full bg-white/10 text-white flex items-center justify-center font-bold text-xs">3</div>
                  <div>
                    <span className="font-bold text-white block">Professional Response</span>
                    <span className="text-[11px] text-white/60">Artisan response & remediation proposal.</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 opacity-50">
                  <div className="w-6 h-6 rounded-full bg-white/10 text-white flex items-center justify-center font-bold text-xs">4</div>
                  <div>
                    <span className="font-bold text-white block">Resolution</span>
                    <span className="text-[11px] text-white/60">Escrow adjustment or corrective service.</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition"
            >
              Close
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
