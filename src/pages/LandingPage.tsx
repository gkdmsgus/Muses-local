import BrandIdentity from '../components/LandingPage/BrandIdentity';
import LandingBanner from '../components/LandingPage/LandingBanner';
import PlatformFeatures from '../components/LandingPage/PlatformFeatures';
import TrendingNow from '../components/LandingPage/TrendingNow';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        <LandingBanner />
        <BrandIdentity />
        <PlatformFeatures />
        <TrendingNow />
      </div>
    </div>
  );
}
