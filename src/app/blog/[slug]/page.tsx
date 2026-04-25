import Link from "next/link";
import { Metadata } from "next";
import ReactMarkdown from "react-markdown";

import { formatDate, formatDateWithDay } from "@/utils/helper";
import { getPostContent } from "@/lib/notion";

// Fallback content for demo
const fallbackContent: Record<string, { title: string; content: string; date: string }> = {
  "future-of-embodied-ai": {
    title: "The Future of Embodied AI",
    date: "2024-03-15",
    content: `# The Future of Embodied AI

The history of artificial intelligence has been largely disembodied. From expert systems to large language models, we've focused on cognition without physicality. But the next frontier of AI is fundamentally different: it's embodied.

## Why Embodiment Matters

When we think about intelligence, we often picture abstract reasoning—the ability to solve math problems, play chess, or generate text. But human intelligence emerged from millions of years of physical interaction with the world. Our brains evolved to control bodies, to navigate three-dimensional space, to manipulate objects.

As Rodney Brooks famously argued, "The world is its own best model." When a robot interacts physically with its environment, it doesn't need to maintain a perfect internal representation of reality. It can simply look, touch, and adjust.

## The Challenges Ahead

Embodied AI presents unique challenges:

1. **Sim-to-Real Transfer**: Policies trained in simulation rarely transfer perfectly to the real world. The "reality gap" remains one of the field's biggest open problems.

2. **Safety**: Physical robots can cause physical harm. As we deploy more autonomous systems, safety becomes paramount.

3. **Data Scarcity**: While the internet provides endless text and images, robotic data is expensive to collect. Each physical interaction requires real time and real hardware.

## Looking Forward

Despite these challenges, I'm optimistic. The convergence of foundation models with robotic control is opening new possibilities. Models like RT-2 show that we can transfer semantic knowledge from vision-language models to robotic policies.

The future of AI isn't just in the cloud—it's in our homes, our hospitals, and our streets. And that's a future worth building.`,
  }
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  let post = null;
  try {
    post = await getPostContent(slug);
  } catch {
  }
  
  if (!post && fallbackContent[slug]) {
    post = fallbackContent[slug];
  }
  
  if (!post) {
    return { title: "Post Not Found" };
  }
  
  return {
    title: post.title,
    description: post.content?.slice(0, 160) || "",
  };
}

export async function generateStaticParams() {
  return [
    { slug: "future-of-embodied-ai" }
  ];
}

export default async function BlogPost({ params }: Props) {
  
  const { slug } = await params;
  
  let post = null;
  
  try {
    post = await getPostContent(slug);
  } catch {
  }

  if (!post && fallbackContent[slug]) {
    post = fallbackContent[slug];
  }

  // 404 error code
  if (!post) {
    return (
      <div className="text-center py-20 animate-slide-up">
        <h1 className="text-2xl font-bold text-[#1a1a1a] dark:text-[#fafafa] mb-4">Post Not Found</h1>
        <p className="text-[#666] dark:text-[#999] mb-8">The article you&apos;re looking for doesn&apos;t exist.</p>
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-[#1a1a1a] dark:text-[#fafafa] hover:text-[#666] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to blog
        </Link>
      </div>
    );
  }

  return (
    <article className="animate-slide-up">
      {/* Back Link */}
      <Link 
        href="/blog" 
        className="inline-flex items-center gap-2 text-sm text-[#666] dark:text-[#999] hover:text-[#1a1a1a] mb-8 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to blog
      </Link>

      {/* Header */}
      <header className="mb-12 space-y-4">
        <time dateTime={post.date} className="text-sm text-[#666] dark:text-[#999]">
          {formatDateWithDay(post.date)}
        </time>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1a1a1a] dark:text-[#fafafa]">
          {post.title}
        </h1>
      </header>

      {/* Content */}
      <div 
        className="prose-custom max-w-none"
        style={{ fontFamily: 'var(--font-lora), serif' }}
      >
        <ReactMarkdown
          components={{
            h1: ({ children }) => <h1 className="text-2xl font-bold mt-12 mb-6 text-[#1a1a1a] dark:text-[#fafafa]">{children}</h1>,
            h2: ({ children }) => <h2 className="text-xl font-semibold mt-10 mb-4 text-[#1a1a1a] dark:text-[#fafafa]">{children}</h2>,
            h3: ({ children }) => <h3 className="text-lg font-semibold mt-8 mb-3 text-[#1a1a1a] dark:text-[#fafafa]">{children}</h3>,
            p: ({ children }) => <p className="mb-6 text-lg leading-8 text-[#333] dark:text-[#999]">{children}</p>,
            ul: ({ children }) => <ul className="mb-6 ml-6 space-y-2 list-disc text-[#333] dark:text-[#999]">{children}</ul>,
            ol: ({ children }) => <ol className="mb-6 ml-6 space-y-2 list-decimal text-[#333] dark:text-[#999]">{children}</ol>,
            li: ({ children }) => <li className="text-lg leading-8 text-[#333] dark:text-[#999]">{children}</li>,
            blockquote: ({ children }) => (
              <blockquote className="border-l-2 border-[#1a1a1a] dark:border-[#333] pl-6 my-8 italic text-[#555] dark:text-[#999]">
                {children}
              </blockquote>
            ),
            code: ({ children }) => (
              <code className="bg-[#f5f5f5] dark:bg-[#2a2a2a] px-1.5 py-0.5 rounded text-sm font-mono text-[#1a1a1a] dark:text-[#fafafa]">
                {children}
              </code>
            ),
            pre: ({ children }) => (
              <pre className="bg-[#1a1a1a] dark:bg-[#2a2a2a] text-[#fafafa] dark:text-[#fafafa] p-4 rounded-lg overflow-x-auto mb-6 text-sm">
                {children}
              </pre>
            ),
            a: ({ children, href }) => (
              <a href={href} className="text-[#1a1a1a] dark:text-[#fafafa] underline underline-offset-4 hover:text-[#666] transition-colors">
                {children}
              </a>
            ),
            strong: ({ children }) => <strong className="font-semibold text-[#1a1a1a] dark:text-[#fafafa]">{children}</strong>,
            em: ({ children }) => <em className="italic">{children}</em>,
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-[#e5e5e5] dark:border-[#333]">
        <p className="text-sm text-[#666] dark:text-[#999]">
          Thanks for reading.{" "}
          <Link href="/blog" className="text-[#1a1a1a] dark:text-[#fafafa] hover:underline">
            Read more posts
          </Link>
          {" "}or{" "}
          <a href="mailto:andu.scheusan@gmail.com" className="text-[#1a1a1a] dark:text-[#fafafa] hover:underline">
            get in touch
          </a>
          .
        </p>
      </footer>
    </article>
  );
}