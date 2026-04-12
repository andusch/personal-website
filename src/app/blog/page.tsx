import { Metadata } from "next";
import { getPublishedPosts } from "@/lib/notion";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on AI, machine learning, robotics, and the intersection of technology and philosophy.",
};

// Fallback posts if Notion isn't connected
const fallbackPosts = [
  {
    id: "1",
    title: "The Future of Embodied AI",
    slug: "future-of-embodied-ai",
    date: "2024-03-15",
    excerpt: "Why robots need bodies to truly understand the world...",
  },
];

function formatDate(dateString: string) {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
}

function PostCard({ post }: { post: any }) {
  return (
    <article className="group py-8 border-b border-[#e5e5e5] last:border-0">
      <Link href={`/blog/${post.slug}`} className="block space-y-3">
        <div className="flex items-center gap-4 text-sm text-[#666]">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
        
        <h2 className="text-xl md:text-2xl font-semibold text-[#1a1a1a] group-hover:text-[#666] transition-colors">
          {post.title}
        </h2>
        
        {post.excerpt && (
          <p className="text-[#666] leading-relaxed max-w-2xl" style={{ fontFamily: 'var(--font-lora), serif' }}>
            {post.excerpt}
          </p>
        )}
        
        <div className="flex items-center gap-2 text-sm font-medium text-[#1a1a1a] pt-2">
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
    console.log("Blog page received posts:", notionPosts.length);
    
    if (notionPosts && notionPosts.length > 0) {
      posts = notionPosts;
      // Log first post for debugging
      console.log("First post:", JSON.stringify(notionPosts[0], null, 2));
    } else {
      console.log("No posts from Notion, using fallback");
    }
  } catch (error) {
    console.log("Error fetching posts, using fallback:", error);
  }

  return (
    <div className="space-y-12 animate-slide-up">
      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1a1a1a]">
          Blog
        </h1>
        <p className="text-lg text-[#666] max-w-2xl" style={{ fontFamily: 'var(--font-lora), serif' }}>
          Thoughts on AI, machine learning, robotics, and the intersection of technology and philosophy.
        </p>
      </section>

      {/* Debug info - remove after fixing */}
      <div className="text-xs text-gray-400 mb-4">
        Showing {posts.length} posts {posts !== fallbackPosts ? "(from Notion)" : "(fallback)"}
      </div>

      {/* Posts List */}
      <section className="divide-y divide-[#e5e5e5]">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </section>
    </div>
  );
}