// Generate PWA icons from an existing source image using sharp
// Usage: node scripts/generate-icons.mjs [sourcePath]
// Example: node scripts/generate-icons.mjs public/codecompass.png

import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const src = process.argv[2] || 'public/codecompass.png';
const appIconsDir = 'public/icons';
const publicDir = 'public';

async function main() {
  if (!fs.existsSync(src)) {
    console.error(`Source image not found: ${src}`);
    process.exit(1);
  }
  fs.mkdirSync(appIconsDir, { recursive: true });
  fs.mkdirSync(publicDir, { recursive: true });

  // App icons (used by manifest)
  const appIconTasks = [
    { size: 192, name: 'icon-192.png' },
    { size: 256, name: 'icon-256.png' },
    { size: 384, name: 'icon-384.png' },
    { size: 512, name: 'icon-512.png' },
    // maskable variants (recommended at least 192 and 512)
    { size: 192, name: 'icon-192-maskable.png', maskable: true },
    { size: 512, name: 'icon-512-maskable.png', maskable: true },
  ];

  // Favicons for browsers
  const faviconTasks = [
    { size: 16, name: 'favicon-16x16.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 48, name: 'favicon-48x48.png' },
  ];

  // Apple touch icon
  const appleTask = { size: 180, name: 'apple-touch-icon.png' };

  // Generate app icons
  for (const { size, name } of appIconTasks) {
    const dest = path.join(appIconsDir, name);
    await sharp(src)
      .resize(size, size, { fit: 'cover' })
      .png({ compressionLevel: 9 })
      .toFile(dest);
    console.log(`Generated ${dest}`);
  }

  // Generate favicons
  for (const { size, name } of faviconTasks) {
    const dest = path.join(publicDir, name);
    await sharp(src)
      .resize(size, size, { fit: 'cover' })
      .png({ compressionLevel: 9 })
      .toFile(dest);
    console.log(`Generated ${dest}`);
  }

  // Generate apple touch icon
  {
    const dest = path.join(publicDir, appleTask.name);
    await sharp(src)
      .resize(appleTask.size, appleTask.size, { fit: 'cover' })
      .png({ compressionLevel: 9 })
      .toFile(dest);
    console.log(`Generated ${dest}`);
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
