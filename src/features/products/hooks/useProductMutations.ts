import { useMutation } from "@tanstack/react-query";
import { productService } from "../api/product.service";
import { queryClient } from "@/app/queryClient";
import type { Product } from "../types";

// Ürün silme mutation'ı - Delete product mutation
export const useDeleteProduct = () =>
  useMutation({
    mutationFn: productService.delete,
    onSuccess: () => {
      // Liste cache'i invalidate edilir - Invalidate product list cache
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

// Ürün ekleme mutation'ı - Create product mutation
export const useCreateProduct = () =>
  useMutation({
    mutationFn: productService.create,
    onSuccess: () => {
      // Yeni ürün eklendiği için liste yenilenir - Refresh product list after adding new product
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

// Ürün güncelleme mutation'ı - Update product mutation
export const useUpdateProduct = () =>
  useMutation({
    mutationFn: ({ id, data }: { id: string; data: Omit<Product, "id"> }) => productService.update(id, data),
    onSuccess: () => {
      // Hem liste hem detay cache'i yenilenir - Invalidate both list and detail cache
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });
