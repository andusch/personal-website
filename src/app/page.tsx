import { Metadata } from "next";

import GitHubContributions from "@/components/GitHubContributions";

export const metadata: Metadata = {
  title: "About",
};

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="space-y-8 animate-slide-up">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-
          5xl font-bold tracking-tight text-[#1a1a1a]">
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

      {/* GitHub Section */}
      <section className="animate-slide-up stagger-1">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-[#666] mb-4">
          GitHub Activity
        </h2>
        <GitHubContributions />
        <p className="mt-3 text-sm text-[#666]">
          <a href="https://github.com/andusch" target="_blank" rel="noopener norefferer" className="link-hover text-[#1a1a1a]">
            View profile →
          </a>
        </p>
      </section>

      {/* Bio Section */}
      <section className="space-y-6 animate-slide-up stagger-1">
        <div className="prose-custom max-w-2xl" style={{ fontFamily: 'var(--font-lora), serif' }}>
          <p>
            I&apos;m a senior high school student at {" "} 
            <a
              href="https://info.tm.edu.ro"
              target="_blank"
              rel="noopener noreferrer"
              className="link-hover text-[#1a1a1a] font-medium"
              >Liceul Teoretic "Grigore Moisil" Timisoara </a>.
               Hopefully pursuing a Computer Science / Computer Engineering bachelor at {" "}
              <a
              href="https://nus.edu.sg/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-hover text-[#1a1a1a] font-medium"
              >NUS</a>, {" "}
              <a
              href="https://www.ntu.edu.sg/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-hover text-[#1a1a1a] font-medium"
              >NTU</a>, {" "}
              <a
              href="https://www.cuhk.edu.hk/english/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="link-hover text-[#1a1a1a] font-medium"
              >CUHK</a>, or {" "}
              <a
              href="https://hkust.edu.hk/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-hover text-[#1a1a1a] font-medium"
              >HKUST</a>
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
            <span>Digging into {" "} <a href="https://static.googleusercontent.com/media/research.google.com/en//archive/mapreduce-osdi04.pdf" target="_blank" rel="noopener noreferrer" className="link-hover text-[#1a1a1a] font-medium">MapReduce</a>  and {" "} <a href="https://www.usenix.org/legacy/event/hotcloud10/tech/full_papers/Zaharia.pdf" target="_blank" rel="noopener noreferrer" className="link-hover text-[#1a1a1a] font-medium">Apache Spark</a></span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#999] mt-1.5">•</span>
            <span>Building a <a href="https://github.com/andusch/distributed-key-value-store" target="_blank" rel="noopener noreferrer" className="link-hover text-[#1a1a1a] font-medium">Distributed Key-Value Store in Go</a></span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#999] mt-1.5">•</span>
            <span>Reading <em>The Idiot</em> by Fyodor Dostoevsky</span>
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