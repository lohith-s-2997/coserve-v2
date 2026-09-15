export interface FairMatchCriterion {
  id: string;
  name: string;
  weightPercent: number; // e.g. 25 for 25%
  weightFactor: number; // e.g. 0.25
  description: string;
  metricLabel: string;
  workerProtection: string;
  customerProtection: string;
}

export interface CandidateScores {
  skillMatch: number;
  proximity: number;
  availability: number;
  reliability: number;
  currentWorkload: number;
  opportunityFairness: number;
  overall: number;
}

export interface FairMatchCandidate {
  id: string;
  providerId?: string;
  name: string;
  business: string;
  trade: string;
  distanceKm: number;
  distanceText: string;
  availabilityText: string;
  isAvailableToday: boolean;
  isAvailableRequestedSlot: boolean;
  rating: number;
  completedJobs: number;
  repeatCustomerRate: number;
  workloadStatus: 'Low' | 'Optimal' | 'High';
  workloadJobsThisWeek: number;
  qualification: string;
  isWinner: boolean;
  scores: CandidateScores;
  explanationWhy: string;
  avatarSeed: string;
}

export interface FairMatchScenario {
  id: string;
  serviceName: string;
  serviceCategory: string;
  customerName: string;
  customerLocality: string;
  customerAddress: string;
  requestedSlot: string;
  requestedDate: string;
  tariffEstimate: number;
  winnerCandidateId: string;
  summaryExplanation: string;
  candidates: FairMatchCandidate[];
}

export const FAIRMATCH_CRITERIA: FairMatchCriterion[] = [
  {
    id: 'skill',
    name: 'SKILL MATCH',
    weightPercent: 25,
    weightFactor: 0.25,
    description: 'ITI Trade Certification, verified equipment inventory, and past task success for the requested job type.',
    metricLabel: 'Certified Competence & Tools',
    customerProtection: 'Ensures technician has verified trade credentials and tools for AC gas & coil diagnostics.',
    workerProtection: 'Protects artisans by valuing verified apprenticeship, ITI training, and specialized equipment.',
  },
  {
    id: 'proximity',
    name: 'PROXIMITY',
    weightPercent: 20,
    weightFactor: 0.2,
    description: 'Radial distance within residential neighborhood clusters, minimizing transit time and urban carbon footprint.',
    metricLabel: 'Transit Radius & Low-Carbon Reach',
    customerProtection: 'Reduces arrival latency and guarantees the technician operates locally within your ward.',
    workerProtection: 'Minimizes unpaid travel distance and fuel expenditure for local professionals.',
  },
  {
    id: 'availability',
    name: 'AVAILABILITY',
    weightPercent: 20,
    weightFactor: 0.2,
    description: 'Direct slot synchronization with the customer requested window without scheduling overlaps.',
    metricLabel: 'Schedule Alignment & Capacity',
    customerProtection: 'Eliminates waiting for busy professionals who cannot arrive during the requested slot.',
    workerProtection: 'Prevents double-booking and allows workers to maintain control of their working calendar.',
  },
  {
    id: 'reliability',
    name: 'RELIABILITY',
    weightPercent: 15,
    weightFactor: 0.15,
    description: 'Demonstrated completion rate, repeat neighborhood bookings, and verified customer reviews.',
    metricLabel: 'Repeat Trust & Escrow Integrity',
    customerProtection: 'Guarantees reliable service history backed by CoServe escrow dispute protection.',
    workerProtection: 'Builds permanent reputation equity that stays with the worker, not proprietary to an ad platform.',
  },
  {
    id: 'workload',
    name: 'CURRENT WORKLOAD',
    weightPercent: 10,
    weightFactor: 0.1,
    description: 'Active workload over the past 7 days to safeguard workers from fatigue and prevent rushed workmanship.',
    metricLabel: 'Fatigue Buffer & Focus Capacity',
    customerProtection: 'A rested, focused technician performs superior service compared to one running their 6th job of the day.',
    workerProtection: 'Guards against algorithmic overwork and preserves physical well-being and craft quality.',
  },
  {
    id: 'fairness',
    name: 'OPPORTUNITY FAIRNESS',
    weightPercent: 10,
    weightFactor: 0.1,
    description: 'Anti-monopoly work rotation among equally qualified local professionals to prevent single-provider crowding.',
    metricLabel: 'Cooperative Work Rotation',
    customerProtection: 'Builds a resilient, vibrant neighborhood network of multiple trusted local providers.',
    workerProtection: 'Ensures qualified local peers receive fair visibility rather than top ad spenders winning all jobs.',
  },
];

