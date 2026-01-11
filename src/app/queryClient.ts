import { QueryClient } from "@tanstack/react-query";

// React Query client konfigürasyonu - React Query client configuration
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // Hata durumunda 1 kez retry - Retry once on failure
      refetchOnWindowFocus: false, // Tab değişiminde otomatik refetch kapalı - Automatic refetch is disabled on tab changes.
    },
  },
});
