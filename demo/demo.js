(function() {

	document.getElementById('file').addEventListener('change', () => {

		const fileObj = input.files[0];
		if (!fileObj) {
			return false;
		}

		const fileReader = new FileReader();

		fileReader.onload = (event) => {
			const buffer = event.target.result;
			const parser = new PNGParser(buffer);
			parser.parse();
		};

		fileReader.readAsArrayBuffer(fileObj);

	}, false);

})();

