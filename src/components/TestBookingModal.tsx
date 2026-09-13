import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { INITIAL_PROVIDERS } from '../data/providers';
import { X, Check, Sparkles, ArrowRight, ShieldCheck, Wrench, Zap, Droplets, MapPin, Clock, ArrowLeft } from 'lucide-react';

interface TestBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TestBookingModal: React.FC<TestBookingModalProps> = ({ isOpen, onClose }) => {
  const { customer, createBooking, setRole, setActiveWorkerId, navigate } = useApp();

  const [step, setStep] = useState<'select-worker' | 'select-service' | 'details' | 'success'>('select-worker');
  const [selectedWorkerId, setSelectedWorkerId] = useState<string>('prov-arjun-ac');
  const [selectedService, setSelectedService] = useState<{ name: string; price: number }>({
    name: 'AC General Service',
    price: 500,
  });
  const [scheduledTime, setScheduledTime] = useState<string>('Tomorrow — 10:30 AM');
  const [location, setLocation] = useState<string>(customer.locality);
  const [addressLine, setAddressLine] = useState<string>(customer.address);
  const [phone, setPhone] = useState<string>(customer.phone);
  const [notes, setNotes] = useState<string>('Direct test booking via CoServe Demo Protocol.');
  const [createdBookingId, setCreatedBookingId] = useState<string>('');

  if (!isOpen) return null;

