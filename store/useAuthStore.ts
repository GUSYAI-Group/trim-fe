import { create } from 'zustand';

export type TRole = 'owner' | 'admin' | 'barber' | 'customer';

export interface TUser {
  id: string;
  email: string;
  name: string;
  initials: string;
  role: TRole;
}

interface IAuthState {
  isAuthenticated: boolean;
  user: TUser;
  login: (token: string, userData: TUser) => void;
  logout: () => void;
}

const DEFAULT_USER: TUser = {
  id: '8f2c-a1e4',
  email: 'aditya@trim.id',
  name: 'Aditya Pratama',
  initials: 'AP',
  role: 'owner',
};

export const useAuthStore = create<IAuthState>((set) => ({
  isAuthenticated: true,
  user: DEFAULT_USER,
  login: (_token, userData) => set({ isAuthenticated: true, user: userData }),
  logout: () => set({ isAuthenticated: false, user: DEFAULT_USER }),
}));
