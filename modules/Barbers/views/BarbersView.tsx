'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, Search, Star, Users, Scissors, ChevronDown, ArrowRight, Info } from 'lucide-react';
import { Card, Button, TableRow, TableHead, TableCell, DataTable } from '@/components/ui';

const KAPSTER_DATA = [
  { phone: '0812 3456 7890', name: 'Raka Putra', initials: 'RP', specialty: 'Fade & taper', finished: 8, rating: '4,9', statusText: 'Aktif', badgeType: 'success' },
  { phone: '0813 7788 9900', name: 'Bima Saputra', initials: 'BS', specialty: 'Classic & pompadour', finished: 6, rating: '4,9', statusText: 'Aktif', badgeType: 'success' },
  { phone: '0821 4455 6677', name: 'Dion Mahendra', initials: 'DM', specialty: 'Texture & crop', finished: 4, rating: '4,8', statusText: 'Aktif', badgeType: 'success' },
  { phone: '0857 2211 3344', name: 'Arief Nugraha', initials: 'AN', specialty: 'Buzz cut & beard', finished: 0, rating: '5,0', statusText: 'Aktif', badgeType: 'success' },
  { phone: '0819 6677 8899', name: 'Yoga Prasetyo', initials: 'YP', specialty: 'Mullet & wolf cut', finished: 0, rating: '4,9', statusText: 'Aktif', badgeType: 'success' },
  { phone: '0878 1122 5566', name: 'Reza Firmansyah', initials: 'RF', specialty: 'Hair tattoo & color', finished: 0, rating: '4,8', statusText: 'Aktif', badgeType: 'success' },
];

export function BarbersView() {
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
        <Link href="/barbers/form">
          <Button variant="primary" className="gap-2 shrink-0">
            <Plus className="w-4 h-4" />
            <span>Tambah kapster</span>
          </Button>
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
            <h3 className="text-3xl font-extrabold text-white mb-2 font-outfit">6</h3>
            <p className="text-[13px] text-success">6 profil kapster aktif</p>
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
            <p className="text-[13px] text-success">126 ulasan pelanggan bulan ini</p>
          </div>
        </Card>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Tabs */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="px-4 py-2 bg-transparent border border-border text-white rounded-lg font-medium text-[14px]">Semua (6)</button>
          <button className="px-4 py-2 text-text-muted hover:text-white rounded-lg font-medium text-[14px] transition-colors">Aktif (6)</button>
        </div>

        {/* Right: Search & Filter */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Cari nama atau nomor telepon" 
              className="w-full bg-raised border border-border rounded-lg pl-9 pr-4 py-2 text-[14px] text-white placeholder:text-text-muted focus:outline-none focus:border-secondary transition-colors font-outfit"
            />
          </div>
          <button className="flex items-center gap-2 shrink-0 bg-raised border border-border rounded-lg px-4 py-2 text-white hover:bg-border transition-colors">
            <span className="hidden sm:inline text-[14px] font-medium">Semua status</span>
            <ChevronDown className="w-4 h-4 text-text-muted" />
          </button>
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
          text: "Menampilkan 1–6 dari 6 kapster",
          currentPage: 1
        }}
      >
        {KAPSTER_DATA.map((kapster, idx) => (
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
                  ? 'bg-success/10 text-success' 
                  : 'bg-warning/10 text-warning'
              }`}>
                <div className={`w-1.5 h-1.5 rounded-full ${kapster.badgeType === 'success' ? 'bg-success' : 'bg-warning'}`}></div>
                {kapster.statusText}
              </div>
            </TableCell>
            <TableCell className="font-medium flex items-center gap-1 font-outfit pt-6.5 pb-4 text-[14px]">
              <Star className="w-3.5 h-3.5 fill-white" /> {kapster.rating}
            </TableCell>
            <TableCell className="font-medium font-outfit text-[14px]">{kapster.finished}</TableCell>
            <TableCell className="pr-6">
              <div className="flex items-center gap-5">
                <button className="text-secondary font-bold hover:text-white transition-colors text-[14px]">Edit</button>
                <button className="text-text-muted hover:text-white transition-colors flex items-center gap-1.5 font-bold text-[14px]">
                  Detail <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </DataTable>

      {/* Info Rule Banner */}
      <div className="bg-[#24130A] border-l-4 border-secondary rounded-lg p-5 flex items-start gap-4">
        <Info className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
        <div>
          <h4 className="text-secondary font-bold text-[14px] mb-1.5">Nomor telepon unik • Aturan aplikasi</h4>
          <p className="text-text-muted text-[13px] leading-relaxed">
            Profil kapster terhubung ke USERS melalui user_id. Status aktif disimpan di is_active; sedang melayani dihitung dari booking.
          </p>
        </div>
      </div>

    </div>
  );
}
