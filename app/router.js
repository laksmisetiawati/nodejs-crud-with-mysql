var express = require('express');
var path = require('path');
// var user = require(‘./controller/userController’);

module.exports = function(app, express) {
	var router = express();

	app.get('/',function(req,res){
		res.render('home/index');
	})

	app.get('/disk',function(req,res){
		// res.render('disk/index', {title: 'My Node.js Application'});
		res.render('disk/index');
	})
	
	app.get('/disk/add',function(req,res){
		console.log(__dirname);
		res.sendFile('form.html',{'root': './public/views/disk'});
	})

	return router;
}