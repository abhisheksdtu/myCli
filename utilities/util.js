let fs = require('fs');

function isFileOrNot(dirPath) {
	return fs.lstatSync(dirPath).isFile();
}

function listContent(dirPath) {
	return fs.readdirSync(dirPath);
}

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
