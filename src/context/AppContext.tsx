import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  UserRole,
  Booking,
  BookingStatus,
  Provider,
  ActiveCustomer,
  ActiveWorker,
  ActiveAdmin,
  DemandCluster,
  CooperativeTeam,
  TeamServiceRequest,
  WorkerInvitation,
  CommunityContribution,
  CommunityAllocation,
  CustomerCreditTransaction,
  TrustedNetworkItem,
} from '../types';
import { INITIAL_PROVIDERS } from '../data/providers';
import {
  INITIAL_DEMAND_CLUSTER,
  INITIAL_COOP_TEAMS,
} from '../data/stage2Data';
import {
  INITIAL_GROWTH_POOL_BALANCE,
  INITIAL_COMMUNITY_ALLOCATIONS,
  INITIAL_COMMUNITY_CONTRIBUTIONS,
  INITIAL_CUSTOMER_CREDITS,
  INITIAL_CUSTOMER_CREDIT_HISTORY,
  INITIAL_TRUSTED_NETWORK,
} from '../data/stage3Data';
import {
  CANONICAL_SEEDED_BOOKINGS,
  COSERVE_STORAGE_KEYS,
  WORKER_PROFILES as CANONICAL_WORKER_PROFILES,
  getCanonicalDemoState,
} from '../data/canonicalSeedData';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  navigate: (to: string | number) => void;
  goBack: (fallbackRoute?: string) => void;
  customer: ActiveCustomer;
  worker: ActiveWorker;
  activeWorkerId: string;
  setActiveWorkerId: (id: string) => void;
  admin: ActiveAdmin;
  providers: Provider[];
  bookings: Booking[];
  selectedProvider: Provider | null;
  setSelectedProvider: (provider: Provider | null) => void;
  fairMatchModalProvider: Provider | null;
  setFairMatchModalProvider: (provider: Provider | null) => void;
  bookingModalProvider: Provider | null;
  setBookingModalProvider: (provider: Provider | null) => void;
  createBooking: (details: {
    provider: Provider;
    serviceName: string;
    scheduledTime: string;
    location: string;
    price: number;
    notes?: string;
  }) => Booking;
  updateBookingStatus: (bookingId: string, status: BookingStatus) => void;
  resetDemoData: () => void;
  isResetModalOpen: boolean;
  setIsResetModalOpen: (open: boolean) => void;
  resetStatus: 'confirm' | 'resetting' | 'ready';
  confirmResetDemo: () => void;
  cancelResetDemo: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (cat: string) => void;
  selectedLocalityFilter: string;
  setSelectedLocalityFilter: (loc: string) => void;
  // Stage 2 Features
  cluster: DemandCluster;
  joinCommunityCluster: () => void;
  acceptCommunityCluster: () => void;
  cooperativeTeams: CooperativeTeam[];
  createCoopTeam: (data: { name: string; locality: string; services: string[] }) => void;
  teamRequests: TeamServiceRequest[];
  requestCoopTeam: (details: { teamId: string; packageName: string; price: number }) => void;
  workerInvitations: WorkerInvitation[];
  sendWorkerInvitation: (workerName: string, workerTrade: string, teamName: string) => void;
  growthCredits: number;
  redeemGrowthCredits: (amount: number, itemTitle: string) => boolean;
  redeemedGrowthItems: string[];
  // Stage 3 Features
  growthPoolBalance: number;
  growthPoolContributions: CommunityContribution[];
  growthPoolAllocations: CommunityAllocation[];
  customerCredits: number;
  customerCreditHistory: CustomerCreditTransaction[];
  trustedNetwork: TrustedNetworkItem[];
  completeProtectedPayment: (bookingId: string) => void;
  rateBooking: (bookingId: string, stars: number, tags: string[]) => void;
  addToTrustedNetwork: (booking: Booking) => void;
  createRepeatBooking: (trustedItem: TrustedNetworkItem) => Booking;
  raiseDisputeIssue: (bookingId: string, reason: string, description: string) => void;
  requestReplacement: (bookingId: string, alternativeProvider: Provider) => void;
  // Stage 3 Modals
  paymentModalBooking: Booking | null;
  setPaymentModalBooking: (b: Booking | null) => void;
  invoiceModalBooking: Booking | null;
  setInvoiceModalBooking: (b: Booking | null) => void;
  ratingModalBooking: Booking | null;
  setRatingModalBooking: (b: Booking | null) => void;
  disputeModalBooking: Booking | null;
  setDisputeModalBooking: (b: Booking | null) => void;
  replacementModalBooking: Booking | null;
  setReplacementModalBooking: (b: Booking | null) => void;
  isChooseProfessionalModalOpen: boolean;
  setIsChooseProfessionalModalOpen: (open: boolean) => void;
  isTestBookingModalOpen: boolean;
  setTestBookingModalOpen: (open: boolean) => void;
}

