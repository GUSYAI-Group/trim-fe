'use client';

import React, { useState } from 'react';
import {
  Button,
  TextField,
  SearchBar,
  Badge,
  Avatar,
  Modal,
  Toast,
  Alert,
  Tooltip,
  EmptyState,
  SkeletonCard,
  SkeletonTable,
  Card,
  Checkbox,
  Spinner,
  IconButton,
} from '@/components/ui';
import { Heart, Plus, PackageX, Search as SearchIcon } from 'lucide-react';

export default function DesignSystemPage() {
  const [modalInfo, setModalInfo] = useState(false);
  const [modalConfirm, setModalConfirm] = useState(false);
  const [modalDestruct, setModalDestruct] = useState(false);

  const [toastSuccess, setToastSuccess] = useState(false);
  const [toastError, setToastError] = useState(false);
  const [toastWarning, setToastWarning] = useState(false);
  const [toastInfo, setToastInfo] = useState(false);

  const [searchValue, setSearchValue] = useState('');
  const [checkA, setCheckA] = useState(false);
  const [checkB, setCheckB] = useState(true);

  return (
    <div className="min-h-screen bg-primary text-text-main p-8 md:p-12 space-y-16 max-w-300 mx-auto">
      {/* ==================== HEADER ==================== */}
      <header className="space-y-2">
        <p className="text-secondary font-bold text-[14px] tracking-widest uppercase">
          TRIM — Sistem Desain / 2026
        </p>
        <h1 className="text-[36px] font-extrabold">Design System</h1>
        <p className="text-text-muted text-[16px]">
          Seluruh komponen UI yang digunakan pada TRIM Dashboard & App.
        </p>
      </header>

      {/* ==================== 01. FONDASI VISUAL ==================== */}
      <section className="space-y-16">
        <SectionTitle number="01" title="Fondasi visual" />

        {/* F.02 Warna Semantik */}
        <SubSection code="F.02" title="Warna semantik" />
        <p className="text-text-muted text-[14px]">
          Electric Orange adalah aksen utama. Cyber Yellow mendukung sorotan sekunder.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <ColorSwatch color="#121212" name="Street Black" hex="#121212" desc="Latar utama" />
          <ColorSwatch color="#FF4500" name="Electric Orange" hex="#FF4500" desc="CTA utama · ikon · aksen" />
          <ColorSwatch color="#EAB308" name="Cyber Yellow" hex="#EAB308" desc="Aksen pendukung terbatas" />
          <ColorSwatch color="#FFFFFF" name="Pure White" hex="#FFFFFF" desc="Teks utama" textDark />
          <ColorSwatch color="#A1A1AA" name="Zinc 400" hex="#A1A1AA" desc="Helper · placeholder · hint" />
          <ColorSwatch color="#10B981" name="Neon Green" hex="#10B981" desc="Lunas / Selesai" />
          <ColorSwatch color="#F43F5E" name="Rose Red" hex="#F43F5E" desc="Batal / Error" />
          <ColorSwatch color="#FBBF24" name="Amber" hex="#FBBF24" desc="Pending / Ngangtre" />
        </div>

        {/* Surface Tokens */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="border border-border rounded-lg p-4 text-[14px] text-text-muted">
            Surface / <span className="text-text-main">#1C1C1F</span> · token pendukung
          </div>
          <div className="border border-border rounded-lg p-4 text-[14px] text-text-muted bg-raised">
            Raised / <span className="text-text-main">#252528</span> · token pendukung
          </div>
          <div className="border border-border rounded-lg p-4 text-[14px] text-text-muted">
            Border / <span className="text-text-main">#383B3D</span> · token pendukung
          </div>
        </div>

        {/* F.03 Tipografi */}
        <SubSection code="F.03" title="Tipografi / Typefaces & Weights" />
        <p className="text-text-muted text-[14px] mb-6">
          Sistem ini menggunakan Outfit sebagai font utama (sans-serif), dan Space Grotesk sebagai aksen angka atau kode (monospace).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Outfit Showcase */}
          <div className="bg-surface border border-border rounded-2xl p-8 space-y-6">
            <div>
              <p className="text-secondary text-[12px] font-bold tracking-widest uppercase mb-1">Primary Font</p>
              <p className="text-[28px] font-bold">Outfit</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-[12px] text-text-muted mb-1">Regular (400)</p>
                <p className="text-[16px] font-normal">Membuat gaya hidup lebih baik.</p>
              </div>
              <div>
                <p className="text-[12px] text-text-muted mb-1">Medium (500)</p>
                <p className="text-[16px] font-medium">Membuat gaya hidup lebih baik.</p>
              </div>
              <div>
                <p className="text-[12px] text-text-muted mb-1">Bold (700)</p>
                <p className="text-[16px] font-bold">Membuat gaya hidup lebih baik.</p>
              </div>
              <div>
                <p className="text-[12px] text-text-muted mb-1">Extra Bold (800)</p>
                <p className="text-[16px] font-extrabold">Membuat gaya hidup lebih baik.</p>
              </div>
            </div>
          </div>

          {/* Space Grotesk Showcase */}
          <div className="bg-surface border border-border rounded-2xl p-8 space-y-6">
            <div>
              <p className="text-secondary text-[12px] font-bold tracking-widest uppercase mb-1 font-sans">Accent / Mono Font</p>
              <p className="text-[28px] font-bold font-mono">Space Grotesk</p>
            </div>
            
            <div className="space-y-4 font-mono">
              <div>
                <p className="text-[12px] text-text-muted mb-1 font-sans">Regular (400)</p>
                <p className="text-[16px] font-normal">Rp 189.000,00</p>
              </div>
              <div>
                <p className="text-[12px] text-text-muted mb-1 font-sans">Bold (700)</p>
                <p className="text-[16px] font-bold">TRM-2049-XYZ</p>
              </div>
            </div>
          </div>
        </div>

        <SubSection code="F.03.1" title="Tipografi / Hierarki" />
        <div className="space-y-8 bg-surface border border-border rounded-2xl p-8 mt-6">
          <div>
            <span className="text-secondary text-[12px] font-bold">H1</span>
            <span className="text-text-muted text-[12px] ml-2">28px / Extra Bold 800 / 36px</span>
            <h1 className="mt-1">Gaya lo, aturan lo.</h1>
            <small>Judul halaman & judul utama</small>
          </div>
          <div>
            <span className="text-secondary text-[12px] font-bold">H2</span>
            <span className="text-text-muted text-[12px] ml-2">20px / Bold 700 / 28px</span>
            <h2 className="mt-1">Pilihan minggu ini</h2>
            <small>Judul bagian & modal</small>
          </div>
          <div>
            <span className="text-secondary text-[12px] font-bold">Body</span>
            <span className="text-text-muted text-[12px] ml-2">14px / Medium 500 / 20px</span>
            <p className="mt-1">Temukan potongan yang pas untuk setiap hari.</p>
            <small>Konten, label kontrol & isi label</small>
          </div>
          <div>
            <span className="text-secondary text-[12px] font-bold">Caption</span>
            <span className="text-text-muted text-[12px] ml-2">12px / Regular 400 / 16px</span>
            <p className="mt-1 text-[12px] text-text-muted">Stok diperbarui 5 menit lalu.</p>
            <small>Metadata, helper & hint</small>
          </div>
        </div>

        {/* F.04 Grid, ruang & bentuk */}
        <SubSection code="F.04" title="Grid, ruang & bentuk" />
        <p className="text-text-muted text-[14px] mb-4">
          Basis 8pt. Margin dan padding memakai kelipatan 8px untuk ritme yang konsisten.
        </p>
        <div className="bg-surface border border-border rounded-2xl p-8 space-y-6">
          <SpacingRow size={8} label="Ikon + label" />
          <SpacingRow size={16} label="Antarkontrol" />
          <SpacingRow size={24} label="Padding kartu" />
          <SpacingRow size={32} label="Antarkelompok" />
          <SpacingRow size={40} label="Area luas" />
          <SpacingRow size={48} label="Margin board" />

          <div className="flex gap-4 mt-6">
            <div className="flex-1 h-16 bg-danger/20 border-2 border-danger rounded-lg flex items-center justify-center text-[14px]">
              8px
              <small className="ml-2 text-text-muted">Radius tombol</small>
            </div>
            <div className="flex-1 h-16 bg-surface border-2 border-border rounded-2xl flex items-center justify-center text-[14px]">
              16px
              <small className="ml-2 text-text-muted">Radius kartu / container</small>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 02. AKSI & FORMULIR ==================== */}
      <section className="space-y-16">
        <SectionTitle number="02" title="Aksi & formulir" />

        {/* A.01 Button Matrix */}
        <SubSection code="A.01" title="Button / matriks varian & state" />
        <p className="text-text-muted text-[14px] mb-4">
          Anatomi: container + ikon opsional + label. Tinggi 48px, padding 24px, gap 8px, radius 8px.
        </p>
        <div className="bg-surface border border-border rounded-2xl p-8 overflow-x-auto">
          <table className="w-full text-[14px]">
            <thead>
              <tr className="text-text-muted text-left">
                <th className="py-2 pr-4 font-medium w-32">VARIAN / STATE</th>
                <th className="py-2 px-4 font-medium">Default / normal</th>
                <th className="py-2 px-4 font-medium">Disabled / nonaktif</th>
                <th className="py-2 px-4 font-medium">Loading / proses</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3 pr-4 font-bold">Primary<br /><small>Aksi utama</small></td>
                <td className="py-3 px-4"><Button variant="primary">Simpan</Button></td>
                <td className="py-3 px-4"><Button variant="primary" disabled>Simpan</Button></td>
                <td className="py-3 px-4"><Button variant="primary" isLoading>Memproses</Button></td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-bold">Secondary<br /><small>Sorotan sekunder</small></td>
                <td className="py-3 px-4"><Button variant="secondary">Simpan</Button></td>
                <td className="py-3 px-4"><Button variant="secondary" disabled>Simpan</Button></td>
                <td className="py-3 px-4"><Button variant="secondary" isLoading>Memproses</Button></td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-bold">Outline<br /><small>Aksi alternatif</small></td>
                <td className="py-3 px-4"><Button variant="outline">Simpan</Button></td>
                <td className="py-3 px-4"><Button variant="outline" disabled>Simpan</Button></td>
                <td className="py-3 px-4"><Button variant="outline" isLoading>Memproses</Button></td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-bold">Ghost<br /><small>Prioritas rendah</small></td>
                <td className="py-3 px-4"><Button variant="ghost">Simpan</Button></td>
                <td className="py-3 px-4"><Button variant="ghost" disabled>Simpan</Button></td>
                <td className="py-3 px-4"><Button variant="ghost" isLoading>Memproses</Button></td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-bold">Danger<br /><small>Aksi destruktif</small></td>
                <td className="py-3 px-4"><Button variant="danger">Hapus</Button></td>
                <td className="py-3 px-4"><Button variant="danger" disabled>Hapus</Button></td>
                <td className="py-3 px-4"><Button variant="danger" isLoading>Memproses</Button></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* A.02 Icon Button */}
        <SubSection code="A.02" title="Icon button" />
        <div className="flex gap-4 items-end">
          <div className="text-center">
            <IconButton icon={<Heart className="w-5 h-5" />} />
            <small className="block mt-1">Default</small>
          </div>
          <div className="text-center">
            <IconButton icon={<Heart className="w-5 h-5" />} variant="active" />
            <small className="block mt-1">Active</small>
          </div>
          <div className="text-center">
            <IconButton icon={<Heart className="w-5 h-5" />} variant="disabled" />
            <small className="block mt-1">Disabled</small>
          </div>
        </div>

        {/* A.03 Search */}
        <SubSection code="A.03" title="Search" />
        <div className="max-w-md space-y-3">
          <SearchBar value={searchValue} onChange={setSearchValue} />
        </div>

        {/* A.04 Text Field */}
        <SubSection code="A.04" title="Text field" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TextField label="Nama lengkap" placeholder="Masukkan nama lengkap" helperText="Sesuai nama pada pesanan." />
          <TextField label="Email" placeholder="raka@gmail.com" isError errorText="Format email belum lengkap. Contoh: raka@gmail.com" />
          <TextField label="Nama lengkap" value="Raka Pratama" disabled helperText="Tidak dapat diubah setelah pesanan dibayar." />
        </div>

        {/* A.07 Checkbox */}
        <SubSection code="A.07" title="Checkbox" />
        <div className="space-y-6">
          <Checkbox checked={checkA} onChange={setCheckA} label="Unselected" />
          <Checkbox checked={checkB} onChange={setCheckB} label="Selected" />
          <Checkbox checked={false} onChange={() => {}} disabled label="Disabled / kosong" />
          <Checkbox checked={true} onChange={() => {}} disabled label="Disabled / dipilih" />
        </div>

        {/* A.08 Form Simulation */}
        <SubSection code="A.08" title="Kombinasi / Pengaturan Profil" />
        <p className="text-text-muted text-[14px] mb-6">
          Simulasi penggunaan TextField, Button, dan Avatar pada halaman form atau pengaturan.
        </p>
        <div className="max-w-3xl bg-surface border border-border rounded-2xl p-8 space-y-8">
          <div>
            <h3 className="text-[18px] font-bold text-text-main">Profil Pengguna</h3>
            <p className="text-[14px] text-text-muted mt-1">Perbarui foto dan detail personal Anda di sini.</p>
          </div>
          
          <div className="flex items-center gap-6 pb-8 border-b border-border">
            <Avatar name="Alex Turner" size={72} />
            <div className="flex gap-3">
              <Button variant="outline">Ubah Foto</Button>
              <Button variant="ghost" className="text-danger hover:bg-danger/10">Hapus</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TextField label="Nama depan" placeholder="Cth. Alex" defaultValue="Alex" />
            <TextField label="Nama belakang" placeholder="Cth. Turner" defaultValue="Turner" />
            <div className="md:col-span-2">
              <TextField label="Email" placeholder="alex@domain.com" defaultValue="alex@arcticmonkeys.com" helperText="Email ini digunakan untuk login dan menerima notifikasi." />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="ghost">Batal</Button>
            <Button variant="primary">Simpan Perubahan</Button>
          </div>
        </div>
      </section>

      {/* ==================== 03. DATA & NAVIGASI ==================== */}
      <section className="space-y-16">
        <SectionTitle number="03" title="Data & navigasi" />

        {/* D.02 Cards */}
        <SubSection code="D.02" title="Cards & containers" />
        <p className="text-text-muted text-[14px] mb-4">
          Radius 16px, padding 24px. Kartu default untuk konten; interactive memakai fokus 2px; highlighted untuk rekomendasi penting.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="default">
            <div className="h-40 bg-raised rounded-lg mb-4" />
            <h2 className="font-bold">Oversized Tee</h2>
            <small>Cotton heavyweight · 4 ukuran</small>
            <p className="text-[18px] font-bold mt-2">Rp189.000</p>
          </Card>
          <Card variant="interactive">
            <div className="h-40 bg-raised rounded-lg mb-4" />
            <h2 className="font-bold">Oversized Tee</h2>
            <small>Cotton heavyweight · 4 ukuran</small>
            <p className="text-[18px] font-bold mt-2">Rp189.000</p>
          </Card>
          <Card variant="highlighted">
            <div className="relative h-40 bg-raised rounded-lg mb-4">
              <span className="absolute top-2 right-2 bg-secondary text-text-main text-[10px] font-bold px-2 py-0.5 rounded">BEST SELLER</span>
            </div>
            <h2 className="font-bold">Oversized Tee</h2>
            <small>Cotton heavyweight · 4 ukuran</small>
            <p className="text-[18px] font-bold mt-2">Rp189.000</p>
          </Card>
        </div>

        {/* D.03 Badge Status */}
        <SubSection code="D.03" title="Badge status" />
        <p className="text-text-muted text-[14px] mb-4">
          Warna semantik + ikon + teks. Gunakan label singkat; jangan memakai badge sebagai tombol.
        </p>
        <div className="flex flex-wrap gap-4">
          <Badge variant="draft" label="Draft" />
          <Badge variant="lunas" />
          <Badge variant="selesai" />
          <Badge variant="batal" />
          <Badge variant="error" />
          <Badge variant="pending" />
          <Badge variant="ngangtre" />
        </div>

        {/* D.04 Avatar */}
        <SubSection code="D.04" title="Avatar" />
        <p className="text-text-muted text-[14px] mb-4">
          Ukuran contoh 48px. Urutan fallback: foto → inisial → ikon pengguna.
        </p>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <Avatar name="Nadia Putri" />
            <small className="block mt-2">Initials / NP</small>
          </div>
          <div className="text-center">
            <Avatar name="" />
            <small className="block mt-2">Fallback</small>
          </div>
        </div>

        {/* D.05 Data Table Simulation */}
        <SubSection code="D.05" title="Kombinasi / Data Table" />
        <p className="text-text-muted text-[14px] mb-6">
          Simulasi penggunaan komponen Avatar, Badge, Checkbox, Icon Button, dan Tooltip dalam satu baris tabel.
        </p>
        <div className="bg-surface border border-border rounded-2xl overflow-hidden">
          <table className="w-full text-left text-[14px]">
            <thead className="bg-raised border-b border-border">
              <tr>
                <th className="py-4 pl-6 pr-4 font-bold text-text-muted w-12"><Checkbox checked={false} onChange={() => {}} /></th>
                <th className="py-4 px-4 font-bold text-text-muted">Pelanggan</th>
                <th className="py-4 px-4 font-bold text-text-muted">Status</th>
                <th className="py-4 px-4 font-bold text-text-muted">Total</th>
                <th className="py-4 pr-6 pl-4 font-bold text-text-muted text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="hover:bg-surface-hover transition-colors">
                <td className="py-4 pl-6 pr-4"><Checkbox checked={true} onChange={() => {}} /></td>
                <td className="py-4 px-4 flex items-center gap-4">
                  <Avatar name="Budi Santoso" size={40} />
                  <div>
                    <p className="font-bold text-text-main">Budi Santoso</p>
                    <p className="text-[12px] text-text-muted">budi.s@gmail.com</p>
                  </div>
                </td>
                <td className="py-4 px-4"><Badge variant="lunas" /></td>
                <td className="py-4 px-4 font-bold">Rp240.000</td>
                <td className="py-4 pr-6 pl-4 text-right flex justify-end gap-2">
                  <Tooltip content="Lihat Detail"><IconButton variant="default" icon={<SearchIcon className="w-4 h-4" />} className="w-10 h-10" /></Tooltip>
                  <Tooltip content="Hapus" position="left"><IconButton variant="default" className="w-10 h-10 text-danger hover:text-danger hover:bg-danger/10" icon={<PackageX className="w-4 h-4" />} /></Tooltip>
                </td>
              </tr>
              <tr className="hover:bg-surface-hover transition-colors">
                <td className="py-4 pl-6 pr-4"><Checkbox checked={false} onChange={() => {}} /></td>
                <td className="py-4 px-4 flex items-center gap-4">
                  <Avatar name="Anita Rahayu" size={40} />
                  <div>
                    <p className="font-bold text-text-main">Anita Rahayu</p>
                    <p className="text-[12px] text-text-muted">anita.r@gmail.com</p>
                  </div>
                </td>
                <td className="py-4 px-4"><Badge variant="pending" /></td>
                <td className="py-4 px-4 font-bold">Rp189.000</td>
                <td className="py-4 pr-6 pl-4 text-right flex justify-end gap-2">
                  <Tooltip content="Lihat Detail"><IconButton variant="default" icon={<SearchIcon className="w-4 h-4" />} className="w-10 h-10" /></Tooltip>
                  <Tooltip content="Hapus" position="left"><IconButton variant="default" className="w-10 h-10 text-danger hover:text-danger hover:bg-danger/10" icon={<PackageX className="w-4 h-4" />} /></Tooltip>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ==================== 04. FEEDBACK & OVERLAY ==================== */}
      <section className="space-y-16">
        <SectionTitle number="04" title="Feedback & overlay" />

        {/* O.01 Modal */}
        <SubSection code="O.01" title="Modal / info, confirmation & destructive" />
        <div className="flex flex-wrap gap-4">
          <Button variant="outline" onClick={() => setModalInfo(true)}>Info Modal</Button>
          <Button variant="outline" onClick={() => setModalConfirm(true)}>Confirmation Modal</Button>
          <Button variant="outline" onClick={() => setModalDestruct(true)}>Destructive Modal</Button>
        </div>

        <Modal
          isOpen={modalInfo}
          onClose={() => setModalInfo(false)}
          variant="info"
          title="Koleksi baru sudah hadir"
          description="Kenali 12 pilihan terbaru di koleksi Street Essentials. Temukan ukuran dan gaya yang paling pas."
          primaryLabel="Mengerti"
        />
        <Modal
          isOpen={modalConfirm}
          onClose={() => setModalConfirm(false)}
          variant="confirmation"
          title="Konfirmasi pesanan?"
          description="Pesanan #TRM-2049 senilai Rp189.000 akan diteruskan ke tim pengemasan. Pastikan data sudah benar."
          primaryLabel="Konfirmasi"
          secondaryLabel="Batal"
        />
        <Modal
          isOpen={modalDestruct}
          onClose={() => setModalDestruct(false)}
          variant="destructive"
          title="Hapus produk ini?"
          description="Oversized Tee akan dihapus dari katalog. Tindakan ini tidak dapat dibatalkan."
          primaryLabel="Hapus"
          secondaryLabel="Batal"
        />

        {/* O.02 Toast & Alert */}
        <SubSection code="O.02" title="Toast & alert / 4 nada semantik" />
        <div className="flex flex-wrap gap-4 mb-6">
          <Button variant="outline" onClick={() => setToastSuccess(true)}>Success Toast</Button>
          <Button variant="outline" onClick={() => setToastError(true)}>Error Toast</Button>
          <Button variant="outline" onClick={() => setToastWarning(true)}>Warning Toast</Button>
          <Button variant="outline" onClick={() => setToastInfo(true)}>Info Toast</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Toast Column */}
          <div className="space-y-6">
            <h3 className="text-[14px] text-text-muted mb-4 font-bold tracking-widest uppercase">Toast / statis untuk preview</h3>
            <Toast isOpen={true} onClose={() => {}} variant="success" title="Pesanan berhasil disimpan" description="Pesanan #TRM-2049 siap diproses." />
            <Toast isOpen={true} onClose={() => {}} variant="error" title="Pembayaran gagal" description="Saldo tidak cukup. Gunakan metode lain." />
            <Toast isOpen={true} onClose={() => {}} variant="warning" title="Stok hampir habis" description="Oversized Tee ukuran M tersisa 2." />
            <Toast isOpen={true} onClose={() => {}} variant="info" title="Katalog diperbarui" description="12 produk baru tersedia di koleksi terbaru." />
          </div>

          {/* Alert Column */}
          <div className="space-y-6">
            <h3 className="text-[14px] text-text-muted mb-4 font-bold tracking-widest uppercase">Alert / inline menetap</h3>
            <Alert variant="success" title="Pembayaran Lunas" description="Pembayaran diterima. Status pesanan kini Lunas." />
            <Alert 
              variant="error" 
              title="Gagal menyimpan" 
              description="Data belum tersimpan. Periksa koneksi lalu coba lagi." 
              action={<button className="text-[12px] font-bold text-text-main flex items-center gap-1 hover:underline">Coba lagi &rarr;</button>}
            />
            <Alert variant="warning" title="Menunggu pembayaran" description="Pesanan Pending. Selesaikan pembayaran dalam 15 menit." />
            <Alert variant="info" title="Informasi pengiriman" description="Pengiriman reguler membutuhkan 2–4 hari kerja." />
          </div>
        </div>

        {/* O.03 Spinner */}
        <SubSection code="O.03" title="Loading / spinner" />
        <div className="flex items-end gap-10">
          <div className="text-center">
            <Spinner size="sm" />
            <small className="block mt-2">16px / dalam tombol</small>
          </div>
          <div className="text-center">
            <Spinner size="md" />
            <small className="block mt-2">24px / inline</small>
          </div>
          <div className="text-center">
            <Spinner size="lg" />
            <small className="block mt-2">40px / area konten</small>
          </div>
        </div>
        <div className="mt-6">
          <Spinner size="md" label="Memuat koleksi... Tunggu sebentar. Kami menyiapkan produk terbaru." />
        </div>

        {/* O.04 Tooltip */}
        <SubSection code="O.04" title="Tooltip / hover state" />
        <p className="text-text-muted text-[14px] mb-6">
          Membantu memberi konteks untuk ikon tanpa label teks.
        </p>
        <div className="flex gap-8 items-center h-20 pl-8">
          <Tooltip content="Edit produk" position="top">
            <IconButton icon={<Heart className="w-5 h-5" />} />
          </Tooltip>

          <Tooltip content="Hapus item" position="bottom">
            <IconButton icon={<PackageX className="w-5 h-5" />} />
          </Tooltip>

          <Tooltip content="Cari pesanan" position="right">
            <IconButton icon={<SearchIcon className="w-5 h-5" />} />
          </Tooltip>
        </div>

        {/* O.05 Empty State */}
        <SubSection code="O.05" title="Empty state / tidak ada data & hasil pencarian" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <EmptyState
              icon={<PackageX className="w-8 h-8" />}
              title="Belum ada produk"
              description="Mulai bangun katalog TRIM dengan menambahkan produk pertama."
              action={<Button variant="primary" icon={<Plus className="w-4 h-4" />}>Tambah produk</Button>}
            />
          </Card>
          <Card>
            <EmptyState
              icon={<SearchIcon className="w-8 h-8" />}
              title="Produk tidak ditemukan"
              description='Tidak ada hasil untuk "Neon Jacket". Coba kata kunci lain atau hapus filter.'
              action={<Button variant="outline">Hapus filter</Button>}
            />
          </Card>
        </div>

        {/* O.06 Skeleton */}
        <SubSection code="O.06" title="Loading / skeleton" />
        <p className="text-text-muted text-[14px] mb-4">
          Pertahankan bentuk media dan teks yang akan dimuat. Warna Raised / Border, radius 8px.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
        <div className="mt-6 bg-surface border border-border rounded-2xl p-6">
          <SkeletonTable rows={4} />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border pt-8 flex justify-between text-[12px] text-text-muted pb-24">
        <span>TRIM / Fun, Street & Youthful</span>
        <span>Contoh visual editable · Komponen aktif</span>
      </footer>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
        <div className="pointer-events-auto"><Toast isOpen={toastSuccess} onClose={() => setToastSuccess(false)} variant="success" title="Pesanan berhasil disimpan" description="Pesanan #TRM-2049 siap diproses." /></div>
        <div className="pointer-events-auto"><Toast isOpen={toastError} onClose={() => setToastError(false)} variant="error" title="Pembayaran gagal" description="Saldo tidak cukup. Gunakan metode lain." /></div>
        <div className="pointer-events-auto"><Toast isOpen={toastWarning} onClose={() => setToastWarning(false)} variant="warning" title="Stok hampir habis" description="Oversized Tee ukuran M tersisa 2." /></div>
        <div className="pointer-events-auto"><Toast isOpen={toastInfo} onClose={() => setToastInfo(false)} variant="info" title="Katalog diperbarui" description="12 produk baru tersedia di koleksi terbaru." /></div>
      </div>
    </div>
  );
}

