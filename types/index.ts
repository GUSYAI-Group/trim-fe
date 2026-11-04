import { TRole } from '@/store/useAuthStore';

export interface TKapster {
  id: string;
  uuid: string;
  phone: string;
  rawPhone: string;
  name: string;
  initials: string;
  specialty: string;
  email: string;
  finished: number;
  weeklyCuts: number;
  weeklyIncome: string;
  rating: string;
  status: 'aktif' | 'nonaktif';
  imageUrl?: string;
}

export interface TService {
  id: string;
  name: string;
  category: string;
  duration: number;
  price: number;
  priceFormatted: string;
  isActive: boolean;
}

export interface THairstyle {
  id: string;
  uuid: string;
  name: string;
  faceShapes: string[];
  description: string;
  hairType: string;
  maintenanceLevel: number;
  image: string;
  imageName: string;
  isAiActive: boolean;
}

export interface TProduct {
  id: string;
  rawId: string;
  uuid: string;
  name: string;
  category: string;
  price: number;
  priceFormatted: string;
  stock: number;
  minStock: number;
  stockStatus: 'Aman' | 'Menipis' | 'Habis';
  isActive: boolean;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface TPayment {
  id: number;
  qrisRef: string;
  qrisId: string;
  bookingUuid: string;
  customer: string;
  paidAt: string;
  nominal: string;
  status: 'lunas' | 'menunggu' | 'gagal' | 'dikembalikan';
  hasPaidAt: boolean;
}

export interface TAccount {
  id: number;
  slug: string;
  initials: string;
  email: string;
  uuid: string;
  displayName?: string;
  role: TRole;
  createdAt: string;
  updatedAt: string;
  isOwner?: boolean;
}

export interface TDaySchedule {
  day: string;
  subtitle?: string;
  status: 'buka' | 'tutup';
  open: string;
  close: string;
  locked?: boolean;
}

export interface THolidayEntry {
  id: number;
  date: string;
  dateLabel: string;
  type: 'tanggal-libur' | 'rentang-libur';
  typeLabel: string;
  description: string;
}

export interface TStoreSetting {
  id: number;
  key: string;
  value: string;
  description: string;
}