  const workersConfig = [
    {
      id: 'prov-arjun-ac',
      workerKey: 'arjun',
      name: 'Arjun Raj',
      business: 'Arjun AC Services',
      trade: 'AC Technician',
      icon: Wrench,
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
      workerKey: 'ravi',
      name: 'Ravi Kumar',
      business: 'Ravi Electrical Services',
      trade: 'Electrician',
      icon: Zap,
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
      workerKey: 'kumar',
      name: 'Kumar P.',
      business: 'Kumar Plumbing Services',
      trade: 'Plumber',
      icon: Droplets,
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

  const currentWorkerConfig = workersConfig.find((w) => w.id === selectedWorkerId) || workersConfig[0];
  const providerObject = INITIAL_PROVIDERS.find((p) => p.id === selectedWorkerId) || INITIAL_PROVIDERS[0];

  const handleWorkerSelect = (workerId: string) => {
    setSelectedWorkerId(workerId);
    const wc = workersConfig.find((w) => w.id === workerId);
    if (wc && wc.services.length > 0) {
      setSelectedService(wc.services[0]);
    }
    setStep('select-service');
  };

  const handleServiceSelect = (service: { name: string; price: number }) => {
    setSelectedService(service);
    setStep('details');
  };

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking = createBooking({
      provider: providerObject,
      serviceName: selectedService.name,
      scheduledTime,
      location: `${location} (${addressLine})`,
      price: selectedService.price,
      notes,
    });
    setCreatedBookingId(newBooking.id);
    setStep('success');
  };

  const handleGoToWorkerDashboard = () => {
    setActiveWorkerId(currentWorkerConfig.workerKey);
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
          className="relative w-full max-w-2xl max-h-[92vh] overflow-hidden flex flex-col bg-[#0A0A0A] border border-white/20 text-[#F5F5F2] shadow-2xl my-8 z-10"
        >
          {/* Header */}
          <div className="bg-[#121212] border-b border-white/10 px-6 sm:px-8 py-5 flex items-center justify-between shrink-0">
            <div>
              <div className="text-[10px] text-[#CCFF00] font-bold uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
                <span>TEST BOOKING DEMO FLOW • THREE VERIFIED WORKERS</span>
              </div>
              <h2 className="text-2xl font-black font-display uppercase tracking-tight text-white mt-1">
                {step === 'select-worker' && '1. Choose Service & Worker'}
                {step === 'select-service' && `2. Choose Job (${currentWorkerConfig.business})`}
                {step === 'details' && '3. Schedule & Direct Escrow'}
                {step === 'success' && '4. Booking Dispatched Successfully'}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-white/60 hover:text-white border border-white/15 hover:border-white transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1 max-h-[75vh]">
            {/* STEP 1: SELECT WORKER */}
            {step === 'select-worker' && (
              <div className="space-y-4">
                <p className="text-xs text-white/70 font-sans">
                  Select one of the three verified neighbourhood professionals connected to the demo workflow. Every booking will appear instantly in their respective worker dashboard.
                </p>

                <div className="grid grid-cols-1 gap-3 pt-2">
                  {workersConfig.map((w) => {
                    const IconComp = w.icon;
                    const isSelected = selectedWorkerId === w.id;
                    return (
                      <div
                        key={w.id}
                        onClick={() => handleWorkerSelect(w.id)}
                        className={`p-5 border transition-all cursor-pointer flex items-center justify-between ${
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

            {/* STEP 2: SELECT SPECIFIC JOB */}
            {step === 'select-service' && (
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
                        onClick={() => handleServiceSelect(srv)}
                        className={`p-4 text-left border transition flex items-center justify-between ${
                          isChosen
                            ? 'bg-[#CCFF00] text-[#0A0A0A] font-bold border-[#CCFF00]'
                            : 'bg-white/5 text-white border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div>
                          <div className="text-sm uppercase font-black font-display">{srv.name}</div>
                          <div className={`text-xs mt-0.5 font-sans ${isChosen ? 'text-black/80' : 'text-white/60'}`}>
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

            {/* STEP 3: DETAILS & ESCROW */}
            {step === 'details' && (
              <form onSubmit={handleSubmitBooking} className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 text-xs">
                  <div>
                    <div className="text-[#CCFF00] font-bold uppercase">{selectedService.name}</div>
                    <div className="text-white/70 mt-0.5">
                      Assigned Professional: <span className="text-white font-bold">{currentWorkerConfig.business}</span> ({currentWorkerConfig.name})
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] text-white/40 uppercase">SERVICE TARIFF</div>
                    <div className="text-xl font-bold font-display text-[#CCFF00]">₹{selectedService.price}</div>
                  </div>
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
                    Total Amount: <span className="text-white font-bold">₹{selectedService.price} (Service) + ₹25 (Protected Escrow Fee)</span>. 100% of tariff goes directly to {currentWorkerConfig.name}.
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setStep('select-service')}
                    className="px-4 py-2.5 text-xs uppercase tracking-wider text-white/70 hover:text-white flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#CCFF00] hover:bg-[#D4FF00] text-[#0A0A0A] text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition"
                  >
                    <span>Request Test Booking</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 4: SUCCESS */}
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
                    Your test booking has been dispatched to <span className="text-white font-bold">{currentWorkerConfig.business}</span> ({currentWorkerConfig.name}). It is now ready to be accepted and fulfilled from the worker dashboard.
                  </p>
                </div>

                <div className="p-4 bg-white/5 border border-white/10 text-xs text-left max-w-md mx-auto space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/50">Service:</span>
                    <span className="text-white font-bold">{selectedService.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Worker:</span>
                    <span className="text-white font-bold">{currentWorkerConfig.name} ({currentWorkerConfig.trade})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Tariff:</span>
                    <span className="text-[#CCFF00] font-bold">₹{selectedService.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Status:</span>
                    <span className="text-yellow-400 font-bold uppercase">Requested</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                  <button
                    onClick={handleGoToMyBookings}
                    className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-wider transition"
                  >
                    View in My Bookings
                  </button>
                  <button
                    onClick={handleGoToWorkerDashboard}
                    className="w-full sm:w-auto px-6 py-3 bg-[#CCFF00] hover:bg-[#D4FF00] text-[#0A0A0A] text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2"
                  >
                    <span>Test Worker Dashboard ({currentWorkerConfig.name})</span>
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
