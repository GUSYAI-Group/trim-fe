import React from 'react';
import { Button } from '@/components/ui/Button/Button';

export default function DashboardPage() {
  return (
    <div>
      <h1 style={{ fontSize: '28px', marginBottom: 'var(--spacing-16)' }}>Dashboard Overview</h1>
      <p style={{ color: 'var(--color-text-muted)' }}>Selamat datang kembali di TRIM Dashboard.</p>

      <div style={{ marginTop: 'var(--spacing-24)', display: 'flex', gap: 'var(--spacing-16)' }}>
        <div style={{ padding: 'var(--spacing-16)', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-card)', width: '300px' }}>
          <h3>Antrean Aktif</h3>
          <p style={{ fontSize: '32px', color: 'var(--color-warning)', fontWeight: 'bold' }}>12</p>
        </div>
        
        <div style={{ padding: 'var(--spacing-16)', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-card)', width: '300px' }}>
          <h3>Total Cukur Hari Ini</h3>
          <p style={{ fontSize: '32px', color: 'var(--color-success)', fontWeight: 'bold' }}>48</p>
        </div>
      </div>

      <div style={{ marginTop: 'var(--spacing-24)' }}>
        <Button variant="primary">Lihat Laporan Detail</Button>
      </div>
    </div>
  );
}
