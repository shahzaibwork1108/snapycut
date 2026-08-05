const fs = require('fs');

function extractHtml(code) {
  let html = code;
  
  const bodyMatch = html.match(/\{\/\* Body \*\/\}\\n\s*<div[^>]*>(.*?)<\/div>\\n\s*<\/main>/s);
  if (bodyMatch) html = bodyMatch[1];
  
  // Clean up React components inside the fallback
  html = html.replace(/\{section\.description \? .*? : \(\s*<>\s*/s, '');
  html = html.replace(/<\/div>\\n\s*<\/Section>\\n\s*<\/>\\n\s*\)}/s, '</div>\n</Section>');
  
  html = html.replace(/<Section title=\"(.*?)\">/g, '<h2>$1</h2>');
  html = html.replace(/<Section>/g, '');
  html = html.replace(/<\/Section>/g, '');
  
  html = html.replace(/<SubHeading[^>]*>(.*?)<\/SubHeading>/gs, '<h3>$1</h3>');
  
  html = html.replace(/<List items=\{\[\s*([^\]]+?)\s*\]\} \/>/gs, (match, itemsStr) => {
    const items = itemsStr.split(/\"\,\s*\"/);
    const cleanItems = items.map(i => i.replace(/^\"|\"\,?$/g, '').trim());
    return '<ul>\n' + cleanItems.map(i => `  <li>${i}</li>`).join('\n') + '\n</ul>';
  });
  
  html = html.replace(/<a href=\"(.*?)\"[^>]*>(.*?)<\/a>/g, '<a href=\"$1\">$2</a>');
  html = html.replace(/<p className=\"[^\"]*\">/g, '<p>');
  html = html.replace(/<div className=\"[^\"]*\">/g, '<div>');
  html = html.replace(/ className=\"[^\"]*\"/g, '');
  
  // Remove trailing < />)} from fallback
  html = html.replace(/<\/>\s*\)}/s, '');

  // Add phone number after email
  html = html.replace(/<p>Email: <a href="mailto:hello@snapycut\.com">hello@snapycut\.com<\/a><\/p>/g, '<p>Email: <a href="mailto:hello@snapycut.com">hello@snapycut.com</a></p>\n  <p>Phone: +1 929-597-1197</p>');

  // Remove JSX comments
  html = html.replace(/\{\/\*.*?\*\/\}/g, '');
  
  // Trim spaces and newlines
  html = html.split('\n').map(line => line.trim()).filter(line => line.length > 0).join('\n');
  
  return html.trim();
}

// ═══ PERFORMANCE: Legal text is kept out of the main JS bundle.
// The pages (PrivacyPolicy.tsx / TermsConditions.tsx) already have inline
// fallback content, so we no longer inject the legal text into sectionDefaults.ts.
// This keeps the main bundle small and defers legal content to lazy-loaded pages.
console.log("Legal text is kept out of the main bundle for performance. Skipping injection into sectionDefaults.ts.");