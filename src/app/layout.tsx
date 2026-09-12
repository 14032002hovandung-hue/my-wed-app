import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Linh Kiện Điện Tử Đức Huy Clone',
  description: 'Shop linh kiện điện tử chuyên nghiệp',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="bg-gray-100 antialiased">{children}</body>
    </html>
  );
}