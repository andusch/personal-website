import { getProjects } from '@/lib/notion';

// CRITICAL: Ensure 'default' is included here
export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="max-w-2xl mx-auto px-6 py-12 md:py-20 font-serif">
      <h1 className="text-3xl font-bold font-sans mb-12 tracking-tight">Projects</h1>
      
      <div className="grid gap-16">
        {projects.length === 0 && (
          <p className="text-gray-500 italic font-sans">No projects found in Notion...</p>
        )}
        
        {projects.map((project: any) => {
          // Check if properties exist to avoid undefined errors
          const name = project.properties.Name?.title[0]?.plain_text || "Untitled Project";
          const desc = project.properties.Description?.rich_text[0]?.plain_text || "";
          const year = project.properties.Year?.number;
          const tech = project.properties.Tech?.multi_select || [];
          const link = project.properties.Link?.url;

          return (
            <article key={project.id} className="group">
              <div className="flex justify-between items-baseline mb-2">
                <h2 className="text-2xl font-bold font-sans group-hover:text-blue-600 transition-colors">
                  {name}
                </h2>
                <span className="text-sm font-sans text-gray-400">{year}</span>
              </div>
              
              <p className="text-lg leading-relaxed text-gray-700 mb-4">
                {desc}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {tech.map((t: any) => (
                  <span key={t.name} className="text-[11px] font-sans bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                    {t.name}
                  </span>
                ))}
              </div>

              {link && (
                <a 
                  href={link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm font-sans font-semibold underline decoration-gray-300 hover:decoration-black transition-all"
                >
                  View Case Study →
                </a>
              )}
            </article>
          );
        })}
      </div>
    </main>
  );
}