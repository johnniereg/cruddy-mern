var express = require('express');
var router = require('../routes/routes.js')
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
var mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));

// @TODO: This password shouldn't be hard written in here...
mongoose.connect('mongodb://scientist:feed100ducks@ds131551.mlab.com:31551/ifedaduck', { useNewUrlParser: true });

app.use('/', router);

module.exports = app;