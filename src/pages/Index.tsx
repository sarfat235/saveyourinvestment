import { HeroSection } from '@/components/home/HeroSection';
import { MarketOverview } from '@/components/home/MarketOverview';
import { FeaturesSection } from '@/components/home/FeaturesSection';

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <MarketOverview />
      <FeaturesSection />
    </main>
  );
};

export default Index;
