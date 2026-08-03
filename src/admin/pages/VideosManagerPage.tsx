import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import FileUpload from "../components/FileUpload";
import { Save, Loader2, CheckCircle, Plus, Trash2 } from "lucide-react";
import { defaultContent } from "../../lib/defaultContent";
import type { SiteVideo, VideoSection } from "../../types/content";

const SECTIONS: { key: VideoSection; label: string; isYoutube?: boolean }[] = [
  { key: "hero", label: "Hero Video (Portrait Player)" },
  { key: "short_form", label: "Short Form Content" },
  { key: "saas_short", label: "SaaS Explainer - Vertical Videos" },
  { key: "saas_horizontal", label: "SaaS Explainer - Horizontal Videos (16:9)" },
  { key: "ai_video_ads", label: "AI Video Ads (Square)" },
  { key: "ai_avatar", label: "AI Avatar Videos (YouTube IDs)", isYoutube: true },
];

export default function VideosManagerPage() {
  const [videos, setVideos] = useState<Record<VideoSection, SiteVideo[]>>(defaultContent.videos);
  const [activeSection, setActiveSection] = useState<VideoSection>("hero");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase?.from("site_videos").select("*").order("sort_order").then(({ data }) => {
      if (data?.length) {
        const grouped = { ...defaultContent.videos };
        for (const s of SECTIONS) grouped[s.key] = [];

        for (const v of data) {
          const section = v.section as VideoSection;
          if (grouped[section]) {
            grouped[section].push({
              id: v.id,
              section,
              url: v.url ?? "",
              youtube_id: v.youtube_id,
              sort_order: v.sort_order ?? 0,
            });
          }
        }

        for (const s of SECTIONS) {
          if (grouped[s.key].length === 0) {
            grouped[s.key] = defaultContent.videos[s.key];
          } else {
            grouped[s.key].sort((a, b) => a.sort_order - b.sort_order);
          }
        }
        setVideos(grouped);
      }
      setLoading(false);
    });
  }, []);

  const currentVideos = videos[activeSection] ?? [];
  const sectionMeta = SECTIONS.find((s) => s.key === activeSection)!;

  const updateVideo = (index: number, field: "url" | "youtube_id", value: string) => {
    const updated = { ...videos };
    const list = [...updated[activeSection]];
    list[index] = { ...list[index], [field]: value };
    updated[activeSection] = list;
    setVideos(updated);
  };

  const addVideo = () => {
    const updated = { ...videos };
    updated[activeSection] = [
      ...updated[activeSection],
      { section: activeSection, url: "", youtube_id: "", sort_order: updated[activeSection].length },
    ];
    setVideos(updated);
  };

  const removeVideo = (index: number) => {
    const updated = { ...videos };
    updated[activeSection] = updated[activeSection].filter((_, i) => i !== index);
    setVideos(updated);
  };

  const handleSave = async () => {
    if (!supabase) {
      alert("Supabase is not configured!");
      return;
    }
    setSaving(true);

    try {
      const { error: deleteError } = await supabase
        .from("site_videos")
        .delete()
        .neq("id", "00000000-0000-0000-0000-000000000000");
      
      if (deleteError) {
        throw new Error("Failed to delete old videos: " + deleteError.message);
      }

      const allVideos: Omit<SiteVideo, "id">[] = [];
      for (const s of SECTIONS) {
        videos[s.key].forEach((v, i) => {
          if (v.url || v.youtube_id) {
            allVideos.push({
              section: s.key,
              url: v.url,
              youtube_id: v.youtube_id,
              sort_order: i,
            });
          }
        });
      }

      if (allVideos.length) {
        const { error: insertError } = await supabase.from("site_videos").insert(allVideos);
        if (insertError) {
          throw new Error("Failed to insert new videos: " + insertError.message);
        }
      }

      setSaving(false);
      setSaved(true);
      alert("Videos saved successfully! Please refresh the frontend to see changes.");
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setSaving(false);
      alert(err.message);
      console.error(err);
    }
  };

  if (loading) return <div className="text-neutral-500">Loading videos...</div>;

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-black text-white mb-2">Videos Manager</h2>
      <p className="text-neutral-500 text-sm mb-8">Upload videos via Cloudinary or paste YouTube URLs/IDs.</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {SECTIONS.map((s) => (
          <button
            key={s.key}
            onClick={() => setActiveSection(s.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeSection === s.key
                ? "bg-[#c1eb40] text-black"
                : "bg-[#111] text-neutral-400 border border-neutral-800 hover:text-white"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="bg-[#111] border border-neutral-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-bold">{sectionMeta.label}</h3>
          <button onClick={addVideo} className="flex items-center gap-1 text-[#c1eb40] text-sm font-bold hover:underline">
            <Plus size={16} /> Add Video
          </button>
        </div>

        <div className="space-y-4">
          {currentVideos.map((video, i) => (
            <div key={i} className="flex gap-4 items-start bg-[#0a0a0a] border border-neutral-800 rounded-lg p-4">
              <span className="text-neutral-600 text-sm font-mono w-6 pt-2">{i + 1}</span>
              <div className="flex-1 space-y-2">
                {sectionMeta.isYoutube ? (
                  <input
                    value={video.youtube_id ?? ""}
                    onChange={(e) => updateVideo(i, "youtube_id", e.target.value)}
                    placeholder="YouTube Video ID (e.g. 3vj12N3XB94)"
                    className="w-full bg-[#111] border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#c1eb40]"
                  />
                ) : (
                  <>
                    <FileUpload
                      accept="video/*"
                      resourceType="video"
                      label="Upload Video"
                      onUploaded={(url) => updateVideo(i, "url", url)}
                    />
                    <input
                      value={video.url}
                      onChange={(e) => updateVideo(i, "url", e.target.value)}
                      placeholder="Cloudinary URL or YouTube link"
                      className="w-full bg-[#111] border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#c1eb40]"
                    />
                  </>
                )}
              </div>
              <button onClick={() => removeVideo(i)} className="text-red-400 hover:text-red-300 p-1">
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          {currentVideos.length === 0 && (
            <p className="text-neutral-500 text-sm text-center py-8">No videos yet. Click "Add Video" to start.</p>
          )}
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-6 flex items-center gap-2 bg-[#c1eb40] text-black font-bold px-6 py-2.5 rounded-lg hover:bg-[#aed83a] transition-colors disabled:opacity-50"
      >
        {saving ? <Loader2 size={16} className="animate-spin" /> : saved ? <CheckCircle size={16} /> : <Save size={16} />}
        {saving ? "Saving..." : saved ? "Saved!" : "Save All Videos"}
      </button>
    </div>
  );
}
