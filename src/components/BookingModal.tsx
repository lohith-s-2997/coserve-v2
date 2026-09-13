import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Provider } from '../types';
import { useApp } from '../context/AppContext';
import {
  X,
  Check,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  MapPin,
  Clock,
} from 'lucide-react';

interface BookingModalProps {
  provider: Provider | null;
  onClose: () => void;
  onSuccess: (bookingId: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ provider, onClose, onSuccess }) => {
  const { customer, createBooking, selectedLocalityFilter } = useApp();

  const [selectedService, setSelectedService] = useState<string>(
    provider?.specializations[0] || 'AC General Service'
  );
  const [scheduledTime, setScheduledTime] = useState<string>('Tomorrow — 10:30 AM');
  const [location, setLocation] = useState<string>(
    selectedLocalityFilter !== 'All Localities' ? selectedLocalityFilter : customer.locality
  );
  const [addressLine, setAddressLine] = useState<string>(customer.address);
  const [phone, setPhone] = useState<string>(customer.phone);
  const [customerNotes, setCustomerNotes] = useState<string>(
    'AC cooling diminished, outdoor unit requires thorough jet sanitization.'
  );

  if (!provider) return null;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking = createBooking({
      provider,
      serviceName: selectedService,
      scheduledTime,
      location: `${location} (${addressLine})`,
      price: provider.startingPrice,
      notes: customerNotes,
    });
    onSuccess(newBooking.id);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto font-mono-code">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col bg-[#0A0A0A] border border-white/20 text-[#F5F5F2] shadow-2xl my-8 z-10"
        >
          {/* Header */}
          <div className="bg-[#121212] border-b border-white/10 px-6 sm:px-8 py-5 flex items-center justify-between">
            <div>
              <div className="text-[10px] text-[#CCFF00] font-bold uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" />
                <span>DIRECT COOPERATIVE DISPATCH REQUEST</span>
              </div>
              <h2 className="text-2xl font-black font-display uppercase tracking-tight text-white mt-1">
                {provider.businessName}
              </h2>
              <div className="text-xs text-white/60 font-sans mt-0.5">
                Direct Doorstep Request from <span className="text-white font-bold">{customer.name}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-white/60 hover:text-white border border-white/15 hover:border-white transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleBookingSubmit} className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
            {/* Provider summary strip */}
            <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 text-xs">
              <div>
                <div className="font-bold text-white uppercase">{provider.businessName}</div>
                <div className="text-white/60 text-[11px] mt-0.5">
                  Lead Pro: {provider.professionalName} • {provider.location} ({provider.distanceKm} km away)
                </div>
              </div>
              <div className="text-right">
                <div className="text-[9px] uppercase text-white/40">DIRECT TARIFF</div>
                <div className="text-xl font-bold font-display text-[#CCFF00]">₹{provider.startingPrice}</div>
              </div>
            </div>

            {/* Service Selection */}
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider text-white/80 font-bold block">
                Select Service Required
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {provider.specializations.map((spec) => (
                  <button
                    type="button"
                    key={spec}
                    onClick={() => setSelectedService(spec)}
                    className={`p-3 text-left text-xs border transition flex items-center justify-between ${
                      selectedService === spec
                        ? 'bg-[#CCFF00] text-[#0A0A0A] font-bold border-[#CCFF00]'
                        : 'bg-white/5 text-white/80 border-white/10 hover:border-white/30'
                    }`}
                  >
                    <span>{spec}</span>
                    {selectedService === spec && <Check className="w-3.5 h-3.5 text-[#0A0A0A]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Preferred Time & Locality */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-white/70 block">
                  Preferred Appointment Window
                </label>
                <select
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/15 text-xs text-white uppercase font-bold focus:outline-none focus:border-white"
                >
                  <option value="Today — Within 2 Hours (Urgent)">Today — Within 2 Hours (Urgent)</option>
                  <option value="Today — 04:00 PM">Today — 04:00 PM</option>
                  <option value="Tomorrow — 10:30 AM">Tomorrow — 10:30 AM</option>
                  <option value="Tomorrow — 02:30 PM">Tomorrow — 02:30 PM</option>
                  <option value="Weekend — 11:00 AM">Weekend — 11:00 AM</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-white/70 block">
                  Service Locality Zone
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/15 text-xs text-white uppercase font-bold focus:outline-none focus:border-white"
                />
              </div>
            </div>

            {/* Address & Contact Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-white/70 block">
                  Doorstep Address / Apartment
                </label>
                <input
                  type="text"
                  value={addressLine}
                  onChange={(e) => setAddressLine(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-white/70 block">
                  Direct Phone Number
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-white"
                />
              </div>
            </div>

            {/* Problem description */}
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-white/70 block">
                Diagnosis / Problem Details
              </label>
              <textarea
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-white font-sans"
              />
            </div>

            {/* Escrow Guarantee Notice */}
            <div className="p-4 bg-white/5 border border-white/10 text-xs space-y-1">
              <div className="text-[#CCFF00] font-bold uppercase text-[10px]">
                100% DIRECT ESCROW SETTLEMENT
              </div>
              <div className="text-white/70 text-[11px] font-sans">
                Payment of ₹{provider.startingPrice} is held in secure municipal escrow until you verify completion with
                the craftsman via one-time PIN. Zero platform commission deducted.
              </div>
            </div>

            {/* Submit CTA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-xs uppercase tracking-wider text-white/60 hover:text-white text-center"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-[#CCFF00] hover:bg-[#D4FF00] text-[#0A0A0A] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg"
              >
                <span>Confirm Direct Dispatch</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
