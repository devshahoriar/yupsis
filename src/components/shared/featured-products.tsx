"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { api } from "@/trpc/react";
import { ProductCard } from "./product-card";
import { ProductCardSkeleton } from "./product-card-skeleton";
import { Button } from "@/components/ui/button";

export function FeaturedProducts() {
  const { data: products, isLoading, error } = api.product.getAll.useQuery();

  if (error) {
    return (
      <div className="py-12 text-center">
        <p className="text-destructive">
          Failed to load products. Please try again.
        </p>
      </div>
    );
  }

  const featuredProducts = products?.slice(0, 4);

  const showSkeleton = isLoading && !products;

  return (
    <section id="featured-products" className="bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Featured Products
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Discover our carefully curated selection of premium products
            designed to enhance your lifestyle.
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {showSkeleton
            ? Array.from({ length: 4 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            : featuredProducts?.map((product, i) => (
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
