'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Star, Users, Scissors, ChevronLeft, ChevronRight, ArrowRight, Info, X, Phone, CheckCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TableRow, TableHead, TableCell, DataTable, Dropdown } from '@/components/ui';

interface KapsterItem {
  phone: string;
  name: string;
  initials: string;
  specialty: string;
  finished: number;
  rating: string;
  statusText: 'Aktif' | 'Nonaktif';
  badgeType: 'success' | 'muted';
}

const INITIAL_KAPSTERS: KapsterItem[] = [
  { phone: '0812 3456 7890', name: 'Gus Farhan', initials: 'GF', specialty: 'Fade & taper', finished: 8, rating: '4,9', statusText: 'Aktif', badgeType: 'success' },
  { phone: '0813 7788 9900', name: 'Lefi Dian', initials: 'LD', specialty: 'Classic & pompadour', finished: 6, rating: '4,9', statusText: 'Aktif', badgeType: 'success' },
  { phone: '0821 4455 6677', name: 'Zidan Alex', initials: 'ZA', specialty: 'Texture & crop', finished: 4, rating: '4,8', statusText: 'Aktif', badgeType: 'success' },
  { phone: '0857 2211 3344', name: 'Ridho Arman', initials: 'RA', specialty: 'Buzz cut & beard', finished: 0, rating: '5,0', statusText: 'Aktif', badgeType: 'success' },
  { phone: '0819 6677 8899', name: 'Yoga Prasetyo', initials: 'YP', specialty: 'Mullet & wolf cut', finished: 0, rating: '4,7', statusText: 'Nonaktif', badgeType: 'muted' },
  { phone: '0878 1122 5566', name: 'Reza Firmansyah', initials: 'RF', specialty: 'Hair tattoo & color', finished: 0, rating: '4,6', statusText: 'Nonaktif', badgeType: 'muted' },
];

