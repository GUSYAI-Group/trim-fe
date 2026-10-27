import { Metadata } from 'next';
import React, { Suspense } from 'react';
import ProductFormView from '../../../../modules/Products/views/ProductFormView';

export const metadata: Metadata = {
  title: 'Form Produk - TRIM',
};

export default function ProductFormPage() {
  return (
    <Suspense fallback={<div className="text-white p-6 font-outfit">Memuat form produk...</div>}>
      <ProductFormView />
    </Suspense>
  );
}