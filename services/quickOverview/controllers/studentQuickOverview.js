const mongoose = require("mongoose");
const Course = require("../../courses/schema/course.schema");
const CourseStudentEnrollment = require("../../courseStudentEnrollment/schema/courseStudentEnrollment.schema")
const Class = require("../../classes/schema/classes.schema")


module.exports = async (req, res, next) => {

    const { id } = req?.params; // student id

    try {
        // get total enrolled courses
        const total_Enrolled_courses = await CourseStudentEnrollment.countDocuments({
            users_id: new mongoose.Types.ObjectId(id)
        });



        // get recently enrolled course
        const get_Latest_Enrolled_Course = await CourseStudentEnrollment.findOne({
            users_id: new mongoose.Types.ObjectId(id)
        }).sort({ createdAt: -1 })  // Sort by newest first
            .select("course_id");

        let latest_Enrolled_Courses = {};

        if (get_Latest_Enrolled_Course) {
            const get_Latest_Enrolled_Course_Data = await Course.findById(get_Latest_Enrolled_Course.course_id).select("title start_date -_id")

            latest_Enrolled_Courses = get_Latest_Enrolled_Course_Data ? {
                latest_Enrolled_Course_Id: get_Latest_Enrolled_Course._id,

                latest_Enrolled_Course_title:
                    get_Latest_Enrolled_Course_Data.title,

                latest_Enrolled_start_date:
                    get_Latest_Enrolled_Course_Data.start_date,
            } : {}
        }


        // gt upcoming class schedules
        const now = new Date();

        // find enrolled courses
        const enrolledCourses = await CourseStudentEnrollment.find({
            users_id: new mongoose.Types.ObjectId(id)
        }).select("course_id");

        const courseIds = enrolledCourses.map(enrollment => enrollment.course_id)

        // get upcoming classes 
        const upcoming_classes = courseIds.length ? await Class.find({
            course_id: { $in: courseIds },
            scheduled_time: { $gte: now }
        }).sort({ scheduled_time: 1 })
        .limit(2)
        .select("_id scheduled_time title") : []


        const quickOverview = {
            total_Enrolled_courses,
            latest_Enrolled_Courses,
            upcoming_classes
        }


        res.status(201).json({
            data: quickOverview,
            success: true,
            message: "Overview fetched successfully"
        })
    } catch (error) {
        next(error)
    }
}