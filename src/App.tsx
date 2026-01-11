import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import { useTheme } from "@/theme/useTheme";
import { router } from "@/routes/router";
import { useEffect } from "react";
import { initializeUserStorage } from "./features/users/api/user.service";
import { initializeProductStorage } from "./features/products/api/product.service";

export function App() {
  // Tema konfigürasyonunu context üzerinden alır - Gets theme configuration from ThemeContext
  const { themeConfig } = useTheme();

  // Uygulama ilk yüklendiğinde localStorage başlangıç verilerini hazırlar - Initializes localStorage data on app startup
  useEffect(() => {
    initializeUserStorage();
    initializeProductStorage();
  }, []);

  return (
    // Ant Design global theme provider
    <ConfigProvider theme={themeConfig}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}