export function BarbersView() {
  const [kapsters, setKapsters] = useState<KapsterItem[]>(INITIAL_KAPSTERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'Semua' | 'Aktif' | 'Nonaktif'>('Semua');
  const [detailKapster, setDetailKapster] = useState<KapsterItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Toggle status kapster
  const handleToggleStatus = (phone: string) => {
    setKapsters((prev) =>
      prev.map((k) => {
        if (k.phone === phone) {
          const nextStatus = k.statusText === 'Aktif' ? 'Nonaktif' : 'Aktif';
          const nextBadge = nextStatus === 'Aktif' ? 'success' : 'muted';
          showToast(`Status ${k.name} diubah menjadi ${nextStatus}`);
          return {
            ...k,
            statusText: nextStatus,
            badgeType: nextBadge,
          };
        }
        return k;
      })
    );

    // If modal is open for this kapster, update it too
    if (detailKapster && detailKapster.phone === phone) {
      setDetailKapster((prev) => {
        if (!prev) return null;
        const nextStatus = prev.statusText === 'Aktif' ? 'Nonaktif' : 'Aktif';
        return {
          ...prev,
          statusText: nextStatus,
          badgeType: nextStatus === 'Aktif' ? 'success' : 'muted',
        };
      });
    }
  };

  // Menghitung statistik dinamis
  const totalCount = kapsters.length;
  const activeCount = kapsters.filter((k) => k.statusText === 'Aktif').length;
  const inactiveCount = kapsters.filter((k) => k.statusText === 'Nonaktif').length;

  // Filter gabungan Search & Status
  const filteredData = kapsters.filter((kapster) => {
    const matchesSearch =
      kapster.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kapster.phone.includes(searchQuery);

    const matchesStatus =
      selectedStatus === 'Semua' || kapster.statusText === selectedStatus;

    return matchesSearch && matchesStatus;
  });

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

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-[28px] font-extrabold text-white tracking-tight font-outfit">Kelola Kapster</h1>
          <p className="text-sm md:text-base text-text-muted mt-1 font-outfit">
            Tim di balik setiap potongan. Atur spesialisasi, profil, dan status aktif kapster.
          </p>
        </div>

        {/* Link Tambah Kapster */}
        <Link
          href="/barbers/form"
          className="bg-secondary hover:bg-secondary/90 text-white px-5 py-2.5 rounded-xl text-sm font-bold font-outfit flex items-center justify-center gap-2 shadow-lg shadow-secondary/20 transition-all active:scale-[0.98] cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah kapster</span>
        </Link>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="bg-surface border border-border p-6 rounded-2xl flex flex-col justify-between gap-4 h-auto min-h-[140px] transition-all duration-200 hover:-translate-y-0.5 hover:border-border/80">
          <div className="flex items-center justify-between text-text-muted">
            <span className="text-[15px] font-medium font-outfit">Kapster terdaftar</span>
            <Users className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-white mb-1 font-outfit">{totalCount}</h3>
            <p className="text-[13px] text-emerald-400 font-medium font-outfit">{activeCount} profil kapster aktif</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-surface border border-border p-6 rounded-2xl flex flex-col justify-between gap-4 h-auto min-h-[140px] transition-all duration-200 hover:-translate-y-0.5 hover:border-border/80">
          <div className="flex items-center justify-between text-text-muted">
            <span className="text-[15px] font-medium font-outfit">Sedang melayani</span>
            <Scissors className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-white mb-1 font-outfit">3</h3>
            <p className="text-[13px] text-text-muted font-outfit">3 kursi sedang terisi</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-surface border border-border p-6 rounded-2xl flex flex-col justify-between gap-4 h-auto min-h-[140px] transition-all duration-200 hover:-translate-y-0.5 hover:border-border/80">
          <div className="flex items-center justify-between text-text-muted">
            <span className="text-[15px] font-medium font-outfit">Rata-rata rating</span>
            <Star className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-white mb-1 font-outfit">4,9 / 5</h3>
            <p className="text-[13px] text-emerald-400 font-medium font-outfit">126 ulasan pelanggan bulan ini</p>
          </div>
        </div>
      </div>

      {/* Main Table Section */}
      <div className="space-y-4 pt-1">
        {/* Filters & Search Header */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Left: Tabs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedStatus('Semua')}
              className={`px-4 py-2 rounded-xl font-medium text-[14px] font-outfit transition-colors cursor-pointer ${selectedStatus === 'Semua'
                  ? 'bg-raised border border-border text-white'
                  : 'text-text-muted hover:text-white'
                }`}
            >
              Semua ({totalCount})
            </button>
            <button
              onClick={() => setSelectedStatus('Aktif')}
              className={`px-4 py-2 rounded-xl font-medium text-[14px] font-outfit transition-colors cursor-pointer ${selectedStatus === 'Aktif'
                  ? 'bg-raised border border-border text-white'
                  : 'text-text-muted hover:text-white'
                }`}
            >
              Aktif ({activeCount})
            </button>
            <button
              onClick={() => setSelectedStatus('Nonaktif')}
              className={`px-4 py-2 rounded-xl font-medium text-[14px] font-outfit transition-colors cursor-pointer ${selectedStatus === 'Nonaktif'
                  ? 'bg-raised border border-border text-white'
                  : 'text-text-muted hover:text-white'
                }`}
            >
              Nonaktif ({inactiveCount})
            </button>
          </div>

          {/* Right: Search & Custom Dropdown */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama atau telepon"
                className="w-full bg-surface border border-border rounded-xl pl-9 pr-4 py-2 text-[14px] text-white placeholder:text-text-muted focus:outline-none focus:border-secondary transition-colors font-outfit"
              />
            </div>

            {/* Custom Dropdown */}
            <Dropdown
              value={selectedStatus}
              onChange={(val) => setSelectedStatus(val as 'Semua' | 'Aktif' | 'Nonaktif')}
              options={[
                { label: 'Semua status', value: 'Semua' },
                { label: 'Aktif', value: 'Aktif' },
                { label: 'Nonaktif', value: 'Nonaktif' },
              ]}
              align="right"
            />
          </div>
        </div>

        {/* Datatable Container */}
        <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-md">
          <DataTable
            columns={
              <>
                <TableHead className="py-4 px-6 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit">Nama</TableHead>
                <TableHead className="py-4 px-5 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit">Spesialisasi</TableHead>
                <TableHead className="py-4 px-5 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit">Status aktif (Klik)</TableHead>
                <TableHead className="py-4 px-5 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit">Rating</TableHead>
                <TableHead className="py-4 px-5 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit">Selesai hari ini</TableHead>
                <TableHead className="py-4 px-6 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit text-right">Aksi</TableHead>
              </>
            }
          >
            {filteredData.length > 0 ? (
              filteredData.map((kapster, idx) => {
                const rawPhone = kapster.phone.replace(/\s+/g, '');
                return (
                  <TableRow key={idx} className="hover:bg-raised/40 transition-colors">
                    <TableCell className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-raised border border-border/50 flex items-center justify-center text-secondary font-bold text-[12px] shrink-0 font-outfit">
                          {kapster.initials}
                        </div>
                        <div>
                          <p className="font-bold text-white text-[15px] font-outfit">{kapster.name}</p>
                          <p className="text-[13px] text-text-muted font-outfit mt-0.5">{kapster.phone}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 px-5 font-medium text-[14px] text-white font-outfit">{kapster.specialty}</TableCell>
                    <TableCell className="py-4 px-5">
                      <button
                        type="button"
                        onClick={() => handleToggleStatus(kapster.phone)}
                        title="Klik untuk ubah status aktif/nonaktif"
                        className={`px-2.5 py-1 text-[13px] rounded-md font-medium font-outfit flex items-center gap-1.5 w-fit cursor-pointer active:scale-95 transition-all hover:opacity-90 ${kapster.badgeType === 'success'
                            ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/40'
                            : 'bg-zinc-500/10 text-zinc-400 border border-border hover:border-zinc-500/40'
                          }`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full ${kapster.badgeType === 'success' ? 'bg-emerald-400' : 'bg-zinc-400'}`}></div>
                        <span>{kapster.statusText}</span>
                      </button>
                    </TableCell>
                    <TableCell className="py-4 px-5 font-medium text-[14px] text-white font-outfit">
                      <span className="flex items-center gap-1 font-outfit text-amber-400 font-bold">
                        ★ {kapster.rating}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 px-5 font-medium font-outfit text-[14px] text-white">{kapster.finished}</TableCell>
                    <TableCell className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-4">
                        <Link
                          href={`/barbers/form?id=${rawPhone}`}
                          className="text-secondary font-bold hover:text-white transition-colors text-[14px] font-outfit cursor-pointer"
                        >
                          Edit
                        </Link>
                        <button
                          type="button"
                          onClick={() => setDetailKapster(kapster)}
                          className="text-text-muted hover:text-white transition-colors flex items-center gap-1 font-medium text-[14px] font-outfit cursor-pointer group active:scale-95"
                        >
                          <span>Detail</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <td colSpan={6} className="text-center py-8 text-text-muted text-[14px] font-outfit">
                  Tidak ada kapster yang cocok dengan kriteria pencarian/filter.
                </td>
              </TableRow>
            )}
          </DataTable>

          {/* Table Footer */}
          <div className="p-4 md:px-6 border-t border-border flex items-center justify-between text-[13px] text-text-muted font-outfit">
            <span>Menampilkan {filteredData.length > 0 ? 1 : 0}–{filteredData.length} dari {totalCount} kapster</span>
            <div className="flex items-center gap-3">
              <button className="p-1 rounded text-text-muted hover:text-white disabled:opacity-40 transition-colors" disabled>
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="w-7 h-7 rounded-md bg-secondary text-white font-bold flex items-center justify-center text-[13px]">
                1
              </span>
              <button className="p-1 rounded text-text-muted hover:text-white disabled:opacity-40 transition-colors" disabled>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Rule Banner */}
      <div className="bg-[#24130A] border-l-4 border-secondary rounded-lg p-5 flex items-start gap-4 shadow-md font-outfit transition-transform hover:translate-x-1 duration-200">
        <Info className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-secondary font-bold text-[14px] font-outfit">Nomor telepon unik • Aturan aplikasi</h4>
          <p className="text-text-muted text-[13px] leading-relaxed font-outfit">
            Profil kapster terhubung ke USERS melalui user_id. Klik badge status aktif untuk mengubah status kapster secara langsung.
          </p>
        </div>
      </div>

      {/* Kapster Detail Modal */}
      <AnimatePresence>
        {detailKapster && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDetailKapster(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-[#161616] border border-border rounded-2xl shadow-2xl overflow-hidden font-outfit z-10 p-6 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-raised border border-border flex items-center justify-center text-secondary font-extrabold text-base">
                    {detailKapster.initials}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{detailKapster.name}</h3>
                    <p className="text-xs text-text-muted mt-0.5">{detailKapster.specialty}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDetailKapster(null)}
                  className="p-2 text-text-muted hover:text-white rounded-lg hover:bg-surface cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-surface border border-border">
                    <span className="text-xs text-text-muted block">Status Akun</span>
                    <span className={`text-sm font-bold mt-1 inline-flex items-center gap-1.5 ${detailKapster.statusText === 'Aktif' ? 'text-emerald-400' : 'text-zinc-400'}`}>
                      <span className={`w-2 h-2 rounded-full ${detailKapster.statusText === 'Aktif' ? 'bg-emerald-400' : 'bg-zinc-400'}`} />
                      {detailKapster.statusText}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-surface border border-border">
                    <span className="text-xs text-text-muted block">Rating Kepuasan</span>
                    <span className="text-sm font-bold text-amber-400 mt-1 inline-flex items-center gap-1">
                      ★ {detailKapster.rating} / 5.0
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-surface border border-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-secondary" />
                    <div>
                      <span className="text-xs text-text-muted block">Kontak WhatsApp</span>
                      <span className="text-sm font-bold text-white">{detailKapster.phone}</span>
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/${detailKapster.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-secondary hover:underline"
                  >
                    Hubungi →
                  </a>
                </div>

                <div className="p-3 rounded-xl bg-surface border border-border space-y-1">
                  <div className="flex items-center justify-between text-xs text-text-muted">
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Jam Kerja Hari Ini</span>
                    <span className="text-white font-medium">10:00 - 21:00 WIB</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-text-muted pt-2 border-t border-border/50">
                    <span>Pelanggan Dituntaskan Hari Ini</span>
                    <span className="text-emerald-400 font-bold">{detailKapster.finished} orang</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-2 border-t border-border">
                <button
                  type="button"
                  onClick={() => handleToggleStatus(detailKapster.phone)}
                  className="px-4 py-2.5 rounded-xl bg-surface border border-border text-xs font-bold text-white hover:bg-raised transition-colors cursor-pointer active:scale-95"
                >
                  {detailKapster.statusText === 'Aktif' ? 'Nonaktifkan Kapster' : 'Aktifkan Kapster'}
                </button>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/barbers/form?id=${detailKapster.phone.replace(/\s+/g, '')}`}
                    className="px-4 py-2.5 rounded-xl bg-secondary text-white text-xs font-bold hover:bg-secondary/90 transition-colors cursor-pointer active:scale-95"
                  >
                    Edit Profil
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
