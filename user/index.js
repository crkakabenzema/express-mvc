/**
 * Module dependencies.
 */

var db = require('../../db');

var MongoClient = require('mongodb').MongoClient; 
var url = 'mongodb://localhost:27017/database'; 
exports.engine = 'hbs';

//
exports.before = function(req, res, next){
  // parse url params 
  // For example, if you have the route /user/:name, 
  // then the “name” property is available as req.params.name
  var id = req.params.user_id;
  if (!id) return next();
  // pretend to query a database...
  process.nextTick(function(){
	req.user = db.users[id];
    // cant find that user
    if (!req.user) return next('route');
    // found it, move on to the routes
	next()
  });
};

exports.list = function(req, res, next){
  res.render('list', { users: db.users });
};

exports.edit = function(req, res, next){
  res.render('edit', { user: req.user });
};

exports.show = function(req, res, next){
  var id = req.params.name;
  res.message('show user');
  res.render('show', { user: req.user });
};

exports.add = function(req, res, next){
  var nid = db.users.length;
  var id = nid;
  var user = { name: 'New User A', pets: [], id: nid };
  db.users.push(user);
  var nuser = db.users[id];
  MongoClient.connect(url, { useNewUrlParser: true}, { useUnifiedTopology: true },
  function(err, db){
	if(err) throw err;	
	console.log('数据库已创建'); 
	var dbase = db.db("database");
	dbase.collection("user").insertOne(user, 
		function(err, res){
		if(err) throw err; 
		console.log("文档插入成功"); 
		db.close();		
		}); 
  });
  res.render('show', { user: nuser });
};

exports.update = function(req, res, next){
  //post data is in req's body
  var body = req.body;
  req.user.name = body.user.name;
  res.message('Information updated!');
  res.redirect('/user/' + req.user.id);
};

/*
exports.get('/logout', function(req, res){
  // destroy the user's session to log them out
  // will be re-created next request
  req.session.destroy(function(){
    res.redirect('/');
  });
});

exports.get('/login', function(req, res){
  res.render('login');
});

exports.post('/login', function(req, res){
  authenticate(req.body.username, req.body.password, function(err, user){
    if (user) {
      // Regenerate session when signing in
      // to prevent fixation
      req.session.regenerate(function(){
        // Store the user's primary key
        // in the session store to be retrieved,
        // or in this case the entire user object
        req.session.user = user;
        req.session.success = 'Authenticated as ' + user.name
          + ' click to <a href="/logout">logout</a>. '
          + ' You may now access <a href="/restricted">/restricted</a>.';
        res.redirect('back');
      });
    } else {
      req.session.error = 'Authentication failed, please check your '
        + ' username and password.'
        + ' (use "tj" and "foobar")';
      res.redirect('/login');
    }
  });
});
*/