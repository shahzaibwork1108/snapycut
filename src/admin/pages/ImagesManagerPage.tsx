import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import FileUpload from "../components/FileUpload";
import { Save, Loader2, CheckCircle, Plus, Trash2 } from "lucide-react";
import { defaultContent } from "../../lib/defaultContent";
import type { ThumbnailImage } from "../../types/content";

const SITE_IMAGE_KEYS = [
  { key: "hero_bg", label: "Hero Background", fallback: defaultContent.images.hero_bg.cloudinary_url },
  { key: "logo", label: "Logo (Navbar & Footer)", fallback: defaultContent.images.logo.cloudinary_url },
];

export default function ImagesManagerPage() {
  const [siteImages, setSiteImages] = useState<Record<string, { url: string; alt: string }>>({});
  const [thumbnails, setThumbnails] = useState<ThumbnailImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    Promise.all([
      supabase?.from("site_images").select("*"),
      supabase?.from("thumbnail_images").select("*").order("row_index").order("sort_order"),
    ]).then(([imgRes, thumbRes]) => {
      const imgs: Record<string, { url: string; alt: string }> = {};
      for (const item of SITE_IMAGE_KEYS) {
        const found = imgRes?.data?.find((i) => i.image_key === item.key);
        imgs[item.key] = {
          url: found?.cloudinary_url || item.fallback,
          alt: found?.alt_text || defaultContent.images[item.key]?.alt_text || "",
        };
      }
      setSiteImages(imgs);

      if (thumbRes?.data?.length) {
        setThumbnails(thumbRes.data.map((t) => ({
          id: t.id,
          cloudinary_url: t.cloudinary_url,
          alt_text: t.alt_text ?? "portfolio",
          row_index: t.row_index ?? 0,
          sort_order: t.sort_order ?? 0,
        })));
      } else {
        setThumbnails(defaultContent.thumbnails);
      }
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    if (!supabase) return;
    setSaving(true);

    for (const { key } of SITE_IMAGE_KEYS) {
      const img = siteImages[key];
      if (img?.url) {
        await supabase.from("site_images").upsert({
          image_key: key,
          cloudinary_url: img.url,
          alt_text: img.alt,
          updated_at: new Date().toISOString(),
        }, { onConflict: "image_key" });
      }
    }

    await supabase.from("thumbnail_images").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    if (thumbnails.length) {
      await supabase.from("thumbnail_images").insert(
        thumbnails.map((t, i) => ({
          cloudinary_url: t.cloudinary_url,
          alt_text: t.alt_text,
          row_index: t.row_index,
          sort_order: i,
        }))
      );
    }

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const addThumbnail = () => {
    setThumbnails([...thumbnails, {
      cloudinary_url: "",
      alt_text: "portfolio",
      row_index: 0,
      sort_order: thumbnails.length,
    }]);
  };

  const removeThumbnail = (index: number) => {
    setThumbnails(thumbnails.filter((_, i) => i !== index));
  };

  if (loading) return <div className="text-neutral-500">Loading images...</div>;

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-black text-white mb-2">Images Manager</h2>
      <p className="text-neutral-500 text-sm mb-8">Upload images via Cloudinary for hero, logo & thumbnails.</p>

      <div className="space-y-8">
        {SITE_IMAGE_KEYS.map(({ key, label }) => (
          <div key={key} className="bg-[#111] border border-neutral-800 rounded-xl p-6">
            <h3 className="text-white font-bold mb-4">{label}</h3>
            {siteImages[key]?.url && (
              <img src={siteImages[key].url} alt={siteImages[key].alt} className="w-full max-w-sm rounded-lg mb-4 border border-neutral-700" />
            )}
            <div className="space-y-3">
              <FileUpload
                accept="image/*"
                resourceType="image"
                label={`Upload ${label}`}
                onUploaded={(url) => setSiteImages({ ...siteImages, [key]: { ...siteImages[key], url } })}
              />
              <input
                value={siteImages[key]?.url ?? ""}
                onChange={(e) => setSiteImages({ ...siteImages, [key]: { ...siteImages[key], url: e.target.value } })}
                placeholder="Cloudinary URL"
                className="w-full bg-[#0a0a0a] border border-neutral-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-[#c1eb40]"
              />
              <input
                value={siteImages[key]?.alt ?? ""}
                onChange={(e) => setSiteImages({ ...siteImages, [key]: { ...siteImages[key], alt: e.target.value } })}
                placeholder="Alt text"
                className="w-full bg-[#0a0a0a] border border-neutral-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-[#c1eb40]"
              />
            </div>
          </div>
        ))}

        <div className="bg-[#111] border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-bold">Thumbnail Portfolio</h3>
            <button onClick={addThumbnail} className="flex items-center gap-1 text-[#c1eb40] text-sm font-bold hover:underline">
              <Plus size={16} /> Add Thumbnail
            </button>
          </div>

          <div className="space-y-4">
            {thumbnails.map((thumb, i) => (
              <div key={i} className="flex gap-4 items-start bg-[#0a0a0a] border border-neutral-800 rounded-lg p-4">
                {thumb.cloudinary_url && (
                  <img src={thumb.cloudinary_url} alt={thumb.alt_text} className="w-24 h-14 object-cover rounded border border-neutral-700 flex-shrink-0" />
                )}
                <div className="flex-1 space-y-2">
                  <FileUpload
                    accept="image/*"
                    resourceType="image"
                    label="Upload"
                    onUploaded={(url) => {
                      const updated = [...thumbnails];
                      updated[i] = { ...updated[i], cloudinary_url: url };
                      setThumbnails(updated);
                    }}
                  />
                  <input
                    value={thumb.cloudinary_url}
                    onChange={(e) => {
                      const updated = [...thumbnails];
                      updated[i] = { ...updated[i], cloudinary_url: e.target.value };
                      setThumbnails(updated);
                    }}
                    placeholder="Cloudinary URL"
                    className="w-full bg-[#111] border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#c1eb40]"
                  />
                  <div className="flex gap-2">
                    <input
                      value={thumb.alt_text}
                      onChange={(e) => {
                        const updated = [...thumbnails];
                        updated[i] = { ...updated[i], alt_text: e.target.value };
                        setThumbnails(updated);
                      }}
                      placeholder="Alt text"
                      className="flex-1 bg-[#111] border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#c1eb40]"
                    />
                    <select
                      value={thumb.row_index}
                      onChange={(e) => {
                        const updated = [...thumbnails];
                        updated[i] = { ...updated[i], row_index: Number(e.target.value) };
                        setThumbnails(updated);
                      }}
                      className="bg-[#111] border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm"
                    >
                      <option value={0}>Row 1</option>
                      <option value={1}>Row 2</option>
                      <option value={2}>Row 3</option>
                    </select>
                  </div>
                </div>
                <button onClick={() => removeThumbnail(i)} className="text-red-400 hover:text-red-300 p-1">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-[#c1eb40] text-black font-bold px-6 py-2.5 rounded-lg hover:bg-[#aed83a] transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : saved ? <CheckCircle size={16} /> : <Save size={16} />}
          {saving ? "Saving..." : saved ? "Saved!" : "Save All Images"}
        </button>
      </div>
    </div>
  );
}
