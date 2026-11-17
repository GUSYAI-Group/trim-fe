'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Sidebar, Navbar, Footer } from '@/components/layout';

export function DashboardLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-primary overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/70 z-40 lg:hidden backdrop-blur-sm transition-opacity duration-200 animate-modal-backdrop" 
          onClick={() => setSidebarOpen(false)} 
        />
      )}
      
      {/* Sidebar Container (Responsive) */}
      <div className={`
        fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0 shadow-2xl shadow-black/80' : '-translate-x-full'}
      `}>
        <Sidebar />
      </div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Navbar */}
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto min-h-full flex flex-col justify-between">
            <div key={pathname} className="pb-12">
              {children}
            </div>
            
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}
