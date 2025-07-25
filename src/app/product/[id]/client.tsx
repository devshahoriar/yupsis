"use client";
import { ProductCard } from "@/components/shared/product-card";
import { ProductCardSkeleton } from "@/components/shared/product-card-skeleton";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/cart-context";
import { api } from "@/trpc/react";
import type { Product } from "@/types";
import { ArrowLeft, Heart, Share2, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const ErrorBackButton = () => {
  const router = useRouter();
  return (
    <Button onClick={() => router.push("/products")}>
      Browse All Products
    </Button>
  );
};

export const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      variant="ghost"
      onClick={() => router.back()}
      className="mb-2 -ml-2"
    >
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back
    </Button>
  );
};

export const FevButton = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setIsFavorite(!isFavorite)}
    >
      <Heart
        className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`}
      />
    </Button>
  );
};

export const ShareButton = ({ product }: { product: Product }) => {
  const handleShare = async () => {
    if (navigator.share && product) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      void navigator.clipboard.writeText(window.location.href);
      toast.success("Product link copied to clipboard!");
    }
  };
  return (
    <Button variant="outline" size="icon" onClick={handleShare}>
      <Share2 className="h-4 w-4" />
    </Button>
  );
};

export const QuanControlAndAddCart = ({ product }: { product: Product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const handleAddToCart = () => {
    if (!product) return;

    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast.success(
      `${quantity} ${product.name}${quantity > 1 ? "s" : ""} added to cart!`,
    );
  };
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium">Quantity</label>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            -
          </Button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </Button>
        </div>
      </div>

      <Button onClick={handleAddToCart} size="lg" className="w-full">
        <ShoppingCart className="mr-2 h-5 w-5" />
        Add to Cart - ${(product.price * quantity).toFixed(2)}
      </Button>
    </div>
  );
};

export const RelatedProduct = ({ product }: { product: Product }) => {
  const { data: relatedProducts = [], isLoading: reLoadin } =
    api.product.getByCategory.useQuery(
      {
        category: product?.category ?? "",
        limit: 4,
        excludeId: product?.id,
      },
      { enabled: !!product?.category },
    );
  return (
    <div className="mt-16">
      <h2 className="mb-6 text-2xl font-bold">You might also like</h2>
      {reLoadin ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : relatedProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((relatedProduct, index) => (
            <ProductCard
              key={relatedProduct.id}
              product={relatedProduct}
              pos={index}
            />
          ))}
        </div>
      ) : (
        <div className="text-muted-foreground py-8 text-center">
          <p>No related products found in this category</p>
        </div>
      )}
    </div>
  );
};
