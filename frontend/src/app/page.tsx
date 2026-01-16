// T105: Landing page with branding and auth CTAs

import Link from 'next/link';
import { Button } from '@/src/styling/ui/button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="py-8 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">✓</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              TaskFlow Pro
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/signin">
              <Button variant="outline" size="sm" className="border-gray-600 hover:bg-gray-800 text-gray-200">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="gradient" size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        </header>

        {/* Hero section */}
        <div className="py-20 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 mb-8 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full backdrop-blur-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-blue-300">⚡ Productivity Meets Elegance</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Transform Your
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Task Management
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            Streamline your workflow with TaskFlow Pro. Create, organize, and accomplish your goals with our intuitive and beautiful task management platform.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/signup">
              <Button variant="gradient" size="lg" className="px-8 py-4 text-lg">
                <span className="mr-2">🚀</span> Start Your Journey
              </Button>
            </Link>
            <Link href="/signin">
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-gray-600 hover:bg-gray-800 text-gray-200">
                Sign In →
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">10K+</div>
            <div className="text-gray-300">Tasks Completed</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">98%</div>
            <div className="text-gray-300">User Satisfaction</div>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">24/7</div>
            <div className="text-gray-300">Support Available</div>
          </div>
        </div>

        {/* Features */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="group bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Intuitive Task Creation
            </h3>
            <p className="text-gray-400">
              Effortlessly add and organize tasks with our streamlined interface. Focus on what matters most.
            </p>
          </div>

          <div className="group bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Smart Organization
            </h3>
            <p className="text-gray-400">
              Categorize and prioritize tasks with smart filters and tags. Never lose track of important items.
            </p>
          </div>

          <div className="group bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              Secure & Reliable
            </h3>
            <p className="text-gray-400">
              Enterprise-grade security with end-to-end encryption. Your data is protected at all times.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Boost Your Productivity?
            </h3>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of satisfied users who have transformed their workflow with TaskFlow Pro.
            </p>
            <Link href="/signup">
              <Button variant="gradient" size="xl" className="px-10 py-5 text-xl">
                <span className="mr-3">🌟</span> Get Started Today
              </Button>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="py-8 text-center text-sm text-gray-500 border-t border-gray-800">
          <p>&copy; 2026 TaskFlow Pro. Empowering productivity worldwide.</p>
        </footer>
      </div>
    </div>
  );
}