import { HeroSection } from "@/components/pages/home/hero-section";
import { FeaturedProductsServer } from "@/components/shared/featured-products-server";

export default async function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedProductsServer />
    </div>
  );
}
