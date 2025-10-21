import { ReactNode } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface BlogLayoutProps {
  children: ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark via-primary to-secondary-dark">
      <Navbar />
      
      <main className="relative z-10">
        {children}
      </main>
      
      <Footer />
    </div>
  );
}
