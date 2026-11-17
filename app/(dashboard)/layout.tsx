import React from 'react';
import { DashboardLayoutWrapper } from '@/components/layout';
import PageTransition from '@/components/PageTransition';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayoutWrapper>
      <PageTransition>
        {children}
      </PageTransition>
    </DashboardLayoutWrapper>
  );
}