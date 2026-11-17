import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/* ─────────────────────────────────────────────────────────────
   1. TYPES
───────────────────────────────────────────────────────────── */

export type Role = 'owner' | 'admin' | 'barber' | 'customer';

export interface AccountItem {
  id: number;
  slug: string;
  initials: string;
  email: string;
  uuid: string;
  displayName?: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
  isOwner?: boolean;
}

export interface KapsterItem {
  phone: string;
  name: string;
  initials: string;
  specialty: string;
  finished: number;
  rating: string;
  statusText: 'Aktif' | 'Nonaktif';
  badgeType: 'success' | 'muted';
}

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  duration: number;
  price: number;
  isActive: boolean;
  description?: string;
}

export interface ProductItem {
  id: string;
  rawId: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  minStock: number;
  stockStatus: 'Aman' | 'Menipis' | 'Habis';
  isActive: boolean;
  description?: string;
}

export interface HairstyleItem {
  id: string;
  name: string;
  faceShapes: string[];
  description: string;
  hairType: string;
  maintenanceLevel: number;
  image: string;
  isAiActive: boolean;
}

export interface WaitingQueueItem {
  queueNo: string;
  timeRange: string;
  customerName: string;
  customerPhone?: string;
  serviceDetail: string;
  kapsterName: string;
  statusText: string;
  statusFlowText: string;
  checkInTime: string;
}

export interface InProgressQueueItem {
  queueNo: string;
  timeRange: string;
  customerName: string;
  serviceDetail: string;
  kapsterName: string;
  statusFlowText: string;
  progressMinutes: number;
  totalMinutes: number;
}

export interface CompletedQueueItem {
  queueNo: string;
  timeRange: string;
  customerName: string;
  serviceDetail: string;
  kapsterName: string;
  statusFlowText: string;
  paymentStatus: 'paid' | 'pending';
}

export interface LateCheckinItem {
  id: number;
  name: string;
  queueNo: string;
  time: string;
  late: string;
  kapster: string;
}

export interface DaySchedule {
  day: string;
  subtitle?: string;
  status: 'buka' | 'tutup';
  open: string;
  close: string;
  locked?: boolean;
}

export interface HolidayEntry {
  id: number;
  date: string;
  dateLabel: string;
  type: 'tanggal-libur' | 'rentang-libur';
  typeLabel: string;
  description: string;
}

export interface StoreSetting {
  id: number;
  key: string;
  value: string;
  description: string;
}

export interface AppNotification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'payment' | 'queue' | 'inventory' | 'booking' | 'system';
  isRead: boolean;
  link?: string;
}

/* ─────────────────────────────────────────────────────────────
   2. INITIAL SEED DATA
───────────────────────────────────────────────────────────── */

const INITIAL_ACCOUNTS: AccountItem[] = [
  { id: 1, slug: 'aditya', initials: 'AP', email: 'aditya@trim.id', uuid: '8f2c...a1e4', displayName: 'Aditya Pratama', role: 'owner', createdAt: '12 Sep 2026', updatedAt: '6 Okt 2026', isOwner: true },
  { id: 2, slug: 'dimas', initials: 'DS', email: 'dimas@trim.id', uuid: '9b1a...c7f2', displayName: 'Dimas Santoso', role: 'admin', createdAt: '12 Sep 2026', updatedAt: '6 Okt 2026' },
  { id: 3, slug: 'raka', initials: 'RP', email: 'raka@trim.id', uuid: '4e9d...b8c1', displayName: 'Raka Putra', role: 'barber', createdAt: '14 Sep 2026', updatedAt: '6 Okt 2026' },
  { id: 4, slug: 'alya', initials: 'AL', email: 'alya@trim.id', uuid: '1f3c...d9e8', displayName: 'Alya Lestari', role: 'customer', createdAt: '15 Sep 2026', updatedAt: '6 Okt 2026' },
  { id: 5, slug: 'wulan', initials: 'WP', email: 'wulan@trim.id', uuid: '7a2b...f4c6', displayName: 'Wulan Pertiwi', role: 'customer', createdAt: '16 Sep 2026', updatedAt: '5 Okt 2026' },
  { id: 6, slug: 'rafi', initials: 'RH', email: 'rafi@trim.id', uuid: '2d8e...a6f1', displayName: 'Rafi Hidayat', role: 'customer', createdAt: '17 Sep 2026', updatedAt: '28 Sep 2026' },
];

