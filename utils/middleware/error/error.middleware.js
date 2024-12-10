module.exports = (err, _req, res, _next) => {
	let error = { ...err };
	error.message = err.message || err?.original?.message;

	console.error(error);

	return res.status(error.statusCode || 500).json({
		success: false,
		message: error.message || "Internal Server Error",
	});
};
