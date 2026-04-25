import { Metadata } from "next";
import Link from "next/link";

import { formatDate, formatDateWithDay } from "@/utils/helper";
import type { BlogPost } from "@/lib/notion";
import { getPublishedPosts } from "@/lib/notion";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on AI, machine learning, robotics, and the intersection of technology and philosophy.",
};

// if notion isn't connected
const fallbackPosts = [
  {
    id: "1",
    title: "The Future of Embodied AI",
    slug: "future-of-embodied-ai",
    date: "2024-03-15",
    excerpt: "Why robots need bodies to truly understand the world...",
    published: true,
  },
];

function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="group py-8 border-b border-[#e5e5e5] dark:border-[#333] last:border-0">
      <Link href={`/blog/${post.slug}`} className="block space-y-3">
        <div className="flex items-center gap-4 text-sm text-[#666] dark:text-[#999]">
          <time dateTime={post.date}>{formatDateWithDay(post.date)}</time>
        </div>
        
        <h2 className="text-xl md:text-2xl font-semibold text-[#1a1a1a] dark:text-[#fafafa] group-hover:text-[#666] transition-colors">
          {post.title}
        </h2>
        
        {post.excerpt && (
          <p className="text-[#666] dark:text-[#999] leading-relaxed max-w-2xl" style={{ fontFamily: 'var(--font-lora), serif' }}>
            {post.excerpt}
          </p>
        )}
        
        <div className="flex items-center gap-2 text-sm font-medium text-[#1a1a1a] dark:text-[#fafafa] pt-2">
          <span>Read more</span>
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            className="group-hover:translate-x-1 transition-transform"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </Link>
    </article>
  );
}

export default async function BlogPage() {
  let posts = fallbackPosts;
  
  try {
    const notionPosts = await getPublishedPosts();
    
    if (notionPosts && notionPosts.length > 0) {
      posts = notionPosts;
    }
  } catch (error) {
    console.error("Error fetching blog posts, using fallback:", error);
  }

  return (
    <div className="space-y-12 animate-slide-up">
      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1a1a1a] dark:text-[#fafafa]">
          Blog
        </h1>
        <p className="text-lg text-[#666] dark:text-[#999] max-w-2xl" style={{ fontFamily: 'var(--font-lora), serif' }}>
          Thoughts on AI, machine learning, robotics, and the intersection of technology and philosophy.
        </p>
      </section>

      {/* Posts List */}
      <section className="divide-y divide-[#e5e5e5]">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </div>
  );
}