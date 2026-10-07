import React from 'react';
import { SectionTitle, SubSection, ColorSwatch, SpacingRow } from '../components/DesignSystemHelpers';

export default function VisualFoundationSection() {
  return (
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
  );
}
