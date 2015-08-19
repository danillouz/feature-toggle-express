/**
 * @module Start
 */

var app = require('./app');
var config = require('./config/config');

app.create(function (_app) {
	_app.init(config);
	_app.start(function (server) {
		console.log('listening on localhost:', server.address().port);
	});
});
