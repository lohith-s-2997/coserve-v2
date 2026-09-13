import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { SERVICE_CATEGORIES } from '../data/categories';
import { LOCALITIES } from '../data/providers';
import { Provider } from '../types';
import { ProviderCard } from '../components/ProviderCard';
import {
  Search,
  MapPin,
  ChevronDown,
  RotateCcw,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  SlidersHorizontal,
  X,
  Users2,
  Wrench,
  Droplet,
  Zap,
  Home as HomeIcon,
  Bike,
  BookOpen,
  Laptop,
  Check,
} from 'lucide-react';

interface PopularServiceCard {
  name: string;
  category: string;
  startingPrice: number;
  duration: string;
  icon: any;
  searchTerm: string;
}

const POPULAR_SERVICES_LIST: PopularServiceCard[] = [
  {
    name: 'AC General Service',
    category: 'Home Repair & Maintenance',
    startingPrice: 500,
    duration: '60 - 90 mins',
    icon: Wrench,
    searchTerm: 'AC',
  },
  {
    name: 'Plumbing Repair',
    category: 'Home Repair & Maintenance',
    startingPrice: 350,
    duration: '45 - 60 mins',
    icon: Droplet,
    searchTerm: 'Plumbing',
  },
  {
    name: 'Fan & Electrical Repair',
    category: 'Home Repair & Maintenance',
    startingPrice: 350,
    duration: '45 mins',
    icon: Zap,
    searchTerm: 'Electrical',
  },
  {
    name: 'Bathroom Deep Cleaning',
    category: 'Cleaning & Home Care',
    startingPrice: 400,
    duration: '60 mins',
    icon: HomeIcon,
    searchTerm: 'Bathroom Cleaning',
  },
  {
    name: 'Doorstep Bike Service',
    category: 'Mobility & Vehicle Help',
    startingPrice: 350,
    duration: '60 mins',
    icon: Bike,
    searchTerm: 'Bike',
  },
  {
    name: 'Home Tutoring (K-12)',
    category: 'Learning & Community Support',
    startingPrice: 400,
    duration: '60 mins / session',
    icon: BookOpen,
    searchTerm: 'Tutoring',
  },
  {
    name: 'Computer & Wi-Fi Help',
    category: 'Learning & Community Support',
    startingPrice: 350,
    duration: '60 mins',
    icon: Laptop,
    searchTerm: 'Computer',
  },
];

export const ServicesDiscoveryView: React.FC = () => {
  const {
    providers = [],
    selectedCategoryFilter = 'all',
    setSelectedCategoryFilter,
    selectedLocalityFilter = 'All Localities',
    setSelectedLocalityFilter,
    setSelectedProvider,
    setFairMatchModalProvider,
    setBookingModalProvider,
    navigate,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'fairmatch' | 'distance' | 'rating' | 'price'>('fairmatch');
  const [filterAvailableOnly, setFilterAvailableOnly] = useState<boolean>(false);
  const [filterVerifiedOnly, setFilterVerifiedOnly] = useState<boolean>(false);
  const [filterCoopOnly, setFilterCoopOnly] = useState<boolean>(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategoryFilter('all');
    setSelectedLocalityFilter('All Localities');
    setFilterAvailableOnly(false);
    setFilterVerifiedOnly(false);
    setFilterCoopOnly(false);
    setSortBy('fairmatch');
  };

  const handleWhyMatch = (provider: Provider) => {
    setFairMatchModalProvider(provider);
  };

  const handleBook = (provider: Provider) => {
    setBookingModalProvider(provider);
  };

  const handleViewProfile = (provider: Provider) => {
    setSelectedProvider(provider);
    navigate(`/provider/${provider.id}`);
  };

  // Filtered providers with defensive null checks
  const filteredProviders = useMemo(() => {
    const safeProviders = Array.isArray(providers) ? providers : [];

    return safeProviders.filter((prov) => {
      if (!prov) return false;

      // 1. Locality Filter
      if (selectedLocalityFilter !== 'All Localities') {
        const provLoc = (prov.location || '').toLowerCase();
        const targetLoc = selectedLocalityFilter.toLowerCase();
        if (!provLoc.includes(targetLoc)) return false;
      }

      // 2. Category Filter
      if (selectedCategoryFilter !== 'all') {
        const provCat = (prov.category || '').toLowerCase();
        const targetCat = selectedCategoryFilter.toLowerCase();
        if (!provCat.includes(targetCat) && !targetCat.includes(provCat)) return false;
      }

      // 3. Quick Toggles
      if (filterAvailableOnly && !prov.isAvailableToday) return false;
      if (filterVerifiedOnly && (!prov.badges?.identityVerified || !prov.badges?.skillVerified)) return false;
      if (filterCoopOnly && !prov.badges?.cooperativeMember) return false;

      // 4. Free text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const bName = (prov.businessName || '').toLowerCase();
        const pName = (prov.professionalName || '').toLowerCase();
        const cat = (prov.category || '').toLowerCase();
        const loc = (prov.location || '').toLowerCase();
        const services = Array.isArray(prov.serviceTypes) ? prov.serviceTypes.join(' ').toLowerCase() : '';
        const specs = Array.isArray(prov.specializations) ? prov.specializations.join(' ').toLowerCase() : '';

        const matches =
          bName.includes(q) ||
          pName.includes(q) ||
          cat.includes(q) ||
          loc.includes(q) ||
          services.includes(q) ||
          specs.includes(q);

        if (!matches) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'distance') {
        return (a.distanceKm ?? 999) - (b.distanceKm ?? 999);
      }
      if (sortBy === 'rating') {
        return (b.rating ?? 0) - (a.rating ?? 0);
      }
      if (sortBy === 'price') {
        return (a.startingPrice ?? 9999) - (b.startingPrice ?? 9999);
      }
      // default: fairmatch
      return (b.fairMatch?.overall ?? 0) - (a.fairMatch?.overall ?? 0);
    });
  }, [
    providers,
    selectedLocalityFilter,
    selectedCategoryFilter,
    filterAvailableOnly,
    filterVerifiedOnly,
    filterCoopOnly,
    searchQuery,
    sortBy,
  ]);

  // Available Today quick items
  const availableTodayList = useMemo(() => {
    const safeProviders = Array.isArray(providers) ? providers : [];
    return safeProviders.filter((p) => p?.isAvailableToday).slice(0, 4);
  }, [providers]);

  const activeFiltersCount =
    (selectedCategoryFilter !== 'all' ? 1 : 0) +
    (selectedLocalityFilter !== 'All Localities' ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0) +
    (filterAvailableOnly ? 1 : 0) +
    (filterVerifiedOnly ? 1 : 0) +
    (filterCoopOnly ? 1 : 0);

  return (
    <div className="w-full bg-[#F5F5F2] text-[#0A0A0A] font-mono-code min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* ========================================================================= */}
        {/* HEADER & BREADCRUMBS */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-black/60">
            <button
              onClick={() => navigate('/')}
              className="hover:text-black hover:underline"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-black font-bold">Find Services</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black/15">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-black/50">
                DIRECT DOORSTEP SERVICE DIRECTORY
              </div>
              <h1 className="text-4xl sm:text-6xl font-black font-display uppercase tracking-tight text-black mt-2 leading-[0.95]">
                FIND LOCAL SERVICES.
              </h1>
            </div>
            <p className="text-black/70 text-xs sm:text-sm max-w-md font-sans leading-relaxed">
              Discover certified tradespeople and service specialists in your neighborhood.
              Fixed transparent rates, verified credentials, and 100% direct payouts to workers.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 1: SEARCH & FILTER CONTROL BAR */}
        {/* ========================================================================= */}
        <div className="p-6 bg-white border border-black/15 shadow-2xs space-y-5">
          {/* Primary Search Bar + Locality & Sort */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-black/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by trade, skill, or service (e.g. AC, plumbing, electrical, bike, tutor)..."
                className="w-full pl-10 pr-9 py-2.5 bg-black/5 border border-black/15 text-xs text-black placeholder-black/40 focus:outline-none focus:border-black font-mono-code"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black/40 hover:text-black"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="md:col-span-3 relative">
              <MapPin className="w-4 h-4 text-black/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <select
                value={selectedLocalityFilter}
                onChange={(e) => setSelectedLocalityFilter(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 bg-black/5 border border-black/15 text-xs text-black appearance-none focus:outline-none focus:border-black uppercase font-bold"
              >
                {LOCALITIES.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-black/40 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="md:col-span-3 relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 pr-8 py-2.5 bg-black/5 border border-black/15 text-xs text-black appearance-none focus:outline-none focus:border-black uppercase font-bold"
              >
                <option value="fairmatch">Sort: FairMatch Score</option>
                <option value="distance">Sort: Nearest First</option>
                <option value="rating">Sort: Highest Rating</option>
                <option value="price">Sort: Lowest Tariff</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-black/40 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Category Horizontal Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 border-t border-black/10 scrollbar-none">
            <button
              onClick={() => setSelectedCategoryFilter('all')}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider whitespace-nowrap transition border ${
                selectedCategoryFilter === 'all'
                  ? 'bg-black text-white font-bold border-black'
                  : 'bg-black/5 text-black/70 hover:bg-black/10 border-black/10'
              }`}
            >
              All Categories ({providers.length})
            </button>
            {SERVICE_CATEGORIES.map((cat) => {
              const isSelected = selectedCategoryFilter === cat.name;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryFilter(cat.name)}
                  className={`px-3 py-1.5 text-xs uppercase tracking-wider whitespace-nowrap transition border ${
                    isSelected
                      ? 'bg-black text-white font-bold border-black'
                      : 'bg-black/5 text-black/70 hover:bg-black/10 border-black/10'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Quick Toggles + Active Filters Summary */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs border-t border-black/10">
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterAvailableOnly}
                  onChange={(e) => setFilterAvailableOnly(e.target.checked)}
                  className="rounded-none border-black"
                />
                <span className="text-black/80 font-medium">Available Today Only</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterVerifiedOnly}
                  onChange={(e) => setFilterVerifiedOnly(e.target.checked)}
                  className="rounded-none border-black"
                />
                <span className="text-black/80 font-medium">Dual-Verified Pros Only</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterCoopOnly}
                  onChange={(e) => setFilterCoopOnly(e.target.checked)}
                  className="rounded-none border-black"
                />
                <span className="text-black/80 font-medium">Co-op Guild Members Only</span>
              </label>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-black/50 text-[11px]">
                Showing {filteredProviders.length} of {providers.length} Verified Pros
              </span>
              {activeFiltersCount > 0 && (
                <button
                  onClick={resetAllFilters}
                  className="flex items-center gap-1 text-[11px] text-black/60 hover:text-black font-bold uppercase underline"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset ({activeFiltersCount})</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 2: POPULAR SERVICES QUICK CARDS */}
        {/* ========================================================================= */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] text-black/50 font-bold uppercase tracking-wider">
                COMMON HOUSEHOLD TASKS
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-display uppercase tracking-tight text-black">
                POPULAR SERVICES
              </h2>
            </div>
            <span className="text-xs text-black/50 font-sans hidden sm:inline">
              Click any service to filter available specialists
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            {POPULAR_SERVICES_LIST.map((srv, idx) => {
              const IconComp = srv.icon;
              const isActive = searchQuery.toLowerCase() === srv.searchTerm.toLowerCase();
              return (
                <button
                  key={idx}
                  onClick={() => {
                    if (isActive) {
                      setSearchQuery('');
                    } else {
                      setSearchQuery(srv.searchTerm);
                    }
                  }}
                  className={`p-3.5 text-left border transition flex flex-col justify-between group ${
                    isActive
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-black/15 hover:border-black'
                  }`}
                >
                  <div>
                    <div className={`p-2 w-fit mb-2 border ${
                      isActive ? 'bg-white/10 border-white/20 text-[#CCFF00]' : 'bg-black/5 border-black/10 text-black'
                    }`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="text-xs font-bold leading-tight font-display uppercase line-clamp-2">
                      {srv.name}
                    </div>
                    <div className={`text-[9px] uppercase mt-1 ${isActive ? 'text-white/60' : 'text-black/50'}`}>
                      {srv.duration}
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t border-black/10">
                    <div className={`text-[9px] uppercase ${isActive ? 'text-white/60' : 'text-black/50'}`}>
                      FROM
                    </div>
                    <div className={`text-sm font-bold font-display ${isActive ? 'text-[#CCFF00]' : 'text-black'}`}>
                      ₹{srv.startingPrice}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 3: AVAILABLE TODAY QUICK SHELF */}
        {/* ========================================================================= */}
        {!searchQuery && selectedCategoryFilter === 'all' && availableTodayList.length > 0 && (
          <div className="p-6 bg-[#0A0A0A] text-white border border-black space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#CCFF00] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#CCFF00]">
                  AVAILABLE TODAY IN YOUR NEIGHBOURHOOD
                </span>
              </div>
              <span className="text-[11px] text-white/50 uppercase tracking-widest hidden sm:inline">
                INSTANT DIRECT DISPATCH
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {availableTodayList.map((pro) => (
                <div
                  key={pro.id}
                  className="p-4 bg-white/5 border border-white/15 hover:border-[#CCFF00] transition flex flex-col justify-between group"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-[#CCFF00] font-bold uppercase tracking-wider">
                        {pro.category.split(' ')[0]}
                      </span>
                      <span className="text-white/60">{pro.distanceKm} km away</span>
                    </div>

                    <h4
                      onClick={() => handleViewProfile(pro)}
                      className="text-base font-bold font-display uppercase tracking-tight text-white group-hover:text-[#CCFF00] cursor-pointer"
                    >
                      {pro.professionalName}
                    </h4>
                    <div className="text-[11px] text-white/70 font-sans">
                      {pro.businessName}
                    </div>
                    <div className="text-[10px] text-white/50">
                      ★ {pro.rating} ({pro.reviewCount} reviews) • {pro.repeatCustomerRate}% repeat
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/10">
                    <div>
                      <span className="text-[9px] text-white/40 block">DIRECT TARIFF</span>
                      <span className="text-sm font-bold text-[#CCFF00]">₹{pro.startingPrice}+</span>
                    </div>
                    <button
                      onClick={() => handleBook(pro)}
                      className="px-3 py-1.5 bg-[#CCFF00] hover:bg-[#D4FF00] text-black text-xs font-bold uppercase tracking-wider transition"
                    >
                      Book Visit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SECTION 4: DIRECTORY LISTINGS OR EMPTY STATE */}
        {/* ========================================================================= */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-black/10">
            <h3 className="text-lg sm:text-xl font-black font-display uppercase tracking-tight text-black">
              VERIFIED PROFESSIONALS ({filteredProviders.length})
            </h3>
            <span className="text-xs text-black/50 font-mono-code">
              Ranked with FairMatch™ transparent algorithm
            </span>
          </div>

          {filteredProviders.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {filteredProviders.map((provider, index) => (
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                  isMainDemo={index === 0 && sortBy === 'fairmatch' && !searchQuery}
                  onWhyMatch={handleWhyMatch}
                  onBook={handleBook}
                  onViewProfile={handleViewProfile}
                />
              ))}
            </div>
          ) : (
            <div className="p-16 bg-white border border-black/15 text-center space-y-4">
              <div className="text-3xl font-black font-display uppercase text-black">
                NO PROFESSIONALS FOUND
              </div>
              <p className="text-xs text-black/60 max-w-md mx-auto font-sans leading-relaxed">
                Try another service keyword (e.g. AC, electrical, plumbing, cleaning, bike) or change your active filters.
              </p>
              <button
                onClick={resetAllFilters}
                className="px-6 py-2.5 bg-black text-white text-xs uppercase font-bold tracking-wider hover:bg-neutral-800 transition"
              >
                [ CLEAR FILTERS ]
              </button>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* SECTION 5: TRUST & COOPERATIVE ADVANTAGE */}
        {/* ========================================================================= */}
        <div className="p-8 bg-white border border-black/15 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/10">
            <div>
              <div className="text-[10px] uppercase font-bold tracking-wider text-black/50">
                WHY BOOK THROUGH COSERVE?
              </div>
              <h3 className="text-2xl font-black font-display uppercase tracking-tight text-black mt-0.5">
                TRUST, ESCROW PROTECTION & ZERO COMMISSIONS
              </h3>
            </div>
            <span className="text-xs text-black/60 font-sans max-w-xs">
              Unlike commercial gig apps that deduct 25–35%, CoServe empowers local worker cooperatives.
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-black">
                <ShieldCheck className="w-4 h-4 text-black" />
                <span>Vetted Local Trades</span>
              </div>
              <p className="text-xs text-black/70 font-sans leading-relaxed">
                Identity verified through government credentials and skill certified by neighbourhood cooperative peers.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-black">
                <CheckCircle2 className="w-4 h-4 text-black" />
                <span>Transparent Tariffs</span>
              </div>
              <p className="text-xs text-black/70 font-sans leading-relaxed">
                100% of your service fee goes directly to the technician. No surge pricing, hidden booking fees, or algorithmic tax.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-black">
                <Award className="w-4 h-4 text-black" />
                <span>Escrow Safe Payouts</span>
              </div>
              <p className="text-xs text-black/70 font-sans leading-relaxed">
                Funds are held in secure cooperative escrow and only released upon completion confirmation and verification.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-black">
                <Users2 className="w-4 h-4 text-black" />
                <span>Fair Opportunity Match</span>
              </div>
              <p className="text-xs text-black/70 font-sans leading-relaxed">
                FairMatch algorithm balances experience with opportunity so work is shared fairly across qualified local professionals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
