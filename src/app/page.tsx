import Link from 'next/link';
import { getCategories, getProducts } from './actions';

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-blue-700 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-wide">
            <span className="bg-yellow-400 text-blue-900 px-2 py-1 rounded text-sm font-black">LINH KIỆN</span>
            <span>ĐỨC HUY CLONE</span>
          </Link>
          <div className="flex-1 max-w-2xl">
            <input
              type="text"
              placeholder="Nhập tên linh kiện, IC, Module, mã sản phẩm..."
              className="w-full px-4 py-2 text-gray-800 rounded-md focus:outline-none text-sm"
            />
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/cart" className="bg-blue-800 hover:bg-blue-900 px-3 py-2 rounded-md font-semibold text-yellow-400">
              Giỏ hàng (0)
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <aside className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="bg-blue-800 text-white font-bold px-4 py-3 text-sm uppercase">
                Danh Mục Linh Kiện
              </div>
              <ul className="divide-y text-sm">
                {categories.map((cat: any) => (
                  <li key={cat.id}>
                    <Link href={`/category/${cat.slug}`} className="block px-4 py-2.5 hover:bg-blue-50 hover:text-blue-700 font-medium">
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <section className="md:col-span-3 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((item: any) => (
                <div key={item.id} className="bg-white border rounded-lg overflow-hidden p-3 flex flex-col justify-between">
                  <div>
                    <img src={item.images?.[0] || 'https://via.placeholder.com/150'} alt={item.name} className="w-full h-32 object-contain" />
                    <h3 className="text-xs font-semibold text-gray-800 mt-2 line-clamp-2">{item.name}</h3>
                  </div>
                  <div className="mt-3">
                    <span className="text-sm font-bold text-red-600 block">{Number(item.price).toLocaleString('vi-VN')}đ</span>
                    <button className="w-full mt-2 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white text-xs py-1.5 font-medium rounded border border-blue-200">
                      + Thêm giỏ hàng
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}