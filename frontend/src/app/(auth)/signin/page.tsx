import React from 'react';
import Link from 'next/link';
import { SignInForm } from '../../../components/auth/SignInForm';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-gray-900 p-8 shadow-lg">
        <div>
          <h2 className="text-2xl font-bold text-gray-100 text-center">
            Sign In
          </h2>
          <p className="mt-2 text-sm text-gray-400 text-center">
            Welcome back! Sign in to manage your tasks.
          </p>
        </div>

        <SignInForm />

        <div className="text-center text-sm">
          <span className="text-gray-400">Don't have an account? </span>
          <Link
            href="/signup"
            className="font-medium text-primary-400 hover:text-primary-300 transition-colors"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
