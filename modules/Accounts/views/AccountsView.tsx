'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card, Dropdown } from '@/components/ui';
import { Search, ChevronLeft, ChevronRight, UserPlus, Shield, Info, Crown, Briefcase, Wallet, Trash2, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTrimStore, Role, AccountItem } from '@/store/useTrimStore';

/* ─────────────────── Constants & Styles ─────────────────── */
const ROLE_DESCRIPTIONS: { role: Role; label: string; Icon: React.ElementType; description: string }[] = [
  { role: 'owner', label: 'Owner', Icon: Crown, description: 'Akses penuh, buat akun staf, dan pengaturan toko.' },
  { role: 'admin', label: 'Admin', Icon: Shield, description: 'Kelola operasional dan staf. Tidak dapat menghapus akun Owner.' },
  { role: 'barber', label: 'Barber', Icon: Briefcase, description: 'Kelola profil kapster dan layanan yang ditugaskan.' },
  { role: 'customer', label: 'Customer', Icon: Wallet, description: 'Akses profil pelanggan dan riwayat reservasi.' },
];

const ROLE_STYLES: Record<Role, { badge: string; dot: string; avatar: string }> = {
  owner: { badge: 'bg-secondary/20 text-secondary border border-secondary/30', dot: 'bg-secondary', avatar: 'bg-raised border border-border text-secondary' },
  admin: { badge: 'bg-raised border border-border text-text-muted', dot: 'bg-text-muted', avatar: 'bg-raised border border-border text-secondary' },
  barber: { badge: 'bg-raised border border-border text-text-muted', dot: 'bg-text-muted', avatar: 'bg-raised border border-border text-secondary' },
  customer: { badge: 'bg-raised border border-border text-text-muted', dot: 'bg-text-muted', avatar: 'bg-raised border border-border text-secondary' },
};

const ROLE_LABELS: Record<Role, string> = { owner: 'Owner', admin: 'Admin', barber: 'Barber', customer: 'Customer' };

function RoleBadge({ role }: { role: Role }) {
  const s = ROLE_STYLES[role] || ROLE_STYLES.customer;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[13px] font-medium font-outfit ${s.badge}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {ROLE_LABELS[role] || role}
    </span>
  );
}

