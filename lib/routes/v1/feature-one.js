/**
 * @module FeatureOneV1
 *
 * Router, regarded as a feature, is toggled by means of a Boolean flag from the feature toggle
 * configuration file.
 *
 * This allows all users to access certain features.
 */

var express = require('express');
var featureOneRouter = express.Router();

// Isolated instance of the featureOne v1 router.
featureOneRouter

	// Http GET for root route '/v1/feature1'.
	.get('/', function (req, res, next) {
		res.json({
			feature: 1,
			info: 'Toggled by Boolean flag.'
		});
	});

// Export status router.
module.exports = featureOneRouter;
