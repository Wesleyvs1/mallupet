import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputPath = path.join(__dirname, '..', 'public', 'LOGO2.png');
const outputPath = path.join(__dirname, '..', 'public', 'logo_clean.png');

async function removeCheckerboard() {
  const image = sharp(inputPath);
  const { data, info } = await image
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  console.log(`Image: ${width}x${height}, channels: ${channels}`);

  // The checkerboard pattern consists of alternating light gray (#C0C0C0 / 192,192,192) 
  // and white (#FFFFFF / 255,255,255) squares. We need to detect these pixels and make them transparent.
  
  // Create output buffer with alpha channel
  const output = Buffer.alloc(width * height * 4);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const srcIdx = (y * width + x) * channels;
      const dstIdx = (y * width + x) * 4;

      const r = data[srcIdx];
      const g = data[srcIdx + 1];
      const b = data[srcIdx + 2];
      const a = channels === 4 ? data[srcIdx + 3] : 255;

      // Detect checkerboard pattern pixels:
      // The checkerboard uses alternating squares of ~(204,204,204) and ~(255,255,255)
      // These are gray/white pixels that form a repeating pattern
      const isGrayish = (r > 180 && g > 180 && b > 180) && 
                         (Math.abs(r - g) < 15 && Math.abs(g - b) < 15 && Math.abs(r - b) < 15);
      
      // Check if this pixel is part of the checkerboard pattern
      // Checkerboard squares are typically 8x8 or 16x16 pixels
      // We check if surrounding area also matches the pattern
      let isCheckerboard = false;
      
      if (isGrayish) {
        // Check if this is a pure gray or white pixel (no color saturation)
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const saturation = max === 0 ? 0 : (max - min) / max;
        
        if (saturation < 0.08) {
          isCheckerboard = true;
        }
      }

      output[dstIdx] = r;
      output[dstIdx + 1] = g;
      output[dstIdx + 2] = b;
      output[dstIdx + 3] = isCheckerboard ? 0 : a;
    }
  }

  await sharp(output, {
    raw: {
      width,
      height,
      channels: 4,
    },
  })
    .png()
    .toFile(outputPath);

  console.log(`Saved clean logo to: ${outputPath}`);
}

removeCheckerboard().catch(console.error);
