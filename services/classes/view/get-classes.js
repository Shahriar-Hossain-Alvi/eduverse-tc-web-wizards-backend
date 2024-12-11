const ErrorResponse = require("../../../utils/middleware/error/error.response");
const Class = require("../schema/classes.schema");



// get all class
module.exports = async (req, res, next) => {

    try {
        // get all classes
        const result = await Class.find();

        // if class list is empty
        if(result.length === 0){
            return new ErrorResponse("There are no classes available", 404)
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