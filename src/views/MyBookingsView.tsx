import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { BookingLifecycle } from '../components/BookingLifecycle';
import {
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Users,
  FileText,
  Star,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Coins,
  CreditCard,
  UserCheck,
} from 'lucide-react';
import { Booking } from '../types';

export const MyBookingsView: React.FC = () => {
  const {
    bookings,
    customer,
    navigate,
    setRole,
    setPaymentModalBooking,
    setInvoiceModalBooking,
    setRatingModalBooking,
    setDisputeModalBooking,
    setReplacementModalBooking,
    addToTrustedNetwork,
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'completed' | 'disputes'>('all');

  const filteredBookings = bookings.filter((b) => {
    if (activeFilter === 'active') return b.status !== 'Completed';
    if (activeFilter === 'completed') return b.status === 'Completed';
    if (activeFilter === 'disputes') return !!b.disputeCase;
    return true;
  });

  const completedCount = bookings.filter((b) => b.paymentStatus === 'Paid').length;
  const totalReinvestedInCommunity = completedCount * 10;

  return (
    <div className="w-full bg-[#F5F5F2] text-[#0A0A0A] font-mono-code min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-black/15">
          <div>
            <div className="text-black/50 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <span>[ ESCROW ORDER RECORD ]</span>
              <span>•</span>
              <span>CUSTOMER: {customer.name}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black font-display text-black uppercase tracking-tight mt-2">
              MY SERVICE BOOKINGS.
            </h1>
            <p className="text-xs text-black/60 font-sans mt-1">
              Verifiable service history, protected escrow payments, and human dispute assistance.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/network')}
              className="px-5 py-3 border border-black/20 hover:bg-black/5 text-black text-xs font-bold uppercase tracking-wider transition flex items-center gap-2"
            >
              <Users className="w-4 h-4" />
              <span>Trusted Network</span>
            </button>

            <button
              onClick={() => navigate('/services')}
              className="px-6 py-3 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-[#CCFF00]" />
              <span>Book A Pro</span>
            </button>
          </div>
        </div>

        {/* FILTER BAR & SUMMARY CHIPS */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {(['all', 'active', 'completed', 'disputes'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition border ${
                  activeFilter === tab
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black/70 border-black/15 hover:border-black'
                }`}
              >
                {tab === 'all' && `All (${bookings.length})`}
                {tab === 'active' && 'Active'}
                {tab === 'completed' && 'Completed & Paid'}
                {tab === 'disputes' && 'Disputes'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs font-mono-code text-black/60">
            <Coins className="w-4 h-4 text-black" />
            <span>Community Reinvested: <strong className="text-black">₹{totalReinvestedInCommunity}</strong></span>
          </div>
        </div>

        {/* Bookings Stream */}
        {filteredBookings.length > 0 ? (
          <div className="space-y-6">
            {filteredBookings.map((booking) => {
              const isRepeat = booking.isRepeatBooking;
              const servicePrice = booking.price || 500;
              const bookingFee = isRepeat ? 10 : (booking.protectedBookingFee || 25);
              const totalAmount = servicePrice + bookingFee;
              const isPaid = booking.paymentStatus === 'Paid';
              const isCompleted = booking.status === 'Completed';

              return (
                <div
                  key={booking.id}
                  className="bg-white border border-black/15 shadow-xs overflow-hidden"
                >
                  {/* Booking Top Info Strip */}
                  <div className="p-6 bg-black/5 border-b border-black/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-[10px] uppercase font-bold text-black/40">
                          ORDER #{booking.id} • {booking.serviceName}
                        </span>

                        {/* PROTECTED BOOKING BADGE */}
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-black text-white text-[9px] font-bold uppercase tracking-wider">
                          <ShieldCheck className="w-3 h-3 text-[#CCFF00]" />
                          <span>PROTECTED BOOKING</span>
                        </span>

                        {isRepeat && (
                          <span className="px-2 py-0.5 bg-[#CCFF00] text-black text-[9px] font-black uppercase">
                            REPEAT PRO (₹10 FEE)
                          </span>
                        )}
                      </div>

                      <div className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight text-black mt-0.5">
                        {booking.businessName}
                      </div>
                      <div className="text-xs text-black/60 font-sans mt-0.5">
                        Lead Master: <span className="font-bold text-black">{booking.providerName}</span> • Anna Nagar Ward 102 Cooperative
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-[10px] text-black/40 uppercase">TARIFF + FEE</div>
                        <div className="text-2xl font-black font-display text-black">
                          ₹{servicePrice} <span className="text-xs font-normal text-black/50">+ ₹{bookingFee}</span>
                        </div>
                      </div>

                      <div
                        className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${
                          isPaid
                            ? 'bg-[#CCFF00] text-black'
                            : isCompleted
                            ? 'bg-amber-400 text-black animate-pulse'
                            : 'bg-black text-white'
                        }`}
                      >
                        {isPaid ? 'PAID • ESCROW SETTLED' : booking.status}
                      </div>
                    </div>
                  </div>

                  {/* Animated Journey Component */}
                  <div className="p-6">
                    <BookingLifecycle
                      status={booking.status}
                      timeline={booking.timeline}
                      workerName={booking.providerName}
                      price={booking.price}
                    />
                  </div>

                  {/* ACTION SECTION 1: UNPAID COMPLETED SERVICE (THE HERO PAYMENT HOOK) */}
                  {isCompleted && !isPaid && (
                    <div className="p-6 bg-[#0A0A0A] text-white border-t border-black space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="text-[#CCFF00] text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-[#CCFF00]" />
                            <span>SERVICE COMPLETED • AWAITING PROTECTED PAYMENT</span>
                          </div>
                          <h4 className="text-lg font-black font-display uppercase tracking-tight text-white">
                            SETTLE DIRECT TARIFF (₹{totalAmount})
                          </h4>
                          <p className="text-xs text-white/70 font-sans">
                            ₹{servicePrice} goes directly to {booking.providerName}, ₹{bookingFee} platform fee covers warranty and deposits ₹10 into Community Pool.
                          </p>
                        </div>

                        <button
                          onClick={() => setPaymentModalBooking(booking)}
                          className="px-6 py-3.5 bg-[#CCFF00] hover:bg-[#D4FF00] text-black text-xs font-black uppercase tracking-wider transition flex items-center gap-2 shrink-0 shadow-lg"
                        >
                          <CreditCard className="w-4 h-4" />
                          <span>COMPLETE PROTECTED PAYMENT (₹{totalAmount})</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ACTION SECTION 2: PAID SERVICE (INVOICE, RATING, REPEAT NETWORK) */}
                  {isPaid && (
                    <div className="p-6 bg-black/5 border-t border-black/10 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-3">
                          {/* Invoice Button */}
                          <button
                            onClick={() => setInvoiceModalBooking(booking)}
                            className="px-4 py-2 bg-white hover:bg-black hover:text-white text-black border border-black/20 text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5"
                          >
                            <FileText className="w-3.5 h-3.5 text-black" />
                            <span>Digital Invoice</span>
                          </button>

                          {/* Rating Button or Stars */}
                          {booking.rating ? (
                            <div className="flex items-center gap-1.5 px-3 py-2 bg-white border border-black/20 text-xs font-bold text-black">
                              <Star className="w-3.5 h-3.5 fill-black text-black" />
                              <span>Rated {booking.rating.stars}★ ({booking.rating.tags.slice(0, 2).join(', ')})</span>
                            </div>
                          ) : (
                            <button
                              onClick={() => setRatingModalBooking(booking)}
                              className="px-4 py-2 bg-white hover:bg-black hover:text-white text-black border border-black/20 text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5"
                            >
                              <Star className="w-3.5 h-3.5 text-black" />
                              <span>Rate Pro</span>
                            </button>
                          )}

                          {/* Add to Trusted Network Button */}
                          {booking.inTrustedNetwork ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-2 bg-black text-white text-xs font-bold uppercase">
                              <UserCheck className="w-3.5 h-3.5 text-[#CCFF00]" />
                              <span>In My Trusted Network</span>
                            </span>
                          ) : (
                            <button
                              onClick={() => addToTrustedNetwork(booking)}
                              className="px-4 py-2 bg-black hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 shadow-xs"
                            >
                              <Users className="w-3.5 h-3.5 text-[#CCFF00]" />
                              <span>Add to Trusted Network</span>
                            </button>
                          )}
                        </div>

                        {/* Dispute / Issue Trigger */}
                        <button
                          onClick={() => setDisputeModalBooking(booking)}
                          className="text-xs text-black/50 hover:text-black font-bold uppercase tracking-wider flex items-center gap-1 underline"
                        >
                          <AlertTriangle className="w-3 h-3 text-black/50" />
                          <span>{booking.disputeCase ? 'View Dispute Status' : 'Need Dispute Assistance?'}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ACTIVE SERVICE CONTROLS: REPLACEMENT / ASSISTANCE */}
                  {!isCompleted && (
                    <div className="px-6 py-3 bg-white border-t border-black/10 flex flex-wrap items-center justify-between gap-4 text-xs">
                      <div className="flex items-center gap-2 text-black/60 font-sans">
                        <ShieldCheck className="w-4 h-4 text-black" />
                        <span>Protected by Anna Nagar Ward 102 Cooperative Safety Net.</span>
                      </div>

                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setDisputeModalBooking(booking)}
                          className="text-black/60 hover:text-black font-bold uppercase tracking-wider flex items-center gap-1 underline"
                        >
                          <AlertTriangle className="w-3 h-3 text-black/60" />
                          <span>{booking.disputeCase ? 'View Dispute Status' : 'Report Issue / Dispute'}</span>
                        </button>

                        <button
                          onClick={() => setReplacementModalBooking(booking)}
                          className="text-black/70 hover:text-black font-bold uppercase tracking-wider flex items-center gap-1 underline"
                        >
                          <RotateCcw className="w-3 h-3 text-black" />
                          <span>Delay / Replacement Support</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Booking Context Metadata Footer */}
                  <div className="px-6 py-3 bg-black/5 border-t border-black/10 flex flex-wrap items-center justify-between gap-4 text-[11px] text-black/60">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-black" />
                      <span>{booking.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-black" />
                      <span>Scheduled: {booking.scheduledTime}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-16 bg-white border border-black/15 text-center space-y-4">
            <div className="text-3xl font-black font-display uppercase text-black">
              NO BOOKINGS IN THIS VIEW
            </div>
            <p className="text-xs text-black/60 max-w-sm mx-auto font-sans">
              You have no records matching the selected filter. Explore nearby tradespeople in the directory to request direct service.
            </p>
            <button
              onClick={() => {
                setActiveFilter('all');
                navigate('/services');
              }}
              className="px-6 py-3 bg-black text-white text-xs font-bold uppercase tracking-wider"
            >
              Explore Services
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
