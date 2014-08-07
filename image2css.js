'use strict';

(function () {

    var image2css = function (options, success, error) {
        var results = [],
        loadImage = function (imagePath, index) {
            var image = new Image();
            image.src = imagePath;
            image.dataset.index = index;
            image.addEventListener('load', imageLoaded, false);
        },
        imageLoaded = function (event) {
            runImageToBoxshadow(event.currentTarget);
        },
        suffix = function (number) {
          if (number > 0) {
            return number + 'em';
          }

          return number;
        },
        RGBToHex = function (r, g, b) {
            function componentToHex(c) {
                var hex = c.toString(16);
                return hex.length == 1 ? "0" + hex : hex;
            }

            return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
        },
        runImageToBoxshadow = function (image) {
            var canvas = document.createElement('canvas'),
                context, x, y, alpha, ArrayBoxshadow = [];

            // dimensões da imagem

            var canvasWidth = image.width,
                canvasHeight = image.height,
                imageData;

            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            context = canvas.getContext('2d');

            // Desenha imagem no canvas
            context.drawImage(image, 0, 0);

            // retorna array de pixels
            imageData = context.getImageData(0, 0, canvasWidth, canvasHeight);

            for(var i = 0; i < imageData.data.length; i += 4) {
                x = (i / 4) % canvasWidth;
                y = Math.floor((i / 4) / canvasWidth);
                alpha = imageData.data[i + 3] / 255;

                if (alpha < 1 && alpha < 0) {
                    ArrayBoxshadow.push(suffix(x) + ' ' + suffix(y) + ' rgba('+ imageData.data[i] +', '+ imageData.data[i + 1] +', '+ imageData.data[i + 2] +', '+ alpha +')');
                } else if (alpha === 1) {
                    ArrayBoxshadow.push(suffix(x) + ' ' + suffix(y) + ' ' + RGBToHex(imageData.data[i], imageData.data[i + 1], imageData.data[i + 2]));
                }
            }

            results.push({
                filename: image.src,
                boxshadow: ArrayBoxshadow.join(','),
                index: image.dataset.index
            });

            if (results.length === options.images.length) {
                success(results);
            }
        }

        // Init load images
        options.images.forEach(loadImage);
    }

    window.image2css = image2css;
}());