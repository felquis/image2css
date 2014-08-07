function handleFileSelect(evt) {

  evt.stopPropagation();
  evt.preventDefault();

  var files = evt.target.files || (evt.dataTransfer || {}).files;

  for (var i = 0, file; file = files[i]; i++) {

    // Only process image files.
    if (!file.type.match('image.*')) {
      continue;
    }

    var reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = (function(theFile) {
      return function(e) {

        var span = document.createElement('span');
        span.classList.add('item');

        span.innerHTML = ['<img class="thumb" src="', e.target.result,
                          '" title="', escape(theFile.name), '"/>'].join('');

        image2css({
          images: [e.target.result]
        }, function (images) {
          images.forEach(function (image) {
            var i = document.createElement('i');

            i.style.boxShadow = image.boxshadow;

            span.appendChild(i);

            document.querySelector('.list').insertBefore(span, null);
          })
        })
      };
    })(file);
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
