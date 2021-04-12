let path = require('path');
let util = require('../utilities/util');

function view(dirPath, mode) {
	let strArr = dirPath.split('\\');
	let toPrint = strArr.pop();

	if (mode == 'tree') {
		// console.log('tree view implemented');
		// console.log(dirPath);
		viewTree(dirPath, '');
	} else if (mode == 'flat') {
		viewFlat(dirPath, toPrint);
		// console.log('flat view implemented');
	} else {
		console.log('Wrong mode');
	}
}

function viewTree(dirPath, indent) {
	// console.log(dirPath);

	let isFile = util.isFileOrNotFn(dirPath);

	// let strArr = dirPath.split('\\');
	// let toPrint = strArr.pop();

	if (isFile) {
		console.log(indent + path.basename(dirPath) + '*');
	} else {
		console.log(indent + path.basename(dirPath));

		let content = util.listContentFn(dirPath);

		// RECURSION

		for (let i = 0; i < content.length; i++) {
			// let childPath = dirPath + '\\' + content[i];

			let childPath = path.join(dirPath, content[i]);

			viewTree(childPath, indent + '\t');
		}
	}
}

function viewFlat(dirPath, toPrint) {
	// console.log(dirPath);

	let isFile = util.isFileOrNotFn(dirPath);

	if (isFile) {
		console.log(toPrint + '*');
	} else {
		console.log(toPrint);

		let content = util.listContentFn(dirPath);

		// console.log(content);

		// RECURSION

		for (let i = 0; i < content.length; i++) {
			// let childPath = dirPath + '\\' + content[i];

			let childPath = path.join(dirPath, content[i]);

			viewFlat(childPath, toPrint + '\\' + content[i]);
		}
	}
}

module.exports = {
	viewFn: view,
};
