import React from 'react';
import { Metadata } from 'next';
import { HelpView } from '@/modules/Help';

export const metadata: Metadata = {
  title: 'Pusat Bantuan — TRIM',
  description: 'Pusat bantuan dan panduan operasional TRIM Barbershop Management.',
};

export default function HelpPage() {
  return <HelpView />;
}
