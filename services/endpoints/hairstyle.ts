import { apiClient } from '../config/apiClient';
import { THairstyle } from '@/types';

export interface HairstyleFilterParams {
  search?: string;
  faceShape?: string;
  hairType?: string;
}

export const hairstyleService = {
  getHairstyles: async (params?: HairstyleFilterParams) => {
    return apiClient.get<THairstyle[]>('/hairstyles', params as Record<string, any>);
  },

  getHairstyleDetail: async (id: string) => {
    return apiClient.get<THairstyle>(`/hairstyles/${id}`);
  },

  createHairstyle: async (payload: Partial<THairstyle>) => {
    return apiClient.post('/hairstyles', payload);
  },

  updateHairstyle: async (id: string, payload: Partial<THairstyle>) => {
    return apiClient.put(`/hairstyles/${id}`, payload);
  },

  deleteHairstyle: async (id: string) => {
    return apiClient.delete(`/hairstyles/${id}`);
  },
};

