import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteContent } from "../context/SiteContentContext";
import { getImageUrl, getImageAlt, getSection, getExtraString } from "../lib/defaultContent";

export default function Footer() {
  const { content } = useSiteContent();
  const section = getSection(content, "footer");
  const logoUrl = getImageUrl(content, "logo", "/assets/navbar/logo.png");
  const logoSrcSet =
    logoUrl === "/assets/navbar/logo.png"
      ? "/assets/navbar/logo.png 1x, /assets/navbar/logo-3.png 2x"
      : undefined;

  const socialLinks = {
    facebook: getExtraString(section, "facebook", "https://www.facebook.com/Snapycut/"),
    instagram: getExtraString(section, "instagram", "https://www.instagram.com/snapycutcom/"),
    twitter: getExtraString(section, "twitter", "https://x.com/Snapycut"),
    linkedin: getExtraString(section, "linkedin", "https://www.linkedin.com/company/snapycut/"),
  };

  const copyright = getExtraString(section, "copyright", "Snapycut. All Rights Reserved.");

  return (
    <footer className="relative bg-black py-20 px-4 sm:px-6 lg:px-8 overflow-hidden" id="custom-snapycut-footer">
      <div className="absolute top-0 left-0 w-[500px] h-[350px] rounded-full bg-[#c1eb40]/4 blur-[140px] pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto" id="footer-inner-container">
        <div
          className="w-full rounded-[2.8rem] bg-[#111111] border border-white/5 p-10 sm:p-14 md:p-16 flex flex-col justify-between gap-16 shadow-[0_50px_120px_-30px_rgba(0,0,0,0.95)] min-h-[360px]"
          id="footer-card"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 md:gap-6 w-full">
            <div className="flex flex-col items-start text-left max-w-xl" id="footer-branding-left">
              <div className="flex items-center select-none mb-2" id="footer-branding-logo">
                <a href="/">
                  <img
                    src={logoUrl}
                    srcSet={logoSrcSet}
                    alt={getImageAlt(content, "logo", "Snapycut Logo")}
                    className="h-9 w-auto object-contain"
                  />
                </a>
              </div>

              <p className="mt-6 text-neutral-400 text-sm sm:text-base font-medium leading-relaxed whitespace-pre-line" id="footer-branding-description">
                {section.description}
              </p>
            </div>
    
            <div className="flex items-center gap-3.5 self-end md:self-auto" id="footer-socials-right">
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-white/40 hover:border-[#c1eb40] bg-transparent text-white flex items-center justify-center transition-all duration-300 hover:scale-105 hover:text-[#c1eb40]" aria-label="Facebook Link">
                <Facebook size={17} />
              </a>
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-white/40 hover:border-[#c1eb40] bg-transparent text-white flex items-center justify-center transition-all duration-300 hover:scale-105 hover:text-[#c1eb40]" aria-label="Instagram Link">
                <Instagram size={17} />
              </a>
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-white/40 hover:border-[#c1eb40] bg-transparent text-white flex items-center justify-center transition-all duration-300 hover:scale-105 hover:text-[#c1eb40]" aria-label="Twitter Link">
                <Twitter size={17} />
              </a>
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-white/40 hover:border-[#c1eb40] bg-transparent text-white flex items-center justify-center transition-all duration-300 hover:scale-105 hover:text-[#c1eb40]" aria-label="LinkedIn Link">
                <Linkedin size={17} />
              </a>
            </div>
          </div>

          <div className="w-full border-t border-white/5 pt-6 flex justify-center" id="footer-copyright-inside">
            <p className="text-[11px] sm:text-xs text-neutral-500 font-medium select-none tracking-wide text-center">
              Copyright &copy; 2026 Snapycut – a brand of SynaryVerse. All rights reserved.{" "}
              <Link to="/privacy-policy" className="underline hover:text-[#c1eb40] transition-colors">Privacy Policy</Link>
              {" "}and{" "}
              <Link to="/terms-conditions" className="underline hover:text-[#c1eb40] transition-colors">Terms &amp; Conditions</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
