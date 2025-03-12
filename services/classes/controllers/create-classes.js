const mongoose = require('mongoose');
const ErrorResponse = require('../../../utils/middleware/error/error.response');
const Class = require('../schema/classes.schema');
const Course = require('../../courses/schema/course.schema');
const User = require('../../users/schema/user.schema');
const logActivity = require("../../../utils/LogActivity/logActivity");


module.exports = async (req, res, next) => {

    const { title, description, course_id, faculty_id, scheduled_time, location } = req.body;

    // Check all required fields
    if (!title || !description || !course_id || !faculty_id || !scheduled_time) {
        return next(
            new ErrorResponse("title,description,course_id,faculty_id,schedule_time must be provided.", 400)
        )
    }

    // Check if IDs are valid MongoDB ObjectIds
    if (!mongoose.Types.ObjectId.isValid(course_id)) {
        return next(new ErrorResponse("Invalid course ID", 400));
    }

    if (!Array.isArray(faculty_id) || faculty_id.length === 0 || !faculty_id.every(id => mongoose.Types.ObjectId.isValid(id))) {
        return next(new ErrorResponse("Invalid or empty faculty user ID(s).", 400));
    }


    try {
        // Check if the course exists
        const isCourseExists = await Course.findById(course_id);
        if (!isCourseExists) {
            return next(new ErrorResponse("The specified course does not exist.", 404));
        }

        // Check if all faculty members exist
        const isFacultyExists = await User.find({ _id: { $in: faculty_id } });
        if (isFacultyExists.length !== faculty_id.length) {
            return next(new ErrorResponse("One or more faculty members do not exist.", 404));
        }


        // Check if the same faculty is already assigned to a class at the same time
        const isFacultyAssigned = await Class.findOne({
            faculty_id: { $in: faculty_id }, // Check if any faculty_id overlaps
            scheduled_time
        });

        if (isFacultyAssigned) {
            return next(
                new ErrorResponse("One or more faculty members are already assigned to another class at this scheduled time.", 409)
            )
        }

        // Create a new class
        const newClass = new Class({
            title, description, course_id, faculty_id, scheduled_time, location
        });

        // Save the class to the database
        const result = await newClass.save();

        await logActivity(
			`New class schedule created`,
			`New class: ${title} for courseID: ${course_id}  is created`
		)

        // Return success response
        res.status(201).json({
            success: true,
            message: `A New Class with the title ${result.title} created successfully.`,
        });
    } catch (error) {
        next(error);
    }
};
