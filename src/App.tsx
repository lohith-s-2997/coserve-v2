import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { FairMatchModal } from './components/FairMatchModal';
import { BookingModal } from './components/BookingModal';
import { HomeView } from './views/HomeView';
import { ServicesDiscoveryView } from './views/ServicesDiscoveryView';
import { ProviderProfileView } from './views/ProviderProfileView';
import { MyBookingsView } from './views/MyBookingsView';
import { WorkerDashboardView } from './views/WorkerDashboardView';
import { CooperativeDashboardView } from './views/CooperativeDashboardView';
import { HowItWorksView } from './views/HowItWorksView';
import { ArchitectureView } from './views/ArchitectureView';
import { DemoGuideView } from './views/DemoGuideView';
import { ConceptPreviewsView } from './views/ConceptPreviewsView';
import { FairMatchView } from './views/FairMatchView';
import { CommunityDemandView } from './views/CommunityDemandView';
import { CooperativeTeamsView } from './views/CooperativeTeamsView';
import { FairWorkDistributionView } from './views/FairWorkDistributionView';
import { GigToGrowthView } from './views/GigToGrowthView';
import { CommunityNetworkLoopView } from './views/CommunityNetworkLoopView';
import { TrustedNetworkView } from './views/TrustedNetworkView';
import { CommunityGrowthPoolView } from './views/CommunityGrowthPoolView';
import { CustomerCreditsView } from './views/CustomerCreditsView';
import { ProtectedPaymentModal } from './components/ProtectedPaymentModal';
import { DigitalInvoiceModal } from './components/DigitalInvoiceModal';
import { RatingModal } from './components/RatingModal';
import { DisputeModal } from './components/DisputeModal';
import { ReplacementSupportModal } from './components/ReplacementSupportModal';
import { ChooseProfessionalModal } from './components/ChooseProfessionalModal';
import { TestBookingModal } from './components/TestBookingModal';
import { ResetDemoModal } from './components/ResetDemoModal';
import {
  RotateCcw,
  Sparkles,
  Check,
} from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    navigate,
    fairMatchModalProvider,
    setFairMatchModalProvider,
    bookingModalProvider,
    setBookingModalProvider,
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
    toastMessage,
    resetDemoData,
    isResetModalOpen,
    resetStatus,
    confirmResetDemo,
    cancelResetDemo,
    setRole,
    isChooseProfessionalModalOpen,
    setIsChooseProfessionalModalOpen,
    isTestBookingModalOpen,
    setTestBookingModalOpen,
  } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F5F2] text-[#0A0A0A] font-mono-code selection:bg-[#CCFF00] selection:text-black">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0A0A0A] text-[#F5F5F2] border border-[#CCFF00] px-5 py-3 shadow-2xl flex items-center gap-3 text-xs font-bold uppercase tracking-wider animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-[#CCFF00] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Editorial Navbar */}
      <Navbar />

      {/* Main View Area with React Router Routes */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/services" element={<ServicesDiscoveryView />} />
          <Route path="/find-services" element={<Navigate to="/services" replace />} />

          <Route path="/fairmatch" element={<FairMatchView />} />
          <Route path="/fair-match" element={<Navigate to="/fairmatch" replace />} />

          <Route path="/bookings" element={<MyBookingsView />} />
          <Route path="/bookings/:id" element={<MyBookingsView />} />
          <Route path="/my-bookings" element={<Navigate to="/bookings" replace />} />

          <Route path="/provider" element={<ProviderProfileView />} />
          <Route path="/provider/:id" element={<ProviderProfileView />} />
          <Route path="/provider-profile" element={<Navigate to="/provider" replace />} />

          <Route path="/network" element={<TrustedNetworkView />} />
          <Route path="/trusted-network" element={<Navigate to="/network" replace />} />

          <Route path="/community" element={<CommunityGrowthPoolView />} />
          <Route path="/community-growth" element={<Navigate to="/community" replace />} />
          <Route path="/community-growth-pool" element={<Navigate to="/community" replace />} />

          <Route path="/credits" element={<CustomerCreditsView />} />
          <Route path="/customer-credits" element={<Navigate to="/credits" replace />} />
          <Route path="/coserve-credits" element={<Navigate to="/credits" replace />} />

          <Route path="/worker" element={<WorkerDashboardView />} />
          <Route path="/worker/:workerId" element={<WorkerDashboardView />} />
          <Route path="/worker-dashboard" element={<Navigate to="/worker" replace />} />

          <Route path="/coop" element={<CooperativeDashboardView />} />
          <Route path="/admin" element={<Navigate to="/coop" replace />} />
          <Route path="/coop-dashboard" element={<Navigate to="/coop" replace />} />

          <Route path="/demand" element={<CommunityDemandView />} />
          <Route path="/community-demand" element={<Navigate to="/demand" replace />} />

          <Route path="/teams" element={<CooperativeTeamsView />} />
          <Route path="/cooperative-teams" element={<Navigate to="/teams" replace />} />
          <Route path="/my-coop-team" element={<Navigate to="/teams" replace />} />

          <Route path="/fair-work" element={<FairWorkDistributionView />} />
          <Route path="/fair-work-distribution" element={<Navigate to="/fair-work" replace />} />
          <Route path="/work-distribution" element={<Navigate to="/fair-work" replace />} />

          <Route path="/growth" element={<GigToGrowthView />} />
          <Route path="/gig-to-growth" element={<Navigate to="/growth" replace />} />
          <Route path="/my-reputation" element={<Navigate to="/growth" replace />} />

          <Route path="/network-loop" element={<CommunityNetworkLoopView />} />
          <Route path="/how-it-works" element={<HowItWorksView />} />
          <Route path="/architecture" element={<ArchitectureView />} />
          <Route path="/demo-guide" element={<DemoGuideView />} />

          <Route path="/support" element={<ConceptPreviewsView conceptId="support" />} />
          <Route path="/service-history" element={<ConceptPreviewsView conceptId="service-history" />} />
          <Route path="/my-services" element={<ConceptPreviewsView conceptId="my-services" />} />
          <Route path="/requests" element={<ConceptPreviewsView conceptId="requests" />} />
          <Route path="/workers-roster" element={<ConceptPreviewsView conceptId="workers-roster" />} />

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Modals */}
      <FairMatchModal
        provider={fairMatchModalProvider}
        onClose={() => setFairMatchModalProvider(null)}
        onSelectBook={(p) => {
          setBookingModalProvider(p);
        }}
      />

      <BookingModal
        provider={bookingModalProvider}
        onClose={() => setBookingModalProvider(null)}
        onSuccess={() => {
          setBookingModalProvider(null);
          navigate('/bookings');
        }}
      />

      {paymentModalBooking && (
        <ProtectedPaymentModal
          booking={paymentModalBooking}
          onClose={() => setPaymentModalBooking(null)}
          onOpenInvoice={(b) => {
            setPaymentModalBooking(null);
            setInvoiceModalBooking(b);
          }}
          onOpenRating={(b) => {
            setPaymentModalBooking(null);
            setRatingModalBooking(b);
          }}
        />
      )}

      {invoiceModalBooking && (
        <DigitalInvoiceModal
          booking={invoiceModalBooking}
          onClose={() => setInvoiceModalBooking(null)}
        />
      )}

      {ratingModalBooking && (
        <RatingModal
          booking={ratingModalBooking}
          onClose={() => setRatingModalBooking(null)}
        />
      )}

      {disputeModalBooking && (
        <DisputeModal
          booking={disputeModalBooking}
          onClose={() => setDisputeModalBooking(null)}
        />
      )}

      {replacementModalBooking && (
        <ReplacementSupportModal
          booking={replacementModalBooking}
          onClose={() => setReplacementModalBooking(null)}
        />
      )}

      <ChooseProfessionalModal
        isOpen={isChooseProfessionalModalOpen}
        onClose={() => setIsChooseProfessionalModalOpen(false)}
      />

      <TestBookingModal
        isOpen={isTestBookingModalOpen}
        onClose={() => setTestBookingModalOpen(false)}
      />

      <ResetDemoModal
        isOpen={isResetModalOpen}
        status={resetStatus}
        onConfirm={confirmResetDemo}
        onCancel={cancelResetDemo}
      />

      {/* Editorial Monochrome Footer */}
      <footer className="bg-[#0A0A0A] text-[#F5F5F2] border-t border-black mt-20 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/10">
            {/* Brand column */}
            <div className="md:col-span-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black font-display tracking-tight text-white uppercase">
                  COSERVE.
                </span>
                <span className="text-[10px] font-bold text-[#CCFF00] border border-[#CCFF00]/40 px-2 py-0.5 uppercase">
                  Cooperative Protocol
                </span>
              </div>
              <p className="text-xs text-[#CCFF00] font-bold uppercase tracking-widest">
                Local services. Shared growth.
              </p>
              <p className="text-xs text-white/70 font-sans max-w-lg leading-relaxed">
                "Your neighbourhood already has the skills. CoServe builds the network."
                Digital infrastructure for a non-extractive, cooperative local service economy where
                independent trade artisans build their professional identity, verifiable reputation, and direct client equity.
              </p>
              <div className="text-[11px] text-white/40 pt-2">
                Smart India Hackathon 2026 • Scalable Urban Neighbourhood Network
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3 space-y-3">
              <div className="text-xs font-bold uppercase tracking-widest text-[#CCFF00]">
                CORE DIRECTORY
              </div>
              <ul className="space-y-2 text-xs text-white/70">
                <li>
                  <button
                    onClick={() => {
                      setRole('customer');
                      navigate('/services');
                    }}
                    className="hover:text-white transition uppercase"
                  >
                    Skilled Trades Directory
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setRole('customer');
                      navigate('/bookings');
                    }}
                    className="hover:text-white transition uppercase"
                  >
                    Escrow Booking Orders
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setRole('worker');
                      navigate('/worker');
                    }}
                    className="hover:text-[#CCFF00] transition uppercase font-bold text-white"
                  >
                    Worker OS (Arjun Raj)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setRole('admin');
                      navigate('/coop');
                    }}
                    className="hover:text-white transition uppercase"
                  >
                    Civic Guild Federation
                  </button>
                </li>
              </ul>
            </div>

            {/* SIH Evaluation Tools */}
            <div className="md:col-span-3 space-y-3">
              <div className="text-xs font-bold uppercase tracking-widest text-[#CCFF00]">
                SIH EVALUATION
              </div>
              <ul className="space-y-2 text-xs text-white/70">
                <li>
                  <button
                    onClick={() => navigate('/how-it-works')}
                    className="hover:text-white transition uppercase"
                  >
                    How CoServe Works
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/architecture')}
                    className="hover:text-white transition uppercase"
                  >
                    Technical Architecture
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/demo-guide')}
                    className="text-[#CCFF00] font-bold hover:underline transition flex items-center gap-1 uppercase"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>18-Step Demo Guide</span>
                  </button>
                </li>
                <li className="pt-2">
                  <button
                    onClick={resetDemoData}
                    className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white transition text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 border border-white/15"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Environment</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
            <div>
              © 2026 CoServe Cooperative Gig Services Platform. All rights reserved.
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span className="text-[#CCFF00]">● Real-time Two-Sided Simulation</span>
              <span>● Non-Extractive Direct Payouts</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
