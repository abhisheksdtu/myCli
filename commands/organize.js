let path = require('path');
let util = require('../utilities/util');

let types = {
	media: ['mp4', 'mkv', 'mp3'],
	archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', 'xz'],
	documents: [
		'docx',
		'doc',
		'pdf',
		'xlsx',
		'xls',
		'odt',
		'ods',
		'odp',
		'odg',
		'odf',
		'txt',
		'ps',
		'tex',
	],
	app: ['exe', 'dmg', 'pkg', 'deb'],
};

function organize(dirPath) {
	let orgFilePath = path.join(dirPath, 'organized_files');

	util.directoryCreatorFn(orgFilePath);

	for (let key in types) {
		let innerDirPath = path.join(orgFilePath, key);
		util.directoryCreatorFn(innerDirPath);
	}

	// OTHERS
	let otherPath = path.join(orgFilePath, 'others');
	util.directoryCreatorFn(otherPath);

	organizeDir(dirPath, orgFilePath);
}

function organizeDir(dirPath, orgFilePath) {
	// console.log(dirPath);

	let isFile = util.isFileOrNotFn(dirPath);

	if (isFile) {
		// IDENTIFY DEST DIRECTORY

		let folderName = getDirectoryName(dirPath);

		// console.log(dirPath + ' -> ' + folderName);

		let destFolder = path.join(orgFilePath, folderName);

		// console.log(destFolder);

		// COPY FILE (dirPath) TO FOLDER(destFolder)
		copyFileToFolder(dirPath, destFolder);
	} else {
		let content = util.listContentFn(dirPath);

		// RECURSION
		for (let i = 0; i < content.length; i++) {
			let childPath = path.join(dirPath, content[i]);

			organizeDir(childPath);
		}
	}
}

function copyFileToFolder(dirPath, destFolder) {
	let orgFileName = path.basename(dirPath);
	let destFilePath = path.join(destFolder, orgFileName);
	fs.copyFileSync(dirPath, destFilePath);
}

function getDirectoryName(dirPath) {
	let extName = path.extname(dirPath);

	let ext = extName.substring(1);

	// console.log(ext);

	for (let key in types) {
		if (types[key].includes(ext)) {
			return key;
		}

		// console.log(types[key].includes(ext));

		// INCLUDES & THIS FOR WORKS SAME

		// for (let i = 0; i < types[key].length; i++) {
		// 	if (types[i] == ext) {
		// 		return key;
		// 	}
		// }
	}

	return 'others';
}

module.exports = {
	organizeFn: organize,
};
