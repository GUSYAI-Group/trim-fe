// app/barbers/form/page.tsx
import { Metadata } from 'next';
import React, { Suspense } from 'react';
import { BarberFormView } from '@/modules/Barbers/views/BarberFormView';

export const metadata: Metadata = {
  title: 'Form Kapster - TRIM',
};

export default function BarberFormPage() {
  return (
    <Suspense fallback={<div className="text-white p-6">Memuat form...</div>}>
      <BarberFormView />
    </Suspense>
  );
}