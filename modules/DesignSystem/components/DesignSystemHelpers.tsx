import React from 'react';

export function SectionTitle({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-baseline gap-4 border-b border-border pb-6">
      <span className="text-secondary text-[40px] font-extrabold">{number}</span>
      <h1 className="text-[32px] font-extrabold">{title}</h1>
    </div>
  );
}

export function SubSection({ code, title }: { code: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mt-10">
      <span className="text-secondary text-[12px] font-bold bg-secondary/10 px-2 py-0.5 rounded">{code}</span>
      <h2 className="text-[18px] font-bold">{title}</h2>
    </div>
  );
}

export function ColorSwatch({ color, name, hex, desc, textDark = false }: { color: string; name: string; hex: string; desc: string; textDark?: boolean }) {
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

export function SpacingRow({ size, label }: { size: number; label: string }) {
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
