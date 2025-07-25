import { products } from "@/data";
import Client from "./client";

// Generate static params for all products
export async function generateStaticParams() {
  // In a real app, you would fetch from your API or database ;);)
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default function ProductPage() {
  return <Client />;
}
