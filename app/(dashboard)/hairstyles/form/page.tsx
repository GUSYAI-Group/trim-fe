import { Metadata } from 'next';
import React, { Suspense } from 'react';
import HairstyleFormView from '@/modules/Hairstyles/views/HairstyleFormView';

export const metadata: Metadata = {
  title: 'Form Model Rambut - TRIM',
};

export default function HairstyleFormPage() {
  return (
    <Suspense fallback={<div className="text-white p-6 font-outfit">Memuat form model rambut...</div>}>
      <HairstyleFormView />
    </Suspense>
  );
}