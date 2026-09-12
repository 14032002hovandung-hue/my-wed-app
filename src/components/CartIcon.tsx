'use client';

import Link from 'next/link';
import { useCart } from '@/lib/useCart';
import { useEffect, useState } from 'react';

export default function CartIcon() {
  const totalItems = useCart((state) => state.getTotalItems());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link
      href="/cart"
      className="flex items-center gap-2 bg-blue-800 hover:bg-blue-900 px-3 py-2 rounded-md transition border border-blue-600 text-yellow-400 font-semibold text-sm"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z" />
      </svg>
      <span>Giỏ hàng ({mounted ? totalItems : 0})</span>
    </Link>
  );
}