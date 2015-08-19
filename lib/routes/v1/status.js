/**
 * @module StatusRouterV1
 */

var express = require('express');
var statusRouter = express.Router();

// Isolated instance of the status v1 router.
statusRouter

	// Http GET for root route '/v1/status'.
	.get('/', function (req, res, next) {
		res.json({
			status: 'ok'
		});
	});

// Export status router.
module.exports = statusRouter;
