'use client';

import React, { useState } from 'react';
import { Toast } from '@/components/ui';

import VisualFoundationSection from '../sections/VisualFoundationSection';
import ActionsFormSection from '../sections/ActionsFormSection';
import DataNavigationSection from '../sections/DataNavigationSection';
import FeedbackOverlaySection from '../sections/FeedbackOverlaySection';

export default function DesignSystemView() {
  // Global toast state for this view
  const [toastSuccess, setToastSuccess] = useState(false);
  const [toastError, setToastError] = useState(false);
  const [toastWarning, setToastWarning] = useState(false);
  const [toastInfo, setToastInfo] = useState(false);

  return (
    <div className="min-h-screen text-text-main p-8 md:p-12 space-y-16 max-w-300 mx-auto">
      {/* HEADER */}
      <header className="space-y-2">
        <p className="text-secondary font-bold text-[14px] tracking-widest uppercase">
          TRIM — Sistem Desain / 2026
        </p>
        <h1 className="text-[36px] font-extrabold">Design System</h1>
        <p className="text-text-muted text-[16px]">
          Seluruh komponen UI yang digunakan pada TRIM Dashboard & App.
        </p>
      </header>

      {/* SECTIONS */}
      <VisualFoundationSection />
      
      <ActionsFormSection />
      
      <DataNavigationSection />
      
      <FeedbackOverlaySection 
        onSuccess={() => setToastSuccess(true)}
        onError={() => setToastError(true)}
        onWarning={() => setToastWarning(true)}
        onInfo={() => setToastInfo(true)}
      />

      {/* FOOTER */}
      <footer className="border-t border-border pt-8 flex justify-between text-[12px] text-text-muted pb-24">
        <span>TRIM / Fun, Street & Youthful</span>
        <span>Contoh visual editable · Komponen aktif</span>
      </footer>

      {/* TOAST CONTAINER FOR SIMULATION */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
        <div className="pointer-events-auto"><Toast isOpen={toastSuccess} onClose={() => setToastSuccess(false)} variant="success" title="Pesanan berhasil disimpan" description="Pesanan #TRM-2049 siap diproses." /></div>
        <div className="pointer-events-auto"><Toast isOpen={toastError} onClose={() => setToastError(false)} variant="error" title="Pembayaran gagal" description="Saldo tidak cukup. Gunakan metode lain." /></div>
        <div className="pointer-events-auto"><Toast isOpen={toastWarning} onClose={() => setToastWarning(false)} variant="warning" title="Stok hampir habis" description="Oversized Tee ukuran M tersisa 2." /></div>
        <div className="pointer-events-auto"><Toast isOpen={toastInfo} onClose={() => setToastInfo(false)} variant="info" title="Katalog diperbarui" description="12 produk baru tersedia di koleksi terbaru." /></div>
      </div>
    </div>
  );
}