/**
 * Shared Deterministic FairMatch Scoring Engine
 * Used across the full FairMatch page and the Test Booking FairMatch flow.
 * Evaluates candidate scores using the 6 standardized ethical criteria weights (100% total).
 */
export function calculateFairMatchScore(scores: {
  skillMatch: number;
  proximity: number;
  availability: number;
  reliability: number;
  currentWorkload: number;
  opportunityFairness: number;
}): number {
  const weighted =
    scores.skillMatch * (FAIRMATCH_CRITERIA[0].weightPercent / 100) +
    scores.proximity * (FAIRMATCH_CRITERIA[1].weightPercent / 100) +
    scores.availability * (FAIRMATCH_CRITERIA[2].weightPercent / 100) +
    scores.reliability * (FAIRMATCH_CRITERIA[3].weightPercent / 100) +
    scores.currentWorkload * (FAIRMATCH_CRITERIA[4].weightPercent / 100) +
    scores.opportunityFairness * (FAIRMATCH_CRITERIA[5].weightPercent / 100);
  return Math.round(weighted);
}

export const PRIMARY_AC_SCENARIO: FairMatchScenario = {
  id: 'ac-general-service',
  serviceName: 'AC General Service',
  serviceCategory: 'Home Repair & Maintenance',
  customerName: 'Arun Kumar',
  customerLocality: 'Anna Nagar, Chennai',
  customerAddress: 'Door 14, 2nd Main Road, Ward 102',
  requestedSlot: 'Tomorrow • 10:30 AM',
  requestedDate: 'Tomorrow Morning',
  tariffEstimate: 500,
  winnerCandidateId: 'arjun-raj',
  summaryExplanation:
    'Arjun Raj is highly qualified for this AC service, is only 1.1 km away, is available in the requested time window, has strong service reliability, and currently has optimal capacity for the job.',
  candidates: [
    {
      id: 'arjun-raj',
      providerId: 'prov-arjun-ac',
      name: 'Arjun Raj',
      business: 'Arjun AC Services',
      trade: 'HVAC Specialist / ITI Certified',
      distanceKm: 1.1,
      distanceText: '1.1 km away • Anna Nagar',
      availabilityText: 'Available Today & Tomorrow Morning',
      isAvailableToday: true,
      isAvailableRequestedSlot: true,
      rating: 4.8,
      completedJobs: 127,
      repeatCustomerRate: 92,
      workloadStatus: 'Optimal',
      workloadJobsThisWeek: 4,
      qualification: 'ITI Refrigeration & AC Master, High-Pressure Jet Wash Equipment',
      isWinner: true,
      avatarSeed: 'Arjun Raj',
      explanationWhy:
        'Selected for exceptional skill fit (100%), close proximity (1.1 km), guaranteed slot availability, high reliability (4.8 ★ / 92% repeat), and balanced weekly workload.',
      scores: {
        skillMatch: 100,
        proximity: 94,
        availability: 100,
        reliability: 91,
        currentWorkload: 84,
        opportunityFairness: 89,
        overall: 93,
      },
    },
    {
      id: 'prakash-n',
      providerId: 'prov-prakash-ac',
      name: 'Prakash N.',
      business: 'Prakash CoolTech',
      trade: 'AC Technician',
      distanceKm: 2.2,
      distanceText: '2.2 km away • Anna Nagar West',
      availabilityText: 'Available Tomorrow Morning',
      isAvailableToday: true,
      isAvailableRequestedSlot: true,
      rating: 4.5,
      completedJobs: 64,
      repeatCustomerRate: 81,
      workloadStatus: 'Low',
      workloadJobsThisWeek: 2,
      qualification: 'Inverter Split AC Cleaning & Drain Pipe Clearing Certified',
      isWinner: false,
      avatarSeed: 'Prakash N',
      explanationWhy:
        'Strong candidate with high opportunity boost and low weekly workload, but slightly further distance (2.2 km) and fewer completed jobs.',
      scores: {
        skillMatch: 92,
        proximity: 78,
        availability: 100,
        reliability: 87,
        currentWorkload: 91,
        opportunityFairness: 86,
        overall: 87,
      },
    },
    {
      id: 'karthik-s',
      name: 'Karthik S.',
      business: 'Karthik AC Care',
      trade: 'Senior AC Technician',
      distanceKm: 0.9,
      distanceText: '0.9 km away • 2nd Avenue',
      availabilityText: 'Busy (Next Slot: Tomorrow 5 PM)',
      isAvailableToday: false,
      isAvailableRequestedSlot: false,
      rating: 4.9,
      completedJobs: 190,
      repeatCustomerRate: 95,
      workloadStatus: 'High',
      workloadJobsThisWeek: 12,
      qualification: 'Master HVAC Technician, Commercial & Residential Multi-Brand',
      isWinner: false,
      avatarSeed: 'Karthik S',
      explanationWhy:
        'High skill and nearest distance (0.9 km), but unavailable in the requested 10:30 AM window and already at heavy workload (12 jobs this week).',
      scores: {
        skillMatch: 96,
        proximity: 97,
        availability: 55,
        reliability: 94,
        currentWorkload: 62,
        opportunityFairness: 72,
        overall: 79,
      },
    },
    {
      id: 'suresh-m',
      name: 'Suresh M.',
      business: 'Metro Cooling Systems',
      trade: 'AC Service Technician',
      distanceKm: 3.0,
      distanceText: '3.0 km away • Kilpauk Border',
      availabilityText: 'Available Tomorrow',
      isAvailableToday: true,
      isAvailableRequestedSlot: true,
      rating: 4.7,
      completedJobs: 88,
      repeatCustomerRate: 88,
      workloadStatus: 'Optimal',
      workloadJobsThisWeek: 5,
      qualification: 'General AC Servicing & Gas Top-up Specialist',
      isWinner: false,
      avatarSeed: 'Suresh M',
      explanationWhy:
        'Solid all-round qualifications and availability, but positioned at the 3.0 km cluster perimeter.',
      scores: {
        skillMatch: 90,
        proximity: 68,
        availability: 95,
        reliability: 88,
        currentWorkload: 89,
        opportunityFairness: 85,
        overall: 84,
      },
    },
  ],
};

