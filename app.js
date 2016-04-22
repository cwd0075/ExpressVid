'use strict';

var express = require('express');
var mongoskin = require('mongoskin');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

var db = mongoskin.db('mongodb://@localhost:27017/test', {safe:true});

app.get('/', function(req, res){
	res.send('Hello, world!');
});

app.get('/api', function(req, res){

	if (req.query.city == undefined)
	{
		db.collection('videos').find().toArray(function(err,results) {
			if (err) return next(err);
			res.send(results);
		});
	}
	else
	{
		res.send(req.query);
	}
});

app.listen(3000);
console.log('Open: http://127.0.0.1:3000/');