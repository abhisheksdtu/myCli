let fs = require('fs');
let path = require('path');

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

function dirCreator(dirpath) {
	if (fs.existsSync(dirpath) == false) {
		fs.mkdirSync(dirpath);
	}
}

function GetDirectoryName(dirpath) {
	let strArr = dirpath.split('.');
	let ext = strArr.pop();
	console.log(ext);

	for (let key in types) {
		// types[type].includes(ext);
		for (let i = 0; i < types[key].length; i++) {
			if (types[key][i] == ext) {
				return key;
			}
		}
	}
	return 'others';
}

function isFileorNOt(dirpath) {
	return fs.lstatSync(dirpath).isFile();
}
function listContent(dirpath) {
	return fs.readdirSync(dirpath);
}

function copyFilleToFolder(dirpath, destFolder) {
	let orgFileName = path.basename(dirpath);
	let destFilePath = path.join(destFolder, orgFileName);
	fs.copyFileSync(dirpath, destFilePath);
}

function OrganizeDir(dirpath, indent) {
	let isFile = isFileorNOt(dirpath);

	if (isFile == true) {
		// IDENTIFY ->DEST DIRECTORY
		// COPY
		let folderName = GetDirectoryName(dirpath);
		console.log(dirpath, '->', folderName);

		// ORGANIZED FOLDER PATH

		let destFolder = path.join(orgFilePath, folderName);
		copyFilleToFolder(dirpath, destFolder);
	} else {
		let content = listContent(dirpath);
		for (let i = 0; i < content.length; i++) {
			let childPath = path.join(dirpath, content[i]);
			OrganizeDir(childPath);
		}
	}
}

function organizeFn(dirpath) {
	let orgFilePath = path.join(dirpath, 'organized_files');
	dirCreator(orgFilePath);

	for (let key in types) {
		let innerDirPath = path.join(orgFilePath, key);
		dirCreator(innerDirPath);
	}

	// OTHERS
	let otherPath = path.join(orgFilePath, 'others');
	dirCreator(otherPath);

	OrganizeDir(dirpath);
}

module.exports = {
    organize: organizeFn
};
