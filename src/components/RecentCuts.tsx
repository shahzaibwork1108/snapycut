import React, { useRef, useState, useEffect } from "react";
import { useSiteContent } from "../context/SiteContentContext";
import { getVideoUrls, getSection } from "../lib/defaultContent";
import { Volume2, VolumeX } from "lucide-react";
import LazyYouTube from "./LazyYouTube";

// Detect touch device
const isTouchDevice = () => typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

// ─── Single video card with IntersectionObserver play/pause + mute button ───
const HorizontalVideo = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isTouch] = useState(isTouchDevice);

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

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

  if (ytId) {
    return (
      <div 
        className="w-full h-full relative overflow-hidden bg-black"
        style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
      >
        <div className="absolute inset-0">
          <LazyYouTube youtubeId={ytId} title={`Video ${ytId}`} className="w-full h-full" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full h-full relative overflow-hidden bg-black group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />

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
    </div>
  );
};

// ─── Short Form Video Component with mute button ──────────────────────────
const IntersectionVideo = ({ src }: { src: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isTouch] = useState(isTouchDevice);

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
          if (entry.isIntersecting) {
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

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
    setIsMuted(!isMuted);
  };

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
    <div
      className="w-full h-[280px] sm:h-[400px] relative overflow-hidden bg-black group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />

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
    </div>
  );
};

// ─── 18 horizontal videos (16:9) ─────────────────────────────────────────

interface RecentCutsProps {
  onOpenBooking: () => void;
}

function RecentCuts({ onOpenBooking }: RecentCutsProps) {
  const { content } = useSiteContent();
  const section = getSection(content, "recent_cuts");
  const videos = getVideoUrls("saas_horizontal", content);
  const shortVideos = getVideoUrls("saas_short", content);

  const [isPaused, setIsPaused] = useState(false);
  const [isShortHovered, setIsShortHovered] = useState(false);

  // Duplicate videos once for seamless CSS transform loop
  const loopedVideos = [...videos, ...videos];
  
  // Duplicate short videos once for seamless CSS transform loop
  const duplicatedShortVideos = [...shortVideos, ...shortVideos];

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
        className="w-full overflow-hidden relative z-10 mb-12 sm:mb-16"
        onMouseEnter={() => setIsShortHovered(true)}
        onMouseLeave={() => setIsShortHovered(false)}
      >
        <div
          className="flex gap-3 sm:gap-4 w-max px-3 sm:px-4"
          style={{
            animation: `marquee-scroll-recent-short 40s linear infinite`,
            animationPlayState: isShortHovered ? "paused" : "running",
            willChange: "transform",
          }}
        >
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
          className="flex gap-4 w-max"
          style={{
            animation: `marquee-scroll-recent-horizontal 60s linear infinite`,
            animationPlayState: isPaused ? "paused" : "running",
            willChange: "transform",
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

      {/* ── CSS keyframes injected via style tag ──────────────────────── */}
      <style>{`
        @keyframes marquee-scroll-recent-short {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-scroll-recent-horizontal {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

export default React.memo(RecentCuts);