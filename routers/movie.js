var express = require('express');
var router = express.Router();

console.log('movie router');

router.get('/', function(req, res, next){
	req.getConnection(function(error, conn) {
		if(error) {
			console.log('Failed get connection \n\
				error: ' + error);
		} else {
			console.log("Connected to mysql with database");
		}
		console.log('index of movie');
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
		// res.send('Birds home page');
	});
});

//form add
router.get('/add', function(req, res, next){
	req.getConnection(function(error, conn) {
		if(error) {
			console.log('Failed get connection \n\
				error: ' + error);
		} else {
			console.log("Connected to mysql with database");
		}
		res.render('movie/form', {
			title: 'Add Movie',
			data: '',
			currentRoute: 'add'
		});
	});
});

//proccess insert data
router.post('/add', function(req, res, next){

	//validating
	req.assert('name', 'Name is required').notEmpty();
	req.assert('synopsis', 'Synopsis is required').notEmpty();

	var errors = req.validationErrors()

	if( !errors ) {

		/********************************************
		* Express-validator module

		req.body.comment = 'a <span>comment</span>';
		req.body.username = '   a user    ';

		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize('username').trim(); // returns 'a user'
		********************************************/
		var rows = {
			name: req.sanitize('name').escape().trim(),
			synopsis: req.sanitize('synopsis').escape().trim()
		}

		req.getConnection(function(error, conn) {
			if(error) {
				console.log('Failed get connection \n\
					error: ' + error);
			} else {
				console.log("Connected to mysql with database");
			}

			conn.query('INSERT INTO movie SET ?', rows, function(err, result) {
				if (err) {
					req.flash('error', err)
					res.render('movie/form', {
						title: 'Add Movie',
						data: rows,
						currentRoute: 'add'
					});
				} else {                
					req.flash('success', 'Data added successfully!')
					res.redirect('/movie');
				}
			})
		})
	} else {
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})                
		req.flash('error', error_msg)        

		/**
		* Using req.body.name 
		* because req.param('name') is deprecated
		*/
		res.render('movie/form', {
			title: 'Add Movie',
			data: req.body,
			currentRoute: 'add'
		})
	}
});

//form edit
router.get('/edit/(:id)', function(req, res, next){
	req.getConnection(function(error, conn) {
		if(error) {
			console.log('Failed get connection \n\
				error: ' + error);
		} else {
			console.log("Connected to mysql with database");
		}
		conn.query('SELECT * FROM movie WHERE id = ' + req.params.id, function(err, rows, fields) {
			if (rows.length <= 0) {
				req.flash('error', 'Movie not found');
				res.redirect('/movie');
			} else {
				res.render('movie/form', {
					title: 'Edit Movie ' + rows[0]['name'],
					data: rows[0],
					currentRoute: 'edit'
				});
			}
		});
	});
});

//update process
router.post('/edit/(:id)', function(req, res, next) {

	//validating
	req.assert('name', 'Name is required').notEmpty();
	req.assert('synopsis', 'Synopsis is required').notEmpty();

	var errors = req.validationErrors()

	if( !errors ) {

		/********************************************
		* Express-validator module

		req.body.comment = 'a <span>comment</span>';
		req.body.username = '   a user    ';

		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize('username').trim(); // returns 'a user'
		********************************************/
		var rows = {
			name: req.sanitize('name').escape().trim(),
			synopsis: req.sanitize('synopsis').escape().trim()
		}

		req.getConnection(function(error, conn) {
			if(error) {
				console.log('Failed get connection \n\
					error: ' + error);
			} else {
				console.log("Connected to mysql with database");
			}
			conn.query('UPDATE movie SET ? WHERE id = ' + req.params.id, rows, function(err, result) {
				if (err) {
					req.flash('error', err)
					res.render('movie/form', {
						title: 'Edit Movie',
						data: req.body,
						currentRoute: 'edit'
					});
				} else {
					req.flash('success', 'Data updated successfully!')
					res.redirect('/movie');
				}
			})
		})
	} else {
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})
		req.flash('error', error_msg)

		/**
		* Using req.body.name 
		* because req.param('name') is deprecated
		*/ 
		res.render('movie/form', {
			title: 'Edit Movie',
			data: req.body,
			currentRoute: 'edit'
		})
	}
});

//delete proccess
router.post('/delete/(:id)', function(req, res, next) {
	var row = { 
		id: req.params.id
	}

	req.getConnection(function(error, conn) {
		if(error) {
			console.log('Failed get connection \n\
				error: ' + error);
		} else {
			console.log("Connected to mysql with database");
		}
		conn.query('DELETE FROM movie WHERE id = ' + req.params.id, row, function(err, result) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				// redirect to users list page
				res.redirect('/movie')
			} else {
				req.flash('success', 'User deleted successfully!')
				// redirect to users list page
				res.redirect('/movie')
			}
		})
	})
});


///I DONT KNOW WHY I CANT USE PUT AND DELETE

console.log('success access movie router');

module.exports = router;