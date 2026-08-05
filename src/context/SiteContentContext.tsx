import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { getSupabase, isSupabaseConfigured } from "../lib/publicSupabase";
import { defaultContent } from "../lib/defaultContent";
import type { SiteContent, VideoSection, SectionKey } from "../types/content";

interface SiteContentContextValue {
  content: SiteContent;
  loading: boolean;
  refresh: () => Promise<void>;
}

const SiteContentContext = createContext<SiteContentContextValue>({
  content: defaultContent,
  loading: false,
  refresh: async () => {},
});

async function fetchSiteContent(): Promise<SiteContent> {
  const supabase = await getSupabase();
  if (!supabase) return defaultContent;

  const resp = await Promise.all([
    supabase.from("seo_settings").select("*").eq("id", 1).maybeSingle(),
    supabase.from("site_sections").select("*"),
    supabase.from("site_images").select("*"),
    supabase.from("thumbnail_images").select("*").order("row_index").order("sort_order"),
    supabase.from("site_videos").select("*").order("sort_order"),
    supabase.from("testimonials").select("*").order("sort_order"),
    supabase.from("client_testimonials").select("*"),
  ]) as any;
  const [seoRes, sectionsRes, imagesRes, thumbsRes, videosRes, testiRes, clientRes] = resp;

  const content: SiteContent = structuredClone(defaultContent);

  if (seoRes.data) {
    content.seo = {
      meta_title: seoRes.data.meta_title ?? content.seo.meta_title,
      meta_description: seoRes.data.meta_description ?? content.seo.meta_description,
      og_image_url: seoRes.data.og_image_url ?? "",
      og_image_alt: seoRes.data.og_image_alt ?? content.seo.og_image_alt,
    };
  }

  if (sectionsRes.data?.length) {
    for (const row of sectionsRes.data) {
      const key = row.section_key as SectionKey;
      if (content.sections[key]) {
        content.sections[key] = {
          title: row.title?.trim() ? row.title : content.sections[key].title,
          title_highlight: row.title_highlight?.trim() ? row.title_highlight : content.sections[key].title_highlight,
          subtitle: row.subtitle?.trim() ? row.subtitle : content.sections[key].subtitle,
          description: row.description?.trim() ? row.description : content.sections[key].description,
          cta_text: row.cta_text?.trim() ? row.cta_text : content.sections[key].cta_text,
          cta_url: row.cta_url?.trim() ? row.cta_url : content.sections[key].cta_url,
          extra: { ...content.sections[key].extra, ...(row.extra ?? {}) },
        };
      }
    }
  }

  if (imagesRes.data?.length) {
    for (const img of imagesRes.data) {
      if (img.cloudinary_url) {
        content.images[img.image_key] = {
          image_key: img.image_key,
          cloudinary_url: img.cloudinary_url,
          alt_text: img.alt_text ?? "",
        };
      }
    }
  }

  if (thumbsRes.data?.length) {
    content.thumbnails = thumbsRes.data.map((t: any) => ({
      id: t.id,
      cloudinary_url: t.cloudinary_url,
      alt_text: t.alt_text ?? "portfolio",
      row_index: t.row_index ?? 0,
      sort_order: t.sort_order ?? 0,
    }));
  }

  if (videosRes.data?.length) {
    const sections: VideoSection[] = [
      "hero", "short_form", "saas_short", "saas_horizontal", "ai_video_ads", "ai_avatar",
    ];
    for (const s of sections) content.videos[s] = [];

    for (const v of videosRes.data) {
      const section = v.section as VideoSection;
      if (content.videos[section]) {
        content.videos[section].push({
          id: v.id,
          section,
          url: v.url ?? "",
          youtube_id: v.youtube_id,
          sort_order: v.sort_order ?? 0,
        });
      }
    }

    for (const s of sections) {
      if (content.videos[s].length === 0) {
        content.videos[s] = defaultContent.videos[s];
      } else {
        content.videos[s].sort((a, b) => a.sort_order - b.sort_order);
      }
    }
  }

  if (testiRes.data?.length) {
    content.testimonials = testiRes.data.map((t: any) => ({
      id: t.id,
      name: t.name,
      role: t.role ?? "",
      company: t.company ?? "",
      avatar_url: t.avatar_url ?? "",
      quote: t.quote ?? "",
      stat: t.stat ?? "",
      sort_order: t.sort_order ?? 0,
    }));
  }

  if (clientRes.data?.length) {
    for (const c of clientRes.data) {
      content.clientSay[c.slug] = {
        id: c.id,
        slug: c.slug,
        name: c.name,
        role: c.role ?? "",
        avatar_url: c.avatar_url ?? "",
        video_url: c.video_url ?? "",
        quote: c.quote ?? "",
        journey: Array.isArray(c.journey) ? c.journey : [],
        rating_stars: c.rating_stars ?? 5,
        rating_text: c.rating_text ?? "",
        heading_light: c.heading_light ?? "",
        heading_highlight: c.heading_highlight ?? "",
        cta_text: c.cta_text ?? "",
        cta_url: c.cta_url ?? "",
      };
    }
  }

  return content;
}

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(() => {
    try {
      const cached = localStorage.getItem("snapycut_content_cache");
      if (cached) return JSON.parse(cached);
    } catch (e) {
      console.warn("Failed to parse cached content", e);
    }
    return defaultContent;
  });
  // loading=false if we have a cache (use it instantly), true only on first-ever visit with no cache
  const hasCachedContent = (() => {
    try { return !!localStorage.getItem("snapycut_content_cache"); } catch { return false; }
  })();
  const [loading, setLoading] = useState(isSupabaseConfigured && !hasCachedContent);

  const refresh = useCallback(async () => {
    if (!isSupabaseConfigured) return;
    setLoading(true);
    try {
      const data = await fetchSiteContent();
      setContent(data);
      try {
        localStorage.setItem("snapycut_content_cache", JSON.stringify(data));
      } catch (e) {
        console.warn("Failed to cache content", e);
      }
    } catch (e) {
      console.error("Failed to load site content:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Fetch immediately in background — no artificial delay
    refresh();
  }, [refresh]);

  return (
    <SiteContentContext.Provider value={{ content, loading, refresh }}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  return useContext(SiteContentContext);
}

export { fetchSiteContent };
