'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { UserPlus } from 'lucide-react';
import { Button, Alert, Modal, Toast } from '@/components/ui';
import { accountService } from '@/services/endpoints/account';
import { TAccount } from '@/types';
import { TRole } from '@/store/useAuthStore';
import { AccountsTableSection } from './sections/AccountsTableSection';
import { RoleDescriptionsSection } from './sections/RoleDescriptionsSection';

export default function AccountsPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<TRole | 'all'>('all');
  const [accounts, setAccounts] = useState<TAccount[]>([]);
  const [accountToDelete, setAccountToDelete] = useState<TAccount | null>(null);
  const [accountDetail, setAccountDetail] = useState<TAccount | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchAccounts = useCallback(async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const res = await accountService.getAccounts({
        search,
        role: roleFilter === 'all' ? undefined : roleFilter,
      });
      setAccounts(res.data);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Gagal memuat akun pengguna');
    } finally {
      setIsLoading(false);
    }
  }, [search, roleFilter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAccounts();
    }, 250);

    return () => clearTimeout(timer);
  }, [fetchAccounts]);

  const handleConfirmDelete = async () => {
    if (!accountToDelete) return;
    try {
      await accountService.deleteAccount(accountToDelete.uuid);
      setAccounts((prev) => prev.filter((a) => a.uuid !== accountToDelete.uuid));
      setToastMsg(`Akun "${accountToDelete.email}" berhasil dihapus.`);
    } catch (err) {
      setToastMsg(err instanceof Error ? err.message : 'Gagal menghapus akun');
    } finally {
      setAccountToDelete(null);
    }
  };

  const handleResetFilters = () => {
    setSearch('');
    setRoleFilter('all');
  };

  return (
    <div className="space-y-8 relative">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <header className="space-y-1">
          <h1 className="text-[28px] font-extrabold text-text-main tracking-tight">
            Manajemen Akun
          </h1>
          <p className="text-text-muted text-[14px]">
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

      {errorMsg && (
        <Alert
          variant="error"
          title="Gagal mengambil data akun"
          description={errorMsg}
        />
      )}

      <Alert
        variant="accent"
        title="Akses sesuai peran, bisnis tetap aman"
        description="Role: customer, barber, admin, owner. Data akun tersinkronisasi langsung dengan tabel USERS di database MySQL."
      />

      <div className={isLoading ? 'opacity-60 transition-opacity' : 'transition-opacity'}>
        <AccountsTableSection
          accounts={accounts}
          search={search}
          onSearchChange={setSearch}
          roleFilter={roleFilter}
          onRoleFilterChange={setRoleFilter}
          onDeleteRequest={setAccountToDelete}
          onResetFilters={handleResetFilters}
          onDetailRequest={setAccountDetail}
        />
      </div>

      <RoleDescriptionsSection />

      {accountDetail && (
        <Modal
          isOpen={true}
          onClose={() => setAccountDetail(null)}
          title={`Detail Pengguna • ${accountDetail.displayName || accountDetail.email}`}
          description="Informasi kredensial login, peran hak akses sistem, dan riwayat aktivitas akun."
        >
          <div className="space-y-4 py-1">
            <div className="grid grid-cols-2 gap-4 text-sm bg-surface p-4 rounded-xl border border-border">
              <div>
                <p className="text-text-muted text-xs">Nama Tampilan</p>
                <p className="font-semibold text-text-main mt-0.5">{accountDetail.displayName || '—'}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Alamat Email</p>
                <p className="font-semibold text-text-main mt-0.5">{accountDetail.email}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Peran (Role)</p>
                <p className="font-semibold text-secondary mt-0.5 uppercase tracking-wide">{accountDetail.role}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Status Hak Akses</p>
                <p className="font-semibold text-text-main mt-0.5">
                  {accountDetail.isOwner ? 'Owner (Akses Penuh)' : 'Standar Operasional'}
                </p>
              </div>
              <div>
                <p className="text-text-muted text-xs">User ID / UUID</p>
                <p className="font-mono text-xs text-text-muted mt-0.5 truncate">{accountDetail.uuid}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Tanggal Dibuat</p>
                <p className="font-mono text-xs text-text-main mt-0.5">{accountDetail.createdAt}</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              {!accountDetail.isOwner && (
                <Button href={`/accounts/form?id=${accountDetail.uuid || accountDetail.slug}`} variant="primary">
                  Edit Akun
                </Button>
              )}
              <Button variant="outline" onClick={() => setAccountDetail(null)}>
                Tutup
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {accountToDelete && (
        <Modal
          isOpen={true}
          onClose={() => setAccountToDelete(null)}
          variant="destructive"
          title="Konfirmasi Hapus Akun"
          description={`Apakah kamu yakin ingin menghapus akun ${accountToDelete.email}? Tindakan ini tidak dapat dibatalkan.`}
          confirmText="Hapus Akun"
          cancelText="Batal"
          onConfirm={handleConfirmDelete}
        />
      )}

      {toastMsg && (
        <Toast
          isOpen={true}
          title="Pemberitahuan Akun"
          description={toastMsg}
          onClose={() => setToastMsg(null)}
        />
      )}
    </div>
  );
}
