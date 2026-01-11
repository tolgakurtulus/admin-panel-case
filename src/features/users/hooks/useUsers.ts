// Kullanıcı listesi query hook'u - Users list query hook
import { useQuery } from "@tanstack/react-query";
import { userService } from "../api/user.service";
import type { User } from "../types";

export const useUsers = () =>
  useQuery<User[]>({
    queryKey: ["users"], // Cache anahtarı - Cache key
    queryFn: userService.getAll, // Tüm kullanıcıları getirir - Fetch all users
  });
