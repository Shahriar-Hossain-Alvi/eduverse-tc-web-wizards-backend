const mongoose = require('mongoose');
const ErrorResponse = require("../../../utils/middleware/error/error.response");
const CourseMaterial = require('../schema/courseMaterial.schema');
const Course = require("../../courses/schema/course.schema");
const User = require("../../users/schema/user.schema");
const logActivity = require("../../../utils/LogActivity/logActivity");

module.exports = async (req, res, next) => {
    const { title, description, course_id, material_url, created_by } = req.body;

    // Check if required fields are present
    if (!title || !description || !course_id || !material_url || !created_by) {
        return next(new ErrorResponse("Title, description, course_id, material_url, and created_by are required.", 400));
    }

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(course_id) || !mongoose.Types.ObjectId.isValid(created_by)) {
        return next(new ErrorResponse("Invalid course_id or created_by ID", 400));
    }

    try {
        // Check if the course exists in the database
        const courseExists = await Course.findById(course_id);
        if (!courseExists) {
            return next(new ErrorResponse("Course not found.", 404));
        }

        // Check if the faculty(user) exists in the database
        const userExists = await User.findById(created_by);
        if (!userExists) {
            return next(new ErrorResponse("Faculty (User) not found.", 404));
        }

        // Check if the same material (same course_id and title) already exists
        const existingMaterial = await CourseMaterial.findOne({
            course_id,
            title,
            material_url // Optional
        });

        if (existingMaterial) {
            return next(new ErrorResponse("This material already exists for the course.", 400));
        }

        // Create a new course material
        const newCourseMaterial = new CourseMaterial({
            title,
            description,
            course_id,
            material_url,
            created_by,
        });

        await newCourseMaterial.save();

        await logActivity(
			`Course material uploaded`,
			`Course material for courseID: ${course_id} is created by facultyID: ${created_by}`
		)

        // Return success response
        res.status(201).json({
            success: true,
            message: "Course material created successfully.",
        });
    } catch (error) {
        next(error);
    }
};