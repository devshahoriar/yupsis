import ProductJsonLd from "@/components/shared/ProductJsonLd";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { products } from "@/data";
import { api } from "@/trpc/server";
import { RotateCcw, Shield, Star, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  ErrorBackButton,
  FevButton,
  QuanControlAndAddCart,
  RelatedProduct,
  ShareButton,
} from "./client";

// Generate static params for all products
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await api.product.getById({
    id: parseInt(id),
  });

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The product you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
          <ErrorBackButton />
        </div>
      </div>
    );
  }

  return (
    <>
      <ProductJsonLd product={product} />
      <div className="min-h-screen">
        {/* Breadcrumb & Back Button */}
        <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b backdrop-blur">
          <div className="container mx-auto px-4 py-4">
            {/* <BackButton /> */}
            <nav className="text-muted-foreground text-sm">
              <span>Products</span>
              <span className="mx-2">/</span>
              <Link
                className="text-foreground font-medium"
                href={`/products?category=${product.category}`}
              >
                {product.category}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground font-medium">
                {product.name}
              </span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="bg-muted relative aspect-square overflow-hidden rounded-lg border">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="mb-2 flex items-start justify-between">
                  <Badge variant="secondary" className="mb-2">
                    {product.category}
                  </Badge>
                  <div className="flex gap-2">
                    <FevButton />
                    <ShareButton product={product} />
                  </div>
                </div>

                <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>

                {/* Rating (placeholder since not in data) */}
                <div className="mb-4 flex items-center gap-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= 4
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-muted-foreground text-sm">
                    (4.0) · 127 reviews
                  </span>
                </div>

                <div className="text-primary mb-6 text-3xl font-bold">
                  ${product.price.toFixed(2)}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="mb-2 font-semibold">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              <Separator />

              {/* Quantity & Add to Cart */}
              <QuanControlAndAddCart product={product} />

              <Separator />

              {/* Features */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Truck className="h-5 w-5 text-green-600" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span>1 year warranty included</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <RotateCcw className="h-5 w-5 text-purple-600" />
                  <span>30-day return policy</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          <RelatedProduct product={product} />
        </div>
      </div>
    </>
  );
}
