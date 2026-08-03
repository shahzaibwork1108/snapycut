export interface SeoSettings {
  meta_title: string;
  meta_description: string;
  og_image_url: string;
  og_image_alt: string;
}

export interface SiteImage {
  image_key: string;
  cloudinary_url: string;
  alt_text: string;
}

export interface ThumbnailImage {
  id?: string;
  cloudinary_url: string;
  alt_text: string;
  row_index: number;
  sort_order: number;
}

export type VideoSection =
  | "hero"
  | "short_form"
  | "saas_short"
  | "saas_horizontal"
  | "ai_video_ads"
  | "ai_avatar";

export interface SiteVideo {
  id?: string;
  section: VideoSection;
  url: string;
  youtube_id?: string | null;
  sort_order: number;
}

export interface Testimonial {
  id?: string;
  name: string;
  role: string;
  company: string;
  avatar_url: string;
  quote: string;
  stat: string;
  sort_order: number;
}

export interface ClientTestimonial {
  id?: string;
  slug: string;
  name: string;
  role: string;
  avatar_url: string;
  video_url: string;
  quote: string;
  journey: string[];
  rating_stars?: number;
  rating_text?: string;
  heading_light?: string;
  heading_highlight?: string;
  cta_text?: string;
  cta_url?: string;
}

export type SectionKey =
  | "navbar"
  | "hero"
  | "growth_options"
  | "short_form"
  | "recent_cuts"
  | "ai_video_ads"
  | "ai_avatar"
  | "thumbnails"
  | "client_say"
  | "testimonials"
  | "cta"
  | "footer"
  | "discount_popup"
  | "privacy_policy"
  | "terms_conditions";

export interface SectionContent {
  title: string;
  title_highlight: string;
  subtitle: string;
  description: string;
  cta_text: string;
  cta_url: string;
  extra: Record<string, unknown>;
}

export interface SiteContent {
  seo: SeoSettings;
  sections: Record<SectionKey, SectionContent>;
  images: Record<string, SiteImage>;
  thumbnails: ThumbnailImage[];
  videos: Record<VideoSection, SiteVideo[]>;
  testimonials: Testimonial[];
  clientSay: Record<string, ClientTestimonial>;
}
