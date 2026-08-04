import { useState } from "react";
import { Play, Pause, Star, ChevronRight, Volume2, VolumeX, Video } from "lucide-react";
import { useSiteContent } from "../context/SiteContentContext";
import { defaultContent, getSection } from "../lib/defaultContent";

interface ClientSayProps {
  onOpenBooking?: () => void; // Isko optional kar diya hai takay break na ho
}



export default function ClientSay({ onOpenBooking }: ClientSayProps) {
  const { content } = useSiteContent();
  const section = getSection(content, "client_say");
  const [isPlayingMikel, setIsPlayingMikel] = useState(false);
  const [isMutedMikel, setIsMutedMikel] = useState(false);
  const [isPlayingViktor, setIsPlayingViktor] = useState(false);
  const [isMutedViktor, setIsMutedViktor] = useState(false);

  const mikelTestimonial = content.clientSay.mikel ?? defaultContent.clientSay.mikel;
  const viktorTestimonial = content.clientSay.viktor ?? defaultContent.clientSay.viktor;

  return (
    <section className="relative py-24 bg-[#020202] overflow-hidden border-t border-neutral-900/40" id="client-say-section">
      {/* Background ambient light */}
      <div className="absolute top-[20%] left-1/3 -translate-x-1/2 w-[70%] h-[260px] rounded-full bg-purple-900/10 blur-[120px] pointer-events-none select-none" />
      <div className="absolute bottom-[20%] right-1/4 translate-x-1/2 w-[60%] h-[260px] rounded-full bg-purple-950/10 blur-[120px] pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Curved hand-painted text accent heading exact match */}
        <div className="mb-20 text-center" id="client-say-header">
          <h2 className="text-4xl sm:text-6xl font-black font-cabinet text-white tracking-tight flex items-center justify-center flex-wrap gap-x-3 gap-y-2 leading-tight">
            <span>{section.title}</span>
            <span className="relative inline-block bg-clip-text text-transparent bg-gradient-to-b from-[#c1eb40] to-[#e0f5a0] px-1">
              {section.title_highlight}
              <svg
                className="absolute left-0 bottom-[-8px] w-full h-3"
                viewBox="0 0 160 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 6C35 2 110 2 159 4"
                  stroke="#c1eb40"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
        </div>

        {/* Dynamic List of Testimonials */}
        <div className="space-y-32" id="client-testimonials-stack">

          {/* TESTIMONIAL 1: MIKEL (Video Left, Text Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="client-say-grid-mikel">

            {/* LEFT COLUMN: Testimonial video player element */}
            <div className="lg:col-span-5 flex justify-center w-full" id="mikel-visual-frame">
              <div
                className="relative w-full max-w-[430px] aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-neutral-950 border-4 border-[#c1eb40] shadow-[0_0_50px_rgba(168,85,247,0.15)] group transition-all duration-500 hover:shadow-[0_0_60px_rgba(168,85,247,0.3)] cursor-pointer"
                onClick={() => {
                  if (!isPlayingMikel) setIsPlayingMikel(true);
                }}
              >
                {/* Actual Image / Video Wrapper */}
                <div className="relative w-full h-full rounded-[2.3rem] overflow-hidden bg-[#090909]">
                  {/* Visual Video Poster / Mock Loop */}
                  {isPlayingMikel ? (
                    mikelTestimonial.video_url ? (
                      <video
                        src={mikelTestimonial.video_url}
                        controls
                        autoPlay
                        playsInline
                        controlsList="nodownload noplaybackrate" /* 3-dots menu hide karne ke liye */
                        disablePictureInPicture
                        crossOrigin="anonymous"
                        poster={mikelTestimonial.avatar_url}
                        onClick={(e) => e.stopPropagation()}
                        className="absolute inset-0 w-full h-full object-cover z-30 bg-black"
                      />
                    ) : (
                      <div className="absolute inset-0 w-full h-full bg-neutral-900 flex flex-col items-center justify-center z-30 text-neutral-400 p-6 text-center">
                        <Video size={36} className="mb-3 opacity-50" />
                        <p className="text-sm font-bold text-white">Video not available</p>
                        <p className="text-xs mt-1 opacity-70">Please check the video URL in admin.</p>
                      </div>
                    )
                  ) : (
                    <img
                      src={mikelTestimonial.avatar_url}
                      alt={mikelTestimonial.name}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-103 brightness-[0.75] contrast-[1.05]"
                      loading="lazy"
                      decoding="async"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/30 pointer-events-none" />

                  {!isPlayingMikel && (
                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                      <div className="relative flex items-center justify-center">
                        <span className="absolute inline-flex h-20 w-20 rounded-full bg-white/10 animate-ping" />
                        <div className="h-16 w-16 rounded-full bg-white/95 text-black flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110">
                          <Play size={24} fill="currentColor" className="ml-1 text-black" />
                        </div>
                      </div>
                    </div>
                  )}



                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-all duration-1000 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Mikel's text contents */}
            <div className="lg:col-span-7 text-left flex flex-col items-start lg:pl-6" id="mikel-text-frame">
              <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                <span className="text-neutral-400 font-medium">{mikelTestimonial.heading_light || "Real Results. Real "}</span> <br />
                <span className="text-[#C1EB40] font-extrabold">{mikelTestimonial.heading_highlight || "Content. Real Growth."}</span>
              </h3>

              <div className="mt-8 space-y-5 text-neutral-300 text-sm sm:text-[15px] leading-relaxed font-normal" id="mikel-paragraphs">
                {mikelTestimonial.journey.map((para, pIdx) => (
                  <p key={`p-${pIdx}`} className="text-neutral-300 opacity-90 font-medium">
                    {para}
                  </p>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-6 w-full" id="mikel-cta-line">
                {/* Converted to Calendly Anchor Tag */}
                <a
                  href={mikelTestimonial.cta_url || "https://calendly.com/snapycut/30min"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#C1EB40] px-6 sm:px-8 py-3.5 border border-[#C1EB40]/30 text-xs sm:text-sm font-bold text-black hover:bg-[#C1EB40] transition-all cursor-pointer"
                >
                  {mikelTestimonial.cta_text || "Book A free Strategy Call"} <ChevronRight size={16} />
                </a>

                <div className="flex flex-col items-start" id="mikel-rating-badge">
                  <div className="flex items-center gap-0.5" id="mikel-stars">
                    {[...Array(mikelTestimonial.rating_stars ?? 5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest mt-1">
                    {mikelTestimonial.rating_text || "5 Star rated agency"}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* TESTIMONIAL 2: VIKTOR (Text Left, Video Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="client-say-grid-viktor">
            {/* LEFT COLUMN: Viktor's text contents */}
            <div className="lg:col-span-7 lg:order-1 text-left flex flex-col items-start lg:pr-6" id="viktor-text-frame">
              <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                <span className="text-neutral-400 font-medium">{viktorTestimonial.heading_light || `${viktorTestimonial.name} Journey with`}</span> <br />
                <span className="text-[#C1EB40] font-extrabold">{viktorTestimonial.heading_highlight || "Snapycut"}</span>
              </h3>

              <div className="mt-8 space-y-5 text-neutral-300 text-sm sm:text-[15px] leading-relaxed font-normal" id="viktor-paragraphs">
                {viktorTestimonial.journey.map((para, pIdx) => (
                  <p key={`p-${pIdx}`} className="text-neutral-300 opacity-90 font-medium">
                    {para}
                  </p>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-6 w-full" id="viktor-cta-line">
                {/* Converted to Calendly Anchor Tag */}
                <a
                  href={viktorTestimonial.cta_url || "https://calendly.com/snapycut/30min"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#C1EB40] px-6 sm:px-8 py-3.5 border border-[#C1EB40]/30 text-xs sm:text-sm font-bold text-black hover:bg-[#C1EB40] transition-all cursor-pointer"
                >
                  {viktorTestimonial.cta_text || "Book A free Strategy Call"} <ChevronRight size={16} />
                </a>

                <div className="flex flex-col items-start" id="viktor-rating-badge">
                  <div className="flex items-center gap-0.5" id="viktor-stars">
                    {[...Array(viktorTestimonial.rating_stars ?? 5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-widest mt-1">
                    {viktorTestimonial.rating_text || "5 Star rated agency"}
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Testimonial video player element */}
            <div className="lg:col-span-5 lg:order-2 flex justify-center w-full" id="viktor-visual-frame">
              <div
                className="relative w-full max-w-[430px] aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-neutral-950 border-4 border-[#c1eb40] shadow-[0_0_50px_rgba(168,85,247,0.15)] group transition-all duration-500 hover:shadow-[0_0_60px_rgba(168,85,247,0.3)] cursor-pointer"
                onClick={() => {
                  if (!isPlayingViktor) setIsPlayingViktor(true);
                }}
              >
                {/* Actual Image / Video Wrapper */}
                <div className="relative w-full h-full rounded-[2.3rem] overflow-hidden bg-[#090909]">
                  {/* Visual Video Poster / Mock Loop */}
                  {isPlayingViktor ? (
                    viktorTestimonial.video_url ? (
                      <video
                        src={viktorTestimonial.video_url}
                        controls
                        autoPlay
                        playsInline
                        crossOrigin="anonymous"
                        poster={viktorTestimonial.avatar_url}
                        onClick={(e) => e.stopPropagation()}
                        className="absolute inset-0 w-full h-full object-cover z-30 bg-black"
                      />
                    ) : (
                      <div className="absolute inset-0 w-full h-full bg-neutral-900 flex flex-col items-center justify-center z-30 text-neutral-400 p-6 text-center">
                        <Video size={36} className="mb-3 opacity-50" />
                        <p className="text-sm font-bold text-white">Video not available</p>
                        <p className="text-xs mt-1 opacity-70">Please check the video URL in admin.</p>
                      </div>
                    )
                  ) : (
                    <img
                      src={viktorTestimonial.avatar_url}
                      alt={viktorTestimonial.name}
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-103 brightness-[0.75] contrast-[1.05]"
                      loading="lazy"
                      decoding="async"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/30 pointer-events-none" />

                  {!isPlayingViktor && (
                    <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                      <div className="relative flex items-center justify-center">
                        <span className="absolute inline-flex h-20 w-20 rounded-full bg-white/10 animate-ping" />
                        <div className="h-16 w-16 rounded-full bg-white/95 text-black flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110">
                          <Play size={24} fill="currentColor" className="ml-1 text-black" />
                        </div>
                      </div>
                    </div>
                  )}



                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-all duration-1000 pointer-events-none" />
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}