import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputPath = join(__dirname, 'public', 'icon.png');
const outputPath = join(__dirname, 'public', 'icon-cropped.png');

async function cropIcon() {
  try {
    console.log('Cropping whitespace from icon to make it appear larger...');
    
    // sharp's trim() will remove all pixels that match the corner pixel color (which should be transparent now)
    await sharp(inputPath)
      .trim() // Automatically remove transparent/empty space
      .toFile(outputPath);
      
    console.log('Success! Saved to:', outputPath);
  } catch (error) {
    console.error('Error:', error);
  }
}

cropIcon();
