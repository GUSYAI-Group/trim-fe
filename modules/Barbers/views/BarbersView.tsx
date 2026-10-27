'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Star, Users, Scissors, ChevronDown, ArrowRight, Info } from 'lucide-react';
import { Card, TableRow, TableHead, TableCell, DataTable } from '@/components/ui';

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

const KAPSTER_DATA: KapsterItem[] = [
  { phone: '0812 3456 7890', name: 'Gus Farhan', initials: 'GF', specialty: 'Fade & taper', finished: 8, rating: '4,9', statusText: 'Aktif', badgeType: 'success' },
  { phone: '0813 7788 9900', name: 'Lefi Dian', initials: 'LD', specialty: 'Classic & pompadour', finished: 6, rating: '4,9', statusText: 'Aktif', badgeType: 'success' },
  { phone: '0821 4455 6677', name: 'Zidan Alex', initials: 'ZA', specialty: 'Texture & crop', finished: 4, rating: '4,8', statusText: 'Aktif', badgeType: 'success' },
  { phone: '0857 2211 3344', name: 'Ridho Arman', initials: 'RA', specialty: 'Buzz cut & beard', finished: 0, rating: '5,0', statusText: 'Aktif', badgeType: 'success' },
  { phone: '0819 6677 8899', name: 'Yoga Prasetyo', initials: 'YP', specialty: 'Mullet & wolf cut', finished: 0, rating: '4,7', statusText: 'Nonaktif', badgeType: 'muted' },
  { phone: '0878 1122 5566', name: 'Reza Firmansyah', initials: 'RF', specialty: 'Hair tattoo & color', finished: 0, rating: '4,6', statusText: 'Nonaktif', badgeType: 'muted' },
];

