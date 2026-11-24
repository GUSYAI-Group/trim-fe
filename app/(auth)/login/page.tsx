import { Metadata } from 'next';
import React from 'react';
import { LoginHeroSection } from './sections/LoginHeroSection';
import { LoginFormSection } from './sections/LoginFormSection';

export const metadata: Metadata = {
  title: 'Masuk | TRIM Operasional',
};

export default function LoginPage() {
  return (
    <div className="relative min-h-screen w-full bg-primary text-text-main flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-hidden selection:bg-secondary selection:text-text-main">
      {/* Subtle ambient lighting */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,69,0,0.08),rgba(18,18,18,0))]" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -top-40 -right-40 w-96 h-96 bg-cyber-yellow/5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-6xl h-[92vh] max-h-[820px] bg-surface p-3 md:p-5 rounded-3xl border border-border shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-stretch overflow-hidden">
        <LoginHeroSection />
        <LoginFormSection />
      </div>
    </div>
  );
}
