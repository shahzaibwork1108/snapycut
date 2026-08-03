import type { SectionKey, VideoSection } from "../../types/content";

export interface SectionAdminConfig {
  label: string;
  description: string;
  previewPath: string;
  images?: { key: string; label: string }[];
  videoSections?: { key: VideoSection; label: string; isYoutube?: boolean }[];
  thumbnails?: boolean;
  showCta?: boolean;
  fields: {
    title?: string;
    title_highlight?: string;
    subtitle?: string;
    description?: string;
    extra?: { key: string; label: string }[];
  };
  cards?: boolean;
  socialLinks?: boolean;
  whatsapp?: boolean;
}

export const SECTION_ADMIN_CONFIG: Record<SectionKey, SectionAdminConfig> = {
  navbar: {
    label: "Navbar",
    description: "Logo, tagline, and top CTA button",
    previewPath: "/",
    images: [{ key: "logo", label: "Logo" }],
    showCta: true,
    fields: {
      extra: [{ key: "tagline", label: "Tagline (under logo)" }],
    },
  },
  hero: {
    label: "Hero Section",
    description: "Main headline, subtext, CTA, background image & portrait video",
    previewPath: "/#hero-section",
    images: [{ key: "hero_bg", label: "Hero Background Image" }],
    videoSections: [{ key: "hero", label: "Portrait Player Video" }],
    showCta: true,
    fields: {
      subtitle: "Headline line 1 start (e.g. Post)",
      title_highlight: "Headline highlight (e.g. Every day.)",
      title: "Headline line 2 (e.g. Manage nothing.)",
      description: "Subtext paragraph",
    },
  },
  growth_options: {
    label: "Growth Options",
    description: "Two Ways to Grow section heading and cards",
    previewPath: "/",
    fields: {
      title: "Heading before highlight",
      title_highlight: "Highlighted word (Snapycut)",
    },
    cards: true,
  },
  short_form: {
    label: "Short Form Content",
    description: "Proof Before Promises + Short Form headings and videos",
    previewPath: "/",
    videoSections: [{ key: "short_form", label: "Short Form Videos" }],
    fields: {
      title: "Heading 1 — green part",
      title_highlight: "Heading 1 — white part",
      subtitle: "Heading 1 description",
      extra: [
        { key: "heading2_green", label: "Heading 2 — green part" },
        { key: "heading2_white", label: "Heading 2 — white part" },
      ],
      description: "Heading 2 description",
    },
  },
  recent_cuts: {
    label: "SaaS Explainer Videos",
    description: "SaaS vertical & horizontal video marquees",
    previewPath: "/",
    videoSections: [
      { key: "saas_short", label: "Vertical Videos (9:16)" },
      { key: "saas_horizontal", label: "Horizontal Videos (16:9)" },
    ],
    fields: {
      title: "Heading — green part",
      title_highlight: "Heading — white part",
      subtitle: "Section description",
    },
  },
  ai_video_ads: {
    label: "AI Video Ads",
    description: "Square AI video ads marquee",
    previewPath: "/",
    videoSections: [{ key: "ai_video_ads", label: "AI Video Ads (Square)" }],
    fields: {
      title: "Heading — green part",
      title_highlight: "Heading — white part",
      subtitle: "Section description",
    },
  },
  ai_avatar: {
    label: "AI Avatar Videos",
    description: "YouTube avatar video IDs marquee",
    previewPath: "/",
    videoSections: [{ key: "ai_avatar", label: "YouTube Video IDs", isYoutube: true }],
    fields: {
      title: "Heading — green part",
      title_highlight: "Heading — white part",
      subtitle: "Section description",
    },
  },
  thumbnails: {
    label: "Thumbnails Portfolio",
    description: "Section heading and portfolio thumbnail rows",
    previewPath: "/",
    thumbnails: true,
    fields: {
      title: "Heading — green part",
      title_highlight: "Heading — white part",
      subtitle: "Section description",
    },
  },
  client_say: {
    label: "Client Say",
    description: "Section heading — edit Mikel & Viktor profiles on Client Say page",
    previewPath: "/#client-say-section",
    fields: {
      title: "Heading — first word",
      title_highlight: "Heading — highlighted part",
    },
  },
  testimonials: {
    label: "Testimonials",
    description: "Section heading — edit carousel cards on Testimonials page",
    previewPath: "/#testimonials-section",
    fields: {
      title: "Section heading",
    },
  },
  cta: {
    label: "CTA Section",
    description: "Ready to Post call-to-action block",
    previewPath: "/#ready-to-post-cta-section",
    showCta: true,
    fields: {
      subtitle: "Badge text (Ready to Post)",
      title: "Headline line 1",
      title_highlight: "Headline line 2",
      description: "Description paragraph",
      extra: [{ key: "discount_text", label: "Discount hook text" }],
    },
  },
  footer: {
    label: "Footer",
    description: "Footer description, social links & WhatsApp button",
    previewPath: "/#custom-snapycut-footer",
    fields: {
      description: "Footer description",
      extra: [{ key: "copyright", label: "Copyright text (without year)" }],
    },
    socialLinks: true,
    whatsapp: true,
  },
  discount_popup: {
    label: "Discount Popup",
    description: "The popup that appears after page load — enable/disable, set delay, edit text & CTA",
    previewPath: "/",
    showCta: true,
    fields: {
      title: "Heading — text before highlight (e.g. 'Avail ')",
      title_highlight: "Heading — highlighted word (e.g. '50% discount')",
      subtitle: "Heading — text after highlight (e.g. ' by booking a call now')",
      description: "Sub-description below heading",
      extra: [
        { key: "badge_text", label: "Badge text (e.g. 'Limited Time Offer')" },
        { key: "delay_seconds", label: "Popup delay (seconds) — e.g. 1, 2, 3, 5" },
        { key: "is_active", label: "Show Popup? (true / false)" },
      ],
    },
  },
  privacy_policy: {
    label: "Privacy Policy",
    description: "Enter custom HTML to override the default Privacy Policy page.",
    previewPath: "/privacy-policy",
    fields: {
      description: "Custom HTML Content",
    },
  },
  terms_conditions: {
    label: "Terms & Conditions",
    description: "Enter custom HTML to override the default Terms & Conditions page.",
    previewPath: "/terms-conditions",
    fields: {
      description: "Custom HTML Content",
    },
  },
};

export const SECTION_NAV_GROUPS = [
  {
    label: "Global",
    items: ["navbar", "footer", "cta", "discount_popup"] as SectionKey[],
  },
  {
    label: "Page Sections",
    items: [
      "hero",
      "growth_options",
      "short_form",
      "recent_cuts",
      "ai_video_ads",
      "ai_avatar",
      "thumbnails",
      "client_say",
      "testimonials",
      "privacy_policy",
      "terms_conditions",
    ] as SectionKey[],
  },
];
