import { Metadata } from 'next';
import HairstylesView from '@/modules/Hairstyles/views/HairstylesView';

export const metadata: Metadata = {
  title: 'Kelola Model Rambut | TRIM',
};

export default function HairstylesPage() {
  return <HairstylesView />;
}