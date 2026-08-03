import { Plus, Trash2 } from "lucide-react";
import FileUpload from "./FileUpload";
import type { SiteVideo, VideoSection } from "../../types/content";

interface VideosEditorProps {
  sectionKey: VideoSection;
  label: string;
  isYoutube?: boolean;
  videos: SiteVideo[];
  onChange: (videos: SiteVideo[]) => void;
}

export default function VideosEditor({
  sectionKey,
  label,
  isYoutube,
  videos,
  onChange,
}: VideosEditorProps) {
  const updateVideo = (index: number, field: "url" | "youtube_id", value: string) => {
    const list = [...videos];
    list[index] = { ...list[index], [field]: value };
    onChange(list);
  };

  const addVideo = () => {
    onChange([
      ...videos,
      { section: sectionKey, url: "", youtube_id: "", sort_order: videos.length },
    ]);
  };

  const removeVideo = (index: number) => {
    onChange(videos.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-[#111] border border-neutral-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-bold">{label}</h3>
        <button onClick={addVideo} className="flex items-center gap-1 text-[#c1eb40] text-sm font-bold hover:underline">
          <Plus size={16} /> Add
        </button>
      </div>
      <div className="space-y-4">
        {videos.map((video, i) => (
          <div key={i} className="flex gap-4 items-start bg-[#0a0a0a] border border-neutral-800 rounded-lg p-4">
            <span className="text-neutral-600 text-sm font-mono w-6 pt-2">{i + 1}</span>
            <div className="flex-1 space-y-2">
              {isYoutube ? (
                <input
                  value={video.youtube_id ?? ""}
                  onChange={(e) => updateVideo(i, "youtube_id", e.target.value)}
                  placeholder="YouTube Video ID"
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
                    placeholder="Video URL or YouTube link"
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
        {videos.length === 0 && (
          <p className="text-neutral-500 text-sm text-center py-6">No videos yet.</p>
        )}
      </div>
    </div>
  );
}
