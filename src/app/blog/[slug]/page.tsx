import { Metadata } from "next";
import { getPublishedPosts, getPostContent } from "@/lib/notion";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

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
  },
  "learning-to-learn": {
    title: "Learning to Learn: Meta-Learning Approaches",
    date: "2024-02-28",
    content: `# Learning to Learn: Meta-Learning Approaches

One of the most remarkable aspects of human intelligence is our ability to learn new concepts from just a few examples. Show a child three pictures of a giraffe, and they'll recognize giraffes in new contexts, draw them, and describe their features. Current deep learning systems require thousands of examples to achieve similar performance.

## What is Meta-Learning?

Meta-learning, or "learning to learn," aims to design models that can adapt to new tasks with minimal data. Instead of learning a single task, the model learns a learning algorithm—an inductive bias that enables rapid adaptation.

## Key Approaches

### Model-Agnostic Meta-Learning (MAML)
MAML seeks initial model parameters that can be fine-tuned to any task with just a few gradient steps. The idea is elegant: train the model such that it sits at a point in parameter space that's close to optimal for many different tasks.

### Prototypical Networks
These networks learn a metric space where classification can be performed by computing distances to prototype representations of each class. They're simple, effective, and don't require fine-tuning during adaptation.

### Memory-Augmented Networks
By augmenting neural networks with external memory systems (like Neural Turing Machines), we can create models that learn to store and retrieve relevant information for new tasks.

## The Path Forward

The ultimate goal is artificial general intelligence systems that can continually learn throughout their lifetimes, adapting to new environments and tasks without forgetting previous knowledge. Meta-learning is a crucial piece of that puzzle.`,
  },
  "ethics-of-autonomous-systems": {
    title: "On the Ethics of Autonomous Systems",
    date: "2024-02-10",
    content: `# On the Ethics of Autonomous Systems

As we delegate increasingly consequential decisions to machines—from medical diagnoses to criminal sentencing—we must grapple with fundamental questions about responsibility, fairness, and the nature of moral reasoning itself.

## The Alignment Problem

Stuart Russell frames the core challenge as the "alignment problem": ensuring that AI systems pursue objectives that align with human values. But whose values? And how do we encode them?

The trolley problem, often cited in discussions of autonomous vehicles, illustrates the complexity. Should a self-driving car swerve to hit one person instead of five? What if the one is a child and the five are elderly? These aren't just technical questions—they're deeply philosophical ones that we've been debating for millennia.

## Fairness and Bias

Machine learning systems trained on historical data often perpetuate historical biases. A hiring algorithm trained on past decisions may discriminate against underrepresented groups. A medical model may perform worse for certain demographics.

Addressing this requires more than technical solutions. It demands diverse teams, careful auditing, and ongoing monitoring. It requires asking: fair according to whose definition?

## Transparency and Explanation

As models become more complex, understanding their decisions becomes harder. But explainability isn't just a technical nice-to-have—it's an ethical imperative. If a system denies someone a loan, they deserve to know why.

## My View

I believe the development of AI should be guided by human flourishing. Technology is a means, not an end. As builders, we have a responsibility to consider not just what we can build, but what we should build.

The future of AI ethics isn't just about preventing harm—it's about actively shaping technology to promote human dignity, autonomy, and well-being.`,
  },
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  // Try to get from Notion first
  let post = null;
  try {
    post = await getPostContent(slug);
  } catch {
    // Notion not configured or error
  }
  
  // Fallback to static content
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
  // Return fallback slugs for static generation
  return [
    { slug: "future-of-embodied-ai" },
    { slug: "learning-to-learn" },
    { slug: "ethics-of-autonomous-systems" },
  ];
}

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

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  
  let post = null;
  
  // Try Notion first
  try {
    post = await getPostContent(slug);
  } catch (error) {
    console.log("Notion fetch failed, using fallback");
  }

  // Use fallback if Notion failed or returned null
  if (!post && fallbackContent[slug]) {
    post = fallbackContent[slug];
  }

  // If still no post, show 404-style message
  if (!post) {
    return (
      <div className="text-center py-20 animate-slide-up">
        <h1 className="text-2xl font-bold text-[#1a1a1a] mb-4">Post Not Found</h1>
        <p className="text-[#666] mb-8">The article you're looking for doesn't exist.</p>
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-[#1a1a1a] hover:text-[#666] transition-colors"
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
        className="inline-flex items-center gap-2 text-sm text-[#666] hover:text-[#1a1a1a] mb-8 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to blog
      </Link>

      {/* Header */}
      <header className="mb-12 space-y-4">
        <time dateTime={post.date} className="text-sm text-[#666]">
          {formatDate(post.date)}
        </time>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1a1a1a]">
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
            h1: ({ children }) => <h1 className="text-2xl font-bold mt-12 mb-6 text-[#1a1a1a]">{children}</h1>,
            h2: ({ children }) => <h2 className="text-xl font-semibold mt-10 mb-4 text-[#1a1a1a]">{children}</h2>,
            h3: ({ children }) => <h3 className="text-lg font-semibold mt-8 mb-3 text-[#1a1a1a]">{children}</h3>,
            p: ({ children }) => <p className="mb-6 text-lg leading-8 text-[#333]">{children}</p>,
            ul: ({ children }) => <ul className="mb-6 ml-6 space-y-2 list-disc text-[#333]">{children}</ul>,
            ol: ({ children }) => <ol className="mb-6 ml-6 space-y-2 list-decimal text-[#333]">{children}</ol>,
            li: ({ children }) => <li className="text-lg leading-8">{children}</li>,
            blockquote: ({ children }) => (
              <blockquote className="border-l-2 border-[#1a1a1a] pl-6 my-8 italic text-[#555]">
                {children}
              </blockquote>
            ),
            code: ({ children }) => (
              <code className="bg-[#f5f5f5] px-1.5 py-0.5 rounded text-sm font-mono text-[#1a1a1a]">
                {children}
              </code>
            ),
            pre: ({ children }) => (
              <pre className="bg-[#1a1a1a] text-[#fafafa] p-4 rounded-lg overflow-x-auto mb-6 text-sm">
                {children}
              </pre>
            ),
            a: ({ children, href }) => (
              <a href={href} className="text-[#1a1a1a] underline underline-offset-4 hover:text-[#666] transition-colors">
                {children}
              </a>
            ),
            strong: ({ children }) => <strong className="font-semibold text-[#1a1a1a]">{children}</strong>,
            em: ({ children }) => <em className="italic">{children}</em>,
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-[#e5e5e5]">
        <p className="text-sm text-[#666]">
          Thanks for reading.{" "}
          <Link href="/blog" className="text-[#1a1a1a] hover:underline">
            Read more posts
          </Link>
          {" "}or{" "}
          <a href="mailto:andu.scheusan@gmail.com" className="text-[#1a1a1a] hover:underline">
            get in touch
          </a>
          .
        </p>
      </footer>
    </article>
  );
}