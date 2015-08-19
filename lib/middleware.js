/**
 * @module Middleware
 */

module.exports.init = function (app) {

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