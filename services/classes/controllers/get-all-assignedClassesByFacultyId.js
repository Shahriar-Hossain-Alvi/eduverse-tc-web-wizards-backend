const mongoose = require("mongoose");
const ErrorResponse = require("../../../utils/middleware/error/error.response");
const Class = require("../schema/classes.schema");


// get all courses
module.exports = async (req, res, next) => {
    const { id } = req?.params;

    if (!id) {
        return next(new ErrorResponse("id is required", 400));
    }

    // check if the id is a valid mongodb id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorResponse("Invalid class ID", 400));
    }

    const now = new Date();
    try {

        // check if the course exists or not
        const result = await Class.find({
            faculty_id: { $in: [new mongoose.Types.ObjectId(id)] }
        }).select("-__v -updatedAt -createdAt").populate({
            path: "faculty_id",
            select: "first_name last_name"
        });

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