import { motion } from "motion/react";
import { useSiteContent } from "../context/SiteContentContext";
import { getSection, getExtraString } from "../lib/defaultContent";

interface CTASectionProps {
  onOpenBooking?: () => void;
}

export default function CTASection({ onOpenBooking }: CTASectionProps) {
  const { content } = useSiteContent();
  const section = getSection(content, "cta");
  const discountText = getExtraString(section, "discount_text", "Avail 50 percent discount by booking a call now");

  return (
    <section className="relative py-24 bg-black overflow-hidden border-t border-neutral-900/30" id="ready-to-post-cta-section">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#c1eb40]/8 blur-[120px] pointer-events-none select-none" />
      <div className="absolute bottom-1/4 left-[-10%] w-[450px] h-[450px] rounded-full bg-[#c1eb40]/6 blur-[130px] pointer-events-none select-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" id="cta-inner-viewport">
        <div className="relative rounded-[2.5rem] bg-gradient-to-br from-white/25 via-white/5 to-white/5 p-[1px] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)]">
          <div
            className="w-full rounded-[2.45rem] bg-[#121212]/50 backdrop-blur-2xl p-8 sm:p-16 md:p-20 text-center overflow-hidden relative"
            id="ready-to-post-card"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none" />

            <span className="block text-sm font-medium tracking-wide text-white mb-6 select-none" id="cta-badge">
              {section.subtitle}
            </span>

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-none select-none" id="cta-headline">
              {section.title.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="bg-gradient-to-b from-[#c1eb40] via-[#eafda7] to-white bg-clip-text text-transparent inline-block pb-1">
                {section.title.split(" ").slice(-1)[0]}
              </span>
              <br />
              <span className="block mt-3">
                {section.title_highlight.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="bg-gradient-to-b from-[#c1eb40] via-[#eafda7] to-white bg-clip-text text-transparent inline-block pb-1">
                  {section.title_highlight.split(" ").slice(-1)[0]}
                </span>
              </span>
            </h2>

            <p className="mt-8 max-w-2xl mx-auto text-neutral-300 text-sm sm:text-base leading-relaxed font-medium opacity-90" id="cta-description">
              {section.description}
            </p>

            <p className="mt-6 text-base sm:text-lg font-extrabold text-white/100 tracking-wide" id="cta-hook-discount">
              {discountText}
            </p>

            <div className="mt-8 flex justify-center" id="cta-action-holder">
              <a
                href={section.cta_url || "https://calendly.com/snapycut/30min"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-[5px] bg-[#c1eb40] hover:bg-[#b2d936] px-7 py-3.5 text-sm font-bold text-neutral-900 transition-all duration-300 hover:scale-[1.02] cursor-pointer shadow-lg layout"
                id="cta-schedule-btn"
              >
                {section.cta_text}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
