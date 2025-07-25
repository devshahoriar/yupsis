import { FeaturedProducts } from '@/components/pages/home/featured-products';
import { HeroSection } from "@/components/pages/home/hero-section";

export default async function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedProducts />
    </div>
  );
}
