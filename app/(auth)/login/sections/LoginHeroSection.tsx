import React from 'react';
import Image from 'next/image';
import { Sparkles, Scissors, Clock } from 'lucide-react';

export function LoginHeroSection() {
  return (
    <div className="relative h-full rounded-2xl overflow-hidden flex flex-col justify-between p-6 md:p-8 bg-primary border border-border">
      <Image
        src="/login/barber-bg.jpg.png"
        alt="Barbershop Background"
        fill
        priority
        className="object-cover object-center grayscale contrast-125 brightness-50 scale-105 transition-transform duration-1000"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-primary/80" />

      {/* Top Brand */}
      <div className="relative z-10">
        <div className="flex items-center gap-2">
          <span className="font-heading text-[24px] md:text-[28px] font-black tracking-wider text-text-main">
            TRIM
          </span>
          <span className="h-2.5 w-2.5 rounded-sm bg-secondary inline-block shadow-[0_0_12px_rgba(255,69,0,0.8)]" />
        </div>
        <p className="text-[12px] md:text-[13px] text-text-muted mt-1 tracking-wide font-medium">
          AI-Powered Barbershop Information System
        </p>
      </div>

      {/* Center / Bottom Tagline */}
      <div className="relative z-10 space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-1 bg-secondary rounded-full shadow-[0_0_8px_rgba(255,69,0,0.6)]" />
          <span className="text-[11px] font-bold tracking-[0.2em] text-secondary uppercase">
            Sistem Operasional Cerdas
          </span>
        </div>

        <h1 className="font-heading text-[28px] md:text-[34px] lg:text-[40px] font-black tracking-tight leading-[1.05] uppercase text-text-main">
          POTONG RAPI.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-text-main via-text-main to-secondary">
            GERAK CEPAT.
          </span>
        </h1>

        <p className="text-[13px] md:text-[14px] text-text-muted max-w-sm leading-relaxed">
          Di balik potongan terbaik, ada operasional yang tertata, antrean cerdas, dan analitik presisi.
        </p>

        {/* Feature Pills */}
        <div className="pt-2 flex flex-wrap gap-2 text-[11px] font-medium text-text-muted">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface/80 border border-border backdrop-blur-sm">
            <Sparkles className="w-3 h-3 text-cyber-yellow" />
            <span>AI Face Rec</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface/80 border border-border backdrop-blur-sm">
            <Clock className="w-3 h-3 text-secondary" />
            <span>Smart Queue</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface/80 border border-border backdrop-blur-sm">
            <Scissors className="w-3 h-3 text-success" />
            <span>Master Barbers</span>
          </div>
        </div>
      </div>
    </div>
  );
}
