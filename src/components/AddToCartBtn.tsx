'use client';

import { useCart } from '@/lib/useCart';
import { useState } from 'react';

export default function AddToCartBtn({ product }: { product: any }) {
  const addToCart = useCart((state) => state.addToCart);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={handleAdd}
      className={`w-full text-xs py-1.5 font-medium rounded transition flex items-center justify-center gap-1 ${
        added
          ? 'bg-green-600 text-white border border-green-600'
          : 'bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white border border-blue-200 hover:border-blue-600'
      }`}
    >
      {added ? '✓ Đã thêm vào giỏ' : '+ Thêm giỏ hàng'}
    </button>
  );
}