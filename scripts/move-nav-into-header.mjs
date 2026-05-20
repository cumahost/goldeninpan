import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const files = [
  'index.html', 'tentang-kami.html', 'galeri-pilihan-payung.html', 'kontak.html',
  'terima-kasih.html', '404.html', 'disclaimer.html', 'kebijakan-privasi.html', 'syarat-ketentuan.html',
  'en/index.html', 'en/about.html', 'en/umbrella-gallery.html', 'en/contact.html',
  'en/thank-you.html', 'en/404.html', 'en/disclaimer.html', 'en/privacy-policy.html', 'en/terms-conditions.html',
];

const navRe = /<nav id="main-menu"[\s\S]*?<\/nav>/;
const insertRe = /(<button class="menu-toggle"[\s\S]*?<\/button>)\s*(<\/div>\s*<\/header>)/;

for (const file of files) {
  const path = join(root, file);
  let html = readFileSync(path, 'utf8');
  const navMatch = html.match(navRe);
  if (!navMatch) {
    console.warn('skip:', file);
    continue;
  }
  const nav = navMatch[0];
  html = html.replace(navRe, '');
  if (!insertRe.test(html)) {
    console.warn('insert point missing:', file);
    continue;
  }
  html = html.replace(insertRe, `$1\n    ${nav}\n  $2`);
  writeFileSync(path, html);
  console.log('ok:', file);
}
