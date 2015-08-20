/**
 * @module Middleware
 */

var featureToggles = require('feature-toggles');
var statusRouterV1 = require('./routes/v1/status');
var featureOneRouterV1 = require('./routes/v1/feature-one');
var featureTwoRouterV1 = require('./routes/v1/feature-two');
var featureThreeRouterV1 = require('./routes/v1/feature-three');
var featureFourRouterV1 = require('./routes/v1/feature-four');

/**
 * Initialize express.js application middleware.
 *
 * @param  {Function} app - express.js application
 */
module.exports.init = function (app) {

	// Middleware to inject fake user data.
	app.use(function (req, res, next) {
		req.user = {
			email: 'daniel@crowdynews.com',
			privilege: 'admin'
		};

		next();
	});

	// Application routes.
	app.use('/v1/status', statusRouterV1);

	// Feature toggled by means of a Boolean flag set in the feature toggles configuration file.
	if (featureToggles.isFeatureEnabled('featureOne')) {
		app.use('/v1/feature1', featureOneRouterV1);
	}

	// Feature toggled by means of a future date.
	if (featureToggles.isFeatureEnabled('featureTwo', '2015-08-26')) {
		app.use('/v1/feature2', featureTwoRouterV1);
	}

	// Feature toggled by means of an email address, accessed from the http request Object.
	app.use(
		'/v1/feature3',

		// Middleware required to access the http request Object.
		function (req, res, next) {
			if (!featureToggles.isFeatureEnabled('featureThree', req.user.email)) {
				req.skipFeature = true;
			}

			next();
		},

		featureThreeRouterV1
	);

	// Feature toggled by means of a privilege, accessed from the http request Object.
	app.use(
		'/v1/feature4',

		// Middleware required to access the http request Object.
		function (req, res, next) {
			if (!featureToggles.isFeatureEnabled('featureFour', req.user.privilege)) {
				req.skipFeature = true;
			}

			next();
		},

		featureFourRouterV1
	);

	// Route not found middleware.
	app.use(function (req, res, next) {
		var notFoundError = new Error('The requested route does not exist.');

		notFoundError.title = 'Not Found';
		notFoundError.status = 404;

		next(notFoundError);
	});

	// Error handling middleware.
	app.use(function (err, req, res, next) {
		res.status(err.status).json({
			title: err.title,
			info: err.message,
			status: err.status
		});
	});
};
