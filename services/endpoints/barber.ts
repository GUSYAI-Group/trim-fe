import { apiClient } from '../config/apiClient';
import { TKapster } from '@/types/barber';
import mockData from '@/utils/mocks/mockBarbers.json';

// Nanti saat integrasi: ubah return dengan memanggil API betulan
export const getBarbers = async (): Promise<TKapster[]> => {
  // Simulasi pemanggilan API
  await apiClient.get('/barbers');
  
  // Return dummy data untuk keperluan slicing
  return mockData as TKapster[];
};
