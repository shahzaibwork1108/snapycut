// Performance optimizations:
// - Replaced direct YouTube iframe with `LazyYouTube` to delay heavy third-party loads until user interaction.
// - Set local `<video>` to `preload="none"` to avoid downloading large media before user intent.
import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import LazyYouTube from "./LazyYouTube";

interface PortraitPlayerProps {
  onOpenBooking: () => void;
  videoUrl: string;
}

export default function PortraitPlayer({ onOpenBooking, videoUrl }: PortraitPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // Default sound on (false)
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Check if it's a YouTube URL
  const isYouTube = videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be");
  
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const youtubeId = isYouTube ? getYouTubeId(videoUrl) : null;

  useEffect(() => {
    if (isYouTube) return;

    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("loadedmetadata", updateDuration);

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("loadedmetadata", updateDuration);
    };
  }, [isYouTube]);

  const handleTogglePlay = () => {
    if (isYouTube) return;

    if (videoRef.current?.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isYouTube) return;

    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    
    if (videoRef.current) {
      videoRef.current.currentTime = percentage * duration;
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="w-full max-w-sm mx-auto my-6">
      {/* Aspect ratio change karke h-[600px] kiya hai taaki height kam ho jaye */}
      <div className="relative h-[600px] w-full rounded-2xl border-4 border-[#c1eb40] bg-neutral-950 overflow-hidden cursor-pointer group shadow-[0_0_40px_rgba(193,235,64,0.3)]">
        
        {isYouTube && youtubeId ? (
          // Use LazyYouTube so the heavy YouTube iframe is only created after user interaction
          <LazyYouTube youtubeId={youtubeId} title="Portrait video" className="w-full h-full" poster={undefined} />
        ) : (
          <>
            <video
              ref={videoRef}
              src={videoUrl}
              muted={isMuted}
              className="h-full w-full object-cover"
              onClick={handleTogglePlay}
              playsInline
              preload="none" // Avoid preloading large video bytes until user interacts
            />

            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20" onClick={handleTogglePlay}>
                <div className="h-16 w-16 rounded-full border-2 border-white/80 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                  <Play size={24} className="text-white fill-white ml-1" />
                </div>
              </div>
            )}

            {/* Controls ko neeche adjust kiya */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col gap-2">
              
              <div 
                className="w-full bg-neutral-700/50 rounded-full h-1.5 overflow-hidden cursor-pointer"
                onClick={handleSeek}
              >
                <div 
                  className="h-full bg-[#c1eb40] transition-[width] duration-[50ms] ease-linear"
                  style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                />
              </div>

              <div className="bg-black/80 backdrop-blur-md rounded-xl border border-neutral-800 p-2.5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button onClick={handleTogglePlay} className="h-7 w-7 rounded-lg bg-[#c1eb40] text-black flex items-center justify-center">
                    {isPlaying ? <Pause size={10} /> : <Play size={10} className="ml-0.5" />}
                  </button>
                  <button onClick={() => setIsMuted(!isMuted)} className="h-7 w-7 rounded-lg text-neutral-400 hover:text-white flex items-center justify-center">
                    {isMuted ? <VolumeX size={10} /> : <Volume2 size={10} />}
                  </button>
                </div>
                
                <div className="text-[9px] font-mono text-white bg-neutral-900 px-2 py-1 rounded-md border border-neutral-800">
                  {formatTime(currentTime)} / {formatTime(duration || 0)}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
