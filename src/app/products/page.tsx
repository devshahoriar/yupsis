/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { api } from "@/trpc/react";
import { ProductCard } from "@/components/shared/product-card";
import { ProductCardSkeleton } from "@/components/shared/product-card-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"name" | "price-low" | "price-high">(
    "name",
  );

  const { data: categories = [] } = api.product.getCategories.useQuery();

  const {
    data: paginatedData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = api.product.getFilteredPaginated.useInfiniteQuery(
    {
      limit: 4,
      search: searchQuery || undefined,
      category: selectedCategory === "all" ? undefined : selectedCategory,
      sortBy,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  const allProducts = paginatedData?.pages.flatMap((page) => page.items) ?? [];
  const totalCount = paginatedData?.pages[0]?.totalCount ?? 0;
  const totalProducts = paginatedData?.pages[0]?.totalProducts ?? 0;

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-destructive mb-4 text-2xl font-bold">
            Error Loading Products
          </h1>
          <p className="text-muted-foreground">
            Failed to load products. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 dark:from-blue-950 dark:to-indigo-950">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              Our Products
            </h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Discover our complete collection of premium products carefully
              curated for quality and value.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b py-8 backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {/* Search */}
            <div className="relative max-w-md flex-1">
              <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-4">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={sortBy}
                onValueChange={(value: "name" | "price-low" | "price-high") =>
                  setSortBy(value)
                }
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="text-muted-foreground mt-4 text-sm">
            {isLoading ? (
              "Loading products..."
            ) : (
              <>
                Showing {totalCount} product{totalCount !== 1 ? "s" : ""}
                {searchQuery || selectedCategory !== "all" ? (
                  <span> (filtered from {totalProducts} total)</span>
                ) : null}
                {hasNextPage && (
                  <span className="ml-2 text-blue-600">
                    (Scroll down to load more)
                  </span>
                )}
                {isFetchingNextPage && (
                  <span className="ml-2 text-blue-600">Loading more...</span>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : totalCount === 0 ? (
            <div className="py-12 text-center">
              <h2 className="mb-4 text-2xl font-bold">No products found</h2>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter criteria.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setSortBy("name");
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <InfiniteScroll
              dataLength={allProducts.length}
              next={fetchNextPage}
              hasMore={hasNextPage ?? false}
              loader={
                <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <ProductCardSkeleton key={`loading-${i}`} />
                  ))}
                </div>
              }
              endMessage={
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">
                    🎉 You've seen all {totalCount} products!
                  </p>
                </div>
              }
              scrollThreshold={0.9}
              className="overflow-visible"
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {allProducts.map((product, i) => (
                  <ProductCard pos={i} key={product.id} product={product} />
                ))}
              </div>
            </InfiniteScroll>
          )}
        </div>
      </section>
    </div>
  );
}
