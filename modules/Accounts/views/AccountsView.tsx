'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, Dropdown } from '@/components/ui';
import { Search, ChevronDown, ChevronLeft, ChevronRight, UserPlus, Shield, Info, Crown, Briefcase, Wallet } from 'lucide-react';

/* ─────────────────── Types ─────────────────── */
type Role = 'owner' | 'admin' | 'barber' | 'customer';

interface Account {
  id: number;
  slug: string; // Digunakan untuk query parameter ?id=
  initials: string;
  email: string;
  uuid: string;
  displayName?: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
  isOwner?: boolean;
}

/* ─────────────────── Static data ─────────────────── */
const ACCOUNTS: Account[] = [
  { id: 1, slug: 'aditya', initials: 'AP', email: 'aditya@trim.id', uuid: '8f2c...a1e4', role: 'owner',    createdAt: '12 Sep 2026', updatedAt: '6 Okt 2026', isOwner: true },
  { id: 2, slug: 'dimas',  initials: 'DS', email: 'dimas@trim.id',  uuid: '9b1a...c7f2', role: 'admin',    createdAt: '12 Sep 2026', updatedAt: '6 Okt 2026' },
  { id: 3, slug: 'arief',  initials: 'RP', email: 'raka@trim.id',   uuid: '4e9d...b8c1', displayName: 'Raka Putra',   role: 'barber',   createdAt: '14 Sep 2026', updatedAt: '6 Okt 2026' },
  { id: 4, slug: 'alya',   initials: 'AL', email: 'alya@trim.id',   uuid: '1f3c...d9e8', displayName: 'Alya Lestari', role: 'customer', createdAt: '15 Sep 2026', updatedAt: '6 Okt 2026' },
  { id: 5, slug: 'wulan',  initials: 'WP', email: 'wulan@trim.id',  uuid: '7a2b...f4c6', displayName: 'Wulan Pertiwi',role: 'customer', createdAt: '16 Sep 2026', updatedAt: '5 Okt 2026' },
  { id: 6, slug: 'rafi',   initials: 'RH', email: 'rafi@trim.id',   uuid: '2d8e...a6f1', displayName: 'Rafi Hidayat', role: 'customer', createdAt: '17 Sep 2026', updatedAt: '28 Sep 2026' },
];

const ROLE_DESCRIPTIONS: { role: Role; label: string; Icon: React.ElementType; description: string }[] = [
  { role: 'owner',    label: 'Owner',    Icon: Crown,     description: 'Akses penuh, buat akun staf, dan pengaturan toko.' },
  { role: 'admin',    label: 'Admin',    Icon: Shield,    description: 'Kelola operasional dan staf. Tidak dapat menghapus akun Owner.' },
  { role: 'barber',   label: 'Barber',   Icon: Briefcase, description: 'Kelola profil kapster dan layanan yang ditugaskan.' },
  { role: 'customer', label: 'Customer', Icon: Wallet,    description: 'Akses profil pelanggan dan riwayat reservasi.' },
];

/* ─────────────────── Helpers ─────────────────── */
const ROLE_STYLES: Record<Role, { badge: string; dot: string; avatar: string }> = {
  owner:    { badge: 'bg-secondary/20 text-secondary border border-secondary/30', dot: 'bg-secondary', avatar: 'bg-raised border border-border text-secondary' },
  admin:    { badge: 'bg-raised border border-border text-text-muted',            dot: 'bg-text-muted', avatar: 'bg-raised border border-border text-secondary' },
  barber:   { badge: 'bg-raised border border-border text-text-muted',            dot: 'bg-text-muted', avatar: 'bg-raised border border-border text-secondary' },
  customer: { badge: 'bg-raised border border-border text-text-muted',            dot: 'bg-text-muted', avatar: 'bg-raised border border-border text-secondary' },
};

const ROLE_LABELS: Record<Role, string> = { owner: 'Owner', admin: 'Admin', barber: 'Barber', customer: 'Customer' };

function RoleBadge({ role }: { role: Role }) {
  const s = ROLE_STYLES[role];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[13px] font-medium font-outfit ${s.badge}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {ROLE_LABELS[role]}
    </span>
  );
}

