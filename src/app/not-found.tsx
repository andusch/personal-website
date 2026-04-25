import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-20 text-center space-y-6 animate-slide-up">
      <h1 className="text-3xl font-bold tracking-tight text-[#1a1a1a] dark:text-[#fafafa]">
        Page not found
      </h1>
      <p className="text-[#666] dark:text-[#999]">
        The page you requested does not exist or may have moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-[#1a1a1a] dark:text-[#fafafa] hover:text-[#666] transition-colors"
      >
        Go back home
      </Link>
    </div>
  );
}
