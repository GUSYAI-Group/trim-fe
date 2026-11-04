import React from 'react';
import { HelpCircle, ShieldCheck, Clock, Sparkles, CreditCard, Package } from 'lucide-react';
import { Card, Alert, Badge } from '@/components/ui';

const HELP_GUIDES = [
  {
    title: 'Monitor Antrean & Walk-in',
    badge: 'Operasional',
    icon: Clock,
    description:
      'Pantau pelanggan di kolom Menunggu, Sedang Cukur, dan Selesai. Jika pelanggan reservasi belum check-in melewati jadwal, gunakan tombol Skip untuk mengubah status ke skipped / no_show.',
  },
  {
    title: 'Katalog Gaya Rambut & AI Try-On',
    badge: 'AI Fitur',
    icon: Sparkles,
    description:
      'Setiap gaya rambut yang memiliki status AI Aktif akan muncul sebagai referensi rekomendasi wajah otomatis dan Virtual Try-On pada aplikasi pelanggan.',
  },
  {
    title: 'Manajemen Produk & Persediaan',
    badge: 'Inventori',
    icon: Package,
    description:
      'Status stok dihitung otomatis berdasarkan ambang minimum (Aman, Menipis, Habis). Perubahan jumlah stok pada mode edit dicatat sebagai penyesuaian persediaan.',
  },
  {
    title: 'Pembayaran QRIS Pakkasir',
    badge: 'Keuangan',
    icon: CreditCard,
    description:
      'Setiap transaksi QRIS ditautkan 1:1 dengan booking. Pembayaran berstatus Lunas memiliki timestamp paid_at, sedangkan Menunggu/Gagal ditampilkan pada tabel terpisah.',
  },
  {
    title: 'Hak Akses & Keamanan Akun',
    badge: 'Keamanan',
    icon: ShieldCheck,
    description:
      'Terdapat 4 peran: Owner, Admin, Barber, dan Customer. Akun utama Owner dilindungi sistem dan tidak dapat dihapus oleh Admin biasa.',
  },
  {
    title: 'Pengaturan Jam & Hari Libur',
    badge: 'Konfigurasi',
    icon: HelpCircle,
    description:
      'Atur jadwal buka–tutup mingguan serta hari libur khusus. Tanggal libur khusus otomatis menutup slot reservasi pelanggan tanpa mengubah jadwal rutin.',
  },
];

export function HelpFaqSection() {
  return (
    <div className="space-y-6">
      <Alert
        variant="accent"
        title="Pusat Dokumentasi & Operasional TRIM"
        description="Gunakan panduan ringkas di bawah ini untuk memahami alur kerja antrean, sinkronisasi QRIS, serta aturan manajemen katalog dan staf."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {HELP_GUIDES.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title} variant="surface" padding="md" className="space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-raised border border-border flex items-center justify-center text-secondary">
                    <Icon className="w-4 h-4" />
                  </div>
                  <Badge variant="accent">{item.badge}</Badge>
                </div>
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="text-xs text-text-muted leading-relaxed">{item.description}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

