import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateFavicons() {
  const logoBuffer = fs.readFileSync(path.join(__dirname, '../public/logo.png'));
  const publicDir = path.join(__dirname, '../public');

  const sizes = [
    { size: 16, name: 'favicon-16x16.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 192, name: 'android-chrome-192x192.png' },
    { size: 512, name: 'android-chrome-512x512.png' }
  ];

  try {
    // Genera tutte le dimensioni PNG
    for (const { size, name } of sizes) {
      await sharp(logoBuffer)
        .resize(size, size)
        .png()
        .toFile(path.join(publicDir, name));
      
      console.log(`✅ Generato ${name} (${size}x${size})`);
    }

    // Genera favicon.ico (combinazione di 16x16 e 32x32)
    const favicon16 = await sharp(logoBuffer).resize(16, 16).png().toBuffer();
    const favicon32 = await sharp(logoBuffer).resize(32, 32).png().toBuffer();
    
    // Per ora salviamo solo il 32x32 come .ico (Sharp non supporta nativamente ICO multi-dimensione)
    await sharp(logoBuffer)
      .resize(32, 32)
      .png()
      .toFile(path.join(publicDir, 'favicon.ico'));
    
    console.log('✅ Generato favicon.ico');

    // Aggiorniamo anche il favicon.svg per consistenza
    await sharp(logoBuffer)
      .resize(32, 32)
      .png()
      .toFile(path.join(publicDir, 'favicon.png'));
    
    console.log('✅ Generato favicon.png');

    // Genera web app manifest
    const manifest = {
      name: "Calanco Portfolio",
      short_name: "Calanco",
      description: "Portfolio di Calanco - Crafting Robust APIs",
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#3B82F6",
      icons: [
        {
          src: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png"
        }
      ]
    };

    fs.writeFileSync(
      path.join(publicDir, 'site.webmanifest'),
      JSON.stringify(manifest, null, 2)
    );
    
    console.log('✅ Generato site.webmanifest');
    console.log('\n🎉 Tutte le favicon sono state generate con successo!');
    
  } catch (error) {
    console.error('❌ Errore durante la generazione delle favicon:', error);
  }
}

generateFavicons();
