/**
 * @module FeatureThreeV1
 *
 * Router, regarded as a feature, is toggled by means of an email address.
 *
 * When a specific email is found in a 'symbol list', the feature will be toggled for a specific
 * user asociated with said email address.
 *
 * This allows certain users to access certain features.
 */

var express = require('express');
var featureThreeRouter = express.Router();

// Isolated instance of the featureThree v1 router.
featureThreeRouter
	.route('/')

	// Middleware required to determine if feature can be loaded.
	.all(function (req, res, next) {
		if (req.skipFeature) {

			// Bypasses the remaining route callbacks.
			return next('route');
		}

		next();
	})

	// Http GET for root route '/v1/feature3'.
	.get(function (req, res, next) {
		res.json({
			feature: 3,
			info: 'Toggled by email address.'
		});
	});

// Export status router.
module.exports = featureThreeRouter;
