import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useSiteContent } from "../context/SiteContentContext";
import { defaultContent, getSection } from "../lib/defaultContent";

export default function Testimonials() {
  const { content } = useSiteContent();
  const section = getSection(content, "testimonials");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const testimonialsList = content.testimonials.length
    ? content.testimonials
    : defaultContent.testimonials;

  const rafRef = useRef<number | null>(null);

  const checkScrollState = () => {
    rafRef.current = null;
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const handleScrollEvent = () => {
    // Throttle layout reads with requestAnimationFrame to avoid forced reflows
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(checkScrollState);
    }
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener("scroll", handleScrollEvent);
      checkScrollState();
    }
    return () => {
      el?.removeEventListener("scroll", handleScrollEvent);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmt = 420;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmt : scrollAmt,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="relative py-24 bg-black z-20 overflow-visible" id="testimonials-section">

      <div className="hidden sm:block absolute top-[-15%] -left-[20%] sm:-left-[15%] w-[550px] sm:w-[650px] h-[650px] rounded-full bg-[#c1eb40]/28 blur-[140px] pointer-events-none select-none z-0" />
      <div className="hidden sm:block absolute -bottom-[28%] -right-[15%] w-[600px] sm:w-[700px] h-[700px] rounded-full bg-[#c1eb40]/26 blur-[150px] pointer-events-none select-none z-0" />

      <div className="w-full relative z-10 bg-transparent">
        <div className="mb-16 text-center px-4" id="testimonials-header">
          <h2 className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-[#a4cc2b] to-[#e3ff80] bg-clip-text text-transparent pb-1">
            {section.title}
          </h2>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-transparent" id="testimonials-carousel-viewport">
          {showLeftArrow && (
            <button
              onClick={() => handleScroll("left")}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full bg-neutral-900/80 border border-neutral-800 text-neutral-400 flex items-center justify-center hover:text-white hover:bg-neutral-800 transition-all cursor-pointer"
              id="testi-scroll-left"
            >
              <ChevronLeft size={18} />
            </button>
          )}

          {showRightArrow && (
            <button
              onClick={() => handleScroll("right")}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full bg-neutral-900/80 border border-neutral-800 text-neutral-400 flex items-center justify-center hover:text-white hover:bg-neutral-800 transition-all cursor-pointer"
              id="testi-scroll-right"
            >
              <ChevronRight size={18} />
            </button>
          )}

          <div
            ref={scrollContainerRef}
            className="flex items-stretch gap-6 overflow-x-auto no-scrollbar pb-10 px-4 sm:px-2 select-none bg-transparent snap-x snap-mandatory pl-6 pr-6 sm:pl-8 sm:pr-8"
            id="testimonials-cards-scroller"
            style={{ scrollPaddingInline: '1rem' }}
          >
            {testimonialsList.map((testi, index) => (
              <div
                key={`${testi.id ?? testi.name}-${index}`}
                className="flex-shrink-0 w-[310px] sm:w-[380px] md:w-[380px] rounded-[2.2rem] bg-[#343433] py-6 px-8 sm:py-7 sm:px-10 flex flex-col justify-between transition-transform duration-300 snap-center sm:snap-start"
              >
                <div>
                  <div className="flex items-center gap-4">
                    <img
                      src={testi.avatar_url}
                      alt={testi.name}
                      referrerPolicy="no-referrer"
                      className="h-11 w-11 rounded-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="text-left">
                      <h4 className="text-sm font-bold text-neutral-100 leading-tight">{testi.name}</h4>
                      <p className="text-[11px] font-medium text-neutral-400 mt-0.5">{testi.role}</p>
                      <div className="flex items-center gap-0.5 mt-1" id="testi-row-stars">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={11} className="fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 text-left text-neutral-200 text-sm sm:text-[15px] font-normal leading-relaxed tracking-wide opacity-95">
                    "{testi.quote}"
                  </div>
                </div>
                <div className="mt-5 text-left">
                  <span className="text-sm font-bold text-neutral-100 tracking-wide">{testi.stat}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
