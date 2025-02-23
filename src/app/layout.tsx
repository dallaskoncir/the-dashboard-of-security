import { ReactNode } from "react";
import "@/app/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CyberGuard - The Dashboard of Security",
  description: "A simple security dashboard for tracking vulnerabilities.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-100 text-gray-900">
        {/* Global Header */}
        <header className="sticky top-0 z-10 bg-blue-900 text-white shadow-md">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Simple Logo (SVG or text) */}
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              <h1 className="text-xl font-bold">CyberGuard Inc.</h1>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-8">
          {children}
        </main>

        {/* Global Footer */}
        <footer className="bg-blue-900 text-white py-4">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2025 CyberGuard Inc. All rights reserved.</p>
            <p className="text-sm">Contact: support@cyberguard.inc | 1-800-SECURE</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
