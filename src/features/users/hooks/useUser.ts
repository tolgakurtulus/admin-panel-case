// Tekil kullanıcı query hook'u - Single user query hook
import { useQuery } from "@tanstack/react-query";
import { userService } from "../api/user.service";
import type { UseQueryOptions } from "@tanstack/react-query";
import type { User } from "../types";

// queryKey ve queryFn dışarıdan override edilmesin - Prevent overriding queryKey & queryFn
type UseUserOptions = Omit<UseQueryOptions<User>, "queryKey" | "queryFn">;

export const useUser = (id: string, options?: UseUserOptions) => {
  return useQuery<User>({
    queryKey: ["user", id], // Cache anahtarı - Cache key
    queryFn: () => userService.getById(id), // API çağrısı - Fetch function
    enabled: !!id, // id yoksa fetch yapılmaz - Prevent fetch if id is missing
    ...options, // Dışarıdan gelen opsiyonlar - Spread custom options
  });
};