/* ==================== HELPER COMPONENTS ==================== */

function SectionTitle({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4 border-b border-border pb-6">
      <span className="text-secondary text-[40px] font-extrabold">{number}</span>
      <h1 className="text-[32px] font-extrabold">{title}</h1>
    </div>
  );
}

function SubSection({ code, title }: { code: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mt-10">
      <span className="text-secondary text-[12px] font-bold bg-secondary/10 px-2 py-0.5 rounded">{code}</span>
      <h2 className="text-[18px] font-bold">{title}</h2>
    </div>
  );
}

function ColorSwatch({ color, name, hex, desc, textDark = false }: { color: string; name: string; hex: string; desc: string; textDark?: boolean }) {
  return (
    <div>
      <div
        className="h-16 rounded-lg border border-border flex items-center justify-center"
        style={{ backgroundColor: color }}
      >
        <span className={`text-[12px] font-bold ${textDark ? 'text-primary' : 'text-text-main'}`}>
          Preview
        </span>
      </div>
      <div className="mt-2 flex justify-between items-start">
        <div>
          <p className="text-[14px] font-bold">{name}</p>
          <small>{desc}</small>
        </div>
        <span className="text-text-muted text-[12px] font-mono">{hex}</span>
      </div>
    </div>
  );
}

function SpacingRow({ size, label }: { size: number; label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="w-10 text-[14px] font-medium text-text-muted">{size}px</span>
      <div
        className="h-4 bg-secondary rounded"
        style={{ width: `${size * 3}px` }}
      />
      <span className="text-[14px] text-text-muted">{label}</span>
    </div>
  );
}
