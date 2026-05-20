import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const arrowSvg =
  '<svg class="nav-link-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';
const ctaSvg =
  '<svg class="nav-cta-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
const closeSvg =
  '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>';
const burgerSvg =
  '<svg class="menu-toggle-icon" width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true"><rect class="menu-line menu-line-1" y="0" width="22" height="2" rx="1" fill="currentColor"/><rect class="menu-line menu-line-2" y="7" width="22" height="2" rx="1" fill="currentColor"/><rect class="menu-line menu-line-3" y="14" width="22" height="2" rx="1" fill="currentColor"/></svg>';

const idPages = [
  { file: 'index.html', current: 'beranda' },
  { file: 'tentang-kami.html', current: 'tentang' },
  { file: 'galeri-pilihan-payung.html', current: 'galeri' },
  { file: 'kontak.html', current: 'kontak' },
  { file: 'terima-kasih.html', current: null },
  { file: '404.html', current: null },
  { file: 'disclaimer.html', current: null },
  { file: 'kebijakan-privasi.html', current: null },
  { file: 'syarat-ketentuan.html', current: null },
];

const enPages = [
  { file: 'en/index.html', current: 'home' },
  { file: 'en/about.html', current: 'about' },
  { file: 'en/umbrella-gallery.html', current: 'gallery' },
  { file: 'en/contact.html', current: 'contact' },
  { file: 'en/thank-you.html', current: null },
  { file: 'en/404.html', current: null },
  { file: 'en/disclaimer.html', current: null },
  { file: 'en/privacy-policy.html', current: null },
  { file: 'en/terms-conditions.html', current: null },
];

function idNav(current) {
  const cur = (key) => (current === key ? ' aria-current="page"' : '');
  return `<button class="menu-toggle" type="button" data-menu-toggle aria-controls="main-menu" aria-expanded="false" aria-label="Buka menu">${burgerSvg}<span class="menu-toggle-label">Menu</span></button>
    <nav id="main-menu" class="nav-menu" data-menu aria-label="Navigasi utama">
      <div class="nav-menu-panel">
        <div class="nav-menu-header">
          <div><p class="nav-menu-eyebrow">Golden Inpan</p><p class="nav-menu-title">Navigasi</p></div>
          <button type="button" class="menu-close" data-menu-close aria-label="Tutup menu">${closeSvg}</button>
        </div>
        <div class="nav-links">
          <a href="index.html" class="nav-link"${cur('beranda')}><span class="nav-link-text"><span class="nav-link-label">Beranda</span><span class="nav-link-hint">Halaman utama</span></span>${arrowSvg}</a>
          <a href="tentang-kami.html" class="nav-link"${cur('tentang')}><span class="nav-link-text"><span class="nav-link-label">Tentang Kami</span><span class="nav-link-hint">Profil & nilai perusahaan</span></span>${arrowSvg}</a>
          <a href="galeri-pilihan-payung.html" class="nav-link"${cur('galeri')}><span class="nav-link-text"><span class="nav-link-label">Gallery Payung</span><span class="nav-link-hint">Model & komponen</span></span>${arrowSvg}</a>
        </div>
        <div class="nav-menu-actions">
          <a class="nav-cta" href="kontak.html"${cur('kontak')}><span>Konsultasi Kebutuhan</span>${ctaSvg}</a>
          <div class="lang-switch"><span class="lang-switch-label">Bahasa</span><span class="lang-switch-pills"><span class="lang-pill is-active" aria-current="true">ID</span><a href="en/index.html">EN</a></span></div>
        </div>
      </div>
    </nav>`;
}

function enNav(current) {
  const cur = (key) => (current === key ? ' aria-current="page"' : '');
  return `<button class="menu-toggle" type="button" data-menu-toggle aria-controls="main-menu" aria-expanded="false" aria-label="Open menu">${burgerSvg}<span class="menu-toggle-label">Menu</span></button>
    <nav id="main-menu" class="nav-menu" data-menu aria-label="Main navigation">
      <div class="nav-menu-panel">
        <div class="nav-menu-header">
          <div><p class="nav-menu-eyebrow">Golden Inpan</p><p class="nav-menu-title">Navigation</p></div>
          <button type="button" class="menu-close" data-menu-close aria-label="Close menu">${closeSvg}</button>
        </div>
        <div class="nav-links">
          <a href="index.html" class="nav-link"${cur('home')}><span class="nav-link-text"><span class="nav-link-label">Home</span><span class="nav-link-hint">Homepage</span></span>${arrowSvg}</a>
          <a href="about.html" class="nav-link"${cur('about')}><span class="nav-link-text"><span class="nav-link-label">About</span><span class="nav-link-hint">Company profile</span></span>${arrowSvg}</a>
          <a href="umbrella-gallery.html" class="nav-link"${cur('gallery')}><span class="nav-link-text"><span class="nav-link-label">Umbrella Gallery</span><span class="nav-link-hint">Models & components</span></span>${arrowSvg}</a>
        </div>
        <div class="nav-menu-actions">
          <a class="nav-cta" href="contact.html"${cur('contact')}><span>Request a Quote</span>${ctaSvg}</a>
          <div class="lang-switch"><span class="lang-switch-label">Language</span><span class="lang-switch-pills"><a href="../index.html">ID</a><span class="lang-pill is-active" aria-current="true">EN</span></span></div>
        </div>
      </div>
    </nav>`;
}

const navPattern =
  /<button class="menu-toggle"[\s\S]*?<\/nav>/;

for (const { file, current } of idPages) {
  const path = join(root, file);
  let html = readFileSync(path, 'utf8');
  html = html.replace(navPattern, idNav(current));
  writeFileSync(path, html);
  console.log('patched', file);
}

for (const { file, current } of enPages) {
  const path = join(root, file);
  let html = readFileSync(path, 'utf8');
  html = html.replace(navPattern, enNav(current));
  writeFileSync(path, html);
  console.log('patched', file);
}
