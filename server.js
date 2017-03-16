var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var instantMongoCrud = require('./index');

mongoose.connect('localhost:27017/mongocrud')

app.use(bodyParser.json());
app.use(instantMongoCrud(null));

app.listen('3000', ()=>{
	console.log('started');
})