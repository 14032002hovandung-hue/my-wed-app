'use client';

import Link from 'next/link';
import { useCart } from '@/lib/useCart';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-blue-700 text-white shadow-md py-3 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            ← Tiếp tục mua sản phẩm
          </Link>
          <h1 className="text-lg font-bold">GIỎ HÀNG CỦA BẠN</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {cart.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <p className="text-gray-500 mb-4">Giỏ hàng của bạn đang trống.</p>
            <Link href="/" className="inline-block bg-blue-700 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-800">
              Xem danh mục sản phẩm
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Danh sách món hàng */}
            <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-4 divide-y">
              <div className="flex justify-between items-center pb-3">
                <span className="font-bold text-gray-700">Sản phẩm ({cart.length})</span>
                <button onClick={clearCart} className="text-xs text-red-600 hover:underline">
                  Xóa tất cả
                </button>
              </div>

              {cart.map((item) => (
                <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-contain border rounded" />
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-xs text-gray-500">Mã: {item.sku || 'N/A'}</p>
                    <p className="text-sm font-bold text-red-600 mt-1">
                      {item.price.toLocaleString('vi-VN')}đ
                    </p>
                  </div>

                  {/* Tăng giảm số lượng */}
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-sm font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 text-sm font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-sm font-bold"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-bold px-2"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Tổng tiền & Nút thanh toán */}
            <div className="bg-white rounded-lg shadow-sm p-4 h-fit space-y-4">
              <h2 className="font-bold text-gray-800 border-b pb-2">TỔNG ĐƠN HÀNG</h2>
              <div className="flex justify-between text-sm">
                <span>Tạm tính:</span>
                <span className="font-semibold">{getTotalPrice().toLocaleString('vi-VN')}đ</span>
              </div>
              <div className="flex justify-between text-base font-bold text-red-600 border-t pt-2">
                <span>Thành tiền:</span>
                <span>{getTotalPrice().toLocaleString('vi-VN')}đ</span>
              </div>
              <Link
                href="/checkout"
                className="block text-center w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-md transition"
              >
                TIẾN HÀNH THANH TOÁN
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
