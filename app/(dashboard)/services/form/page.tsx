import { Metadata } from 'next';
import React, { Suspense } from 'react';
import ServiceFormView from '@/modules/Services/views/ServiceFormView';

export const metadata: Metadata = {
  title: 'Form Layanan - TRIM',
};

export default function ServiceFormPage() {
  return (
    <Suspense fallback={<div className="text-white p-6 font-outfit">Memuat form layanan...</div>}>
      <ServiceFormView />
    </Suspense>
  );
}