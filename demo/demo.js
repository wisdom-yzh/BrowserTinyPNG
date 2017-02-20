(function() {

const input = document.getElementById('file');
const btnUpload = document.getElementById('btn_upload');

/**
 * get input file
 */
input.addEventListener('change', () => {

	const fileObj = input.files[0];
	if (!fileObj) {
		return false;
	}

	const fileReader = new FileReader();
	fileReader.readAsArrayBuffer(fileObj);
	fileReader.onload = (event) => {
		const buffer = event.target.result;
	};

}, false);

})();