export const ELECTRICAL_SCENARIO: FairMatchScenario = {
  id: 'electrical-repair',
  serviceName: 'Electrical Repair & Wiring',
  serviceCategory: 'Home Repair & Maintenance',
  customerName: 'Arun Kumar',
  customerLocality: 'Anna Nagar, Chennai',
  customerAddress: 'Door 14, 2nd Main Road, Ward 102',
  requestedSlot: 'Today • 04:00 PM',
  requestedDate: 'Today Afternoon',
  tariffEstimate: 350,
  winnerCandidateId: 'ravi-kumar',
  summaryExplanation:
    'Ravi Kumar is a master wireman with high neighborhood reliability (4.9 ★), 1.4 km transit distance, verified safety equipment, and optimal capacity for immediate afternoon dispatch.',
  candidates: [
    {
      id: 'ravi-kumar',
      providerId: 'prov-ravi-elec',
      name: 'Ravi Kumar',
      business: 'Ravi Electrical Services',
      trade: 'Master Electrician / ITI Wireman',
      distanceKm: 1.4,
      distanceText: '1.4 km away • Anna Nagar',
      availabilityText: 'Available Today',
      isAvailableToday: true,
      isAvailableRequestedSlot: true,
      rating: 4.9,
      completedJobs: 182,
      repeatCustomerRate: 94,
      workloadStatus: 'Optimal',
      workloadJobsThisWeek: 5,
      qualification: 'Licensed Government Wireman, Fluke Testing Equipment',
      isWinner: true,
      avatarSeed: 'Ravi Kumar',
      explanationWhy:
        'Ranked #1 for safety qualification (100%), verified proximity, fast same-day slot confirmation, and cooperative guild standing.',
      scores: {
        skillMatch: 100,
        proximity: 91,
        availability: 100,
        reliability: 96,
        currentWorkload: 82,
        opportunityFairness: 88,
        overall: 93,
      },
    },
    {
      id: 'dinesh-v',
      name: 'Dinesh V.',
      business: 'Dinesh Power Solutions',
      trade: 'Residential Wireman',
      distanceKm: 1.2,
      distanceText: '1.2 km away • Shenoy Nagar',
      availabilityText: 'Available Today',
      isAvailableToday: true,
      isAvailableRequestedSlot: true,
      rating: 4.6,
      completedJobs: 73,
      repeatCustomerRate: 85,
      workloadStatus: 'Low',
      workloadJobsThisWeek: 3,
      qualification: 'Residential Switchboard & Inverter Installation',
      isWinner: false,
      avatarSeed: 'Dinesh V',
      explanationWhy:
        'Close distance and low workload provide strong fairness score, runner up to Ravi in specialized testing diagnostics.',
      scores: {
        skillMatch: 91,
        proximity: 93,
        availability: 98,
        reliability: 86,
        currentWorkload: 92,
        opportunityFairness: 90,
        overall: 91,
      },
    },
    {
      id: 'manoj-k',
      name: 'Manoj K.',
      business: 'Manoj Electricals',
      trade: 'Wiring Technician',
      distanceKm: 0.8,
      distanceText: '0.8 km away • 4th Avenue',
      availabilityText: 'Busy (Next: Tomorrow 11 AM)',
      isAvailableToday: false,
      isAvailableRequestedSlot: false,
      rating: 4.8,
      completedJobs: 140,
      repeatCustomerRate: 91,
      workloadStatus: 'High',
      workloadJobsThisWeek: 11,
      qualification: 'Appliance Repair & Lighting Specialist',
      isWinner: false,
      avatarSeed: 'Manoj K',
      explanationWhy:
        'Closest artisan (0.8 km) but currently committed to commercial panel installation today.',
      scores: {
        skillMatch: 94,
        proximity: 98,
        availability: 50,
        reliability: 92,
        currentWorkload: 64,
        opportunityFairness: 75,
        overall: 80,
      },
    },
    {
      id: 'selvan-r',
      name: 'Selvan R.',
      business: 'Selvan Spark Works',
      trade: 'Electrical Artisan',
      distanceKm: 2.8,
      distanceText: '2.8 km away • Arumbakkam',
      availabilityText: 'Available Today',
      isAvailableToday: true,
      isAvailableRequestedSlot: true,
      rating: 4.6,
      completedJobs: 60,
      repeatCustomerRate: 83,
      workloadStatus: 'Optimal',
      workloadJobsThisWeek: 4,
      qualification: 'General Electrical & Socket Repair',
      isWinner: false,
      avatarSeed: 'Selvan R',
      explanationWhy:
        'Dependable general electrician, located further out in the western residential perimeter.',
      scores: {
        skillMatch: 88,
        proximity: 72,
        availability: 95,
        reliability: 84,
        currentWorkload: 87,
        opportunityFairness: 86,
        overall: 83,
      },
    },
  ],
};

