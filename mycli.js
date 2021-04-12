// view
// tree
// flat
// organize
// help

let viewObj = require('./commands/view');
let helpObj = require('./commands/help');
let organizeObj = require('./commands/organize');

let input = process.argv.slice(2);
// console.log(input);

let cmd = input[0];

switch (cmd) {
	case 'view':
		// view as flat & tree
		// console.log(input[1]);
		// console.log(input[2]);
		viewObj.viewFn(input[1], input[2]);
		break;

	case 'organize':
		organizeObj.organizeFn(input[1]);
		break;

	case 'help':
		helpObj.helpFn();
		break;

	default:
		console.log(
			'Wrong command . Type help to see the list of all the commands'
		);
}
