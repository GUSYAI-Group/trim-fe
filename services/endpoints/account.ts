import { apiClient } from '../config/apiClient';
import { TAccount } from '@/types';

export interface AccountFilterParams {
  search?: string;
  role?: string;
}

export const accountService = {
  getAccounts: async (params?: AccountFilterParams) => {
    return apiClient.get<TAccount[]>('/accounts', params as Record<string, any>);
  },

  getAccountDetail: async (id: string) => {
    return apiClient.get<TAccount>(`/accounts/${id}`);
  },

  createAccount: async (payload: { email: string; password?: string; role?: string; displayName?: string; phone?: string }) => {
    return apiClient.post('/accounts', payload);
  },

  updateAccount: async (id: string, payload: { email?: string; password?: string; role?: string; displayName?: string; phone?: string }) => {
    return apiClient.put(`/accounts/${id}`, payload);
  },

  deleteAccount: async (id: string) => {
    return apiClient.delete(`/accounts/${id}`);
  },
};

