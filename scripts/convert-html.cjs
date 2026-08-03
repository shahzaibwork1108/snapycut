const fs = require('fs');

const path = 'src/lib/sectionDefaults.ts';
let content = fs.readFileSync(path, 'utf8');

function htmlToMarkdown(html) {
  return html
    .replace(/<h2>(.*?)<\/h2>/g, '## $1')
    .replace(/<h3>(.*?)<\/h3>/g, '### $1')
    .replace(/<p>(.*?)<\/p>/g, '$1\n')
    .replace(/<ul>/g, '')
    .replace(/<\/ul>/g, '')
    .replace(/<li>(.*?)<\/li>/g, '- $1')
    .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
    .replace(/<a href="(.*?)">(.*?)<\/a>/g, '[$2]($1)')
    .replace(/\n\s*\n/g, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .trim();
}

// Extract privacy policy description
const privacyMatch = content.match(/privacy_policy:\s*\{[\s\S]*?description:\s*`([\s\S]*?)`,\s*cta_text/);
if (privacyMatch) {
  const md = htmlToMarkdown(privacyMatch[1]);
  content = content.replace(privacyMatch[1], md);
}

// Extract terms description
const termsMatch = content.match(/terms_conditions:\s*\{[\s\S]*?description:\s*`([\s\S]*?)`,\s*cta_text/);
if (termsMatch) {
  const md = htmlToMarkdown(termsMatch[1]);
  content = content.replace(termsMatch[1], md);
}

fs.writeFileSync(path, content);
console.log("Conversion complete.");
