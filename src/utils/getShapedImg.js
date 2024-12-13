// src/utils/getShapedImg.js
export default function getShapedImg(blob, pathD, shapeWidth = 460, shapeHeight = 430) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      const url = URL.createObjectURL(blob);
      img.src = url;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = shapeWidth;
        canvas.height = shapeHeight;
        const ctx = canvas.getContext('2d');
        
        // Original cropped image dimensions
        const originalWidth = img.width;
        const originalHeight = img.height;
        const originalAspect = originalWidth / originalHeight;
        const shapeAspect = shapeWidth / shapeHeight;
  
        let drawWidth, drawHeight;
        
        // Fit the image into the shape dimensions while preserving aspect ratio
        if (originalAspect > shapeAspect) {
          // Image is relatively wider than shape
          drawWidth = shapeWidth;
          drawHeight = drawWidth / originalAspect;
        } else {
          // Image is relatively taller than shape
          drawHeight = shapeHeight;
          drawWidth = drawHeight * originalAspect;
        }
  
        // Center the image in the shape canvas
        const offsetX = (shapeWidth - drawWidth) / 2;
        const offsetY = (shapeHeight - drawHeight) / 2;
  
        // Clip to the custom shape
        const path = new Path2D(pathD);
        ctx.save();
        ctx.clip(path);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        ctx.restore();
  
        canvas.toBlob((shapedBlob) => {
          URL.revokeObjectURL(url);
          if (!shapedBlob) {
            reject(new Error('Failed to create shaped image'));
            return;
          }
          resolve(shapedBlob);
        }, 'image/png', 1);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error('Failed to load cropped image for shaping'));
      };
    });
  }
  