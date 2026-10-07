import { Metadata } from 'next';
import { DashboardView } from '@/modules/Dashboard/views/DashboardView';

export const metadata: Metadata = {
  title: 'Beranda & Analitik',
};
export default function Page() {
  return <DashboardView />;
}
