const ErrorResponse = require("../../../utils/middleware/error/error.response");
const Class = require("../schema/classes.schema");



// get all class
module.exports = async (req, res, next) => {
    const { search, todaysClass } = req.query;

    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    try {
        const searchedClass = search ? { title: { $regex: search, $options: "i" } } : {};


        let result = [];

        if (todaysClass === "true") {
            result = await Class.find({
                scheduled_time: { $gte: startOfDay, $lt: endOfDay }, ...searchedClass
            })
                .sort({ scheduled_time: 1 })
                .select("-__v -updatedAt -createdAt").populate({
                    path: "faculty_id",
                    select: "first_name last_name"
                });
        }
        else {
            // Fetch upcoming classes (today & future) - sorted in ascending order
            const upcomingClasses = await Class.find({ scheduled_time: { $gte: now }, ...searchedClass }).sort({ scheduled_time: 1 }) // Ascending order (earliest first)
                .select("-__v -updatedAt -createdAt").populate({
                    path: "faculty_id",
                    select: "first_name last_name"
                });;



            // fetch past classes
            const pastClasses = await Class.find({
                scheduled_time: { $lt: now }, ...searchedClass
            }).select("-__v -updatedAt -createdAt").populate({
                path: "faculty_id",
                select: "first_name last_name"
            });

            // combine classes
            result = [...upcomingClasses, ...pastClasses]
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