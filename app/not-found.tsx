'use client';

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-5xl md:text-5xl font-semibold text-white">404</h1>
      
      <p className="text-slate-100 mt-4">Please check the URL or return to the homepage.</p>
      <Link
        href="/"
        className="mt-6 inline-block bg-yellow-600 text-white px-6 py-3  hover:bg-yellow-700 transition-colors"
      >
        Go to Homepage
      </Link>
    </div>
  );
}