// Tema context'ini kullanmak için custom hook - Custom hook for accessing theme context
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  // Provider dışında kullanımı engeller - Prevents usage outside ThemeProvider
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
