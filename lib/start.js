/**
 * @module Start
 */

var app = require('./app');
var config = require('./config/config');
var features = require('./config/features');

app.create(function (_app) {
	_app.init(config, features);
	_app.start(function (server) {
		console.log('listening on localhost:', server.address().port);
	});
});
