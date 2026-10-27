import { Metadata } from 'next';
import React, { Suspense } from 'react';
import QueueFormView from '../../../../modules/Queue/views/QueueFormView';

export const metadata: Metadata = {
  title: 'Form Antrean - TRIM',
};

export default function QueueFormPage() {
  return (
    <Suspense fallback={<div className="text-white p-6 font-outfit">Memuat form antrean...</div>}>
      <QueueFormView />
    </Suspense>
  );
}