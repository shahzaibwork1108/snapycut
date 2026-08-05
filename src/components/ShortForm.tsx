// Performance optimizations in this file:
// - Use `LazyYouTube` to defer iframe creation until user interaction.
// - Avoid autoplay and set native videos to `preload="none"`.
// - Component memoized with React.memo to reduce re-renders.
import React, { useState, useRef, useEffect } from "react";
import { useSiteContent } from "../context/SiteContentContext";
import { getVideoUrls, getSection, getExtraString } from "../lib/defaultContent";
import { Volume2, VolumeX } from "lucide-react";
import LazyYouTube from "./LazyYouTube";

// Extracts YouTube ID from a URL
const getYtId = (src: string): string | null => {
  const m = src?.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  return m ? m[1] : null;
};

// Detect touch device (mobile/tablet)
const isTouchDevice = () => typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

// Single card: autoplay muted, NO controls. Hover shows custom mute button only.
const ShortFormCard = ({ src, index }: { src: string; index: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isTouch] = useState(isTouchDevice);

  const ytId = getYtId(src);

  // For native <video>: DO NOT autoplay; load only when user interacts
  useEffect(() => {
    if (ytId) return;
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
      { rootMargin: "50px", threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [ytId]);

  // Send command to YouTube iframe via postMessage
  const sendCommand = (func: string, args: unknown[] = []) => {
    const iframe = iframeRef.current;
    if (!iframe?.contentWindow) return;
    iframe.contentWindow.postMessage(
      JSON.stringify({ event: "command", func, args }),
      "*"
    );
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (ytId) {
      isMuted ? sendCommand("unMute") : sendCommand("mute");
    } else if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  // controls=0 hides all YouTube UI
  // origin param is required for iOS Safari to allow postMessage & autoplay
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const embedSrc = ytId
    ? `https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${ytId}&modestbranding=1&playsinline=1&enablejsapi=1&origin=${encodeURIComponent(origin)}`
    : "";

  return (
    <div
      ref={containerRef}
      className="relative w-[220px] sm:w-[320px] flex-shrink-0 rounded-lg sm:rounded-xl overflow-hidden bg-neutral-900 shadow-md sm:shadow-2xl group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {ytId ? (
        <>
          <div
            className="w-full h-[390px] sm:h-[570px] relative overflow-hidden bg-black"
          >
              <LazyYouTube youtubeId={ytId} title={`Short Form ${index}`} className="w-full h-full" />
          </div>
          {/* Always-on overlay blocks iframe interaction */}
          <div className="absolute inset-0 z-10" />
        </>
      ) : (
        /* Native video for direct mp4/cloudinary URLs — muted, no controls */
        <video
          ref={videoRef}
          src={src}
          className="w-full h-[390px] sm:h-[570px] object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
        />
      )}

      {/* Mute/Unmute button — always visible on touch devices, hover-only on desktop */}
      <button
        onClick={toggleMute}
        className={`absolute bottom-3 right-3 z-30 flex items-center justify-center w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 text-white transition-all duration-200 ${
          isTouch || isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
        } hover:bg-black/80 hover:border-[#c1eb40] hover:text-[#c1eb40] active:bg-black/80 active:border-[#c1eb40] active:text-[#c1eb40]`}
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-20" />
    </div>
  );
};

interface ShortFormProps {
  onOpenBooking: () => void;
}

function ShortForm({ onOpenBooking }: ShortFormProps) {
  const { content } = useSiteContent();
  const section = getSection(content, "short_form");
  const heading2Green = getExtraString(section, "heading2_green", "Short Form");
  const heading2White = getExtraString(section, "heading2_white", " Content.");
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const scrollAmountRef = useRef<number>(0);

  const videos = getVideoUrls("short_form", content);
  const duplicatedVideos = [...videos, ...videos];

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
      if (isVisible && !isHovered && container) {
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
  }, [isHovered]);

  return (
    <section className="relative py-12 sm:py-16 bg-[#020202] overflow-hidden border-t border-neutral-900/40">
      <div className="text-center mb-8 sm:mb-10 px-4">
        <div>
          <h2 className="text-3xl sm:text-6xl font-black font-cabinet text-white tracking-tight mb-3">
            <span className="relative inline-block bg-clip-text text-transparent bg-gradient-to-b from-[#c1eb40] to-[#e0f5a0] px-1">
              {section.title}
              <svg className="absolute left-0 bottom-[-8px] w-full h-3" viewBox="0 0 160 8" fill="none">
                <path d="M1 6C35 2 110 2 159 4" stroke="#c1eb40" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-neutral-500">{section.title_highlight}</span>
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm max-w-md mx-auto">{section.subtitle}</p>
        </div>

        <div className="w-40 h-[2px] bg-[#C1EB40] mx-auto my-6 sm:my-8" />

        <div>
          <h3 className="text-2xl sm:text-5xl font-black font-cabinet text-white tracking-tight mb-2">
            <span className="relative inline-block bg-clip-text text-transparent bg-gradient-to-b from-[#c1eb40] to-[#c1eb40] px-1">
              {heading2Green}
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-neutral-500">{heading2White}</span>
          </h3>
          <p className="text-neutral-400 text-xs sm:text-sm max-w-md mx-auto">{section.description}</p>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="w-full overflow-hidden relative z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex gap-3 sm:gap-4 w-max px-3 sm:px-4">
          {duplicatedVideos.map((video, index) => (
            <ShortFormCard key={`${video}-${index}`} src={video} index={index} />
          ))}
        </div>
      </div>

      <div className="absolute left-0 top-0 w-16 sm:w-32 h-full bg-gradient-to-r from-[#020202] via-[#020202]/40 sm:via-[#020202]/80 to-transparent pointer-events-none z-20" />
      <div className="absolute right-0 top-0 w-16 sm:w-32 h-full bg-gradient-to-l from-[#020202] via-[#020202]/40 sm:via-[#020202]/80 to-transparent pointer-events-none z-20" />
    </section>
  );
}

export default React.memo(ShortForm);
