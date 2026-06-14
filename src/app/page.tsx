import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarketTicker from "@/components/MarketTicker";
import FeaturesSection from "@/components/FeaturesSection";
import TradingDashboard from "@/components/TradingDashboard";
import MarketOverview from "@/components/MarketOverview";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: "#0a0a0f" }}>
      <Navbar />
      <HeroSection />
      <MarketTicker />
      <FeaturesSection />
      <TradingDashboard />
      <MarketOverview />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
