'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Dropdown } from '@/components/ui';
import {
  Plus,
  Search,
  Scissors,
  ListFilter,
  AlertCircle,
  Edit,
  Clock,
  ChevronLeft,
  ChevronRight,
  Trash2,
  X,
  Power,
} from 'lucide-react';
import { useTrimStore, ServiceItem } from '@/store/useTrimStore';

const CATEGORY_OPTIONS = [
  { label: 'Semua kategori', value: 'Semua' },
  { label: 'Potong rambut', value: 'Potong rambut' },
  { label: 'Paket', value: 'Paket' },
  { label: 'Perawatan', value: 'Perawatan' },
  { label: 'Styling', value: 'Styling' },
  { label: 'Pewarnaan', value: 'Pewarnaan' },
];

export default function ServicesView() {
  const services = useTrimStore((s) => s.services);
  const toggleServiceStatus = useTrimStore((s) => s.toggleServiceStatus);
  const deleteService = useTrimStore((s) => s.deleteService);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggle = (id: string, name: string, currentActive: boolean) => {
    toggleServiceStatus(id);
    showToast(`Layanan "${name}" berhasil di${currentActive ? 'nonaktifkan' : 'aktifkan'}.`);
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Yakin ingin menghapus layanan "${name}"?`)) {
      deleteService(id);
      showToast(`Layanan "${name}" berhasil dihapus.`);
    }
  };

  const filteredServices = services.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const activeServices = services.filter((s) => s.isActive);
  const avgDuration =
    activeServices.length > 0
      ? Math.round(
          activeServices.reduce((sum, s) => sum + s.duration, 0) / activeServices.length
        )
      : 0;

  return (
    <div className="space-y-6 text-white font-space-grotesk no-scrollbar selection:bg-secondary selection:text-white pb-16">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#1E1E22] border border-secondary/40 shadow-2xl shadow-secondary/20 font-outfit text-[14px] text-white"
          >
            <div className="w-2 h-2 rounded-full bg-secondary animate-ping" />
            <span className="font-semibold">{toastMessage}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="ml-2 text-text-muted hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-[28px] font-extrabold text-white tracking-tight font-outfit">
            Kelola Layanan
          </h1>
          <p className="text-sm md:text-base text-text-muted mt-1 font-outfit">
            Menu layanan, kategori, durasi, dan harga yang tampil di aplikasi pelanggan.
          </p>
        </div>

        {/* Link Navigasi ke Halaman Tambah Layanan */}
        <Link
          href="/services/form"
          className="bg-secondary hover:bg-secondary/90 text-white px-5 py-2.5 rounded-xl text-sm font-bold font-outfit flex items-center justify-center gap-2 shadow-lg shadow-secondary/20 transition-all active:scale-[0.98] cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah layanan</span>
        </Link>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-surface border border-border p-6 rounded-2xl flex flex-col justify-between gap-4 h-auto min-h-[140px] transition-all duration-200 hover:-translate-y-0.5 hover:border-border/80">
          <div className="flex items-center justify-between text-text-muted">
            <span className="text-[15px] font-medium font-outfit">Layanan aktif</span>
            <ListFilter className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-white mb-1 font-outfit">
              {activeServices.length}
            </h3>
            <p className="text-[13px] text-emerald-400 font-medium font-outfit">
              Layanan aktif tersedia untuk booking
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-surface border border-border p-6 rounded-2xl flex flex-col justify-between gap-4 h-auto min-h-[140px] transition-all duration-200 hover:-translate-y-0.5 hover:border-border/80">
          <div className="flex items-center justify-between text-text-muted">
            <span className="text-[15px] font-medium font-outfit">Layanan paling populer</span>
            <Scissors className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-1 font-outfit truncate">
              {services[0]?.name || 'Potong reguler'}
            </h3>
            <p className="text-[13px] text-text-muted font-outfit">Populer di TRIM Bandung</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-surface border border-border p-6 rounded-2xl flex flex-col justify-between gap-4 h-auto min-h-[140px] transition-all duration-200 hover:-translate-y-0.5 hover:border-border/80">
          <div className="flex items-center justify-between text-text-muted">
            <span className="text-[15px] font-medium font-outfit">Rata-rata durasi layanan</span>
            <Clock className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-white mb-1 font-outfit">
              {avgDuration} menit
            </h3>
            <p className="text-[13px] text-text-muted font-outfit">
              Rata-rata durasi pengerjaan layanan aktif
            </p>
          </div>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="space-y-4 pt-1">
        {/* Table Filter Header */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <h2 className="text-lg md:text-[20px] font-bold text-white font-outfit">Menu layanan</h2>

          <div className="flex items-center gap-3">
            {/* Search Bar */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama layanan"
                className="w-full bg-surface border border-border rounded-xl pl-9 pr-4 py-2 text-[14px] text-white placeholder:text-text-muted focus:outline-none focus:border-secondary transition-colors font-outfit"
              />
            </div>

            {/* Custom Dropdown Kategori */}
            <Dropdown
              value={selectedCategory}
              onChange={setSelectedCategory}
              options={CATEGORY_OPTIONS}
              align="right"
            />
          </div>
        </div>

        {/* Data Table Container */}
        <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#222225] border-b border-border">
                <tr>
                  <th className="py-4 px-6 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit">
                    Nama layanan
                  </th>
                  <th className="py-4 px-5 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit">
                    Durasi (menit)
                  </th>
                  <th className="py-4 px-5 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit">
                    Harga
                  </th>
                  <th className="py-4 px-5 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit">
                    Kategori
                  </th>
                  <th className="py-4 px-5 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit">
                    Status aktif
                  </th>
                  <th className="py-4 px-6 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit text-right">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 text-text-main">
                {filteredServices.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-text-muted font-outfit text-sm">
                      Tidak ada layanan yang sesuai dengan pencarian.
                    </td>
                  </tr>
                ) : (
                  filteredServices.map((item) => (
                    <tr key={item.id} className="hover:bg-raised/40 transition-colors duration-150">
                      <td className="py-4 px-6">
                        <div className="font-bold text-white text-[15px] font-outfit">{item.name}</div>
                        <div className="text-[13px] text-text-muted font-outfit mt-0.5">
                          Kategori: {item.category}
                        </div>
                      </td>
                      <td className="py-4 px-5 font-bold text-white text-[14px] font-outfit">
                        {item.duration} menit
                      </td>
                      <td className="py-4 px-5 font-bold text-white text-[14px] font-outfit">
                        Rp{item.price.toLocaleString('id-ID')}
                      </td>
                      <td className="py-4 px-5 text-text-muted font-medium text-[14px] font-outfit">
                        {item.category}
                      </td>
                      <td className="py-4 px-5">
                        <button
                          type="button"
                          onClick={() => handleToggle(item.id, item.name, item.isActive)}
                          className="cursor-pointer active:scale-95 transition-transform"
                          title="Klik untuk ubah status"
                        >
                          {item.isActive ? (
                            <div className="px-2.5 py-1 text-[13px] rounded-md font-medium font-outfit flex items-center gap-1.5 w-fit bg-emerald-950/40 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-900/40 transition-colors">
                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              Aktif
                            </div>
                          ) : (
                            <div className="px-2.5 py-1 text-[13px] rounded-md font-medium font-outfit flex items-center gap-1.5 w-fit bg-zinc-500/10 text-zinc-400 border border-border hover:bg-zinc-500/20 transition-colors">
                              <div className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                              Nonaktif
                            </div>
                          )}
                        </button>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-3 font-outfit">
                          {/* Toggle Active Button */}
                          <button
                            type="button"
                            onClick={() => handleToggle(item.id, item.name, item.isActive)}
                            className="text-xs font-semibold px-2.5 py-1 rounded-lg border border-border bg-surface text-text-muted hover:text-white hover:bg-raised transition-colors cursor-pointer"
                          >
                            {item.isActive ? 'Nonaktifkan' : 'Aktifkan'}
                          </button>

                          {/* Link Edit */}
                          <Link
                            href={`/services/form?id=${item.id}`}
                            className="text-secondary font-bold text-[14px] hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Edit className="w-4 h-4" />
                            <span>Edit</span>
                          </Link>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => handleDelete(item.id, item.name)}
                            className="p-1 text-text-muted hover:text-red-400 transition-colors cursor-pointer"
                            title="Hapus layanan"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Pagination */}
          <div className="p-4 md:px-6 border-t border-border flex items-center justify-between text-[13px] text-text-muted font-outfit">
            <span>
              Menampilkan 1–{filteredServices.length} dari {services.length} layanan
            </span>
            <div className="flex items-center gap-3">
              <button
                className="p-1 rounded text-text-muted hover:text-white disabled:opacity-40 transition-colors"
                disabled
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="w-7 h-7 rounded-md bg-secondary text-white font-bold flex items-center justify-center text-[13px]">
                1
              </span>
              <button
                className="p-1 rounded text-text-muted hover:text-white disabled:opacity-40 transition-colors"
                disabled
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Warning Alert Note */}
      <div className="bg-[#24130A] border-l-4 border-secondary rounded-lg p-5 flex items-start gap-4 shadow-md font-outfit transition-transform hover:translate-x-1 duration-200">
        <AlertCircle className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-secondary font-bold text-[14px] font-outfit">
            Harga booking tersinkronisasi otomatis
          </h4>
          <p className="text-[13px] text-text-muted leading-relaxed font-outfit">
            Perubahan harga dan status layanan akan otomatis diterapkan pada pembuatan antrean dan pemesanan baru.
          </p>
        </div>
      </div>
    </div>
  );
}
