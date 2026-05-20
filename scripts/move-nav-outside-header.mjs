import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const files = [
  'index.html',
  'tentang-kami.html',
  'galeri-pilihan-payung.html',
  'kontak.html',
  'terima-kasih.html',
  '404.html',
  'disclaimer.html',
  'kebijakan-privasi.html',
  'syarat-ketentuan.html',
  'en/index.html',
  'en/about.html',
  'en/umbrella-gallery.html',
  'en/contact.html',
  'en/thank-you.html',
  'en/404.html',
  'en/disclaimer.html',
  'en/privacy-policy.html',
  'en/terms-conditions.html',
];

const navRe = /\s*<nav id="main-menu"[\s\S]*?<\/nav>\s*/;
const headerRe = /(<header class="site-header"[\s\S]*?<\/header>)/;

for (const file of files) {
  const path = join(root, file);
  let html = readFileSync(path, 'utf8');
  const navMatch = html.match(navRe);
  if (!navMatch) {
    console.warn('skip (no nav):', file);
    continue;
  }
  const nav = navMatch[0].trim();
  html = html.replace(navRe, '\n');
  if (!html.includes(nav)) {
    html = html.replace(headerRe, `$1\n${nav}\n`);
    writeFileSync(path, html);
    console.log('moved nav:', file);
  } else {
    console.log('already ok:', file);
  }
}
