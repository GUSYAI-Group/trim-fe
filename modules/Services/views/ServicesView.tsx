"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Scissors, ListFilter, AlertCircle, Edit, Clock, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

interface ServiceItem {
  id: string;
  name: string;
  category: string;
  duration: number;
  price: number;
  isActive: boolean;
}

const INITIAL_SERVICES: ServiceItem[] = [
  { id: "1", name: "Potong reguler", category: "Potong rambut", duration: 35, price: 60000, isActive: true },
  { id: "2", name: "Skin fade", category: "Potong rambut", duration: 45, price: 75000, isActive: true },
  { id: "3", name: "Potong + beard trim", category: "Paket", duration: 60, price: 100000, isActive: true },
  { id: "4", name: "Potong anak", category: "Potong rambut", duration: 30, price: 50000, isActive: true },
  { id: "5", name: "Hair wash", category: "Perawatan", duration: 15, price: 20000, isActive: true },
  { id: "6", name: "Styling", category: "Styling", duration: 15, price: 25000, isActive: true },
  { id: "7", name: "Hair color", category: "Pewarnaan", duration: 90, price: 250000, isActive: true },
];

export default function ServicesView() {
  const [services] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const filteredServices = services.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Semua" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 text-white font-space-grotesk no-scrollbar selection:bg-secondary selection:text-white pb-10">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-[28px] font-extrabold text-white tracking-tight font-outfit">Kelola Layanan</h1>
          <p className="text-xs md:text-sm text-text-muted mt-1 font-outfit">
            Menu layanan, kategori, durasi, dan harga yang tampil di aplikasi pelanggan.
          </p>
        </div>

        {/* Link Navigasi ke Halaman Tambah Layanan */}
        <Link
          href="/services/form"
          className="bg-secondary hover:bg-secondary/90 text-white px-4 py-2.5 rounded-xl text-xs font-bold font-outfit flex items-center justify-center gap-2 shadow-lg shadow-secondary/20 transition-all active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah layanan</span>
        </Link>
      </div>

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div className="bg-surface border border-border p-5 rounded-2xl flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between text-text-muted">
            <span className="text-xs font-medium font-outfit">Layanan aktif</span>
            <ListFilter className="w-4 h-4 text-secondary" />
          </div>
          <div>
            <span className="text-3xl font-extrabold text-white font-outfit">
              {services.filter((s) => s.isActive).length}
            </span>
            <p className="text-[11px] text-emerald-400 mt-1 font-medium font-outfit">
              Layanan aktif tersedia untuk booking
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-surface border border-border p-5 rounded-2xl flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between text-text-muted">
            <span className="text-xs font-medium font-outfit">Layanan paling populer</span>
            <Scissors className="w-4 h-4 text-secondary" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-white font-outfit block">
              Potong reguler
            </span>
            <p className="text-[11px] text-text-muted mt-1 font-outfit">12 booking hari ini</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-surface border border-border p-5 rounded-2xl flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between text-text-muted">
            <span className="text-xs font-medium font-outfit">Rata-rata durasi layanan</span>
            <Clock className="w-4 h-4 text-secondary" />
          </div>
          <div>
            <span className="text-3xl font-extrabold text-white font-outfit">41 menit</span>
            <p className="text-[11px] text-text-muted mt-1 font-outfit">
              Rata-rata duration_minutes layanan aktif
            </p>
          </div>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="space-y-4 pt-1">
        {/* Table Filter Header */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <h2 className="text-base font-bold text-white font-outfit">Menu layanan</h2>

          <div className="flex items-center gap-2">
            {/* Search Bar */}
            <div className="relative flex-1 sm:w-56">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama layanan"
                className="w-full bg-surface border border-border rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-text-muted focus:outline-none focus:border-secondary font-outfit"
              />
            </div>

            {/* Category Select */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-surface border border-border text-text-muted text-xs font-medium rounded-xl pl-3 pr-8 py-1.5 focus:outline-none focus:border-secondary cursor-pointer font-outfit"
              >
                <option value="Semua" className="bg-surface text-white">Semua kategori</option>
                <option value="Potong rambut" className="bg-surface text-white">Potong rambut</option>
                <option value="Paket" className="bg-surface text-white">Paket</option>
                <option value="Perawatan" className="bg-surface text-white">Perawatan</option>
                <option value="Styling" className="bg-surface text-white">Styling</option>
                <option value="Pewarnaan" className="bg-surface text-white">Pewarnaan</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-text-muted absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Data Table Container */}
        <div className="bg-surface border border-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface text-text-muted uppercase tracking-wider text-[11px] border-b border-border/60 font-outfit">
                <tr>
                  <th className="py-3.5 px-6 font-semibold">Nama layanan</th>
                  <th className="py-3.5 px-5 font-semibold">Durasi (menit)</th>
                  <th className="py-3.5 px-5 font-semibold">Harga</th>
                  <th className="py-3.5 px-5 font-semibold">Kategori</th>
                  <th className="py-3.5 px-5 font-semibold">Status aktif</th>
                  <th className="py-3.5 px-6 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 text-text-main">
                {filteredServices.map((item) => (
                  <tr key={item.id} className="hover:bg-raised/50 transition-colors">
                    <td className="py-3.5 px-6">
                      <div className="font-bold text-white text-xs">{item.name}</div>
                      <div className="text-[11px] text-text-muted font-outfit">Kategori: {item.category}</div>
                    </td>
                    <td className="py-3.5 px-5 font-bold text-white font-outfit">{item.duration} menit</td>
                    <td className="py-3.5 px-5 font-bold text-white font-outfit">
                      Rp{item.price.toLocaleString("id-ID")}
                    </td>
                    <td className="py-3.5 px-5 text-text-muted font-outfit">{item.category}</td>
                    <td className="py-3.5 px-5">
                      {item.isActive ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-950/40 text-emerald-400 border border-emerald-500/20 font-outfit">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          Aktif
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-raised text-text-muted border border-border font-outfit">
                          <span className="w-1.5 h-1.5 rounded-full bg-text-muted"></span>
                          Nonaktif
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        {/* Link Edit Bergaya Tombol Direct */}
                        <Link
                          href={`/services/form?id=${item.id}`}
                          className="text-secondary font-bold text-xs hover:underline flex items-center gap-1 font-outfit cursor-pointer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </Link>

                        {/* Label Statis (Non-clickable) */}
                        <span className="text-text-muted text-xs select-none font-outfit">
                          {item.isActive ? "Nonaktifkan" : "Aktifkan"}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer / Pagination */}
          <div className="py-3.5 px-6 border-t border-border flex items-center justify-between text-text-muted text-xs font-outfit">
            <span>Menampilkan 1–{filteredServices.length} dari {services.length} layanan</span>
            <div className="flex items-center gap-2">
              <button className="p-1 rounded border border-border text-text-muted hover:text-white disabled:opacity-40" disabled>
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="w-6 h-6 rounded bg-secondary text-white font-bold flex items-center justify-center text-xs">
                1
              </span>
              <button className="p-1 rounded border border-border text-text-muted hover:text-white disabled:opacity-40" disabled>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Warning Alert Note */}
      <div className="p-4 rounded-2xl bg-[#1c120c] border border-secondary/20 flex items-start gap-3 shadow-md">
        <AlertCircle className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <h4 className="text-xs font-bold text-secondary font-outfit">
            Harga booking tidak berubah saat tarif layanan diperbarui
          </h4>
          <p className="text-[11px] text-text-muted leading-relaxed font-outfit">
            Harga tersimpan di BOOKING_SERVICES.price_at_booking. Jadwal berada di BOOKINGS.start_time/end_time. Harga tidak boleh negatif.
          </p>
        </div>
      </div>
    </div>
  );
}