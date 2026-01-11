// Kullanıcı servis katmanı - User service layer

import { nanoid } from "@reduxjs/toolkit";
import type { User } from "../types";
import { users as mockUsers } from "./user.mock";

// localStorage anahtarı - localStorage key
const USERS_KEY = "users";

// localStorage'dan kullanıcıları yükler - Loads users from localStorage
const loadUsers = (): User[] => JSON.parse(localStorage.getItem(USERS_KEY) || "[]");

// Kullanıcıları localStorage'a kaydeder - Persists users to localStorage
const saveUsers = (users: User[]) => localStorage.setItem(USERS_KEY, JSON.stringify(users));

// İlk açılışta mock datayı storage'a basar - Seeds localStorage with mock data on first load
export const initializeUserStorage = () => {
  const existingUsers = loadUsers();
  if (existingUsers.length === 0) saveUsers(mockUsers);
};

// Kullanıcı CRUD işlemleri - User CRUD operations
export const userService = {
  // Tüm kullanıcıları getirir - Fetch all users
  getAll: async (): Promise<User[]> => loadUsers(),
  // ID ile kullanıcı getirir- Fetch user by id
  getById: async (id: string): Promise<User> => {
    const user = loadUsers().find((u) => u.id === id);
    if (!user) throw new Error("User not found"); // Kullanıcı yoksa hata fırlatılır - Throw error if user not found
    return user;
  },
  // Yeni kullanıcı oluşturur - Create new user
  create: async (data: Omit<User, "id">): Promise<User> => {
    const users = loadUsers();

    // Unique id üretilir - Generate unique id
    const newUser: User = {
      id: nanoid(),
      ...data,
    };

    users.unshift(newUser);
    saveUsers(users);
    return newUser;
  },
  // Kullanıcı günceller - Update existing user
  update: async (id: string, data: Omit<User, "id">): Promise<User> => {
    const users = loadUsers();
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) throw new Error("User not found"); // Kullanıcı bulunamazsa hata - Throw error if user not found

    // Mevcut kullanıcı güncellenir - Merge updated fields
    users[index] = {
      ...users[index],
      ...data,
    };

    saveUsers(users);
    return users[index];
  },
  // Kullanıcı siler - Delete user
  delete: async (id: string): Promise<string> => {
    const users = loadUsers().filter((u) => u.id !== id);
    saveUsers(users);
    return id;
  },
};
