import type { SectionContent, SectionKey, SiteContent } from "../types/content";

export const defaultSections: Record<SectionKey, SectionContent> = {
  navbar: {
    title: "",
    title_highlight: "",
    subtitle: "",
    description: "",
    cta_text: "Book A Free Strategy Call",
    cta_url: "https://calendly.com/snapycut/30min",
    extra: { tagline: "Powered by Synaryverse" },
  },
  hero: {
    title: "Manage nothing.",
    title_highlight: "Every day.",
    subtitle: "Post",
    description:
      "Post more. Stress less. Grow faster. At Snapycut, we transform your raw content into ready-to-post assets with strategy, editing, scripting, posting, and management handled for you.",
    cta_text: "Book A Call",
    cta_url: "https://calendly.com/snapycut/30min",
    extra: {},
  },
  growth_options: {
    title: "Two Ways to Grow with",
    title_highlight: "Snapycut",
    subtitle: "",
    description: "",
    cta_text: "",
    cta_url: "",
    extra: {
      cards: [
        {
          badge: "Done-With-You",
          title: "Content System",
          description:
            "For creators, personal brands, coaches, consultants, and businesses that already create content but need help turning it into consistent, ready-to-post assets.",
          link_text: "Scale Your Brand",
        },
        {
          badge: "Fully Automated",
          title: "AI Content System",
          description:
            "For businesses that want professional, high-quality content and advertisements without constant filming and recording.",
          link_text: "Zero Filming Required",
        },
      ],
    },
  },
  short_form: {
    title: "Proof Before",
    title_highlight: " Promises.",
    subtitle: "Watch the content we create before you decide to work with us.",
    description: "Scroll-stopping videos built to hold attention and drive engagement.",
    cta_text: "",
    cta_url: "",
    extra: {
      heading2_green: "Short Form",
      heading2_white: " Content.",
    },
  },
  recent_cuts: {
    title: "SaaS explainer",
    title_highlight: " videos.",
    subtitle: "Scroll-stopping videos built to hold attention and drive engagement.",
    description: "",
    cta_text: "",
    cta_url: "",
    extra: {},
  },
  ai_video_ads: {
    title: "AI Video",
    title_highlight: " Ads.",
    subtitle:
      "High converting AI powered video ads and creative content designed to help your brand look sharper and scale faster.",
    description: "",
    cta_text: "",
    cta_url: "",
    extra: {},
  },
  ai_avatar: {
    title: "AI Avatar",
    title_highlight: " Videos.",
    subtitle:
      "Professional AI Avatar videos for marketing explainers, spokesperson-style content, and brand communication without the need for cameras, studios, or constant filming.",
    description: "",
    cta_text: "",
    cta_url: "",
    extra: {},
  },
  thumbnails: {
    title: "Thumbnails",
    title_highlight: " Portfolio.",
    subtitle:
      "Click-worthy thumbnails and covers that build curiosity, improve first impressions, and make your content impossible to ignore",
    description: "",
    cta_text: "",
    cta_url: "",
    extra: {},
  },
  client_say: {
    title: "What",
    title_highlight: "Client Say",
    subtitle: "",
    description: "",
    cta_text: "",
    cta_url: "",
    extra: {},
  },
  testimonials: {
    title: "Testimonials",
    title_highlight: "",
    subtitle: "",
    description: "",
    cta_text: "",
    cta_url: "",
    extra: {},
  },
  cta: {
    title: "STOP PLANNING.",
    title_highlight: "START POSTING.",
    subtitle: "Ready to Post",
    description:
      "Book a free strategy call. We'll audit your current content, map a 30-day plan, and show you exactly what Snapycut looks like for your brand.",
    cta_text: "Book A free Strategy Call",
    cta_url: "https://calendly.com/snapycut/30min",
    extra: {
      discount_text: "Avail 50 percent discount by booking a call now",
    },
  },
  footer: {
    title: "",
    title_highlight: "",
    subtitle: "",
    description:
      "Snapycut handles your editing, scripting, thumbnails, and strategy – so you can show up every day without touching a timeline.",
    cta_text: "",
    cta_url: "",
    extra: {
      facebook: "https://www.facebook.com/Snapycut/",
      instagram: "https://www.instagram.com/snapycutcom/",
      twitter: "https://x.com/Snapycut",
      linkedin: "https://www.linkedin.com/company/snapycut/",
      whatsapp_number: "19295971197",
      whatsapp_message:
        'DM "GROWTH" to unlock our launch offer and free content strategy consultation.',
      copyright: "Snapycut. All Rights Reserved.",
    },
  },
  discount_popup: {
    title: "Avail ",
    title_highlight: "50% discount",
    subtitle: " by booking a call now",
    description: "Take your business to the next level with our expert strategies. Don't miss out on this exclusive deal!",
    cta_text: "Book A Free Strategy Call",
    cta_url: "https://calendly.com/snapycut/30min",
    extra: {
      is_active: "true",
      badge_text: "Limited Time Offer",
      delay_seconds: "3",
    },
  },
  privacy_policy: {
    title: "",
    title_highlight: "",
    subtitle: "",
    // Legal text is loaded lazily from separate files to keep the main bundle small
    description: "",
    cta_text: "",
    cta_url: "",
    extra: {},
  },
  terms_conditions: {
    title: "",
    title_highlight: "",
    subtitle: "",
    // Legal text is loaded lazily from separate files to keep the main bundle small
    description: "",
    cta_text: "",
    cta_url: "",
    extra: {},
  },
};

export function getSection(content: SiteContent, key: SectionKey): SectionContent {
  return content.sections[key] ?? defaultSections[key];
}

export function getExtraString(section: SectionContent, key: string, fallback = ""): string {
  const value = section.extra[key];
  return typeof value === "string" ? value : fallback;
}

export function getExtraCards(section: SectionContent): Array<{
  badge: string;
  title: string;
  description: string;
  link_text: string;
}> {
  const cards = section.extra.cards;
  if (!Array.isArray(cards)) return [];
  return cards.map((c) => ({
    badge: String((c as Record<string, unknown>).badge ?? ""),
    title: String((c as Record<string, unknown>).title ?? ""),
    description: String((c as Record<string, unknown>).description ?? ""),
    link_text: String((c as Record<string, unknown>).link_text ?? ""),
  }));
}
