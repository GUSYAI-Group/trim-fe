import { apiClient } from '../config/apiClient';

export interface QueueItem {
  queue_id: string;
  queue_number: string;
  queue_status: 'waiting' | 'in_progress' | 'completed' | 'skipped';
  estimated_wait_time_mins: number;
  joined_at: string;
  booking_id: string;
  booking_date: string;
  start_time: string;
  booking_status: string;
  total_price: number;
  customer_name: string;
  customer_phone?: string;
  barber_id: string;
  barber_name: string;
  services?: string;
}

export interface QueueFilterParams {
  status?: string;
  date?: string;
  barberId?: string;
}

export const queueService = {
  getQueues: async (params?: QueueFilterParams) => {
    return apiClient.get<QueueItem[]>('/queues', params as Record<string, any>);
  },

  checkIn: async (bookingId: string) => {
    return apiClient.post<{ queueId: string; queueNumber: string; status: string }>('/queues/check-in', { bookingId });
  },

  updateStatus: async (queueId: string, status: 'waiting' | 'in_progress' | 'completed' | 'skipped') => {
    return apiClient.patch(`/queues/${queueId}/status`, { status });
  },

  deleteQueue: async (queueId: string) => {
    return apiClient.delete(`/queues/${queueId}`);
  },

  updateBookingStatus: async (bookingId: string, status: string) => {
    return apiClient.patch(`/bookings/${bookingId}/status`, { status });
  },

  createWalkIn: async (payload: {
    customerName: string;
    customerPhone?: string;
    barberId?: string;
    serviceIds?: string[];
  }) => {
    return apiClient.post<{ queueId: string; queueNumber: string; bookingId: string; customerName: string; status: string }>('/queues/walk-in', payload);
  },

  getBookings: async (params?: { date?: string; status?: string; barberId?: string }) => {
    return apiClient.get<any[]>('/bookings', params as Record<string, any>);
  },

  createBooking: async (payload: {
    customerId?: string;
    barberId: string;
    bookingDate: string;
    startTime: string;
    serviceIds: string[];
  }) => {
    return apiClient.post('/bookings', payload);
  },
};

