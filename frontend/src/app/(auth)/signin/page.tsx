import React from 'react';
import Link from 'next/link';
import { SignInForm } from '../../../components/auth/SignInForm';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative w-full max-w-md space-y-6 rounded-2xl bg-gray-800/50 backdrop-blur-sm p-8 shadow-xl border border-gray-700/50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-2xl">✓</span>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-400">
            Sign in to your TaskFlow Pro account
          </p>
        </div>

        <SignInForm />

        <div className="text-center text-sm text-gray-500 border-t border-gray-700/50 pt-6 mt-2">
          <span className="text-gray-500">Don't have an account? </span>
          <Link
            href="/signup"
            className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
