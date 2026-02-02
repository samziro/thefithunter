'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AdminModal from './AdminModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/programs', label: 'Programs' },
    { href: '/blogs', label: 'Blogs' },
  ];

  return (
    <header className="bg-bg shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center py-2">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.webp"
              alt="Fit Hunter - Personal Trainer in Watamu, Kenya"
              width={80}
              height={80}
              className="rounded-full"
              priority
              
            />
            <span className="ml-3 text-xl font-bold text-textSecondary  hidden sm:block">
              Fit Hunter
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-textSecondary font-medium hover:text-button transition-colors "
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="text-textSecondary font-medium hover:text-button transition-colors "
            >
              Admin
            </button>
            <Link
              href="/programs"
              className="bg-button text-white px-6 py-3 font-semibold hover:bg-buttonHover transition-colors "
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-button focus:outline-none"
            aria-label="Toggle menu"
          >
            <i className={`${isMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-3xl`} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-slate-700">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white font-medium hover:text-button transition-colors py-2 "
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  setIsAdminOpen(true);
                  setIsMenuOpen(false);
                }}
                className="text-white font-medium hover:text-button transition-colors text-left py-2 "
              >
                Admin
              </button>
              <Link
                href="/programs"
                onClick={() => setIsMenuOpen(false)}
                className="bg-button text-textSecondary px-6 py-3  font-semibold text-center hover:bg-buttonHover transition-colors "
              >
                Get Started
              </Link>
            </nav>
          </div>
        )}
      </div>

      <AdminModal open={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
    </header>
  );
}