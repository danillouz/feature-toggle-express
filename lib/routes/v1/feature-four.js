/**
 * @module FeatureFourV1
 *
 * Router, regarded as a feature, is toggled by means of a privilege.
 *
 * When a specific privilege is found in a 'symbol list', the feature will be toggled for a specific
 * user asociated with said privilege.
 *
 * This allows users with certain privileges to access certain features.
 */

var express = require('express');
var featureFourRouter = express.Router();

// Isolated instance of the featureFour v1 router.
featureFourRouter

	// Http GET for root route '/v1/feature4'.
	.get(
		'/',

		// Middleware required to determine if feature can be loaded.
		function (req, res, next) {
			if (req.skipFeature) {

				// Bypasses the remaining route callbacks.
				return next('route');
			}

			next();
		},

		function (req, res, next) {
			res.json({
				feature: 4,
				info: 'Toggled by privilege.'
			}
		);
	});

// Export status router.
module.exports = featureFourRouter;
