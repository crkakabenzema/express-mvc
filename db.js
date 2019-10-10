//Different to SQL, MongoDB will create database automatically.
var MongoClient = require('mongodb').MongoClient; 
var url = 'mongodb://localhost:27017/database'; 

var pets = exports.pets = [];
var users = exports.users = [];
var initpets = exports.initpets = [];
var initusers = exports.initusers = [];

//create a database;
//create a connection; create a collection pet; 
//create some test data
MongoClient.connect(url, { useNewUrlParser: true}, { useUnifiedTopology: true },
function(err, db){
	if(err) throw err;	
	console.log('数据库已创建'); 
	var dbase = db.db("database");
	dbase.createCollection('pet', 
	function(err, res){
		if(err) throw err; 
		console.log("创建pet集合!"); 
		db.close();
	});
	dbase.collection("pet").find({}).toArray(
	function(err, result){
		if (err) throw err;
		if (result.length != 0){
			for (var i = 0; i < result.length -1; i++){
				pets.push(result[i]);
				initpets.push(result[i]);
				}
		}
		console.log("find pets" + pets);		
		db.close();
	});
});

//create a collection; create a collection user;
//creat some test data;
MongoClient.connect(url, { useNewUrlParser: true}, { useUnifiedTopology: true },
function(err, db){
	if(err) throw err;	
	console.log('数据库已创建'); 
	var dbase = db.db("database");
    dbase.createCollection('user', 
	function(err, res){
		if(err) throw err; 
		console.log("创建user集合!"); 
		db.close();
	});
	dbase.collection("user").find({}).toArray(
	function(err, result){
		if (err) throw err;
		if (result.length != 0){
			for (var i = 0; i < result.length; i++){
				users.push(result[i]);
				initusers.push(result[i]);
				}
		}
        console.log("find users" + users);
		db.close(); 
	});
});

// insert data changed
MongoClient.connect(url, { useNewUrlParser: true}, { useUnifiedTopology: true },
function(err, db){
	if(err) throw err;	
	console.log('数据库已创建'); 
	var dbase = db.db("database");
	var uLen = users.length;
	var intuLen = initusers.length;
	var usersObj = [];
    if (uLen != intuLen){
		var changed = uLen - intuLen;
		for (var i = intuLen; i < changed + intuLen - 1; i++){
			usersObj.push(users[i]);
		}
	}
	if (usersObj.length == 1){
		dbase.collection("user").insertOne(usersObj, 
		function(err, res){
		if(err) throw err; 
		console.log("文档插入成功"); 
		db.close();		
		}); 
	}
	if (usersObj.length > 1){
		dbase.collection("user").insertMany(usersObj, 
		function(err, res){
		if(err) throw err; 
		console.log("文档插入成功"); 
		db.close();		
		}); 
	}
});

/*
//delete collections
MongoClient.connect(url, { useNewUrlParser: true}, 
function(err, db){
	if(err) throw err; 
	var dbo = db.db("database"); 
	dbo.collection("user").drop(
	function(err, delOK){ 
	    if(err) throw err; 
		if(delOK)
			console.log("集合已删除"); 
		    db.close(); 
	}); 
});

MongoClient.connect(url, { useNewUrlParser: true}, 
function(err, db){
	if(err) throw err; 
	var dbo = db.db("database"); 
	dbo.collection("pet").drop(
	function(err, delOK){ 
	    if(err) throw err; 
		if(delOK)
			console.log("集合已删除"); 
		    db.close(); 
	}); 
});
*/

/*
//insert one data && multi data 
MongoClient.connect(url, { useNewUrlParser: true}, 
function(err, db){
	if(err) throw err; 
	var dbo = db.db("database"); 
	var myobj = {name: "菜鸟教程", url:"www.runoob"}; 
	dbo.collection("site").insertOne(myobj, 
	function(err, res){
		if(err) throw err; 
		else{
			console.log("文档插入成功"); 
			db.close();
		}		
	}); 
	dbo.collection("pet").insertMany(petsobj, 
	function(err, res){
		if(err) throw err; 
		else{
			console.log("插入的文档数量为: " + res.insertedCount);
			db.close();
		}
	}); 
});
*/

