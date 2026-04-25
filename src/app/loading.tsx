export default function Loading() {
  return (
    <div className="py-20 text-center space-y-4 animate-slide-up">
      <p className="text-sm uppercase tracking-wide text-[#666] dark:text-[#999]">
        Loading
      </p>
      <div className="mx-auto h-1.5 w-48 overflow-hidden rounded-full bg-[#e5e5e5] dark:bg-[#333]">
        <div className="loading-slide h-full w-1/3 rounded-full bg-[#1a1a1a] dark:bg-[#fafafa]" />
      </div>
    </div>
  );
}
