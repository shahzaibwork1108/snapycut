import type { SiteContent } from "../types/content";
import { defaultSections } from "./sectionDefaults";

const shortFormVideos = Array.from({ length: 11 }, (_, i) => ({
  section: "short_form" as const,
  url: `/synaryverse-new-video/video${i + 1}.mp4`,
  sort_order: i,
}));

const saasShortVideos = Array.from({ length: 11 }, (_, i) => ({
  section: "saas_short" as const,
  url: `/synaryverse-new-video/video${i + 1}.mp4`,
  sort_order: i,
}));

const saasHorizontalVideos = Array.from({ length: 18 }, (_, i) => ({
  section: "saas_horizontal" as const,
  url: `/horizontal-videos/video${i + 1}.mp4`,
  sort_order: i,
}));

const aiVideoAds = [
  { section: "ai_video_ads" as const, url: "https://youtu.be/wpYrXGe8214", sort_order: 0 },
  { section: "ai_video_ads" as const, url: "https://youtu.be/PXMNaDqB9Ss", sort_order: 1 },
  { section: "ai_video_ads" as const, url: "https://youtu.be/Ni_GSgfA_ew", sort_order: 2 },
  { section: "ai_video_ads" as const, url: "https://youtu.be/SuEOL1Y8kVc", sort_order: 3 },
  { section: "ai_video_ads" as const, url: "https://youtu.be/5dXpTRGb9E8", sort_order: 4 },
  { section: "ai_video_ads" as const, url: "https://youtu.be/8yD0BwfmjGg", sort_order: 5 },
  { section: "ai_video_ads" as const, url: "https://youtu.be/m_De0tyUUzY", sort_order: 6 },
];

const aiAvatarIds = [
  "3vj12N3XB94", "1ZLvF9UJbLI", "FmzuCouEZ3k", "WacqFOhQ4bs",
  "6ycFFaOiHSY", "SbKjQDBM91g", "yIW0w109yJo", "Myy3kYy2YYE",
  "x3ZxsHh5oqw", "AtPUWr6KDXs", "fRSleNfIT10",
];

