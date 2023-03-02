var namespaceNestingSymbol = '-';

var namespace = [];

const RawModel = require('./RawModel');
const StdOutput = require('./StdOutput');
const FileOutput = require('./FileOutput');
const StdRouter = require('./StdRouter');

const models = {
	raw: new RawModel()
};

const outputs = {
	std: new StdOutput()
};

const routers = {
	std: new StdRouter({
		tasks: new Map([
			[outputs.std, models.raw]
		])
	})
};

module.exports = class StaticConsole {
	// Main log function with message type definition
	static logt(type, ...obj) {
		if (!arguments.length) return;
		for (var name in routers) routers[name].send(namespace, type, ...obj);
	}

	// Short log function for messages with regular type
	static log(...obj) { this.logt(null, ...obj); }

	// Short log function for messages with 'error' type
	static error(...obj) { this.logt('error', ...obj); }

	// Short log function for messages with 'warn' type
	static warn(...obj) { this.logt('warn', ...obj); }

	// Short log function for messages with 'info' type
	static info(...obj) { this.logt('info', ...obj); }

	// Short log function for messages with 'silly' type
	static silly(...obj) { this.logt('silly', ...obj); }

	// Short log function for printing stack trace with message type 'trace'
	static trace(title) { this.logt('trace', this.traceStr(title)); }

	// Returns trace log string
	static traceStr(title) {
		Error.captureStackTrace(this);
		return this.stack.replace(/^.*\n/, (title || 'Trace') + '\n');
	}

	// Set current namespace of messages
	static reset(ns, displayTitle, params) {
		if (typeof ns == 'string') {
			var names = ns.split(namespaceNestingSymbol);
			for (var l = 0; l < namespace.length; l++) {
				if (names[l] !== namespace[l].name) {
					namespace.splice(l, Infinity);
					break;
				}
			}
			for (let n = l; n < names.length; n++) {
				namespace.push(Object.assign({
					name: names[n],
					displayTitle: (n == names.length - 1) && displayTitle || names[n],
				}, params));
			}
		}
		else namespace = [];
	}
}

// Public properties
module.exports.namespaceNestingSymbol = namespaceNestingSymbol;// string
module.exports.namespace = namespace;// array
module.exports.models = models;// object
module.exports.outputs = outputs;// object
module.exports.routers = routers;// object
module.exports.RawModel = RawModel;
module.exports.StdOutput = StdOutput;
module.exports.FileOutput = FileOutput;
module.exports.StdRouter = StdRouter;