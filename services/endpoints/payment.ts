import { apiClient } from '../config/apiClient';
import { TPayment } from '@/types';

export interface PaymentFilterParams {
  search?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}

export const paymentService = {
  getPayments: async (params?: PaymentFilterParams) => {
    return apiClient.get<TPayment[]>('/payments', params as Record<string, any>);
  },

  createQris: async (bookingId: string) => {
    return apiClient.post('/payments/create-qris', { bookingId });
  },

  markAsPaid: async (id: string | number, paymentMethod: string = 'cash') => {
    return apiClient.patch(`/payments/${id}/pay`, { paymentMethod });
  },
};

