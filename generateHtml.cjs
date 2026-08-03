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

const privacyCode = fs.readFileSync('src/pages/PrivacyPolicy.tsx', 'utf8');
const termsCode = fs.readFileSync('src/pages/TermsConditions.tsx', 'utf8');

const pHTML = extractHtml(privacyCode);
const tHTML = extractHtml(termsCode);

let defaultsCode = fs.readFileSync('src/lib/sectionDefaults.ts', 'utf8');

defaultsCode = defaultsCode.replace(/privacy_policy: \{\s*title: \"\",\s*title_highlight: \"\",\s*subtitle: \"\",\s*description: \"\",/, 'privacy_policy: {\n    title: "",\n    title_highlight: "",\n    subtitle: "",\n    description: `' + pHTML.replace(/`/g, '\\`') + '`,');
defaultsCode = defaultsCode.replace(/terms_conditions: \{\s*title: \"\",\s*title_highlight: \"\",\s*subtitle: \"\",\s*description: \"\",/, 'terms_conditions: {\n    title: "",\n    title_highlight: "",\n    subtitle: "",\n    description: `' + tHTML.replace(/`/g, '\\`') + '`,');

fs.writeFileSync('src/lib/sectionDefaults.ts', defaultsCode);
console.log("Defaults updated.");
