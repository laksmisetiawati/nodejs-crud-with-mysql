# README #
Node.js simple CRUD application with MySQL

## Built With ##
* [Node.js](https://nodejs.org/) - Cross-platform JavaScript run-time environment that executes JavaScript code server-side. | version 5.6.0
* [Nodemon](https://nodemon.io/) - A utility that will monitor for any changes in your source and automatically restart your server. | version 1.17.2

## Getting started
Run `npm init` command. This command will create `package.json` file that will be installed.
After run `npm init` you will be asked about application detail e.g:
```
package name: (crud-with-mysql)
version: (1.0.0)
description: create crud with mysql
entry point: (index.js)
test command:
git repository:
keywords:
author: ami
license: (ISC)
About to write to F:\test\nodejs\crud-with-mysql\package.json:

{
	"name": "crud-with-mysql",
	"version": "1.0.0",
	"description": "create crud with mysql",
	"main": "index.js",
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1"
	},
	"author": "ami",
	"license": "ISC"
}


Is this ok? (yes)
```
Create a file called `app.js` to run node. You can change the name to whatever you want.
In the javascript file that you just created, write some code e.g
```js
console.log('Hello. The Node application running')
```
and then run `node app.js`. You will see statement you logged:
```
Hello. The Node application running
```



---



## Notes ###
* If you are on Windows and see below WARN when installing nodemon,
	```
	npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.4 (node_modules\fsevents):
	npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.4: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})
	```
	just ignore it. fsevents is a package for OS to allows applications to register for notifications of changes to a given directory tree. It is a very fast and lightweight alternative to kqueue.