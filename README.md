<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/fe1ea615-b92c-4d3d-b594-add3cb36b35d

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Performance: Reduce first-request latency

- Install the compression plugin and build precompressed assets:

```bash
npm install --save-dev vite-plugin-compression
npm run build
```

- If you deploy to Netlify the included `public/_headers` helps cache static assets long-term while keeping `index.html` fresh. Many static hosts will automatically serve the generated `.br`/`.gz` files when available — verify your host's docs for precompressed asset support.

### Verify precompressed assets

After running `npm run build` you can quickly verify precompressed assets were generated using:

```bash
npm run build
npm run check:compressed
```

The script will list any common text assets (JS/CSS/HTML/SVG/JSON) that lack a `.br` or `.gz` companion in `dist/`.
