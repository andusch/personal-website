import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="space-y-8 animate-slide-up">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1a1a1a]">
            Ioan-Alexandru Scheusan
          </h1>
          <p className="text-lg md:text-xl text-[#666] font-medium">
            Student.Researcher.Builder.
          </p>
        </div>

        <p className="text-xl md:text-2xl leading-relaxed text-[#1a1a1a] max-w-2xl" style={{ fontFamily: 'var(--font-lora), serif' }}>
          I enjoy exploring the different field of computer science and physics, from gravity computing to computer networking, and I&apos;m always looking for new ways to apply my knowledge and skills to real-world problems.
        </p>
      </section>

      {/* Bio Section */}
      <section className="space-y-6 animate-slide-up stagger-1">
        <div className="prose-custom max-w-2xl" style={{ fontFamily: 'var(--font-lora), serif' }}>
          <p>
            I&apos;m currently a senior high school student at Moisil
          </p>
          
          <p>
            I believe in building things that solve real problems. Whether it&apos;s developing 
            computer vision systems for healthcare or creating VR simulations for pilot training, 
            I&apos;m driven by the potential of technology to make a tangible impact on people&apos;s lives.
          </p>
        </div>
      </section>

      {/* Current Focus */}
      <section className="animate-slide-up stagger-2">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[#666] mb-4">
          Currently
        </h2>
        <ul className="space-y-3 text-[#1a1a1a]">
          <li className="flex items-start gap-3">
            <span className="text-[#999] mt-1.5">•</span>
            <span>Researching Apache Spark</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#999] mt-1.5">•</span>
            <span>Building [Distributed Key-Value Store]</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#999] mt-1.5">•</span>
            <span>Reading <em>The Beginning of Infinity</em> by David Deutsch</span>
          </li>
        </ul>
      </section>

      {/* Contact / Connect */}
      <section className="animate-slide-up stagger-3 pt-8 border-t border-[#e5e5e5]">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[#666] mb-4">
          Connect
        </h2>
        <div className="flex flex-wrap gap-6">
          <a 
            href="https://github.com/andusch" 
            target="_blank" 
            rel="noopener noreferrer"
            className="link-hover text-[#1a1a1a] hover:text-[#666] transition-colors"
          >
            GitHub
          </a>
          <a 
            href="https://linkedin.com/in/ioan-alexandru-scheusan" 
            target="_blank" 
            rel="noopener noreferrer"
            className="link-hover text-[#1a1a1a] hover:text-[#666] transition-colors"
          >
            LinkedIn
          </a>
          <a 
            href="mailto:andu.scheusan@gmail.com"
            className="link-hover text-[#1a1a1a] hover:text-[#666] transition-colors"
          >
            Email
          </a>
        </div>
      </section>
    </div>
  );
}