"use client";

import { api } from "@/trpc/react";
import { ProductCard } from "./product-card";
import { ProductCardSkeleton } from "./product-card-skeleton";

export function ProductGrid() {
  const { data: products, isLoading, error } = api.product.getAll.useQuery();

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Failed to load products. Please try again.</p>
      </div>
    );
  }

  return (
    <section id="products" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover our carefully curated selection of premium products designed to enhance your lifestyle.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            : products?.map((product,i) => (
                <ProductCard pos={i} key={product.id} product={product} />
              ))
          }
        </div>
      </div>
    </section>
  );
}