const INITIAL_KAPSTERS: KapsterItem[] = [
  { phone: '0812 3456 7890', name: 'Gus Farhan', initials: 'GF', specialty: 'Fade & taper', finished: 8, rating: '4,9', statusText: 'Aktif', badgeType: 'success' },
  { phone: '0813 7788 9900', name: 'Lefi Dian', initials: 'LD', specialty: 'Classic & pompadour', finished: 6, rating: '4,9', statusText: 'Aktif', badgeType: 'success' },
  { phone: '0821 4455 6677', name: 'Zidan Alex', initials: 'ZA', specialty: 'Texture & crop', finished: 4, rating: '4,8', statusText: 'Aktif', badgeType: 'success' },
  { phone: '0857 2211 3344', name: 'Ridho Arman', initials: 'RA', specialty: 'Buzz cut & beard', finished: 0, rating: '5,0', statusText: 'Aktif', badgeType: 'success' },
  { phone: '0819 6677 8899', name: 'Yoga Prasetyo', initials: 'YP', specialty: 'Mullet & wolf cut', finished: 0, rating: '4,7', statusText: 'Nonaktif', badgeType: 'muted' },
  { phone: '0878 1122 5566', name: 'Reza Firmansyah', initials: 'RF', specialty: 'Hair tattoo & color', finished: 0, rating: '4,6', statusText: 'Nonaktif', badgeType: 'muted' },
];

const INITIAL_SERVICES: ServiceItem[] = [
  { id: '1', name: 'Potong reguler', category: 'Potong rambut', duration: 35, price: 60000, isActive: true, description: 'Potong rambut rapi klasik dengan konsultasi bentuk wajah dan styling dasar.' },
  { id: '2', name: 'Skin fade', category: 'Potong rambut', duration: 45, price: 75000, isActive: true, description: 'Gradasi transisi halus dari kulit kepala hingga rambut atas, rapi maksimal.' },
  { id: '3', name: 'Potong + beard trim', category: 'Paket', duration: 60, price: 100000, isActive: true, description: 'Paket lengkap pangkas rambut dan perapihan kumis/janggut menggunakan razor.' },
  { id: '4', name: 'Potong anak', category: 'Potong rambut', duration: 30, price: 50000, isActive: true, description: 'Layanan ramah anak dengan gaya modern dan perlengkapan higienis.' },
  { id: '5', name: 'Hair wash', category: 'Perawatan', duration: 15, price: 20000, isActive: true, description: 'Cuci rambut menyegarkan dengan sampo menthol dan pijat kulit kepala ringan.' },
  { id: '6', name: 'Styling', category: 'Styling', duration: 15, price: 25000, isActive: true, description: 'Penataan rambut profesional menggunakan pomade/powder sesuai model pilihan.' },
  { id: '7', name: 'Hair color', category: 'Pewarnaan', duration: 90, price: 250000, isActive: true, description: 'Pewarnaan rambut trendi dengan produk berkualitas tanpa merusak akar.' },
];

const INITIAL_PRODUCTS: ProductItem[] = [
  { id: 'prd-1', rawId: 'pomade', name: 'Pomade Water-based', category: 'Minyak Rambut', price: 'Rp35.000', stock: 12, minStock: 5, stockStatus: 'Aman', isActive: true, description: 'Pomade formula ringan water-based, mudah dibilas dan tahan seharian.' },
  { id: 'prd-2', rawId: 'hair-spray', name: 'Hair Spray Ultra Hold', category: 'Hair Spray', price: 'Rp45.000', stock: 15, minStock: 5, stockStatus: 'Aman', isActive: true, description: 'Hair spray daya kunci ekstra untuk menjaga volume rambut tetap rapi.' },
  { id: 'prd-3', rawId: 'hair-powder', name: 'Hair Powder Volumizing', category: 'Powder', price: 'Rp50.000', stock: 0, minStock: 5, stockStatus: 'Habis', isActive: true, description: 'Serbuk rambut penambah volume instan dengan hasil matte alami.' },
  { id: 'prd-4', rawId: 'hair-tonic', name: 'Hair Tonic Herbal Menthol', category: 'Hair Tonic', price: 'Rp65.000', stock: 10, minStock: 5, stockStatus: 'Aman', isActive: true, description: 'Tonik herbal penyegar kulit kepala dan penguat akar rambut.' },
  { id: 'prd-5', rawId: 'clay', name: 'Matte Clay Strong Hold', category: 'Minyak Rambut', price: 'Rp30.000', stock: 3, minStock: 5, stockStatus: 'Menipis', isActive: true, description: 'Clay kuat tanpa kilap, cocok untuk gaya rambut kasual bertekstur.' },
  { id: 'prd-6', rawId: 'vitamin', name: 'Hair Serum Vitamin E', category: 'Serum', price: 'Rp55.000', stock: 9, minStock: 5, stockStatus: 'Aman', isActive: true, description: 'Serum nutrisi vitamin E untuk melindungi rambut dari polusi dan kering.' },
];

