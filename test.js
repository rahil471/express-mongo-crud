var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var instantMongoCrud = require('./index');

mongoose.connect('localhost:27017/mongocrud')

var options = {
	host: "localhost:3001"
}

app.use(bodyParser.json());
app.use(instantMongoCrud(options));

app.listen('3001', ()=>{
	console.log('started');
})