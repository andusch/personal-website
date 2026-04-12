"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { path: "/", label: "About"},
  { path: "/projects", label: "Projects"},
  { path: "/blog", label: "Blog" },
  { path: "/bookshelf", label: "Bookshelf" },
];

export default function Navbar() {

  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  }

  return (
    <header className="mb-16 md:mb-24">
      <nav className="flex items-center justify-between">
        {/* Logo / Name */}
        <Link 
          href="/" 
          className="text-lg font-semibold tracking-tight text-[#1a1a1a] hover:opacity-70 transition-opacity"
        >
          .andu
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`text-sm transition-colors duration-200 ${
                isActive(item.path)
                  ? "text-[#1a1a1a] font-medium"
                  : "text-[#666] hover:text-[#1a1a1a]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#1a1a1a]"
          aria-label="Toggle menu"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            {mobileMenuOpen ? (
              <>
                <path d="M4 4L16 16" />
                <path d="M16 4L4 16" />
              </>
            ) : (
              <>
                <path d="M2 5H18" />
                <path d="M2 10H18" />
                <path d="M2 15H18" />
              </>
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-6 pb-6 border-b border-[#e5e5e5]">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base ${
                  isActive(item.path)
                    ? "text-[#1a1a1a] font-medium"
                    : "text-[#666]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );

}