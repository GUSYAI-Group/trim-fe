'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button, Alert, Card, Toast } from '@/components/ui';
import { MOCK_ACCOUNTS } from '@/utils/mocks/mockData';
import { TRole } from '@/store/useAuthStore';
import { AccountMainFormSection } from './sections/AccountMainFormSection';
import { AccountSidebarSection } from './sections/AccountSidebarSection';

function AccountFormInner({ editId }: { editId: string | null }) {
  const isEditMode = Boolean(editId);
  const found = isEditMode && editId
    ? MOCK_ACCOUNTS.find((a) => a.slug === editId || String(a.id) === editId)
    : undefined;

  const [initials] = useState(found?.initials ?? 'US');
  const [email, setEmail] = useState(found?.email ?? '');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<TRole>(found?.role ?? 'admin');

  const [uuid] = useState(found?.uuid ?? 'Belum dibuat');
  const [createdAt] = useState(found?.createdAt ?? 'Belum dibuat');
  const [updatedAt] = useState(found?.updatedAt ?? 'Belum dibuat');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMsg(
      isEditMode
        ? `Akun "${email}" berhasil diperbarui!`
        : `Akun "${email}" berhasil dibuat!`
    );
  };

  return (
    <div className="space-y-6 pb-20 selection:bg-secondary selection:text-white">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs text-text-muted">
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
            <h1 className="text-2xl md:text-[28px] font-extrabold text-white tracking-tight">
              {isEditMode ? 'Edit Akun Pengguna' : 'Tambah Akun Pengguna'}
            </h1>
            <p className="text-text-muted text-xs md:text-sm mt-0.5">
              {isEditMode
                ? `Perbarui email dan hak akses ${email || 'pengguna'}. Kamu masuk sebagai Owner.`
                : 'Buat akun login dengan email, kata sandi, dan peran. Kamu masuk sebagai Owner.'}
            </p>
          </div>

          <Button
            href="/accounts"
            variant="ghost"
            size="sm"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            className="w-fit"
          >
            Kembali ke daftar
          </Button>
        </div>
      </div>

      <Alert
        variant="accent"
        title="Akses sesuai peran, bisnis tetap aman"
        description="Role: customer, barber, admin, owner. Admin biasa tidak dapat menghapus akun Owner; pembatasan diterapkan oleh aplikasi."
      />

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
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
      </form>

      <Card
        variant="surface"
        padding="sm"
        className="flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl"
      >
        <span className="text-xs text-text-muted">
          {isEditMode
            ? 'Periksa kembali perubahan akun sebelum menyimpan.'
            : 'Lengkapi email, kata sandi, dan peran sebelum membuat akun.'}
        </span>
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <Button href="/accounts" variant="ghost" size="sm">
            Batal
          </Button>
          <Button onClick={handleSubmit} variant="primary" size="sm">
            {isEditMode ? 'Simpan perubahan' : 'Buat akun'}
          </Button>
        </div>
      </Card>

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
