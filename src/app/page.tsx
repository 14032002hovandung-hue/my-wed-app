import Link from 'next/link';
import { getCategories, getProducts } from './actions';
import AddToCartBtn from '@/components/AddToCartBtn';
import CartIcon from '@/components/CartIcon';

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* HEADER */}
      <header className="bg-blue-700 text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-wide">
            <span className="bg-yellow-400 text-blue-900 px-2 py-1 rounded text-sm font-black">LINH KIỆN</span>
            <span>ĐỨC HUY CLONE</span>
          </Link>

          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                type="text"
                placeholder="Nhập tên linh kiện, IC, Module, mã sản phẩm..."
                className="w-full px-4 py-2 text-gray-800 rounded-md focus:outline-none text-sm"
              />
              <button className="absolute right-1 top-1 bottom-1 px-4 bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-semibold rounded-md text-sm transition">
                Tìm kiếm
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <CartIcon />
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          {/* SIDEBAR */}
          <aside className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-blue-800 text-white font-bold px-4 py-3 text-sm uppercase">
                Danh Mục Linh Kiện
              </div>
              <ul className="divide-y divide-gray-100 text-sm">
                {categories.map((cat: any) => (
                  <li key={cat.id}>
                    <Link href={`/category/${cat.slug}`} className="block px-4 py-2.5 hover:bg-blue-50 hover:text-blue-700 font-medium transition">
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* PRODUCT GRID */}
          <section className="md:col-span-3 space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 rounded-lg shadow-sm flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold">Linh Kiện Điện Tử Chất Lượng Cao</h2>
                <p className="text-xs text-blue-100 mt-1">Giao hàng toàn quốc - Hỗ trợ kỹ thuật chu đáo</p>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h1 className="text-lg font-bold text-gray-800 uppercase border-l-4 border-blue-700 pl-3">
                  Sản Phẩm Mới Nhất
                </h1>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((item: any) => (
                  <div key={item.id} className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition p-3 flex flex-col justify-between">
                    <div>
                      <div className="w-full h-36 bg-gray-50 flex items-center justify-center border-b mb-2">
                        <img src={item.images?.[0] || 'https://via.placeholder.com/150'} alt={item.name} className="max-h-full object-contain p-2" />
                      </div>
                      <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded uppercase">
                        {item.categories?.name || 'Linh kiện'}
                      </span>
                      <h3 className="text-xs font-semibold text-gray-800 mt-1 line-clamp-2 h-8 leading-4">
                        {item.name}
                      </h3>
                    </div>

                    <div className="mt-3">
                      <span className="text-sm font-bold text-red-600 block mb-2">
                        {Number(item.price).toLocaleString('vi-VN')}đ
                      </span>
                      <AddToCartBtn product={item} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}