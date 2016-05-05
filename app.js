'use strict';

//To run in backgroup:
//nohup node app.js > express.log &


var express = require('express');
var mongoskin = require('mongoskin');
var bodyParser = require('body-parser');
var countries = require('./json/countries.json');
var cors = require('cors');

var app = express();
app.use(cors());
app.use(bodyParser.json());

var db = mongoskin.db('mongodb://@localhost:27017/youtube', {safe:true});

app.get('/', function(req, res){
	res.send('Hello, world!');
});

app.get('/api/arealist', function(req, res){
	res.send(countries);
});

app.get('/api/video', function(req, res){
	var id = '';
	
	id = req.query.id;
	
	db.collection('vids').find({"items.id": id},{"_id":0, "items.$":1}).toArray(function(err, results){
		if (err) return next(err);
		//console.log(results[0]);
		res.send(results[0]);
	});
	
});



app.get('/api/videos', function(req, res){
	var area = '';
	var found = false;
	area = (req.query.area == undefined) ? 'US' : req.query.area;
	//check if area is in country list
	for(var i=0; i<countries.length; i++)
	{
		if (countries[i].code === area)
		{
			found = true;
			break;
		}
	}
	//console.log(found);
	if (!found)	area = 'US';
	
	//console.log(area);

	db.collection('vids').find({country: area},{_id:false, "items.snippet.description":false, "items.statistics":false}).toArray(function(err, results){
		if (err) return next(err);
		//console.log(results[0]);
		res.send(results[0]);
	});
	
});

app.listen(3000);
console.log('Open: http://127.0.0.1:3000/');