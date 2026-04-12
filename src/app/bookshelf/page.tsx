import { getBookshelf } from '@/lib/notion';

export default async function BookshelfPage() {
  const books = await getBookshelf();

  return (
    <main className="max-w-2xl mx-auto px-6 py-12 md:py-20 font-serif">
      <h1 className="text-3xl font-bold font-sans mb-4 tracking-tight">Bookshelf</h1>
      <p className="text-gray-500 font-sans mb-12 italic">
        A collection of physics, philosophy, and technical literature that shapes my world view.
      </p>

      <div className="space-y-16">
        {books.map((book: any) => {
          const title = book.properties.Name.title[0]?.plain_text;
          const author = book.properties.Author.rich_text[0]?.plain_text;
          const status = book.properties.Status.select?.name;
          // Note: Add a "Takeaway" text property in Notion if you want to show a short blurb
          const takeaway = book.properties.Takeaway?.rich_text[0]?.plain_text;

          return (
            <section key={book.id} className="relative border-l border-gray-200 pl-8">
              <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-gray-300" />
              <h2 className="text-xl font-bold italic leading-tight">{title}</h2>
              <p className="text-sm font-sans text-gray-500 mt-1 uppercase tracking-wider">
                {author}
              </p>
              
              {takeaway && (
                <p className="mt-4 text-gray-700 leading-relaxed italic">
                  "{takeaway}"
                </p>
              )}

              <div className="mt-4 inline-flex items-center gap-2">
                <span className={`text-[10px] font-sans font-bold px-2 py-0.5 rounded uppercase tracking-tighter ${
                  status === 'Finished' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'
                }`}>
                  {status}
                </span>
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}