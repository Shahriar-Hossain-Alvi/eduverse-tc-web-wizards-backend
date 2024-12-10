const ErrorResponse = require("../../../utils/middleware/error/error.response");


// get all courses
module.exports = async (req, res, next) => {

    try {
       
        // send response
        res.status(200).json({
			success: true,
			message: "Data fetched successfully",
            
		});

    } catch (error) {
        //send error response
        next(error)
    }
}