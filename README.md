Convert image To CSS automatically
==================================

This is an experiment, so, probably you don't want and you won't use images as box-shadow around the web, right? So, [try this demo](http://felquis.github.io/image2css/)!


## [Demo](http://felquis.github.io/image2css/)!

## How it work?
image2css [draw the image](https://github.com/felquis/image2css/blob/master/lib/image2css.js#L39)(s) in a canvas element, and [get the imageData](https://github.com/felquis/image2css/blob/master/lib/image2css.js#L42) from the canvas (imageData is a big array with the RGBA of each pixel of the image), we [parse the imageData](https://github.com/felquis/image2css/blob/master/lib/image2css.js#L44) looking for each pixel, and then we [write the box-shadow](https://github.com/felquis/image2css/blob/master/lib/image2css.js#L50-L52)! We also use RGBA or HEX when appropriate (to improve the final size and keep image quality), image2css also doens't use units in 0 values (to improve the final size), all pixels that is alpha 0 aren't writen in the box-shadow rule (to improve final size)

## How to use

Well, you can use it anywhere with bower
```
bower install image2css --save
```

And include de lib in your page
```html
<script src="bower_components/image2css/lib/image2css.js"></script>
```

This file exports a global function called `image2css`, see below how to use it:
```js
image2css({
  images: ['path/to/image1', 'path/to/image2']
}, function (images) {
  // Sucess! Yeah!

  // Now you have an array `images` with the result
}, function () {
  // Something went wrong! "Yes! Currently this callback is never called" :P
})
```

In the success callback, `images` has a array with these properties:

* `image.boxshadow`: all box-shadow generated
* `image.bytes`: the size of the box-shadow in bytes, its a interger
* `image.filename`: the URL of the file, or base64 or something else with the origin of the image
* `image.index`: the index of the current image, passed in the images property
* `image.size`: The size of the generated box-shadow treated as bytes, KB, MB etc...

### Helpers

We have some helpers too

`image2css.RGBToHex`: Convert any RGB color to hexadecimal, like this!
```js
  var hex = image2css.RGBToHex(255, 255, 255)

  console.log(hex) // #ffffff
```

`image2css.bytesToSize`: Convert bytes to your correspondent size, like this!
```js
  var size = image2css.bytesToSize(1000)

  console.log(size) // 1.00 KB

  var otherSize = image2css.bytesToSize(240)

  console.log(otherSize) // 240 Bytes
```

`image2css.lengthInUtf8Bytes`: Return the size of a string with UTF-8 characters, like this!
```js
  var size = image2css.lengthInUtf8Bytes('This is a string')

  console.log(size) // 16
```

Cheers!

:pig:
