export default function getCroppedImg(imageSrc, croppedAreaPixels) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = "anonymous"; // Handle cross-origin images
      image.src = imageSrc;
  
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
  
        // Set the canvas size to match the cropped area dimensions
        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;
  
        // Map directly to the natural dimensions of the image
        const cropX = croppedAreaPixels.x;
        const cropY = croppedAreaPixels.y;
        const cropWidth = croppedAreaPixels.width;
        const cropHeight = croppedAreaPixels.height;
  
        console.log("Cropped Area Pixels:", croppedAreaPixels);
        console.log("Image Natural Width/Height:", image.naturalWidth, image.naturalHeight);
        console.log("CropX:", cropX, "CropY:", cropY, "CropWidth:", cropWidth, "CropHeight:", cropHeight);
  
        // Draw the cropped image onto the canvas
        ctx.drawImage(
          image,
          cropX, // x-coordinate of the crop start
          cropY, // y-coordinate of the crop start
          cropWidth, // width of the crop
          cropHeight, // height of the crop
          0,
          0,
          canvas.width,
          canvas.height
        );
  
        // Convert the canvas content to a blob
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Canvas is empty"));
              return;
            }
            resolve(blob); // Return the cropped image as a blob
          },
          "image/png",
          1
        );
      };
  
      image.onerror = () => reject(new Error("Failed to load the image"));
    });
  }
  