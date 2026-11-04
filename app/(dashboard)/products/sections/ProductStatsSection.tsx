import React from 'react';
import { Package, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui';
import { TProduct } from '@/types';

interface ProductStatsSectionProps {
  products: TProduct[];
}

export function ProductStatsSection({ products }: ProductStatsSectionProps) {
  const totalCount = products.length;
  const activeCount = products.filter((p) => p.isActive).length;
  const amanCount = products.filter((p) => p.stockStatus === 'Aman').length;
  const menipisCount = products.filter((p) => p.stockStatus === 'Menipis').length;
  const habisCount = products.filter((p) => p.stockStatus === 'Habis').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card variant="surface" padding="md" className="flex flex-col justify-between gap-4">
        <div className="flex justify-between items-center text-text-muted">
          <span className="text-xs font-medium">Total produk</span>
          <Package className="w-4 h-4 text-secondary" />
        </div>
        <div>
          <h3 className="text-3xl font-extrabold text-white">{totalCount}</h3>
          <p className="text-text-muted text-[11px] mt-1">{activeCount} produk aktif</p>
        </div>
      </Card>

      <Card variant="surface" padding="md" className="flex flex-col justify-between gap-4">
        <div className="flex justify-between items-center text-text-muted">
          <span className="text-xs font-medium">Stok aman</span>
          <CheckCircle2 className="w-4 h-4 text-secondary" />
        </div>
        <div>
          <h3 className="text-3xl font-extrabold text-white">{amanCount}</h3>
          <p className="text-emerald-400 text-[11px] mt-1 font-medium">Stok di atas ambang minimum</p>
        </div>
      </Card>

      <Card variant="surface" padding="md" className="flex flex-col justify-between gap-4">
        <div className="flex justify-between items-center text-text-muted">
          <span className="text-xs font-medium">Stok menipis</span>
          <AlertTriangle className="w-4 h-4 text-secondary" />
        </div>
        <div>
          <h3 className="text-3xl font-extrabold text-white">{menipisCount}</h3>
          <p className="text-amber-400 text-[11px] mt-1 font-medium">Perlu segera diisi kembali</p>
        </div>
      </Card>

      <Card variant="surface" padding="md" className="flex flex-col justify-between gap-4">
        <div className="flex justify-between items-center text-text-muted">
          <span className="text-xs font-medium">Stok habis</span>
          <Package className="w-4 h-4 text-secondary" />
        </div>
        <div>
          <h3 className="text-3xl font-extrabold text-white">{habisCount}</h3>
          <p className="text-rose-400 text-[11px] mt-1 font-medium">Tidak ada unit tersisa</p>
        </div>
      </Card>
    </div>
  );
}

