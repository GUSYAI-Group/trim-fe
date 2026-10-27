'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, Button } from '@/components/ui';
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
  const [roleDropOpen, setRoleDropOpen] = useState(false);
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
    <div className="space-y-8 pb-24 font-space-grotesk relative min-h-screen">

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <header className="space-y-2">
          <h1 className="text-[28px] font-extrabold text-white tracking-tight font-outfit">Manajemen Akun</h1>
          <p className="text-text-muted">Atur akun login dan hak akses tim. Kamu masuk sebagai Owner.</p>
        </header>

        {/* Link ke Form Tambah Akun Pengguna */}
        <Link
          href="/accounts/form"
          className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-xl bg-secondary hover:bg-secondary/90 text-white font-bold text-xs font-outfit shadow-lg shadow-secondary/20 transition-all active:scale-95 cursor-pointer shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>Buat akun pengguna</span>
        </Link>
      </div>

      {/* ── Info Banner ── */}
      <div className="bg-[#24130A] border-l-4 border-secondary rounded-lg p-5 flex items-start gap-4">
        <div className="w-5 h-5 rounded-full border-2 border-secondary flex items-center justify-center shrink-0 mt-0.5">
          <Info className="w-3.5 h-3.5 text-secondary" />
        </div>
        <div>
          <h4 className="text-secondary font-bold text-[14px] mb-1">Akses sesuai peran, bisnis tetap aman</h4>
          <p className="text-text-muted text-[13px] leading-relaxed">
            Role: customer, barber, admin, owner. Admin biasa tidak dapat menghapus akun Owner; pembatasan diterapkan oleh aplikasi.
          </p>
        </div>
      </div>

      {/* ── Filters Row ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left: role pill */}
        <div className="flex items-center gap-4">
          <h2 className="text-[20px] font-bold text-white font-outfit">{filtered.length} akun terdaftar</h2>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#132A20] text-success text-[13px] font-medium font-outfit border-0">
            <span className="w-1.5 h-1.5 rounded-full bg-success" />
            4 role
          </span>
        </div>

        {/* Right: search + dropdown */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:w-72 sm:flex-none">
            <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari email atau UUID"
              className="w-full bg-raised border border-border rounded-lg pl-9 pr-4 py-2.5 text-[14px] text-white placeholder:text-text-muted focus:outline-none focus:border-secondary transition-colors font-outfit"
            />
          </div>

          {/* Role dropdown */}
          <div className="relative shrink-0">
            <button
              onClick={() => setRoleDropOpen((v) => !v)}
              className="flex items-center gap-2 bg-raised border border-border rounded-lg px-4 py-2.5 text-white hover:bg-border transition-colors font-outfit text-[14px] font-medium cursor-pointer"
            >
              <span className="hidden sm:inline">{roleOptions.find((o) => o.value === roleFilter)?.label ?? 'Semua peran'}</span>
              <ChevronDown className={`w-4 h-4 text-text-muted transition-transform ${roleDropOpen ? 'rotate-180' : ''}`} />
            </button>

            {roleDropOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setRoleDropOpen(false)} />
                <div className="absolute top-full right-0 mt-2 w-44 bg-[#1A1A1A] border border-border rounded-xl overflow-hidden z-50 shadow-2xl shadow-black/50">
                  <div className="p-1.5 space-y-0.5">
                    {roleOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => { setRoleFilter(opt.value); setRoleDropOpen(false); }}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-[14px] transition-colors flex items-center justify-between font-outfit cursor-pointer ${
                          roleFilter === opt.value ? 'bg-secondary/10 text-secondary font-medium' : 'text-white hover:bg-raised'
                        }`}
                      >
                        {opt.label}
                        {roleFilter === opt.value && <span className="w-1.5 h-1.5 rounded-full bg-secondary" />}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Data Table ── */}
      <Card className="bg-surface border-border p-0! overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#222225] border-b border-border">
                <th className="py-3 px-6 text-[12px] font-medium text-text-muted uppercase tracking-wide">Email / uuid singkat</th>
                <th className="py-3 px-4 text-[12px] font-medium text-text-muted uppercase tracking-wide w-36">Peran</th>
                <th className="py-3 px-4 text-[12px] font-medium text-text-muted uppercase tracking-wide w-36">Dibuat</th>
                <th className="py-3 px-4 text-[12px] font-medium text-text-muted uppercase tracking-wide w-36">Diupdate</th>
                <th className="py-3 px-4 pr-6 text-[12px] font-medium text-text-muted uppercase tracking-wide">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((acc) => (
                <tr key={acc.id} className="border-b border-border hover:bg-raised/30 transition-colors">
                  {/* Email / UUID */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <AvatarChip initials={acc.initials} role={acc.role} />
                      <div>
                        <p className="text-[14px] font-bold text-white font-outfit">{acc.email}</p>
                        <p className="text-[12px] text-text-muted mt-0.5 font-outfit">uuid: {acc.uuid}</p>
                        {acc.displayName && (
                          <p className="text-[12px] text-text-muted font-outfit">{acc.displayName}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  {/* Role */}
                  <td className="py-4 px-4"><RoleBadge role={acc.role} /></td>
                  {/* Dibuat */}
                  <td className="py-4 px-4 text-[14px] text-text-main font-outfit">{acc.createdAt}</td>
                  {/* Diupdate */}
                  <td className="py-4 px-4 text-[14px] text-text-main font-outfit">{acc.updatedAt}</td>
                  {/* Aksi */}
                  <td className="py-4 px-4 pr-6">
                    {acc.isOwner ? (
                      <div className="flex items-center gap-2 text-[13px] text-text-muted font-outfit">
                        <Shield className="w-3.5 h-3.5 shrink-0" />
                        <span>Akun utama • Dilindungi</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-4">
                        {/* Link Edit Berdasarkan query param ?id=slug */}
                        <Link
                          href={`/accounts/form?id=${acc.slug}`}
                          className="text-[13px] font-bold text-secondary hover:brightness-125 transition-all cursor-pointer"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => setAccounts((prev) => prev.filter((a) => a.id !== acc.id))}
                          className="text-[13px] font-bold text-danger hover:brightness-125 transition-all cursor-pointer"
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
        <div className="px-6 py-4 border-t border-border flex items-center justify-between text-[13px]">
          <span className="text-text-muted font-outfit">
            Menampilkan 1–{filtered.length} dari {filtered.length} akun • UUID ditampilkan singkat
          </span>
          <div className="flex items-center gap-4">
            <button className="p-1 text-text-muted hover:text-white transition-colors cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="w-7 h-7 rounded-md bg-[#612c12] flex items-center justify-center text-secondary font-medium font-outfit text-[13px]">1</div>
            <button className="p-1 text-text-muted hover:text-white transition-colors cursor-pointer">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card>

      {/* ── Role Description Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {ROLE_DESCRIPTIONS.map(({ role, label, Icon, description }) => (
          <Card key={role} className="bg-surface border-border p-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <Icon className="w-5 h-5 text-secondary" />
              <h3 className="text-[15px] font-bold font-outfit text-white">{label}</h3>
            </div>
            <p className="text-[13px] text-text-muted leading-relaxed">{description}</p>
          </Card>
        ))}
      </div>

    </div>
  );
}