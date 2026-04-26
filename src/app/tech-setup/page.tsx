import { Metadata } from "next";

type SetupItem = {
  name: string;
  description: string;
};

type SetupCategory = {
  title: string;
  items: SetupItem[];
};

export const metadata: Metadata = {
  title: "Tech Setup",
  description: "The hardware, software, and tools I use to learn, build, and stay productive.",
};

const setupCategories: SetupCategory[] = [
  {
    title: "Hardware",
    items: [
      {
        name: "MacBook Air M1",
        description: "Laptop computer",
      },
      {
        name: "AOC Agon AG251FZ2E",
        description: "Secondary monitor",
      },
      {
        name: "Qwertykey K61Pro",
        description: "Main keyboard",
      },
      {
        name: "Logitech MX Keys Mini for Mac",
        description: "Secondary keyboard",
      },
      {
        name: "Razer Viper Mini",
        description: "Mouse",
      },
      {
        name: "iPad 10th Generation",
        description: "Tablet",
      },
      {
        name: "Apple Pencil 2",
        description: "Stylus",
      },
      {
        name: "Sony WH-1000XM5",
        description: "Headphones",
      },
    ],
  },
  {
    title: "Development",
    items: [
      {
        name: "Cursor",
        description: "Main text editor for coding",
      },
      {
        name: "VS Code",
        description: "Secondary text editor for competitive programming",
      },
      {
        name: "Git and GitHub",
        description: "Version control system",
      },
    ],
  },
  {
    title: "AI Tools",
    items: [
      {
        name: "Claude",
        description: "AI assistant for ideation, reviewing architecture options, and learning faster.",
      },
      {
        name: "GitHub Copilot",
        description: "AI assistant for repetitive code patterns and quick scaffolding.",
      },
      {
        name: "Ollama for Local AI",
        description: "Local AI models like Qwen2.5-7B-Instruct.",
      },
    ],
  },
  {
    title: "Productivity",
    items: [
      {
        name: "Notion",
        description: "Productivity tool for life management",
      },
      {
        name: "Notion Calendar",
        description: "Time-blocking for everything.",
      },
      {
        name: "Notion Mail",
        description: "Email management and productivity.",
      },
      {
        name: "Goodnotes",
        description: "For taking notes for school and reading.",
      },
    ],
  },
  {
    title: "Browser & Extensions",
    items: [
      {
        name: "Arc",
        description: "Best browser IMO",
      },
      {
        name: "uBlock Origin",
        description: "Block ads and trackers.",
      },
    ],
  },
];

export default function TechSetupPage() {
  return (
    <div className="space-y-12 animate-slide-up">
      <section className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1a1a1a] dark:text-[#fafafa]">
          Tech Setup
        </h1>
        <p
          className="text-lg text-[#666] dark:text-[#999] max-w-2xl"
          style={{ fontFamily: "var(--font-lora), serif" }}
        >
          A snapshot of the tools I currently use to study, build projects, and ship ideas
          quickly. This evolves often as I learn what helps me stay focused.
        </p>
      </section>

      <section className="space-y-8">
        {setupCategories.map((category) => (
          <div key={category.title} className="space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#666] dark:text-[#999]">
              {category.title}
            </h2>
            <div className="grid gap-4">
              {category.items.map((item) => (
                <article
                  key={item.name}
                  className="p-5 rounded-lg bg-white dark:bg-[#1a1a1a] border border-[#e5e5e5] dark:border-[#333]"
                >
                  <h3 className="text-base font-semibold text-[#1a1a1a] dark:text-[#fafafa]">
                    {item.name}
                  </h3>
                  <p
                    className="mt-2 text-[#666] dark:text-[#999] leading-relaxed"
                    style={{ fontFamily: "var(--font-lora), serif" }}
                  >
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
