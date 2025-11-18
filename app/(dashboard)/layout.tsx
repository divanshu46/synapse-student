'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { MobileNav } from '@/components/layout/MobileNav';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Sidebar />
      <MobileNav open={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />
      
      <div className="lg:pl-64">
        <Header onMenuClick={() => setMobileNavOpen(true)} />
        <main 
          className="min-h-[calc(100vh-4rem)]"
          style={{
            backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.08) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
