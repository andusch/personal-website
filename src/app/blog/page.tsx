import { getPublishedPosts } from '@/lib/notion';
import Link from 'next/link';

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <main className="max-w-2xl mx-auto px-6 py-12 md:py-20 font-serif">
      <h1 className="text-3xl font-bold font-sans mb-12 tracking-tight">Writing</h1>
      
      <div className="space-y-12">
        {posts.map((post: any) => {
          const title = post.properties.Name.title[0]?.plain_text;
          const date = post.properties.Date.date?.start;
          const slug = post.properties.Slug.rich_text[0]?.plain_text;

          return (
            <article key={post.id} className="group cursor-pointer">
              <Link href={`/blog/${slug}`}>
                <div className="flex flex-col md:flex-row md:items-baseline justify-between">
                  <h2 className="text-xl font-medium group-hover:text-blue-600 transition-colors">
                    {title}
                  </h2>
                  <time className="text-sm font-sans text-gray-400 mt-1 md:mt-0">
                    {new Date(date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </time>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </main>
  );
}