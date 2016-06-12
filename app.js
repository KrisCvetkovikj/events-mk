var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// ROUTING VARIABLES
var routes = require('./routes/index');
var users = require('./routes/users');
var events = require('./routes/events');
var db = require("./routes/db");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/node_modules', express.static(__dirname + "/node_modules"));
app.use('/css', express.static(__dirname + "/css"));
app.use('/js', express.static(__dirname + "/js"));
app.use('/fonts', express.static(__dirname + "/fonts"));
app.use('/img', express.static(__dirname + "/img"));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser('secret'));
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/events', events);

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/event-test', function (req, res) {
    res.render('event-test');
});

app.get('/test', function (req, res) {
    res.render('test');
});

app.get('/db/getUsers', function (req, res) {
    db.getUsers(req, res);
});
app.get('/db/addUser', function (req, res) {
    db.addUser(req, res);
});
app.get('/db/getUserFavorites', function (req, res) {
    db.getUserFavorites(req, res);
});
app.get('/db/addFavorite', function (req, res) {
    db.addFavorite(req, res);
});
app.get('/db/removeFavorite', function (req, res) {
    db.removeFavorite(req, res);
});
app.get('/db/createTable', function (req, res) {
    db.createTable(req, res);
});
app.get('/db/dropTable', function (req, res) {
    db.dropTable(req, res);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
