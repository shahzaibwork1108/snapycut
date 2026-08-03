import { useState, useEffect, lazy, Suspense } from "react";

// ═══ ABOVE-FOLD: Load immediately — user sees these first ═══
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import GrowthOptions from "./components/GrowthOptions";

// ═══ BELOW-FOLD: Lazy loaded — don't block initial render ═══
const ShortForm         = lazy(() => import("./components/ShortForm"));
const RecentCuts        = lazy(() => import("./components/RecentCuts"));
const Row2              = lazy(() => import("./components/Row2"));
const Row3              = lazy(() => import("./components/Row3"));
const ThumbnailPortfolio = lazy(() => import("./components/ThumbnailPortfolio"));
const ClientSay         = lazy(() => import("./components/ClientSay"));
const Testimonials      = lazy(() => import("./components/Testimonials"));
const CTASection        = lazy(() => import("./components/CTASection"));
const Footer            = lazy(() => import("./components/Footer"));
const BookingModal      = lazy(() => import("./components/BookingModal"));
const WhatsAppButton    = lazy(() => import("./components/WhatsAppButton"));
const DiscountPopup     = lazy(() => import("./components/DiscountPopup"));


// ═══ Minimal skeleton shown while a section is loading ═══
const SectionSkeleton = () => (
  <div className="w-full py-12 bg-[#030303]" aria-hidden="true" />
);

// ═══ content-visibility wrapper — browser skips rendering off-screen sections ═══
function LazySection({ children, height = "700px" }: { children: React.ReactNode; height?: string }) {
  return (
    <div
      style={{
        contentVisibility: "auto",
        containIntrinsicSize: `0 ${height}`,
      }}
    >
      <Suspense fallback={<SectionSkeleton />}>
        {children}
      </Suspense>
    </div>
  );
}

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleOpenBooking = () => setIsBookingOpen(true);
  const handleCloseBooking = () => setIsBookingOpen(false);

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-purple-600/30 selection:text-white" id="app-root">

      {/* Navbar — always eager */}
      <Navbar onOpenBooking={handleOpenBooking} />

      <main id="app-main">
        {/* Hero + GrowthOptions — above fold, eager */}
        <Hero onOpenBooking={handleOpenBooking} />
        <GrowthOptions />

        {/* ── Below-fold sections — lazy + content-visibility ── */}
        <LazySection height="900px">
          <ShortForm onOpenBooking={handleOpenBooking} />
        </LazySection>

        <LazySection height="700px">
          <RecentCuts onOpenBooking={handleOpenBooking} />
        </LazySection>

        <LazySection height="600px">
          <Row2 onOpenBooking={handleOpenBooking} />
        </LazySection>

        <LazySection height="700px">
          <Row3 onOpenBooking={handleOpenBooking} />
        </LazySection>

        <LazySection height="600px">
          <ThumbnailPortfolio onOpenBooking={handleOpenBooking} />
        </LazySection>

        <LazySection height="800px">
          <ClientSay onOpenBooking={handleOpenBooking} />
        </LazySection>

        <LazySection height="500px">
          <Testimonials />
        </LazySection>

        <LazySection height="400px">
          <CTASection onOpenBooking={handleOpenBooking} />
        </LazySection>
      </main>

      <LazySection height="300px">
        <Footer />
      </LazySection>

      {/* Modals — only render when needed */}
      <Suspense fallback={null}>
        <BookingModal isOpen={isBookingOpen} onClose={handleCloseBooking} />
      </Suspense>

      <Suspense fallback={null}>
        <WhatsAppButton />
      </Suspense>

      <Suspense fallback={null}>
        <DiscountPopup onOpenBooking={handleOpenBooking} />
      </Suspense>
    </div>
  );
}
