"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {

  const pathname = usePathname();

  const navItems = [
    { name: 'projects', path: '/projects' },
    { name: 'bookshelf', path: '/bookshelf' },
    { name: 'blog', path: '/blog' },
  ];

  return (
    <nav className="max-w-2xl mx-auto px-6 py-16 flex justify-between items-center font-sans tracking-tight">
      <Link href="/" className="text-lg font-bold hover:opacity-60 transition-opacity">
        andu.
      </Link>
      
      <div className="flex gap-8 items-center">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`text-sm transition-all duration-200 ${
              pathname === item.path 
                ? 'text-black font-medium border-b border-black' 
                : 'text-gray-400 hover:text-black'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );

}