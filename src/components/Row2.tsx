import { useRef, useState, useEffect } from "react";
import { useSiteContent } from "../context/SiteContentContext";
import { getVideoUrls, getSection } from "../lib/defaultContent";
import { Volume2, VolumeX } from "lucide-react";

// Detect touch device
const isTouchDevice = () => typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

// ─── Single 16:9 video card with lazy loading + mute button ──────────────────
const VideoCard = ({ src, index }: { src: string; index: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Extract YouTube ID if it's a YT link
  const ytMatch = src?.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
  const ytId = ytMatch ? ytMatch[1] : null;

  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isTouch] = useState(isTouchDevice);

  // For native video: play/pause based on visibility
  useEffect(() => {
    if (ytId) return;
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.2 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [ytId]);

  // Send postMessage command to YouTube iframe
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

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden bg-black group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {ytId ? (
        <>
            <iframe
              ref={iframeRef}
              className="absolute inset-0 w-full h-full pointer-events-none"
              src={`https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${ytId}&modestbranding=1&playsinline=1&enablejsapi=1&origin=${encodeURIComponent(typeof window !== 'undefined' ? window.location.origin : '')}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          {/* Transparent overlay to block iframe interaction */}
          <div className="absolute inset-0 z-10" />
        </>
      ) : (
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
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
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-20" />
    </div>
  );
};

interface RecentCutsProps {
  onOpenBooking: () => void;
}

export default function Row2({ onOpenBooking }: RecentCutsProps) {
  const { content } = useSiteContent();
  const section = getSection(content, "ai_video_ads");
  const demoVideos = getVideoUrls("ai_video_ads", content);

  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const scrollAmountRef = useRef<number>(0);

  // Duplicate videos so the seamless loop never shows a gap
  const loopedVideos = [...demoVideos, ...demoVideos];

  // Auto-scroll marquee at same speed as Row3 and ShortForm (0.8px/frame)
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
    <section className="relative py-12 bg-[#020202] overflow-hidden border-t border-neutral-900/40">

      {/* Headings Container */}
      <div className="text-center mb-10 px-4 space-y-8">
        <div>
          <h3 className="text-3xl sm:text-5xl mt-[-50px] font-black font-cabinet text-white tracking-tight mb-2">
            <span className="relative inline-block bg-clip-text text-transparent bg-gradient-to-b from-[#c1eb40] to-[#c1eb40] px-1">
              {section.title}
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-neutral-500">{section.title_highlight}</span>
          </h3>
          <p className="text-neutral-400 text-sm sm:text-base max-w-md mx-auto">{section.subtitle}</p>
        </div>
      </div>

      {/* ── Marquee Track ───────────────────────── */}
      <div
        ref={scrollRef}
        className="w-full overflow-hidden relative z-10 mb-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex gap-4 w-max px-3 sm:px-4">
          {loopedVideos.map((src, idx) => (
            <div
              key={idx}
              className="relative flex-shrink-0 aspect-[16/9] rounded-xl overflow-hidden bg-neutral-900 shadow-2xl"
              style={{ width: "clamp(300px, 30vw, 450px)" }}
            >
              <VideoCard src={src} index={idx} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Edge fade overlays ────────────────────────────────────────── */}
      <div className="absolute left-0 top-0 w-24 sm:w-40 h-full bg-gradient-to-r from-[#020202] to-transparent pointer-events-none z-20" />
      <div className="absolute right-0 top-0 w-24 sm:w-40 h-full bg-gradient-to-l from-[#020202] to-transparent pointer-events-none z-20" />
    </section>
  );
}