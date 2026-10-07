import React, { useState } from 'react';
import { SectionTitle, SubSection } from '../components/DesignSystemHelpers';
import { Button, IconButton, SearchBar, TextField, Checkbox, Avatar } from '@/components/ui';
import { Heart } from 'lucide-react';

export default function ActionsFormSection() {
  const [searchValue, setSearchValue] = useState('');
  const [checkA, setCheckA] = useState(false);
  const [checkB, setCheckB] = useState(true);

  return (
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
  );
}
