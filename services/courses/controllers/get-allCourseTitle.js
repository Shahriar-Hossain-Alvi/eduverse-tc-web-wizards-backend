const ErrorResponse = require("../../../utils/middleware/error/error.response");
const Course = require("../schema/course.schema");


// get all courses
module.exports = async (req, res, next) => {

    try {
        // get courses list
        const result = await Course.find().select("title _id");

        // if course list is empty
        if(result.length === 0){
            return new ErrorResponse("There are no courses available", 404)
        }

        // send response
        res.status(200).json({
			success: true,
			message: "Data fetched successfully",
            data: result
		});

    } catch (error) {
        //send error response
        next(error)
    }
}