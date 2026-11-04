'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button, Alert, Toast } from '@/components/ui';
import { MOCK_PRODUCTS } from '@/utils/mocks/mockData';
import { TProduct } from '@/types';
import { ProductStatsSection } from './sections/ProductStatsSection';
import { ProductTableSection } from './sections/ProductTableSection';

export default function ProductsPage() {
  const [products, setProducts] = useState<TProduct[]>(MOCK_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua kategori');
  const [selectedStockStatus, setSelectedStockStatus] = useState('Semua status stok');
  const [selectedActiveStatus, setSelectedActiveStatus] = useState('Semua status aktif');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Semua kategori' || item.category === selectedCategory;
    const matchesStock = selectedStockStatus === 'Semua status stok' || item.stockStatus === selectedStockStatus;
    const matchesActive =
      selectedActiveStatus === 'Semua status aktif' ||
      (selectedActiveStatus === 'Aktif' ? item.isActive : !item.isActive);

    return matchesSearch && matchesCategory && matchesStock && matchesActive;
  });

  const handleToggleActive = (id: string) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.isActive;
          setToastMsg(`Produk "${item.name}" berhasil ${nextState ? 'diaktifkan' : 'dinonaktifkan'}.`);
          return { ...item, isActive: nextState };
        }
        return item;
      })
    );
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Semua kategori');
    setSelectedStockStatus('Semua status stok');
    setSelectedActiveStatus('Semua status aktif');
  };

  return (
    <div className="space-y-6 pb-12 selection:bg-secondary selection:text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-[28px] font-extrabold text-white tracking-tight">
            Kelola Produk
          </h1>
          <p className="text-text-muted text-xs md:text-sm mt-1">
            Kelola katalog, harga satuan, dan pantau stok produk barbershop.
          </p>
        </div>

        <Button
          href="/products/form"
          variant="primary"
          size="sm"
          leftIcon={<Plus className="w-4 h-4" />}
          className="self-start sm:self-auto shrink-0"
        >
          Tambah produk
        </Button>
      </div>

      <ProductStatsSection products={products} />

      <ProductTableSection
        products={filteredProducts}
        totalCount={products.length}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedStockStatus={selectedStockStatus}
        onStockStatusChange={setSelectedStockStatus}
        selectedActiveStatus={selectedActiveStatus}
        onActiveStatusChange={setSelectedActiveStatus}
        onToggleActive={handleToggleActive}
        onResetFilters={handleResetFilters}
      />

      <Alert
        variant="accent"
        title="Status aktif berbeda dari status stok"
        description="Aman: stok > minimum. Menipis: 0 < stok ≤ minimum. Habis: stok = 0. Produk aktif tetap dapat memiliki stok habis."
      />

      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50">
          <Toast
            variant="success"
            title="Status Diperbarui"
            description={toastMsg}
            onClose={() => setToastMsg(null)}
          />
        </div>
      )}
    </div>
  );
}
