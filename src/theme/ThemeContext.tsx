// Tema context tanımları - Theme context definitions
import { createContext } from "react";
import type { ThemeConfig } from "antd";

export type ThemeMode = "light" | "dark"; // Tema modu tipi - Theme mode type

// Context üzerinden paylaşılacak değerlerin tipi - Shape of the ThemeContext value
export interface ThemeContextType {
  mode: ThemeMode; // Aktif tema modu - Active theme mode
  toggleTheme: () => void; // Tema değiştirme fonksiyonu - Function to toggle theme
  themeConfig: ThemeConfig; // Ant Design tema konfigürasyonu - Ant Design theme configuration
}

// Tema context oluşturulur - Creates theme context
export const ThemeContext = createContext<ThemeContextType | null>(null);