export const WORKER_PROFILES = CANONICAL_WORKER_PROFILES;

const DEMO_CUSTOMER: ActiveCustomer = {
  name: 'Arun Kumar',
  locality: 'Anna Nagar',
  city: 'Chennai',
  phone: '+91 98401 23891',
  address: 'Flat 3B, Sunshine Apts, 2nd Avenue, Anna Nagar',
  avatarSeed: 'Arun Kumar',
};

const DEMO_ADMIN: ActiveAdmin = {
  cooperativeName: 'Anna Nagar Cooperative',
  locality: 'Anna Nagar Zone VI',
  city: 'Chennai',
  memberCount: 84,
};

const STORAGE_KEY_BOOKINGS = 'coserve_demo_bookings_v2';
const STORAGE_KEY_ROLE = 'coserve_demo_role_v2';
const STORAGE_KEY_ACTIVE_WORKER = 'coserve_active_worker_id_v1';
const STORAGE_KEY_CLUSTER = 'coserve_demo_cluster_v2';
const STORAGE_KEY_TEAMS = 'coserve_demo_teams_v2';
const STORAGE_KEY_TEAM_REQS = 'coserve_demo_team_requests_v2';
const STORAGE_KEY_INVITATIONS = 'coserve_demo_invitations_v2';
const STORAGE_KEY_CREDITS = 'coserve_demo_growth_credits_v2';
const STORAGE_KEY_REDEEMED = 'coserve_demo_redeemed_v2';
const STORAGE_KEY_GROWTH_BALANCE = 'coserve_demo_growth_balance_v3';
const STORAGE_KEY_GROWTH_CONTRIBUTIONS = 'coserve_demo_growth_contributions_v3';
const STORAGE_KEY_CUSTOMER_CREDITS = 'coserve_demo_customer_credits_v3';
const STORAGE_KEY_CUSTOMER_CREDIT_HISTORY = 'coserve_demo_customer_credit_history_v3';
const STORAGE_KEY_TRUSTED_NETWORK = 'coserve_demo_trusted_network_v3';

const TAB_ROUTE_MAP: Record<string, string> = {
  'home': '/',
  'services': '/services',
  'find-services': '/services',
  'my-bookings': '/bookings',
  'bookings': '/bookings',
  'provider-profile': '/provider',
  'trusted-network': '/network',
  'network': '/network',
  'fairmatch': '/fairmatch',
  'fair-match': '/fairmatch',
  'community-growth-pool': '/community',
  'community-growth': '/community',
  'customer-credits': '/credits',
  'coserve-credits': '/credits',
  'worker-dashboard': '/worker',
  'coop-dashboard': '/coop',
  'community-demand': '/demand',
  'cooperative-teams': '/teams',
  'my-coop-team': '/teams',
  'fair-work-distribution': '/fair-work',
  'work-distribution': '/fair-work',
  'gig-to-growth': '/growth',
  'my-reputation': '/growth',
  'network-loop': '/network-loop',
  'how-it-works': '/how-it-works',
  'architecture': '/architecture',
  'demo-guide': '/demo-guide',
  'support': '/support',
  'service-history': '/service-history',
  'my-services': '/my-services',
  'requests': '/requests',
  'workers-roster': '/workers-roster',
};

