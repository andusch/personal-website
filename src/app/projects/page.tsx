import { Metadata } from "next";
import { getProjects } from "@/lib/notion";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Projects",
  description: "A collection of projects spanning AI, robotics, web development, and hardware.",
};

// Fallback projects
const fallbackProjects = [
  {
    id: "1",
    title: "Hospital Panic Button System",
    year: 2024,
    description: "An IoT emergency response system for hospital environments...",
    tags: ["React Native", "Node.js", "IoT", "MQTT"],
    link: "#",
  },
  {
    id: "2",
    title: "VR Flight Simulator",
    year: 2023,
    description: "An immersive virtual reality flight training platform...",
    tags: ["Unity", "C#", "VR", "OpenXR"],
    link: "#",
  },
];

export default async function ProjectsPage() {
  let projects = fallbackProjects;
  
  try {
    const notionProjects = await getProjects();
    console.log("Projects from Notion:", notionProjects);
    
    if (notionProjects && notionProjects.length > 0) {
      // getProjects() already returns mapped data with title, description, etc.
      // No need to remap! Use directly:
      projects = notionProjects;
    }
  } catch (error) {
    console.log("Using fallback project data:", error);
  }

  return (
    <div className="space-y-12 animate-slide-up">
      {/* Header */}
      <section className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#1a1a1a]">
          Projects
        </h1>
        <p className="text-lg text-[#666] max-w-2xl" style={{ fontFamily: 'var(--font-lora), serif' }}>
          A collection of projects spanning AI, robotics, web development, and hardware. 
          Each one taught me something new about building things that matter.
        </p>
      </section>

      {/* Debug info - remove after confirming it works */}
      <div className="text-xs text-gray-400">
        Showing {projects.length} projects {projects !== fallbackProjects ? "(from Notion)" : "(fallback)"}
      </div>

      {/* Projects Grid */}
      <section className="grid gap-8 md:grid-cols-2">
        {projects.map((project) => (
          <article 
            key={project.id} 
            className="group p-6 md:p-8 rounded-lg bg-white border border-[#e5e5e5] hover:border-[#ccc] transition-all hover:shadow-sm"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-[#1a1a1a] mb-1 group-hover:text-[#444] transition-colors">
                    {project.title}
                  </h2>
                  <span className="text-sm text-[#999]">{project.year}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-[#666] leading-relaxed mb-6 flex-grow" style={{ fontFamily: 'var(--font-lora), serif' }}>
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map((tag: string) => (
                  <span 
                    key={tag}
                    className="text-xs px-2.5 py-1 bg-[#f5f5f5] text-[#666] rounded-full border border-[#e5e5e5]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Link */}
              {project.link && (
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#1a1a1a] hover:text-[#666] transition-colors link-hover"
                >
                  View project
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </a>
              )}
            </div>
          </article>
        ))}
      </section>

      {/* CTA */}
      <section className="pt-8 border-t border-[#e5e5e5] text-center">
        <p className="text-[#666]" style={{ fontFamily: 'var(--font-lora), serif' }}>
          Interested in collaborating?{" "}
          <a href="mailto:your.email@example.com" className="text-[#1a1a1a] underline underline-offset-4 hover:text-[#666] transition-colors">
            Let&apos;s talk
          </a>
          .
        </p>
      </section>
    </div>
  );
}