import { apiClient } from '../config/apiClient';
import { TKapster } from '@/types';

export interface BarberFilterParams {
  search?: string;
  status?: 'Semua' | 'Aktif' | 'Nonaktif';
}

export interface BarberResponseMeta {
  totalCount: number;
  activeCount: number;
  inactiveCount: number;
}

export const barberService = {
  getBarbers: async (params?: BarberFilterParams) => {
    return apiClient.get<TKapster[]>('/barbers', params as Record<string, any>);
  },

  getBarberDetail: async (id: string) => {
    return apiClient.get<TKapster>(`/barbers/${id}`);
  },

  createBarber: async (payload: { name: string; phone?: string; specialty?: string; isActive?: boolean }) => {
    return apiClient.post('/barbers', payload);
  },

  updateBarber: async (id: string, payload: { name?: string; phone?: string; specialty?: string; isActive?: boolean }) => {
    return apiClient.put(`/barbers/${id}`, payload);
  },

  deleteBarber: async (id: string) => {
    return apiClient.delete(`/barbers/${id}`);
  },
};

// Backward compatibility helper
export const getBarbers = async (): Promise<TKapster[]> => {
  const res = await barberService.getBarbers();
  return res.data;
};
