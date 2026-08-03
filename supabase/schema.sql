-- Snapycut Admin CMS Schema
-- Run this in Supabase SQL Editor

-- SEO Settings (single row)
CREATE TABLE IF NOT EXISTS seo_settings (
  id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  meta_title TEXT NOT NULL DEFAULT 'Snapycut - 2.8M+ Views Generated | Short Form Video Experts',
  meta_description TEXT NOT NULL DEFAULT 'Post more. Stress less. Grow faster. Snapycut transforms raw content into ready-to-post assets.',
  og_image_url TEXT DEFAULT '',
  og_image_alt TEXT DEFAULT 'Snapycut - Short Form Video Experts',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO seo_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- Section headings, copy, CTAs (navbar, hero, footer, etc.)
CREATE TABLE IF NOT EXISTS site_sections (
  section_key TEXT PRIMARY KEY,
  title TEXT NOT NULL DEFAULT '',
  title_highlight TEXT NOT NULL DEFAULT '',
  subtitle TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  cta_text TEXT NOT NULL DEFAULT '',
  cta_url TEXT NOT NULL DEFAULT '',
  extra JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site images (hero bg, logo, etc.)
CREATE TABLE IF NOT EXISTS site_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_key TEXT NOT NULL UNIQUE,
  cloudinary_url TEXT NOT NULL DEFAULT '',
  alt_text TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Thumbnail portfolio
CREATE TABLE IF NOT EXISTS thumbnail_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cloudinary_url TEXT NOT NULL,
  alt_text TEXT DEFAULT 'portfolio thumbnail',
  row_index INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Videos by section
CREATE TABLE IF NOT EXISTS site_videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT NOT NULL,
  url TEXT NOT NULL DEFAULT '',
  youtube_id TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials carousel
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT DEFAULT '',
  company TEXT DEFAULT '',
  avatar_url TEXT DEFAULT '',
  quote TEXT NOT NULL DEFAULT '',
  stat TEXT DEFAULT '',
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Featured client testimonials (Mikel, Viktor)
CREATE TABLE IF NOT EXISTS client_testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  role TEXT DEFAULT '',
  avatar_url TEXT DEFAULT '',
  video_url TEXT DEFAULT '',
  quote TEXT DEFAULT '',
  journey JSONB DEFAULT '[]'::jsonb,
  rating_stars INTEGER DEFAULT 5,
  rating_text TEXT DEFAULT '5 Star rated agency',
  heading_light TEXT DEFAULT '',
  heading_highlight TEXT DEFAULT '',
  cta_text TEXT DEFAULT 'Book A free Strategy Call',
  cta_url TEXT DEFAULT 'https://calendly.com/snapycut/30min',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE seo_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE thumbnail_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_testimonials ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "Public read seo_settings" ON seo_settings FOR SELECT USING (true);
CREATE POLICY "Public read site_sections" ON site_sections FOR SELECT USING (true);
CREATE POLICY "Public read site_images" ON site_images FOR SELECT USING (true);
CREATE POLICY "Public read thumbnail_images" ON thumbnail_images FOR SELECT USING (true);
CREATE POLICY "Public read site_videos" ON site_videos FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read client_testimonials" ON client_testimonials FOR SELECT USING (true);

-- Authenticated write
CREATE POLICY "Auth write seo_settings" ON seo_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write site_sections" ON site_sections FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write site_images" ON site_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write thumbnail_images" ON thumbnail_images FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write site_videos" ON site_videos FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Auth write client_testimonials" ON client_testimonials FOR ALL USING (auth.role() = 'authenticated');
