(function() {

  const input = document.getElementById('file');
  const canvas = document.getElementById('png_canvas');

  input.addEventListener('change', () => {

    const fileObj = input.files[0];
    if (!fileObj) {
      return false;
    }

    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      const buffer = event.target.result;
      const parser = new PNGParser(buffer);
      parser.getPainter().draw(canvas);
    };

    fileReader.readAsArrayBuffer(fileObj);

  }, false);

})();
