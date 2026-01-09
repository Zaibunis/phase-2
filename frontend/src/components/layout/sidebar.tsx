'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../providers/auth-provider';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();
  const { user, isAuthenticated, signOut } = useAuth();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    onClose(); // Close sidebar after sign out
  };

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Tasks', href: '/tasks' },
    { name: 'Calendar', href: '/calendar' },
    { name: 'Profile', href: '/profile' },
    { name: 'Settings', href: '/settings' },
  ];

  if (!isMounted) {
    return null; // Prevent SSR mismatch
  }

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static md:inset-0`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 md:hidden">
          <span className="text-xl font-bold text-indigo-600">Todo App</span>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-2 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => isMobile() && onClose()} // Close on mobile after clicking
                  className={`${
                    pathname === link.href
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="border-t border-gray-200 p-4">
            {isAuthenticated ? (
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                </div>
                <div className="ml-3 min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">
                    {user?.name || user?.email}
                  </p>
                  <p className="text-xs font-medium text-gray-500 truncate">
                    {user?.email}
                  </p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="ml-auto text-sm font-medium text-red-600 hover:text-red-800"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  href="/login"
                  className="block w-full text-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="block w-full text-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// Helper function to detect mobile devices
const isMobile = () => {
  if (typeof window !== 'undefined') {
    return window.innerWidth < 768;
  }
  return false;
};

export default Sidebar;