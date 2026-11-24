import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email wajib diisi')
    .email('Format email tidak valid (contoh: user@trim.id)'),
  password: z
    .string()
    .min(1, 'Kata sandi wajib diisi')
    .min(6, 'Kata sandi minimal 6 karakter'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const barberSchema = z.object({
  name: z
    .string()
    .min(1, 'Nama kapster wajib diisi')
    .min(3, 'Nama kapster minimal 3 karakter'),
  phone: z
    .string()
    .min(1, 'Nomor telepon wajib diisi')
    .regex(/^(\+62|62|0)8[1-9][0-9]{6,10}$/, 'Format nomor WhatsApp/telepon tidak valid (contoh: 08123456789)'),
  specialty: z
    .string()
    .min(1, 'Spesialisasi wajib dipilih/diisi'),
  isActive: z.boolean(),
});

export type BarberFormData = z.infer<typeof barberSchema>;

export const serviceSchema = z.object({
  name: z
    .string()
    .min(1, 'Nama layanan wajib diisi')
    .min(3, 'Nama layanan minimal 3 karakter'),
  category: z
    .string()
    .min(1, 'Kategori wajib dipilih'),
  duration: z
    .number()
    .min(5, 'Durasi minimal 5 menit')
    .max(240, 'Durasi maksimal 240 menit'),
  price: z
    .number()
    .min(0, 'Harga tidak boleh negatif'),
  isActive: z.boolean(),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;

export const productSchema = z.object({
  name: z
    .string()
    .min(1, 'Nama produk wajib diisi')
    .min(2, 'Nama produk minimal 2 karakter'),
  category: z
    .string()
    .min(1, 'Kategori produk wajib dipilih'),
  price: z
    .coerce
    .number()
    .min(1000, 'Harga produk minimal Rp1.000'),
  stock: z
    .coerce
    .number()
    .min(0, 'Jumlah stok minimal 0'),
  minStock: z
    .coerce
    .number()
    .min(1, 'Batas peringatan stok minimal 1'),
  isActive: z.boolean(),
});

export type ProductFormData = z.infer<typeof productSchema>;
