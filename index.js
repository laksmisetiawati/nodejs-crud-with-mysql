var express = require('express');
const app = express();

// const bodyParser = require('body-parser');

//setting up the templating view engine
//specified default view engine
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
//setup view path
app.set('views', __dirname + '/public/views');

// app.use(bodyParser.json());

// const mysql = require('mysql');

// Binding express app to port 3000
app.listen(3000,function(){
	console.log('Server running @ http://localhost:3000')
});
// app.listen(3000, () => console.log('Hello World ... app berjalan di http://localhost:3000'))

// app.get('/', (req, res) => res.send('Hello Express!'))
// app.get('/about', (req, res) => res.send('Express is Express'))

//get Router from folder app
var apiRouter = require('./app/router.js')(app, express);
app.use('/', apiRouter);


console.log('running node.js')