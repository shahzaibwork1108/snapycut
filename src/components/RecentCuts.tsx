import React, { useRef, useState, useEffect } from "react";
import { useSiteContent } from "../context/SiteContentContext";
import { getVideoUrls, getSection } from "../lib/defaultContent";
import LazyYouTube from "./LazyYouTube";

// ─── Single video card with IntersectionObserver play/pause ───────────────
const HorizontalVideo = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Extract YouTube ID if it's a YT link
  const ytMatch = src?.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  const ytId = ytMatch ? ytMatch[1] : null;

  useEffect(() => {
    if (ytId) return; // Do not apply observer to iframe, it handles its own autoplay
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playbackRate = 0.8;
    video.autoplay = true;
    video.playsInline = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.load();
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.2 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [ytId]);

  if (ytId) {
    return (
      <div 
        className="w-full h-full relative overflow-hidden bg-black"
        style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
      >
        <div className="absolute inset-0">
          <LazyYouTube youtubeId={ytId} title={`Video ${ytId}`} className="w-full h-full" />
        </div>
        {/* transparent overlay removed — LazyYouTube controls interaction */}
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      src={src}
      className="w-full h-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="none"
    />
  );
};

// ─── Short Form Video Component ──────────────────────────────────────────
const IntersectionVideo = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isVisibleRef = useRef(false);
  const [hasLoadedFrame, setHasLoadedFrame] = useState(false);

  // Extract YouTube ID if it's a YT link
  const ytMatch = src?.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  const ytId = ytMatch ? ytMatch[1] : null;

  useEffect(() => {
    if (ytId) return; // Do not apply observer to iframe
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playbackRate = 0.8;
    video.autoplay = true;
    video.playsInline = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
          if (entry.isIntersecting) {
            video.load();
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      {
        root: null,
        rootMargin: "50px",
        threshold: 0.3,
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [ytId]);

  if (ytId) {
    return (
      <div 
        className="w-full h-[280px] sm:h-[400px] relative overflow-hidden bg-black"
        style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
      >
        <div className="absolute inset-0">
          <LazyYouTube youtubeId={ytId} title={`Short video ${ytId}`} className="w-full h-full" />
        </div>
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      src={src}
      className="w-full h-[280px] sm:h-[400px] object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      onLoadedData={() => setHasLoadedFrame(true)}
      onCanPlay={() => { /* noop */ }}
    />
  );
};

// ─── 18 horizontal videos (16:9) ─────────────────────────────────────────

interface RecentCutsProps {
  onOpenBooking: () => void;
}

function RecentCuts({ onOpenBooking }: RecentCutsProps) {
  // Performance optimizations:
  // - Use `LazyYouTube` for YouTube entries to avoid loading iframe/YouTube JS until user interaction.
  // - Set native <video> to `preload="none"` and disabled autoplay-on-visibility.
  // - Component memoized with React.memo to avoid unnecessary re-renders.
  const { content } = useSiteContent();
  const section = getSection(content, "recent_cuts");
  const videos = getVideoUrls("saas_horizontal", content);
  const shortVideos = getVideoUrls("saas_short", content);

  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const [isShortHovered, setIsShortHovered] = useState(false);
  const scrollAmountRef = useRef<number>(0);

  // Duplicate videos 3× so the seamless loop has plenty of runway
  const loopedVideos = [...videos, ...videos, ...videos];
  
  // Smooth infinite loop ke liye duplicate
  const duplicatedShortVideos = [...shortVideos, ...shortVideos];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    let isVisible = false;
    const observer = new IntersectionObserver((entries) => {
        isVisible = entries[0].isIntersecting;
    });
    observer.observe(container);

    const speed = 0.8;

    const animate = () => {
      if (isVisible && !isShortHovered && container) {
        scrollAmountRef.current += speed;
        
        if (scrollAmountRef.current >= container.scrollWidth / 2) {
          scrollAmountRef.current = 0;
        }
        
        container.scrollLeft = scrollAmountRef.current;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      observer.disconnect();
    };
  }, [isShortHovered]);

  return (
    <section className="relative py-12 sm:py-16 bg-[#020202] overflow-hidden border-t border-neutral-900/40">

      {/* ── Headings ──────────────────────────────────────────────────── */}
      <div className="text-center mb-8 sm:mb-10 px-4">
        <div>
          <h3 className="text-2xl sm:text-5xl font-black text-white tracking-tight mb-2">
            <span className="relative inline-block bg-clip-text text-transparent bg-gradient-to-b from-[#c1eb40] to-[#c1eb40] px-1">
              {section.title}
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-neutral-500">{section.title_highlight}</span>
          </h3>
          <p className="text-neutral-400 text-xs sm:text-sm max-w-md mx-auto">{section.subtitle}</p>
        </div>
      </div>

      {/* ── Marquee Track (Short Form Vertical Videos) ──────────────── */}
      <div
        ref={scrollRef}
        className="w-full overflow-hidden relative z-10 mb-12 sm:mb-16"
        onMouseEnter={() => setIsShortHovered(true)}
        onMouseLeave={() => setIsShortHovered(false)}
      >
        <div className="flex gap-3 sm:gap-4 w-max px-3 sm:px-4">
          {duplicatedShortVideos.map((video, index) => (
            <div
              key={index}
              className="relative w-[180px] sm:w-[280px] flex-shrink-0 rounded-lg sm:rounded-xl overflow-hidden bg-neutral-900 shadow-md sm:shadow-2xl"
            >
              <IntersectionVideo src={video} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Marquee Track (Horizontal Videos) ───────────────────────── */}
      <div
        className="w-full overflow-hidden relative z-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          ref={trackRef}
          className="flex gap-4 w-max"
          style={{
            animation: `marquee-scroll 60s linear infinite`,
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {loopedVideos.map((src, idx) => (
            <div
              key={idx}
              /* 16:9 landscape card — not clickable */
              className="relative flex-shrink-0 aspect-video rounded-xl overflow-hidden bg-neutral-900 shadow-2xl"
              style={{ width: "clamp(320px, 30vw, 520px)" }}
            >
              <HorizontalVideo src={src} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Edge fade overlays ────────────────────────────────────────── */}
      <div className="absolute left-0 top-0 w-24 sm:w-40 h-full bg-gradient-to-r from-[#020202] to-transparent pointer-events-none z-20" />
      <div className="absolute right-0 top-0 w-24 sm:w-40 h-full bg-gradient-to-l from-[#020202] to-transparent pointer-events-none z-20" />

      {/* ── CSS keyframe injected via style tag ──────────────────────── */}
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
      `}</style>
    </section>
  );
}

export default React.memo(RecentCuts);
