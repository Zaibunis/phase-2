'use client';

import React from 'react';
import { useAuth } from '../../components/providers/auth-provider'; // Updated import path to use our context
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Redirect happens in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation bar */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-indigo-600">Todo App</span>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={async () => {
                  await signOut();
                  router.push('/login');
                }}
                className="ml-4 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-6">
        {children}
      </main>
    </div>
  );
};

export default ProtectedLayout;