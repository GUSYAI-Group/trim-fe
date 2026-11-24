import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type TRole = 'owner' | 'admin' | 'barber' | 'customer';

export interface TUser {
  id: string;
  email: string;
  name: string;
  initials: string;
  role: TRole;
  phone?: string;
}

interface IAuthState {
  isAuthenticated: boolean;
  token: string | null;
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

export const useAuthStore = create<IAuthState>()(
  persist(
    (set) => ({
      isAuthenticated: true,
      token: 'mock-jwt-token',
      user: DEFAULT_USER,
      login: (token, userData) => {
        // Set cookie so Next.js server middleware can read it
        if (typeof document !== 'undefined') {
          document.cookie = `trim_auth_token=${token}; path=/; max-age=86400; SameSite=Lax`;
          document.cookie = `trim_user_role=${userData.role}; path=/; max-age=86400; SameSite=Lax`;
        }
        set({ isAuthenticated: true, token, user: userData });
      },
      logout: () => {
        if (typeof document !== 'undefined') {
          document.cookie = 'trim_auth_token=; path=/; max-age=0';
          document.cookie = 'trim_user_role=; path=/; max-age=0';
        }
        set({ isAuthenticated: false, token: null, user: DEFAULT_USER });
      },
    }),
    {
      name: 'trim-auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
