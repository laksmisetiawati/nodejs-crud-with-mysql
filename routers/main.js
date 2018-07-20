var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
	res.render('home/index', {
		title: 'Home'
	});
});

console.log('success access main router');

module.exports = router;