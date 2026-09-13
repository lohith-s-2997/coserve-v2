export type UserRole = 'customer' | 'worker' | 'admin';

export type BookingStatus = 'Requested' | 'Accepted' | 'In Progress' | 'Completed' | 'Cancelled';

export interface FairMatchScore {
  overall: number; // 0 - 100
  skillMatch: number;
  proximity: number;
  availability: number;
  reliability: number;
  currentWorkload: number; // Higher means well-balanced (not overloaded)
  opportunityFairness: number; // Gives visibility to qualified pros with lower recent workload
  explanation: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  description: string;
  iconName: string;
  typicalDuration: string;
  startingPrice: number;
}

export interface ServiceCategory {
  id: string;
  name: string;
  tagline: string;
  iconName: string;
  services: ServiceItem[];
}

export interface ReviewItem {
  id: string;
  customerName: string;
  rating: number;
  date: string;
  comment: string;
  verifiedNeighborhood: string;
  serviceType: string;
}

export interface Provider {
  id: string;
  businessName: string;
  professionalName: string;
  category: string;
  serviceTypes: string[];
  location: string;
  distanceKm: number;
  rating: number;
  reviewCount: number;
  completedJobs: number;
  repeatCustomerRate: number; // Percentage, e.g. 92%
  availability: 'Available Today' | 'Next Slot: Tomorrow 2 PM' | 'Busy Now (Available 5 PM)' | 'Available This Weekend';
  isAvailableToday: boolean;
  startingPrice: number;
  serviceRadiusKm: number;
  badges: {
    identityVerified: boolean;
    skillVerified: boolean;
    cooperativeMember: boolean;
  };
  specializations: string[];
  recentWorkload: 'Optimal / 4 jobs this week' | 'High / 12 jobs this week' | 'Low / 2 jobs this week' | 'Moderate / 6 jobs this week';
  bio: string;
  experienceYears: number;
  cooperativeUnit: string;
  fairMatch: FairMatchScore;
  avatarSeed: string;
  reviews: ReviewItem[];
}

export interface Booking {
  id: string;
  providerId: string;
  providerName: string;
  businessName: string;
  customerName: string;
  customerPhone: string;
  serviceName: string;
  category: string;
  location: string;
  scheduledTime: string;
  price: number;
  status: BookingStatus;
  createdAt: string;
  notes?: string;
  isProtected?: boolean;
  isRepeatBooking?: boolean;
  protectedBookingFee?: number;
  paymentStatus?: 'Unpaid' | 'Paid';
  paymentBreakdown?: {
    servicePrice: number;
    bookingFee: number;
    totalPaid: number;
    workerEarnings: number;
    coserveOperations: number;
    communityGrowth: number;
    paidAt: string;
    invoiceId: string;
  };
  rating?: {
    stars: number;
    tags: string[];
    reviewedAt: string;
  };
  inTrustedNetwork?: boolean;
  disputeCase?: {
    caseId: string;
    reason: string;
    description: string;
    status: 'Under Cooperative Review' | 'Resolved';
    createdAt: string;
    timeline: {
      submittedAt: string;
      reviewStartedAt: string;
      workerRespondedAt?: string;
      resolutionAt?: string;
    };
  };
  timeline: {
    requestedAt: string;
    acceptedAt?: string;
    startedAt?: string;
    completedAt?: string;
  };
}

export interface ActiveCustomer {
  name: string;
  locality: string;
  city: string;
  phone: string;
  address: string;
  avatarSeed: string;
}

export interface ActiveWorker {
  id: string;
  name: string;
  businessName: string;
  specialty: string;
  locality: string;
  cooperativeUnit: string;
  trade: string;
  rating: number;
  completedJobs: number;
  earningsBase: number;
}

export interface ActiveAdmin {
  cooperativeName: string;
  locality: string;
  city: string;
  memberCount: number;
}

export interface DemandClusterHousehold {
  id: string;
  name: string;
  location: string;
  distanceKm: number;
  service: string;
  timeWindow: string;
  joinedAt: string;
  isCurrentUser?: boolean;
}

export interface DemandCluster {
  id: string;
  serviceName: string;
  category: string;
  locality: string;
  preferredWindow: string;
  radiusKm: number;
  individualPrice: number;
  clusterPrice: number;
  status: 'Open' | 'Cluster Formed' | 'Accepted by Worker' | 'In Progress' | 'Completed';
  userJoined: boolean;
  workerAccepted: boolean;
  acceptedByWorkerName?: string;
  households: DemandClusterHousehold[];
}

export interface CoopTeamMember {
  id: string;
  name: string;
  businessName: string;
  trade: string;
  rating: number;
  completedJobs: number;
  identityVerified: boolean;
  skillVerified: boolean;
  cooperativeMember: boolean;
}

export interface CooperativeTeam {
  id: string;
  name: string;
  tagline: string;
  locality: string;
  rating: number;
  completedJobs: number;
  members: CoopTeamMember[];
  services: string[];
  combinedPackages: {
    id: string;
    title: string;
    description: string;
    includedTrades: string[];
    startingPrice: number;
    estimatedDays: string;
  }[];
}

export interface TeamServiceRequest {
  id: string;
  teamId: string;
  teamName: string;
  packageName: string;
  customerName: string;
  customerPhone: string;
  location: string;
  price: number;
  status: 'Requested' | 'Co-op Accepted' | 'Scheduled' | 'Completed';
  createdAt: string;
}

export interface WorkerInvitation {
  id: string;
  invitedWorkerName: string;
  invitedWorkerTrade: string;
  teamName: string;
  sentAt: string;
  status: 'Pending Response' | 'Accepted';
}

export interface CommunityContribution {
  id: string;
  amount: number;
  service: string;
  customerName: string;
  workerName: string;
  date: string;
  isLatest?: boolean;
}

export interface CommunityAllocation {
  category: string;
  allocatedAmount: number;
  description: string;
  beneficiariesCount: number;
}

export interface CustomerCreditTransaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  type: 'credit' | 'debit';
}

export interface TrustedNetworkItem {
  id: string;
  providerId: string;
  businessName: string;
  professionalName: string;
  trade: string;
  category: string;
  rating: number;
  completedJobsWithYou: number;
  lastServiceDate: string;
  availability: string;
  baseServicePrice: number;
  repeatBookingFee: number; // ₹10!
  totalRepeatPrice: number; // ₹510!
  addedAt: string;
}

