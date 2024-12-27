const jwt = require('jsonwebtoken');
const ErrorResponse = require('../error/error.response');

const verifyToken = (req, res, next) => {
    // Check for authorization header
    if (!req.headers.authorization) {
        return next(
            new ErrorResponse("Unauthorized access", 401)
        )
    }
    // console.log(req.headers.authorization);

    // extract the token from authorization header
    const token = req.headers.authorization.split(' ')[1];

    // verify token
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return next(
                new ErrorResponse('Unauthorized access', 401)
            )
        }

        req.decoded = decoded; // Attach decoded token to request object. The user details will be found in req.decoded
        // console.log(decoded);
        // console.log(req.decoded);
        next();
    });
};

module.exports = verifyToken;