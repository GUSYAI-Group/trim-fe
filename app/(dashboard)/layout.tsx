import React from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-primary)' }}>
      {/* Sidebar Placeholder */}
      <aside style={{ width: 'var(--sidebar-width)', backgroundColor: 'var(--color-surface)', padding: 'var(--spacing-16)' }}>
        <h2 style={{ color: 'var(--color-secondary)' }}>TRIM ADMIN</h2>
        <nav style={{ marginTop: 'var(--spacing-24)' }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
            <li>Dashboard</li>
            <li>Kapster</li>
            <li>Layanan</li>
            <li>Antrean</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: 'var(--spacing-24)', display: 'flex', flexDirection: 'column' }}>
        {/* Header Placeholder */}
        <header style={{ height: 'var(--header-height)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', borderBottom: '1px solid var(--color-surface)' }}>
          <div>Admin Profile</div>
        </header>

        {/* Page Content */}
        <div style={{ marginTop: 'var(--spacing-24)' }}>
          {children}
        </div>
      </main>
    </div>
  );
}
