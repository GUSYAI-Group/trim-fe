import React from 'react';
import { DashboardLayoutWrapper } from '@/components/layout';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayoutWrapper>
      {children}
    </DashboardLayoutWrapper>
  );
}
