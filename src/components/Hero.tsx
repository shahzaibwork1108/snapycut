import { useEffect, useRef, useState } from "react";
import PortraitPlayer from "./PortraitPlayer";
import { useSiteContent } from "../context/SiteContentContext";
import { getImageUrl, getImageAlt, getSection } from "../lib/defaultContent";

interface HeroProps {
  onOpenBooking?: () => void; // Isko optional kar diya hai takay typing issue na aaye
}

export default function Hero({ onOpenBooking }: HeroProps) {
  const { content } = useSiteContent();
  const section = getSection(content, "hero");
  const heroVideo = content.videos.hero[0]?.url ?? "https://youtube.com/shorts/T-LO45f-59o?si=KcSAxQ2y5V_4txZY";
  const [shouldRenderPortrait, setShouldRenderPortrait] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldRenderPortrait(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );

    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen pt-45 pb-56 flex flex-col items-center justify-start overflow-hidden px-4 sm:px-6 lg:px-8 bg-[#030303]"
      id="hero-section"
      style={{ fontFamily: "'Cabinet Grotesk', sans-serif" }}
    >
      {/* ─── BACKGROUND SHADOW/IMAGE CONTAINER ────────────────────────── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden flex justify-center items-center">
        {(() => {
          const rawSrc = getImageUrl(content, "hero_bg", "/assets/hero/hero-bg-image-1.png");
          const optimizedSrc = rawSrc.includes("res.cloudinary.com")
            ? rawSrc.replace("/upload/", "/upload/f_avif,q_auto:low,w_1280/")
            : rawSrc;
          return (
            <img
              src={optimizedSrc}
              alt={getImageAlt(content, "hero_bg", "Hero Background Mesh")}
              className="w-full h-full object-cover opacity-80"
              fetchPriority="high"
              decoding="async"
              loading="eager"
              width="1200"
              height="900"
              sizes="(max-width: 768px) 100vw, 100vw"
            />
          );
        })()}
      </div>

      {/* Hero Outer Wrapper */}
      <div className="w-full max-w-7xl  mx-auto flex flex-col items-center text-center relative z-10" id="hero-wrapper">

        {/* Dynamic High Level Headline */}
        <div className="max-w-5xl" id="headline-container">
          <h1 className="text-[44px] sm:text-[84px] mt-8 font-black tracking-tight leading-[1.05] text-white flex flex-col items-center">

            {/* First Line: Post Every day. */}
            <div className="flex flex-wrap justify-center items-center gap-x-3 sm:gap-x-4">
              <span
                className="animate-fade-up"
                style={{ animationDelay: "0.2s", animationFillMode: "both" }}
              >
                {section.subtitle}
              </span>
              <span
                className="relative inline-block font-black italic px-2 pb-1 bg-gradient-to-t from-[#e5ff90] to-[#c1eb40] bg-clip-text text-transparent animate-fade-up"
                style={{ animationDelay: "0.3s", animationFillMode: "both" }}
                id="highlighted-everyday"
              >
                {section.title_highlight}

                {/* SVG Underline */}
                <svg
                  className="absolute left-0 -bottom-2 w-full h-4 text-[#c1eb40]"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 10C50 2 150 1 198 9"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Glowing star spark — CSS pulse animation */}
                <span
                  className="absolute -top-5 -right-6 sm:-top-7 sm:-right-10 text-white pointer-events-none drop-shadow-[0_0_12px_rgba(255,255,255,0.9)] w-8 h-8 animate-pulse"
                  id="white-accent-spark"
                >
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0C12 6.62742 17.3726 12 24 12C17.3726 12 12 17.3726 12 24C12 17.3726 6.62742 12 0 12C6.62742 12 12 6.62742 12 0Z" />
                  </svg>
                </span>
              </span>
            </div>

            {/* Second Line: Manage nothing. */}
            <span
              className="block text-white mt-2 sm:mt-4 font-black animate-fade-up"
              style={{ animationDelay: "0.4s", animationFillMode: "both" }}
            >
              {section.title}
            </span>
          </h1>
        </div>

        <p
          className="mt-8 text-base sm:text-[20px] text-neutral-400 max-w-[680px] leading-relaxed font-medium animate-fade-up"
          style={{ animationDelay: "0.5s", animationFillMode: "both" }}
          id="hero-subtext"
        >
          {section.description}
        </p>

        <div id="nav-cta-action" className="mt-10">
          <a
            href={section.cta_url || "https://calendly.com/snapycut/30min"}
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center rounded-[5px] bg-[#c1eb40] px-6 py-3.5 text-sm font-bold text-black transition-all hover:bg-[#aed83a] hover:shadow-[0_0_20px_rgba(193,235,64,0.5)] active:scale-95 cursor-pointer hover:scale-[1.02] whitespace-nowrap"
            id="primary-hero-cta"
          >
            {section.cta_text || "Book A Call"}
          </a>
        </div>

        {/* Portrait Player Component */}
        <div
          className="mt-14 w-full flex justify-center animate-fade-up"
          style={{ animationDelay: "0.7s", animationFillMode: "both" }}
          id="portrait-player-section"
        >
          <div className="w-full max-w-[600px] mx-auto">
            {shouldRenderPortrait ? (
              <PortraitPlayer
                onOpenBooking={() => console.log("Booking clicked")}
                videoUrl={heroVideo}
              />
            ) : null}
          </div>
        </div>

      </div>
    </section>
  );
} 