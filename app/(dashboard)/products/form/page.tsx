'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button, Alert, Toast, Spinner, Modal } from '@/components/ui';
import { productService } from '@/services/endpoints/product';
import { ProductMainFormSection } from './sections/ProductMainFormSection';
import { ProductSidebarSection } from './sections/ProductSidebarSection';

function ProductFormInner({ editId }: { editId: string | null }) {
  const router = useRouter();
  const isEditMode = Boolean(editId);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [minStock, setMinStock] = useState('5');
  const [isActive, setIsActive] = useState(true);
  const [description, setDescription] = useState('');

  const [uuid, setUuid] = useState('Belum dibuat');
  const [createdAt, setCreatedAt] = useState('Belum dibuat');
  const [updatedAt, setUpdatedAt] = useState('Belum dibuat');
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(editId));
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!editId) return;
    setIsDeleting(true);
    try {
      await productService.deleteProduct(editId);
      setToastMsg(`Produk "${name}" berhasil dihapus.`);
      setTimeout(() => {
        router.push('/products');
      }, 800);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Gagal menghapus produk');
      setShowDeleteModal(false);
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    if (!editId) return;

    async function loadProduct(id: string) {
      try {
        setIsLoading(true);
        const res = await productService.getProductDetail(id);
        const found = res.data;
        if (found) {
          setName(found.name);
          setCategory(found.category);
          setPrice(String(found.price));
          setStock(String(found.stock));
          setMinStock(String(found.minStock));
          setIsActive(found.isActive);
          setDescription(found.description);
          setUuid(found.uuid || found.id);
          setCreatedAt(found.createdAt);
          setUpdatedAt(found.updatedAt);
        }
      } catch (_err) {
        setErrorMsg('Data produk tidak ditemukan atau gagal dimuat dari server.');
      } finally {
        setIsLoading(false);
      }
    }

    loadProduct(editId);
  }, [editId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    try {
      const payload = {
        name,
        category: category || 'Styling',
        price: Number(price) || 0,
        stock: Number(stock) || 0,
        minStock: Number(minStock) || 5,
        isActive,
      };

      if (isEditMode && editId) {
        await productService.updateProduct(editId, payload);
        setToastMsg(`Perubahan produk "${name}" berhasil disimpan!`);
      } else {
        await productService.createProduct(payload);
        setToastMsg(`Produk "${name}" berhasil ditambahkan!`);
      }

      setTimeout(() => {
        router.push('/products');
      }, 1000);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Gagal menyimpan produk');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-24">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8 selection:bg-secondary selection:text-white">
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-[12px] text-text-muted">
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
            <h1 className="text-[28px] font-extrabold text-text-main tracking-tight">
              {isEditMode ? 'Edit Produk' : 'Tambah Produk'}
            </h1>
            <p className="text-text-muted text-[14px] mt-0.5">
              {isEditMode
                ? `Perbarui informasi, harga, dan persediaan ${name || 'produk'}.`
                : 'Tambahkan produk ke katalog toko. Tanda * wajib diisi.'}
            </p>
          </div>

          <Button
            href="/products"
            variant="outline"
            size="md"
            icon={<ArrowLeft className="w-4 h-4" />}
          >
            Kembali ke daftar
          </Button>
        </div>
      </div>

      {errorMsg && (
        <Alert
          variant="error"
          title="Gagal menyimpan produk"
          description={errorMsg}
        />
      )}

      <Alert
        variant="accent"
        title={
          isEditMode
            ? 'Perubahan stok dicatat sebagai penyesuaian persediaan'
            : 'Harga dan persediaan harus nonnegatif'
        }
        description={
          isEditMode
            ? 'Perubahan stok dan harga akan disinkronkan langsung ke basis data toko TRIM.'
            : 'Gunakan harga unit decimal ≥ 0, serta stok dan ambang minimum berupa bilangan bulat ≥ 0.'
        }
      />

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
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
        </div>

        <div className="p-5 rounded-2xl bg-surface border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-[12px] text-text-muted">
            {isEditMode
              ? 'Pastikan harga dan stok sudah sesuai sebelum menyimpan perubahan.'
              : 'Pastikan nama, kategori, harga, dan stok awal sudah diisi dengan benar.'}
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {isEditMode && (
              <Button
                type="button"
                variant="danger"
                size="md"
                onClick={() => setShowDeleteModal(true)}
              >
                Hapus Produk
              </Button>
            )}
            <Button href="/products" variant="outline" size="md">
              Batal
            </Button>
            <Button type="submit" variant="primary" size="md">
              {isEditMode ? 'Simpan perubahan' : 'Tambah produk'}
            </Button>
          </div>
        </div>
      </form>

      {showDeleteModal && (
        <Modal
          isOpen={true}
          onClose={() => setShowDeleteModal(false)}
          title="Konfirmasi Hapus Produk"
          description={`Apakah Anda yakin ingin menghapus produk "${name}"? Jika produk memiliki riwayat transaksi/stok, produk akan dinonaktifkan.`}
        >
          <div className="flex justify-end gap-3 pt-3">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)} disabled={isDeleting}>
              Batal
            </Button>
            <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? 'Menghapus...' : 'Ya, Hapus Produk'}
            </Button>
          </div>
        </Modal>
      )}

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
