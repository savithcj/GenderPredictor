/**
 * taken from: https://github.com/onurzorluer/react-image-file-resizer
 *
 * created by:
 * @author Onur Zorluer.
 *
 * modified by:
 * Savith Jayasekera
 *
 */
import loadImage from "blueimp-load-image";

function fixImage(file, image, responseUriFunc) {
  loadImage.parseMetaData(file, function(data) {
    //default image orientation
    var orientation = 0;
    //if exif data available, update orientation
    if (data.exif) {
      orientation = data.exif.get("Orientation");
    }
    loadImage(
      file,
      function(canvas) {
        //here's the base64 data result
        try {
          var base64data = canvas.toDataURL("image/jpeg");
          image.src = base64data;
        } catch (TypeError) {
          responseUriFunc("error");
        }
      },
      {
        //should be set to canvas : true to activate auto fix orientation
        canvas: true,
        orientation: orientation
      }
    );
  });
}

class Resizer {
  static changeHeightWidth(height, maxHeight, width, maxWidth) {
    if (width > maxWidth) {
      height = Math.round((height * maxWidth) / width);
      width = maxWidth;
    }
    if (height > maxHeight) {
      width = Math.round((width * maxHeight) / height);
      height = maxHeight;
    }
    return { height, width };
  }

  static resizeAndRotateImage(image, maxHeight, maxWidth, compressFormat = "jpeg", quality = 100, rotation = 0) {
    //image is already when it gets to here
    var qualityDecimal = quality / 100;
    var canvas = document.createElement("canvas");

    var width = image.width;
    var height = image.height;

    var newHeightWidth = this.changeHeightWidth(height, maxHeight, width, maxWidth);
    if (rotation === 90 || rotation === 270) {
      canvas.width = newHeightWidth.height;
      canvas.height = newHeightWidth.width;
    } else {
      canvas.width = newHeightWidth.width;
      canvas.height = newHeightWidth.height;
    }

    width = newHeightWidth.width;
    height = newHeightWidth.height;

    var ctx = canvas.getContext("2d");

    if (rotation) {
      ctx.rotate((rotation * Math.PI) / 180);
      if (rotation === 90) {
        ctx.translate(0, -canvas.width);
      } else if (rotation === 180) {
        ctx.translate(-canvas.width, -canvas.height);
      } else if (rotation === 270) {
        ctx.translate(-canvas.height, 0);
      } else if (rotation === 0 || rotation === 360) {
        ctx.translate(0, 0);
      }
    }
    ctx.drawImage(image, 0, 0, width, height);

    return canvas.toDataURL(`image/${compressFormat}`, qualityDecimal);
  }

  static b64toBlob(b64Data, contentType) {
    contentType = contentType || "image/jpeg";
    var sliceSize = 512;

    var byteCharacters = atob(b64Data.toString().replace(/^data:image\/(png|jpeg|jpg);base64,/, ""));
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  static createResizedImage(
    file,
    maxWidth,
    maxHeight,
    compressFormat,
    quality,
    rotation,
    responseUriFunc,
    outputType = "base64"
  ) {
    var blob = null;
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        var image = new Image();
        fixImage(file, image, responseUriFunc);
        image.onload = function() {
          var resizedDataUrl = Resizer.resizeAndRotateImage(
            image,
            maxWidth,
            maxHeight,
            compressFormat,
            quality,
            rotation
          );
          blob = Resizer.b64toBlob(resizedDataUrl, `image/${compressFormat}`);
          outputType === "blob" ? responseUriFunc(blob) : responseUriFunc(resizedDataUrl);
        };
      };
      reader.onerror = error => {
        responseUriFunc("error");
      };
    } else {
      responseUriFunc("File Not Found");
    }
  }
}
export default {
  imageFileResizer: (file, maxWidth, maxHeight, compressFormat, quality, rotation, responseUriFunc, outputType) => {
    return Resizer.createResizedImage(
      file,
      maxWidth,
      maxHeight,
      compressFormat,
      quality,
      rotation,
      responseUriFunc,
      outputType
    );
  }
};