import { Metadata } from 'next';
import { getBookshelf } from '@/lib/notion';
import Image from 'next/image';
import { formatDate } from '@/utils/helper';
import { Book } from '@/lib/notion';

export const metadata: Metadata = {
  title: 'Bookshelf',
  description: 'A collection of books that have shaped my world view.',
};

const fallbackBooks: Book[] = [
  
  {
    id: '1',
    title: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    category: "Personal Development",
    rating: 5,
    readDate: null,
    cover: "https://covers.openlibrary.org/b/id/15200981-L.jpg",
    status: "Finished",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-[#1a1a1a] dark:text-[#fafafa]">
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

function BookCard({ book }: { book: Book }) {
  return (
    <article className="group flex gap-6 p-6 rounded-lg bg-white dark:bg-[#1a1a1a] border border-[#e5e5e5] dark:border-[#333] hover:border-[#ccc] dark:hover:border-[#555] transition-colors">
      <div className="flex-shrink-0 w-24 md:w-32 aspect-[2/3] relative overflow-hidden rounded bg-[#f5f5f5] dark:bg-[#2a2a2a]">
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
            <h2 className="text-lg font-semibold text-[#1a1a1a] dark:text-[#fafafa] leading-tight mb-1">
              {book.title}
            </h2>
            <p className="text-sm text-[#666] dark:text-[#999]">{book.author}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs px-2 py-1 bg-[#f5f5f5] dark:bg-[#2a2a2a] text-[#666] dark:text-[#999] rounded">
            {book.category}
          </span>
          <StarRating rating={book.rating} />
        </div>
        
        {book.readDate && book.status === "Finished" && (
          <div className="mt-auto">
            <p className="text-xs text-[#999] dark:text-[#666] uppercase tracking-widest font-medium">
              Read on {formatDate(book.readDate)}
            </p>
          </div>
        )}

        {book.status === "Reading" && (
          <div className="mt-3 flex items-center gap-2 text-sm text-[#666] dark:text-[#999]">
            <div className="w-2 h-2 rounded-full bg-[#1a1a1a] animate-pulse" />
            <span>Currently reading</span>
          </div>
        )}
        
      </div>
    </article>
  );
}

export default async function BookshelfPage() {

  let books = fallbackBooks;

  try {

    const notionBooks = await getBookshelf();
    if(notionBooks && notionBooks.length > 0) {
      books = notionBooks;
    }

  } catch {
    console.log("Using fallback book data");
  }

  const currentlyReading = books.filter(b => b.status === "Reading");
  const finished = books.filter(b => b.status === "Finished");
  const toRead = books.filter(b => b.status === "To-Read");

  return (
    <div className="space-y-12 animate-slide-up">
      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1a1a1a] dark:text-[#fafafa]">
          My Bookshelf
        </h1>
        <p className="text-lg text-[#666] dark:text-[#999] max-w-2xl" style={{ fontFamily: 'var(--font-lora), serif' }}>
          A curated collection of books that have shaped my thinking and learning journey.
        </p>
      </section>

      {/* Currently Reading Section */}
      {currentlyReading.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#666] dark:text-[#999] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1a1a1a] animate-pulse" />
            Currently Reading
          </h2>
          <div className="grid gap-4">
            {currentlyReading.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      )}

      {/* To Read Section */}
      {toRead.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#666] dark:text-[#999]">
            To Read ({toRead.length})
          </h2>
          <div className="grid gap-4">
            {toRead.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      )}

      {/* Finished Section */}
      {finished.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#666] dark:text-[#999]">
            Finished ({finished.length})
          </h2>
          <div className="grid gap-4">
            {finished.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </section>
      )}

      {/* Reading Stats */}
      <section className="pt-8 border-t border-[#e5e5e5] dark:border-[#333]">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-lg bg-[#f5f5f5] dark:bg-[#2a2a2a]">
            <div className="text-2xl font-bold text-[#1a1a1a] dark:text-[#fafafa]">{currentlyReading.length}</div>
            <div className="text-xs text-[#666] dark:text-[#999] uppercase tracking-wider mt-1">Reading</div>
          </div>
          <div className="p-4 rounded-lg bg-[#1a1a1a] dark:bg-[#2a2a2a] text-[#fafafa]">
            <div className="text-2xl font-bold">{finished.length}</div>
            <div className="text-xs opacity-70 uppercase tracking-wider mt-1">Finished</div>
          </div>
          <div className="p-4 rounded-lg bg-[#f5f5f5] dark:bg-[#2a2a2a]">
            <div className="text-2xl font-bold text-[#1a1a1a] dark:text-[#fafafa]">{toRead.length}</div>
            <div className="text-xs text-[#666] dark:text-[#999] uppercase tracking-wider mt-1">To Read</div>
          </div>
        </div>
      </section>
    </div>
  );

}