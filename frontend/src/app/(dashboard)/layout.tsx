// T040: Dashboard layout with navigation bar and user menu

'use client';

import React, { useEffect } from 'react';
import { useAuth } from '../../lib/hooks/useAuth';
import { Button } from '@/src/styling/ui/button';
import { useRouter } from 'next/navigation';


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, signOut, loading } = useAuth();
  const router = useRouter();

  // Redirect to sign in if user is not authenticated and not loading
  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin');
    }
  }, [user, loading, router]);

  // Show nothing or a loading indicator while checking auth status
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-dark">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400 mx-auto"></div>
          <p className="mt-4 text-gray-400">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If user is not authenticated, don't render the dashboard layout
  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background-dark">
      {/* Navigation bar */}
      <nav className="bg-background-card border-b border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold bg-gradient-to-r  text-white from-primary-400 to-accent-purple bg-clip-text text-transparent">
                ✨ Todo App
              </h1>
            </div>

            <div className="flex items-center gap-4">
              {user && (
                <>
                  <span className="text-sm text-gray-300">{user.email}</span>
                  <Button variant="ghost" size="sm" onClick={signOut}>
                    Sign Out
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>


      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}