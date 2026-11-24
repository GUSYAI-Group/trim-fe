import { apiClient } from '../config/apiClient';
import { TService } from '@/types';

export interface ServiceFilterParams {
  search?: string;
  category?: string;
}

export const servicesService = {
  getServices: async (params?: ServiceFilterParams) => {
    return apiClient.get<TService[]>('/services', params as Record<string, any>);
  },

  getServiceDetail: async (id: string) => {
    return apiClient.get<TService>(`/services/${id}`);
  },

  createService: async (payload: Partial<TService>) => {
    return apiClient.post('/services', payload);
  },

  updateService: async (id: string, payload: Partial<TService>) => {
    return apiClient.put(`/services/${id}`, payload);
  },

  deleteService: async (id: string) => {
    return apiClient.delete(`/services/${id}`);
  },
};

