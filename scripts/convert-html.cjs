const fs = require('fs');

// ═══ PERFORMANCE: Legal text is kept out of the main JS bundle.
// The pages (PrivacyPolicy.tsx / TermsConditions.tsx) already have inline
// fallback content, so we no longer inject the legal text into sectionDefaults.ts.
// This keeps the main bundle small and defers legal content to lazy-loaded pages.
console.log("Legal text is kept out of the main bundle for performance. Skipping conversion.");