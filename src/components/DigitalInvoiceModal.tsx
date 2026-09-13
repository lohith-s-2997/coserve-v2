import React from 'react';
import { motion } from 'motion/react';
import { Booking } from '../types';
import {
  FileText,
  Printer,
  X,
  ShieldCheck,
  CheckCircle2,
  Building2,
  UserCheck,
  Coins,
} from 'lucide-react';

interface DigitalInvoiceModalProps {
  booking: Booking;
  onClose: () => void;
}

export const DigitalInvoiceModal: React.FC<DigitalInvoiceModalProps> = ({
  booking,
  onClose,
}) => {
  const isRepeat = booking.isRepeatBooking;
  const servicePrice = booking.price || 500;
  const bookingFee = isRepeat ? 10 : (booking.protectedBookingFee || 25);
  const totalPaid = servicePrice + bookingFee;
  const workerEarnings = servicePrice;
  const coserveOps = isRepeat ? 5 : 15;
  const communityGrowth = isRepeat ? 5 : 10;
  const invoiceNumber = booking.paymentBreakdown?.invoiceId || 'CS-INV-1042';
  const paymentDate = booking.paymentBreakdown?.paidAt || 'Today, Recorded';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto print:p-0 print:bg-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white text-[#0A0A0A] border border-black/20 shadow-2xl p-4 sm:p-8 md:p-10 font-mono-code my-8 print:border-none print:shadow-none print:p-0"
      >
        {/* Close Button (hidden during print) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 text-black/40 hover:text-black hover:bg-black/5 transition print:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Invoice Top Header */}
        <div className="border-b-2 border-black pb-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-black/60">
                <ShieldCheck className="w-4 h-4 text-black" />
                <span>COSERVE FAIR EXCHANGE PROTOCOL</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black font-display uppercase tracking-tight text-black mt-1">
                DIGITAL TAX INVOICE
              </h1>
            </div>

            <div className="text-left sm:text-right">
              <span className="inline-block px-3 py-1 bg-black text-white text-[11px] font-bold uppercase tracking-wider mb-1">
                STATUS: PAID • ESCROW SETTLED
              </span>
              <div className="text-xs text-black/60 font-bold">INVOICE #{invoiceNumber}</div>
              <div className="text-[11px] text-black/50">{paymentDate}</div>
            </div>
          </div>
        </div>

        {/* Billed To & Service Provider Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-black/15 text-xs">
          <div>
            <div className="text-[10px] uppercase font-bold text-black/40 tracking-wider mb-1">
              CUSTOMER (BILLED TO)
            </div>
            <div className="font-bold text-black text-sm">{booking.customerName || 'Arun Kumar'}</div>
            <div className="text-black/70 font-sans mt-0.5">
              Flat 3B, Sunshine Apts, 2nd Avenue, Anna Nagar
            </div>
            <div className="text-black/70 font-sans">Chennai, TN 600040</div>
            <div className="text-black/50 mt-1">Ph: {booking.customerPhone || '+91 98401 23891'}</div>
          </div>

          <div>
            <div className="text-[10px] uppercase font-bold text-black/40 tracking-wider mb-1">
              SERVICE PROFESSIONAL
            </div>
            <div className="font-bold text-black text-sm">{booking.businessName || 'Arjun AC Services'}</div>
            <div className="text-black/70 font-sans mt-0.5">
              Lead Master: {booking.providerName || 'Arjun Raj'}
            </div>
            <div className="text-black/70 font-sans">
              Anna Nagar Ward 102 Service Cooperative Guild
            </div>
            <div className="text-black/50 mt-1">Verified Member ID: CS-PRO-102-884</div>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="py-6 border-b border-black/15">
          <div className="overflow-x-auto -mx-2 sm:mx-0 px-2 sm:px-0">
            <table className="w-full text-xs text-left min-w-[280px]">
              <thead>
                <tr className="border-b border-black/20 text-[10px] uppercase font-bold text-black/60 pb-2">
                  <th className="py-2">Description</th>
                  <th className="py-2 text-center">Type</th>
                  <th className="py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10">
                <tr>
                  <td className="py-3 pr-2">
                    <div className="font-bold text-black">{booking.serviceName || 'AC General Service'}</div>
                    <div className="text-[11px] text-black/60 font-sans">
                      Complete indoor coil wash, outdoor compressor inspection, filter sanitization.
                    </div>
                  </td>
                  <td className="py-3 text-center text-black/60 whitespace-nowrap px-2">Base Tariff</td>
                  <td className="py-3 text-right font-bold text-black whitespace-nowrap">₹{servicePrice.toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="py-3 pr-2">
                    <div className="font-bold text-black">
                      {isRepeat ? 'Repeat Customer Protection Fee' : 'CoServe Protected Booking Fee'}
                    </div>
                    <div className="text-[11px] text-black/60 font-sans">
                      {isRepeat
                        ? 'Discounted repeat fee for trusted relationship.'
                        : 'Escrow custody, digital invoice, dispute assistance & community pool.'}
                    </div>
                  </td>
                  <td className="py-3 text-center text-black/60 whitespace-nowrap px-2">Platform Fee</td>
                  <td className="py-3 text-right font-bold text-black whitespace-nowrap">₹{bookingFee.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Total Amount Due */}
          <div className="flex justify-between items-baseline pt-4 border-t-2 border-black mt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-black">
              TOTAL SETTLED (INR)
            </span>
            <span className="text-2xl sm:text-3xl font-black font-display text-black">
              ₹{totalPaid.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Transparent Fund Disbursement Notice (The CoServe Difference) */}
        <div className="p-4 bg-black/5 border border-black/10 my-6 text-xs space-y-2">
          <div className="text-[10px] uppercase font-bold text-black/60 tracking-wider flex items-center gap-1.5">
            <Coins className="w-3.5 h-3.5 text-black" />
            <span>TRANSPARENT VALUE ALLOCATION DISCLOSURE</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-center">
            <div className="p-2 bg-white border border-black/10">
              <span className="text-[10px] text-black/50 uppercase block">Artisan Cut</span>
              <span className="font-bold text-black text-sm">₹{workerEarnings} (100%)</span>
            </div>
            <div className="p-2 bg-white border border-black/10">
              <span className="text-[10px] text-black/50 uppercase block">Operations</span>
              <span className="font-bold text-black text-sm">₹{coserveOps}</span>
            </div>
            <div className="p-2 bg-white border border-black/10">
              <span className="text-[10px] text-black/50 uppercase block">Co-op Pool</span>
              <span className="font-bold text-black text-sm">₹{communityGrowth}</span>
            </div>
          </div>
          <p className="text-[10px] text-black/60 font-sans italic text-center pt-1">
            *Unlike traditional marketplaces that deduct 20–30% commissions, 100% of the service tariff was transferred directly to the artisan.
          </p>
        </div>

        {/* Footer & Disclaimer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-black/15 text-[11px] text-black/50">
          <div>
            <div>Verification Hash: <span className="font-bold text-black">0x7F4A...B91E</span></div>
            <div>Cooperative service record. Issued by CoServe Cooperative OS.</div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 print:hidden">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-black/20 hover:bg-black/5 text-black text-xs font-bold uppercase tracking-wider transition text-center"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