export const PLUMBING_SCENARIO: FairMatchScenario = {
  id: 'plumbing-repair',
  serviceName: 'Plumbing & Pipe Repair',
  serviceCategory: 'Home Repair & Maintenance',
  customerName: 'Arun Kumar',
  customerLocality: 'Anna Nagar, Chennai',
  customerAddress: 'Door 14, 2nd Main Road, Ward 102',
  requestedSlot: 'Today • 02:30 PM (Urgent)',
  requestedDate: 'Today Afternoon',
  tariffEstimate: 300,
  winnerCandidateId: 'kumar-p',
  summaryExplanation:
    'Kumar P. is an experienced licensed plumber located within 1.6 km with specialized pipe pressure and drain inspection tooling, available immediately for urgent dispatch with zero middlemen surcharge.',
  candidates: [
    {
      id: 'kumar-p',
      providerId: 'prov-kumar-plumb',
      name: 'Kumar P.',
      business: 'Kumar Plumbing Services',
      trade: 'Licensed Master Plumber',
      distanceKm: 1.6,
      distanceText: '1.6 km away • Anna Nagar East',
      availabilityText: 'Available Today (Immediate)',
      isAvailableToday: true,
      isAvailableRequestedSlot: true,
      rating: 4.9,
      completedJobs: 215,
      repeatCustomerRate: 96,
      workloadStatus: 'Optimal',
      workloadJobsThisWeek: 5,
      qualification: 'Hydrostatic Pressure Testing, Copper & CPVC Certified',
      isWinner: true,
      avatarSeed: 'Kumar P',
      explanationWhy:
        'Unmatched craft history (215 jobs, 96% repeat), urgent availability, and optimal weekly capacity.',
      scores: {
        skillMatch: 100,
        proximity: 90,
        availability: 100,
        reliability: 97,
        currentWorkload: 85,
        opportunityFairness: 87,
        overall: 93,
      },
    },
    {
      id: 'saravanan-m',
      name: 'Saravanan M.',
      business: 'Saravanan Sanitary Works',
      trade: 'Sanitary Plumber',
      distanceKm: 1.1,
      distanceText: '1.1 km away • Chintamani',
      availabilityText: 'Available Today',
      isAvailableToday: true,
      isAvailableRequestedSlot: true,
      rating: 4.6,
      completedJobs: 82,
      repeatCustomerRate: 88,
      workloadStatus: 'Low',
      workloadJobsThisWeek: 2,
      qualification: 'Bathroom Fixture & Tap Leakage Specialist',
      isWinner: false,
      avatarSeed: 'Saravanan M',
      explanationWhy:
        'Closer proximity (1.1 km) and low weekly workload give high opportunity score, strong second choice.',
      scores: {
        skillMatch: 92,
        proximity: 94,
        availability: 98,
        reliability: 88,
        currentWorkload: 93,
        opportunityFairness: 91,
        overall: 92,
      },
    },
    {
      id: 'baskaran-r',
      name: 'Baskaran R.',
      business: 'QuickFix Plumbing',
      trade: 'Pipeline Technician',
      distanceKm: 2.5,
      distanceText: '2.5 km away • Collectorate Nagar',
      availabilityText: 'Available Tomorrow',
      isAvailableToday: false,
      isAvailableRequestedSlot: false,
      rating: 4.5,
      completedJobs: 54,
      repeatCustomerRate: 80,
      workloadStatus: 'Optimal',
      workloadJobsThisWeek: 3,
      qualification: 'Kitchen Sink & Waste Pipe Clearing',
      isWinner: false,
      avatarSeed: 'Baskaran R',
      explanationWhy:
        'Unavailable for immediate today emergency slot.',
      scores: {
        skillMatch: 86,
        proximity: 76,
        availability: 60,
        reliability: 82,
        currentWorkload: 90,
        opportunityFairness: 86,
        overall: 79,
      },
    },
    {
      id: 'velu-s',
      name: 'Velu S.',
      business: 'Velu Hydro Solutions',
      trade: 'Plumbing Contractor',
      distanceKm: 3.2,
      distanceText: '3.2 km away • Villivakkam Road',
      availabilityText: 'Available Today',
      isAvailableToday: true,
      isAvailableRequestedSlot: true,
      rating: 4.7,
      completedJobs: 98,
      repeatCustomerRate: 89,
      workloadStatus: 'High',
      workloadJobsThisWeek: 9,
      qualification: 'Overhead Tank & Booster Pump Maintenance',
      isWinner: false,
      avatarSeed: 'Velu S',
      explanationWhy:
        'Competent technician, but further distance (3.2 km) and moderate workload.',
      scores: {
        skillMatch: 90,
        proximity: 66,
        availability: 95,
        reliability: 89,
        currentWorkload: 74,
        opportunityFairness: 80,
        overall: 82,
      },
    },
  ],
};

