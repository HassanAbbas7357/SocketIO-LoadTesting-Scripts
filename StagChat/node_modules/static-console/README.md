# static-console
Keep structure of the messages and log them to any output, using specific plugins.

[![Gitter](https://badges.gitter.im/VINTproYKT/node-static-console.svg)](https://gitter.im/VINTproYKT/node-static-console?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

## Install
```
$ npm install static-console --save --only=production
```
Recommended option `--only=production` to skip installation of testing environment. If you want to [test it](#test), don't put this option.

## API
### **`StaticConsole`**
```javascript
const c = require('static-console');
```

### **`logt(type, ...obj)`**
Log message with data `...obj` under specified `type`.

`type` - message type name. `null` value means that message has regular type.

`...obj` - parameters that represent the whole message separated by commas

```javascript
c.logt('special-message-type', `This message is printed under specific type`);
c.logt('multiple-objects', `PI value:`, Math.PI);
```

It will output:
```
This message is printed under specific type
PI value: 3.141592653589793
```

### **`log(...obj)`**
Same as `c.logt(null, ...obj)`.

### **`error(...obj)`**
Same as `c.logt('error', ...obj)`.

### **`warn(...obj)`**
Same as `c.logt('warn', ...obj)`.

### **`info(...obj)`**
Same as `c.logt('info', ...obj)`.

### **`silly(...obj)`**
Same as `c.logt('silly', ...obj)`.

### **`trace(title)`**
Same as `c.logt('trace', c.traceStr(title))`.

### **`traceStr(title)`**
Returns stack trace for your debug needs. `title` replaces caption on first line, by default it will be `Trace`.

### **`reset(namespace, displayTitle, params)`**
Set namespace for all next messages.

`namespace` - string or undefined. When defined string, represents namespace. When undefined, messages gonna be printed in global namespace.

`displayTitle` - string with display title for last name.

`params` - object with other options for last name. Very optional.

Namespace is splitted by `c.namespaceNestingSymbol` (`'-'` by default) to inherited names, so you can return to parent name without specifying `displayTitle` and `params` again.

```javascript
c.reset('module', `My module`);
c.log(`Welcome to 'module' namespace!`);

c.reset('module-task1', `Special task`);
c.log(`Initializing awesome...`);

c.reset('module-task2', `Task #2`);
c.log(`Washing dishes...`);
c.log(`Preparing table...`);

c.reset('module');
c.log(`I'm done`);

c.reset();
c.log(`I think 'My module' done with it!`);
```

It will output:

```
[My module] Welcome to 'module' namespace!
[My module » Special task] Initializing awesome...
[My module » Task #2] Washing dishes...
[My module » Task #2] Preparing table...
[My module] I'm done
I think 'My module' done with it!
```

### *`namespaceNestingSymbol`*
String with character that is used to split namespace to names.

```javascript
c.namespaceNestingSymbol = '-';// Default value
c.reset('first-second-thirdName');
c.log();
// Will output: [first » second » thirdName]
```

### *`namespace`*
Array containing names data, that are sent to routers. Automatically set by `c.reset`.

### *`models`*, *`outputs`*, *`routers`*
Built-in objects

### *`RawModel`*, *`StdOutput`*, *`FileOutput`*, *`StdRouter`*
Built-in classes

## What are models, outputs and routers?
Separation of these concerns in module makes it possible to keep structure of sending messages to any elements of user interface.

Models - such objects that are used to convert `...obj` to `data`, that is used in majority of outputs.

Outputs - such objects that are used to print every message to expected place. You can also think about them as "views".

Routers - such objects that are used to send data to multiple outputs with any models. You can also think about them as "controllers".

By default there is `c.routers.std` that is instance of `StdRouter`.

Standard router has task to send data about every income message to `c.outputs.std` that is instance of `StdOutput`. That data is converted by `c.models.raw` that is instance of `RawModel`.

### Standard solution
Default solution is bundled with StaticConsole: `RawModel`, `StdOutput`, `FileOutput`, `StdRouter`.

`FileOutput` is not initialized by default, but it must work. So you can print to `c.outputs.std` and instance of `FileOutput` at same time.

## Test
```
npm test
```
or
```
ava --verbose test/MainTest.js
```

To make tests work, you'll probably need to have local copy of [`ava`](https://npmjs.org/package/ava) package in your `node_modules`.

### Make your own solution
If you want to make your own model, output or router class, proceed to source code of module and copy standard solution's directories (`RawModel`, `StdOutput`, `StdRouter`).

### Also try `static-console` with these plugins:

Outputs:
 - [ReactOutput](https://www.npmjs.com/package/static-console-plugin-react-output)
 - [DomOutput](https://www.npmjs.com/package/static-console-plugin-dom-output)
 - [AlertOutput](https://www.npmjs.com/package/static-console-plugin-alert-output)

[Find other plugins](https://www.npmjs.com/search?q=static-console-plugin-).