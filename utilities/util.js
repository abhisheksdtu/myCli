let fs = require('fs');

// CHECKS IF ITS A FILE OR NOT
function isFileOrNot(dirPath) {
	return fs.lstatSync(dirPath).isFile();
}

// LISTS THE CONTENT OF THE FILE
function listContent(dirPath) {
	return fs.readdirSync(dirPath);
}

// CREATES A DIRECTORY
function directoryCreator(dirPath) {
	if (fs.existsSync(dirPath) == false) {
		fs.mkdirSync(dirPath);
	}
}


module.exports = {
	isFileOrNotFn: isFileOrNot,
	listContentFn: listContent,
	directoryCreatorFn: directoryCreator,
};
