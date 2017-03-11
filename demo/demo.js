(function() {

  const input = document.getElementById('file');
  const canvas = document.getElementById('png_canvas');
  const result = document.getElementById('result');
  const start = document.getElementById('start');

  let fileObj, paletteLength;

  const fileReader = new FileReader();
  fileReader.onload = (event) => {
    const buffer = event.target.result;
    const reader = new PNGReader(buffer);

    canvas.innerHTML = '';
    reader.getPainter().draw(canvas);

    const writer = reader.getWriter();
    writer.cluster(paletteLength).getPainter().draw(canvas);
    result.href = URL.createObjectURL(writer.writeAsPNG());
    result.download = 'tiny_' + fileObj.name;
    result.style.display = 'inline';
  };

  input.addEventListener('change', () => {
    fileObj = input.files[0];
    if (!fileObj) {
      throw new Error('file object invalid');
    }
    result.style.display = 'none';
  }, false);

  start.addEventListener('click', () => {
    paletteLength = parseInt(document.getElementById('palette').value) || 2;
    if (!paletteLength || paletteLength > 16 || paletteLength < 2) {
      throw new Error('palette length invalid');
    }
    fileReader.readAsArrayBuffer(fileObj);
  }, false);

})();
