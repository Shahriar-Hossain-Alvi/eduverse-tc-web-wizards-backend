const ErrorResponse = require("../../../utils/middleware/error/error.response");
const Class = require("../schema/classes.schema");



// get all class
module.exports = async (req, res, next) => {

    const now = new Date();
    try {
        // Fetch upcoming classes (today & future) - sorted in ascending order
        const upcomingClasses = await Class.find({
            scheduled_time: { $gte: now }
        }).sort({ scheduled_time: 1 }) // Ascending order (earliest first)
            .select("-__v -updatedAt -createdAt").populate({
                path: "faculty_id",
                select: "first_name last_name"
            });;

        // fetch past classes
        const pastClasses = await Class.find({
            scheduled_time: { $lt: now }
        }).select("-__v -updatedAt -createdAt").populate({
            path: "faculty_id",
            select: "first_name last_name"
        });


        // combine classes
        const result = [...upcomingClasses, ...pastClasses]


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