import React from 'react';
import { SectionTitle, SubSection } from '../components/DesignSystemHelpers';
import { Card, Badge, Avatar, Checkbox, IconButton, Tooltip } from '@/components/ui';
import { Search as SearchIcon, PackageX } from 'lucide-react';

export default function DataNavigationSection() {
  return (
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
  );
}
