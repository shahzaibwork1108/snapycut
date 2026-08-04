import { Link } from "react-router-dom";
import { useSiteContent } from "../context/SiteContentContext";
import { getImageUrl, getImageAlt, getSection, getExtraString } from "../lib/defaultContent";

interface NavbarProps {
  onOpenBooking?: () => void; // Isko optional (?) kar diya hai takay agar parent se remove na bhi karo to error na aaye
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const { content } = useSiteContent();
  const section = getSection(content, "navbar");
  const tagline = getExtraString(section, "tagline", "Powered by Synaryverse");
  const logoUrl = getImageUrl(content, "logo", "/assets/navbar/logo.png");
  const logoSrcSet =
    logoUrl === "/assets/navbar/logo.png"
      ? "/assets/navbar/logo.png 1x, /assets/navbar/logo-3.png 2x"
      : undefined;

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-40 border-b border-neutral-900/60 bg-black/60 backdrop-blur-md animate-fade-up"
      style={{ animationFillMode: "both" }}
      id="main-header"
    >
      {/* Mobile par top padding pt-1 aur desktop par pt-2 */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-1 sm:pt-2">
        
        {/* Mobile par total height h-16 (64px) aur badi screens par h-20 (80px) */}
        <div className="flex h-16 sm:h-20 items-center justify-between" id="navbar-container">

          {/* Logo Group */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group cursor-pointer" 
            id="brand-logo-group"
            onClick={() => {
              if (window.location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <div className="flex flex-col items-start">
              <img
                src={logoUrl}
                srcSet={logoSrcSet}
                alt={getImageAlt(content, "logo", "Snapycut Logo")}
                className="h-7 sm:h-10 w-auto object-contain transition-all"
                width="242"
                height="40"
                loading="eager"
                decoding="async"
              />
              {tagline && (
                <span className="text-[9px] text-neutral-500 mt-0.5">{tagline}</span>
              )}
            </div>
          </Link>

          <div id="nav-cta-action">
            <a
              href={section.cta_url || "https://calendly.com/snapycut/30min"}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center rounded-[5px] bg-[#c1eb40] px-3.5 py-2 sm:px-6 sm:py-3.5 text-[11px] sm:text-sm font-bold text-black transition-all shadow-[0_0_15px_rgba(193,235,64,0.35)] hover:bg-[#aed83a] hover:shadow-[0_0_20px_rgba(193,235,64,0.5)] active:scale-95 cursor-pointer hover:scale-[1.02] whitespace-nowrap"
              id="navbar-booking-btn"
            >
              {section.cta_text || "Book A Free Strategy Call"}
            </a>
          </div>

        </div>
      </div>
    </header>
  );
}