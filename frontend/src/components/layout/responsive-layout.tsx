'use client';

import React, { useState } from 'react';
import { useAuth } from '../providers/auth-provider';
import Navigation from './navigation';
import Sidebar from './sidebar';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  title?: string;
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ children, title }) => {
  const { isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        {/* Navigation for desktop */}
        {isAuthenticated && <Navigation />}

        {/* Mobile header */}
        {!isAuthenticated && (
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <span className="text-xl font-bold text-indigo-600">Todo App</span>
                </div>
              </div>
            </div>
          </header>
        )}

        <main className={`flex-1 relative z-0 overflow-y-auto focus:outline-none ${isAuthenticated ? 'pt-16' : ''}`}>
          {title && (
            <div className="py-4 px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
            </div>
          )}
          <div className="pb-6 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ResponsiveLayout;