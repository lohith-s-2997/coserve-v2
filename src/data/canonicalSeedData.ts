import {
  UserRole,
  Booking,
  ActiveCustomer,
  ActiveWorker,
  ActiveAdmin,
  DemandCluster,
  CooperativeTeam,
  CommunityContribution,
  CustomerCreditTransaction,
  TrustedNetworkItem,
} from '../types';
import { INITIAL_DEMAND_CLUSTER, INITIAL_COOP_TEAMS } from './stage2Data';
import {
  INITIAL_GROWTH_POOL_BALANCE,
  INITIAL_COMMUNITY_ALLOCATIONS,
  INITIAL_COMMUNITY_CONTRIBUTIONS,
  INITIAL_CUSTOMER_CREDITS,
  INITIAL_CUSTOMER_CREDIT_HISTORY,
  INITIAL_TRUSTED_NETWORK,
} from './stage3Data';
import { INITIAL_PROVIDERS } from './providers';

// LocalStorage Keys for CoServe Demo State
export const COSERVE_STORAGE_KEYS = [
  'coserve_demo_bookings_v2',
  'coserve_demo_role_v2',
  'coserve_active_worker_id_v1',
  'coserve_demo_cluster_v2',
  'coserve_demo_teams_v2',
  'coserve_demo_team_requests_v2',
  'coserve_demo_invitations_v2',
  'coserve_demo_growth_credits_v2',
  'coserve_demo_redeemed_v2',
  'coserve_demo_growth_balance_v3',
  'coserve_demo_growth_contributions_v3',
  'coserve_demo_customer_credits_v3',
  'coserve_demo_customer_credit_history_v3',
  'coserve_demo_trusted_network_v3',
] as const;

export const DEMO_CUSTOMER: ActiveCustomer = {
  name: 'Arun Kumar',
  locality: 'Anna Nagar',
  city: 'Chennai',
  phone: '+91 98401 23891',
  address: 'Flat 3B, Sunshine Apts, 2nd Avenue, Anna Nagar',
  avatarSeed: 'Arun Kumar',
};

export const DEMO_ADMIN: ActiveAdmin = {
  cooperativeName: 'Anna Nagar Cooperative',
  locality: 'Anna Nagar Zone VI',
  city: 'Chennai',
  memberCount: 84,
};

export const WORKER_PROFILES: Record<string, ActiveWorker> = {
  arjun: {
    id: 'arjun',
    name: 'Arjun Raj',
    businessName: 'Arjun AC Services',
    specialty: 'AC General Service & HVAC Solutions',
    locality: 'Anna Nagar',
    cooperativeUnit: 'Anna Nagar Ward 102 Service Cooperative',
    trade: 'AC Technician',
    rating: 4.8,
    completedJobs: 127,
    earningsBase: 24500,
  },
  ravi: {
    id: 'ravi',
    name: 'Ravi Kumar',
    businessName: 'Ravi Electrical Services',
    specialty: 'Electrical Wiring & Fan Installation',
    locality: 'T. Nagar',
    cooperativeUnit: 'Central Urban Trades Council',
    trade: 'Electrician',
    rating: 4.7,
    completedJobs: 98,
    earningsBase: 19200,
  },
  kumar: {
    id: 'kumar',
    name: 'Kumar',
    businessName: 'Kumar Plumbing Services',
    specialty: 'Leak Detection & Sanitary Fixture Repairs',
    locality: 'Adyar',
    cooperativeUnit: 'South District Home Care Guild',
    trade: 'Plumber',
    rating: 4.9,
    completedJobs: 142,
    earningsBase: 21800,
  },
};

export const CANONICAL_SEEDED_BOOKINGS: Booking[] = [];

export interface CanonicalDemoState {
  role: UserRole;
  activeWorkerId: string;
  bookings: Booking[];
  cluster: DemandCluster;
  cooperativeTeams: CooperativeTeam[];
  teamRequests: [];
  workerInvitations: [];
  growthCredits: number;
  redeemedGrowthItems: string[];
  growthPoolBalance: number;
  growthPoolContributions: CommunityContribution[];
  growthPoolAllocations: typeof INITIAL_COMMUNITY_ALLOCATIONS;
  customerCredits: number;
  customerCreditHistory: CustomerCreditTransaction[];
  trustedNetwork: TrustedNetworkItem[];
}

/**
 * Returns a pristine deep copy of the canonical demo state.
 */
export function getCanonicalDemoState(): CanonicalDemoState {
  return {
    role: 'customer',
    activeWorkerId: 'arjun',
    bookings: JSON.parse(JSON.stringify(CANONICAL_SEEDED_BOOKINGS)),
    cluster: JSON.parse(JSON.stringify(INITIAL_DEMAND_CLUSTER)),
    cooperativeTeams: JSON.parse(JSON.stringify(INITIAL_COOP_TEAMS)),
    teamRequests: [],
    workerInvitations: [],
    growthCredits: 1240,
    redeemedGrowthItems: [],
    growthPoolBalance: INITIAL_GROWTH_POOL_BALANCE,
    growthPoolContributions: JSON.parse(JSON.stringify(INITIAL_COMMUNITY_CONTRIBUTIONS)),
    growthPoolAllocations: JSON.parse(JSON.stringify(INITIAL_COMMUNITY_ALLOCATIONS)),
    customerCredits: INITIAL_CUSTOMER_CREDITS,
    customerCreditHistory: JSON.parse(JSON.stringify(INITIAL_CUSTOMER_CREDIT_HISTORY)),
    trustedNetwork: JSON.parse(JSON.stringify(INITIAL_TRUSTED_NETWORK)),
  };
}
