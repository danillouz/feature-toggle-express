/**
 * @module FeatureTwoV1
 *
 * Router, regarded as a feature, is toggled by means of a target date.
 * When the target date is met, the feature will be toggled for all users.
 *
 * This allows all users to access certain features from a specific date set in the future.
 */

var express = require('express');
var featureTwoRouter = express.Router();

// Isolated instance of the featureTwo v1 router.
featureTwoRouter

	// Http GET for root route '/v1/feature2'.
	.get('/', function (req, res, next) {
		res.json({
			feature: 2,
			info: 'Toggled by future date.'
		});
	});

// Export status router.
module.exports = featureTwoRouter;
