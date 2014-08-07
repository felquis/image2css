var image = new Image();
var imageData;
var x, y;
var canvas = document.createElement('canvas');
var ctx;
var canvasHeight;
var canvasWidth;
var data;
var ArrayBoxshadow = [];
var alpha;

image.src = 'gun.png';

var suffix = function (number) {
  if (number > 0) {
    return number + 'em';
  }

  return number;
}

var RGBToHex = function (r, g, b) {
  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

var imageLoaded = function (event) {

  var image = event.currentTarget;

  // dimensões da imagem
  canvas.height = image.height;
  canvas.width = image.width;

  canvasHeight = canvas.height;
  canvasWidth = canvas.width;

  ctx = canvas.getContext('2d');

  // Desenha imagem no canvas
  ctx.drawImage(image, 0, 0);

  // retorna array de pixels
  data = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

  for(var i = 0; i < data.data.length; i += 4) {
    x = (i / 4) % canvasWidth;
    y = Math.floor((i / 4) / canvasWidth);
    alpha = data.data[i + 3] / 255;

    if (alpha < 1 && alpha < 0) {
      ArrayBoxshadow.push(suffix(x) + ' ' + suffix(y) + ' rgba('+ data.data[i] +', '+ data.data[i + 1] +', '+ data.data[i + 2] +', '+ alpha +')');
    } else if (alpha === 1) {
      ArrayBoxshadow.push(suffix(x) + ' ' + suffix(y) + ' ' + RGBToHex(data.data[i], data.data[i + 1], data.data[i + 2]));
    }
  }

  ctx.putImageData(data, 0, 0);

  document.querySelector('body').appendChild(canvas);

  var i = document.createElement('i');
  i.style.boxShadow = ArrayBoxshadow.join(',');

  document.querySelector('body').appendChild(i);
}

image.onload = imageLoaded;