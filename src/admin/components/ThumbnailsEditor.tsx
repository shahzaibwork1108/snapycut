import { Plus, Trash2 } from "lucide-react";
import FileUpload from "./FileUpload";
import type { ThumbnailImage } from "../../types/content";

interface ThumbnailsEditorProps {
  thumbnails: ThumbnailImage[];
  onChange: (thumbnails: ThumbnailImage[]) => void;
}

export default function ThumbnailsEditor({ thumbnails, onChange }: ThumbnailsEditorProps) {
  const addThumbnail = (rowIndex: number) => {
    onChange([
      ...thumbnails,
      {
        cloudinary_url: "",
        alt_text: "portfolio",
        row_index: rowIndex,
        sort_order: thumbnails.filter((t) => t.row_index === rowIndex).length,
      },
    ]);
  };

  const updateThumbnail = (index: number, field: "cloudinary_url" | "alt_text", value: string) => {
    const list = [...thumbnails];
    list[index] = { ...list[index], [field]: value };
    onChange(list);
  };

  const removeThumbnail = (index: number) => {
    onChange(thumbnails.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {[0, 1, 2].map((rowIndex) => {
        const rowItems = thumbnails
          .map((t, i) => ({ ...t, originalIndex: i }))
          .filter((t) => t.row_index === rowIndex);

        return (
          <div key={rowIndex} className="bg-[#111] border border-neutral-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold">Row {rowIndex + 1}</h3>
              <button
                onClick={() => addThumbnail(rowIndex)}
                className="flex items-center gap-1 text-[#c1eb40] text-sm font-bold hover:underline"
              >
                <Plus size={16} /> Add Thumbnail
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {rowItems.map((thumb) => (
                <div key={thumb.originalIndex} className="bg-[#0a0a0a] border border-neutral-800 rounded-lg p-4 space-y-2">
                  {thumb.cloudinary_url && (
                    <img src={thumb.cloudinary_url} alt={thumb.alt_text} className="w-full h-24 object-cover rounded" />
                  )}
                  <FileUpload
                    accept="image/*"
                    resourceType="image"
                    label="Upload"
                    onUploaded={(url) => updateThumbnail(thumb.originalIndex, "cloudinary_url", url)}
                  />
                  <input
                    value={thumb.cloudinary_url}
                    onChange={(e) => updateThumbnail(thumb.originalIndex, "cloudinary_url", e.target.value)}
                    placeholder="Image URL"
                    className="w-full bg-[#111] border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#c1eb40]"
                  />
                  <input
                    value={thumb.alt_text}
                    onChange={(e) => updateThumbnail(thumb.originalIndex, "alt_text", e.target.value)}
                    placeholder="Alt text"
                    className="w-full bg-[#111] border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#c1eb40]"
                  />
                  <button
                    onClick={() => removeThumbnail(thumb.originalIndex)}
                    className="text-red-400 text-sm flex items-center gap-1"
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
