import React, { useEffect, useRef, useState, FC } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface Props {
  youtubeId: string;
  title?: string;
  className?: string;
  poster?: string; // optional thumbnail override
}

// Detect touch device
const isTouchDevice = () => typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

// LazyYouTube: renders a lightweight preview (thumbnail + play button).
// It only creates the heavy YouTube iframe after the user explicitly clicks
// the preview. This prevents YouTube JS/CSS from blocking the main thread
// or contributing to large network payloads until needed.
const LazyYouTube: FC<Props> = ({ youtubeId, title = "YouTube video", className = "", poster }) => {
  const [isIframeReady, setIsIframeReady] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch] = useState(isTouchDevice);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Preconnect to YouTube when the component becomes visible, to reduce latency
  useEffect(() => {
    if (!wrapperRef.current) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setIsInView(true);
      });
    }, { threshold: 0.1 });
    obs.observe(wrapperRef.current);
    return () => obs.disconnect();
  }, []);

  // When visible, requestIdleCallback or setTimeout to add preconnect hints
  useEffect(() => {
    if (!isInView) return;
    const addHints = () => {
      if (document.querySelector('link[data-lazy-youtube]')) return;
      const l1 = document.createElement('link');
      l1.setAttribute('rel', 'preconnect');
      l1.setAttribute('href', 'https://www.youtube.com');
      l1.setAttribute('data-lazy-youtube', '1');
      document.head.appendChild(l1);

      const l2 = document.createElement('link');
      l2.setAttribute('rel', 'preconnect');
      l2.setAttribute('href', 'https://i.ytimg.com');
      l2.setAttribute('data-lazy-youtube', '1');
      document.head.appendChild(l2);
    };

    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(addHints, { timeout: 2000 });
    } else {
      setTimeout(addHints, 2000);
    }
  }, [isInView]);

  // If component becomes visible, create the iframe automatically after idle/delay
  useEffect(() => {
    if (!isInView || isIframeReady) return;

    const activate = () => setIsIframeReady(true);

    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(activate, { timeout: 2000 });
    } else {
      const t = setTimeout(activate, 1500);
      return () => clearTimeout(t);
    }
  }, [isInView, isIframeReady]);

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
    if (isMuted) {
      sendCommand("unMute");
    } else {
      sendCommand("mute");
    }
    setIsMuted(!isMuted);
  };

  const thumbnail = poster || `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;

  // origin param is required for iOS Safari to allow postMessage & autoplay
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const embedSrc = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${youtubeId}&modestbranding=1&playsinline=1&enablejsapi=1&origin=${encodeURIComponent(origin)}`;

  // Ensure iframe is only created after explicit user interaction
  return (
    <div
      ref={wrapperRef}
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isIframeReady ? (
        <div className="lazy-youtube-preview relative w-full h-full bg-black" role="button" tabIndex={0} aria-label={`Play video: ${title}`} onClick={() => setIsIframeReady(true)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsIframeReady(true); }}>
          <img src={thumbnail} alt={title} loading="lazy" decoding="async" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-white/95 h-16 w-16 flex items-center justify-center shadow-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M8 5v14l11-7L8 5z" fill="#000" />
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <>
          <iframe
            ref={iframeRef}
            title={title}
            src={embedSrc}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            className="w-full h-full"
          />

          {/* Sound toggle button — always visible on touch devices, hover-only on desktop */}
          <button
            onClick={toggleMute}
            className={`absolute bottom-3 right-3 z-30 flex items-center justify-center w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 text-white transition-all duration-200 ${
              isTouch || isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
            } hover:bg-black/80 hover:border-[#c1eb40] hover:text-[#c1eb40] active:bg-black/80 active:border-[#c1eb40] active:text-[#c1eb40]`}
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </>
      )}
    </div>
  );
};

export default LazyYouTube;