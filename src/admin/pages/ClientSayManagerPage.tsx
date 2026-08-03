import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import FileUpload from "../components/FileUpload";
import { Save, Loader2, CheckCircle } from "lucide-react";
import { defaultContent } from "../../lib/defaultContent";
import type { ClientTestimonial } from "../../types/content";

const SLUGS = ["mikel", "viktor"] as const;

export default function ClientSayManagerPage() {
  const [clients, setClients] = useState<Record<string, ClientTestimonial>>(defaultContent.clientSay);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase?.from("client_testimonials").select("*").then(({ data }) => {
      if (data?.length) {
        const map = { ...defaultContent.clientSay };
        for (const c of data) {
          map[c.slug] = {
            id: c.id,
            slug: c.slug,
            name: c.name,
            role: c.role ?? "",
            avatar_url: c.avatar_url ?? "",
            video_url: c.video_url ?? "",
            quote: c.quote ?? "",
            journey: Array.isArray(c.journey) ? c.journey : [],
            rating_stars: c.rating_stars ?? 5,
            rating_text: c.rating_text ?? "5 Star rated agency",
            heading_light: c.heading_light ?? "",
            heading_highlight: c.heading_highlight ?? "",
            cta_text: c.cta_text ?? "Book A free Strategy Call",
            cta_url: c.cta_url ?? "https://calendly.com/snapycut/30min",
          };
        }
        setClients(map);
      }
      setLoading(false);
    });
  }, []);

  const updateClient = (slug: string, field: keyof ClientTestimonial, value: string | string[] | number) => {
    setClients({ ...clients, [slug]: { ...clients[slug], [field]: value } });
  };

  const handleSave = async () => {
    setSaving(true);
    let hasError = false;

    for (const slug of SLUGS) {
      const c = clients[slug];
      const { error } = await supabase.from("client_testimonials").upsert({
        id: c.id,
        slug: c.slug,
        name: c.name,
        role: c.role,
        avatar_url: c.avatar_url,
        video_url: c.video_url,
        quote: c.quote,
        journey: c.journey,
        rating_stars: c.rating_stars,
        rating_text: c.rating_text,
        heading_light: c.heading_light,
        heading_highlight: c.heading_highlight,
        cta_text: c.cta_text,
        cta_url: c.cta_url,
        updated_at: new Date().toISOString(),
      }, { onConflict: "slug" });

      if (error) {
        hasError = true;
        console.error("Save error:", error);
        alert(`Failed to save! Database Error: ${error.message}. Please make sure you have run the schema.sql file in Supabase.`);
      }
    }

    setSaving(false);
    if (!hasError) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  if (loading) return <div className="text-neutral-500">Loading client testimonials...</div>;

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-black text-white mb-2">Client Say Section</h2>
      <p className="text-neutral-500 text-sm mb-8">Manage Mikel & Viktor featured testimonials.</p>

      <div className="space-y-8">
        {SLUGS.map((slug) => {
          const client = clients[slug];
          if (!client) return null;

          return (
            <div key={slug} className="bg-[#111] border border-neutral-800 rounded-xl p-6">
              <h3 className="text-white font-bold capitalize mb-4">{client.name || slug} Testimonial</h3>

              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                <input value={client.name} onChange={(e) => updateClient(slug, "name", e.target.value)} placeholder="Name" className="bg-[#0a0a0a] border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#c1eb40]" />
                <input value={client.role} onChange={(e) => updateClient(slug, "role", e.target.value)} placeholder="Role" className="bg-[#0a0a0a] border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#c1eb40]" />
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                <div className="space-y-1">
                  <label className="text-xs text-neutral-400 uppercase font-bold">Heading Light Text</label>
                  <input value={client.heading_light ?? ""} onChange={(e) => updateClient(slug, "heading_light", e.target.value)} placeholder="Real Results. Real" className="w-full bg-[#0a0a0a] border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#c1eb40]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-neutral-400 uppercase font-bold">Heading Highlight Text</label>
                  <input value={client.heading_highlight ?? ""} onChange={(e) => updateClient(slug, "heading_highlight", e.target.value)} placeholder="Content. Real Growth." className="w-full bg-[#0a0a0a] border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#c1eb40]" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                <div className="space-y-1">
                  <label className="text-xs text-neutral-400 uppercase font-bold">Rating Stars</label>
                  <input type="number" min="1" max="5" value={client.rating_stars ?? 5} onChange={(e) => updateClient(slug, "rating_stars", parseInt(e.target.value) || 5)} className="w-full bg-[#0a0a0a] border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#c1eb40]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-neutral-400 uppercase font-bold">Rating Text</label>
                  <input value={client.rating_text ?? "5 Star rated agency"} onChange={(e) => updateClient(slug, "rating_text", e.target.value)} placeholder="5 Star rated agency" className="w-full bg-[#0a0a0a] border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#c1eb40]" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                <div className="space-y-1">
                  <label className="text-xs text-neutral-400 uppercase font-bold">CTA Text</label>
                  <input value={client.cta_text ?? "Book A free Strategy Call"} onChange={(e) => updateClient(slug, "cta_text", e.target.value)} placeholder="Book A free Strategy Call" className="w-full bg-[#0a0a0a] border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#c1eb40]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-neutral-400 uppercase font-bold">CTA URL</label>
                  <input value={client.cta_url ?? "https://calendly.com/snapycut/30min"} onChange={(e) => updateClient(slug, "cta_url", e.target.value)} placeholder="https://calendly.com/snapycut/30min" className="w-full bg-[#0a0a0a] border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#c1eb40]" />
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <label className="text-xs text-neutral-400 uppercase font-bold">Avatar Image</label>
                {client.avatar_url && (
                  <img src={client.avatar_url} alt={client.name} className="w-20 h-20 rounded-full object-cover border border-neutral-700" />
                )}
                <FileUpload accept="image/*" resourceType="image" label="Upload Avatar" onUploaded={(url) => updateClient(slug, "avatar_url", url)} />
                <input value={client.avatar_url} onChange={(e) => updateClient(slug, "avatar_url", e.target.value)} placeholder="Avatar URL" className="w-full bg-[#0a0a0a] border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#c1eb40]" />
              </div>

              <div className="space-y-2 mb-4">
                <label className="text-xs text-neutral-400 uppercase font-bold">Video URL (Cloudinary)</label>
                <FileUpload accept="video/*" resourceType="video" label="Upload Video" onUploaded={(url) => updateClient(slug, "video_url", url)} />
                <input value={client.video_url} onChange={(e) => updateClient(slug, "video_url", e.target.value)} placeholder="Video URL" className="w-full bg-[#0a0a0a] border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#c1eb40]" />
              </div>


              <div>
                <label className="text-xs text-neutral-400 uppercase font-bold mb-2 block">Journey Paragraphs (one per line)</label>
                <textarea
                  value={client.journey.join("\n\n")}
                  onChange={(e) => updateClient(slug, "journey", e.target.value.split("\n\n").filter(Boolean))}
                  rows={6}
                  className="w-full bg-[#0a0a0a] border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#c1eb40] resize-none"
                />
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-6 flex items-center gap-2 bg-[#c1eb40] text-black font-bold px-6 py-2.5 rounded-lg hover:bg-[#aed83a] transition-colors disabled:opacity-50"
      >
        {saving ? <Loader2 size={16} className="animate-spin" /> : saved ? <CheckCircle size={16} /> : <Save size={16} />}
        {saving ? "Saving..." : saved ? "Saved!" : "Save Client Say"}
      </button>
    </div>
  );
}
