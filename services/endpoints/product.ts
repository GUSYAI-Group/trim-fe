import { apiClient } from '../config/apiClient';
import { TProduct } from '@/types';

export interface ProductFilterParams {
  search?: string;
  category?: string;
  stockStatus?: string;
  activeStatus?: string;
}

export const productService = {
  getProducts: async (params?: ProductFilterParams) => {
    return apiClient.get<TProduct[]>('/products', params as Record<string, any>);
  },

  getProductDetail: async (id: string) => {
    return apiClient.get<TProduct>(`/products/${id}`);
  },

  createProduct: async (payload: Partial<TProduct>) => {
    return apiClient.post('/products', payload);
  },

  updateProduct: async (id: string, payload: Partial<TProduct>) => {
    return apiClient.put(`/products/${id}`, payload);
  },

  toggleActive: async (id: string, isActive?: boolean) => {
    return apiClient.patch(`/products/${id}/status`, { isActive });
  },

  deleteProduct: async (id: string) => {
    return apiClient.delete(`/products/${id}`);
  },

  adjustStock: async (id: string, payload: { type: 'stock_in' | 'stock_out' | 'adjustment'; quantity: number; notes?: string }) => {
    return apiClient.post(`/products/${id}/adjust-stock`, payload);
  },
};

