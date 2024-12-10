const jwt = require('jsonwebtoken');
const ErrorResponse = require('../error/error.response');

const verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return next(
            new ErrorResponse("Unauthorized access", 401)
        )
    }

    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return next(
                new ErrorResponse('Unauthorized access', 401)
            )
        }
        req.decoded = decoded; // Attach decoded token to request object
        next();
    });
};

module.exports = verifyToken;