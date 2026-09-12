import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Linh Kiện Đức Huy Clone',
  description: 'Shop bán lẻ linh kiện điện tử',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="bg-gray-100 font-sans antialiased">{children}</body>
    </html>
  );
}