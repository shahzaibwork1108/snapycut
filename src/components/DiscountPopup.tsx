import { useState, useEffect, useRef, useCallback } from "react";
import { X, Sparkles, PhoneCall } from "lucide-react";
import { useSiteContent } from "../context/SiteContentContext";
import { getSection, getExtraString } from "../lib/defaultContent";

// Session-level flag — survives re-renders but not page refresh
let _popupClosed = false;

export default function DiscountPopup({ onOpenBooking }: { onOpenBooking: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const { content } = useSiteContent();
  // Store actual timer ID so we can clear it, and a flag to prevent re-scheduling after it fired
  const timerIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const firedRef = useRef(false);

  const popup = getSection(content, "discount_popup");
  const isActive = getExtraString(popup, "is_active", "true") !== "false";
  const badgeText = getExtraString(popup, "badge_text", "Limited Time Offer");
  const delaySeconds = Math.max(0, parseFloat(getExtraString(popup, "delay_seconds", "3")) || 3);

  useEffect(() => {
    // Don't show again if already shown/closed this session
    if (!isActive || _popupClosed || firedRef.current) return;

    // Clear any previous pending timer (e.g. delay changed from a Supabase update)
    if (timerIdRef.current) clearTimeout(timerIdRef.current);

    timerIdRef.current = setTimeout(() => {
      firedRef.current = true;
      if (!_popupClosed) setIsOpen(true);
    }, delaySeconds * 1000);

    return () => {
      if (timerIdRef.current) clearTimeout(timerIdRef.current);
    };
  }, [isActive, delaySeconds]);

  const handleClose = useCallback(() => {
    _popupClosed = true;
    setIsOpen(false);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      style={{ position: "fixed", inset: 0, zIndex: 9999 }}
      className="flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
    >
      <div className="relative w-full max-w-lg overflow-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-2xl shadow-[0_0_50px_-12px_rgba(155,187,56,0.3)] ring-1 ring-white/10">
        
        {/* Decorative glow */}
        <div
          style={{ pointerEvents: "none" }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-[#9bbb38] opacity-20 blur-[100px]"
        />

        {/* Close button — highest z-index */}
        <button
          type="button"
          onClick={handleClose}
          style={{ position: "absolute", top: 16, right: 16, zIndex: 10000 }}
          className="p-2 text-gray-400 hover:text-white hover:bg-white/10 transition-all rounded-full cursor-pointer"
          aria-label="Close popup"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="relative flex flex-col items-center text-center px-8 py-12 space-y-6" style={{ zIndex: 1 }}>
          
          {badgeText && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#9bbb38]/10 text-[#9bbb38] text-sm font-medium border border-[#9bbb38]/20">
              <Sparkles className="w-4 h-4" />
              <span>{badgeText}</span>
            </div>
          )}

          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
            {popup.title}
            <span className="text-[#9bbb38] drop-shadow-[0_0_15px_rgba(155,187,56,0.4)]">
              {popup.title_highlight}
            </span>
            {popup.subtitle}
          </h2>
          
          {popup.description && (
            <p className="text-gray-400 text-sm sm:text-base max-w-[80%]">
              {popup.description}
            </p>
          )}

          <button
            type="button"
            onClick={() => {
              handleClose();
              if (popup.cta_url) {
                window.open(popup.cta_url, "_blank");
              } else {
                onOpenBooking();
              }
            }}
            className="group inline-flex items-center justify-center gap-2 px-6 py-4 w-full bg-[#9bbb38] text-black font-bold text-base sm:text-lg rounded-xl transition-all duration-300 hover:bg-[#aee03f] hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(155,187,56,0.4)] hover:shadow-[0_0_30px_rgba(155,187,56,0.6)] cursor-pointer whitespace-nowrap"
          >
            <PhoneCall className="w-5 h-5 transition-transform group-hover:rotate-12" />
            {popup.cta_text || "Book A Free Strategy Call"}
          </button>
        </div>
      </div>
    </div>
  );
}
