(function() {

	const input = document.getElementById('file');

	input.addEventListener('change', () => {

		const fileObj = input.files[0];
		if (!fileObj) {
			return false;
		}

		const fileReader = new FileReader();

		fileReader.onload = (event) => {
			const buffer = event.target.result;
			const parser = new PNGParser(buffer);
			console.log(parser.parse());
		};

		fileReader.readAsArrayBuffer(fileObj);

	}, false);

})();

