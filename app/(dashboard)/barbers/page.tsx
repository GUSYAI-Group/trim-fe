import { Metadata } from 'next';
import React from 'react';
import { BarbersView } from '@/modules/Barbers/views/BarbersView';

export const metadata: Metadata = {
  title: 'Kelola Kapster',
};

export default function BarbersPage() {
  return <BarbersView />;
}
