import { Metadata } from 'next';
import React from 'react';
import { BarberFormView } from '@/modules/Barbers/views/BarberFormView';

export const metadata: Metadata = {
  title: 'Tambah Kapster',
};

export default function BarberFormPage() {
  return <BarberFormView />;
}
