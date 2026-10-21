import { Metadata } from 'next';
import QueueView from '@/modules/Queue/views/QueueView';

export const metadata: Metadata = {
  title: 'Monitor Antrean Langsung | TRIM',
};

export default function QueuePage() {
  return <QueueView />;
}