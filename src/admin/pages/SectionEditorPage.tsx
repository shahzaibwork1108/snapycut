import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { defaultContent } from "../../lib/defaultContent";
import { defaultSections } from "../../lib/sectionDefaults";
import { SECTION_ADMIN_CONFIG } from "../lib/sectionAdminConfig";
import SiteImageEditor from "../components/SiteImageEditor";
import VideosEditor from "../components/VideosEditor";
import ThumbnailsEditor from "../components/ThumbnailsEditor";
import { Save, Loader2, CheckCircle, ExternalLink } from "lucide-react";
import type { SectionContent, SectionKey, SiteVideo, ThumbnailImage, VideoSection } from "../../types/content";

const inputClass =
  "w-full bg-[#0a0a0a] border border-neutral-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#c1eb40]";

export default function SectionEditorPage() {
  const { sectionKey } = useParams<{ sectionKey: SectionKey }>();
  const config = sectionKey ? SECTION_ADMIN_CONFIG[sectionKey] : null;

  const [section, setSection] = useState<SectionContent>(
    sectionKey ? defaultSections[sectionKey] : defaultSections.hero
  );
  const [siteImages, setSiteImages] = useState<Record<string, { url: string; alt: string }>>({});
  const [videos, setVideos] = useState<Record<VideoSection, SiteVideo[]>>(defaultContent.videos);
  const [thumbnails, setThumbnails] = useState<ThumbnailImage[]>(defaultContent.thumbnails);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!sectionKey || !config) return;

    const videoKeys = config.videoSections?.map((v) => v.key) ?? [];

    Promise.all([
      supabase?.from("site_sections").select("*").eq("section_key", sectionKey).maybeSingle(),
      supabase?.from("site_images").select("*"),
      videoKeys.length ? supabase?.from("site_videos").select("*").order("sort_order") : Promise.resolve({ data: null }),
      config.thumbnails ? supabase?.from("thumbnail_images").select("*").order("row_index").order("sort_order") : Promise.resolve({ data: null }),
    ]).then(([sectionRes, imagesRes, videosRes, thumbsRes]) => {
      if (sectionRes?.data) {
        setSection({
          title: sectionRes.data.title ?? defaultSections[sectionKey].title,
          title_highlight: sectionRes.data.title_highlight ?? defaultSections[sectionKey].title_highlight,
          subtitle: sectionRes.data.subtitle ?? defaultSections[sectionKey].subtitle,
          description: sectionRes.data.description ?? defaultSections[sectionKey].description,
          cta_text: sectionRes.data.cta_text ?? defaultSections[sectionKey].cta_text,
          cta_url: sectionRes.data.cta_url ?? defaultSections[sectionKey].cta_url,
          extra: { ...defaultSections[sectionKey].extra, ...(sectionRes.data.extra ?? {}) },
        });
      } else {
        setSection(defaultSections[sectionKey]);
      }

      const imgs: Record<string, { url: string; alt: string }> = {};
      for (const img of config.images ?? []) {
        const found = imagesRes?.data?.find((i) => i.image_key === img.key);
        imgs[img.key] = {
          url: found?.cloudinary_url || defaultContent.images[img.key]?.cloudinary_url || "",
          alt: found?.alt_text || defaultContent.images[img.key]?.alt_text || "",
        };
      }
      setSiteImages(imgs);

      if (videoKeys.length && videosRes?.data) {
        const grouped = { ...defaultContent.videos };
        for (const key of videoKeys) grouped[key] = [];
        for (const v of videosRes.data) {
          const s = v.section as VideoSection;
          if (grouped[s] && videoKeys.includes(s)) {
            grouped[s].push({
              id: v.id,
              section: s,
              url: v.url ?? "",
              youtube_id: v.youtube_id,
              sort_order: v.sort_order ?? 0,
            });
          }
        }
        for (const key of videoKeys) {
          if (grouped[key].length === 0) grouped[key] = defaultContent.videos[key];
          else grouped[key].sort((a, b) => a.sort_order - b.sort_order);
        }
        setVideos(grouped);
      }

      if (config.thumbnails) {
        if (thumbsRes?.data?.length) {
          setThumbnails(
            thumbsRes.data.map((t) => ({
              id: t.id,
              cloudinary_url: t.cloudinary_url,
              alt_text: t.alt_text ?? "portfolio",
              row_index: t.row_index ?? 0,
              sort_order: t.sort_order ?? 0,
            }))
          );
        } else {
          setThumbnails(defaultContent.thumbnails);
        }
      }

      setLoading(false);
    });
  }, [sectionKey, config]);

  const updateField = (field: keyof SectionContent, value: string) => {
    setSection((prev) => ({ ...prev, [field]: value }));
  };

  const updateExtra = (key: string, value: string) => {
    setSection((prev) => ({ ...prev, extra: { ...prev.extra, [key]: value } }));
  };

  const updateCard = (index: number, field: string, value: string) => {
    setSection((prev) => {
      const cards = Array.isArray(prev.extra.cards) ? [...(prev.extra.cards as object[])] : [];
      cards[index] = { ...(cards[index] as object), [field]: value };
      return { ...prev, extra: { ...prev.extra, cards } };
    });
  };

  const handleSave = async () => {
    if (!supabase || !sectionKey) return;
    setSaving(true);

    try {
      const { error: sectionError } = await supabase.from("site_sections").upsert(
        {
          section_key: sectionKey,
          title: section.title,
          title_highlight: section.title_highlight,
          subtitle: section.subtitle,
          description: section.description,
          cta_text: section.cta_text,
          cta_url: section.cta_url,
          extra: section.extra,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "section_key" }
      );
      if (sectionError) throw new Error("Error saving section: " + sectionError.message);

      for (const { key } of config?.images ?? []) {
        const img = siteImages[key];
        if (img?.url) {
          const { error: imgError } = await supabase.from("site_images").upsert(
            {
              image_key: key,
              cloudinary_url: img.url,
              alt_text: img.alt,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "image_key" }
          );
          if (imgError) throw new Error(`Error saving image ${key}: ` + imgError.message);
        }
      }

      const videoKeys = config?.videoSections?.map((v) => v.key) ?? [];
      if (videoKeys.length) {
        for (const key of videoKeys) {
          const { error: delError } = await supabase.from("site_videos").delete().eq("section", key);
          if (delError) throw new Error(`Error deleting old videos for ${key}: ` + delError.message);
          
          const toInsert = videos[key]
            .filter((v) => v.url || v.youtube_id)
            .map((v, i) => ({
              section: key,
              url: v.url ?? "",
              youtube_id: v.youtube_id || null,
              sort_order: i,
            }));
            
          if (toInsert.length) {
            const { error: insError } = await supabase.from("site_videos").insert(toInsert);
            if (insError) throw new Error(`Error inserting new videos for ${key}: ` + insError.message);
          }
        }
      }

      if (config?.thumbnails) {
        const { error: thumbDelError } = await supabase.from("thumbnail_images").delete().neq("id", "00000000-0000-0000-0000-000000000000");
        if (thumbDelError) throw new Error("Error deleting old thumbnails: " + thumbDelError.message);
        
        if (thumbnails.length) {
          const { error: thumbInsError } = await supabase.from("thumbnail_images").insert(
            thumbnails.map((t, i) => ({
              cloudinary_url: t.cloudinary_url,
              alt_text: t.alt_text,
              row_index: t.row_index,
              sort_order: i,
            }))
          );
          if (thumbInsError) throw new Error("Error saving thumbnails: " + thumbInsError.message);
        }
      }

      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      console.error(err);
      alert(err.message);
      setSaving(false);
    }
  };

  if (!sectionKey || !config) {
    return <div className="text-red-400">Section not found.</div>;
  }

  if (loading) return <div className="text-neutral-500">Loading...</div>;

  const cards = Array.isArray(section.extra.cards) ? (section.extra.cards as Record<string, string>[]) : [];

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white mb-1">{config.label}</h2>
          <p className="text-neutral-500 text-sm">{config.description}</p>
        </div>
        <a
          href={config.previewPath}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-[#c1eb40] border border-[#c1eb40]/30 rounded-lg px-3 py-2 hover:bg-[#c1eb40]/10 shrink-0"
        >
          <ExternalLink size={14} /> Preview
        </a>
      </div>

      <div className="bg-[#111] border border-neutral-800 rounded-xl p-6 space-y-4">
        <h3 className="text-white font-bold border-b border-neutral-800 pb-3">Section Heading & Text</h3>

        {config.fields.title && (
          <label className="block space-y-1.5">
            <span className="text-xs font-bold text-neutral-400 uppercase">{config.fields.title}</span>
            <input value={section.title} onChange={(e) => updateField("title", e.target.value)} className={inputClass} />
          </label>
        )}
        {config.fields.title_highlight && (
          <label className="block space-y-1.5">
            <span className="text-xs font-bold text-neutral-400 uppercase">{config.fields.title_highlight}</span>
            <input value={section.title_highlight} onChange={(e) => updateField("title_highlight", e.target.value)} className={inputClass} />
          </label>
        )}
        {config.fields.subtitle && (
          <label className="block space-y-1.5">
            <span className="text-xs font-bold text-neutral-400 uppercase">{config.fields.subtitle}</span>
            <input value={section.subtitle} onChange={(e) => updateField("subtitle", e.target.value)} className={inputClass} />
          </label>
        )}
        {config.fields.description && (
          <label className="block space-y-1.5">
            <span className="text-xs font-bold text-neutral-400 uppercase">{config.fields.description}</span>
            <textarea value={section.description} onChange={(e) => updateField("description", e.target.value)} rows={15} className={inputClass} />
          </label>
        )}
        {config.fields.extra?.map(({ key, label }) => (
          <label key={key} className="block space-y-1.5">
            <span className="text-xs font-bold text-neutral-400 uppercase">{label}</span>
            <input
              value={String(section.extra[key] ?? "")}
              onChange={(e) => updateExtra(key, e.target.value)}
              className={inputClass}
            />
          </label>
        ))}
        {config.showCta && (
          <>
            <label className="block space-y-1.5">
              <span className="text-xs font-bold text-neutral-400 uppercase">Button Text</span>
              <input value={section.cta_text} onChange={(e) => updateField("cta_text", e.target.value)} className={inputClass} />
            </label>
            <label className="block space-y-1.5">
              <span className="text-xs font-bold text-neutral-400 uppercase">Button Link (Calendly URL)</span>
              <input value={section.cta_url} onChange={(e) => updateField("cta_url", e.target.value)} className={inputClass} />
            </label>
          </>
        )}
      </div>

      {config.cards && (
        <div className="space-y-4">
          <h3 className="text-white font-bold">Growth Option Cards</h3>
          {cards.map((card, i) => (
            <div key={i} className="bg-[#111] border border-neutral-800 rounded-xl p-6 space-y-3">
              <p className="text-[#c1eb40] text-sm font-bold">Card {i + 1}</p>
              {(["badge", "title", "description", "link_text"] as const).map((field) => (
                <label key={field} className="block space-y-1.5">
                  <span className="text-xs font-bold text-neutral-400 uppercase">{field.replace("_", " ")}</span>
                  <input
                    value={card[field] ?? ""}
                    onChange={(e) => updateCard(i, field, e.target.value)}
                    className={inputClass}
                  />
                </label>
              ))}
            </div>
          ))}
        </div>
      )}

      {config.socialLinks && (
        <div className="bg-[#111] border border-neutral-800 rounded-xl p-6 space-y-4">
          <h3 className="text-white font-bold border-b border-neutral-800 pb-3">Social Links</h3>
          {(["facebook", "instagram", "twitter", "linkedin"] as const).map((key) => (
            <label key={key} className="block space-y-1.5">
              <span className="text-xs font-bold text-neutral-400 uppercase">{key}</span>
              <input
                value={String(section.extra[key] ?? "")}
                onChange={(e) => updateExtra(key, e.target.value)}
                className={inputClass}
              />
            </label>
          ))}
        </div>
      )}

      {config.whatsapp && (
        <div className="bg-[#111] border border-neutral-800 rounded-xl p-6 space-y-4">
          <h3 className="text-white font-bold border-b border-neutral-800 pb-3">WhatsApp Button</h3>
          <label className="block space-y-1.5">
            <span className="text-xs font-bold text-neutral-400 uppercase">WhatsApp Number</span>
            <input
              value={String(section.extra.whatsapp_number ?? "")}
              onChange={(e) => updateExtra("whatsapp_number", e.target.value)}
              className={inputClass}
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs font-bold text-neutral-400 uppercase">Prefilled Message</span>
            <textarea
              value={String(section.extra.whatsapp_message ?? "")}
              onChange={(e) => updateExtra("whatsapp_message", e.target.value)}
              rows={2}
              className={inputClass}
            />
          </label>
        </div>
      )}

      {config.images?.map(({ key, label }) => (
        <SiteImageEditor
          key={key}
          imageKey={key}
          label={label}
          url={siteImages[key]?.url ?? ""}
          alt={siteImages[key]?.alt ?? ""}
          onChange={(url, alt) => setSiteImages((prev) => ({ ...prev, [key]: { url, alt } }))}
        />
      ))}

      {config.videoSections?.map(({ key, label, isYoutube }) => (
        <VideosEditor
          key={key}
          sectionKey={key}
          label={label}
          isYoutube={isYoutube}
          videos={videos[key] ?? []}
          onChange={(list) => setVideos((prev) => ({ ...prev, [key]: list }))}
        />
      ))}

      {config.thumbnails && (
        <div>
          <h3 className="text-white font-bold mb-4">Thumbnail Images (3 rows)</h3>
          <ThumbnailsEditor thumbnails={thumbnails} onChange={setThumbnails} />
        </div>
      )}

      {(sectionKey === "client_say" || sectionKey === "testimonials") && (
        <div className="bg-[#c1eb40]/10 border border-[#c1eb40]/30 rounded-xl p-4 text-sm text-[#c1eb40]">
          Edit carousel cards & profiles on the{" "}
          <Link
            to={sectionKey === "client_say" ? "/admin_1122/client-say" : "/admin_1122/testimonials"}
            className="underline font-bold"
          >
            {sectionKey === "client_say" ? "Client Say" : "Testimonials"} page
          </Link>
          .
        </div>
      )}

      <button
        onClick={handleSave}
        disabled={saving}
        className="flex items-center gap-2 bg-[#c1eb40] text-black font-bold px-6 py-2.5 rounded-lg hover:bg-[#aed83a] transition-colors disabled:opacity-50"
      >
        {saving ? <Loader2 size={16} className="animate-spin" /> : saved ? <CheckCircle size={16} /> : <Save size={16} />}
        {saving ? "Saving..." : saved ? "Saved!" : `Save ${config.label}`}
      </button>
    </div>
  );
}
