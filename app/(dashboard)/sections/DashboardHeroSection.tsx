'use client';

import React from 'react';
import Image from 'next/image';
import { useAuthStore } from '@/store/useAuthStore';
import { MOCK_BARBERS } from '@/utils/mocks/mockData';

export function DashboardHeroSection() {
  const { user } = useAuthStore();
  const activeCount = MOCK_BARBERS.filter((b) => b.status === 'aktif').length;

  return (
    <div className="relative rounded-2xl bg-surface border border-border overflow-hidden flex flex-col md:flex-row h-auto md:h-44 shadow-lg">
      <div className="flex-1 p-6 md:p-8 flex flex-col justify-center relative z-10">
        <p className="text-secondary text-[12px] font-bold uppercase tracking-widest mb-2">
          TOKO BUKA / is_store_closed = false
        </p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-text-main tracking-tight mb-2 uppercase">
          GAYA JALANAN. BISNIS JALAN.
        </h2>
        <p className="text-text-muted text-[14px]">
          Halo, {user.email}. {activeCount} kapster aktif hari ini.
        </p>
      </div>
      <div className="w-full md:w-96 h-36 md:h-full relative shrink-0 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-surface via-surface/70 to-transparent z-10 hidden md:block" />
        <div className="absolute inset-0 bg-linear-to-t from-surface via-surface/70 to-transparent z-10 md:hidden" />
        <Image
          src="/login/barber-bg.jpg.png"
          alt="Trim Barbershop Banner"
          fill
          className="object-cover object-center grayscale contrast-125 brightness-75"
          priority
        />
      </div>
    </div>
  );
}

