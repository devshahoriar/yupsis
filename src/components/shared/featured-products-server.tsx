import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { api } from "@/trpc/server";
import { ProductCard } from "./product-card";
import { Button } from "@/components/ui/button";

export async function FeaturedProductsServer() {
  const products = await api.product.getAll();
 
  const featuredProducts = products.slice(0, 4);

  return (
    <section id="featured-products" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our carefully curated selection of premium products designed to enhance your lifestyle.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredProducts.map((product, i) => (
            <ProductCard pos={i} key={product.id} product={product} />
          ))}
        </div>

        {/* Link to view all products */}
        <div className="text-center">
          <Button asChild size="lg" className="group">
            <Link href="/products" className="inline-flex items-center gap-2">
              View All Products
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
