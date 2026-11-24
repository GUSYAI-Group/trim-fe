'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Plus } from 'lucide-react';
import { Button, Alert, Toast, Modal } from '@/components/ui';
import { productService } from '@/services/endpoints/product';
import { TProduct } from '@/types';
import { ProductStatsSection } from './sections/ProductStatsSection';
import { ProductTableSection } from './sections/ProductTableSection';

export default function ProductsPage() {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua kategori');
  const [selectedStockStatus, setSelectedStockStatus] = useState('Semua status stok');
  const [selectedActiveStatus, setSelectedActiveStatus] = useState('Semua status aktif');
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [productDetail, setProductDetail] = useState<TProduct | null>(null);
  const [productToDelete, setProductToDelete] = useState<TProduct | null>(null);
  const [stockAdjustProduct, setStockAdjustProduct] = useState<TProduct | null>(null);
  const [adjustType, setAdjustType] = useState<'stock_in' | 'stock_out' | 'adjustment'>('stock_in');
  const [adjustQty, setAdjustQty] = useState<number>(1);
  const [adjustNotes, setAdjustNotes] = useState<string>('');
  const [isSubmittingAdjust, setIsSubmittingAdjust] = useState<boolean>(false);
  const [metaCounts, setMetaCounts] = useState<{
    totalCount: number;
    activeCount: number;
    amanCount: number;
    menipisCount: number;
    habisCount: number;
  } | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const res = await productService.getProducts({
        search: searchTerm,
        category: selectedCategory === 'Semua kategori' ? undefined : selectedCategory,
        stockStatus: selectedStockStatus === 'Semua status stok' ? undefined : selectedStockStatus,
        activeStatus:
          selectedActiveStatus === 'Semua status aktif'
            ? undefined
            : selectedActiveStatus === 'Aktif'
            ? 'aktif'
            : 'nonaktif',
      });
      setProducts(res.data);
      if (res.meta) {
        setMetaCounts({
          totalCount: Number((res.meta as any).totalCount ?? res.data.length),
          activeCount: Number((res.meta as any).activeCount ?? 0),
          amanCount: Number((res.meta as any).amanCount ?? 0),
          menipisCount: Number((res.meta as any).menipisCount ?? 0),
          habisCount: Number((res.meta as any).habisCount ?? 0),
        });
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Gagal memuat produk dari server');
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, selectedCategory, selectedStockStatus, selectedActiveStatus]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts();
    }, 250);

    return () => clearTimeout(timer);
  }, [fetchProducts]);

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    try {
      await productService.deleteProduct(productToDelete.id);
      setToastMsg(`Produk "${productToDelete.name}" berhasil dihapus.`);
      fetchProducts();
    } catch (err) {
      setToastMsg(err instanceof Error ? err.message : 'Gagal menghapus produk');
    } finally {
      setProductToDelete(null);
    }
  };

  const handleToggleActive = async (id: string) => {
    const target = products.find((p) => p.id === id);
    if (!target) return;
    const nextState = !target.isActive;

    try {
      await productService.toggleActive(id, nextState);
      setProducts((prev) =>
        prev.map((item) => (item.id === id ? { ...item, isActive: nextState } : item))
      );
      setToastMsg(`Produk "${target.name}" berhasil ${nextState ? 'diaktifkan' : 'dinonaktifkan'}.`);
    } catch (err) {
      setToastMsg(err instanceof Error ? err.message : 'Gagal memperbarui status produk');
    }
  };

  const handleAdjustStockSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stockAdjustProduct) return;
    setIsSubmittingAdjust(true);
    try {
      await productService.adjustStock(stockAdjustProduct.id, {
        type: adjustType,
        quantity: Number(adjustQty),
        notes: adjustNotes.trim() || undefined,
      });
      setToastMsg(`Stok produk "${stockAdjustProduct.name}" berhasil diperbarui.`);
      setStockAdjustProduct(null);
      setAdjustQty(1);
      setAdjustNotes('');
      await fetchProducts();
    } catch (err) {
      setToastMsg(err instanceof Error ? err.message : 'Gagal menyesuaikan stok produk');
    } finally {
      setIsSubmittingAdjust(false);
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('Semua kategori');
    setSelectedStockStatus('Semua status stok');
    setSelectedActiveStatus('Semua status aktif');
  };

  return (
    <div className="space-y-8 selection:bg-secondary selection:text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-extrabold text-text-main tracking-tight">
            Kelola Produk
          </h1>
          <p className="text-text-muted text-[14px] mt-1">
            Kelola katalog, harga satuan, dan pantau stok produk barbershop.
          </p>
        </div>

        <Button
          href="/products/form"
          variant="primary"
          size="md"
          icon={<Plus className="w-4 h-4" />}
          className="self-start sm:self-auto shrink-0"
        >
          Tambah produk
        </Button>
      </div>

      {errorMsg && (
        <Alert
          variant="error"
          title="Gagal mengambil data produk"
          description={errorMsg}
        />
      )}

      <ProductStatsSection products={products} metaCounts={metaCounts} />

      <div className={isLoading ? 'opacity-60 transition-opacity' : 'transition-opacity'}>
        <ProductTableSection
          products={products}
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
          onDetailRequest={setProductDetail}
          onAdjustStockRequest={setStockAdjustProduct}
          onDeleteRequest={setProductToDelete}
        />
      </div>

      {productDetail && (
        <Modal
          isOpen={true}
          onClose={() => setProductDetail(null)}
          title={`Detail Produk • ${productDetail.name}`}
          description="Informasi stok, harga jual, ambang peringatan, dan status katalog produk."
        >
          <div className="space-y-4 py-1">
            <div className="grid grid-cols-2 gap-4 text-sm bg-surface p-4 rounded-xl border border-border">
              <div>
                <p className="text-text-muted text-xs">Nama Produk</p>
                <p className="font-semibold text-text-main mt-0.5">{productDetail.name}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">SKU / Kode Unik</p>
                <p className="font-semibold font-mono text-secondary mt-0.5">{productDetail.uuid || productDetail.id}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Kategori</p>
                <p className="font-semibold text-text-main mt-0.5">{productDetail.category}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Harga Jual</p>
                <p className="font-semibold text-success font-mono mt-0.5">{productDetail.priceFormatted}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Jumlah Stok Fisik</p>
                <p className="font-semibold font-mono text-text-main mt-0.5">{productDetail.stock} unit</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Ambang Batas Minimum</p>
                <p className="font-semibold font-mono text-text-main mt-0.5">{productDetail.minStock} unit</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Status Stok</p>
                <p className="font-semibold text-text-main mt-0.5">{productDetail.stockStatus}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Status Katalog</p>
                <p className="font-semibold text-text-main mt-0.5">
                  {productDetail.isActive ? 'Aktif Dijual' : 'Nonaktif'}
                </p>
              </div>
              <div className="col-span-2">
                <p className="text-text-muted text-xs">Deskripsi</p>
                <p className="text-text-main mt-0.5 text-xs leading-relaxed">{productDetail.description}</p>
              </div>
            </div>

            <div className="flex justify-between items-center gap-3 pt-2">
              <Button
                variant="danger"
                onClick={() => {
                  setProductToDelete(productDetail);
                  setProductDetail(null);
                }}
              >
                Hapus Produk
              </Button>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setStockAdjustProduct(productDetail);
                    setProductDetail(null);
                  }}
                >
                  Sesuaikan Stok
                </Button>
                <Button href={`/products/form?id=${productDetail.id}`} variant="primary">
                  Edit Produk
                </Button>
                <Button variant="outline" onClick={() => setProductDetail(null)}>
                  Tutup
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal Sesuaikan Stok / Restock */}
      {stockAdjustProduct && (
        <Modal
          isOpen={true}
          onClose={() => setStockAdjustProduct(null)}
          title={`Sesuaikan Stok • ${stockAdjustProduct.name}`}
          description={`Stok saat ini: ${stockAdjustProduct.stock} unit (Min: ${stockAdjustProduct.minStock}). Catat mutasi stok ke database.`}
        >
          <form onSubmit={handleAdjustStockSubmit} className="space-y-4 py-2">
            <div>
              <label className="block text-xs font-medium text-text-muted mb-1.5">
                Jenis Mutasi Stok
              </label>
              <select
                value={adjustType}
                onChange={(e) => setAdjustType(e.target.value as any)}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-text-main focus:outline-none focus:border-secondary transition-colors"
              >
                <option value="stock_in">Barang Masuk (Restock / Pembelian Baru)</option>
                <option value="stock_out">Barang Keluar (Rusak / Tester / Kadaluarsa)</option>
                <option value="adjustment">Koreksi Stok Opname (Set Stok Fisik Baru)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-text-muted mb-1.5">
                {adjustType === 'adjustment' ? 'Jumlah Stok Fisik Riil Sekarang' : 'Jumlah Unit'}
              </label>
              <input
                type="number"
                min={adjustType === 'adjustment' ? '0' : '1'}
                value={adjustQty}
                onChange={(e) => setAdjustQty(Number(e.target.value))}
                required
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-text-main focus:outline-none focus:border-secondary transition-colors font-mono"
              />
              <p className="text-[11px] text-text-muted mt-1">
                {adjustType === 'stock_in' && `Stok akan bertambah menjadi ${stockAdjustProduct.stock + (Number(adjustQty) || 0)} unit.`}
                {adjustType === 'stock_out' && `Stok akan berkurang menjadi ${Math.max(0, stockAdjustProduct.stock - (Number(adjustQty) || 0))} unit.`}
                {adjustType === 'adjustment' && `Stok akan langsung di-set ke ${Number(adjustQty) || 0} unit.`}
              </p>
            </div>

            <div>
              <label className="block text-xs font-medium text-text-muted mb-1.5">
                Catatan Mutasi
              </label>
              <input
                type="text"
                placeholder="Contoh: Pembelian dari supplier PT Pomade Barbershop"
                value={adjustNotes}
                onChange={(e) => setAdjustNotes(e.target.value)}
                className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-text-main focus:outline-none focus:border-secondary transition-colors"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-border">
              <Button
                type="button"
                variant="outline"
                disabled={isSubmittingAdjust}
                onClick={() => setStockAdjustProduct(null)}
              >
                Batal
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmittingAdjust}
              >
                {isSubmittingAdjust ? 'Menyimpan...' : 'Simpan Mutasi Stok'}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Modal Hapus Produk */}
      {productToDelete && (
        <Modal
          isOpen={true}
          onClose={() => setProductToDelete(null)}
          variant="destructive"
          title="Konfirmasi Hapus Produk"
          description={`Apakah Anda yakin ingin menghapus produk "${productToDelete.name}"? Jika produk memiliki riwayat transaksi/stok, produk akan dinonaktifkan secara aman.`}
          confirmText="Hapus Produk"
          cancelText="Batal"
          onConfirm={handleConfirmDelete}
        />
      )}

      <Alert
        variant="accent"
        title="Pencatatan mutasi stok wajib di INVENTORY_TRANSACTIONS"
        description="Setiap penyesuaian stok atau produk terjual tercatat di tabel INVENTORY_TRANSACTIONS. Terkoneksi ke database MySQL."
      />

      {toastMsg && (
        <Toast
          isOpen={true}
          title="Manajemen Produk"
          description={toastMsg}
          onClose={() => setToastMsg(null)}
        />
      )}
    </div>
  );
}
