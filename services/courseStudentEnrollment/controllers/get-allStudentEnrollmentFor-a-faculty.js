const mongoose = require('mongoose');
const ErrorResponse = require("../../../utils/middleware/error/error.response");
const CourseStudentEnrollment = require('../schema/courseStudentEnrollment.schema');
const CourseFacultyAssignment = require("../../courseFacultyAssignments/schema/courseFacultyAssignment.schema");
const Course = require("../../courses/schema/course.schema")


module.exports = async (req, res, next) => {
    const { id } = req.params; // faculty id
    const { search } = req.query; // course title

    // Check if the ID is valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorResponse("Invalid Faculty ID", 400));
    }

    try {
        // get the course_ids from course faculty assignments
        const assignedCourses = await CourseFacultyAssignment.find({
            users_id: { $in: [new mongoose.Types.ObjectId(id)] }
        }).select("course_id");


        if (!assignedCourses || assignedCourses.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No assigned courses found.",
                data: [],
            });
        }


        let courseIds = assignedCourses.map(course => course.course_id);


        // if search parameter exists, filter by title
        if (search && search.trim() !== "") {
            const filteredCourses = await Course.find({
                _id: { $in: courseIds },
                title: { $regex: search, $options: "i" }
            }).select("_id");

            // Update courseIds to only include those that match the search
            courseIds = filteredCourses.map(course => course._id);


            // If no courses match the search criteria
            if (courseIds.length === 0) {
                return res.status(200).json({
                    success: true,
                    message: "No courses found matching the search criteria.",
                    data: [],
                });
            }
        };


        // get student list for these courses
        const studentEnrollments = await CourseStudentEnrollment.find({
            course_id: { $in: courseIds }
        }).populate({
            path: "course_id",
            select: "title cover_url start_date end_date"
        }).populate({
            path: "users_id",
            select: "first_name last_name email phone _id"
        }).select("-createdAt -updatedAt -__v -is_active");


        // Group students by course
        const groupedData = {};

        studentEnrollments.forEach(enrollment => {
            const courseId = enrollment.course_id._id.toString();

            if (!groupedData[courseId]) {
                groupedData[courseId] = {
                    title: enrollment.course_id.title,
                    cover_url: enrollment.course_id.cover_url,
                    start_date: enrollment.course_id.start_date,
                    end_date: enrollment.course_id.end_date,
                    students: []
                };
            }

            groupedData[courseId].students.push({
                _id: enrollment.users_id._id,
                first_name: enrollment.users_id.first_name,
                last_name: enrollment.users_id.last_name,
                email: enrollment.users_id.email,
                phone: enrollment.users_id.phone
            });
        });

        // Convert object to array
        const courseWithStudents = Object.values(groupedData);


        return res.status(200).json({
            success: true,
            message: "Grouped student enrollments fetched successfully.",
            data: courseWithStudents,
        });

    } catch (error) {
        next(error)
    }
}