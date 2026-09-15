import { calculateFairMatchScore } from './fairMatchData';
import { INITIAL_PROVIDERS } from './providers';
import { Provider } from '../types';

export interface BookingServiceJob {
  name: string;
  price: number;
  description: string;
}

export interface BookingCategory {
  id: 'ac' | 'electrical' | 'plumbing';
  name: string;
  shortName: string;
  iconName: 'Snowflake' | 'Zap' | 'Wrench';
  badge: string;
  accentColor: string;
  jobs: BookingServiceJob[];
}

export interface FactorBreakdown {
  skillMatch: number;
  proximity: number;
  availability: number;
  reliability: number;
  currentWorkload: number;
  opportunityFairness: number;
}

export interface FairMatchBookingCandidate {
  id: string; // Stable provider ID (e.g. 'prov-arjun-ac')
  workerKey?: 'arjun' | 'ravi' | 'kumar';
  name: string;
  business: string;
  trade: string;
  distanceKm: number;
  distanceText: string;
  rating: number;
  completedJobs: number;
  availabilityText: string;
  isAvailableToday: boolean;
  workloadJobsThisWeek: number;
  whyMatchSummary: string;
  isWinner: boolean;
  scores: FactorBreakdown & { overall: number };
}

export const FAIRMATCH_BOOKING_CATEGORIES: BookingCategory[] = [
  {
    id: 'ac',
    name: 'AC Services',
    shortName: 'AC Services',
    iconName: 'Snowflake',
    badge: 'HVAC & Refrigeration',
    accentColor: '#CCFF00',
    jobs: [
      { name: 'AC General Service', price: 500, description: 'Complete filter, cooling coil jet cleaning & basic diagnostic check.' },
      { name: 'AC Not Cooling', price: 600, description: 'Refrigerant pressure diagnostic, capillary check & leak inspection.' },
      { name: 'AC Maintenance', price: 550, description: 'Drain line sanitization, electrical terminal tightening & condenser wash.' },
    ],
  },
  {
    id: 'electrical',
    name: 'Electrical Services',
    shortName: 'Electrical',
    iconName: 'Zap',
    badge: 'Power & Wiring',
    accentColor: '#CCFF00',
    jobs: [
      { name: 'Fan Installation', price: 400, description: 'Ceiling/exhaust fan mounting, regulator wiring & balancing test.' },
      { name: 'Electrical Repair', price: 350, description: 'Short circuit diagnosis, MCB tripping resolution & wire replacement.' },
      { name: 'Socket Replacement', price: 300, description: 'Modular switchboard repair, power socket earthing & safety checks.' },
    ],
  },
  {
    id: 'plumbing',
    name: 'Plumbing Services',
    shortName: 'Plumbing',
    iconName: 'Wrench',
    badge: 'Pipes & Sanitary',
    accentColor: '#CCFF00',
    jobs: [
      { name: 'Tap Leakage Repair', price: 300, description: 'Spindle replacement, washer reseating & brass mixer servicing.' },
      { name: 'Bathroom Pipe Repair', price: 450, description: 'Concealed pipe pressure testing, joint sealing & shower valve repair.' },
      { name: 'Kitchen Sink Repair', price: 400, description: 'Waste coupling clearing, trap replacement & anti-clog pipe jetting.' },
    ],
  },
];

// Baseline candidate profiles per category
interface CandidatePoolEntry {
  category: 'ac' | 'electrical' | 'plumbing';
  candidates: (Omit<FairMatchBookingCandidate, 'scores'> & { baseFactors: FactorBreakdown })[];
}

const SEEDED_CANDIDATE_POOLS: CandidatePoolEntry[] = [
  // AC CANDIDATES (Arjun Raj must be deterministic #1)
  {
    category: 'ac',
    candidates: [
      {
        id: 'prov-arjun-ac',
        workerKey: 'arjun',
        name: 'Arjun Raj',
        business: 'Arjun AC Services',
        trade: 'AC Technician',
        distanceKm: 1.1,
        distanceText: '1.1 km away • Anna Nagar',
        rating: 4.8,
        completedJobs: 127,
        availabilityText: 'Available Today',
        isAvailableToday: true,
        workloadJobsThisWeek: 4,
        isWinner: true,
        whyMatchSummary: 'Excellent skill fit • Nearby • Available • Strong reliability',
        baseFactors: {
          skillMatch: 100,
          proximity: 94,
          availability: 100,
          reliability: 91,
          currentWorkload: 84,
          opportunityFairness: 89,
        },
      },
      {
        id: 'prov-vikram-ac',
        name: 'Vikram S.',
        business: 'Vikram Cooling Solutions',
        trade: 'AC Technician',
        distanceKm: 2.0,
        distanceText: '2.0 km away • Anna Nagar West',
        rating: 4.7,
        completedJobs: 94,
        availabilityText: 'Available Today',
        isAvailableToday: true,
        workloadJobsThisWeek: 6,
        isWinner: false,
        whyMatchSummary: 'Certified split AC technician • Balanced weekly load • Reliable repeat history',
        baseFactors: {
          skillMatch: 90,
          proximity: 84,
          availability: 95,
          reliability: 88,
          currentWorkload: 80,
          opportunityFairness: 88,
        },
      },
      {
        id: 'prov-santhosh-ac',
        name: 'Santhosh R.',
        business: 'SR Cooling Care',
        trade: 'AC Technician',
        distanceKm: 2.8,
        distanceText: '2.8 km away • Kilpauk',
        rating: 4.6,
        completedJobs: 76,
        availabilityText: 'Available',
        isAvailableToday: true,
        workloadJobsThisWeek: 3,
        isWinner: false,
        whyMatchSummary: 'High opportunity fairness rotation • Low fatigue buffer • Good customer feedback',
        baseFactors: {
          skillMatch: 84,
          proximity: 74,
          availability: 90,
          reliability: 85,
          currentWorkload: 92,
          opportunityFairness: 90,
        },
      },
    ],
  },
  // ELECTRICAL CANDIDATES (Ravi Kumar must be deterministic #1)
  {
    category: 'electrical',
    candidates: [
      {
        id: 'prov-ravi-elec',
        workerKey: 'ravi',
        name: 'Ravi Kumar',
        business: 'Ravi Electrical Services',
        trade: 'Electrician',
        distanceKm: 1.4,
        distanceText: '1.4 km away • T. Nagar',
        rating: 4.9,
        completedJobs: 182,
        availabilityText: 'Available Today',
        isAvailableToday: true,
        workloadJobsThisWeek: 5,
        isWinner: true,
        whyMatchSummary: 'Licensed wireman • High safety record • Rapid slot confirmation',
        baseFactors: {
          skillMatch: 100,
          proximity: 91,
          availability: 100,
          reliability: 96,
          currentWorkload: 82,
          opportunityFairness: 88,
        },
      },
      {
        id: 'prov-karthik-elec',
        name: 'Karthik M.',
        business: 'Karthik Electrical Works',
        trade: 'Electrician',
        distanceKm: 1.8,
        distanceText: '1.8 km away • Shenoy Nagar',
        rating: 4.7,
        completedJobs: 88,
        availabilityText: 'Available Today',
        isAvailableToday: true,
        workloadJobsThisWeek: 4,
        isWinner: false,
        whyMatchSummary: 'Verified switchgear & wiring tools • Close radius • Low fatigue buffer',
        baseFactors: {
          skillMatch: 88,
          proximity: 86,
          availability: 96,
          reliability: 88,
          currentWorkload: 86,
          opportunityFairness: 87,
        },
      },
      {
        id: 'prov-suresh-elec',
        name: 'Suresh B.',
        business: 'SB Home Electricals',
        trade: 'Electrician',
        distanceKm: 2.6,
        distanceText: '2.6 km away • Kodambakkam',
        rating: 4.6,
        completedJobs: 68,
        availabilityText: 'Available',
        isAvailableToday: true,
        workloadJobsThisWeek: 3,
        isWinner: false,
        whyMatchSummary: 'High opportunity fairness rotation • Dependable neighborhood ratings',
        baseFactors: {
          skillMatch: 84,
          proximity: 74,
          availability: 90,
          reliability: 84,
          currentWorkload: 90,
          opportunityFairness: 89,
        },
      },
    ],
  },
  // PLUMBING CANDIDATES (Kumar must be deterministic #1)
  {
    category: 'plumbing',
    candidates: [
      {
        id: 'prov-kumar-plumb',
        workerKey: 'kumar',
        name: 'Kumar',
        business: 'Kumar Plumbing Services',
        trade: 'Plumber',
        distanceKm: 1.6,
        distanceText: '1.6 km away • Adyar',
        rating: 4.9,
        completedJobs: 215,
        availabilityText: 'Available Today',
        isAvailableToday: true,
        workloadJobsThisWeek: 5,
        isWinner: true,
        whyMatchSummary: 'Master plumbing license • Hydrostatic pressure diagnostic tools • Top repeat trust',
        baseFactors: {
          skillMatch: 100,
          proximity: 90,
          availability: 100,
          reliability: 97,
          currentWorkload: 85,
          opportunityFairness: 87,
        },
      },
      {
        id: 'prov-manoj-plumb',
        name: 'Manoj K.',
        business: 'Manoj Plumbing Works',
        trade: 'Plumber',
        distanceKm: 1.5,
        distanceText: '1.5 km away • Chintamani',
        rating: 4.7,
        completedJobs: 92,
        availabilityText: 'Available Today',
        isAvailableToday: true,
        workloadJobsThisWeek: 4,
        isWinner: false,
        whyMatchSummary: 'Sanitary & drainage repair specialist • Close proximity • Good response rate',
        baseFactors: {
          skillMatch: 90,
          proximity: 88,
          availability: 96,
          reliability: 88,
          currentWorkload: 88,
          opportunityFairness: 88,
        },
      },
      {
        id: 'prov-dinesh-plumb',
        name: 'Dinesh R.',
        business: 'DR Home Plumbing',
        trade: 'Plumber',
        distanceKm: 2.4,
        distanceText: '2.4 km away • Arumbakkam',
        rating: 4.6,
        completedJobs: 74,
        availabilityText: 'Available',
        isAvailableToday: true,
        workloadJobsThisWeek: 3,
        isWinner: false,
        whyMatchSummary: 'Anti-monopoly rotation priority • Low weekly workload • Verified pipe fittings',
        baseFactors: {
          skillMatch: 84,
          proximity: 76,
          availability: 90,
          reliability: 85,
          currentWorkload: 91,
          opportunityFairness: 89,
        },
      },
    ],
  },
] as any[];

