import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function optimizeProfileImage() {
  const inputPath = path.join(__dirname, '../public/profile-photo.jpg');
  const outputDir = path.join(__dirname, '../public');
  
  console.log('Ottimizzazione immagine del profilo...');
  
  try {
    // Backup dell'immagine originale
    const backupPath = path.join(outputDir, 'profile-photo-original.jpg');
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(inputPath, backupPath);
      console.log('✓ Backup creato: profile-photo-original.jpg');
    }
    
    // Ottimizza l'immagine principale (WebP)
    await sharp(inputPath)
      .resize(800, 800, { 
        fit: 'cover',
        position: 'center'
      })
      .webp({ 
        quality: 85,
        effort: 6
      })
      .toFile(path.join(outputDir, 'profile-photo.webp'));
    
    console.log('✓ Immagine WebP ottimizzata creata');
    
    // Ottimizza anche una versione JPEG di fallback
    await sharp(inputPath)
      .resize(800, 800, { 
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ 
        quality: 80,
        progressive: true
      })
      .toFile(path.join(outputDir, 'profile-photo-optimized.jpg'));
    
    console.log('✓ Immagine JPEG ottimizzata creata');
    
    // Crea anche versioni più piccole per lazy loading
    await sharp(inputPath)
      .resize(100, 100, { 
        fit: 'cover',
        position: 'center'
      })
      .webp({ 
        quality: 60
      })
      .toFile(path.join(outputDir, 'profile-photo-placeholder.webp'));
    
    console.log('✓ Placeholder ottimizzato creato');
    
    // Statistiche sui file
    const originalSize = fs.statSync(inputPath).size;
    const webpSize = fs.statSync(path.join(outputDir, 'profile-photo.webp')).size;
    const jpegSize = fs.statSync(path.join(outputDir, 'profile-photo-optimized.jpg')).size;
    
    console.log('\n📊 Statistiche ottimizzazione:');
    console.log(`Originale: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`WebP: ${(webpSize / 1024 / 1024).toFixed(2)} MB (${((1 - webpSize/originalSize) * 100).toFixed(1)}% riduzione)`);
    console.log(`JPEG: ${(jpegSize / 1024 / 1024).toFixed(2)} MB (${((1 - jpegSize/originalSize) * 100).toFixed(1)}% riduzione)`);
    
  } catch (error) {
    console.error('Errore durante l\'ottimizzazione:', error);
  }
}

optimizeProfileImage();
