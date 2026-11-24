'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Plus } from 'lucide-react';
import { Button, Alert, Modal, Toast } from '@/components/ui';
import { barberService } from '@/services/endpoints/barber';
import { TKapster } from '@/types';
import { BarberStatsSection } from './sections/BarberStatsSection';
import { BarberTableSection } from './sections/BarberTableSection';

export default function BarbersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'Semua' | 'Aktif' | 'Nonaktif'>('Semua');

  const [barbers, setBarbers] = useState<TKapster[]>([]);
  const [counts, setCounts] = useState({
    totalCount: 0,
    activeCount: 0,
    inactiveCount: 0,
    inServiceCount: 0,
    averageRating: '0.0',
    totalReviews: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [barberToDelete, setBarberToDelete] = useState<TKapster | null>(null);
  const [barberDetail, setBarberDetail] = useState<TKapster | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const fetchBarbers = useCallback(async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const res = await barberService.getBarbers({
        search: searchQuery,
        status: selectedStatus,
      });

      setBarbers(res.data);
      if (res.meta) {
        setCounts({
          totalCount: res.meta.totalCount ?? res.data.length,
          activeCount: res.meta.activeCount ?? res.data.filter((k) => k.status === 'aktif').length,
          inactiveCount: res.meta.inactiveCount ?? res.data.filter((k) => k.status === 'nonaktif').length,
          inServiceCount: (res.meta as any).inServiceCount ?? 0,
          averageRating: (res.meta as any).averageRating ?? '0.0',
          totalReviews: (res.meta as any).totalReviews ?? 0,
        });
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Gagal memuat data kapster dari server');
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, selectedStatus]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBarbers();
    }, 250);

    return () => clearTimeout(timer);
  }, [fetchBarbers]);

  const handleConfirmDelete = async () => {
    if (!barberToDelete) return;
    try {
      await barberService.deleteBarber(barberToDelete.id || barberToDelete.uuid);
      setToastMsg(`Kapster "${barberToDelete.name}" berhasil dihapus.`);
      fetchBarbers();
    } catch (err) {
      setToastMsg(err instanceof Error ? err.message : 'Gagal menghapus kapster');
    } finally {
      setBarberToDelete(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <header className="space-y-1">
          <h1 className="text-[28px] font-extrabold text-text-main tracking-tight">
            Kelola Kapster
          </h1>
          <p className="text-text-muted text-[14px]">
            Tim di balik setiap potongan. Atur spesialisasi, profil, dan status aktif kapster.
          </p>
        </header>

        <Button href="/barbers/form" variant="primary" size="md" icon={<Plus className="w-4 h-4" />}>
          Tambah kapster
        </Button>
      </div>

      {errorMsg && (
        <Alert
          variant="error"
          title="Gagal mengambil data"
          description={errorMsg}
        />
      )}

      <BarberStatsSection
        totalCount={counts.totalCount}
        activeCount={counts.activeCount}
        inServiceCount={counts.inServiceCount}
        averageRating={counts.averageRating}
        totalReviews={counts.totalReviews}
      />

      <div className={isLoading ? 'opacity-60 transition-opacity' : 'transition-opacity'}>
        <BarberTableSection
          barbers={barbers}
          totalCount={counts.totalCount}
          activeCount={counts.activeCount}
          inactiveCount={counts.inactiveCount}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          onDeleteRequest={setBarberToDelete}
          onDetailRequest={setBarberDetail}
        />
      </div>

      {barberDetail && (
        <Modal
          isOpen={true}
          onClose={() => setBarberDetail(null)}
          title={`Detail Profil • ${barberDetail.name}`}
          description="Informasi kapster, nomor kontak, performa pengerjaan, dan estimasi pendapatan."
        >
          <div className="space-y-4 py-1">
            <div className="grid grid-cols-2 gap-4 text-sm bg-surface p-4 rounded-xl border border-border">
              <div>
                <p className="text-text-muted text-xs">Nama Lengkap</p>
                <p className="font-semibold text-text-main mt-0.5">{barberDetail.name}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Nomor WhatsApp/HP</p>
                <p className="font-semibold text-text-main mt-0.5">{barberDetail.phone || '—'}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Spesialisasi</p>
                <p className="font-semibold text-text-main mt-0.5">{barberDetail.specialty}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Status Akun</p>
                <p className="font-semibold text-text-main mt-0.5 capitalize">
                  {barberDetail.status === 'aktif' ? 'Aktif' : 'Nonaktif'}
                </p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Rating Rata-rata</p>
                <p className="font-semibold text-secondary mt-0.5">⭐ {barberDetail.rating} / 5.0</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Total Selesai</p>
                <p className="font-semibold text-text-main mt-0.5">{barberDetail.finished} cukuran</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Cukuran 7 Hari Terakhir</p>
                <p className="font-semibold text-text-main mt-0.5">{barberDetail.weeklyCuts} kali</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Omset 7 Hari Terakhir</p>
                <p className="font-semibold text-success mt-0.5">{barberDetail.weeklyIncome}</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button href={`/barbers/form?id=${barberDetail.id || barberDetail.rawPhone}`} variant="primary">
                Edit Profil
              </Button>
              <Button variant="outline" onClick={() => setBarberDetail(null)}>
                Tutup
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {barberToDelete && (
        <Modal
          isOpen={true}
          onClose={() => setBarberToDelete(null)}
          variant="destructive"
          title="Konfirmasi Hapus Kapster"
          description={`Apakah kamu yakin ingin menghapus ${barberToDelete.name}? Jika memiliki riwayat booking, status kapster akan diubah menjadi nonaktif.`}
          confirmText="Hapus Kapster"
          cancelText="Batal"
          onConfirm={handleConfirmDelete}
        />
      )}

      {toastMsg && (
        <Toast
          isOpen={true}
          title="Kelola Kapster"
          description={toastMsg}
          onClose={() => setToastMsg(null)}
        />
      )}

      <Alert
        variant="accent"
        title="Nomor telepon unik • Terhubung ke Database"
        description="Profil kapster diambil langsung secara real-time dari backend Express & MySQL (tabel barbers & users)."
      />
    </div>
  );
}
