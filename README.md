Build Node.js simple CRUD web application with MySQL   



## Built With ##
* [Node.js](https://nodejs.org/) - Cross-platform JavaScript run-time environment that executes JavaScript code server-side | version 5.6.0
* [Nodemon](https://nodemon.io/) - A utility that will monitor for any changes in your source and automatically restart your server | version ^1.18.0
* [MySQL](https://www.mysql.com/) - | version ^2.15.0
* [Express](https://expressjs.com/) - A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications | version 4.16.3
* [Express Validator](https://www.npmjs.com/package/express-validator) - | version 5.2.0
* [Express Myconnection](https://www.npmjs.com/package/express-myconnection) - Connect/Express middleware provides a consistent API for MySQL connections during request/response life cycle | version 1.0.4
* [EJS](http://ejs.co/) - A simple templating language that lets you generate HTML markup with plain JavaScript. | version 2.6.1
* [body-parser](https://www.npmjs.com/package/body-parser) - Parse incoming request bodies in a middleware before your handlers, available under the req.body property | version 1.18.3  
* [cookie-parser](https://www.npmjs.com/package/cookie-parser) - Parse Cookie header and populate req.cookies with an object keyed by the cookie names | version ^1.4.3



## Table of Contents
* [Starting with Node.js setup](#starting-with-nodejs-setup)
* [Working with Nodemon](#working-with-nodemon)



## Getting started

### Starting with Node.js setup
Run `npm init` command. This command will create `package.json` file that will be installed.   
After run `npm init` you will be asked about application detail e.g:
```cmd
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
In the index.js that you just created, write some code e.g
```js
console.log('Hello World')
```
and then run `node index.js`. You will see statement you logged:
```js
Hello World
```



### Working with Nodemon
We need Nodemon to make application keep running even we made change. So we do not need to restart it after we make change.   
First, we have to install them by run below command:
```node
npm install nodemon@1.18.0 --save
```
Once done, you need to create `nodemon.json` in main path and write below code:
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
And do not forget to add `start` on `package.json` `scripts` e.g:
```js
"scripts": {
	"start": "nodemon index.js"
},
```
After that, you can start the application by run command
```node
npm start
```
It will automatically restart application if have any change.   


### Working with Express
We will use Expressjs to help us build website easier. We will also use Express' middleware such as session, validation, etc but later.   
Install Express with below command:
```node
npm install express --save
```
Open index.js and add below code at first line:
```js
var express = require('express');
const app = express();
```
Also add below code for simple rooting:
```js
router.get('/',function(req,res){
	res.send('Hello!');
})
```
or you can use `app.get('/', (req, res) => res.send('Hello!'))` for short code :)   
And setup server port by adding 
```js
app.listen(3000,function(){
	console.log('Server running @ http://localhost:3000')
});
```
Start node and try to open url `http://localhost:3000`   


### Working with ejs
EJS will help to generate HTML markup with plain JavaScript.   
To download EJS, copy-paste below command:
```node
npm install ejs --save
```
Edit index.js and add: 
```js
//specified default view engine
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');

//specified views path
app.set('views', __dirname + '/public/views');
```
It will setting up the templating view engine.   
Then, lets create folder routers. We will use it to storage all routers. Create main.js in this folder as main router and add below code:
```js
var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
	res.render('home/index', {
		title: 'Home'
	});
})

module.exports = router;
```
On index.js, remove router `app.get('/', (req, res) => res.send('Hello!'))` and change to:
```js
//get Router from folder router
var router = express.Router();
var mainRouter = require('./routers/main');
app.use('/', mainRouter);
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
Then, create folder `layouts` in `public/views` folder, and create `header.ejs` with below code:
```html
<html>
	<head>
		<title><%= title %></title>
		<!-- css & js plugin will goes here -->
	</head>
```
and create `footer.ejs` in layouts folder with below code:
```hml
	<footer>

	</footer>
</html>
```
`<%= ... %>` will print every datas   



### Working with Database
First we must install MySQL:
```node
npm install mysql --save
```
Create new database. I will name it rentaldisk
```mysql
create database rentaldisk;
```
Then, create new table. I will use 'disk'
```mysql
use rentaldisk;
CREATE TABLE disk (
	id int(11) NOT NULL auto_increment,
	name varchar(255) NOT NULL,
	synopsis text null,
	PRIMARY KEY (id)
);
```
Create new folder `config`, We will use this as configuration, then create `db.js` for MySQL configuration
```js
var config = {
	database: {
		host		: 'localhost',
		user		: 'yourusername',
		password	: 'yourpasssword',
		port		: 3306,
		db			: 'rentaldisk'
	},
	server: {
		host: '127.0.0.1',
		port: '3000'
	}
}

module.exports = config
```
Before setup database configuration on index.js, we need to install express-myconnection.   
express-myconnection is Express' middleware to provides a consistent API for MySQL connections during request/response life cycle.   
Install express-myconnection with shown command below:
```node
npm install express-myconnection --save
```
Open index.js and add below code:
```js
var sqlConfig = require('./config/db');
var mysql = require('mysql');
var sqlConnection  = require('express-myconnection');
var db = {
	host		: sqlConfig.database.host,
	user		: sqlConfig.database.user,
	password	: sqlConfig.database.password,
	port		: sqlConfig.database.port, 
	database	: sqlConfig.database.db
};
app.use(sqlConnection(mysql, db, 'single'));
```
strategies on express-myconnection app.use(sqlConnection(mysql, db, **'single'**));   
- single - creates single database connection for an application instance. Connection is never closed. In case of disconnection it will try to reconnect again as described in node-mysql docs.
- pool - creates pool of connections on an app instance level, and serves a single connection from pool per request. The connections is auto released to the pool at the response end.
- request - creates new connection per each request, and automatically closes it at the response end.



### Starting Read Database
Create `movie.js` on routers folder. It will be router for movie CRUD and add below code: 
```
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
	req.getConnection(function(error, conn) {
		if(error) {
			console.log('Failed get connection \n\
				error: ' + error);
		} else {
			console.log("Connected to mysql with database");
		}
		conn.query('SELECT * FROM movie ORDER BY id DESC', function(err, rows, fields) {
			console.log('get movie');
			if (err) {
				req.flash('error', err);
				res.render('movie/index', {
					title: 'Movie List', 
					data: ''
				});
			} else {
				res.render('movie/index', {
					title: 'Movie List', 
					data: rows
				});
			}
		});
	});
});

module.exports = router;
```
Then create new folder `movie` on `public/view` and create ejs file `index.ejs` in there. After that copy this code:
```
<%- include ../layouts/header.ejs %>
	<body>
		<div>Movie List</div>
		<a href="/movie/add">Add</a>
		<table>
			<tr style='text-align:left; background-color:#CCC'>
				<th>No</th>
				<th>Name</th>
				<th>Synopsis</th>
				<th>Action</th>
			</tr>
			<% if(data) { %>
				<% data.forEach(function(d, key){ %>
					<tr>
						<td><%= key+1 %></td>
						<td><%= d.name %></td>
						<td><%= d.synopsis %></td>
						<td>
						<div style="float:left">
						<a href='/movie/edit/<%= d.id %>'>Edit</a> &nbsp;
						<form method="post" action="/movie/delete/<%= d.id %>" style="float:right">
							<input type="submit" name="delete" value='Delete' onClick="return confirm('Are you sure you want to delete?')" />
							<input type="hidden" name="_method" value="DELETE" />
						</form>
						</div>
						</td>
					</tr>
				<% }) %>
			<% } %>
		</table>
	</body>
<%- include ../layouts/footer.ejs %>
```
You can read movie data from database in here.   



### Working with body-parser
Before we continue with Create, Update, and Delete, we need body-parser as middleware module to handle HTTP POST when read form input.   
body-parser is needed because we use Express version 4 above.   
Install body-parser as shown below:
```
npm install body-parser --save
```



### Starting Create Data from MySQL




























---



## Notes ###
* If you are on Windows and see below WARN:
	```
	npm WARN optional SKIPPING OPTIONAL DEPENDENCY: fsevents@1.2.4 (node_modules\fsevents):
	npm WARN notsup SKIPPING OPTIONAL DEPENDENCY: Unsupported platform for fsevents@1.2.4: wanted {"os":"darwin","arch":"any"} (current: {"os":"win32","arch":"x64"})
	```
	when installing package, just ignore it. fsevents is a package for OS to allows applications to register for notifications of changes to a given directory tree tt is a very fast and lightweight alternative to kqueue.



---



if you want to use this outsouce, please do `npm install` before test everything



---



# **I WILL UPDATE README LATER** #