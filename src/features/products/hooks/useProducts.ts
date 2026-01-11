import { useQuery } from "@tanstack/react-query";
import { productService } from "../api/product.service";

// Ürün listesini getirir - Fetches product list
export const useProducts = () =>
  useQuery({
    queryKey: ["products"], // Cache anahtarı - Cache key
    queryFn: productService.getAll, // API çağrısı - API call
    staleTime: 5 * 60 * 1000, // 5 dakika cache fresh kabul edilir - Cache is fresh for 5 minutes
  });
