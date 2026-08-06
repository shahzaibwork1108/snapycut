import React, { useState, useRef } from "react";
import { useSiteContent } from "../context/SiteContentContext";
import { getYoutubeIds, getSection } from "../lib/defaultContent";
import LazyYouTube from "./LazyYouTube";

interface RecentCutsProps {
    onOpenBooking: () => void;
}

// Single card: autoplay muted, hover reveals custom mute button
const AvatarVideoCard = ({ videoId, index }: { videoId: string; index: number }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Use LazyYouTube so iframes are only created after user interaction.
    return (
        <div
            ref={containerRef}
            className="relative w-[180px] sm:w-[280px] aspect-[9/16] flex-shrink-0 rounded-lg sm:rounded-xl overflow-hidden bg-neutral-900 shadow-md sm:shadow-2xl group"
        >
            <div className="absolute inset-0 w-full h-full scale-[1.05]">
                <LazyYouTube youtubeId={videoId} title={`AI Avatar Video ${index}`} className="w-full h-full" />
            </div>

            {/* Bottom gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-20" />
        </div>
    );
};

function RecentCuts({ onOpenBooking }: RecentCutsProps) {
    const { content } = useSiteContent();
    const section = getSection(content, "ai_avatar");
    const [isHovered, setIsHovered] = useState(false);

    const videoIds = getYoutubeIds(content);
    const duplicatedVideos = [...videoIds, ...videoIds];

    return (
        <section className="relative pt-12 pb-6 sm:pt-16 sm:pb-8 bg-[#020202] overflow-hidden border-t border-neutral-900/40">
            {/* Headings */}
            <div className="text-center mb-8 sm:mb-10 px-4">
                <div className="mt-[-20px] sm:mt-[-50px]">
                    <h3 className="text-3xl sm:text-5xl font-black font-cabinet text-white tracking-tight mb-2">
                        <span className="relative inline-block bg-clip-text text-transparent bg-gradient-to-b from-[#c1eb40] to-[#c1eb40] px-1">
                            {section.title}
                        </span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-neutral-500">{section.title_highlight}</span>
                    </h3>
                    <p className="text-neutral-400 text-sm sm:text-base max-w-md mx-auto">{section.subtitle}</p>
                </div>
            </div>

            {/* Auto-scrolling Marquee — GPU-accelerated CSS transform */}
            <div
                className="w-full overflow-hidden relative z-10"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div
                    className="flex gap-3 sm:gap-4 w-max px-3 sm:px-4"
                    style={{
                        animation: `marquee-scroll-row3 40s linear infinite`,
                        animationPlayState: isHovered ? "paused" : "running",
                        willChange: "transform",
                    }}
                >
                    {duplicatedVideos.map((videoId, index) => (
                        <AvatarVideoCard key={`${videoId}-${index}`} videoId={videoId} index={index} />
                    ))}
                </div>
            </div>

            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 w-16 sm:w-32 h-full bg-gradient-to-r from-[#020202] via-[#020202]/40 sm:via-[#020202]/80 to-transparent pointer-events-none z-20" />
            <div className="absolute right-0 top-0 w-16 sm:w-32 h-full bg-gradient-to-l from-[#020202] via-[#020202]/40 sm:via-[#020202]/80 to-transparent pointer-events-none z-20" />

            <style>{`
                @keyframes marquee-scroll-row3 {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </section>
    );
}

export default React.memo(RecentCuts);