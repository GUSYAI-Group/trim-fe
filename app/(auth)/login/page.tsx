import { Metadata } from 'next';
import React from 'react';
import { LoginHeroSection } from './sections/LoginHeroSection';
import { LoginFormSection } from './sections/LoginFormSection';

export const metadata: Metadata = {
  title: 'Masuk',
};

export default function LoginPage() {
  return (
    <div className="h-screen w-screen bg-primary text-text-main flex items-center justify-center p-3 md:p-6 overflow-hidden selection:bg-secondary selection:text-text-main">
      <div className="w-full max-w-6xl h-full max-h-[90vh] bg-surface p-3 md:p-5 rounded-3xl border border-border shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-stretch overflow-hidden">
        <LoginHeroSection />
        <LoginFormSection />
      </div>
    </div>
  );
}

