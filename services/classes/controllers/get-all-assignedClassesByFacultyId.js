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
        // Fetch upcoming classes (today & future) - sorted in ascending order
        const upcomingClasses = await Class.find({
            faculty_id: { $in: [new mongoose.Types.ObjectId(id)] },
            scheduled_time: { $gte: now }
        }).sort({ scheduled_time: 1 }) // Ascending order (earliest first)
        .select("-__v -updatedAt -createdAt").populate({
            path: "faculty_id",
            select: "first_name last_name"
        });;

        // fetch past classes
        const pastClasses = await Class.find({
            faculty_id: { $in: [new mongoose.Types.ObjectId(id)] },
            scheduled_time: { $lt: now }
        }).select("-__v -updatedAt -createdAt").populate({
            path: "faculty_id",
            select: "first_name last_name"
        });


        // combine upcoming and past classes
        const result = [...upcomingClasses, ...pastClasses]


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