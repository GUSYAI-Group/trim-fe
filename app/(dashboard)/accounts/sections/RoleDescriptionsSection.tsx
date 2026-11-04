import React from 'react';
import { Crown, Shield, Briefcase, Wallet } from 'lucide-react';
import { Card } from '@/components/ui';
import { TRole } from '@/store/useAuthStore';

const ROLE_DESCRIPTIONS: {
  role: TRole;
  label: string;
  Icon: React.ElementType;
  description: string;
}[] = [
  {
    role: 'owner',
    label: 'Owner',
    Icon: Crown,
    description: 'Akses penuh, buat akun staf, dan pengaturan toko.',
  },
  {
    role: 'admin',
    label: 'Admin',
    Icon: Shield,
    description: 'Kelola operasional dan staf. Tidak dapat menghapus akun Owner.',
  },
  {
    role: 'barber',
    label: 'Barber',
    Icon: Briefcase,
    description: 'Kelola profil kapster dan layanan yang ditugaskan.',
  },
  {
    role: 'customer',
    label: 'Customer',
    Icon: Wallet,
    description: 'Akses profil pelanggan dan riwayat reservasi.',
  },
];

export function RoleDescriptionsSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {ROLE_DESCRIPTIONS.map(({ role, label, Icon, description }) => (
        <Card key={role} variant="surface" padding="md" className="space-y-3">
          <div className="flex items-center gap-2.5">
            <Icon className="w-5 h-5 text-secondary" />
            <h3 className="text-[15px] font-bold text-white">{label}</h3>
          </div>
          <p className="text-[13px] text-text-muted leading-relaxed">{description}</p>
        </Card>
      ))}
    </div>
  );
}

