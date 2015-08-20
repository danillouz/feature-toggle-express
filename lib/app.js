/**
 * @module App
 */

var express = require('express');
var featureToggles = require('feature-toggles');
var middleware = require('./middleware');

/**
 * Creates a full configured express.js application.
 *
 * @param  {Function} done - callback that exposes the express.js application
 */
module.exports.create = function (done) {
	var app = express();
	var server = null;

	/**
	 * Initialize the express.js application.
	 *
	 * @param  {Object} config   - configuration
	 * @param  {Object} features - feature toggles configuration
	 */
	app.init = function (config, features) {

		// Configure settings.
		app.set('port', config.PORT);

		// Load feature toggles configuration.
		featureToggles.load(features);

		// Initialize middleware.
		middleware.init(app);
	};

	/**
	 * Starts the express application by listening on the configured port.
	 *
	 * @param  {Function} next - callback that exposes the http Server Object
	 */
	app.start = function (next) {
		server = app.listen(app.get('port'));

		next(server);
	};

	/**
	 * Stops the express.js application by closing the http Server connection.
	 *
	 * @param  {Function} next - callback that executes when the http Server successfully closed
	 */
	app.stop = function (next) {
		server.close(next);
	};

	// Expose the express.js application.
	done(app);
};
