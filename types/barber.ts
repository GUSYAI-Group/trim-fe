export interface TKapster {
  id: string;
  name: string;
  specialty: string;
  status: 'Available' | 'Busy' | 'Off';
  rating: number;
  imageUrl?: string;
}

export interface TService {
  id: string;
  name: string;
  durationMinutes: number;
  price: number;
}
