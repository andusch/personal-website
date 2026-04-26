import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-12 space-y-8 animate-slide-up">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-[#1a1a1a] dark:text-[#fafafa]">
          404: route not found
        </h1>
        <p className="text-[#666] dark:text-[#999] max-w-2xl" style={{ fontFamily: "var(--font-lora), serif" }}>
          Looks like this path drifted outside my current map. Try one of the stable routes below.
        </p>
      </div>

      <section className="rounded-lg border border-[#e5e5e5] dark:border-[#333] bg-white dark:bg-[#1a1a1a] p-5 md:p-6">
        <pre
          className="text-sm leading-6 text-[#666] dark:text-[#999] whitespace-pre-wrap"
          style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" }}
        >
{`[sys] 17:404:12 route_resolver: failed to match pathname
[warn] candidate route retired or moved
[hint] try /projects, /blog, /bookshelf or /tech-setup
[trace] curiosity_level=high, panic_level=0
[clue] if you enjoy hidden things, keep an eye on unusual URLs`}
        </pre>
      </section>

      <div className="flex flex-wrap gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#1a1a1a] dark:text-[#fafafa] hover:text-[#666] transition-colors link-hover"
        >
          Back home
        </Link>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-[#1a1a1a] dark:text-[#fafafa] hover:text-[#666] transition-colors link-hover"
        >
          Open projects
        </Link>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[#1a1a1a] dark:text-[#fafafa] hover:text-[#666] transition-colors link-hover"
        >
          Read blog
        </Link>
      </div>
    </div>
  );
}