function AvatarChip({ initials, role }: { initials: string; role: Role }) {
  const s = ROLE_STYLES[role] || ROLE_STYLES.customer;
  return (
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-[12px] font-bold font-outfit shrink-0 ${s.avatar}`}>
      {initials}
    </div>
  );
}

/* ─────────────────── Main View ─────────────────── */
export function AccountsView() {
  const accounts = useTrimStore((s) => s.accounts);
  const deleteAccount = useTrimStore((s) => s.deleteAccount);

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<Role | 'all'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [accountToDelete, setAccountToDelete] = useState<AccountItem | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filtered = accounts.filter((a) => {
    const matchSearch =
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      a.uuid.toLowerCase().includes(search.toLowerCase()) ||
      (a.displayName ?? '').toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || a.role === roleFilter;
    return matchSearch && matchRole;
  });

  const handleDeleteConfirm = () => {
    if (!accountToDelete) return;
    deleteAccount(accountToDelete.id);
    showToast(`Akun ${accountToDelete.email} berhasil dihapus.`);
    setAccountToDelete(null);
  };

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
            <button onClick={() => setToastMessage(null)} className="ml-2 text-text-muted hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-outfit">
        <div>
          <h1 className="text-2xl md:text-[28px] font-extrabold text-white tracking-tight">Manajemen Akun</h1>
          <p className="text-sm md:text-base text-text-muted mt-1">
            Kelola data akun pengguna, peran, dan hak akses operasional TRIM.
          </p>
        </div>
        <Link
          href="/accounts/form"
          className="bg-secondary hover:bg-secondary/90 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-secondary/20 transition-all active:scale-[0.98] cursor-pointer self-start sm:self-auto shrink-0 font-outfit"
        >
          <UserPlus className="w-4 h-4" />
          <span>Tambah akun</span>
        </Link>
      </div>

      {/* Info Rule Banner */}
      <div className="bg-[#24130A] border-l-4 border-secondary rounded-lg p-5 flex items-start gap-4 shadow-md font-outfit transition-transform hover:translate-x-1 duration-200">
        <Info className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="text-secondary font-bold text-[14px]">Peran akun • Aturan keamanan</h4>
          <p className="text-text-muted text-[13px] leading-relaxed">
            Role akun tersimpan di USERS.role. Peran Owner memiliki otoritas tertinggi dan dilindungi dari penghapusan. Perubahan akun langsung tersimpan secara permanen di sistem.
          </p>
        </div>
      </div>

      {/* Table Section */}
      <div className="space-y-4 pt-1">
        {/* Filter & Search Header */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <h2 className="text-lg md:text-[20px] font-bold text-white font-outfit">
            Daftar akun pengguna ({accounts.length})
          </h2>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari email, nama, atau UUID"
                className="w-full bg-surface border border-border rounded-xl pl-9 pr-4 py-2 text-[14px] text-white placeholder:text-text-muted focus:outline-none focus:border-secondary transition-colors font-outfit"
              />
            </div>

            <Dropdown
              value={roleFilter}
              onChange={(v) => setRoleFilter(v as Role | 'all')}
              options={[
                { label: 'Semua peran', value: 'all' },
                { label: 'Owner', value: 'owner' },
                { label: 'Admin', value: 'admin' },
                { label: 'Barber', value: 'barber' },
                { label: 'Customer', value: 'customer' },
              ]}
              align="right"
            />
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#222225] border-b border-border">
                  <th className="py-4 px-6 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit">Pengguna</th>
                  <th className="py-4 px-5 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit">Peran</th>
                  <th className="py-4 px-5 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit">Dibuat</th>
                  <th className="py-4 px-5 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit">Diupdate</th>
                  <th className="py-4 px-6 text-[12px] font-medium text-text-muted uppercase tracking-wider font-outfit text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 text-text-main">
                {filtered.length > 0 ? (
                  filtered.map((acc) => (
                    <tr key={acc.id} className="hover:bg-raised/40 transition-colors">
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
                      <td className="py-4 px-5"><RoleBadge role={acc.role} /></td>
                      <td className="py-4 px-5 text-[14px] text-text-main font-outfit">{acc.createdAt}</td>
                      <td className="py-4 px-5 text-[14px] text-text-main font-outfit">{acc.updatedAt}</td>
                      <td className="py-4 px-6 text-right">
                        {acc.isOwner ? (
                          <div className="flex items-center justify-end gap-2 text-[13px] text-text-muted font-outfit">
                            <Shield className="w-3.5 h-3.5 shrink-0 text-secondary" />
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
                              onClick={() => setAccountToDelete(acc)}
                              className="text-[14px] font-bold text-rose-400 hover:text-rose-300 transition-all cursor-pointer font-outfit active:scale-95"
                            >
                              Hapus
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-text-muted text-[14px] font-outfit">
                      Tidak ada akun pengguna yang sesuai dengan filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 md:px-6 border-t border-border flex items-center justify-between text-[13px] text-text-muted font-outfit">
            <span>
              Menampilkan {filtered.length > 0 ? 1 : 0}–{filtered.length} dari {accounts.length} akun • Data tersinkron
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

      {/* Role Description Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ROLE_DESCRIPTIONS.map(({ role, label, Icon, description }) => (
          <Card key={role} className="bg-surface border-border p-6 rounded-2xl space-y-3 shadow-sm hover:border-border/80 transition-all">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-raised flex items-center justify-center text-secondary">
                <Icon className="w-4 h-4" />
              </div>
              <h3 className="text-[15px] font-bold text-white font-outfit">{label}</h3>
            </div>
            <p className="text-[13px] text-text-muted leading-relaxed font-outfit">{description}</p>
          </Card>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {accountToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAccountToDelete(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-[#161616] border border-border rounded-2xl shadow-2xl p-6 font-outfit z-10 space-y-5"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Hapus Akun Pengguna?</h3>
                  <p className="text-xs text-text-muted mt-0.5">Tindakan ini tidak dapat dibatalkan.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-surface border border-border text-sm space-y-1">
                <p className="font-bold text-white">{accountToDelete.email}</p>
                <p className="text-xs text-text-muted">Peran: {ROLE_LABELS[accountToDelete.role]} • UUID: {accountToDelete.uuid}</p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setAccountToDelete(null)}
                  className="px-4 py-2 rounded-xl bg-surface border border-border text-xs font-bold text-white hover:bg-raised transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="button"
                  onClick={handleDeleteConfirm}
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Ya, Hapus Akun
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