export const defaultContent: SiteContent = {
  seo: {
    meta_title: "Snapycut - 2.8M+ Views Generated | Short Form Video Experts",
    meta_description:
      "Post more. Stress less. Grow faster. At Snapycut, we transform your raw content into ready-to-post assets with strategy, editing, scripting, posting, and management handled for you.",
    og_image_url: "",
    og_image_alt: "Snapycut - Short Form Video Experts",
  },
  sections: structuredClone(defaultSections),
  images: {
    hero_bg: {
      image_key: "hero_bg",
      cloudinary_url: "/assets/hero/hero-bg-image-1.avif",
      alt_text: "Hero Background Mesh",
    },
    logo: {
      image_key: "logo",
      cloudinary_url: "/assets/navbar/logo.png",
      alt_text: "Snapycut Logo",
    },
  },
  thumbnails: [
    { cloudinary_url: "/assets/hero/thumbnail1.png", alt_text: "portfolio", row_index: 0, sort_order: 0 },
    { cloudinary_url: "/assets/hero/thumbnail2.png", alt_text: "portfolio", row_index: 0, sort_order: 1 },
    { cloudinary_url: "/assets/hero/thumbnail3.png", alt_text: "portfolio", row_index: 0, sort_order: 2 },
    { cloudinary_url: "/assets/hero/thumbnail4.png", alt_text: "portfolio", row_index: 0, sort_order: 3 },
    { cloudinary_url: "/assets/hero/thumbnail5.png", alt_text: "portfolio", row_index: 1, sort_order: 0 },
    { cloudinary_url: "/assets/hero/thumbnail6.png", alt_text: "portfolio", row_index: 1, sort_order: 1 },
    { cloudinary_url: "/assets/hero/thumbnail7.png", alt_text: "portfolio", row_index: 1, sort_order: 2 },
    { cloudinary_url: "/assets/hero/thumbnail8.png", alt_text: "portfolio", row_index: 2, sort_order: 0 },
    { cloudinary_url: "/assets/hero/thumbnail9.png", alt_text: "portfolio", row_index: 2, sort_order: 1 },
    { cloudinary_url: "/assets/hero/thumbnail10.png", alt_text: "portfolio", row_index: 2, sort_order: 2 },
  ],
  videos: {
    hero: [{
      section: "hero",
      url: "https://youtube.com/shorts/T-LO45f-59o?si=KcSAxQ2y5V_4txZY",
      sort_order: 0,
    }],
    short_form: shortFormVideos,
    saas_short: saasShortVideos,
    saas_horizontal: saasHorizontalVideos,
    ai_video_ads: aiVideoAds,
    ai_avatar: aiAvatarIds.map((id, i) => ({
      section: "ai_avatar" as const,
      url: "",
      youtube_id: id,
      sort_order: i,
    })),
  },
  testimonials: [
    {
      name: "Dragana Obradovic",
      role: "TikTok Influencer",
      company: "",
      avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
      quote: "Snapycut completely changed the way we handle content. We used to spend hours editing and posting. Now, everything runs through one organized system, and the quality has been consistently strong. It feels like having a full content team",
      stat: "3.2M views in 30 days",
      sort_order: 0,
    },
    {
      name: "Goodluck Igwe",
      role: "Inspire Media Group",
      company: "",
      avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
      quote: "The biggest difference for us was consistency. Snapycut helped us create polished short-form videos with their AI- powered technology.Their team understood our brand quickly and made the whole process much easier to manage.",
      stat: "+22K followers in 60 days",
      sort_order: 1,
    },
    {
      name: "Jordan K.",
      role: "Inspire Media Group",
      company: "",
      avatar_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
      quote: "Working with Snapycut helped us produce more content without adding pressure on our internal team. Their edits were clean, fast, and aligned with our brand from the start. Within weeks, we had a smoother content workflow and a much more professional social presence.",
      stat: "4× posting cadence",
      sort_order: 2,
    },
    {
      name: "Sarah Jenkins",
      role: "YT Tech Creator",
      company: "",
      avatar_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
      quote: "They made content production feel simple. With their AI technology and expertise in editing, thumbnails, revisions, and delivery, we didn't have to chase anything. The process was organized, the turnaround was quick, and the final content looked exactly how we wanted.",
      stat: "140% subscriber boost",
      sort_order: 3,
    },
  ],
  clientSay: {
    mikel: {
      slug: "mikel",
      name: "Mikel",
      role: "SaaS Founder",
      avatar_url: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
      video_url: "",
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim",
      journey: [
        "Get consistent content without the creative chaos. We build systems that help brands staycompatible, look professional, and grow faster",
        "Our clients have generated 2.8M+ views and reduced content production workload by 80%",
      ],
      rating_stars: 5,
      rating_text: "5 Star rated agency",
      heading_light: "Real Results. Real ",
      heading_highlight: "Content. Real Growth.",
      cta_text: "Book A free Strategy Call",
      cta_url: "https://calendly.com/snapycut/30min",
    },
    viktor: {
      slug: "viktor",
      name: "Viktor",
      role: "SaaS Founder",
      avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      video_url: "",
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim",
      journey: [
        "Viktor partnered with Snapycut a few months ago to transform how his SaaS product was presented to potential customers.",
        "What stood out most to him was Snapycut's smooth workflow, fast turnaround times, and consistent creative quality – solving the frustration he'd previously faced with unreliable editing teams and delayed deliveries. With a dedicated creative team, quality control process, and clear communication throughout the project, Snapycut ensured his explainer video felt modern, polished, and perfectly aligned with his brand.",
        "From concept development and scripting to motion design and final delivery, Snapycut handled the entire production process – helping bring his SaaS product to life through a clear and engaging visual story that connected with viewers and delivered real value.",
        "Today, Viktor describes the experience as professional, seamless, and genuinely supportive. He highly recommends Snapycut to any SaaS founder looking for a creative video partner that delivers high-quality work they can truly rely on.",
      ],
      rating_stars: 5,
      rating_text: "5 Star rated agency",
      heading_light: "Viktor Journey with ",
      heading_highlight: "Snapycut",
      cta_text: "Book A free Strategy Call",
      cta_url: "https://calendly.com/snapycut/30min",
    },
  },
};

export function getVideoUrls(section: keyof SiteContent["videos"], content: SiteContent): string[] {
  return content.videos[section]
    .slice()
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((v) => v.url)
    .filter(Boolean);
}

export function getYoutubeIds(content: SiteContent): string[] {
  return content.videos.ai_avatar
    .slice()
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((v) => v.youtube_id ?? "")
    .filter(Boolean);
}

export function getThumbnailRows(content: SiteContent): string[][] {
  const rows: Record<number, { url: string; sort: number }[]> = {};
  for (const t of content.thumbnails) {
    if (!rows[t.row_index]) rows[t.row_index] = [];
    rows[t.row_index].push({ url: t.cloudinary_url, sort: t.sort_order });
  }
  return Object.keys(rows)
    .map(Number)
    .sort((a, b) => a - b)
    .map((rowIdx) =>
      rows[rowIdx]
        .sort((a, b) => a.sort - b.sort)
        .map((x) => x.url)
    );
}

export function getImageUrl(content: SiteContent, key: string, fallback: string): string {
  return content.images[key]?.cloudinary_url || fallback;
}

export function getImageAlt(content: SiteContent, key: string, fallback: string): string {
  return content.images[key]?.alt_text || fallback;
}

export { getSection, getExtraString, getExtraCards } from "./sectionDefaults";
