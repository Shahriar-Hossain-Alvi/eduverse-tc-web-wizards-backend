const mongoose = require("mongoose");
const ErrorResponse = require("../../../utils/middleware/error/error.response");
const CourseFacultyAssignment = require("../schema/courseFacultyAssignment.schema");
const logActivity = require("../../../utils/LogActivity/logActivity");


module.exports = async (req, res, next) => {
	const {
		params: { id },
		body: { users_id, course_id, is_active },
	} = req;

	// check if the id is a valid mongodb id
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return next(new ErrorResponse("Invalid user ID", 400));
	}


	// Validate `users_id` and `course_id` if provided
	if (users_id && (!Array.isArray(users_id) || !users_id.every((id) => mongoose.Types.ObjectId.isValid(id)))) {
		return next(new ErrorResponse("Invalid users_id: All IDs must be valid MongoDB ObjectIDs", 400));
	}

	if (course_id && !mongoose.Types.ObjectId.isValid(course_id)) {
		return next(new ErrorResponse("Invalid course_id: Must be a valid MongoDB ObjectID", 400));
	}

	try {
		// create a update CourseFacultyAssignment
		const updateData = {};

		if (users_id) updateData.users_id = users_id;
		if (course_id) updateData.course_id = course_id;
		if (typeof is_active !== "undefined") updateData.is_active = is_active;

		
		// Find CourseFacultyAssignment by ID and update
		const result = await CourseFacultyAssignment.findByIdAndUpdate(id, updateData, {
			new: true, // Returns the updated document instead of the old one
			runValidators: true, // Runs schema validation after updating fields
		});

		// If CourseFacultyAssignment not found
		if (!result) return next(new ErrorResponse("No CourseFacultyAssignment found with the given ID", 404));

		await logActivity(`Updated Course Assignment id: ${id}`, 
			"Course assignment(${id}) is update"
		)

		// send response
		res.status(200).json({
			success: true,
			message: "CourseFacultyAssignment updated successfully"
		});

	} catch (error) {
		// Send Error Response
		next(error);
	}
};