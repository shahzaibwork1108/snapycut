import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Search, MessageSquare, Users, LogOut, ExternalLink,
  PanelTop, Sparkles, Layers, Film, Image, Megaphone, UserCircle, Quote, MousePointerClick, Footprints,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import { SECTION_ADMIN_CONFIG, SECTION_NAV_GROUPS } from "./lib/sectionAdminConfig";
import type { SectionKey } from "../types/content";

const sectionIcons: Partial<Record<SectionKey, typeof Sparkles>> = {
  navbar: PanelTop,
  hero: Sparkles,
  growth_options: Layers,
  short_form: Film,
  recent_cuts: Film,
  ai_video_ads: Megaphone,
  ai_avatar: UserCircle,
  thumbnails: Image,
  client_say: Users,
  testimonials: Quote,
  cta: MousePointerClick,
  footer: Footprints,
};

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase?.auth.signOut();
    navigate("/admin_1122");
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white flex">
      <aside className="w-64 border-r border-neutral-800 flex flex-col fixed h-full overflow-y-auto">
        <div className="p-6 border-b border-neutral-800">
          <h1 className="text-xl font-black">
            <span className="text-[#c1eb40]">Snapy</span>cut
          </h1>
          <p className="text-neutral-500 text-xs mt-1">Admin Dashboard</p>
        </div>

        <nav className="flex-1 p-4 space-y-4">
          <NavLink
            to="/admin_1122"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#c1eb40]/10 text-[#c1eb40] border border-[#c1eb40]/20"
                  : "text-neutral-400 hover:text-white hover:bg-neutral-900"
              }`
            }
          >
            <LayoutDashboard size={18} />
            Overview
          </NavLink>

          {SECTION_NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="px-4 mb-2 text-[10px] font-bold uppercase tracking-widest text-neutral-600">
                {group.label}
              </p>
              <div className="space-y-1">
                {group.items.map((key) => {
                  const Icon = sectionIcons[key] ?? Layers;
                  const label = SECTION_ADMIN_CONFIG[key].label;
                  return (
                    <NavLink
                      key={key}
                      to={`/admin_1122/section/${key}`}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-[#c1eb40]/10 text-[#c1eb40] border border-[#c1eb40]/20"
                            : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                        }`
                      }
                    >
                      <Icon size={16} />
                      {label}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}

          <div>
            <p className="px-4 mb-2 text-[10px] font-bold uppercase tracking-widest text-neutral-600">Content</p>
            <div className="space-y-1">
              <NavLink
                to="/admin_1122/testimonials"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#c1eb40]/10 text-[#c1eb40] border border-[#c1eb40]/20"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                  }`
                }
              >
                <MessageSquare size={16} />
                Testimonial Cards
              </NavLink>
              <NavLink
                to="/admin_1122/client-say"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#c1eb40]/10 text-[#c1eb40] border border-[#c1eb40]/20"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                  }`
                }
              >
                <Users size={16} />
                Client Profiles
              </NavLink>
              <NavLink
                to="/admin_1122/seo"
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#c1eb40]/10 text-[#c1eb40] border border-[#c1eb40]/20"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-900"
                  }`
                }
              >
                <Search size={16} />
                SEO Settings
              </NavLink>
            </div>
          </div>
        </nav>

        <div className="p-4 border-t border-neutral-800 space-y-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
          >
            <ExternalLink size={18} />
            View Website
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
