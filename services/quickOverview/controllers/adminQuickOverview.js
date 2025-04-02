const User = require("../../users/schema/user.schema");
const Course = require("../../courses/schema/course.schema");
const ErrorResponse = require("../../../utils/middleware/error/error.response");
const ActivityLog = require("../../../utils/LogActivity/schema/activityLog.schema");

module.exports = async (req, res, next) => {
    try {
        const totalStudents = await User.countDocuments({ user_role: "student" });
        const totalFaculty = await User.countDocuments({ user_role: "faculty" });
        const totalCourses = await Course.countDocuments();
        const activeCourses = await Course.countDocuments({ is_active: true });

        const activities = await ActivityLog.find().sort({ timestamp: -1 }).limit(6);


        const quickOverView = {
            totalCourses: totalCourses,
            totalFaculty: totalFaculty,
            totalStudents: totalStudents,
            activeCourses: activeCourses,
            activities: activities
        }


        if (!quickOverView) {
            return next(new ErrorResponse("Dashboard Data Not found", 400));
        }


        res.status(201).json({
            data: quickOverView,
            success: true,
            message: "Overview fetched successfully"
        })
    } catch (error) {
        next(error)
    }
};