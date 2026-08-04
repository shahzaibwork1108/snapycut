import FileUpload from "./FileUpload";
import { defaultContent } from "../../lib/defaultContent";

interface SiteImageEditorProps {
  imageKey: string;
  label: string;
  url: string;
  alt: string;
  onChange: (url: string, alt: string) => void;
}

export default function SiteImageEditor({ imageKey, label, url, alt, onChange }: SiteImageEditorProps) {
  const fallback =
    defaultContent.images[imageKey]?.cloudinary_url ??
    (imageKey === "logo" ? "/assets/navbar/logo.png" : "/assets/hero/hero-bg-image-1-opt.jpg");

  return (
    <div className="bg-[#111] border border-neutral-800 rounded-xl p-6 space-y-4">
      <h3 className="text-white font-bold">{label}</h3>
      {url && (
        <img src={url || fallback} alt={alt} className="max-h-32 rounded-lg object-contain bg-[#0a0a0a]" />
      )}
      <FileUpload accept="image/*" resourceType="image" label="Upload Image" onUploaded={(uploaded) => onChange(uploaded, alt)} />
      <input
        value={url}
        onChange={(e) => onChange(e.target.value, alt)}
        placeholder="Image URL"
        className="w-full bg-[#0a0a0a] border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#c1eb40]"
      />
      <input
        value={alt}
        onChange={(e) => onChange(url, e.target.value)}
        placeholder="Alt text"
        className="w-full bg-[#0a0a0a] border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#c1eb40]"
      />
    </div>
  );
}
