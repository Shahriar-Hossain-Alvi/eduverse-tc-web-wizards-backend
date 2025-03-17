const mongoose = require("mongoose");
const ErrorResponse = require("../../../utils/middleware/error/error.response");
const Class = require("../schema/classes.schema");


// get all courses
module.exports = async (req, res, next) => {
    const {
        params: { id },
    } = req;


    if (!id) {
        return next(new ErrorResponse("id is required", 400));
    }

    // check if the id is a valid mongodb id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorResponse("Invalid class ID", 400));
    }

    try {
        // check if the course exists or not
        const result = await Class.findById(id).select("-__v -updatedAt -createdAt");

        // if course is not found
        if (!result) {
            return next(new ErrorResponse(`There are no class found with this ID: ${id}`, 404))
        }

        // send response
        res.status(200).json({
            success: true,
            message: "Class data fetched successfully",
            data: result
        });

    } catch (error) {
        //send error response
        next(error)
    }
}