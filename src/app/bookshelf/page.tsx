import { Metadata } from 'next';
import { getBookshelf } from '@/lib/notion';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Bookshelf',
  description: 'A collection of books that have shaped my world view.',
};

const fallbackBooks = [
  {
    id: '1',
    title: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    category: "Personal Development",
    rating: 5,
    quote: "You can make more friends in two months by becoming interested in other people than you can in two years by trying to get other people interested in you.",
    cover: "https://covers.openlibrary.org/b/id/15200981-L.jpg"
  }
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-[#1a1a1a]">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function BookCard({ book }: { book: any }) {
  return (
    <article className="group flex gap-6 p-6 rounded-lg bg-white border border-[#e5e5e5] hover:border-[#ccc] transition-colors">
      <div className="flex-shrink-0 w-24 md:w-32 aspect-[2/3] relative overflow-hidden rounded bg-[#f5f5f5]">
        <Image
          src={book.cover}
          alt={`${book.title} cover`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 96px, 128px"
        />
      </div>
      
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-start justify-between gap-4 mb-2">
          <div>
            <h2 className="text-lg font-semibold text-[#1a1a1a] leading-tight mb-1">
              {book.title}
            </h2>
            <p className="text-sm text-[#666]">{book.author}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs px-2 py-1 bg-[#f5f5f5] text-[#666] rounded">
            {book.category}
          </span>
          <StarRating rating={book.rating} />
        </div>
        
        {book.quote && (
          <blockquote className="mt-auto">
            <p className="text-sm text-[#444] italic leading-relaxed line-clamp-4" style={{ fontFamily: 'var(--font-lora), serif' }}>
              &ldquo;{book.quote}&rdquo;
            </p>
          </blockquote>
        )}
      </div>
    </article>
  );
}

export default async function BookshelfPage() {
  let books = fallbackBooks;
  try {
    const notionBooks = await getBookshelf();
    if (notionBooks && notionBooks.length > 0) {
      books = notionBooks.map((book: any) => ({
        id: book.id,
        title: book.properties?.Name?.title?.[0]?.plain_text || "Untitled",
        author: book.properties?.Author?.rich_text?.[0]?.plain_text || "Unknown",
        category: book.properties?.Category?.select?.name || "Uncategorized",
        rating: book.properties?.Rating?.number || 0,
        quote: book.properties?.Quote?.rich_text?.[0]?.plain_text || "",
        cover: book.properties?.Cover?.url || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=450&fit=crop",
      }));
    }
  } catch (error) {
    console.log("Using fallback book data");
  }

  return (
    <div className="space-y-12 animate-slide-up">
      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1a1a1a]">
          My Bookshelf
        </h1>
        <p className="text-lg text-[#666] max-w-2xl" style={{ fontFamily: 'var(--font-lora), serif' }}>
          A curated collection of books that have shaped my thinking and learning journey.
        </p>
      </section>

      {/* Books Grid */}
      <section className="grid gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </section>

      {/* Reading Stats / Footer */}
      <section className="pt-8 border-t border-[#e5e5e5] text-sm text-[#666]">
        <p>
          Currently reading <strong className="text-[#1a1a1a]">{books.length}</strong> books across{" "}
          <strong className="text-[#1a1a1a]">{new Set(books.map(b => b.category)).size}</strong> categories.
        </p>
      </section>
    </div>
  );
}