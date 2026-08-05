import { useState } from "react";
import { ChevronRight } from "lucide-react";

interface CreativesPortfolioProps {
  onOpenBooking: () => void;
}

export default function CreativesPortfolio({ onOpenBooking }: CreativesPortfolioProps) {
  const [isPlaying] = useState(true);

  // Clean data: Sirf images
  const row1Creatives = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhLjJVKnOuEnn5D49yefXjinz8DbnRgCOkfQ&s",
    "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=600&h=600&q=80"
  ];

  const row2Creatives = [
    "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&h=600&q=80",
    // "https://images.unsplash.com/photo-1589330694653-ded6df53f6ee?auto=format&fit=crop&w=600&h=600&q=80",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&h=600&q=80"
  ];

  const duplicatedRow1 = [...row1Creatives, ...row1Creatives, ...row1Creatives];
  const duplicatedRow2 = [...row2Creatives, ...row2Creatives, ...row2Creatives];

  return (
    <section className="relative py-24 bg-[#010101] overflow-hidden border-t border-neutral-900/40" id="creatives-portfolio-section">
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[80%] h-[280px] rounded-full bg-purple-950/20 blur-[130px] pointer-events-none select-none" />

      <div className="w-full relative z-10 text-center">
        <div className="mb-14 flex flex-col items-center justify-center max-w-7xl mx-auto px-4" id="creatives-header">
          <h2 className="text-4xl sm:text-6xl font-black font-cabinet text-white tracking-tight flex items-center justify-center flex-wrap gap-x-3 leading-tight">
            <span className="relative inline-block bg-clip-text text-transparent bg-gradient-to-b from-[#c1eb40] to-[#e0f5a0] px-1">
              Creatives
              <svg className="absolute left-0 bottom-[-8px] w-full h-3" viewBox="0 0 160 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 6C35 2 110 2 159 4" stroke="#c1eb40" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
            <span className="text-white font-black">Portfolio</span>
          </h2>
        </div>

        {/* Row 1 */}
        <div className="relative w-full overflow-hidden py-4">
          <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#010101] via-[#010101]/40 to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#010101] via-[#010101]/40 to-transparent z-20 pointer-events-none" />
            <div className="flex items-center gap-8 w-max px-4 animate-marquee-left">
              {duplicatedRow1.map((img, idx) => (
                <div key={idx} className="flex-shrink-0 w-[240px] sm:w-[320px] md:w-[380px] aspect-square rounded-[2rem] overflow-hidden bg-neutral-950 border border-neutral-900 shadow-2xl group cursor-pointer">
                  <img src={img} alt="creative" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" />
                </div>
              ))}
            </div>
        </div>
        <div className="relative w-full overflow-hidden py-4 mt-4">
          <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#010101] via-[#010101]/40 to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#010101] via-[#010101]/40 to-transparent z-20 pointer-events-none" />
          <div className="flex items-center gap-8 w-max px-4 animate-marquee-right">
            {duplicatedRow2.map((img, idx) => (
              <div key={idx} className="flex-shrink-0 w-[240px] sm:w-[320px] md:w-[380px] aspect-square rounded-[2rem] overflow-hidden bg-neutral-950 border border-neutral-900 shadow-2xl group cursor-pointer">
                <img src={img} alt="creative" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        {/* <div className="mt-14 max-w-4xl mx-auto px-4 relative z-20 text-center">
          <button onClick={onOpenBooking} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#C1EB40] px-6 py-3.5 border border-[#C1EB40]/30 text-xs font-bold text-black hover:bg-[#aed83a] transition-all cursor-pointer">
            Claim Your Free Design Concepts Now <ChevronRight size={14} />
          </button>
        </div> */}
      </div>
    </section>
  );
}
