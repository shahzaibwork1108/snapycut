import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import FileUpload from "../components/FileUpload";
import { Save, Loader2, CheckCircle, Plus, Trash2 } from "lucide-react";
import { defaultContent } from "../../lib/defaultContent";
import type { Testimonial } from "../../types/content";

export default function TestimonialsManagerPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    supabase?.from("testimonials").select("*").order("sort_order").then(({ data }) => {
      setItems(data?.length ? data.map((t) => ({
        id: t.id,
        name: t.name,
        role: t.role ?? "",
        company: t.company ?? "",
        avatar_url: t.avatar_url ?? "",
        quote: t.quote ?? "",
        stat: t.stat ?? "",
        sort_order: t.sort_order ?? 0,
      })) : defaultContent.testimonials);
      setLoading(false);
    });
  }, []);

  const updateItem = (index: number, field: keyof Testimonial, value: string) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, {
      name: "", role: "", company: "", avatar_url: "", quote: "", stat: "", sort_order: items.length,
    }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!supabase) return;
    setSaving(true);

    await supabase.from("testimonials").delete().neq("id", "00000000-0000-0000-0000-000000000000");

    const valid = items.filter((t) => t.name && t.quote);
    if (valid.length) {
      await supabase.from("testimonials").insert(
        valid.map((t, i) => ({
          name: t.name,
          role: t.role,
          company: t.company,
          avatar_url: t.avatar_url,
          quote: t.quote,
          stat: t.stat,
          sort_order: i,
        }))
      );
    }

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) return <div className="text-neutral-500">Loading testimonials...</div>;

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-black text-white mb-2">Testimonials</h2>
      <p className="text-neutral-500 text-sm mb-8">Manage carousel testimonial cards.</p>

      <div className="flex justify-end mb-4">
        <button onClick={addItem} className="flex items-center gap-1 text-[#c1eb40] text-sm font-bold hover:underline">
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="bg-[#111] border border-neutral-800 rounded-xl p-5">
            <div className="flex justify-between items-start mb-4">
              <span className="text-neutral-500 text-xs font-bold uppercase">#{i + 1}</span>
              <button onClick={() => removeItem(i)} className="text-red-400 hover:text-red-300">
                <Trash2 size={18} />
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <input value={item.name} onChange={(e) => updateItem(i, "name", e.target.value)} placeholder="Name" className="bg-[#0a0a0a] border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#c1eb40]" />
              <input value={item.role} onChange={(e) => updateItem(i, "role", e.target.value)} placeholder="Role" className="bg-[#0a0a0a] border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#c1eb40]" />
              <input value={item.stat} onChange={(e) => updateItem(i, "stat", e.target.value)} placeholder="Stat (e.g. 3.2M views)" className="bg-[#0a0a0a] border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#c1eb40]" />
              <div className="space-y-2">
                <FileUpload accept="image/*" resourceType="image" label="Upload Avatar" onUploaded={(url) => updateItem(i, "avatar_url", url)} />
                <input value={item.avatar_url} onChange={(e) => updateItem(i, "avatar_url", e.target.value)} placeholder="Avatar URL" className="w-full bg-[#0a0a0a] border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#c1eb40]" />
              </div>
            </div>
            <textarea value={item.quote} onChange={(e) => updateItem(i, "quote", e.target.value)} placeholder="Quote" rows={3} className="w-full mt-3 bg-[#0a0a0a] border border-neutral-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#c1eb40] resize-none" />
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="mt-6 flex items-center gap-2 bg-[#c1eb40] text-black font-bold px-6 py-2.5 rounded-lg hover:bg-[#aed83a] transition-colors disabled:opacity-50"
      >
        {saving ? <Loader2 size={16} className="animate-spin" /> : saved ? <CheckCircle size={16} /> : <Save size={16} />}
        {saving ? "Saving..." : saved ? "Saved!" : "Save Testimonials"}
      </button>
    </div>
  );
}
