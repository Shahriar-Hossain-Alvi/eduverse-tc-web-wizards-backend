const mongoose = require("mongoose");
const Class = require("../schema/classes.schema");
const ErrorResponse = require("../../../utils/middleware/error/error.response");

module.exports = async (req, res, next) => {
    const {
        params: { id },
        body: { title, description, course_id, faculty_id, scheduled_time, is_active }
    } = req;

    // Validate the class ID
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorResponse("Invalid or missing class ID.", 400));
    }

    if (course_id && !mongoose.Types.ObjectId.isValid(course_id)) {
        return next(new ErrorResponse("Invalid or missing course ID.", 400));
    }

    if (faculty_id && (!Array.isArray(faculty_id) || !faculty_id.every(id => mongoose.Types.ObjectId.isValid(id)))) {
        return next(new ErrorResponse("Invalid or empty faculty user ID(s).", 400));
    }

    try {
        // Check if the class exists
        const isClassExists = await Class.findById(id);
        if (!isClassExists) {
            return next(new ErrorResponse("Class not found.", 404));
        }

        // Check for scheduling conflicts
        if (faculty_id && scheduled_time) {
            const isFacultyAssigned = await Class.findOne({
                _id: { $ne: id }, // Exclude current class
                faculty_id: { $in: faculty_id }, // Check if any faculty_id overlaps
                scheduled_time,
            });

            if (isFacultyAssigned) {
                return next(
                    new ErrorResponse("One or more faculty members are already assigned to another class at this scheduled time.", 409)
                );
            }
        }



        // Update class fields
        const updates = {};
        if (title) updates.title = title;
        if (description) updates.description = description;
        if (course_id) updates.course_id = course_id;
        if (faculty_id) updates.faculty_id = faculty_id;
        if (scheduled_time) updates.scheduled_time = scheduled_time;
        if (is_active !== undefined) updates.is_active = is_active;

        // Perform the update
        const updatedClass = await Class.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

        // Send success response
        res.status(200).json({
            success: true,
            message: `Class with ID: ${updatedClass._id} updated successfully.`,
        });
    } catch (error) {
        // Handle unexpected errors
        next(error);
    }
};
