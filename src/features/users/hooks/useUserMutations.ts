// Kullanıcı mutation hook'ları - User mutation hooks
import { useMutation } from "@tanstack/react-query";
import { userService } from "../api/user.service";
import { queryClient } from "@/app/queryClient";
import type { User } from "../types";

// Kullanıcı oluşturma - Create user mutation
export const useCreateUser = () =>
  useMutation({
    mutationFn: userService.create,
    // Başarılı olunca kullanıcı listesi invalidate edilir - Invalidate users list on success
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

// Update payload tipi -Update payload type
type UpdateUserPayload = {
  id: string;
  data: Omit<User, "id">;
};

// Kullanıcı güncelleme - Update user mutation
export const useUpdateUser = () =>
  useMutation<User, Error, UpdateUserPayload>({
    mutationFn: ({ id, data }) => userService.update(id, data),
    // Liste cache'i temizlenir - Invalidate users list cache
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });

// Kullanıcı silme - Delete user mutation
export const useDeleteUser = () =>
  useMutation({
    mutationFn: userService.delete,
    // Silme sonrası liste güncellenir - Refresh users list after delete
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
  });
