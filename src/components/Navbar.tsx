import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="max-w-2xl mx-auto px-6 py-12 flex justify-between items-center font-sans">
      <Link href="/" className="text-black font-semibold hover:opacity-60 transition-opacity">
        andu.
      </Link>
      <div className="flex gap-6 text-sm text-gray-500">
        <Link href="/projects" className="hover:text-black transition-colors">projects</Link>
        <Link href="/blog" className="hover:text-black transition-colors">blog</Link>
        <Link href="/bookshelf" className="hover:text-black transition-colors">bookshelf</Link>
      </div>
    </nav>
  );
}