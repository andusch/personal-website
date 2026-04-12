export default function Home() {
  return (
    <main className="max-w-2xl mx-auto px-6 pb-24 page-fade font-serif">
      <h1 className="text-4xl font-bold font-sans mb-12 tracking-tighter">
        Ioan-Alexandru Scheusan
      </h1>
      
      <div className="space-y-8 text-[19px] leading-[1.6] text-gray-800">
        <p>
          I am a builder focused on systems that solve real problems. 
          I sit at the intersection of <span className="text-black font-medium italic">computer science, physics, philosophy, and entrepreneurship.</span>
        </p>

        <hr className="border-gray-100 my-12" />

        <div className="font-sans text-[12px] uppercase tracking-[0.2em] text-gray-400 mb-4">
          Status
        </div>
        <p className="text-base font-sans">
          Senior High Schooler • Aspiring CS @ NUS/NTU/CUHK/HKUST
        </p>
      </div>
    </main>
  );
}