const mongoose = require('mongoose');
const ErrorResponse = require('../../../utils/middleware/error/error.response');
const Class = require('../schema/classes.schema');


module.exports = async (req, res, next) => {

    const { title, description, course_id, faculty_id, scheduled_time, is_active } = req.body;

    // Check all required fields
    if (!title || !description || !course_id || !faculty_id || !scheduled_time) {
        return res.status(400).json({ message: "title,description,course_id,faculty_id,schedule_time must be provided." });
    }

    // Check if IDs are valid MongoDB ObjectIds
    if (!mongoose.Types.ObjectId.isValid(course_id)) {
        return next(new ErrorResponse("Invalid course ID", 400));
    }

    if (!Array.isArray(faculty_id) || !faculty_id.every(id => mongoose.Types.ObjectId.isValid(id))) {
        return next(new ErrorResponse("Invalid faculty user ID(s).", 400));
    }

    try {
        // Check the same faculty is already assigned to a class at the same  time
        const conflictingClass = await Class.findOne({
            faculty_id,
            scheduled_time
        });

        if (conflictingClass) {
            return next(
                new ErrorResponse("Faculty is already assigned to another class at this schedule time.", 409)
            )
        }

        // Create a new class
        const newclass = new Class({
            title, description, course_id, faculty_id, scheduled_time,
        });

        // Save the class to the database
        await newclass.save();

        // Return success response
        res.status(201).json({
            success: true,
            message: "New Class create successfully.",
        });
    } catch (error) {
        next(error);
    }
};
