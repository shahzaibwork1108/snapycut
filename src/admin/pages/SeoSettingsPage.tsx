import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import FileUpload from "../components/FileUpload";
import { Save, Loader2, CheckCircle } from "lucide-react";
import type { SeoSettings } from "../../types/content";
import { defaultContent } from "../../lib/defaultContent";

export default function SeoSettingsPage() {
  const [form, setForm] = useState<SeoSettings>(defaultContent.seo);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase?.from("seo_settings").select("*").eq("id", 1).maybeSingle().then(({ data }) => {
      if (data) {
        setForm({
          meta_title: data.meta_title ?? defaultContent.seo.meta_title,
          meta_description: data.meta_description ?? defaultContent.seo.meta_description,
          og_image_url: data.og_image_url ?? "",
          og_image_alt: data.og_image_alt ?? defaultContent.seo.og_image_alt,
        });
      }
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    if (!supabase) return;
    setSaving(true);
    setSaved(false);

    await supabase.from("seo_settings").upsert({
      id: 1,
      meta_title: form.meta_title,
      meta_description: form.meta_description,
      og_image_url: form.og_image_url,
      og_image_alt: form.og_image_alt,
      updated_at: new Date().toISOString(),
    });

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) {
    return <div className="text-neutral-500">Loading SEO settings...</div>;
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-black text-white mb-2">SEO Settings</h2>
      <p className="text-neutral-500 text-sm mb-8">Manage meta tags and social sharing image.</p>

      <div className="bg-[#111] border border-neutral-800 rounded-xl p-6 space-y-5">
        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Meta Title</label>
          <input
            value={form.meta_title}
            onChange={(e) => setForm({ ...form, meta_title: e.target.value })}
            className="w-full bg-[#0a0a0a] border border-neutral-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#c1eb40]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Meta Description</label>
          <textarea
            value={form.meta_description}
            onChange={(e) => setForm({ ...form, meta_description: e.target.value })}
            rows={4}
            className="w-full bg-[#0a0a0a] border border-neutral-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#c1eb40] resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">Feature / OG Image</label>
          {form.og_image_url && (
            <img src={form.og_image_url} alt="OG preview" className="w-full max-w-xs rounded-lg mb-3 border border-neutral-700" />
          )}
          <div className="flex gap-3 items-center flex-wrap">
            <FileUpload
              accept="image/*"
              resourceType="image"
              label="Upload OG Image"
              onUploaded={(url) => setForm({ ...form, og_image_url: url })}
            />
            <input
              value={form.og_image_url}
              onChange={(e) => setForm({ ...form, og_image_url: e.target.value })}
              placeholder="Or paste Cloudinary URL"
              className="flex-1 min-w-[200px] bg-[#0a0a0a] border border-neutral-700 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-[#c1eb40]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2">OG Image Alt Text</label>
          <input
            value={form.og_image_alt}
            onChange={(e) => setForm({ ...form, og_image_alt: e.target.value })}
            className="w-full bg-[#0a0a0a] border border-neutral-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#c1eb40]"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-[#c1eb40] text-black font-bold px-6 py-2.5 rounded-lg hover:bg-[#aed83a] transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : saved ? <CheckCircle size={16} /> : <Save size={16} />}
          {saving ? "Saving..." : saved ? "Saved!" : "Save SEO Settings"}
        </button>
      </div>
    </div>
  );
}