/*
//find data in the condition
//find().limit(number): limit returned number
//find().skip(number): skip number and return
MongoClient.connect(url, { useNewUrlParser: true}, 
function(err, db){
	if(err) throw err; 
	var dbo = db.db("database"); 
	var whereStr = {"name":'菜鸟教程'}; 
	dbo.collection("site").find(whereStr).toArray(
	function(err, result){
		if (err) throw err; 
		console.log(result); 
		db.close(); 
	}); 
});

//sort() method receive one arg, 1 means increase, -1 means decrease;
MongoClient.connect(url, { useNewUrlParser: true}, 
function(err, db){
	if(err) throw err; 
	var dbo = db.db("database"); 
	var mysort = {type: 1}; 
	dbo.collection("site").find().sort(mysort).toArray(
	function(err, result){ 
	    if(err) throw err; 
		console.log(result); 
		db.close(); 
	}); 
});

//update one data
MongoClient.connect(url, { useNewUrlParser: true}, 
function(err, db){
	if(err) throw err; 
	var dbo = db.db("database"); 
	var whereStr = {"name":'菜鸟教程'}; 
	var updateStr = {$set: {"url" : "https://www.runoob.com"}}; 
	dbo.collection("site").updateOne(whereStr, updateStr, 
	function(err, res){
		if (err) throw err; 
		console.log("文档更新成功"); 
		db.close(); 
	});
});

//update multi data
MongoClient.connect(url, { useNewUrlParser: true}, 
function(err, db){
	if(err) throw err; 
	var dbo = db.db("database"); 
	var whereStr = {"type":'en'}; 
	var updateStr = {$set: {"url" : "https://www.runoob.com"}};
	dbo.collection("site").updateMany(whereStr, updateStr, 
	function(err, res){
		if(err) throw err; 
		console.log(res.result.nModified + " 条文档被 更新"); 
		db.close(); 
	});
});

//delete one data
MongoClient.connect(url, { useNewUrlParser: true}, 
function(err, db){
	if(err) throw err;
	var dbo = db.db("database"); 
	var whereStr = {"name":'菜鸟教程'}; 
	dbo.collection("site").deleteOne(whereStr, 
	function(err, obj){ 
	    if(err) throw err; 
		console.log("文档删除成功"); 
		db.close(); 
	});	
});

//delete multi data
MongoClient.connect(url, { useNewUrlParser: true}, 
function(err, db){
	if(err) throw err; 
	var dbo = db.db("database"); 
	var whereStr = {type: "en"}; 
	dbo.collection("site").deleteMany(whereStr, 
	function(err, obj){
		if (err) throw err; 
		console.log(obj.result.n + " 条文档被删除"); 
		db.close(); 
	}); 
});

//delete collection (drop() method)
MongoClient.connect(url, { useNewUrlParser: true}, 
function(err, db){
	if(err) throw err; 
	var dbo = db.db("database"); 
	dbo.collection("test").drop(
	function(err, delOK){ 
	    if(err) throw err; 
		if(delOK)
			console.log("集合已删除"); 
		    db.close(); 
	}); 
});

*/

//In Json, {} means a object; [] means a array; "" means key or value
// basic construct: var JsonObj = {"name":"Hannah", "like":["看书", "电影", "晨跑"]}; 
// Json can also be a array,
//JSON.stringify({},[],""): transfer JS object to json string, 
//first arg means object; second arg controls key; last arg format print var
//JSON.parse(str): transfer json string to json object;

/*
var pets = exports.pets = [];

pets.push({ name: 'Tobi', id: 0 });
pets.push({ name: 'Loki', id: 1 });
pets.push({ name: 'Jane', id: 2 });
pets.push({ name: 'Raul', id: 3 });

var users = exports.users = [];

users.push({ name: 'TJ', pets: [pets[0], pets[1], pets[2]], id: 0  });
users.push({ name: 'Guillermo', pets: [pets[3]], id: 1 });
users.push({ name: 'Nathan', pets: [], id: 2 });
*/