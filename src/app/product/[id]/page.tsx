import { products } from "@/data";

import { api } from "@/trpc/server";
import Client from './client';

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
  await api.product.getById.prefetch({
    id: Number(id),
  });
  return <Client />;
}
