import { FeaturedProducts } from '@/components/pages/home/featured-products';
import { HeroSection } from "@/components/pages/home/hero-section";
import { api } from '@/trpc/server';

export default async function Home() {
  void await api.product.getFeatured.prefetch();
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedProducts />
    </div>
  );
}
