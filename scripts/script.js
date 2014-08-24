function handleFileSelect(evt) {

  evt.stopPropagation();
  evt.preventDefault();

  var files = evt.target.files || (evt.dataTransfer || {}).files;

  var onReaderLoad = function (file) {

    var span = document.createElement('span');
    span.classList.add('item');

    spanText = ['Original Image ', image2css.bytesToSize(file.total) ,': <br> ',
                '<img class="thumb" src="', file.target.result,
                '" title="', escape(file.total), '"/>'];

    image2css({
      images: [file.target.result]
    }, function (images) {
      images.forEach(function (image) {
        var i = document.createElement('i');

        i.style.boxShadow = image.boxshadow;

        spanText.push('box-shadow version:', image.size, ' <br>');
        span.innerHTML = spanText.join('');
        span.appendChild(i);

        document.querySelector('.output').value = image.boxshadow;
        document.querySelector('.result').innerHTML = '';
        document.querySelector('.result').insertBefore(span, null);
      });
    });
  };

  for (var i = 0, file; file = files[i]; i += 1) {

    // Only process image files.
    if (!file.type.match('image.*')) {
      continue;
    }

    var reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = onReaderLoad;
  }
}

function handleDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'copy';
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);

var dropZone = document.querySelector('.drop-zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);