export const ALL_SCENARIOS: Record<string, FairMatchScenario> = {
  'ac-general-service': PRIMARY_AC_SCENARIO,
  'electrical-repair': ELECTRICAL_SCENARIO,
  'plumbing-repair': PLUMBING_SCENARIO,
};

export interface MatchTraceStep {
  timeOffsetSec: number;
  stageName: string;
  action: string;
  details: string;
  status: 'pending' | 'active' | 'completed';
}

export const GENERATE_TRACE_STEPS = (scenario: FairMatchScenario): MatchTraceStep[] => [
  {
    timeOffsetSec: 0,
    stageName: 'REQUEST INGESTION',
    action: 'Direct Service Request Received',
    details: `${scenario.customerName} (${scenario.customerLocality}) • ${scenario.serviceName} for ${scenario.requestedSlot}`,
    status: 'completed',
  },
  {
    timeOffsetSec: 1,
    stageName: 'CANDIDATE DISCOVERY',
    action: 'Local Qualified Professionals Discovered',
    details: `${scenario.candidates.length} verified trade-certified artisans identified within 3.5 km radius`,
    status: 'completed',
  },
  {
    timeOffsetSec: 2,
    stageName: 'SKILL EVALUATION',
    action: 'Trade Certification & Tooling Verified',
    details: 'Verified ITI vocational licenses, pressure diagnostics, and job type compatibility',
    status: 'completed',
  },
  {
    timeOffsetSec: 3,
    stageName: 'PROXIMITY & AVAILABILITY',
    action: 'Transit Radius & Slot Alignment',
    details: `Evaluated low-carbon travel corridors and verified direct availability for ${scenario.requestedDate}`,
    status: 'completed',
  },
  {
    timeOffsetSec: 4,
    stageName: 'RELIABILITY & WORKLOAD',
    action: 'Escrow History & Fatigue Safeguards',
    details: 'Checked repeat client rate and active weekly job load to prevent worker exhaustion',
    status: 'completed',
  },
  {
    timeOffsetSec: 5,
    stageName: 'OPPORTUNITY FAIRNESS',
    action: 'Democratic Work Distribution Balancing',
    details: 'Applied anti-monopoly rotation to prevent platform gig concentration among qualified peers',
    status: 'completed',
  },
  {
    timeOffsetSec: 6,
    stageName: 'MATCH LOCK',
    action: 'Explainable Recommendation Locked',
    details: `${scenario.candidates.find((c) => c.isWinner)?.name} ranked #1 with ${scenario.candidates.find((c) => c.isWinner)?.scores.overall}% FairMatch index`,
    status: 'completed',
  },
];
