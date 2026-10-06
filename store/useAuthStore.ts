import { create } from 'zustand';

export interface TUser {
  id: string;
  role: 'Admin' | 'Owner' | 'Cashier';
  name: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: null | TUser;
  login: (token: string, userData: TUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (token, userData) => set({ isAuthenticated: true, user: userData }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));
