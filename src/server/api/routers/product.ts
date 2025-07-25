import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { products } from '@/data';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}




export const productRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return products;
  }),

  getPaginated: publicProcedure
    .input(z.object({ 
      limit: z.number().min(1).max(100).default(12),
      cursor: z.number().default(0) 
    }))
    .query(async ({ input }) => {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const { limit, cursor } = input;
      const startIndex = cursor;
      const endIndex = startIndex + limit;
      
      const items = products.slice(startIndex, endIndex);
      const hasNextPage = endIndex < products.length;
      
      return {
        items,
        nextCursor: hasNextPage ? endIndex : null,
        hasNextPage,
        totalCount: products.length,
      };
    }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input }) => {
      const product = products.find(p => p.id === input.id);
      if (!product) {
        throw new Error("Product not found");
      }
      return product;
    }),

  getByCategory: publicProcedure
    .input(z.object({ category: z.string() }))
    .query(({ input }) => {
      return products.filter(p => p.category.toLowerCase() === input.category.toLowerCase());
    }),

  getFeatured: publicProcedure.query(() => {
    return products.slice(0, 4);
  }),
});
