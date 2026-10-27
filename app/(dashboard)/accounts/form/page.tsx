import { Metadata } from 'next';
import React, { Suspense } from 'react';
import AccountFormView from '../../../../modules/Accounts/views/AccountFormView';

export const metadata: Metadata = {
  title: 'Form Akun Pengguna - TRIM',
};

export default function AccountFormPage() {
  return (
    <Suspense fallback={<div className="text-white p-6 font-outfit">Memuat form akun...</div>}>
      <AccountFormView />
    </Suspense>
  );
}