/**
 * Deterministic FairMatch evaluation for a specific job selection.
 * Evaluates candidate factors, applies the shared scoring formula,
 * and returns the top 3 ranked professionals with full score breakdowns.
 */
export function evaluateFairMatchCandidates(
  categoryKey: 'ac' | 'electrical' | 'plumbing',
  jobName: string
): FairMatchBookingCandidate[] {
  const poolData = SEEDED_CANDIDATE_POOLS.find((p) => p.category === categoryKey);
  if (!poolData) return [];

  // Map each candidate and calculate their FairMatch overall score
  const results: FairMatchBookingCandidate[] = poolData.candidates.map((cand: any, idx: number) => {
    // Keep #1 strictly at 100% skill match for primary demo consistency
    const factors: FactorBreakdown = {
      skillMatch: cand.baseFactors.skillMatch,
      proximity: cand.baseFactors.proximity,
      availability: cand.baseFactors.availability,
      reliability: cand.baseFactors.reliability,
      currentWorkload: cand.baseFactors.currentWorkload,
      opportunityFairness: cand.baseFactors.opportunityFairness,
    };

    // Calculate score with shared algorithm
    const overall = calculateFairMatchScore(factors);

    return {
      id: cand.id,
      workerKey: cand.workerKey,
      name: cand.name,
      business: cand.business,
      trade: cand.trade,
      distanceKm: cand.distanceKm,
      distanceText: cand.distanceText,
      rating: cand.rating,
      completedJobs: cand.completedJobs,
      availabilityText: cand.availabilityText,
      isAvailableToday: cand.isAvailableToday,
      workloadJobsThisWeek: cand.workloadJobsThisWeek,
      isWinner: idx === 0,
      whyMatchSummary: cand.whyMatchSummary,
      scores: {
        ...factors,
        overall,
      },
    };
  });

  // Sort deterministically by overall score descending
  return results.sort((a, b) => b.scores.overall - a.scores.overall);
}

/**
 * Resolves a full Provider object for booking creation.
 * If the candidate corresponds to one of the 3 primary verified providers,
 * it returns the real INITIAL_PROVIDERS entry.
 * If it is one of the additional seeded candidates, it constructs a valid Provider.
 */
export function getProviderForBookingCandidate(
  candidate: FairMatchBookingCandidate,
  categoryKey: 'ac' | 'electrical' | 'plumbing'
): Provider {
  const existing = INITIAL_PROVIDERS.find((p) => p.id === candidate.id);
  if (existing) {
    return existing;
  }

  const categoryName =
    categoryKey === 'ac'
      ? 'Home Repair & Maintenance'
      : categoryKey === 'electrical'
      ? 'Home Repair & Maintenance'
      : 'Home Repair & Maintenance';

  return {
    id: candidate.id,
    businessName: candidate.business,
    professionalName: candidate.name,
    category: categoryName,
    serviceTypes: [candidate.trade],
    location: candidate.distanceText.split('•')[1]?.trim() || 'Chennai',
    distanceKm: candidate.distanceKm,
    rating: candidate.rating,
    reviewCount: Math.round(candidate.completedJobs * 0.35),
    completedJobs: candidate.completedJobs,
    repeatCustomerRate: 88,
    availability: 'Available Today',
    isAvailableToday: true,
    startingPrice: 350,
    serviceRadiusKm: 5,
    badges: {
      identityVerified: true,
      skillVerified: true,
      cooperativeMember: true,
    },
    specializations: [candidate.trade],
    recentWorkload:
      candidate.workloadJobsThisWeek <= 3
        ? 'Low / 2 jobs this week'
        : candidate.workloadJobsThisWeek <= 5
        ? 'Optimal / 4 jobs this week'
        : 'Moderate / 6 jobs this week',
    bio: `${candidate.trade} serving residential neighbourhoods. Registered with CoServe Civic Trade Guild.`,
    experienceYears: 6,
    cooperativeUnit: 'Ward 102 Community Service Cooperative',
    avatarSeed: candidate.name,
    fairMatch: {
      overall: candidate.scores.overall,
      skillMatch: candidate.scores.skillMatch,
      proximity: candidate.scores.proximity,
      availability: candidate.scores.availability,
      reliability: candidate.scores.reliability,
      currentWorkload: candidate.scores.currentWorkload,
      opportunityFairness: candidate.scores.opportunityFairness,
      explanation: candidate.whyMatchSummary,
    },
    reviews: [],
  };
}
