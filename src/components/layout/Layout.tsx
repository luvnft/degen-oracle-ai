import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="p-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;