function AvatarChip({ initials, role }: { initials: string; role: Role }) {
  const s = ROLE_STYLES[role];
  return (
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-[12px] font-bold font-outfit shrink-0 ${s.avatar}`}>
      {initials}
    </div>
  );
}

/* ─────────────────── Main View ─────────────────── */
export function AccountsView() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<Role | 'all'>('all');
  const [accounts, setAccounts] = useState<Account[]>(ACCOUNTS);

  const filtered = accounts.filter((a) => {
    const matchSearch =
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      a.uuid.toLowerCase().includes(search.toLowerCase()) ||
      (a.displayName ?? '').toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || a.role === roleFilter;
    return matchSearch && matchRole;
  });

  const roleOptions: { value: Role | 'all'; label: string }[] = [
    { value: 'all',      label: 'Semua peran' },
    { value: 'owner',    label: 'Owner' },
    { value: 'admin',    label: 'Admin' },
    { value: 'barber',   label: 'Barber' },
    { value: 'customer', label: 'Customer' },
  ];

  return (
    <div className="space-y-6 text-white font-space-grotesk no-scrollbar selection:bg-secondary selection:text-white pb-16">

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-[28px] font-extrabold text-white tracking-tight font-outfit">Manajemen Akun</h1>
          <p className="text-sm md:text-base text-text-muted mt-1 font-outfit">
            Atur akun login dan hak akses tim. Kamu masuk sebagai Owner.
          </p>
        </div>

        {/* Link ke Form Tambah Akun Pengguna */}
        <Link
          href="/accounts/form"
          className="bg-secondary hover:bg-secondary/90 text-white px-5 py-2.5 rounded-xl text-sm font-bold font-outfit flex items-center justify-center gap-2 shadow-lg shadow-secondary/20 transition-all active:scale-95 cursor-pointer self-start sm:self-auto shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>Buat akun pengguna</span>
        </Link>
      </div>

      {/* ── Info Banner ── */}
      <div className="bg-[#24130A] border-l-4 border-secondary rounded-lg p-5 flex items-start gap-4 shadow-md font-outfit">
        <Info className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-secondary font-bold text-[14px] font-outfit">Akses sesuai peran, bisnis tetap aman</h4>
          <p className="text-text-muted text-[13px] leading-relaxed font-outfit">
            Role: customer, barber, admin, owner. Admin biasa tidak dapat menghapus akun Owner; pembatasan diterapkan oleh aplikasi.
          </p>
        </div>
      </div>

      {/* ── Main Table Section ── */}
      <div className="space-y-4 pt-1">
        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Left: role pill */}
          <div className="flex items-center gap-3">
            <h2 className="text-lg md:text-[20px] font-bold text-white font-outfit">{filtered.length} akun terdaftar</h2>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#132A20] text-success text-[12px] font-medium font-outfit border-0">
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
              4 role
            </span>
          </div>

          {/* Right: search + dropdown */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari email atau UUID"
                className="w-full bg-surface border border-border rounded-xl pl-9 pr-4 py-2 text-[14px] text-white placeholder:text-text-muted focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all duration-200 font-outfit"
              />
            </div>

            {/* Role dropdown */}
            <Dropdown
              value={roleFilter}
              onChange={(val) => setRoleFilter(val as Role | 'all')}
              options={roleOptions}
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
                  <th className="py-4 px-6 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit">Email / uuid singkat</th>
                  <th className="py-4 px-5 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit w-36">Peran</th>
                  <th className="py-4 px-5 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit w-36">Dibuat</th>
                  <th className="py-4 px-5 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit w-36">Diupdate</th>
                  <th className="py-4 px-6 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 text-text-main">
                {filtered.map((acc) => (
                  <tr key={acc.id} className="hover:bg-raised/40 transition-colors">
                    {/* Email / UUID */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <AvatarChip initials={acc.initials} role={acc.role} />
                        <div>
                          <p className="text-[15px] font-bold text-white font-outfit">{acc.email}</p>
                          <p className="text-[12px] text-text-muted mt-0.5 font-outfit">uuid: {acc.uuid}</p>
                          {acc.displayName && (
                            <p className="text-[12px] text-text-muted font-outfit">{acc.displayName}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    {/* Role */}
                    <td className="py-4 px-5"><RoleBadge role={acc.role} /></td>
                    {/* Dibuat */}
                    <td className="py-4 px-5 text-[14px] text-text-main font-outfit">{acc.createdAt}</td>
                    {/* Diupdate */}
                    <td className="py-4 px-5 text-[14px] text-text-main font-outfit">{acc.updatedAt}</td>
                    {/* Aksi */}
                    <td className="py-4 px-6 text-right">
                      {acc.isOwner ? (
                        <div className="flex items-center justify-end gap-2 text-[13px] text-text-muted font-outfit">
                          <Shield className="w-3.5 h-3.5 shrink-0" />
                          <span>Akun utama • Dilindungi</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-4">
                          <Link
                            href={`/accounts/form?id=${acc.slug}`}
                            className="text-[14px] font-bold text-secondary hover:text-white transition-colors cursor-pointer font-outfit"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => setAccounts((prev) => prev.filter((a) => a.id !== acc.id))}
                            className="text-[14px] font-bold text-danger hover:brightness-125 transition-all cursor-pointer font-outfit"
                          >
                            Hapus
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 md:px-6 border-t border-border flex items-center justify-between text-[13px] text-text-muted font-outfit">
            <span>
              Menampilkan 1–{filtered.length} dari {filtered.length} akun • UUID ditampilkan singkat
            </span>
            <div className="flex items-center gap-3">
              <button className="p-1 rounded text-text-muted hover:text-white disabled:opacity-40 transition-colors" disabled>
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="w-7 h-7 rounded-md bg-secondary text-white font-bold flex items-center justify-center text-[13px]">1</span>
              <button className="p-1 rounded text-text-muted hover:text-white disabled:opacity-40 transition-colors" disabled>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Role Description Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ROLE_DESCRIPTIONS.map(({ role, label, Icon, description }) => (
          <Card key={role} className="bg-surface border-border p-6 rounded-2xl space-y-3 shadow-sm">
            <div className="flex items-center gap-2.5">
              <Icon className="w-5 h-5 text-secondary" />
              <h3 className="text-[15px] font-bold font-outfit text-white">{label}</h3>
            </div>
            <p className="text-[13px] text-text-muted leading-relaxed font-outfit">{description}</p>
          </Card>
        ))}
      </div>

    </div>
  );
}
