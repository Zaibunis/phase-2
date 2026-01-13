import React from 'react';
import Link from 'next/link';
import { SignUpForm } from '../../../components/auth/SignUpForm';

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md space-y-6 rounded-xl bg-gray-900 p-8 shadow-lg">
        <div>
          <h2 className="text-2xl font-bold text-gray-100 text-center">
            Sign Up
          </h2>
          <p className="mt-2 text-sm text-gray-400 text-center">
            Create an account to start managing your tasks.
          </p>
        </div>

        <SignUpForm />

        <div className="text-center text-sm">
          <span className="text-gray-400">Already have an account? </span>
          <Link
            href="/signin"
            className="font-medium text-primary-400 hover:text-primary-300 transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
