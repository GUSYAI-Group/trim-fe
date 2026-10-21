import { Metadata } from 'next';
import LoginView from '@/modules/Login/views/LoginView';

export const metadata: Metadata = {
  title: 'Masuk | TRIM',
};

export default function LoginPage() {
  return <LoginView />;
}