const getTabFromPath = (pathname: string): string => {
  if (pathname === '/' || pathname === '') return 'home';
  if (pathname === '/services' || pathname === '/find-services') return 'services';
  if (pathname.startsWith('/bookings') || pathname === '/my-bookings') return 'my-bookings';
  if (pathname.startsWith('/provider')) return 'provider-profile';
  if (pathname === '/network' || pathname === '/trusted-network') return 'trusted-network';
  if (pathname === '/fairmatch' || pathname === '/fair-match') return 'fairmatch';
  if (pathname === '/community' || pathname === '/community-growth' || pathname === '/community-growth-pool') return 'community-growth-pool';
  if (pathname === '/credits' || pathname === '/customer-credits' || pathname === '/coserve-credits') return 'customer-credits';
  if (pathname.startsWith('/worker')) return 'worker-dashboard';
  if (pathname === '/coop' || pathname === '/admin' || pathname === '/coop-dashboard') return 'coop-dashboard';
  if (pathname === '/demand' || pathname === '/community-demand') return 'community-demand';
  if (pathname === '/teams' || pathname === '/cooperative-teams' || pathname === '/my-coop-team') return 'cooperative-teams';
  if (pathname === '/fair-work' || pathname === '/fair-work-distribution' || pathname === '/work-distribution') return 'fair-work-distribution';
  if (pathname === '/growth' || pathname === '/gig-to-growth' || pathname === '/my-reputation') return 'gig-to-growth';
  if (pathname === '/network-loop') return 'network-loop';
  if (pathname === '/how-it-works') return 'how-it-works';
  if (pathname === '/architecture') return 'architecture';
  if (pathname === '/demo-guide') return 'demo-guide';
  if (pathname === '/support') return 'support';
  if (pathname === '/service-history') return 'service-history';
  if (pathname === '/my-services') return 'my-services';
  if (pathname === '/requests') return 'requests';
  if (pathname === '/workers-roster') return 'workers-roster';
  return 'home';
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [role, setRoleState] = useState<UserRole>(() => {
    try {
      const savedRole = localStorage.getItem(STORAGE_KEY_ROLE);
      if (savedRole === 'customer' || savedRole === 'worker' || savedRole === 'admin') {
        return savedRole;
      }
    } catch {
      // fallback
    }
    return 'customer';
  });

  const [activeTab, setActiveTabState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return getTabFromPath(window.location.pathname);
    }
    return 'home';
  });

  // Keep activeTab in sync with browser URL changes (back/forward, direct links)
  useEffect(() => {
    const newTab = getTabFromPath(location.pathname);
    setActiveTabState(newTab);
  }, [location.pathname]);

  // Handle any legacy hash URLs and seamlessly migrate them to pushState routes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      const hashRouteMap: Record<string, string> = {
        'services': '/services',
        'find-services': '/services',
        'my-bookings': '/bookings',
        'bookings': '/bookings',
        'trusted-network': '/network',
        'network': '/network',
        'community-growth-pool': '/community',
        'community-growth': '/community',
        'customer-credits': '/credits',
        'coserve-credits': '/credits',
        'worker-dashboard': '/worker',
        'coop-dashboard': '/coop',
        'community-demand': '/demand',
        'cooperative-teams': '/teams',
        'my-coop-team': '/teams',
        'fair-work-distribution': '/fair-work',
        'work-distribution': '/fair-work',
        'gig-to-growth': '/growth',
        'my-reputation': '/growth',
        'network-loop': '/network-loop',
        'how-it-works': '/how-it-works',
        'architecture': '/architecture',
        'demo-guide': '/demo-guide',
        'home': '/',
      };
      if (hash && hashRouteMap[hash]) {
        navigate(hashRouteMap[hash], { replace: true });
      }
    }
  }, [navigate]);

  const [isChooseProfessionalModalOpen, setIsChooseProfessionalModalOpen] = useState<boolean>(false);
  const [isTestBookingModalOpen, setTestBookingModalOpen] = useState<boolean>(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [selectedLocalityFilter, setSelectedLocalityFilter] = useState<string>('All Localities');

  const [providers] = useState<Provider[]>(INITIAL_PROVIDERS);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [fairMatchModalProvider, setFairMatchModalProvider] = useState<Provider | null>(null);
  const [bookingModalProvider, setBookingModalProvider] = useState<Provider | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const setActiveTab = (tab: string) => {
    let targetRoute = TAB_ROUTE_MAP[tab] || `/${tab}`;
    if (tab === 'provider-profile' && selectedProvider) {
      targetRoute = `/provider/${selectedProvider.id}`;
    } else if (tab === 'worker-dashboard' && activeWorkerId) {
      targetRoute = `/worker/${activeWorkerId}`;
    }
    if (location.pathname !== targetRoute) {
      navigate(targetRoute);
    }
  };

  const navigateTo = (to: string | number) => {
    if (typeof to === 'number') {
      navigate(to);
    } else {
      navigate(to);
    }
  };

  const goBack = (fallbackRoute?: string) => {
    const defaultFallback = role === 'worker' ? '/worker' : role === 'admin' ? '/coop' : '/';
    const targetFallback = fallbackRoute || defaultFallback;
    if (window.history.state && typeof window.history.state.idx === 'number' && window.history.state.idx > 0) {
      navigate(-1);
    } else if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate(targetFallback);
    }
  };

  // Stage 3 Modal States
  const [paymentModalBooking, setPaymentModalBooking] = useState<Booking | null>(null);
  const [invoiceModalBooking, setInvoiceModalBooking] = useState<Booking | null>(null);
  const [ratingModalBooking, setRatingModalBooking] = useState<Booking | null>(null);
  const [disputeModalBooking, setDisputeModalBooking] = useState<Booking | null>(null);
  const [replacementModalBooking, setReplacementModalBooking] = useState<Booking | null>(null);

  // Reset Demo Modal State
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [resetStatus, setResetStatus] = useState<'confirm' | 'resetting' | 'ready'>('confirm');

  // Load bookings from localStorage (with fallback to canonical deep copy)
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_BOOKINGS);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch {
      // fallback
    }
    return JSON.parse(JSON.stringify(CANONICAL_SEEDED_BOOKINGS));
  });

  const [activeWorkerId, setActiveWorkerIdState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ACTIVE_WORKER);
      if (saved && WORKER_PROFILES[saved]) return saved;
    } catch {
      // fallback
    }
    return 'arjun';
  });

  const setActiveWorkerId = (id: string) => {
    if (WORKER_PROFILES[id]) {
      setActiveWorkerIdState(id);
      try {
        localStorage.setItem(STORAGE_KEY_ACTIVE_WORKER, id);
      } catch {}
      showToast(`Switched active worker to ${WORKER_PROFILES[id].businessName}`);
    }
  };

  const worker = WORKER_PROFILES[activeWorkerId] || WORKER_PROFILES['arjun'];

  // Stage 3: Community Growth Pool Balance
  const [growthPoolBalance, setGrowthPoolBalance] = useState<number>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_GROWTH_BALANCE);
      if (raw) return parseInt(raw, 10);
    } catch {
      // fallback
    }
    return INITIAL_GROWTH_POOL_BALANCE;
  });

  // Stage 3: Community Growth Pool Contributions
  const [growthPoolContributions, setGrowthPoolContributions] = useState<CommunityContribution[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_GROWTH_CONTRIBUTIONS);
      if (raw) return JSON.parse(raw);
    } catch {
      // fallback
    }
    return INITIAL_COMMUNITY_CONTRIBUTIONS;
  });

  // Stage 3: Community Allocations
  const [growthPoolAllocations] = useState<CommunityAllocation[]>(INITIAL_COMMUNITY_ALLOCATIONS);

  // Stage 3: Customer CoServe Loyalty Credits
  const [customerCredits, setCustomerCredits] = useState<number>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_CUSTOMER_CREDITS);
      if (raw) return parseInt(raw, 10);
    } catch {
      // fallback
    }
    return INITIAL_CUSTOMER_CREDITS;
  });

  // Stage 3: Customer CoServe Credit History
  const [customerCreditHistory, setCustomerCreditHistory] = useState<CustomerCreditTransaction[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_CUSTOMER_CREDIT_HISTORY);
      if (raw) return JSON.parse(raw);
    } catch {
      // fallback
    }
    return INITIAL_CUSTOMER_CREDIT_HISTORY;
  });

  // Stage 3: Trusted Network
  const [trustedNetwork, setTrustedNetwork] = useState<TrustedNetworkItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_TRUSTED_NETWORK);
      if (raw) return JSON.parse(raw);
    } catch {
      // fallback
    }
    return INITIAL_TRUSTED_NETWORK;
  });

  // Stage 2: Demand Cluster State
  const [cluster, setCluster] = useState<DemandCluster>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_CLUSTER);
      if (raw) return JSON.parse(raw);
    } catch {
      // fallback
    }
    return INITIAL_DEMAND_CLUSTER;
  });

  // Stage 2: Cooperative Teams State
  const [cooperativeTeams, setCooperativeTeams] = useState<CooperativeTeam[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_TEAMS);
      if (raw) return JSON.parse(raw);
    } catch {
      // fallback
    }
    return INITIAL_COOP_TEAMS;
  });

  // Stage 2: Team Requests State
  const [teamRequests, setTeamRequests] = useState<TeamServiceRequest[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_TEAM_REQS);
      if (raw) return JSON.parse(raw);
    } catch {
      // fallback
    }
    return [];
  });

  // Stage 2: Worker Invitations State
  const [workerInvitations, setWorkerInvitations] = useState<WorkerInvitation[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_INVITATIONS);
      if (raw) return JSON.parse(raw);
    } catch {
      // fallback
    }
    return [];
  });

  // Stage 2: Growth Credits (Arjun)
  const [growthCredits, setGrowthCredits] = useState<number>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_CREDITS);
      if (raw) return parseInt(raw, 10);
    } catch {
      // fallback
    }
    return 1240;
  });

  // Stage 2: Redeemed Items
  const [redeemedGrowthItems, setRedeemedGrowthItems] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_REDEEMED);
      if (raw) return JSON.parse(raw);
    } catch {
      // fallback
    }
    return [];
  });

  // Persistence effects
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(bookings));
    } catch (err) {
      console.warn('Failed to save bookings', err);
    }
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CLUSTER, JSON.stringify(cluster));
    } catch (err) {
      console.warn('Failed to save cluster', err);
    }
  }, [cluster]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TEAMS, JSON.stringify(cooperativeTeams));
    } catch (err) {
      console.warn('Failed to save teams', err);
    }
  }, [cooperativeTeams]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TEAM_REQS, JSON.stringify(teamRequests));
    } catch (err) {
      console.warn('Failed to save team requests', err);
    }
  }, [teamRequests]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_INVITATIONS, JSON.stringify(workerInvitations));
    } catch (err) {
      console.warn('Failed to save invitations', err);
    }
  }, [workerInvitations]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CREDITS, growthCredits.toString());
      localStorage.setItem(STORAGE_KEY_REDEEMED, JSON.stringify(redeemedGrowthItems));
    } catch (err) {
      console.warn('Failed to save credits', err);
    }
  }, [growthCredits, redeemedGrowthItems]);

  // Stage 3 Persistence Effects
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_GROWTH_BALANCE, growthPoolBalance.toString());
    } catch (err) {
      console.warn('Failed to save growth balance', err);
    }
  }, [growthPoolBalance]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_GROWTH_CONTRIBUTIONS, JSON.stringify(growthPoolContributions));
    } catch (err) {
      console.warn('Failed to save growth contributions', err);
    }
  }, [growthPoolContributions]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CUSTOMER_CREDITS, customerCredits.toString());
    } catch (err) {
      console.warn('Failed to save customer credits', err);
    }
  }, [customerCredits]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CUSTOMER_CREDIT_HISTORY, JSON.stringify(customerCreditHistory));
    } catch (err) {
      console.warn('Failed to save customer credit history', err);
    }
  }, [customerCreditHistory]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TRUSTED_NETWORK, JSON.stringify(trustedNetwork));
    } catch (err) {
      console.warn('Failed to save trusted network', err);
    }
  }, [trustedNetwork]);

  // Synchronize role with URL path when navigating directly or using browser back/forward
  useEffect(() => {
    if (location.pathname.startsWith('/worker')) {
      if (role !== 'worker') {
        setRoleState('worker');
        try { localStorage.setItem(STORAGE_KEY_ROLE, 'worker'); } catch {}
      }
    } else if (location.pathname === '/coop' || location.pathname === '/admin' || location.pathname === '/coop-dashboard') {
      if (role !== 'admin') {
        setRoleState('admin');
        try { localStorage.setItem(STORAGE_KEY_ROLE, 'admin'); } catch {}
      }
    } else if (
      location.pathname === '/' ||
      location.pathname === '/services' ||
      location.pathname.startsWith('/bookings') ||
      location.pathname.startsWith('/provider') ||
      location.pathname === '/network' ||
      location.pathname === '/credits'
    ) {
      if (role !== 'customer') {
        setRoleState('customer');
        try { localStorage.setItem(STORAGE_KEY_ROLE, 'customer'); } catch {}
      }
    }
  }, [location.pathname, role]);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    try {
      localStorage.setItem(STORAGE_KEY_ROLE, newRole);
    } catch (err) {
      console.warn('Failed to save role', err);
    }
    // Navigate cleanly according to new role
    if (newRole === 'worker') {
      navigate(activeWorkerId ? `/worker/${activeWorkerId}` : '/worker');
      showToast('Switched to Worker: Arjun Raj (Arjun AC Services)');
    } else if (newRole === 'admin') {
      navigate('/coop');
      showToast('Switched to Admin: Local Cooperative Oversight');
    } else {
      if (location.pathname.startsWith('/worker') || location.pathname.startsWith('/coop') || location.pathname.startsWith('/admin')) {
        navigate('/');
      }
      showToast('Switched to Customer: Arun Kumar');
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  const createBooking = (details: {
    provider: Provider;
    serviceName: string;
    scheduledTime: string;
    location: string;
    price: number;
    notes?: string;
  }): Booking => {
    const newBooking: Booking = {
      id: `CS-${Date.now().toString().slice(-5)}`,
      providerId: details.provider.id,
      providerName: details.provider.professionalName,
      businessName: details.provider.businessName,
      customerName: DEMO_CUSTOMER.name,
      customerPhone: DEMO_CUSTOMER.phone,
      serviceName: details.serviceName,
      category: details.provider.category,
      location: details.location,
      scheduledTime: details.scheduledTime,
      price: details.price,
      status: 'Requested',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
      notes: details.notes || 'AC cooling diminished, requires thorough jet sanitization.',
      isProtected: true,
      protectedBookingFee: 25,
      paymentStatus: 'Unpaid',
      timeline: {
        requestedAt: 'Just now',
      },
    };

    setBookings((prev) => [newBooking, ...prev]);
    showToast(`Service requested from ${details.provider.businessName}! Status: Requested.`);
    return newBooking;
  };

  const updateBookingStatus = (bookingId: string, status: BookingStatus) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        const updatedTimeline = { ...b.timeline };
        if (status === 'Accepted') updatedTimeline.acceptedAt = `${timestamp}, Today`;
        if (status === 'In Progress') updatedTimeline.startedAt = `${timestamp}, Today`;
        if (status === 'Completed') updatedTimeline.completedAt = `${timestamp}, Today`;

        return {
          ...b,
          status,
          timeline: updatedTimeline,
        };
      })
    );

    if (status === 'Accepted') {
      showToast('Booking Accepted by Arjun Raj. Next: Start Service.');
    } else if (status === 'In Progress') {
      showToast('Service started at Customer location (In Progress).');
    } else if (status === 'Completed') {
      showToast('Service Completed! Customer can now Complete Protected Payment (₹525).');
    }
  };

  // Stage 3 Methods
  const completeProtectedPayment = (bookingId: string) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const invoiceId = 'CS-INV-1042';

    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        const sPrice = b.price || 500;
        const bFee = b.isRepeatBooking ? 10 : (b.protectedBookingFee || 25);
        const opFee = b.isRepeatBooking ? 5 : 15;
        const commGrowth = b.isRepeatBooking ? 5 : 10;
        return {
          ...b,
          paymentStatus: 'Paid',
          paymentBreakdown: {
            servicePrice: sPrice,
            bookingFee: bFee,
            totalPaid: sPrice + bFee,
            workerEarnings: sPrice,
            coserveOperations: opFee,
            communityGrowth: commGrowth,
            paidAt: `${timestamp}, Today`,
            invoiceId,
          },
        };
      })
    );

    // Increment Community Growth Pool (+10)
    setGrowthPoolBalance((prev) => prev + 10);
    const newContrib: CommunityContribution = {
      id: `cont-${Date.now().toString().slice(-4)}`,
      amount: 10,
      service: 'AC General Service',
      customerName: DEMO_CUSTOMER.name,
      workerName: 'Arjun AC Services',
      date: `${timestamp}, Today`,
      isLatest: true,
    };
    setGrowthPoolContributions((prev) => [newContrib, ...prev]);

    // Increment Customer CoServe Loyalty Credits (+25)
    setCustomerCredits((prev) => prev + 25);
    const newCreditTx: CustomerCreditTransaction = {
      id: `cch-${Date.now().toString().slice(-4)}`,
      amount: 25,
      description: 'Protected Booking Reward (AC General Service)',
      date: 'Just now',
      type: 'credit',
    };
    setCustomerCreditHistory((prev) => [newCreditTx, ...prev]);

    showToast('Protected Payment Settled! ₹500 to Arjun, ₹15 Operations, ₹10 to Community Pool.');
  };

  const rateBooking = (bookingId: string, stars: number, tags: string[]) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          rating: {
            stars,
            tags,
            reviewedAt: 'Just now, Today',
          },
        };
      })
    );
    showToast(`Thank you! Rated ${stars} Stars for Arjun AC Services.`);
  };

  const addToTrustedNetwork = (booking: Booking) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === booking.id ? { ...b, inTrustedNetwork: true } : b))
    );

    setTrustedNetwork((prev) => {
      if (prev.some((item) => item.businessName === booking.businessName)) {
        return prev;
      }
      const newItem: TrustedNetworkItem = {
        id: `tn-${Date.now().toString().slice(-4)}`,
        providerId: booking.providerId,
        businessName: booking.businessName,
        professionalName: booking.providerName,
        trade: 'AC Service & HVAC Specialist',
        category: booking.category,
        rating: 5.0,
        completedJobsWithYou: 1,
        lastServiceDate: 'Today',
        availability: 'Available Today',
        baseServicePrice: 500,
        repeatBookingFee: 10, // ₹10 repeat fee!
        totalRepeatPrice: 510,
        addedAt: 'Today',
      };
      return [newItem, ...prev];
    });

    showToast(`Added ${booking.businessName} to My Trusted Network!`);
  };

  const createRepeatBooking = (trustedItem: TrustedNetworkItem): Booking => {
    const targetProvider = providers.find((p) => p.id === trustedItem.providerId) || providers[0];
    const newBooking: Booking = {
      id: `CS-${Date.now().toString().slice(-5)}`,
      providerId: targetProvider.id,
      providerName: trustedItem.professionalName,
      businessName: trustedItem.businessName,
      customerName: DEMO_CUSTOMER.name,
      customerPhone: DEMO_CUSTOMER.phone,
      serviceName: 'AC General Service',
      category: trustedItem.category,
      location: DEMO_CUSTOMER.address,
      scheduledTime: 'Tomorrow, 10:30 AM',
      price: trustedItem.baseServicePrice,
      status: 'Requested',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
      notes: 'Repeat booking via My Trusted Network (₹10 Repeat Protection Fee applied).',
      isProtected: true,
      isRepeatBooking: true,
      protectedBookingFee: 10, // ₹10 fee
      paymentStatus: 'Unpaid',
      inTrustedNetwork: true,
      timeline: {
        requestedAt: 'Just now',
      },
    };

    setBookings((prev) => [newBooking, ...prev]);
    showToast(`Repeat appointment requested with ${trustedItem.businessName}! Repeat fee ₹10 applied.`);
    return newBooking;
  };

  const raiseDisputeIssue = (bookingId: string, reason: string, description: string) => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          disputeCase: {
            caseId: 'CS-1042',
            reason,
            description,
            status: 'Under Cooperative Review',
            createdAt: `${timestamp}, Today`,
            timeline: {
              submittedAt: `${timestamp}, Today`,
              reviewStartedAt: 'Under Active Cooperative Review',
            },
          },
        };
      })
    );
    showToast('Dispute Case CS-1042 raised. Ward Cooperative Steward assigned.');
  };

  const requestReplacement = (bookingId: string, alternativeProvider: Provider) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          providerId: alternativeProvider.id,
          providerName: alternativeProvider.professionalName,
          businessName: alternativeProvider.businessName,
          notes: `Replacement reassigned to verified artisan ${alternativeProvider.businessName} via Cooperative Guarantee.`,
        };
      })
    );
    showToast(`Replacement assigned: ${alternativeProvider.businessName}!`);
  };

  const joinCommunityCluster = () => {
    setCluster((prev) => {
      const isCurrentlyJoined = prev.userJoined;
      if (isCurrentlyJoined) {
        // Leave
        const filtered = prev.households.filter((h) => !h.isCurrentUser);
        showToast('You left the community cluster.');
        return {
          ...prev,
          userJoined: false,
          households: filtered,
          status: 'Cluster Formed',
        };
      } else {
        // Join
        const userHousehold = {
          id: `req-user-${Date.now().toString().slice(-4)}`,
          name: DEMO_CUSTOMER.name,
          location: DEMO_CUSTOMER.address,
          distanceKm: 0.5,
          service: prev.serviceName,
          timeWindow: 'Tomorrow, 11:30 AM – 12:30 PM',
          joinedAt: 'Just now',
          isCurrentUser: true,
        };
        showToast('You joined this cluster! Aggregated demand unlocked.');
        return {
          ...prev,
          userJoined: true,
          households: [...prev.households, userHousehold],
        };
      }
    });
  };

  const acceptCommunityCluster = () => {
    setCluster((prev) => ({
      ...prev,
      workerAccepted: true,
      status: 'Accepted by Worker',
      acceptedByWorkerName: worker.name,
    }));
    showToast(`Cluster Accepted by ${worker.businessName}! 3-4 Households scheduled.`);
  };

  const createCoopTeam = (data: { name: string; locality: string; services: string[] }) => {
    const newTeam: CooperativeTeam = {
      id: `team-${Date.now().toString().slice(-4)}`,
      name: data.name,
      tagline: 'Cooperative guild formed by independent licensed professionals.',
      locality: data.locality,
      rating: 5.0,
      completedJobs: 1,
      members: [
        {
          id: 'tm-lead',
          name: worker.name,
          businessName: worker.businessName,
          trade: worker.trade,
          rating: worker.rating,
          completedJobs: worker.completedJobs,
          identityVerified: true,
          skillVerified: true,
          cooperativeMember: true,
        },
      ],
      services: data.services.length > 0 ? data.services : ['HVAC', 'Electrical Maintenance'],
      combinedPackages: [
        {
          id: `pkg-${Date.now().toString().slice(-3)}`,
          title: `${data.name} Integrated Support`,
          description: 'Custom cooperative multi-trade service managed under unified guild escrow warranty.',
          includedTrades: data.services,
          startingPrice: 6500,
          estimatedDays: '1 - 2 Days',
        },
      ],
    };

    setCooperativeTeams((prev) => [newTeam, ...prev]);
    showToast(`Cooperative team "${data.name}" successfully created!`);
  };

  const requestCoopTeam = (details: { teamId: string; packageName: string; price: number }) => {
    const targetTeam = cooperativeTeams.find((t) => t.id === details.teamId) || cooperativeTeams[0];
    const newReq: TeamServiceRequest = {
      id: `TR-${Date.now().toString().slice(-5)}`,
      teamId: targetTeam.id,
      teamName: targetTeam.name,
      packageName: details.packageName,
      customerName: DEMO_CUSTOMER.name,
      customerPhone: DEMO_CUSTOMER.phone,
      location: DEMO_CUSTOMER.address,
      price: details.price,
      status: 'Requested',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
    };

    setTeamRequests((prev) => [newReq, ...prev]);
    showToast(`Team Request Sent for ${details.packageName}! Co-op team notified.`);
  };

  const sendWorkerInvitation = (workerName: string, workerTrade: string, teamName: string) => {
    const newInvite: WorkerInvitation = {
      id: `inv-${Date.now().toString().slice(-4)}`,
      invitedWorkerName: workerName,
      invitedWorkerTrade: workerTrade,
      teamName,
      sentAt: 'Just now',
      status: 'Pending Response',
    };

    setWorkerInvitations((prev) => [newInvite, ...prev]);
    showToast(`Invitation sent to ${workerName} (${workerTrade})!`);
  };

  const redeemGrowthCredits = (amount: number, itemTitle: string): boolean => {
    if (growthCredits < amount) {
      showToast('Insufficient Growth Credits balance.');
      return false;
    }
    setGrowthCredits((prev) => prev - amount);
    setRedeemedGrowthItems((prev) => [itemTitle, ...prev]);
    showToast(`Redeemed ${amount} Growth Credits for "${itemTitle}"!`);
    return true;
  };

  // Complete Canonical Reset Demo Implementation
  const performActualReset = () => {
    try {
      COSERVE_STORAGE_KEYS.forEach((key) => {
        localStorage.removeItem(key);
      });
      // Thoroughly clear any additional coserve-prefixed localStorage items
      if (typeof window !== 'undefined' && window.localStorage) {
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k && k.toLowerCase().includes('coserve')) {
            keysToRemove.push(k);
          }
        }
        keysToRemove.forEach((k) => localStorage.removeItem(k));
      }
    } catch {
      // ignore
    }

    const canonicalState = getCanonicalDemoState();

    // 1. Reset bookings to completely clear queue state
    setBookings([]);

    // 2. Reset Stage 2 & 3 states to canonical
    setCluster(canonicalState.cluster);
    setCooperativeTeams(canonicalState.cooperativeTeams);
    setTeamRequests([]);
    setWorkerInvitations([]);
    setGrowthCredits(canonicalState.growthCredits);
    setRedeemedGrowthItems(canonicalState.redeemedGrowthItems);
    setGrowthPoolBalance(canonicalState.growthPoolBalance);
    setGrowthPoolContributions(canonicalState.growthPoolContributions);
    setCustomerCredits(canonicalState.customerCredits);
    setCustomerCreditHistory(canonicalState.customerCreditHistory);
    setTrustedNetwork(canonicalState.trustedNetwork);

    // 3. Reset roles & perspective
    setRoleState(canonicalState.role);
    setActiveWorkerIdState(canonicalState.activeWorkerId);

    // 4. Reset views & filters
    setActiveTab('home');
    setSelectedProvider(null);
    setSelectedCategoryFilter('all');
    setSelectedLocalityFilter('All Localities');

    // 5. Close all modals
    setFairMatchModalProvider(null);
    setBookingModalProvider(null);
    setPaymentModalBooking(null);
    setInvoiceModalBooking(null);
    setRatingModalBooking(null);
    setDisputeModalBooking(null);
    setReplacementModalBooking(null);
    setIsChooseProfessionalModalOpen(false);
    setTestBookingModalOpen(false);

    // 6. Navigate to Home
    if (location.pathname !== '/') {
      navigate('/');
    }

    showToast('CoServe has been restored to its original demonstration state.');
  };

  // User clicks "Reset Demo" anywhere -> opens confirmation modal
  const resetDemoData = () => {
    setResetStatus('confirm');
    setIsResetModalOpen(true);
  };

  const confirmResetDemo = () => {
    setResetStatus('resetting');
    setTimeout(() => {
      performActualReset();
      setResetStatus('ready');
      setTimeout(() => {
        setIsResetModalOpen(false);
        setResetStatus('confirm');
      }, 700);
    }, 400);
  };

  const cancelResetDemo = () => {
    setIsResetModalOpen(false);
    setResetStatus('confirm');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        activeTab,
        setActiveTab,
        navigate: navigateTo,
        goBack,
        customer: DEMO_CUSTOMER,
        worker,
        activeWorkerId,
        setActiveWorkerId,
        admin: DEMO_ADMIN,
        providers,
        bookings,
        selectedProvider,
        setSelectedProvider,
        fairMatchModalProvider,
        setFairMatchModalProvider,
        bookingModalProvider,
        setBookingModalProvider,
        createBooking,
        updateBookingStatus,
        resetDemoData,
        isResetModalOpen,
        setIsResetModalOpen,
        resetStatus,
        confirmResetDemo,
        cancelResetDemo,
        toastMessage,
        showToast,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        selectedLocalityFilter,
        setSelectedLocalityFilter,
        cluster,
        joinCommunityCluster,
        acceptCommunityCluster,
        cooperativeTeams,
        createCoopTeam,
        teamRequests,
        requestCoopTeam,
        workerInvitations,
        sendWorkerInvitation,
        growthCredits,
        redeemGrowthCredits,
        redeemedGrowthItems,
        growthPoolBalance,
        growthPoolContributions,
        growthPoolAllocations,
        customerCredits,
        customerCreditHistory,
        trustedNetwork,
        completeProtectedPayment,
        rateBooking,
        addToTrustedNetwork,
        createRepeatBooking,
        raiseDisputeIssue,
        requestReplacement,
        paymentModalBooking,
        setPaymentModalBooking,
        invoiceModalBooking,
        setInvoiceModalBooking,
        ratingModalBooking,
        setRatingModalBooking,
        disputeModalBooking,
        setDisputeModalBooking,
        replacementModalBooking,
        setReplacementModalBooking,
        isChooseProfessionalModalOpen,
        setIsChooseProfessionalModalOpen,
        isTestBookingModalOpen,
        setTestBookingModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
