import React from 'react';
import { Package, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui';
import { TProduct } from '@/types';

interface ProductStatsSectionProps {
  products: TProduct[];
  metaCounts?: {
    totalCount: number;
    activeCount: number;
    amanCount: number;
    menipisCount: number;
    habisCount: number;
  };
}

export function ProductStatsSection({ products, metaCounts }: ProductStatsSectionProps) {
  const totalCount = metaCounts?.totalCount ?? products.length;
  const activeCount = metaCounts?.activeCount ?? products.filter((p) => p.isActive).length;
  const amanCount = metaCounts?.amanCount ?? products.filter((p) => p.stockStatus === 'Aman').length;
  const menipisCount = metaCounts?.menipisCount ?? products.filter((p) => p.stockStatus === 'Menipis').length;
  const habisCount = metaCounts?.habisCount ?? products.filter((p) => p.stockStatus === 'Habis').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card variant="surface" padding="md" className="flex flex-col justify-between gap-4">
        <div className="flex justify-between items-center text-text-muted">
          <span className="text-[14px] font-medium text-text-muted">Total produk</span>
          <Package className="w-4 h-4 text-secondary" />
        </div>
        <div>
          <h3 className="text-[28px] font-extrabold font-mono text-text-main">{totalCount}</h3>
          <p className="text-text-muted text-[12px] mt-1">{activeCount} produk aktif</p>
        </div>
      </Card>

      <Card variant="surface" padding="md" className="flex flex-col justify-between gap-4">
        <div className="flex justify-between items-center text-text-muted">
          <span className="text-[14px] font-medium text-text-muted">Stok aman</span>
          <CheckCircle2 className="w-4 h-4 text-secondary" />
        </div>
        <div>
          <h3 className="text-[28px] font-extrabold font-mono text-text-main">{amanCount}</h3>
          <p className="text-success text-[12px] mt-1 font-medium">Stok di atas ambang minimum</p>
        </div>
      </Card>

      <Card variant="surface" padding="md" className="flex flex-col justify-between gap-4">
        <div className="flex justify-between items-center text-text-muted">
          <span className="text-[14px] font-medium text-text-muted">Stok menipis</span>
          <AlertTriangle className="w-4 h-4 text-secondary" />
        </div>
        <div>
          <h3 className="text-[28px] font-extrabold font-mono text-text-main">{menipisCount}</h3>
          <p className="text-warning text-[12px] mt-1 font-medium">Perlu segera diisi kembali</p>
        </div>
      </Card>

      <Card variant="surface" padding="md" className="flex flex-col justify-between gap-4">
        <div className="flex justify-between items-center text-text-muted">
          <span className="text-[14px] font-medium text-text-muted">Stok habis</span>
          <Package className="w-4 h-4 text-secondary" />
        </div>
        <div>
          <h3 className="text-[28px] font-extrabold font-mono text-text-main">{habisCount}</h3>
          <p className="text-danger text-[12px] mt-1 font-medium">Tidak ada unit tersisa</p>
        </div>
      </Card>
    </div>
  );
}

