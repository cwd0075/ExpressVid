'use strict';

var express = require('express');
var app = express();

app.get('/', function(req, res){
	res.send('Hello, world!');
});

app.listen(3000);
console.log('Open: http://127.0.0.1:3000/');