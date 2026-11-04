'use client';

import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { Button, Alert, Modal, Toast } from '@/components/ui';
import { MOCK_ACCOUNTS } from '@/utils/mocks/mockData';
import { TAccount } from '@/types';
import { TRole } from '@/store/useAuthStore';
import { AccountsTableSection } from './sections/AccountsTableSection';
import { RoleDescriptionsSection } from './sections/RoleDescriptionsSection';

export default function AccountsPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<TRole | 'all'>('all');
  const [accounts, setAccounts] = useState<TAccount[]>(MOCK_ACCOUNTS);
  const [accountToDelete, setAccountToDelete] = useState<TAccount | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const filtered = accounts.filter((a) => {
    const matchSearch =
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      a.uuid.toLowerCase().includes(search.toLowerCase()) ||
      (a.displayName ?? '').toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || a.role === roleFilter;
    return matchSearch && matchRole;
  });

  const handleConfirmDelete = () => {
    if (!accountToDelete) return;
    setAccounts((prev) => prev.filter((a) => a.id !== accountToDelete.id));
    setToastMsg(`Akun "${accountToDelete.email}" berhasil dihapus.`);
    setAccountToDelete(null);
  };

  const handleResetFilters = () => {
    setSearch('');
    setRoleFilter('all');
  };

  return (
    <div className="space-y-8 pb-24 relative min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <header className="space-y-2">
          <h1 className="text-[28px] font-extrabold text-white tracking-tight">
            Manajemen Akun
          </h1>
          <p className="text-text-muted">
            Atur akun login dan hak akses tim. Kamu masuk sebagai Owner.
          </p>
        </header>

        <Button
          href="/accounts/form"
          variant="primary"
          size="md"
          leftIcon={<UserPlus className="w-4 h-4" />}
          className="shrink-0"
        >
          Buat akun pengguna
        </Button>
      </div>

      <Alert
        variant="accent"
        title="Akses sesuai peran, bisnis tetap aman"
        description="Role: customer, barber, admin, owner. Admin biasa tidak dapat menghapus akun Owner; pembatasan diterapkan oleh aplikasi."
      />

      <AccountsTableSection
        accounts={filtered}
        search={search}
        onSearchChange={setSearch}
        roleFilter={roleFilter}
        onRoleFilterChange={setRoleFilter}
        onDeleteRequest={setAccountToDelete}
        onResetFilters={handleResetFilters}
      />

      <RoleDescriptionsSection />

      <Modal
        isOpen={Boolean(accountToDelete)}
        onClose={() => setAccountToDelete(null)}
        title="Hapus Akun Pengguna"
        description={`Apakah Anda yakin ingin menghapus akun ${accountToDelete?.email ?? ''}? Tindakan ini tidak dapat dibatalkan.`}
        variant="destructive"
        confirmText="Ya, Hapus Akun"
        cancelText="Batal"
        onConfirm={handleConfirmDelete}
      />

      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50">
          <Toast
            variant="success"
            title="Akun Dihapus"
            description={toastMsg}
            onClose={() => setToastMsg(null)}
          />
        </div>
      )}
    </div>
  );
}
