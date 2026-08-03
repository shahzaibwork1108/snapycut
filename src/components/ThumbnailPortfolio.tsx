import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { X } from "lucide-react";
import { useSiteContent } from "../context/SiteContentContext";
import { getThumbnailRows, getSection } from "../lib/defaultContent";

interface ThumbnailPortfolioProps {
  onOpenBooking: () => void;
}

export default function ThumbnailPortfolio({ onOpenBooking }: ThumbnailPortfolioProps) {
  const { content } = useSiteContent();
  const section = getSection(content, "thumbnails");
  const [isPlaying] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Prevent body scrolling when lightbox is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [selectedImage]);

  const rows = getThumbnailRows(content);

  return (
    <section className="relative pt-10 pb-16 bg-[#010101] overflow-hidden border-t border-neutral-900/40">
      <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[85%] h-[300px] rounded-full bg-[#c1eb40]/10 blur-[140px] pointer-events-none" />

      <div className="w-full relative z-10 text-center">
        <div>
          <h2 className="text-4xl text-center sm:text-6xl font-black font-cabinet text-white tracking-tight mb-3">
            <span className="relative inline-block bg-clip-text text-transparent bg-gradient-to-b from-[#c1eb40] to-[#e0f5a0] px-1">
              {section.title}
              <svg className="absolute left-0 bottom-[-8px] w-full h-3" viewBox="0 0 160 8" fill="none">
                <path d="M1 6C35 2 110 2 159 4" stroke="#c1eb40" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-neutral-500">{section.title_highlight}</span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-md mx-auto">{section.subtitle}</p>
        </div>

        {rows.map((row, i) => (
          <div key={i} className="relative w-full overflow-hidden py-3">
            <motion.div className="flex items-center gap-6 w-max px-4" animate={isPlaying ? { x: i % 2 === 0 ? ["-33.333%", 0] : [0, "-33.333%"] } : {}} transition={{ ease: "linear", duration: 30, repeat: Infinity }}>
              {[...row, ...row, ...row].map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className="flex-shrink-0 w-[300px] sm:w-[460px] md:w-[520px] aspect-[16/9] rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800/80 shadow-2xl cursor-pointer group"
                >
                  <img src={img} alt="portfolio" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
              ))}
            </motion.div>
          </div>
        ))}


      </div>
      {/* Lightbox Popup (Portaled to body to avoid z-index & overflow clipping) */}
      {selectedImage && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8" onClick={() => setSelectedImage(null)}>
          <button 
            className="absolute top-4 right-4 sm:top-8 sm:right-8 z-50 text-white bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors"
            onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
          >
            <X size={28} />
          </button>
          <img 
            src={selectedImage} 
            alt="Full view" 
            className="w-auto h-auto max-w-[90vw] max-h-[90vh] object-contain rounded-xl shadow-2xl" 
            onClick={(e) => e.stopPropagation()} 
          />
        </div>,
        document.body
      )}
    </section>
  );
}
