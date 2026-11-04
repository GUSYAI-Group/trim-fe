import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MoreHorizontal, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui';
import { THairstyle } from '@/types';

interface HairstyleCardProps {
  item: THairstyle;
}

export function HairstyleCard({ item }: HairstyleCardProps) {
  return (
    <div className="bg-surface border border-border rounded-2xl overflow-hidden flex flex-col justify-between hover:border-secondary/60 transition-all group">
      <div>
        <div className="relative w-full h-48 bg-primary overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover object-center grayscale contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-[18px] font-bold text-text-main tracking-tight">
              {item.name}
            </h3>
            <button
              type="button"
              className="text-text-muted hover:text-text-main p-1 rounded-lg hover:bg-raised transition-colors cursor-pointer"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1.5">
            <p className="text-[12px] text-text-muted font-normal">Contoh bentuk wajah</p>
            <div className="flex flex-wrap gap-1.5">
              {item.faceShapes.map((shape, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-raised border border-border text-[12px] text-text-main font-medium"
                >
                  {shape}
                </span>
              ))}
            </div>
          </div>

          <p className="text-[13px] text-text-muted leading-relaxed font-normal pt-0.5">
            Deskripsi: {item.description}
          </p>

          <p className="text-[13px] text-text-muted font-normal pt-1">
            Tipe rambut: <span className="font-bold text-text-main">{item.hairType}</span>
            <span className="mx-1.5 text-text-muted">•</span>
            Level perawatan: <span className="font-bold text-text-main">{item.maintenanceLevel}</span>
          </p>
        </div>
      </div>

      <div className="px-5 py-3.5 border-t border-border/60 bg-surface flex items-center justify-between">
        <Badge
          variant={item.isAiActive ? 'aktif' : 'nonaktif'}
          label={item.isAiActive ? 'Aktif untuk AI' : 'Nonaktif'}
        />

        <Link
          href={`/hairstyles/form?id=${item.id}`}
          className="text-secondary text-[13px] font-bold hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span>Edit</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

