import { getPostContent } from "@/lib/notion";
import ReactMarkdown from "react-markdown";

export default async function BlogPost({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  const post = await getPostContent(slug);

  if (!post) return <div>Post not found</div>;

  return (
    <main className="max-w-2xl mx-auto px-6 py-20 font-serif">
      <h1 className="text-4xl font-bold font-sans mb-8">{post.title}</h1>
      <div className="prose prose-lg prose-stone">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </main>
  );
}
