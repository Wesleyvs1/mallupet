const { Jimp } = require('jimp'); // If Jimp v1+
// or const Jimp = require('jimp'); for older

async function main() {
  let jimpModule;
  try {
    jimpModule = require('jimp');
  } catch(e) {
    console.error('Failed to require jimp', e);
    return;
  }
  
  const Jimp = jimpModule.default || jimpModule.Jimp || jimpModule;

  try {
    const image = await Jimp.read('public/logo1.png');
    const tolerance = 20; 
    
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      
      // Target: #efefef (239, 239, 239) or #ffffff (255, 255, 255) because compression artifacts
      // Let's make anything close to 239,239,239 transparent
      if (Math.abs(r - 239) <= tolerance && Math.abs(g - 239) <= tolerance && Math.abs(b - 239) <= tolerance) {
        this.bitmap.data[idx + 3] = 0;
      }
      // Also make pure white or very close to white transparent since the user might mean the general background
      else if (r > 240 && g > 240 && b > 240) {
        this.bitmap.data[idx + 3] = 0;
      }
    });
    
    if(image.writeAsync) {
      await image.writeAsync('public/logo1_transparent.png');
    } else {
      await image.write('public/logo1_transparent.png');
    }
    console.log('Done!');
  } catch (err) {
    console.error(err);
  }
}

main();
