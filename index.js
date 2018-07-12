var express = require('express');
const app = express();

/**
 * Express Validator Middleware for Form Validation
 */ 
var validator = require('express-validator')
app.use(validator())
 
 
/**
 * body-parser module is used to read HTTP POST data
 * it's an express middleware that reads form's input 
 * and store it as javascript object
 */ 
var bodyParser = require('body-parser')
/**
 * bodyParser.urlencoded() parses the text as URL encoded data 
 * (which is how browsers tend to send form data from regular forms set to POST) 
 * and exposes the resulting object (containing the keys and values) on req.body.
 */ 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



/**
 * This module shows flash messages
 * generally used to show success or error messages
 * 
 * Flash messages are stored in session
 * So, we also have to install and use 
 * cookie-parser & session modules
 */ 
var flash = require('express-flash')
var cookieParser = require('cookie-parser');
var session = require('express-session');
 
app.use(cookieParser('keyboard cat'))
app.use(session({ 
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
app.use(flash())



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

//setting up the templating view engine
//specified default view engine
app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
//setup view path
app.set('views', __dirname + '/public/views');

//route
var router = express.Router();
console.log('call main router');
var mainRouter = require('./routers/main');
app.use('/', mainRouter);
console.log('call movie router');
var movieRouter = require('./routers/movie');
app.use('/movie', movieRouter);

// Binding express app to port 3000
app.listen(3000,function(){
	console.log('Server running @ http://localhost:3000')
});
// app.listen(3000, () => console.log('Hello World app berjalan di http://localhost:3000'))