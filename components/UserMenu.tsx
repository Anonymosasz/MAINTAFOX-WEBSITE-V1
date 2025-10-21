'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User as UserIcon, Shield, Edit3 } from 'lucide-react';
import AuthModal from './AuthModal';
import Link from 'next/link';

export default function UserMenu() {
  const { user, signOut, isAdmin } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  if (!user) {
    return (
      <>
        <button
          onClick={() => setShowAuthModal(true)}
          className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand/90"
        >
          <UserIcon className="h-4 w-4" />
          Sign In
        </button>
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      </>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand/40 hover:bg-slate-50"
      >
        {user.photoURL ? (
          <img src={user.photoURL} alt={user.displayName} className="h-6 w-6 rounded-full" />
        ) : (
          <div className="grid h-6 w-6 place-items-center rounded-full bg-brand/10 text-xs font-bold text-brand">
            {user.displayName.charAt(0).toUpperCase()}
          </div>
        )}
        <span>{user.displayName}</span>
        {isAdmin && (
          <span className="ml-1 rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
            Admin
          </span>
        )}
      </button>

      {showDropdown && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowDropdown(false)}
          />
          <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
            <div className="border-b border-slate-100 px-4 py-3">
              <p className="text-sm font-semibold text-slate-900">{user.displayName}</p>
              <p className="mt-1 text-xs text-slate-500">{user.email}</p>
            </div>

            <div className="py-2">
              <Link
                href="/blog/create"
                onClick={() => setShowDropdown(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
              >
                <Edit3 className="h-4 w-4" />
                Create Post
              </Link>

              {isAdmin && (
                <Link
                  href="/admin/blog"
                  onClick={() => setShowDropdown(false)}
                  className="flex items-center gap-3 rounded-xl px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
                >
                  <Shield className="h-4 w-4" />
                  Admin Dashboard
                </Link>
              )}

              <button
                onClick={() => {
                  signOut();
                  setShowDropdown(false);
                }}
                className="flex w-full items-center gap-3 rounded-xl px-4 py-2 text-sm text-red-600 transition hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
