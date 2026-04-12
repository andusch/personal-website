export default function Home() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-12 md:py-24 font-serif">
      <h1 className="text-3xl font-bold mb-8 font-sans tracking-tight">
        Ioan-Alexandru Scheușan
      </h1>
      
      <section className="space-y-6 text-lg leading-relaxed text-gray-800">
        <p>
          I build systems that solve real problems for real people. 
          I’m not interested in coding for its own sake—I’m interested in building 
          infrastructure that actually runs in the world and makes a difference.
        </p>

        <div className="pt-8 font-sans text-sm uppercase tracking-widest text-gray-500">
          Current Focus
        </div>
        <p>
          Aspiring to study Computer Science at <strong>NUS, NTU, CUHK or HKUST</strong>, with a long-term 
          trajectory towards a PhD at Stanford or Berkeley focusing on 
          distributed systems and AI infrastructure.
        </p>
      </section>
    </main>
  );
}