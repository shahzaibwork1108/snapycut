import { useEffect } from "react";
import { useSiteContent } from "../context/SiteContentContext";

export default function SeoHead() {
  const { content } = useSiteContent();
  const { seo } = content;

  useEffect(() => {
    document.title = seo.meta_title;

    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMeta("description", seo.meta_description);
    setMeta("og:title", seo.meta_title, true);
    setMeta("og:description", seo.meta_description, true);
    setMeta("og:type", "website", true);

    if (seo.og_image_url) {
      setMeta("og:image", seo.og_image_url, true);
      setMeta("twitter:card", "summary_large_image");
      setMeta("twitter:image", seo.og_image_url);
    }

    if (seo.og_image_alt) {
      setMeta("og:image:alt", seo.og_image_alt, true);
    }
  }, [seo]);

  return null;
}
