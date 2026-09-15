import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { INITIAL_PROVIDERS } from '../data/providers';
import {
  X,
  Check,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Wrench,
  Zap,
  Droplets,
  MapPin,
  Clock,
  ArrowLeft,
  Award,
  Scale,
  RotateCcw,
} from 'lucide-react';
import {
  FAIRMATCH_BOOKING_CATEGORIES,
  evaluateFairMatchCandidates,
  getProviderForBookingCandidate,
  FairMatchBookingCandidate,
  BookingServiceJob,
} from '../data/fairMatchBookingData';
import { CompactFairMatchAnimation } from './fairmatch/CompactFairMatchAnimation';
import { TestBookingFairMatchResults } from './fairmatch/TestBookingFairMatchResults';
import { Provider } from '../types';

interface TestBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type BookingMode = 'manual' | 'fairmatch';

export const TestBookingModal: React.FC<TestBookingModalProps> = ({ isOpen, onClose }) => {
  const { customer, createBooking, setRole, setActiveWorkerId, navigate } = useApp();

  // Mode Selection State
  const [bookingMode, setBookingMode] = useState<BookingMode>('manual');
  const [hasChosenInitialMode, setHasChosenInitialMode] = useState<boolean>(false);

  // Step state machine
  const [step, setStep] = useState<
    | 'select-worker'
    | 'select-service'
    | 'fairmatch-select-service'
    | 'fairmatch-animating'
    | 'fairmatch-results'
    | 'details'
    | 'success'
  >('select-worker');

  // Manual & Provider Selection State
  const [selectedWorkerId, setSelectedWorkerId] = useState<string>('prov-arjun-ac');
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<'ac' | 'electrical' | 'plumbing'>('ac');
  const [selectedService, setSelectedService] = useState<{ name: string; price: number }>({
    name: 'AC General Service',
    price: 500,
  });

  // FairMatch Specific State
  const [fairMatchCandidates, setFairMatchCandidates] = useState<FairMatchBookingCandidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<FairMatchBookingCandidate | null>(null);

  // Booking Form Inputs
  const [scheduledTime, setScheduledTime] = useState<string>('Tomorrow — 10:30 AM');
  const [location, setLocation] = useState<string>(customer.locality);
  const [addressLine, setAddressLine] = useState<string>(customer.address);
  const [phone, setPhone] = useState<string>(customer.phone);
  const [notes, setNotes] = useState<string>('Direct test booking via CoServe Demo Protocol.');
  const [createdBookingId, setCreatedBookingId] = useState<string>('');

  // Primary 3 demo professionals config (Permanent demo foundation)
  const workersConfig = [
    {
      id: 'prov-arjun-ac',
      workerKey: 'arjun' as const,
      name: 'Arjun Raj',
      business: 'Arjun AC Services',
      trade: 'AC Technician',
      icon: Wrench,
      categoryKey: 'ac' as const,
      accentColor: '#CCFF00',
      services: [
        { name: 'AC General Service', price: 500 },
        { name: 'AC Not Cooling', price: 600 },
        { name: 'AC Maintenance', price: 550 },
      ],
      bio: 'Independent HVAC specialist and cooperative member.',
      distance: '1.1 km away • Anna Nagar',
    },
    {
      id: 'prov-ravi-elec',
      workerKey: 'ravi' as const,
      name: 'Ravi Kumar',
      business: 'Ravi Electrical Services',
      trade: 'Electrician',
      icon: Zap,
      categoryKey: 'electrical' as const,
      accentColor: '#CCFF00',
      services: [
        { name: 'Fan Installation', price: 400 },
        { name: 'Electrical Repair', price: 350 },
        { name: 'Socket Replacement', price: 300 },
      ],
      bio: 'Certified wireman and neighborhood electrical contractor.',
      distance: '1.4 km away • T. Nagar',
    },
    {
      id: 'prov-kumar-plumb',
      workerKey: 'kumar' as const,
      name: 'Kumar',
      business: 'Kumar Plumbing Services',
      trade: 'Plumber',
      icon: Droplets,
      categoryKey: 'plumbing' as const,
      accentColor: '#CCFF00',
      services: [
        { name: 'Tap Leakage Repair', price: 300 },
        { name: 'Bathroom Pipe Repair', price: 450 },
        { name: 'Kitchen Sink Repair', price: 400 },
      ],
      bio: 'Expert pipeline and sanitary fixture master.',
      distance: '1.6 km away • Adyar',
    },
  ];

  // Resolve active manual worker
  const currentWorkerConfig = workersConfig.find((w) => w.id === selectedWorkerId) || workersConfig[0];

  // Resolve provider object for booking
  const resolvedProviderObject: Provider = selectedCandidate
    ? getProviderForBookingCandidate(selectedCandidate, selectedCategoryKey)
    : INITIAL_PROVIDERS.find((p) => p.id === selectedWorkerId) || INITIAL_PROVIDERS[0];

  // Reset modal state on open
  useEffect(() => {
    if (isOpen) {
      // Set sensible defaults
      setLocation(customer.locality || 'Anna Nagar');
      setAddressLine(customer.address || 'Door 14, 2nd Main Road');
      setPhone(customer.phone || '98401 23456');
    }
  }, [isOpen, customer]);

  if (!isOpen) return null;

  // Mode switcher handler
  const handleSwitchMode = (newMode: BookingMode) => {
    setBookingMode(newMode);
    setHasChosenInitialMode(true);

    if (newMode === 'manual') {
      // Map category to worker
      if (selectedCategoryKey === 'electrical') {
        setSelectedWorkerId('prov-ravi-elec');
      } else if (selectedCategoryKey === 'plumbing') {
        setSelectedWorkerId('prov-kumar-plumb');
      } else {
        setSelectedWorkerId('prov-arjun-ac');
      }
      setSelectedCandidate(null);
      if (step !== 'details' && step !== 'success') {
        setStep('select-service');
      }
    } else {
      // FairMatch mode
      if (step !== 'details' && step !== 'success') {
        setStep('fairmatch-select-service');
      }
    }
  };

  // Manual Flow Handlers
  const handleWorkerSelect = (workerId: string) => {
    setSelectedWorkerId(workerId);
    setSelectedCandidate(null);
    const wc = workersConfig.find((w) => w.id === workerId);
    if (wc) {
      setSelectedCategoryKey(wc.categoryKey);
      if (wc.services.length > 0) {
        setSelectedService(wc.services[0]);
      }
    }
    setStep('select-service');
  };

  const handleManualServiceSelect = (service: { name: string; price: number }) => {
    setSelectedService(service);
    setSelectedCandidate(null);
    setStep('details');
  };

  // FairMatch Flow Handlers
  const handleFairMatchJobSelect = (categoryId: 'ac' | 'electrical' | 'plumbing', job: BookingServiceJob) => {
    setSelectedCategoryKey(categoryId);
    setSelectedService({ name: job.name, price: job.price });

    // Map to default matching worker in case of switching
    if (categoryId === 'ac') setSelectedWorkerId('prov-arjun-ac');
    if (categoryId === 'electrical') setSelectedWorkerId('prov-ravi-elec');
    if (categoryId === 'plumbing') setSelectedWorkerId('prov-kumar-plumb');

    // Run deterministic ranking
    const ranked = evaluateFairMatchCandidates(categoryId, job.name);
    setFairMatchCandidates(ranked);

    // Start compact FairMatch animation
    setStep('fairmatch-animating');
  };

  const handleFairMatchAnimationComplete = () => {
    setStep('fairmatch-results');
  };

  const handleFairMatchCandidateSelect = (candidate: FairMatchBookingCandidate) => {
    setSelectedCandidate(candidate);
    setSelectedWorkerId(candidate.id);
    setStep('details');
  };

  // Submit Final Booking (Unified createBooking call)
  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();

    const newBooking = createBooking({
      provider: resolvedProviderObject,
      serviceName: selectedService.name,
      scheduledTime,
      location: `${location} (${addressLine})`,
      price: selectedService.price,
      notes,
    });

    setCreatedBookingId(newBooking.id);
    setStep('success');
  };

  // Worker Dashboard Navigation
  const handleGoToWorkerDashboard = () => {
    const targetKey =
      selectedCandidate?.workerKey ||
      currentWorkerConfig.workerKey ||
      (selectedCategoryKey === 'electrical' ? 'ravi' : selectedCategoryKey === 'plumbing' ? 'kumar' : 'arjun');

    setActiveWorkerId(targetKey);
    setRole('worker');
    onClose();
    navigate('/worker');
  };

  const handleGoToMyBookings = () => {
    onClose();
    navigate('/bookings');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto font-mono-code">
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
          className="relative w-full max-w-3xl max-h-[94vh] overflow-hidden flex flex-col bg-[#0A0A0A] border border-white/20 text-[#F5F5F2] shadow-2xl my-6 z-10"
        >
          {/* Top Bar Header */}
          <div className="bg-[#121212] border-b border-white/10 px-5 sm:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
            <div>
              <div className="text-[10px] text-[#CCFF00] font-bold uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
                <span>TEST BOOKING PROTOCOL • DEMO DISPATCH</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight text-white mt-0.5">
                {step === 'select-worker' && '1. Choose Professional'}
                {step === 'select-service' && `2. Choose Job (${currentWorkerConfig.business})`}
                {step === 'fairmatch-select-service' && '1. Select Service for FairMatch'}
                {step === 'fairmatch-animating' && '2. Calculating FairMatch Engine'}
                {step === 'fairmatch-results' && '3. Top FairMatch Professionals'}
                {step === 'details' && 'Schedule & Direct Escrow'}
                {step === 'success' && 'Booking Dispatched Successfully'}
              </h2>
            </div>

            {/* Persistent Compact Tab Switcher (Visible before final success) */}
            {step !== 'success' && (
              <div className="flex items-center gap-2 self-start sm:self-center">
                <div className="flex items-center bg-white/10 p-1 border border-white/15">
                  <button
                    type="button"
                    onClick={() => handleSwitchMode('manual')}
                    className={`px-3 py-1.5 text-[11px] uppercase font-bold tracking-wider transition ${
                      bookingMode === 'manual'
                        ? 'bg-white text-black font-black'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Choose Professional
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSwitchMode('fairmatch')}
                    className={`px-3 py-1.5 text-[11px] uppercase font-bold tracking-wider flex items-center gap-1.5 transition ${
                      bookingMode === 'fairmatch'
                        ? 'bg-[#CCFF00] text-black font-black'
                        : 'text-[#CCFF00] hover:bg-[#CCFF00]/10'
                    }`}
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>✦ FairMatch</span>
                  </button>
                </div>

                <button
                  onClick={onClose}
                  className="p-1.5 text-white/60 hover:text-white border border-white/15 hover:border-white transition"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Modal Body Container */}
          <div className="p-5 sm:p-8 space-y-6 overflow-y-auto flex-1 max-h-[78vh]">
            {/* INITIAL CHOICE BANNER (If not yet acknowledged) */}
            {!hasChosenInitialMode && step !== 'details' && step !== 'success' && (
              <div className="bg-[#141414] border-2 border-[#CCFF00]/60 p-5 sm:p-6 space-y-4">
                <div className="space-y-1">
                  <div className="text-[10px] text-[#CCFF00] uppercase font-bold tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>DISCOVERY PROTOCOL</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black font-display uppercase tracking-tight text-white">
                    HOW WOULD YOU LIKE TO FIND A PROFESSIONAL?
                  </h3>
                  <p className="text-xs text-white/70 font-sans">
                    Let FairMatch rank suitable professionals using skill, proximity, availability, reliability, workload and opportunity fairness.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setHasChosenInitialMode(true);
                      setBookingMode('manual');
                      setStep('select-worker');
                    }}
                    className="p-4 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white text-left transition flex items-center justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="text-xs font-black font-display uppercase tracking-wider text-white group-hover:text-[#CCFF00]">
                        CHOOSE PROFESSIONAL
                      </div>
                      <div className="text-[11px] text-white/60 font-sans mt-0.5">
                        Direct manual selection from our 3 primary verified workers.
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/60 group-hover:text-white shrink-0 ml-2" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setHasChosenInitialMode(true);
                      setBookingMode('fairmatch');
                      setStep('fairmatch-select-service');
                    }}
                    className="p-4 bg-[#CCFF00] hover:bg-[#D4FF00] text-black border border-[#CCFF00] text-left transition flex items-center justify-between group cursor-pointer shadow-md"
                  >
                    <div>
                      <div className="text-xs font-black font-display uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>✦ USE FAIRMATCH</span>
                      </div>
                      <div className="text-[11px] text-black/80 font-sans mt-0.5">
                        Explainable weighted matching across 6 ethical criteria.
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-black shrink-0 ml-2" />
                  </button>
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* OPTION 1: MANUAL SELECTION FLOW                         */}
            {/* ======================================================== */}

            {/* MANUAL STEP 1: SELECT WORKER */}
            {bookingMode === 'manual' && step === 'select-worker' && (
              <div className="space-y-4">
                <p className="text-xs text-white/70 font-sans">
                  Select one of the three verified neighbourhood professionals connected to the demo workflow. Every booking will appear instantly in their respective worker dashboard.
                </p>

                <div className="grid grid-cols-1 gap-3 pt-1">
                  {workersConfig.map((w) => {
                    const IconComp = w.icon;
                    const isSelected = selectedWorkerId === w.id;
                    return (
                      <div
                        key={w.id}
                        onClick={() => handleWorkerSelect(w.id)}
                        className={`p-4 sm:p-5 border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#1a1a1a] border-[#CCFF00] shadow-md'
                            : 'bg-white/5 border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-white/10 border border-white/20 flex items-center justify-center shrink-0 text-[#CCFF00]">
                            <IconComp className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs uppercase tracking-wider text-[#CCFF00] font-bold">
                                {w.trade}
                              </span>
                              <span className="text-white/30">•</span>
                              <span className="text-xs text-white/60">{w.distance}</span>
                            </div>
                            <div className="text-lg font-black font-display text-white uppercase mt-0.5">
                              {w.business}
                            </div>
                            <div className="text-xs text-white/60 font-sans mt-0.5">
                              Professional: <span className="text-white font-bold">{w.name}</span> • {w.bio}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs font-bold text-[#CCFF00]">3 Jobs</span>
                          <ArrowRight className="w-4 h-4 text-[#CCFF00]" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* MANUAL STEP 2: SELECT JOB FOR WORKER */}
            {bookingMode === 'manual' && step === 'select-service' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <div className="text-xs text-white/50 uppercase">Selected Worker</div>
                    <div className="text-lg font-bold font-display text-white uppercase">
                      {currentWorkerConfig.business} ({currentWorkerConfig.name})
                    </div>
                  </div>
                  <button
                    onClick={() => setStep('select-worker')}
                    className="text-xs text-[#CCFF00] hover:underline flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3 h-3" /> Change Worker
                  </button>
                </div>

                <div className="text-xs uppercase tracking-wider text-white/80 font-bold">
                  Select Specific Job Type:
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {currentWorkerConfig.services.map((srv) => {
                    const isChosen = selectedService.name === srv.name;
                    return (
                      <button
                        key={srv.name}
                        type="button"
                        onClick={() => handleManualServiceSelect(srv)}
                        className={`p-4 text-left border transition flex items-center justify-between ${
                          isChosen
                            ? 'bg-[#CCFF00] text-[#0A0A0A] font-bold border-[#CCFF00]'
                            : 'bg-white/5 text-white border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div>
                          <div className="text-sm uppercase font-black font-display">{srv.name}</div>
                          <div
                            className={`text-xs mt-0.5 font-sans ${
                              isChosen ? 'text-black/80' : 'text-white/60'
                            }`}
                          >
                            Direct neighbourhood tariff with zero middlemen toll.
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] uppercase opacity-60">Tariff</div>
                          <div className="text-lg font-black font-display">₹{srv.price}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* OPTION 2: FAIRMATCH FLOW                                 */}
            {/* ======================================================== */}

            {/* FAIRMATCH STEP 1: SELECT CATEGORY & SMALL JOB */}
            {bookingMode === 'fairmatch' && step === 'fairmatch-select-service' && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <div className="text-[10px] text-[#CCFF00] font-bold uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    <span>WHAT SERVICE DO YOU NEED?</span>
                  </div>
                  <p className="text-xs text-white/70 font-sans">
                    Choose a small job below. FairMatch will evaluate all active local professionals and rank the top 3 matches using transparent, explainable weights.
                  </p>
                </div>

                <div className="space-y-4">
                  {FAIRMATCH_BOOKING_CATEGORIES.map((cat) => (
                    <div key={cat.id} className="bg-white/5 border border-white/10 p-4 sm:p-5 space-y-3">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-base">
                            {cat.id === 'ac' ? '❄' : cat.id === 'electrical' ? '⚡' : '🔧'}
                          </span>
                          <h4 className="text-sm font-black font-display uppercase tracking-wider text-white">
                            {cat.name.toUpperCase()}
                          </h4>
                          <span className="text-[10px] text-[#CCFF00] font-bold uppercase bg-white/5 px-2 py-0.5 border border-white/10">
                            {cat.badge}
                          </span>
                        </div>
                        <span className="text-[10px] text-white/50 uppercase">Select Job Below</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        {cat.jobs.map((job) => (
                          <button
                            key={job.name}
                            type="button"
                            onClick={() => handleFairMatchJobSelect(cat.id, job)}
                            className="p-3 bg-black/40 hover:bg-[#CCFF00]/10 border border-white/10 hover:border-[#CCFF00] text-left transition group cursor-pointer flex flex-col justify-between space-y-2"
                          >
                            <div>
                              <div className="text-xs font-black font-display uppercase text-white group-hover:text-[#CCFF00] transition">
                                {job.name}
                              </div>
                              <div className="text-[10px] text-white/60 font-sans mt-0.5 line-clamp-2">
                                {job.description}
                              </div>
                            </div>
                            <div className="flex items-center justify-between pt-1.5 border-t border-white/10 text-xs">
                              <span className="text-white/40 text-[10px] uppercase">Tariff</span>
                              <span className="text-xs font-bold font-display text-[#CCFF00]">
                                ₹{job.price}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAIRMATCH STEP 2: COMPACT CALCULATION ANIMATION */}
            {bookingMode === 'fairmatch' && step === 'fairmatch-animating' && (
              <CompactFairMatchAnimation
                jobName={selectedService.name}
                categoryName={
                  selectedCategoryKey === 'ac'
                    ? 'AC Services'
                    : selectedCategoryKey === 'electrical'
                    ? 'Electrical Services'
                    : 'Plumbing Services'
                }
                tariff={selectedService.price}
                onComplete={handleFairMatchAnimationComplete}
              />
            )}

            {/* FAIRMATCH STEP 3: TOP 3 RANKED RESULTS */}
            {bookingMode === 'fairmatch' && step === 'fairmatch-results' && (
              <TestBookingFairMatchResults
                candidates={fairMatchCandidates}
                jobName={selectedService.name}
                tariff={selectedService.price}
                onSelectCandidate={handleFairMatchCandidateSelect}
                onChangeJob={() => setStep('fairmatch-select-service')}
                onReplayAnimation={() => setStep('fairmatch-animating')}
              />
            )}

            {/* ======================================================== */}
            {/* STEP 3: DETAILS & DIRECT ESCROW (Shared Final Form)      */}
            {/* ======================================================== */}
            {step === 'details' && (
              <form onSubmit={handleSubmitBooking} className="space-y-6">
                {/* Summary banner */}
                <div className="p-4 bg-white/5 border border-white/10 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[#CCFF00] font-bold uppercase text-sm">
                          {selectedService.name}
                        </span>
                        {selectedCandidate && (
                          <span className="px-2 py-0.5 bg-[#CCFF00] text-black text-[9px] font-black uppercase tracking-wider flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>FairMatch #{selectedCandidate.isWinner ? '1 Best Match' : 'Ranked'} ({selectedCandidate.scores.overall}%)</span>
                          </span>
                        )}
                      </div>
                      <div className="text-white/70 mt-1">
                        Assigned Professional:{' '}
                        <span className="text-white font-bold">
                          {selectedCandidate ? selectedCandidate.business : currentWorkerConfig.business}
                        </span>{' '}
                        ({selectedCandidate ? selectedCandidate.name : currentWorkerConfig.name})
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] text-white/40 uppercase">SERVICE TARIFF</div>
                      <div className="text-xl font-bold font-display text-[#CCFF00]">
                        ₹{selectedService.price}
                      </div>
                    </div>
                  </div>

                  {selectedCandidate && (
                    <div className="pt-2 border-t border-white/10 text-[11px] text-white/60 font-sans">
                      <span className="text-[#CCFF00] font-bold">Why this match: </span>
                      {selectedCandidate.whyMatchSummary}
                    </div>
                  )}
                </div>

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
                      <option value="Tomorrow — 03:00 PM">Tomorrow — 03:00 PM</option>
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

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-white/70 block">
                    Customer Notes / Issue Details
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 bg-white/5 border border-white/15 text-xs text-white focus:outline-none focus:border-white font-sans"
                  />
                </div>

                <div className="p-4 bg-white/5 border border-white/10 text-xs space-y-1">
                  <div className="text-[#CCFF00] font-bold uppercase text-[10px]">
                    PROTECTED ESCROW & COOPERATIVE FEE
                  </div>
                  <div className="text-white/70 text-[11px] font-sans">
                    Total Amount:{' '}
                    <span className="text-white font-bold">
                      ₹{selectedService.price} (Service) + ₹25 (Protected Escrow Fee)
                    </span>
                    . 100% of tariff goes directly to{' '}
                    {selectedCandidate ? selectedCandidate.name : currentWorkerConfig.name}.
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => {
                      if (bookingMode === 'fairmatch') {
                        setStep('fairmatch-results');
                      } else {
                        setStep('select-service');
                      }
                    }}
                    className="px-4 py-2.5 text-xs uppercase tracking-wider text-white/70 hover:text-white flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#CCFF00] hover:bg-[#D4FF00] text-[#0A0A0A] text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition cursor-pointer"
                  >
                    <span>Request Test Booking</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* ======================================================== */}
            {/* STEP 4: SUCCESS DISPATCH                                 */}
            {/* ======================================================== */}
            {step === 'success' && (
              <div className="space-y-6 text-center py-4">
                <div className="w-16 h-16 bg-[#CCFF00] text-[#0A0A0A] rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>

                <div className="space-y-2">
                  <div className="text-xs uppercase tracking-widest text-[#CCFF00] font-bold">
                    BOOKING CREATED SUCCESSFULLY
                  </div>
                  <h3 className="text-3xl font-black font-display uppercase tracking-tight text-white">
                    {createdBookingId}
                  </h3>
                  <p className="text-xs text-white/70 max-w-md mx-auto font-sans">
                    Your test booking has been dispatched to{' '}
                    <span className="text-white font-bold">
                      {selectedCandidate ? selectedCandidate.business : currentWorkerConfig.business}
                    </span>{' '}
                    ({selectedCandidate ? selectedCandidate.name : currentWorkerConfig.name}). It is now ready to be accepted and fulfilled from the worker dashboard.
                  </p>
                </div>

                <div className="p-4 bg-white/5 border border-white/10 text-xs text-left max-w-md mx-auto space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/50">Service:</span>
                    <span className="text-white font-bold">{selectedService.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Worker:</span>
                    <span className="text-white font-bold">
                      {selectedCandidate ? selectedCandidate.name : currentWorkerConfig.name} (
                      {selectedCandidate ? selectedCandidate.trade : currentWorkerConfig.trade})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Tariff:</span>
                    <span className="text-[#CCFF00] font-bold">₹{selectedService.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Method:</span>
                    <span className="text-[#CCFF00] font-bold uppercase">
                      {bookingMode === 'fairmatch' ? '✦ FairMatch Weighted' : 'Manual Selection'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Status:</span>
                    <span className="text-yellow-400 font-bold uppercase">Requested</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                  <button
                    onClick={handleGoToMyBookings}
                    className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                  >
                    View in My Bookings
                  </button>
                  <button
                    onClick={handleGoToWorkerDashboard}
                    className="w-full sm:w-auto px-6 py-3 bg-[#CCFF00] hover:bg-[#D4FF00] text-[#0A0A0A] text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>
                      Test Worker Dashboard (
                      {selectedCandidate ? selectedCandidate.name : currentWorkerConfig.name})
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
