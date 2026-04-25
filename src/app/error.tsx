"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="py-20 text-center space-y-6 animate-slide-up">
      <h2 className="text-3xl font-bold tracking-tight text-[#1a1a1a] dark:text-[#fafafa]">
        Something went wrong
      </h2>
      <p className="text-[#666] dark:text-[#999]">
        An unexpected error happened while loading this page.
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center rounded-md border border-[#e5e5e5] dark:border-[#333] px-4 py-2 text-sm text-[#1a1a1a] dark:text-[#fafafa] hover:bg-[#f5f5f5] dark:hover:bg-[#2a2a2a] transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
