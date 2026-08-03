import { useState } from "react";
import { uploadToCloudinary } from "../../lib/cloudinary";
import { Upload, Loader2 } from "lucide-react";

interface FileUploadProps {
  accept: string;
  resourceType: "image" | "video";
  onUploaded: (url: string) => void;
  label?: string;
}

export default function FileUpload({ accept, resourceType, onUploaded, label }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");
    try {
      const { url } = await uploadToCloudinary(file, resourceType);
      onUploaded(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div>
      <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#c1eb40] text-black text-sm font-bold cursor-pointer hover:bg-[#aed83a] transition-colors">
        {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
        {uploading ? "Uploading..." : (label ?? `Upload ${resourceType}`)}
        <input type="file" accept={accept} className="hidden" onChange={handleChange} disabled={uploading} />
      </label>
      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
    </div>
  );
}