export function BarbersView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'Semua' | 'Aktif' | 'Nonaktif'>('Semua');

  // Menghitung statistik
  const totalCount = KAPSTER_DATA.length;
  const activeCount = KAPSTER_DATA.filter((k) => k.statusText === 'Aktif').length;
  const inactiveCount = KAPSTER_DATA.filter((k) => k.statusText === 'Nonaktif').length;

  // Filter gabungan Search & Status
  const filteredData = KAPSTER_DATA.filter((kapster) => {
    const matchesSearch =
      kapster.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kapster.phone.includes(searchQuery);

    const matchesStatus =
      selectedStatus === 'Semua' || kapster.statusText === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8 pb-24 font-space-grotesk relative min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <header className="space-y-2">
          <h1 className="text-[28px] font-extrabold text-white tracking-tight font-outfit">Kelola Kapster</h1>
          <p className="text-text-muted">
            Tim di balik setiap potongan. Atur spesialisasi, profil, dan status aktif kapster.
          </p>
        </header>

        {/* Link Tambah Kapster Langsung Bergaya Button */}
        <Link
          href="/barbers/form"
          className="bg-secondary hover:bg-secondary/90 text-white px-5 py-2.5 rounded-xl text-sm font-bold font-outfit flex items-center justify-center gap-2 shadow-lg shadow-secondary/20 transition-all active:scale-95 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah kapster</span>
        </Link>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <Card className="p-6 border-border bg-surface flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <span className="text-[15px] font-medium text-text-muted">Kapster terdaftar</span>
            <Users className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-white mb-2 font-outfit">{totalCount}</h3>
            <p className="text-[13px] text-emerald-400 font-medium">{activeCount} profil kapster aktif</p>
          </div>
        </Card>

        {/* Card 2 */}
        <Card className="p-6 border-border bg-surface flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <span className="text-[15px] font-medium text-text-muted">Sedang melayani</span>
            <Scissors className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-white mb-2 font-outfit">3</h3>
            <p className="text-[13px] text-text-muted">3 kursi sedang terisi</p>
          </div>
        </Card>

        {/* Card 3 */}
        <Card className="p-6 border-border bg-surface flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <span className="text-[15px] font-medium text-text-muted">Rata-rata rating</span>
            <Star className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-white mb-2 font-outfit">4,9 / 5</h3>
            <p className="text-[13px] text-emerald-400 font-medium">126 ulasan pelanggan bulan ini</p>
          </div>
        </Card>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Tabs */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setSelectedStatus('Semua')}
            className={`px-4 py-2 rounded-lg font-medium text-[14px] transition-colors cursor-pointer ${
              selectedStatus === 'Semua'
                ? 'bg-raised border border-border text-white'
                : 'text-text-muted hover:text-white'
            }`}
          >
            Semua ({totalCount})
          </button>
          <button
            onClick={() => setSelectedStatus('Aktif')}
            className={`px-4 py-2 rounded-lg font-medium text-[14px] transition-colors cursor-pointer ${
              selectedStatus === 'Aktif'
                ? 'bg-raised border border-border text-white'
                : 'text-text-muted hover:text-white'
            }`}
          >
            Aktif ({activeCount})
          </button>
          <button
            onClick={() => setSelectedStatus('Nonaktif')}
            className={`px-4 py-2 rounded-lg font-medium text-[14px] transition-colors cursor-pointer ${
              selectedStatus === 'Nonaktif'
                ? 'bg-raised border border-border text-white'
                : 'text-text-muted hover:text-white'
            }`}
          >
            Nonaktif ({inactiveCount})
          </button>
        </div>

        {/* Right: Search & Filter Dropdown */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama atau nomor telepon" 
              className="w-full bg-raised border border-border rounded-lg pl-9 pr-4 py-2 text-[14px] text-white placeholder:text-text-muted focus:outline-none focus:border-secondary transition-colors font-outfit"
            />
          </div>
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as 'Semua' | 'Aktif' | 'Nonaktif')}
              className="appearance-none bg-raised border border-border rounded-lg pl-4 pr-10 py-2 text-[14px] font-medium text-white hover:bg-border transition-colors focus:outline-none cursor-pointer font-outfit"
            >
              <option value="Semua" className="bg-surface text-white">Semua status</option>
              <option value="Aktif" className="bg-surface text-white">Aktif</option>
              <option value="Nonaktif" className="bg-surface text-white">Nonaktif</option>
            </select>
            <ChevronDown className="w-4 h-4 text-text-muted absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Datatable */}
      <DataTable 
        columns={
          <>
            <TableHead className="pl-6">Nama</TableHead>
            <TableHead>Spesialisasi</TableHead>
            <TableHead>Status aktif</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Selesai hari ini</TableHead>
            <TableHead className="pr-6">Aksi</TableHead>
          </>
        }
        pagination={{
          text: `Menampilkan ${filteredData.length > 0 ? 1 : 0}–${filteredData.length} dari ${totalCount} kapster`,
          currentPage: 1
        }}
      >
        {filteredData.length > 0 ? (
          filteredData.map((kapster, idx) => {
            const rawPhone = kapster.phone.replace(/\s+/g, '');
            return (
              <TableRow key={idx}>
                <TableCell className="pl-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-raised border border-border/50 flex items-center justify-center text-secondary font-bold text-[12px] shrink-0 font-outfit">
                      {kapster.initials}
                    </div>
                    <div>
                      <p className="font-bold text-white text-[15px]">{kapster.name}</p>
                      <p className="text-[13px] text-text-muted font-outfit mt-0.5">{kapster.phone}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-medium text-[14px]">{kapster.specialty}</TableCell>
                <TableCell>
                  <div className={`px-2.5 py-1 text-[13px] rounded-md font-medium font-outfit flex items-center gap-1.5 w-fit ${
                    kapster.badgeType === 'success' 
                      ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-zinc-500/10 text-zinc-400 border border-border'
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${kapster.badgeType === 'success' ? 'bg-emerald-400' : 'bg-zinc-400'}`}></div>
                    {kapster.statusText}
                  </div>
                </TableCell>
                <TableCell className="font-medium flex items-center gap-1 font-outfit pt-6.5 pb-4 text-[14px]">
                  <Star className="w-3.5 h-3.5 fill-white text-white" /> {kapster.rating}
                </TableCell>
                <TableCell className="font-medium font-outfit text-[14px]">{kapster.finished}</TableCell>
                <TableCell className="pr-6">
                  <div className="flex items-center gap-5">
                    {/* Link Edit Langsung Tanpa Tag Button Tambahan */}
                    <Link
                      href={`/barbers/form?id=${rawPhone}`}
                      className="text-secondary font-bold hover:text-white transition-colors text-[14px] cursor-pointer"
                    >
                      Edit
                    </Link>
                    <button className="text-text-muted hover:text-white transition-colors flex items-center gap-1.5 font-bold text-[14px] cursor-pointer">
                      Detail <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <td colSpan={6} className="text-center py-8 text-text-muted text-[14px]">
              Tidak ada kapster yang cocok dengan kriteria pencarian/filter.
            </td>
          </TableRow>
        )}
      </DataTable>

      {/* Info Rule Banner */}
      <div className="bg-[#24130A] border-l-4 border-secondary rounded-lg p-5 flex items-start gap-4 shadow-md">
        <Info className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
        <div>
          <h4 className="text-secondary font-bold text-[14px] mb-1.5 font-outfit">Nomor telepon unik • Aturan aplikasi</h4>
          <p className="text-text-muted text-[13px] leading-relaxed font-outfit">
            Profil kapster terhubung ke USERS melalui user_id. Status aktif disimpan di is_active; sedang melayani dihitung dari booking.
          </p>
        </div>
      </div>
    </div>
  );
}