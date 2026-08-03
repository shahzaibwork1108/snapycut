import { useSiteContent } from "../context/SiteContentContext";
import { getSection, getExtraCards } from "../lib/defaultContent";

export default function GrowthOptions() {
  const { content } = useSiteContent();
  const section = getSection(content, "growth_options");
  const cards = getExtraCards(section);

  return (
    <section className="bg-black text-white mt-[-180px] py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#c1eb40]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-6xl font-black font-cabinet tracking-tight mb-4">
            {section.title}{" "}
            <span className="relative inline-block bg-clip-text text-transparent bg-gradient-to-b from-[#c1eb40] to-[#e0f5a0] px-1">
              {section.title_highlight}
              <svg className="absolute left-0 bottom-[-6px] w-full h-3" viewBox="0 0 160 8" fill="none">
                <path d="M1 6C35 2 110 2 159 4" stroke="#c1eb40" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`group relative bg-neutral-900/40 border border-neutral-800 rounded-2xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 hover:border-[#c1eb40]/30 hover:bg-neutral-900/60 backdrop-blur-sm ${i === 1 ? "" : ""}`}
            >
              {i === 1 && (
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#c1eb40]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
              )}
              <div>
                <span
                  className={`inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-6 ${
                    i === 1
                      ? "text-black bg-[#c1eb40] shadow-[0_0_15px_rgba(193,235,64,0.3)]"
                      : "text-[#c1eb40] bg-[#c1eb40]/10"
                  }`}
                >
                  {card.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4">{card.title}</h3>
                <p className="text-neutral-400 leading-relaxed text-sm sm:text-base">{card.description}</p>
              </div>
              <div className="mt-8 pt-6 border-t border-neutral-800/60 group-hover:border-[#c1eb40]/10 flex items-center justify-between">
                <span className="text-sm font-medium text-neutral-400 group-hover:text-white transition-colors">{card.link_text}</span>
                <svg className="w-5 h-5 text-neutral-500 group-hover:text-[#c1eb40] group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
