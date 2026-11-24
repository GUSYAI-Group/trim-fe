import { apiClient } from '../config/apiClient';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  initials: string;
  role: 'owner' | 'admin' | 'barber' | 'customer';
  phone?: string;
}

export const authService = {
  getMe: async () => {
    return apiClient.get<UserProfile>('/auth/me');
  },

  updateProfile: async (payload: { name?: string; phone?: string }) => {
    return apiClient.put<{ id: string; name: string; phone?: string }>('/auth/profile', payload);
  },

  changePassword: async (payload: { currentPassword: string; newPassword: string }) => {
    return apiClient.put('/auth/password', payload);
  },
};

