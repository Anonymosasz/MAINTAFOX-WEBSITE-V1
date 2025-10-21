'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import logo from '@/assets/logo.webp';
import UserMenu from './UserMenu';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${
        scrolled ? 'bg-white/80 backdrop-blur border-b' : 'bg-white/60 backdrop-blur'
      }`}
    >
      <nav className="container-12 flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src={logo} alt="Maintafox" width={28} height={28} className="rounded-sm" />
          <span className="font-semibold text-brand">Maintafox</span>
        </Link>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/features" className="hover:text-brand">
            Features
          </Link>
          <Link href="/about" className="hover:text-brand">
            About
          </Link>
          <Link href="/#pricing" className="hover:text-brand">
            Pricing
          </Link>
          <Link href="/#testimonials" className="hover:text-brand">
            Customers
          </Link>
          <Link href="/blog" className="hover:text-brand">
            Blog
          </Link>
          <Link href="/contact" className="hover:text-brand">
            Contact
          </Link>
          <Link href="/demo" className="btn-primary">
            Request a Demo
          </Link>
          <UserMenu />
        </div>
      </nav>
    </header>
  );
}
