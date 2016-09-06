/* globals console */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.set('view engine', 'pug');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

global.exp = express;
var connections = require('./config/connections.js');
global.exp.connections = connections;

var mongoConnection = connections.mongoose;
var mongoConnectionString = 'mongodb://' + mongoConnection.username + ':' + mongoConnection.password + '@' + mongoConnection.url + ':' + mongoConnection.port + '/' + mongoConnection.db;
console.log(mongoConnectionString);
var mongoose = require('mongoose');
mongoose.connect(mongoConnectionString);
global.exp.mongoose = mongoose;
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

require('./api/models/User.js');
require('./api/models/Birds.js');

var user = require('./api/controller/userController.js');

var birds = require('./api/controller/birdsController.js');

app.use('/birds', birds);

app.get('/', function(req, res) {
  res.render('index', {
    title: 'Users☺',
    message: 'This is basic user CRUD!☺'
  });
});

app.post('/user', function(req, res) {
  user.create(req).then(function(response) {
    res.send(response);
  }).fail(function(err) {
    res.status = 500;
    res.send(err);
  });
});

app.get('/users/byname/:name', function(req, res) {
  user.getByName(req).then(function(response) {
    res.send(response);
  }).fail(function(err) {
    res.status = 500;
    res.send(err);
  });
});

app.get('/users/:userid', function(req, res) {
  user.getById(req).then(function(response) {
    res.send(response);
  }).fail(function(err) {
    res.status = 500;
    res.send(err);
  });
});

app.post('/users/:userid', function(req, res) {
  user.update(req).then(function(response) {
    res.send(response);
  }).fail(function(err) {
    res.status = 500;
    res.send(err);
  });
});

app.get('/users', function(req, res) {
  user.getAll(req).then(function(response) {
    res.send(response);
  }).fail(function(err) {
    res.status = 500;
    res.send(err);
  });
});

var server = app.listen(3000, function() {
  var port = server.address().port;
  console.log('Example app listening on port %s!', port);
});