const INITIAL_HAIRSTYLES: HairstyleItem[] = [
  {
    id: 'skin-fade',
    name: 'Skin fade',
    faceShapes: ['Oval', 'Persegi', 'Berlian'],
    description: 'Potongan rapi dengan transisi halus dari kulit ke rambut bagian atas.',
    hairType: 'Lurus',
    maintenanceLevel: 2,
    image: '/hairstyles/skin-fade.jpg.png',
    isAiActive: true,
  },
  {
    id: 'textured-crop',
    name: 'Textured crop',
    faceShapes: ['Oval', 'Lonjong'],
    description: 'Potongan pendek dengan tekstur yang lebih ekspresif dan volume di bagian atas.',
    hairType: 'Bergelombang',
    maintenanceLevel: 3,
    image: '/hairstyles/textured-crop.jpg.png',
    isAiActive: true,
  },
  {
    id: 'french-crop',
    name: 'French crop',
    faceShapes: ['Bulat', 'Persegi'],
    description: 'Versi modern dengan poni pendek dan rambut samping yang lebih rapi.',
    hairType: 'Lurus',
    maintenanceLevel: 2,
    image: '/hairstyles/french-crop.jpg.png',
    isAiActive: true,
  },
  {
    id: 'classic-pompadour',
    name: 'Classic pompadour',
    faceShapes: ['Bulat', 'Oval'],
    description: 'Gaya klasik dengan volume tinggi di bagian atas dan samping yang rapi.',
    hairType: 'Lurus',
    maintenanceLevel: 4,
    image: '/hairstyles/classic-pompadour.jpg.png',
    isAiActive: true,
  },
  {
    id: 'modern-mullet',
    name: 'Modern mullet',
    faceShapes: ['Oval', 'Berlian'],
    description: 'Versi modern dengan bagian belakang yang lebih panjang dan ekspresif.',
    hairType: 'Bergelombang',
    maintenanceLevel: 5,
    image: '/hairstyles/modern-mullet.jpg.png',
    isAiActive: true,
  },
  {
    id: 'buzz-cut',
    name: 'Buzz cut',
    faceShapes: ['Oval', 'Persegi'],
    description: 'Potongan sangat pendek untuk tampilan bersih dan minimal.',
    hairType: 'Keriting',
    maintenanceLevel: 1,
    image: '/hairstyles/buzz-cut.jpg.png',
    isAiActive: true,
  },
];

const INITIAL_SCHEDULE: DaySchedule[] = [
  { day: 'Senin',  status: 'buka', open: '08:00', close: '18:00' },
  { day: 'Selasa', status: 'buka', open: '08:00', close: '18:00' },
  { day: 'Rabu',   status: 'buka', open: '08:00', close: '18:00' },
  { day: 'Kamis',  status: 'buka', open: '08:00', close: '18:00' },
  { day: 'Jumat',  status: 'buka', open: '08:00', close: '19:00' },
  { day: 'Sabtu',  status: 'buka', open: '09:00', close: '20:00' },
  { day: 'Minggu', subtitle: 'Tutup rutin', status: 'tutup', open: '—', close: '—', locked: true },
];

const INITIAL_HOLIDAYS: HolidayEntry[] = [
  { id: 1, date: '25 Desember 2026', dateLabel: 'Hari Raya Natal',   type: 'tanggal-libur', typeLabel: 'Tanggal libur', description: 'Libur Nasional — Hari Raya Natal' },
  { id: 2, date: '1 Januari 2027',   dateLabel: 'Tahun Baru Masehi', type: 'tanggal-libur', typeLabel: 'Tanggal libur', description: 'Libur Nasional — Tahun Baru Masehi' },
  { id: 3, date: '1–3 Januari 2027', dateLabel: 'Libur tahun baru',  type: 'rentang-libur', typeLabel: 'Rentang libur', description: 'Libur tahun baru — slot pelanggan ditutup selama rentang ini' },
];

