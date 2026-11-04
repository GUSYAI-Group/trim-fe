import React from 'react';
import Image from 'next/image';

export function LoginHeroSection() {
  return (
    <div className="relative h-full rounded-2xl overflow-hidden flex flex-col justify-between p-6 md:p-8 bg-primary border border-border">
      <Image
        src="/login/barber-bg.jpg.png"
        alt="Barbershop Background"
        fill
        priority
        className="object-cover object-center grayscale contrast-125 brightness-60"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-primary/70" />

      <div className="relative z-10">
        <div className="flex items-center gap-1.5 text-xl md:text-2xl font-black tracking-wider text-text-main">
          TRIM<span className="h-2 w-2 rounded-sm bg-secondary inline-block" />
        </div>
        <p className="text-[12px] text-text-muted mt-0.5 tracking-wide font-medium">
          AI-Powered Barbershop Information System
        </p>
      </div>

      <div className="relative z-10 space-y-2">
        <div className="w-8 h-1 bg-secondary rounded-full" />
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight leading-none uppercase text-text-main">
          POTONG RAPI.<br />GERAK CEPAT.
        </h1>
        <p className="text-[13px] text-text-muted max-w-xs leading-relaxed">
          Di balik potongan terbaik, ada operasional yang tertata.
        </p>
      </div>
    </div>
  );
}

