import { Link } from "react-router-dom";
import { Search, MessageSquare, Users, ArrowRight } from "lucide-react";
import { SECTION_ADMIN_CONFIG, SECTION_NAV_GROUPS } from "../lib/sectionAdminConfig";
import type { SectionKey } from "../../types/content";

const contentCards = [
  { to: "/admin_1122/seo", icon: Search, title: "SEO Settings", desc: "Meta title, description, OG image" },
  { to: "/admin_1122/testimonials", icon: MessageSquare, title: "Testimonial Cards", desc: "Carousel review cards" },
  { to: "/admin_1122/client-say", icon: Users, title: "Client Profiles", desc: "Mikel & Viktor featured stories" },
];

export default function AdminOverview() {
  return (
    <div>
      <h2 className="text-2xl font-black text-white mb-2">Dashboard Overview</h2>
      <p className="text-neutral-500 text-sm mb-8">
        Har section alag se manage karo — heading, images, videos, navbar & footer.
      </p>

      {SECTION_NAV_GROUPS.map((group) => (
        <div key={group.label} className="mb-10">
          <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-4">{group.label}</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {group.items.map((key: SectionKey) => {
              const config = SECTION_ADMIN_CONFIG[key];
              return (
                <Link
                  key={key}
                  to={`/admin_1122/section/${key}`}
                  className="group bg-[#111] border border-neutral-800 rounded-xl p-5 hover:border-[#c1eb40]/30 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-white font-bold">{config.label}</h4>
                      <p className="text-neutral-500 text-xs mt-1 line-clamp-2">{config.description}</p>
                    </div>
                    <ArrowRight size={16} className="text-neutral-600 group-hover:text-[#c1eb40] transition-colors shrink-0 mt-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}

      <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider mb-4">Other Content</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {contentCards.map(({ to, icon: Icon, title, desc }) => (
          <Link
            key={to}
            to={to}
            className="group bg-[#111] border border-neutral-800 rounded-xl p-5 hover:border-[#c1eb40]/30 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="w-9 h-9 rounded-lg bg-[#c1eb40]/10 flex items-center justify-center mb-3">
                <Icon size={18} className="text-[#c1eb40]" />
              </div>
              <ArrowRight size={16} className="text-neutral-600 group-hover:text-[#c1eb40] transition-colors" />
            </div>
            <h4 className="text-white font-bold">{title}</h4>
            <p className="text-neutral-500 text-xs mt-1">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
