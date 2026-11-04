import React from 'react';
import Image from 'next/image';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { Card, TextField, TextareaField, Checkbox } from '@/components/ui';

export type FaceShapeMap = {
  oval: boolean;
  bulat: boolean;
  persegi: boolean;
  lonjong: boolean;
  berlian: boolean;
  segitiga: boolean;
};

interface HairstyleMainFormSectionProps {
  isEditMode: boolean;
  name: string;
  onNameChange: (val: string) => void;
  imageUrl: string;
  onImageUrlChange: (val: string) => void;
  imageName: string;
  description: string;
  onDescriptionChange: (val: string) => void;
  hairType: string;
  onHairTypeChange: (val: string) => void;
  careLevel: string;
  onCareLevelChange: (val: string) => void;
  faceShapes: FaceShapeMap;
  onToggleFaceShape: (shape: keyof FaceShapeMap) => void;
  errors: {
    imageUrl?: string;
    name?: string;
    careLevel?: string;
  };
}

export function HairstyleMainFormSection({
  isEditMode,
  name,
  onNameChange,
  imageUrl,
  onImageUrlChange,
  imageName,
  description,
  onDescriptionChange,
  hairType,
  onHairTypeChange,
  careLevel,
  onCareLevelChange,
  faceShapes,
  onToggleFaceShape,
  errors,
}: HairstyleMainFormSectionProps) {
  return (
    <div className="lg:col-span-2 space-y-6">
      {/* Card 1: Informasi Model Rambut */}
      <Card className="p-6 md:p-8 space-y-6">
        <div className="space-y-1">
          <h2 className="text-[20px] font-bold text-text-main">Informasi model rambut</h2>
          <p className="text-[14px] text-text-muted">
            Data yang tampil pada katalog. Tanda <span className="text-secondary">*</span> wajib diisi pada form ini.
          </p>
        </div>

        {/* Upload Foto Referensi */}
        <div className="space-y-2.5">
          <label className="block text-[14px] font-medium text-text-main">
            Foto referensi <span className="text-secondary">*</span>
          </label>

          {isEditMode && imageName ? (
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-raised border border-border overflow-hidden shrink-0 relative">
                <Image
                  src={imageUrl.startsWith('/') ? imageUrl : '/hairstyles/skin-fade.jpg.png'}
                  alt={name || 'Hairstyle'}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2">
                <p className="text-[14px] font-bold text-text-main">{imageName}</p>
                <label className="cursor-pointer inline-block">
                  <input type="file" className="hidden" />
                  <div className="h-10 px-4 bg-raised hover:bg-surface-hover border border-border rounded-xl text-[13px] font-bold text-text-main flex items-center gap-2 transition-colors w-fit">
                    <Upload className="w-4 h-4" />
                    <span>Ganti gambar</span>
                  </div>
                </label>
                <p className="text-[12px] text-text-muted">
                  Foto referensi saat ini tetap digunakan jika tidak diganti.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-raised/60 border border-border flex flex-col items-center justify-center shrink-0 text-text-muted">
                <ImageIcon className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <p className="text-[14px] font-bold text-text-main">Unggah referensi model rambut</p>
                <label className="cursor-pointer inline-block">
                  <input type="file" className="hidden" />
                  <div className="h-10 px-4 bg-raised hover:bg-surface-hover border border-border rounded-xl text-[13px] font-bold text-text-main flex items-center gap-2 transition-colors w-fit">
                    <Upload className="w-4 h-4" />
                    <span>Unggah gambar</span>
                  </div>
                </label>
                <p className="text-[12px] text-text-muted">
                  Gunakan foto yang memperlihatkan potongan dengan jelas.
                </p>
              </div>
            </div>
          )}
        </div>

        <TextField
          label={isEditMode ? 'URL gambar pengganti' : 'Atau gunakan URL gambar'}
          value={imageUrl}
          onChange={(e) => onImageUrlChange(e.target.value)}
          placeholder="https://..."
          isError={Boolean(errors.imageUrl)}
          errorText={errors.imageUrl}
          helperText="Unggahan atau URL gambar akan mengisi image_url."
        />

        <TextField
          label="Nama model"
          required
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Masukkan nama model rambut"
          isError={Boolean(errors.name)}
          errorText={errors.name}
          helperText="Gunakan nama yang mudah dikenali pelanggan."
        />

        <TextareaField
          label="Deskripsi"
          rows={3}
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Jelaskan karakteristik potongan rambut"
          helperText="Jelaskan bentuk potongan dan karakteristik utamanya."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <TextField
            label="Tipe rambut"
            value={hairType}
            onChange={(e) => onHairTypeChange(e.target.value)}
            placeholder="Contoh: Lurus"
            helperText="Contoh: Lurus, Bergelombang, atau Keriting."
          />

          <TextField
            label="Level perawatan"
            value={careLevel}
            onChange={(e) => onCareLevelChange(e.target.value)}
            placeholder="Masukkan bilangan bulat"
            isError={Boolean(errors.careLevel)}
            errorText={errors.careLevel}
            helperText="Bilangan bulat; skala dan rentang level 1–5."
          />
        </div>
      </Card>

      {/* Card 2: Pemetaan Bentuk Wajah */}
      <Card className="p-6 md:p-8 space-y-5">
        <div className="space-y-1">
          <h2 className="text-[20px] font-bold text-text-main">Pemetaan bentuk wajah</h2>
          <p className="text-[13px] text-text-muted">Rancangan saja • tidak wajib dan tidak disimpan</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {(['oval', 'bulat', 'persegi', 'lonjong', 'berlian', 'segitiga'] as const).map((shape) => {
            const isSelected = faceShapes[shape];
            return (
              <div
                key={shape}
                onClick={() => onToggleFaceShape(shape)}
                className={`px-4 py-2.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-secondary/15 border-secondary'
                    : 'bg-raised/40 border-border hover:border-text-muted'
                }`}
              >
                <Checkbox
                  checked={isSelected}
                  onChange={() => onToggleFaceShape(shape)}
                  label={shape.charAt(0).toUpperCase() + shape.slice(1)}
                />
              </div>
            );
          })}
        </div>

        <p className="text-[12px] text-text-muted leading-relaxed pt-2 border-t border-border/60">
          Relasi HAIRSTYLES-FACE_SHAPES M:N belum memiliki tabel penghubung. Pilihan di atas hanya contoh rancangan, bukan data tersimpan.
        </p>
      </Card>
    </div>
  );
}

