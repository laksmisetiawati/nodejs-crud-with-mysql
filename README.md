# README #
Node.js simple CRUD application with MySQL



## Built With ##
* [Node.js](https://nodejs.org/) - Cross-platform JavaScript run-time environment that executes JavaScript code server-side. | version 5.6.0
* [Nodemon](https://nodemon.io/) - A utility that will monitor for any changes in your source and automatically restart your server. | version ^1.18.0
* [MySQL](https://www.mysql.com/) - | version ^2.15.0
* [Express](https://expressjs.com/) - A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications | version 4.16.3
* [Express Validator]() - | version 5.2.0
* [EJS](http://ejs.co/) - A simple templating language that lets you generate HTML markup with plain JavaScript. | version 2.6.1
* [body-parser]() - | version 1.18.3



## Getting started

### Staring with Node.js setup
Run `npm init` command. This command will create `package.json` file that will be installed.   
After run `npm init` you will be asked about application detail e.g:
```
package name: (crud-with-mysql) crud-with-mysql
version: (1.0.0)
description: create crud with mysql
entry point: (index.js) index.js
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
text in '(...)' mean you are asked to use default. You can change it.     
Create a file called `index.js` to run node.   
In the app.js that you just created, write some code e.g
```js
console.log('Hello World')
```
and then run `node index.js`. You will see statement you logged:
```
Hello World
```


### Working with Nodemon
We need Nodemon to make application keep running even we made change. So we do not need to restart it.   
First, we have to install them by run below command:
```node
npm install nodemon --save
```
Once done, you will see that npm has saved Nodemon as a dependency in `package.json`
```json
"nodemon": "^1.18.0"
```
Next, you need to create `nodemon.json` in main path and write below code:
```json
{
	"restartable": "rs",
	"ignore": [
		".git",
		"node_modules/**/node_modules"
	],
	"verbose": true,
	"execMap": {
		"js": "node --harmony"
	},
	"events": {
		"restart": "osascript -e 'display notification \"App restarted due to:\n'$FILENAME'\" with title \"nodemon\"'"
	},
	"watch": [
		"**/*"
	],
	"env": {
		"NODE_ENV": "development"
	},
	"ext": "js json"
}
```
I'm not sure how to write proper code on `nodemon.json` but that one works lol. I'll learn more later ;)   
And do not forget to add `start` on `package.json` `scripts` e.g:
```javascript
"scripts": {
	"start": "nodemon index.js"
},
```
After that, you can start the application by run command
```
npm start
```
It will automatically restart application if have any change


### Working with Express
We will use Expressjs to help us build website easier. We will also use Express' middleware such as session, validation, etc but later.   
Install Express with below command:
```
npm install express --save
```
Open index.js and add below code at first line:
```
var express = require('express');
const app = express();
```
Also add below code for simple rooting:
```
app.get('/', (req, res) => res.send('Hello!'))
```
And setup server port by adding 
```
app.listen(3000,function(){
	console.log('Server running @ http://localhost:3000')
});
```
Start node and try to open url http://localhost:3000


### Working with ejs
EJS will help to generate HTML markup with plain JavaScript.   
To download EJS, copy-paster below command:
```
npm install ejs --save
```
Edit index.js and add 
```
//specified default view engine
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

//specified views path
app.set('views', __dirname + '/public/views');
```
It will setting up the templating view engine.   
Then, lets create folder app. We will use it to storage application files, such as controllers, models, and router.js. Create router.js in this folder and add below code:
```
var express = require('express');
var path = require('path');

module.exports = function(app, express) {
	var router = express();
	
	//routing
	app.get('/',function(req,res){
		res.render('home/index');
	})

	return router;
}
```
On index.js, remove router `app.get('/', (req, res) => res.send('Hello!'))` and change to:
```
//get Router from folder app
var apiRouter = require('./app/router.js')(app, express);
app.use('/', apiRouter);
```
Lets start to create simple hello world view.   
Create folder `public/views/home` and create file ejs `index.ejs` in home folder, and insert below code:
```html
<%- include ../layouts/header.ejs %>

	<body>
		<div>Hello World!</div>
	</body>
	
<%- include ../layouts/footer.ejs %>
```
Then, create folder `layouts` in public/views folder, and create `header.ejs` with below code:
```html
<html>
	<head>
		<title>Node.JS with EJS</title>
	</head>
```
and create `footer.ejs` in layouts folder with below code:
```hml
	<footer>

	</footer>
</html>
```




























---



## Notes ###
* If you are on Windows and see below WARN:
	```
	npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.4 (node_modules\fsevents):
	npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.4: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})
	```
	when installing package, just ignore it. fsevents is a package for OS to allows applications to register for notifications of changes to a given directory tree. It is a very fast and lightweight alternative to kqueue.