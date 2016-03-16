var express = require('express');
var logger = require('morgan');
var debug = require('debug')('fb-event-location-search:server');
var http = require('http');

var routes = require('./routes/events');

var app = express();

app.use(logger('dev'));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('index');
});

app.use('/', routes);

var port = process.env.PORT || 3000;

app.listen(port);