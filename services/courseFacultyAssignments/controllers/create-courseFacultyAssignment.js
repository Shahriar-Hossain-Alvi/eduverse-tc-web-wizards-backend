const mongoose = require("mongoose");
const ErrorResponse = require("../../../utils/middleware/error/error.response");
const User = require("../../users/schema/user.schema");
const Course = require("../../courses/schema/course.schema");
const CourseFacultyAssignment = require("../schema/courseFacultyAssignment.schema");
const logActivity = require("../../../utils/LogActivity/logActivity");


// create a new course faculty assignment 
module.exports = async (req, res, next) => {
    const { users_id, course_id } = req.body;

    if (!users_id || !course_id) {
        return next(
            new ErrorResponse("Faculty user ID and Assigned Course ID are required.", 400)
        );
    }


    // Validate IDs
    if (!Array.isArray(users_id) || !users_id.every(id => mongoose.Types.ObjectId.isValid(id))) {
        return next(new ErrorResponse("Invalid faculty user ID(s).", 400));
    }

    if (!mongoose.Types.ObjectId.isValid(course_id)) {
        return next(new ErrorResponse("Invalid course ID", 400));
    }

    try {

        // Check if course exists
        const courseExists = await Course.findById(course_id);
        if (!courseExists) {
            return next(new ErrorResponse("The specified course does not exist in Database.", 404));
        }


        // Check if all faculty exist
        const matchingUsers = await User.find({ _id: { $in: users_id } });
        if (matchingUsers.length !== users_id.length) {
            return next(new ErrorResponse("One or more specified faculty users do not exist in the database.", 404));
        }


        // check for exact course faculty assignments already exists
        const isCourseFacultyAssignmentExists = await CourseFacultyAssignment.findOne({ course_id });

        if (!isCourseFacultyAssignmentExists) {
            // Create a new CourseFacultyAssignment
            const newCourseFacultyAssignment = new CourseFacultyAssignment({
                users_id,
                course_id,
            });
            await newCourseFacultyAssignment.save();


            await logActivity(
                `Faculty assigned to course: ${course_id}`,
                `New faculty members added in Course: ${course_id}.`
            );

            res.status(201).json({
                success: true,
                message: "Course-Faculty assignment created successfully.",
            });
        } else {
            // if a CourseFacultyAssignment found
            isCourseFacultyAssignmentExists.users_id = users_id;
            await isCourseFacultyAssignmentExists.save();

            await logActivity(
                `Faculty assignment updated for course: ${course_id}`,
                `Updated faculty members added in Course: ${course_id}.`
            );


            res.status(201).json({
                success: true,
                message: "Faculty assignment updated successfully.",
            });
        }

    } catch (error) {
        // Send Error Response
        next(error);
    }
}