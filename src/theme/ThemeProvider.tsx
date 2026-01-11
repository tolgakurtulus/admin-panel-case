// Tema sağlayıcı bileşeni - Theme provider component
import React, { useState } from "react";
import { theme as antdTheme } from "antd";
import type { ThemeConfig } from "antd";
import { ThemeContext, type ThemeMode } from "./ThemeContext";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Tema modunu localStorage'dan başlatır - Initializes theme mode from localStorage
  const [mode, setMode] = useState<ThemeMode>(() => {
    const storedTheme = localStorage.getItem("theme") as ThemeMode | null;
    return storedTheme ?? "dark";
  });

  // Tema değiştirici fonksiyon - Toggles between light and dark theme
  const toggleTheme = () => {
    const newMode: ThemeMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
  };

  // Ant Design tema konfigürasyonu - Ant Design theme configuration
  const themeConfig: ThemeConfig = {
    algorithm: mode === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    token: {
      colorPrimary: "#1677ff",
      borderRadius: 8,
      fontSize: 14,
    },
    components: {
      Layout: {
        siderBg: mode === "dark" ? "#0f172a" : "#ffffff",
        headerBg: mode === "dark" ? "#020617" : "#ffffff",
        bodyBg: mode === "dark" ? "#020617" : "#f5f7fa",
      },
      Menu: {
        darkItemBg: "#0f172a",
        darkItemSelectedBg: "#1e293b",
        darkItemHoverBg: "#1e293b",
        itemBg: "#ffffff",
        itemSelectedBg: "#e6f4ff",
        itemHoverBg: "#f0f5ff",
      },
    },
  };

  // Tema bağlam sağlayıcısı. Uygulamaya tema durumunu sağlar. - Theme context provider. Provides theme state to the app
  return <ThemeContext.Provider value={{ mode, toggleTheme, themeConfig }}>{children}</ThemeContext.Provider>;
};
