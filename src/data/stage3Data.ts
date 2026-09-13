import {
  CommunityContribution,
  CommunityAllocation,
  CustomerCreditTransaction,
  TrustedNetworkItem,
} from '../types';

export const INITIAL_GROWTH_POOL_BALANCE = 84250;

export const INITIAL_COMMUNITY_ALLOCATIONS: CommunityAllocation[] = [
  {
    category: 'SKILL CERTIFICATION',
    allocatedAmount: 18000,
    description: 'BEE HVAC Level-2 energy efficiency and inverter diagnostics certification subsidies for in-zone members.',
    beneficiariesCount: 14,
  },
  {
    category: 'EQUIPMENT SUPPORT',
    allocatedAmount: 12000,
    description: 'Shared guild equipment pool co-funding for high-pressure jet pumps and electronic digital manifolds.',
    beneficiariesCount: 8,
  },
  {
    category: 'SAFETY EQUIPMENT',
    allocatedAmount: 7000,
    description: 'Insulated electrician harness sets, fire-retardant uniforms, and high-altitude safety lines.',
    beneficiariesCount: 22,
  },
  {
    category: 'EMERGENCY ASSISTANCE',
    allocatedAmount: 5000,
    description: 'Cooperative mutual-aid reserve for urgent artisan medical support and temporary transit outage loans.',
    beneficiariesCount: 3,
  },
  {
    category: 'TRAINING',
    allocatedAmount: 9500,
    description: 'Quarterly safety, customer communication, and digital billing workshop stipends for apprentices.',
    beneficiariesCount: 19,
  },
];

export const INITIAL_COMMUNITY_CONTRIBUTIONS: CommunityContribution[] = [
  {
    id: 'cont-seed-1',
    amount: 8,
    service: 'Plumbing Pipeline Repair',
    customerName: 'Karthik S.',
    workerName: 'Kumar Plumbing Works',
    date: 'Yesterday, 4:15 PM',
  },
  {
    id: 'cont-seed-2',
    amount: 12,
    service: 'Home Deep Cleaning',
    customerName: 'Ananya R.',
    workerName: 'Kavitha Housekeeping',
    date: 'Yesterday, 1:30 PM',
  },
  {
    id: 'cont-seed-3',
    amount: 10,
    service: 'Two-Wheeler Roadside Support',
    customerName: 'Venkatesh M.',
    workerName: 'Manoj Rapid Works',
    date: '2 days ago',
  },
  {
    id: 'cont-seed-4',
    amount: 6,
    service: 'Maths & Science Tutoring',
    customerName: 'Deepa K.',
    workerName: 'Priya Learning Studio',
    date: '3 days ago',
  },
];

export const INITIAL_CUSTOMER_CREDITS = 120;

export const INITIAL_CUSTOMER_CREDIT_HISTORY: CustomerCreditTransaction[] = [
  {
    id: 'cch-1',
    amount: 10,
    description: 'Community Service Participation (Ward Cluster Bonus)',
    date: '3 days ago',
    type: 'credit',
  },
  {
    id: 'cch-2',
    amount: -20,
    description: 'Booking Reward Used (Electrical Checkup Discount)',
    date: '1 week ago',
    type: 'debit',
  },
  {
    id: 'cch-3',
    amount: 50,
    description: 'Neighborhood Founding Member Welcome Bonus',
    date: '2 weeks ago',
    type: 'credit',
  },
];

export const INITIAL_TRUSTED_NETWORK: TrustedNetworkItem[] = [
  {
    id: 'tn-kumar',
    providerId: 'prov-kumar-plumbing',
    businessName: 'Kumar Plumbing Works',
    professionalName: 'Kumar Selvam',
    trade: 'Master Plumber',
    category: 'Plumbing',
    rating: 4.9,
    completedJobsWithYou: 3,
    lastServiceDate: '2 weeks ago',
    availability: 'Next Slot: Tomorrow 2 PM',
    baseServicePrice: 450,
    repeatBookingFee: 10,
    totalRepeatPrice: 460,
    addedAt: '1 month ago',
  },
  {
    id: 'tn-ravi',
    providerId: 'prov-ravi-electrical',
    businessName: 'Ravi Electrical Services',
    professionalName: 'Ravi Chandran',
    trade: 'Licensed Wireman',
    category: 'Electrical',
    rating: 4.8,
    completedJobsWithYou: 2,
    lastServiceDate: '1 month ago',
    availability: 'Available Today',
    baseServicePrice: 400,
    repeatBookingFee: 10,
    totalRepeatPrice: 410,
    addedAt: '2 months ago',
  },
  {
    id: 'tn-priya',
    providerId: 'prov-priya-tutoring',
    businessName: 'Priya Learning Studio',
    professionalName: 'Priya Narayanan',
    trade: 'STEM Educator',
    category: 'Tutoring',
    rating: 4.9,
    completedJobsWithYou: 5,
    lastServiceDate: '3 months ago',
    availability: 'Available Weekends',
    baseServicePrice: 600,
    repeatBookingFee: 10,
    totalRepeatPrice: 610,
    addedAt: '3 months ago',
  },
];
