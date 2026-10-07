import React, { useState } from 'react';
import { SectionTitle, SubSection } from '../components/DesignSystemHelpers';
import { Button, Modal, Toast, Alert, Spinner, EmptyState, SkeletonCard, SkeletonTable } from '@/components/ui';
import { PackageX, Search as SearchIcon } from 'lucide-react';

interface Props {
  onSuccess: () => void;
  onError: () => void;
  onWarning: () => void;
  onInfo: () => void;
}

export default function FeedbackOverlaySection({ onSuccess, onError, onWarning, onInfo }: Props) {
  const [modalInfo, setModalInfo] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [modalDestruct, setModalDestruct] = useState(false);

  return (
    <section className="space-y-16">
      <SectionTitle number="04" title="Feedback & overlay" />

      {/* O.01 Modal */}
      <SubSection code="O.01" title="Modal / info, confirmation & destructive" />
      <div className="flex flex-wrap gap-4">
        <Button variant="outline" onClick={() => setModalInfo(true)}>Info Modal</Button>
        <Button variant="outline" onClick={() => setModalConfirm(true)}>Confirmation Modal</Button>
        <Button variant="outline" onClick={() => setModalDestruct(true)}>Destructive Modal</Button>
      </div>

      <Modal
        isOpen={modalInfo}
        onClose={() => setModalInfo(false)}
        variant="info"
        title="Koleksi baru sudah hadir"
        description="Kenali 12 pilihan terbaru di koleksi Street Essentials. Temukan ukuran dan gaya yang paling pas."
        primaryLabel="Mengerti"
      />
      <Modal
        isOpen={modalConfirm}
        onClose={() => setModalConfirm(false)}
        variant="confirmation"
        title="Konfirmasi pesanan?"
        description="Pesanan #TRM-2049 senilai Rp189.000 akan diteruskan ke tim pengemasan. Pastikan data sudah benar."
        primaryLabel="Konfirmasi"
        secondaryLabel="Batal"
      />
      <Modal
        isOpen={modalDestruct}
        onClose={() => setModalDestruct(false)}
        variant="destructive"
        title="Hapus produk ini?"
        description="Oversized Tee akan dihapus dari katalog. Tindakan ini tidak dapat dibatalkan."
        primaryLabel="Hapus"
        secondaryLabel="Batal"
      />

      {/* O.02 Toast & Alert */}
      <SubSection code="O.02" title="Toast & alert / 4 nada semantik" />
      <div className="flex flex-wrap gap-4 mb-6">
        <Button variant="outline" onClick={onSuccess}>Success Toast</Button>
        <Button variant="outline" onClick={onError}>Error Toast</Button>
        <Button variant="outline" onClick={onWarning}>Warning Toast</Button>
        <Button variant="outline" onClick={onInfo}>Info Toast</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Toast Column */}
        <div className="space-y-6">
          <h3 className="text-[14px] text-text-muted mb-4 font-bold tracking-widest uppercase">Toast / statis untuk preview</h3>
          <Toast isOpen={true} onClose={() => {}} variant="success" title="Pesanan berhasil disimpan" description="Pesanan #TRM-2049 siap diproses." />
          <Toast isOpen={true} onClose={() => {}} variant="error" title="Pembayaran gagal" description="Saldo tidak cukup. Gunakan metode lain." />
          <Toast isOpen={true} onClose={() => {}} variant="warning" title="Stok hampir habis" description="Oversized Tee ukuran M tersisa 2." />
          <Toast isOpen={true} onClose={() => {}} variant="info" title="Katalog diperbarui" description="12 produk baru tersedia di koleksi terbaru." />
        </div>

        {/* Alert Column */}
        <div className="space-y-6">
          <h3 className="text-[14px] text-text-muted mb-4 font-bold tracking-widest uppercase">Alert / inline menetap</h3>
          <Alert variant="success" title="Pembayaran Lunas" description="Pembayaran diterima. Status pesanan kini Lunas." />
          <Alert 
            variant="error" 
            title="Gagal menyimpan" 
            description="Data belum tersimpan. Periksa koneksi lalu coba lagi." 
            action={<button className="text-[12px] font-bold text-text-main flex items-center gap-1 hover:underline">Coba lagi &rarr;</button>}
          />
          <Alert variant="warning" title="Menunggu pembayaran" description="Pesanan Pending. Selesaikan pembayaran dalam 15 menit." />
          <Alert variant="info" title="Informasi pengiriman" description="Pengiriman reguler membutuhkan 2–4 hari kerja." />
        </div>
      </div>

      {/* O.03 Spinner */}
      <SubSection code="O.03" title="Loading / spinner" />
      <div className="flex items-end gap-10">
        <div className="text-center">
          <Spinner size="sm" />
          <small className="block mt-2">16px / dalam tombol</small>
        </div>
        <div className="text-center">
          <Spinner size="md" />
          <small className="block mt-2">24px / inline</small>
        </div>
        <div className="text-center">
          <Spinner size="lg" />
          <small className="block mt-2">40px / area konten</small>
        </div>
      </div>
      <div className="mt-6">
        <Spinner size="md" label="Memuat koleksi... Tunggu sebentar. Kami menyiapkan produk terbaru." />
      </div>

      {/* O.05 Empty State */}
      <SubSection code="O.05" title="Empty state / tidak ada data & hasil pencarian" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface border border-border rounded-2xl p-6">
          <EmptyState
            icon={<PackageX className="w-8 h-8" />}
            title="Belum ada produk"
            description="Mulai bangun katalog TRIM dengan menambahkan produk pertama."
            action={<Button variant="primary">Tambah produk</Button>}
          />
        </div>
        <div className="bg-surface border border-border rounded-2xl p-6">
          <EmptyState
            icon={<SearchIcon className="w-8 h-8" />}
            title="Produk tidak ditemukan"
            description='Tidak ada hasil untuk "Neon Jacket". Coba kata kunci lain atau hapus filter.'
            action={<Button variant="outline">Hapus filter</Button>}
          />
        </div>
      </div>

      {/* O.06 Skeleton */}
      <SubSection code="O.06" title="Loading / skeleton" />
      <p className="text-text-muted text-[14px] mb-4">
        Pertahankan bentuk media dan teks yang akan dimuat. Warna Raised / Border, radius 8px.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
      <div className="mt-6 bg-surface border border-border rounded-2xl p-8">
        <SkeletonTable rows={4} />
      </div>
    </section>
  );
}
