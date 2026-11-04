'use client';

import React from 'react';
import Link from 'next/link';
import { Edit3, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  SearchBar,
  SelectField,
  Badge,
  DataTable,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  EmptyState,
} from '@/components/ui';
import { TProduct } from '@/types';

interface ProductTableSectionProps {
  products: TProduct[];
  totalCount: number;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  selectedCategory: string;
  onCategoryChange: (val: string) => void;
  selectedStockStatus: string;
  onStockStatusChange: (val: string) => void;
  selectedActiveStatus: string;
  onActiveStatusChange: (val: string) => void;
  onToggleActive: (id: string) => void;
  onResetFilters: () => void;
}

export function ProductTableSection({
  products,
  totalCount,
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStockStatus,
  onStockStatusChange,
  selectedActiveStatus,
  onActiveStatusChange,
  onToggleActive,
  onResetFilters,
}: ProductTableSectionProps) {
  const getStockBadgeVariant = (status: TProduct['stockStatus']) => {
    if (status === 'Aman') return 'aman' as const;
    if (status === 'Menipis') return 'menipis' as const;
    return 'habis' as const;
  };

  return (
    <div className="space-y-4 pt-1">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-base font-bold text-white">Katalog produk</h2>

        <div className="flex flex-wrap items-center gap-2">
          <div className="w-full sm:w-56">
            <SearchBar
              size="sm"
              value={searchTerm}
              onChange={onSearchChange}
              placeholder="Cari nama produk"
            />
          </div>

          <SelectField
            size="sm"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            options={[
              { value: 'Semua kategori', label: 'Semua kategori' },
              { value: 'Minyak Rambut', label: 'Minyak Rambut' },
              { value: 'Hair Spray', label: 'Hair Spray' },
              { value: 'Powder', label: 'Powder' },
              { value: 'Hair Tonic', label: 'Hair Tonic' },
              { value: 'Serum', label: 'Serum' },
            ]}
          />

          <SelectField
            size="sm"
            value={selectedStockStatus}
            onChange={(e) => onStockStatusChange(e.target.value)}
            options={[
              { value: 'Semua status stok', label: 'Semua status stok' },
              { value: 'Aman', label: 'Aman' },
              { value: 'Menipis', label: 'Menipis' },
              { value: 'Habis', label: 'Habis' },
            ]}
          />

          <SelectField
            size="sm"
            value={selectedActiveStatus}
            onChange={(e) => onActiveStatusChange(e.target.value)}
            options={[
              { value: 'Semua status aktif', label: 'Semua status aktif' },
              { value: 'Aktif', label: 'Aktif' },
              { value: 'Nonaktif', label: 'Nonaktif' },
            ]}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-surface overflow-hidden shadow-md">
        {products.length === 0 ? (
          <EmptyState
            title="Produk tidak ditemukan"
            description="Tidak ada produk yang cocok dengan filter pencarian Anda."
            actionText="Reset Filter"
            onAction={onResetFilters}
          />
        ) : (
          <DataTable className="border-0 rounded-none">
            <TableHead>
              <tr>
                <TableCell isHeader>Nama produk</TableCell>
                <TableCell isHeader>Kategori</TableCell>
                <TableCell isHeader>Harga unit</TableCell>
                <TableCell isHeader>Stok (unit)</TableCell>
                <TableCell isHeader>Minimum</TableCell>
                <TableCell isHeader>Status stok</TableCell>
                <TableCell isHeader>Status aktif</TableCell>
                <TableCell isHeader className="text-right">Aksi</TableCell>
              </tr>
            </TableHead>
            <TableBody>
              {products.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="font-bold text-white text-xs">{item.name}</div>
                    <div className="text-[11px] text-text-muted">Kategori: {item.category}</div>
                  </TableCell>
                  <TableCell className="font-bold text-white text-xs">{item.category}</TableCell>
                  <TableCell className="font-bold text-white text-xs font-mono">{item.priceFormatted}</TableCell>
                  <TableCell
                    className={`font-bold text-xs font-mono ${
                      item.stock === 0
                        ? 'text-rose-400'
                        : item.stock <= item.minStock
                        ? 'text-amber-400'
                        : 'text-white'
                    }`}
                  >
                    {item.stock}
                  </TableCell>
                  <TableCell className="text-text-muted text-xs font-mono">{item.minStock}</TableCell>
                  <TableCell>
                    <Badge variant={getStockBadgeVariant(item.stockStatus)}>
                      {item.stockStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.isActive ? 'aktif' : 'nonaktif'}>
                      {item.isActive ? 'Aktif' : 'Nonaktif'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/products/form?id=${item.rawId}`}
                        className="text-secondary font-bold text-xs hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => onToggleActive(item.id)}
                        className="text-text-muted text-xs hover:text-white transition-colors cursor-pointer"
                      >
                        {item.isActive ? 'Nonaktifkan' : 'Aktifkan'}
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </DataTable>
        )}

        <div className="py-3.5 px-6 border-t border-border flex items-center justify-between text-text-muted text-xs">
          <span>
            Menampilkan {products.length > 0 ? 1 : 0}–{products.length} dari {totalCount} produk
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="p-1 rounded border border-border text-text-muted hover:text-white disabled:opacity-40"
              disabled
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="w-6 h-6 rounded bg-secondary text-white font-bold flex items-center justify-center text-xs">
              1
            </span>
            <button
              type="button"
              className="p-1 rounded border border-border text-text-muted hover:text-white disabled:opacity-40"
              disabled
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
