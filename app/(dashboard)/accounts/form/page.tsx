'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button, Alert, Card, Toast, Spinner, Modal } from '@/components/ui';
import { accountService } from '@/services/endpoints/account';
import { TRole } from '@/store/useAuthStore';
import { AccountMainFormSection } from './sections/AccountMainFormSection';
import { AccountSidebarSection } from './sections/AccountSidebarSection';

function AccountFormInner({ editId }: { editId: string | null }) {
  const router = useRouter();
  const isEditMode = Boolean(editId);

  const [initials, setInitials] = useState('US');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<TRole>('admin');

  const [uuid, setUuid] = useState('Belum dibuat');
  const [createdAt, setCreatedAt] = useState('Belum dibuat');
  const [updatedAt, setUpdatedAt] = useState('Belum dibuat');
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(editId));
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!editId) return;
    setIsDeleting(true);
    try {
      await accountService.deleteAccount(uuid || editId);
      setToastMsg(`Akun "${email}" berhasil dihapus.`);
      setTimeout(() => {
        router.push('/accounts');
      }, 800);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Gagal menghapus akun');
      setShowDeleteModal(false);
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    if (!editId) return;

    async function loadAccount(id: string) {
      try {
        setIsLoading(true);
        const res = await accountService.getAccountDetail(id);
        const found = res.data;
        if (found) {
          setEmail(found.email);
          setRole(found.role);
          setInitials(found.initials);
          setUuid(found.uuid);
          setCreatedAt(found.createdAt);
          setUpdatedAt(found.updatedAt);
        }
      } catch (_err) {
        setErrorMsg('Data akun tidak ditemukan atau gagal dimuat dari server.');
      } finally {
        setIsLoading(false);
      }
    }

    loadAccount(editId);
  }, [editId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    try {
      if (isEditMode && editId) {
        await accountService.updateAccount(uuid || editId, {
          email,
          role,
          password: password || undefined,
        });
        setToastMsg(`Akun "${email}" berhasil diperbarui!`);
      } else {
        await accountService.createAccount({
          email,
          password: password || 'password123',
          role,
          displayName: email.split('@')[0],
        });
        setToastMsg(`Akun "${email}" berhasil dibuat!`);
      }

      setTimeout(() => {
        router.push('/accounts');
      }, 1000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Gagal menyimpan data akun');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8 selection:bg-secondary selection:text-white">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-[12px] text-text-muted">
          <Link href="/accounts" className="hover:text-white transition-colors">
            Manajemen Akun
          </Link>
          <span>/</span>
          <span className="text-white font-medium">
            {isEditMode ? 'Edit Akun Pengguna' : 'Tambah Akun Pengguna'}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <div>
            <h1 className="text-[28px] font-extrabold text-text-main tracking-tight">
              {isEditMode ? 'Edit Akun Pengguna' : 'Tambah Akun Pengguna'}
            </h1>
            <p className="text-text-muted text-[14px] mt-0.5">
              {isEditMode
                ? `Perbarui email dan hak akses ${email || 'pengguna'}. Kamu masuk sebagai Owner.`
                : 'Buat akun login dengan email, kata sandi, dan peran. Kamu masuk sebagai Owner.'}
            </p>
          </div>

          <Button
            href="/accounts"
            variant="outline"
            size="md"
            icon={<ArrowLeft className="w-4 h-4" />}
          >
            Kembali ke daftar
          </Button>
        </div>
      </div>

      {errorMsg && (
        <Alert
          variant="error"
          title="Gagal menyimpan akun"
          description={errorMsg}
        />
      )}

      <Alert
        variant="accent"
        title="Akses sesuai peran, bisnis tetap aman"
        description="Role: customer, barber, admin, owner. Admin biasa tidak dapat menghapus akun Owner; pembatasan diterapkan oleh aplikasi."
      />

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2">
            <AccountMainFormSection
              isEditMode={isEditMode}
              initials={initials}
              email={email}
              onEmailChange={setEmail}
              password={password}
              onPasswordChange={setPassword}
              role={role}
              onRoleChange={setRole}
            />
          </div>

          <AccountSidebarSection
            isEditMode={isEditMode}
            uuid={uuid}
            createdAt={createdAt}
            updatedAt={updatedAt}
          />
        </div>

        {/* Bottom Action Footer */}
        <div className="p-5 rounded-2xl bg-surface border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-[12px] text-text-muted">
            {isEditMode
              ? 'Periksa kembali perubahan akun sebelum menyimpan.'
              : 'Lengkapi email, kata sandi, dan peran sebelum membuat akun.'}
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {isEditMode && (
              <Button
                type="button"
                variant="danger"
                size="md"
                onClick={() => setShowDeleteModal(true)}
              >
                Hapus Akun
              </Button>
            )}
            <Button href="/accounts" variant="outline" size="md">
              Batal
            </Button>
            <Button type="submit" variant="primary" size="md">
              {isEditMode ? 'Simpan perubahan' : 'Buat akun'}
            </Button>
          </div>
        </div>
      </form>

      {showDeleteModal && (
        <Modal
          isOpen={true}
          onClose={() => setShowDeleteModal(false)}
          title="Konfirmasi Hapus Akun"
          description={`Apakah Anda yakin ingin menghapus akun "${email}"? Tindakan ini tidak dapat dibatalkan.`}
        >
          <div className="flex justify-end gap-3 pt-3">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)} disabled={isDeleting}>
              Batal
            </Button>
            <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? 'Menghapus...' : 'Ya, Hapus Akun'}
            </Button>
          </div>
        </Modal>
      )}

      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50">
          <Toast
            variant="success"
            title="Berhasil Disimpan"
            description={toastMsg}
            onClose={() => setToastMsg(null)}
          />
        </div>
      )}
    </div>
  );
}

function AccountFormContent() {
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');
  return <AccountFormInner key={editId ?? 'new'} editId={editId} />;
}

export default function AccountFormPage() {
  return (
    <Suspense fallback={<div className="text-white p-6">Memuat form akun...</div>}>
      <AccountFormContent />
    </Suspense>
  );
}