const INITIAL_SETTINGS: StoreSetting[] = [
  { id: 1, key: 'is_store_closed', value: 'false',      description: 'Toko buka hari ini' },
  { id: 2, key: 'holiday_date',    value: '2026-12-25', description: 'Libur Nasional — Hari Raya Natal' },
];

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n-1',
    title: 'Pembayaran QRIS Berhasil',
    description: 'Rp75.000 dari Gus Ridho telah diverifikasi oleh Pakkasir.',
    time: '5 menit lalu',
    type: 'payment',
    isRead: false,
    link: '/payments',
  },
  {
    id: 'n-2',
    title: 'Peringatan Antrean',
    description: 'Rizky Maulana (A-024) belum check-in setelah 15 menit.',
    time: '18 menit lalu',
    type: 'queue',
    isRead: false,
    link: '/queue',
  },
  {
    id: 'n-3',
    title: 'Stok Produk Menipis',
    description: 'Clay tersisa 3 unit. Segera lakukan restock inventaris.',
    time: '45 menit lalu',
    type: 'inventory',
    isRead: false,
    link: '/products',
  },
  {
    id: 'n-4',
    title: 'Booking Selesai',
    description: 'Kapster Gus Farhan menyelesaikan cukuran ke-42 hari ini.',
    time: '2 jam lalu',
    type: 'booking',
    isRead: true,
    link: '/barbers',
  },
  {
    id: 'n-5',
    title: 'Sistem TRIM v1.0 Aktif',
    description: 'Semua terminal kasir terhubung stabil dan sinkron.',
    time: '1 hari lalu',
    type: 'system',
    isRead: true,
    link: '/help',
  },
];

/* ─────────────────────────────────────────────────────────────
   3. STORE INTERFACE & ACTIONS
───────────────────────────────────────────────────────────── */

interface TrimStoreState {
  // Accounts
  accounts: AccountItem[];
  addAccount: (data: { email: string; role: Role; displayName?: string; password?: string }) => AccountItem;
  updateAccount: (id: number, data: Partial<AccountItem>) => void;
  deleteAccount: (id: number) => void;

  // Barbers
  kapsters: KapsterItem[];
  addKapster: (data: { name: string; phone: string; specialty: string; rating?: string }) => KapsterItem;
  updateKapster: (phone: string, data: Partial<KapsterItem>) => void;
  toggleKapsterStatus: (phone: string) => void;
  deleteKapster: (phone: string) => void;

  // Services
  services: ServiceItem[];
  addService: (data: Omit<ServiceItem, 'id' | 'isActive'> & { isActive?: boolean }) => ServiceItem;
  updateService: (id: string, data: Partial<ServiceItem>) => void;
  toggleServiceStatus: (id: string) => void;
  deleteService: (id: string) => void;

  // Products
  products: ProductItem[];
  addProduct: (data: { name: string; category: string; price: string; stock: number; minStock: number; description?: string }) => ProductItem;
  updateProduct: (id: string, data: Partial<ProductItem>) => void;
  toggleProductActive: (id: string) => void;
  restockProduct: (id: string, amount: number) => void;
  deleteProduct: (id: string) => void;

  // Hairstyles
  hairstyles: HairstyleItem[];
  addHairstyle: (data: Omit<HairstyleItem, 'id'>) => HairstyleItem;
  updateHairstyle: (id: string, data: Partial<HairstyleItem>) => void;
  toggleHairstyleAi: (id: string) => void;
  deleteHairstyle: (id: string) => void;

  // Queue
  waitingList: WaitingQueueItem[];
  inProgressList: InProgressQueueItem[];
  completedList: CompletedQueueItem[];
  lateCheckins: LateCheckinItem[];
  skippedCount: number;
  addWalkInQueue: (data: { customerName: string; customerPhone?: string; kapsterName: string; serviceDetail: string; timeRange?: string; totalMinutes?: number }) => WaitingQueueItem;
  startQueueCut: (queueNo: string) => void;
  finishQueueCut: (queueNo: string) => void;
  skipLateCheckin: (id: number) => void;

  // Settings & Holidays
  schedule: DaySchedule[];
  updateSchedule: (schedule: DaySchedule[]) => void;
  holidays: HolidayEntry[];
  addHoliday: (data: { date: string; dateLabel: string; type: 'tanggal-libur' | 'rentang-libur'; description?: string }) => HolidayEntry;
  updateHoliday: (id: number, data: Partial<HolidayEntry>) => void;
  deleteHoliday: (id: number) => void;
  settings: StoreSetting[];
  updateSetting: (id: number, value: string, description: string) => void;

