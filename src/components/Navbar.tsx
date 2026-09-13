import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { LOCALITIES } from '../data/providers';
import {
  MapPin,
  RotateCcw,
  Sparkles,
  Layers,
  ChevronDown,
  ArrowUpRight,
  Menu,
  X,
  Radio,
  Check,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    role,
    setRole,
    activeTab,
    navigate,
    customer,
    worker,
    admin,
    bookings,
    resetDemoData,
    selectedLocalityFilter,
    setSelectedLocalityFilter,
    setIsChooseProfessionalModalOpen,
    setTestBookingModalOpen,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localityDropdownOpen, setLocalityDropdownOpen] = useState(false);
  const [mobileLocalityOpen, setMobileLocalityOpen] = useState(false);
  const [perspectiveNotice, setPerspectiveNotice] = useState<{
    title: string;
    sub: string;
    role: UserRole;
  } | null>(null);

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Active bookings count for customer
  const activeBookingsCount = bookings.filter((b) => b.status !== 'Completed').length;
  // Pending request count for worker
  const pendingRequestsCount = bookings.filter((b) => b.status === 'Requested').length;

  const handleRoleSwitch = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === 'worker') {
      setIsChooseProfessionalModalOpen(true);
      return;
    } else if (newRole === 'admin') {
      navigate('/coop');
      setPerspectiveNotice({
        title: 'COOPERATIVE STEWARD CONSOLE: METRO UNION',
        sub: 'Democratic Governance • Civic Tool Bank • Escrow & FairMatch Oversight',
        role: 'admin',
      });
    } else {
      navigate('/');
      setPerspectiveNotice({
        title: 'HOUSEHOLD CONSOLE: RESIDENTIAL DISCOVERY',
        sub: 'Local Skilled Trades • Direct Booking • Transparent Matching Without Middlemen',
        role: 'customer',
      });
    }

    setTimeout(() => {
      setPerspectiveNotice(null);
    }, 4000);
  };

  const getNavLinks = () => {
    if (role === 'customer') {
      return [
        { id: 'home', label: 'Index', path: '/' },
        { id: 'services', label: 'Find Services', path: '/services' },
        { id: 'my-bookings', label: 'My Bookings', path: '/bookings', badge: activeBookingsCount > 0 ? activeBookingsCount : undefined },
        { id: 'trusted-network', label: 'Trusted Network', path: '/network' },
        { id: 'community-growth-pool', label: 'Growth Pool', path: '/community' },
        { id: 'customer-credits', label: 'Credits', path: '/credits' },
        { id: 'community-demand', label: 'Clusters', path: '/demand' },
        { id: 'cooperative-teams', label: 'Guild Teams', path: '/teams' },
        { id: 'fair-work-distribution', label: 'Fair Dispatch', path: '/fair-work' },
        { id: 'network-loop', label: 'Network Loop', path: '/network-loop' },
      ];
    }
    if (role === 'worker') {
      return [
        { id: 'worker-dashboard', label: 'Worker OS', path: '/worker' },
        { id: 'community-growth-pool', label: 'Treasury Pool', path: '/community' },
        { id: 'community-demand', label: 'Demand Clusters', path: '/demand' },
        { id: 'cooperative-teams', label: 'Guild Teams', path: '/teams' },
        { id: 'fair-work-distribution', label: 'Fair Distribution', path: '/fair-work' },
        { id: 'gig-to-growth', label: 'Gig-to-Growth', path: '/growth' },
        { id: 'network-loop', label: 'Network Loop', path: '/network-loop' },
      ];
    }
    return [
      { id: 'coop-dashboard', label: 'Union Console', path: '/coop' },
      { id: 'community-growth-pool', label: 'Treasury Pool', path: '/community' },
      { id: 'community-demand', label: 'Cluster Zones', path: '/demand' },
      { id: 'cooperative-teams', label: 'Co-op Alliances', path: '/teams' },
      { id: 'fair-work-distribution', label: 'Fair Balancing', path: '/fair-work' },
      { id: 'gig-to-growth', label: 'Artisan Ladder', path: '/growth' },
      { id: 'network-loop', label: 'Network Loop', path: '/network-loop' },
    ];
  };

  const navLinks = getNavLinks();

  return (
    <header className="sticky top-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/10 text-[#F5F5F2]">
      {/* Editorial Telemetry Bar */}
      <div className="border-b border-white/10 px-4 sm:px-8 py-1.5 flex items-center justify-between text-[10px] sm:text-[11px] font-mono-code">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="inline-flex items-center gap-1.5 text-[#CCFF00] font-bold tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" />
            COSERVE OS
          </span>
          <span className="text-white/30 hidden md:inline">/</span>
          <span className="text-white/60 hidden md:inline tracking-tight">
            DECENTRALIZED LOCAL SERVICE NETWORK • COOPERATIVE PLATFORM
          </span>
          <span className="text-white/40 md:hidden text-[9px] uppercase">
            • {selectedLocalityFilter}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-white/70">
          <button
            onClick={() => navigate('/how-it-works')}
            className={`hover:text-[#CCFF00] transition uppercase tracking-wider text-[10px] ${
              activeTab === 'how-it-works' ? 'text-[#CCFF00] font-bold' : ''
            }`}
          >
            How It Works
          </button>
          <span className="text-white/20">|</span>
          <button
            onClick={() => navigate('/architecture')}
            className={`hover:text-[#CCFF00] transition uppercase tracking-wider text-[10px] ${
              activeTab === 'architecture' ? 'text-[#CCFF00] font-bold' : ''
            }`}
          >
            Architecture
          </button>
          <span className="text-white/20">|</span>
          <button
            onClick={() => navigate('/demo-guide')}
            className={`flex items-center gap-1 hover:text-[#CCFF00] transition uppercase tracking-wider text-[10px] ${
              activeTab === 'demo-guide' ? 'text-[#CCFF00] font-bold' : 'text-white/80'
            }`}
          >
            <Sparkles className="w-2.5 h-2.5 text-[#CCFF00]" />
            <span>18-Step Walkthrough</span>
          </button>
          <span className="text-white/20">|</span>
          <button
            onClick={() => setTestBookingModalOpen(true)}
            className="flex items-center gap-1 hover:text-[#CCFF00] text-[#CCFF00] font-bold transition uppercase tracking-wider text-[10px] bg-[#CCFF00]/10 px-2 py-0.5 border border-[#CCFF00]/30"
          >
            <span>Test Booking</span>
          </button>
          <span className="text-white/20">|</span>
          <button
            onClick={resetDemoData}
            title="Reset demo data to initial clean state"
            className="flex items-center gap-1 text-[10px] text-white/50 hover:text-white transition px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10"
          >
            <RotateCcw className="w-2.5 h-2.5" />
            <span>Reset Demo</span>
          </button>
        </div>

        {/* Mobile quick reset link */}
        <div className="sm:hidden flex items-center gap-2">
          <button
            onClick={resetDemoData}
            title="Reset demo data"
            className="flex items-center gap-1 text-[9px] text-white/60 hover:text-white px-2 py-0.5 bg-white/5 border border-white/10 uppercase"
          >
            <RotateCcw className="w-2.5 h-2.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Logo & Manifesto Subline */}
          <div
            onClick={() => {
              if (role === 'worker') navigate('/worker');
              else if (role === 'admin') navigate('/coop');
              else navigate('/');
            }}
            className="flex items-center gap-3.5 cursor-pointer group shrink-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-[#F5F5F2] text-[#0A0A0A] flex items-center justify-center font-display font-black text-xl tracking-tighter group-hover:bg-[#CCFF00] transition-colors">
              CS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white leading-none">
                  COSERVE
                </span>
                <span className="text-[9px] font-mono-code uppercase tracking-widest text-[#CCFF00] border border-[#CCFF00]/40 px-1.5 py-0.2">
                  COOPERATIVE
                </span>
              </div>
              <p className="text-[10px] font-mono-code text-white/50 uppercase tracking-widest mt-0.5">
                Local services. Shared growth.
              </p>
            </div>
          </div>

          {/* Dynamic Locality Selector (Scalable across all zones) */}
          <div className="relative hidden lg:block">
            <button
              onClick={() => setLocalityDropdownOpen(!localityDropdownOpen)}
              className="flex items-center gap-2.5 px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono-code transition text-white"
            >
              <MapPin className="w-3.5 h-3.5 text-[#CCFF00]" />
              <div className="text-left">
                <div className="text-[9px] uppercase tracking-wider text-white/50">SERVICE AREA</div>
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span>{selectedLocalityFilter}</span>
                  <ChevronDown className="w-3 h-3 text-white/60" />
                </div>
              </div>
            </button>

            {localityDropdownOpen && (
              <div className="absolute top-full mt-2 left-0 w-52 bg-[#121212] border border-white/20 shadow-2xl p-1 z-50 font-mono-code text-xs">
                <div className="px-3 py-1.5 text-[10px] text-white/40 uppercase tracking-wider border-b border-white/10">
                  Select Local Zone
                </div>
                {LOCALITIES.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      setSelectedLocalityFilter(loc);
                      setLocalityDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-white/10 transition ${
                      selectedLocalityFilter === loc ? 'text-[#CCFF00] font-bold bg-white/5' : 'text-white/80'
                    }`}
                  >
                    <span>{loc}</span>
                    {selectedLocalityFilter === loc && <Check className="w-3 h-3 text-[#CCFF00]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Architectural Role Switcher: CUSTOMER | WORKER | COOPERATIVE */}
          <div className="hidden md:flex items-center bg-white/5 p-1 border border-white/15">
            <button
              onClick={() => handleRoleSwitch('customer')}
              className={`px-4 py-2 text-left transition-all ${
                role === 'customer'
                  ? 'bg-[#F5F5F2] text-[#0A0A0A] font-black'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="text-[11px] font-display uppercase tracking-wider">Customer</div>
              <div className="text-[9px] font-mono-code opacity-70">
                {customer.name}
              </div>
            </button>

            <button
              onClick={() => handleRoleSwitch('worker')}
              className={`px-4 py-2 text-left transition-all border-l border-white/10 ${
                role === 'worker'
                  ? 'bg-[#CCFF00] text-[#0A0A0A] font-black'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="text-[11px] font-display uppercase tracking-wider flex items-center gap-1.5">
                <span>Worker</span>
                {pendingRequestsCount > 0 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                )}
              </div>
              <div className="text-[9px] font-mono-code opacity-70">
                {worker.name}
              </div>
            </button>

            <button
              onClick={() => handleRoleSwitch('admin')}
              className={`px-4 py-2 text-left transition-all border-l border-white/10 ${
                role === 'admin'
                  ? 'bg-[#F5F5F2] text-[#0A0A0A] font-black'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <div className="text-[11px] font-display uppercase tracking-wider">Cooperative</div>
              <div className="text-[9px] font-mono-code opacity-70">
                Union Oversight
              </div>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white/80 hover:text-white border border-white/20"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Sub-Navigation Directory */}
        <div className="hidden md:flex items-center justify-between border-t border-white/10 py-2.5 overflow-x-auto font-mono-code text-xs">
          <div className="flex items-center gap-2">
            {navLinks.map((tab) => {
              const isCurrent = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => navigate(tab.path)}
                  className={`px-3 py-1.5 uppercase tracking-wider text-[11px] transition-all flex items-center gap-2 ${
                    isCurrent
                      ? 'bg-white text-[#0A0A0A] font-bold shadow-xs'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{tab.label}</span>
                  {tab.badge !== undefined && (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 font-mono-code font-bold ${
                        isCurrent
                          ? 'bg-[#CCFF00] text-[#0A0A0A]'
                          : 'bg-[#CCFF00]/20 text-[#CCFF00]'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Context Telemetry Pill */}
          <div className="flex items-center gap-2 pl-4 text-[11px] text-white/50 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]" />
            <span className="text-white/80 font-mono-code">
              {role === 'customer'
                ? `Customer: ${customer.name} • ${selectedLocalityFilter}`
                : role === 'worker'
                ? `Worker: ${worker.name} (${worker.businessName})`
                : `Union Steward Console`}
            </span>
          </div>
        </div>
      </div>

      {/* Cinematic Role Perspective Switch HUD */}
      <AnimatePresence>
        {perspectiveNotice && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="border-b border-[#CCFF00]/30 bg-[#121212] px-4 py-2.5 text-xs font-mono-code"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
                <div>
                  <div className="font-bold uppercase tracking-wider text-[#CCFF00] text-[11px]">
                    {perspectiveNotice.title}
                  </div>
                  <div className="text-white/70 text-[10px] mt-0.5">
                    {perspectiveNotice.sub}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setPerspectiveNotice(null)}
                className="text-white/40 hover:text-white text-[10px] uppercase tracking-wider underline"
              >
                Dismiss
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Full-Screen / Sliding Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex flex-col justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Slide-over Drawer Content */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 260 }}
              className="relative z-10 bg-[#0E0E0E] text-[#F5F5F2] border-t border-white/20 shadow-2xl max-h-[92vh] flex flex-col font-mono-code overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#0A0A0A] shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 bg-[#CCFF00] text-black font-display font-black flex items-center justify-center text-base">
                    CS
                  </div>
                  <div>
                    <div className="font-display font-black text-lg text-white leading-none tracking-tight">
                      COSERVE OS
                    </div>
                    <div className="text-[10px] text-white/50 uppercase tracking-widest mt-0.5">
                      {role === 'customer' ? 'Customer Console' : role === 'worker' ? 'Worker OS' : 'Union Console'}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 transition"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Drawer Body */}
              <div className="overflow-y-auto px-5 py-5 space-y-6 flex-1">
                {/* 1. Role Perspective Switcher */}
                <div className="space-y-2">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-[#CCFF00]">
                    Select Console Perspective
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => {
                        handleRoleSwitch('customer');
                        setMobileMenuOpen(false);
                      }}
                      className={`py-3 px-2 text-center transition border ${
                        role === 'customer'
                          ? 'bg-[#F5F5F2] text-[#0A0A0A] font-black border-[#F5F5F2] shadow-sm'
                          : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="text-xs uppercase font-bold">Customer</div>
                      <div className="text-[9px] opacity-70 mt-0.5">Household</div>
                    </button>

                    <button
                      onClick={() => {
                        handleRoleSwitch('worker');
                        setMobileMenuOpen(false);
                      }}
                      className={`py-3 px-2 text-center transition border ${
                        role === 'worker'
                          ? 'bg-[#CCFF00] text-[#0A0A0A] font-black border-[#CCFF00] shadow-sm'
                          : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="text-xs uppercase font-bold flex items-center justify-center gap-1">
                        <span>Worker</span>
                        {pendingRequestsCount > 0 && (
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                        )}
                      </div>
                      <div className="text-[9px] opacity-70 mt-0.5">Artisan</div>
                    </button>

                    <button
                      onClick={() => {
                        handleRoleSwitch('admin');
                        setMobileMenuOpen(false);
                      }}
                      className={`py-3 px-2 text-center transition border ${
                        role === 'admin'
                          ? 'bg-[#F5F5F2] text-[#0A0A0A] font-black border-[#F5F5F2] shadow-sm'
                          : 'bg-white/5 text-white/70 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div className="text-xs uppercase font-bold">Union</div>
                      <div className="text-[9px] opacity-70 mt-0.5">Oversight</div>
                    </button>
                  </div>
                </div>

                {/* 2. Active Locality Selector */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-white/50 flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-[#CCFF00]" />
                      <span>Service Area: {selectedLocalityFilter}</span>
                    </span>
                    <button
                      onClick={() => setMobileLocalityOpen(!mobileLocalityOpen)}
                      className="text-[10px] uppercase text-[#CCFF00] hover:underline"
                    >
                      {mobileLocalityOpen ? 'Hide' : 'Change'}
                    </button>
                  </div>

                  {mobileLocalityOpen && (
                    <div className="grid grid-cols-2 gap-1.5 p-2 bg-white/5 border border-white/10">
                      {LOCALITIES.map((loc) => (
                        <button
                          key={loc}
                          onClick={() => {
                            setSelectedLocalityFilter(loc);
                            setMobileLocalityOpen(false);
                          }}
                          className={`text-left text-xs p-2.5 transition flex items-center justify-between ${
                            selectedLocalityFilter === loc
                              ? 'bg-[#CCFF00] text-black font-bold'
                              : 'text-white/80 hover:bg-white/10'
                          }`}
                        >
                          <span>{loc}</span>
                          {selectedLocalityFilter === loc && <Check className="w-3 h-3 text-black" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* 3. Navigation Links */}
                <div className="space-y-3 pt-2 border-t border-white/10">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">
                    Console Views
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    {navLinks.map((tab) => {
                      const isCurrent = activeTab === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => {
                            navigate(tab.path);
                            setMobileMenuOpen(false);
                          }}
                          className={`w-full min-h-[44px] px-4 py-3 text-xs uppercase tracking-wider font-bold transition flex items-center justify-between border ${
                            isCurrent
                              ? 'bg-[#CCFF00] text-black border-[#CCFF00]'
                              : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10 hover:border-white/20'
                          }`}
                        >
                          <span>{tab.label}</span>
                          {tab.badge !== undefined && (
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                isCurrent ? 'bg-black text-[#CCFF00]' : 'bg-[#CCFF00] text-black'
                              }`}
                            >
                              {tab.badge} Active
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Platform & Explanatory Modules */}
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <div className="text-[10px] uppercase font-bold tracking-widest text-white/40">
                    System Knowledge & Tools
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        navigate('/how-it-works');
                        setMobileMenuOpen(false);
                      }}
                      className="min-h-[44px] p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold uppercase text-white/80 text-left transition flex items-center gap-2"
                    >
                      <Layers className="w-3.5 h-3.5 text-[#CCFF00]" />
                      <span>How It Works</span>
                    </button>
                    <button
                      onClick={() => {
                        navigate('/architecture');
                        setMobileMenuOpen(false);
                      }}
                      className="min-h-[44px] p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold uppercase text-white/80 text-left transition flex items-center gap-2"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#CCFF00]" />
                      <span>Architecture</span>
                    </button>
                    <button
                      onClick={() => {
                        navigate('/demo-guide');
                        setMobileMenuOpen(false);
                      }}
                      className="min-h-[44px] p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold uppercase text-white/80 text-left transition flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#CCFF00]" />
                      <span>Walkthrough</span>
                    </button>
                    <button
                      onClick={() => {
                        resetDemoData();
                        setMobileMenuOpen(false);
                      }}
                      className="min-h-[44px] p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold uppercase text-white/80 text-left transition flex items-center gap-2"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-white/50" />
                      <span>Reset Demo</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Drawer Footer Telemetry */}
              <div className="p-4 bg-[#0A0A0A] border-t border-white/10 text-[10px] text-white/50 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#CCFF00] animate-pulse" />
                  <span>CoServe Peer Escrow Protocol</span>
                </div>
                <span className="text-[#CCFF00] font-bold">100% Tariff To Artisans</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};
