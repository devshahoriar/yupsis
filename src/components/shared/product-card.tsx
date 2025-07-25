"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/cart-context";
import { type Product } from "@/server/api/routers/product";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  pos: number;
}

export function ProductCard({ product, pos }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            loading={pos < 5 ? "eager" : "lazy"}
          />
          <Badge
            variant="secondary"
            className="bg-background/80 absolute top-2 left-2 backdrop-blur-sm"
          >
            {product.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <h3 className="mb-2 line-clamp-1 text-lg font-semibold">
          {product.name}
        </h3>
        <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-primary text-2xl font-bold">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCart} className="w-full" size="sm">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
