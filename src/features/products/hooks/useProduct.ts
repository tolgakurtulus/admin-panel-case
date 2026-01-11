import { useQuery } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";
import { productService } from "../api/product.service";
import type { Product } from "../types";

// queryKey ve queryFn dışarıdan override edilmesin diye sınırlandırılır - Prevent overriding queryKey and queryFn
type UseProductOptions = Omit<UseQueryOptions<Product>, "queryKey" | "queryFn">;

// Tekil ürün getirir - Fetches single product by ID
export const useProduct = (id: string, options?: UseProductOptions) => {
  return useQuery<Product>({
    queryKey: ["product", id], // Ürüne özel cache key - Product-specific cache key
    queryFn: async () => {
      const product = await productService.getById(id);
      if (!product) throw new Error("Product not found");
      return product;
    },
    enabled: !!id, // ID yoksa request atılmaz - Do not fetch if no ID
    ...options,
  });
};
