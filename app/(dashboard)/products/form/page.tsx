'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button, Alert, Toast } from '@/components/ui';
import { MOCK_PRODUCTS } from '@/utils/mocks/mockData';
import { ProductMainFormSection } from './sections/ProductMainFormSection';
import { ProductSidebarSection } from './sections/ProductSidebarSection';

function ProductFormInner({ editId }: { editId: string | null }) {
  const isEditMode = Boolean(editId);
  const found = isEditMode && editId
    ? MOCK_PRODUCTS.find((p) => p.rawId === editId || p.id === editId)
    : undefined;

  const [name, setName] = useState(found?.name ?? '');
  const [category, setCategory] = useState(found?.category ?? '');
  const [price, setPrice] = useState(found ? String(found.price) : '');
  const [stock, setStock] = useState(found ? String(found.stock) : '');
  const [minStock, setMinStock] = useState(found ? String(found.minStock) : '');
  const [isActive, setIsActive] = useState(found?.isActive ?? true);
  const [description, setDescription] = useState(found?.description ?? '');

  const [uuid] = useState(found?.uuid ?? 'Belum dibuat');
  const [createdAt] = useState(found?.createdAt ?? 'Belum dibuat');
  const [updatedAt] = useState(found?.updatedAt ?? 'Belum dibuat');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setToastMsg(
      isEditMode
        ? `Perubahan produk "${name}" berhasil disimpan!`
        : `Produk "${name}" berhasil ditambahkan!`
    );
  };

  return (
    <div className="space-y-6 pb-20 selection:bg-secondary selection:text-white">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs text-text-muted">
          <Link href="/products" className="hover:text-white transition-colors">
            Produk
          </Link>
          <span>/</span>
          <span className="text-white font-medium">
            {isEditMode ? 'Edit Produk' : 'Tambah Produk'}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <div>
            <h1 className="text-2xl md:text-[28px] font-extrabold text-white tracking-tight">
              {isEditMode ? 'Edit Produk' : 'Tambah Produk'}
            </h1>
            <p className="text-text-muted text-xs md:text-sm mt-0.5">
              {isEditMode
                ? `Perbarui informasi, harga, dan persediaan ${name || 'produk'}.`
                : 'Tambahkan produk ke katalog toko. Tanda * wajib diisi.'}
            </p>
          </div>

          <Button
            href="/products"
            variant="ghost"
            size="sm"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            className="w-fit"
          >
            Kembali ke daftar
          </Button>
        </div>
      </div>

      <Alert
        variant="accent"
        title={
          isEditMode
            ? 'Perubahan stok dicatat sebagai penyesuaian persediaan'
            : 'Harga dan persediaan harus nonnegatif'
        }
        description={
          isEditMode
            ? 'Aturan rancangan: jika stok diubah, perubahan perlu dicatat sebagai adjustment pada INVENTORY_TRANSACTIONS. Belum ada perubahan yang disimpan.'
            : 'Gunakan harga unit decimal ≥ 0, serta stok dan ambang minimum berupa bilangan bulat ≥ 0. Foto dan deskripsi bersifat opsional.'
        }
      />

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-6">
          <ProductMainFormSection
            isEditMode={isEditMode}
            name={name}
            onNameChange={setName}
            category={category}
            onCategoryChange={setCategory}
            price={price}
            onPriceChange={setPrice}
            stock={stock}
            onStockChange={setStock}
            minStock={minStock}
            onMinStockChange={setMinStock}
            isActive={isActive}
            onActiveChange={setIsActive}
            description={description}
            onDescriptionChange={setDescription}
          />
        </div>

        <ProductSidebarSection
          isEditMode={isEditMode}
          uuid={uuid}
          createdAt={createdAt}
          updatedAt={updatedAt}
        />
      </form>

      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50">
          <Toast
            variant="success"
            title="Berhasil Disimpan"
            description={toastMsg}
            onClose={() => setToastMsg(null)}
          />
        </div>
      )}
    </div>
  );
}

function ProductFormContent() {
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');
  return <ProductFormInner key={editId ?? 'new'} editId={editId} />;
}

export default function ProductFormPage() {
  return (
    <Suspense fallback={<div className="text-white p-6">Memuat form produk...</div>}>
      <ProductFormContent />
    </Suspense>
  );
}