  // Notifications
  notifications: AppNotification[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  addNotification: (notif: Omit<AppNotification, 'id' | 'time' | 'isRead'>) => void;

  // Global reset to seed
  resetAllToSeed: () => void;
}

export const useTrimStore = create<TrimStoreState>()(
  persist(
    (set, get) => ({
      // Accounts State
      accounts: INITIAL_ACCOUNTS,
      addAccount: (data) => {
        const initials = data.email.slice(0, 2).toUpperCase();
        const slug = data.email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
        const newId = Date.now();
        const uuid = `${newId.toString(16).slice(-4)}...${Math.random().toString(16).slice(2, 6)}`;
        const now = new Date();
        const dateStr = `${now.getDate()} ${['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'][now.getMonth()]} ${now.getFullYear()}`;
        
        const newAcc: AccountItem = {
          id: newId,
          slug,
          initials,
          email: data.email,
          uuid,
          displayName: data.displayName || data.email.split('@')[0],
          role: data.role,
          createdAt: dateStr,
          updatedAt: dateStr,
        };

        set((state) => ({ accounts: [newAcc, ...state.accounts] }));
        get().addNotification({
          title: 'Akun Baru Dibuat',
          description: `Akun ${data.email} dengan peran ${data.role.toUpperCase()} berhasil ditambahkan.`,
          type: 'system',
          link: '/accounts',
        });
        return newAcc;
      },
      updateAccount: (id, data) => {
        set((state) => ({
          accounts: state.accounts.map((acc) => {
            if (acc.id === id) {
              const now = new Date();
              const dateStr = `${now.getDate()} ${['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'][now.getMonth()]} ${now.getFullYear()}`;
              return { ...acc, ...data, updatedAt: dateStr };
            }
            return acc;
          }),
        }));
      },
      deleteAccount: (id) => {
        set((state) => ({
          accounts: state.accounts.filter((acc) => acc.id !== id && !acc.isOwner),
        }));
      },

      // Barbers State
      kapsters: INITIAL_KAPSTERS,
      addKapster: (data) => {
        const initials = data.name
          .split(' ')
          .map((n) => n[0])
          .join('')
          .slice(0, 2)
          .toUpperCase() || 'KP';

        const newKapster: KapsterItem = {
          phone: data.phone,
          name: data.name,
          initials,
          specialty: data.specialty,
          finished: 0,
          rating: data.rating || '5,0',
          statusText: 'Aktif',
          badgeType: 'success',
        };

        set((state) => ({ kapsters: [newKapster, ...state.kapsters] }));
        get().addNotification({
          title: 'Kapster Baru Bergabung',
          description: `${data.name} terdaftar dengan spesialisasi ${data.specialty}.`,
          type: 'booking',
          link: '/barbers',
        });
        return newKapster;
      },
      updateKapster: (phone, data) => {
        set((state) => ({
          kapsters: state.kapsters.map((k) => (k.phone === phone ? { ...k, ...data } : k)),
        }));
      },
      toggleKapsterStatus: (phone) => {
        set((state) => ({
          kapsters: state.kapsters.map((k) => {
            if (k.phone === phone) {
              const nextStatus = k.statusText === 'Aktif' ? 'Nonaktif' : 'Aktif';
              const nextBadge = nextStatus === 'Aktif' ? 'success' : 'muted';
              return { ...k, statusText: nextStatus, badgeType: nextBadge };
            }
            return k;
          }),
        }));
      },
      deleteKapster: (phone) => {
        set((state) => ({
          kapsters: state.kapsters.filter((k) => k.phone !== phone),
        }));
      },

      // Services State
      services: INITIAL_SERVICES,
      addService: (data) => {
        const newId = String(Date.now());
        const newService: ServiceItem = {
          id: newId,
          name: data.name,
          category: data.category,
          duration: Number(data.duration) || 30,
          price: Number(data.price) || 50000,
          isActive: data.isActive !== undefined ? data.isActive : true,
          description: data.description || 'Layanan barbershop profesional TRIM Bandung.',
        };

        set((state) => ({ services: [newService, ...state.services] }));
        get().addNotification({
          title: 'Layanan Baru Ditambahkan',
          description: `Layanan "${data.name}" (${data.category}) siap dipesan pelanggan.`,
          type: 'booking',
          link: '/services',
        });
        return newService;
      },
      updateService: (id, data) => {
        set((state) => ({
          services: state.services.map((s) => (s.id === id ? { ...s, ...data } : s)),
        }));
      },
      toggleServiceStatus: (id) => {
        set((state) => ({
          services: state.services.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s)),
        }));
      },
      deleteService: (id) => {
        set((state) => ({
          services: state.services.filter((s) => s.id !== id),
        }));
      },

      // Products State
      products: INITIAL_PRODUCTS,
      addProduct: (data) => {
        const rawId = data.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
        const id = `prd-${Date.now().toString(36)}`;
        const stockNum = Number(data.stock) || 0;
        const minStockNum = Number(data.minStock) || 5;
        const stockStatus: 'Aman' | 'Menipis' | 'Habis' =
          stockNum === 0 ? 'Habis' : stockNum <= minStockNum ? 'Menipis' : 'Aman';

        const newProduct: ProductItem = {
          id,
          rawId,
          name: data.name,
          category: data.category,
          price: data.price.startsWith('Rp') ? data.price : `Rp${Number(data.price).toLocaleString('id-ID')}`,
          stock: stockNum,
          minStock: minStockNum,
          stockStatus,
          isActive: true,
          description: data.description || 'Produk grooming premium TRIM barbershop.',
        };

        set((state) => ({ products: [newProduct, ...state.products] }));
        get().addNotification({
          title: 'Produk Baru Didaftarkan',
          description: `Katalog "${data.name}" berhasil ditambahkan dengan stok ${stockNum} unit.`,
          type: 'inventory',
          link: '/products',
        });
        return newProduct;
      },
      updateProduct: (id, data) => {
        set((state) => ({
          products: state.products.map((p) => {
            if (p.id === id || p.rawId === id) {
              const updatedStock = data.stock !== undefined ? Number(data.stock) : p.stock;
              const updatedMin = data.minStock !== undefined ? Number(data.minStock) : p.minStock;
              const newStatus: 'Aman' | 'Menipis' | 'Habis' =
                updatedStock === 0 ? 'Habis' : updatedStock <= updatedMin ? 'Menipis' : 'Aman';
              return { ...p, ...data, stockStatus: newStatus };
            }
            return p;
          }),
        }));
      },
      toggleProductActive: (id) => {
        set((state) => ({
          products: state.products.map((p) => {
            if (p.id === id || p.rawId === id) {
              return { ...p, isActive: !p.isActive };
            }
            return p;
          }),
        }));
      },
      restockProduct: (id, amount) => {
        set((state) => ({
          products: state.products.map((p) => {
            if (p.id === id || p.rawId === id) {
              const newStock = Math.max(0, p.stock + Number(amount));
              const newStatus: 'Aman' | 'Menipis' | 'Habis' =
                newStock === 0 ? 'Habis' : newStock <= p.minStock ? 'Menipis' : 'Aman';
              return { ...p, stock: newStock, stockStatus: newStatus };
            }
            return p;
          }),
        }));
      },
      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id && p.rawId !== id),
        }));
      },

      // Hairstyles State
      hairstyles: INITIAL_HAIRSTYLES,
      addHairstyle: (data) => {
        const id = data.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
        const newStyle: HairstyleItem = {
          ...data,
          id,
        };

        set((state) => ({ hairstyles: [newStyle, ...state.hairstyles] }));
        get().addNotification({
          title: 'Model Rambut Baru',
          description: `Gaya "${data.name}" ditambahkan ke katalog rekomendasi AI.`,
          type: 'booking',
          link: '/hairstyles',
        });
        return newStyle;
      },
      updateHairstyle: (id, data) => {
        set((state) => ({
          hairstyles: state.hairstyles.map((h) => (h.id === id ? { ...h, ...data } : h)),
        }));
      },
      toggleHairstyleAi: (id) => {
        set((state) => ({
          hairstyles: state.hairstyles.map((h) => (h.id === id ? { ...h, isAiActive: !h.isAiActive } : h)),
        }));
      },
      deleteHairstyle: (id) => {
        set((state) => ({
          hairstyles: state.hairstyles.filter((h) => h.id !== id),
        }));
      },

      // Queue State
      waitingList: [
        {
          queueNo: 'A-019',
          timeRange: '14:35–15:10',
          customerName: 'Andi Wijaya',
          serviceDetail: 'Potong reguler • 35 menit',
          kapsterName: 'Gus Farhan',
          statusText: 'Tunggu 5 menit',
          statusFlowText: 'waiting / in_queue',
          checkInTime: 'Check-in 14:20',
        },
        {
          queueNo: 'A-020',
          timeRange: '14:45–15:30',
          customerName: 'Kevin Pratama',
          serviceDetail: 'Skin fade • 45 menit',
          kapsterName: 'Lefi Dian',
          statusText: 'Tunggu 15 menit',
          statusFlowText: 'waiting / in_queue',
          checkInTime: 'Check-in 14:25',
        },
        {
          queueNo: 'A-021',
          timeRange: '15:00–15:35',
          customerName: 'Rian Hidayat',
          serviceDetail: 'Potong reguler • 35 menit',
          kapsterName: 'Zidan Alex',
          statusText: 'Tunggu 30 menit',
          statusFlowText: 'waiting / in_queue',
          checkInTime: 'Check-in 14:28',
        },
      ],
      inProgressList: [
        {
          queueNo: 'A-018',
          timeRange: '14:00–14:45',
          customerName: 'Daffa Saputra',
          serviceDetail: 'Skin fade • 45 menit',
          kapsterName: 'Ridho Arman',
          statusFlowText: 'Queue / Booking: in_progress / in_service',
          progressMinutes: 30,
          totalMinutes: 45,
        },
        {
          queueNo: 'A-017',
          timeRange: '14:05–15:05',
          customerName: 'Naufal Ramadhan',
          serviceDetail: 'Potong + beard trim • 60 menit',
          kapsterName: 'Gus Farhan',
          statusFlowText: 'Queue / Booking: in_progress / in_service',
          progressMinutes: 25,
          totalMinutes: 60,
        },
      ],
      completedList: [
        {
          queueNo: 'A-015',
          timeRange: 'Selesai 14:00',
          customerName: 'Rangga Utama',
          serviceDetail: 'Potong reguler • Rp60.000',
          kapsterName: 'Lefi Dian',
          statusFlowText: 'Queue / Booking: completed / completed',
          paymentStatus: 'paid',
        },
        {
          queueNo: 'A-014',
          timeRange: 'Selesai 13:30',
          customerName: 'Bagas Putra',
          serviceDetail: 'Skin fade • Rp75.000',
          kapsterName: 'Zidan Alex',
          statusFlowText: 'Queue / Booking: completed / completed',
          paymentStatus: 'pending',
        },
      ],
      lateCheckins: [
        { id: 1, name: 'Rizky Maulana', queueNo: 'A-024', time: '14:00', late: '30 menit', kapster: 'Gus Farhan' },
        { id: 2, name: 'Fajar Nugroho', queueNo: 'A-025', time: '14:15', late: '15 menit', kapster: 'Ridho Arman' },
      ],
      skippedCount: 0,

      addWalkInQueue: (data) => {
        const nextNum = get().waitingList.length + get().inProgressList.length + get().completedList.length + 22;
        const queueNo = `A-${String(nextNum).padStart(3, '0')}`;
        const now = new Date();
        const checkInTime = `Check-in ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

        const newItem: WaitingQueueItem = {
          queueNo,
          timeRange: data.timeRange || '15:15–15:50',
          customerName: data.customerName,
          customerPhone: data.customerPhone,
          serviceDetail: data.serviceDetail,
          kapsterName: data.kapsterName,
          statusText: 'Menunggu giliran',
          statusFlowText: 'waiting / in_queue',
          checkInTime,
        };

        set((state) => ({
          waitingList: [...state.waitingList, newItem],
        }));

        get().addNotification({
          title: 'Walk-in Baru Masuk',
          description: `${data.customerName} (${queueNo}) antre layanan ${data.serviceDetail} dengan kapster ${data.kapsterName}.`,
          type: 'queue',
          link: '/queue',
        });

        return newItem;
      },

      startQueueCut: (queueNo) => {
        const target = get().waitingList.find((w) => w.queueNo === queueNo);
        if (!target) return;

        set((state) => ({
          waitingList: state.waitingList.filter((w) => w.queueNo !== queueNo),
          inProgressList: [
            {
              queueNo: target.queueNo,
              timeRange: '14:30–15:10',
              customerName: target.customerName,
              serviceDetail: target.serviceDetail,
              kapsterName: target.kapsterName,
              statusFlowText: 'Queue / Booking: in_progress / in_service',
              progressMinutes: 5,
              totalMinutes: 40,
            },
            ...state.inProgressList,
          ],
        }));
      },

      finishQueueCut: (queueNo) => {
        const target = get().inProgressList.find((p) => p.queueNo === queueNo);
        if (!target) return;

        set((state) => ({
          inProgressList: state.inProgressList.filter((p) => p.queueNo !== queueNo),
          completedList: [
            {
              queueNo: target.queueNo,
              timeRange: 'Selesai Baru Saja',
              customerName: target.customerName,
              serviceDetail: target.serviceDetail,
              kapsterName: target.kapsterName,
              statusFlowText: 'Queue / Booking: completed / completed',
              paymentStatus: 'paid',
            },
            ...state.completedList,
          ],
        }));

        // Increment kapster finished count
        set((state) => ({
          kapsters: state.kapsters.map((k) =>
            k.name.toLowerCase() === target.kapsterName.toLowerCase()
              ? { ...k, finished: k.finished + 1 }
              : k
          ),
        }));

        get().addNotification({
          title: 'Cukuran Selesai & Lunas',
          description: `Antrean ${target.queueNo} (${target.customerName}) telah dituntaskan oleh ${target.kapsterName}.`,
          type: 'booking',
          link: '/queue',
        });
      },

      skipLateCheckin: (id) => {
        const item = get().lateCheckins.find((l) => l.id === id);
        set((state) => ({
          lateCheckins: state.lateCheckins.filter((l) => l.id !== id),
          skippedCount: state.skippedCount + 1,
        }));

        if (item) {
          get().addNotification({
            title: 'Antrean Terlambat Di-skip',
            description: `${item.name} (${item.queueNo}) ditandai no_show karena melewati batas waktu check-in.`,
            type: 'queue',
            link: '/queue',
          });
        }
      },

      // Settings State
      schedule: INITIAL_SCHEDULE,
      updateSchedule: (schedule) => {
        set({ schedule });
        get().addNotification({
          title: 'Jadwal Toko Diperbarui',
          description: 'Jam operasional mingguan barbershop berhasil disimpan.',
          type: 'system',
          link: '/settings',
        });
      },

      holidays: INITIAL_HOLIDAYS,
      addHoliday: (data) => {
        const newEntry: HolidayEntry = {
          id: Date.now(),
          date: data.date,
          dateLabel: data.dateLabel,
          type: data.type,
          typeLabel: data.type === 'rentang-libur' ? 'Rentang libur' : 'Tanggal libur',
          description: data.description || data.dateLabel,
        };
        set((state) => ({ holidays: [newEntry, ...state.holidays] }));
        return newEntry;
      },
      updateHoliday: (id, data) => {
        set((state) => ({
          holidays: state.holidays.map((h) => (h.id === id ? { ...h, ...data } : h)),
        }));
      },
      deleteHoliday: (id) => {
        set((state) => ({
          holidays: state.holidays.filter((h) => h.id !== id),
        }));
      },

      settings: INITIAL_SETTINGS,
      updateSetting: (id, value, description) => {
        set((state) => ({
          settings: state.settings.map((s) => (s.id === id ? { ...s, value, description } : s)),
        }));
      },

      // Notifications State
      notifications: INITIAL_NOTIFICATIONS,
      markNotificationAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
        }));
      },
      markAllNotificationsAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
        }));
      },
      addNotification: (notif) => {
        const newNotif: AppNotification = {
          id: `n-${Date.now()}`,
          time: 'Baru saja',
          isRead: false,
          ...notif,
        };
        set((state) => ({
          notifications: [newNotif, ...state.notifications].slice(0, 15), // keep latest 15
        }));
      },

      // Full Reset
      resetAllToSeed: () => {
        set({
          accounts: INITIAL_ACCOUNTS,
          kapsters: INITIAL_KAPSTERS,
          services: INITIAL_SERVICES,
          products: INITIAL_PRODUCTS,
          hairstyles: INITIAL_HAIRSTYLES,
          schedule: INITIAL_SCHEDULE,
          holidays: INITIAL_HOLIDAYS,
          settings: INITIAL_SETTINGS,
          notifications: INITIAL_NOTIFICATIONS,
          skippedCount: 0,
        });
      },
    }),
    {
      name: 'trim_app_unified_storage',
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
      })),
    }
  )
);

