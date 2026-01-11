import { nanoid } from "@reduxjs/toolkit";
import type { Product } from "../types";
import { products as mockProducts } from "./products.mock";

// LocalStorage anahtarları - Storage keys
const PRODUCTS_KEY = "products";
const FAVORITES_KEY = "favorites";

// Ürünleri localStorage'dan yükler - Loads products from localStorage
const loadProducts = (): Product[] => JSON.parse(localStorage.getItem(PRODUCTS_KEY) || "[]");

// Ürünleri localStorage'a kaydeder - Persists products to localStorage
const saveProducts = (products: Product[]) => localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));

// Favorileri localStorage'dan yükler - Loads favorites from localStorage
const loadFavorites = (): string[] => JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");

// Favorileri localStorage'a kaydeder - Persists favorites to localStorage
const saveFavorites = (favorites: string[]) => localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));

// İlk açılışta mock data yükler ve geçersiz favorileri temizler - Initializes mock data and cleans invalid favorites
export const initializeProductStorage = () => {
  const existingProducts = loadProducts();

  // Eğer ürün yoksa mock data yüklenir - Seed mock data if storage is empty
  if (existingProducts.length === 0) saveProducts(mockProducts);

  // Var olmayan ürünlere ait favoriler temizlenir - Remove favorites that reference deleted products
  const validProductIds = loadProducts().map((p) => p.id);
  const cleanedFavorites = loadFavorites().filter((id) => validProductIds.includes(id));
  saveFavorites(cleanedFavorites);
};

// Fake API servisleri - Fake API service layer
export const productService = {
  // Tüm ürünleri getirir - Fetches all products
  getAll: async (): Promise<Product[]> => loadProducts(),

  // ID ile ürün getirir - Fetches product by ID
  getById: async (id: string): Promise<Product> => {
    const product = loadProducts().find((p) => p.id === id);
    if (!product) throw new Error("Product not found");
    return product;
  },

  // Yeni ürün oluşturur - Creates a new product
  create: async (data: Omit<Product, "id">): Promise<Product> => {
    const products = loadProducts();
    const newProduct: Product = {
      id: nanoid(), // Frontend-safe unique ID
      ...data,
    };
    products.unshift(newProduct);
    saveProducts(products);
    return newProduct;
  },

  // Ürünü günceller - Updates an existing product
  update: async (id: string, data: Omit<Product, "id">): Promise<Product> => {
    const products = loadProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) throw new Error("Product not found");
    products[index] = { ...products[index], ...data };
    saveProducts(products);
    return products[index];
  },

  // Ürünü siler - Deletes product by ID
  delete: async (id: string): Promise<string> => {
    const products = loadProducts().filter((p) => p.id !== id);
    saveProducts(products);
    return id;
  },
};
