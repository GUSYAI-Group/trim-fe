import React from 'react';
import { Metadata } from 'next';
import { ProfileView } from '@/modules/Profile';

export const metadata: Metadata = {
  title: 'Profil Pengguna — TRIM',
  description: 'Kelola identitas akun, kredensial keamanan, dan preferensi pengguna TRIM Barbershop.',
};

export default function ProfilePage() {
  return <ProfileView />;
}

