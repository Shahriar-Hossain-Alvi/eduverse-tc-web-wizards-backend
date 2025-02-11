const mongoose = require("mongoose");
const ErrorResponse = require("../../../utils/middleware/error/error.response");
const Course = require("../schema/course.schema");
const logActivity = require("../../../utils/LogActivity/logActivity");


// update a course data
module.exports = async (req, res, next) => {
	const {
		params: { id },
		body: { title, description, cover_url, total_available_seats, start_date, end_date, credits, assigned_faculty, prerequisites, is_active, },
	} = req;

	// check if the id is a valid mongodb id
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return next(new ErrorResponse("Invalid user ID", 400));
	}

	try {
		// create a update data object
		const updateData = {};

		if (title) updateData.title = title;
		if (description) updateData.description = description;
		if (cover_url) updateData.cover_url = cover_url;
		if (total_available_seats !== undefined) updateData.total_available_seats = total_available_seats;
		if (start_date) updateData.start_date = start_date;
		if (end_date) updateData.end_date = end_date;
		if (credits !== undefined) updateData.credits = credits;
		if (typeof is_active !== "undefined") updateData.is_active = is_active;



		// check if assigned faculty is array
		if (assigned_faculty) {
			if (!Array.isArray(assigned_faculty)) {
				return next(new ErrorResponse("Assigned faculty must be an array", 400));
			}
			// check if the id is from mongodb
			for (let id of assigned_faculty) {
				if (!mongoose.Types.ObjectId.isValid(id)) {
					return next(new ErrorResponse(`Invalid ID in assigned_faculty: ${id}`, 400));
				}
			}
			// update assigned faculty if faculty is found in the users collection
			updateData.assigned_faculty = assigned_faculty;
		}


		// check if prerequisite courses is array
		if (prerequisites) {
			if (!Array.isArray(prerequisites)) {
				return next(new ErrorResponse("prerequisites  must be an array", 400));
			}
			// check if the id is from mongodb
			for (let id of prerequisites) {
				if (!mongoose.Types.ObjectId.isValid(id)) {
					return next(new ErrorResponse(`Invalid ID in prerequisites: ${id}`, 400));
				}
			}
			// update assigned faculty if faculty is found in the users collection
			updateData.prerequisites = prerequisites;
		}


		// Find course by ID and update
		const result = await Course.findByIdAndUpdate(id, updateData, {
			new: true, // Returns the updated document instead of the old one
			runValidators: true, // Runs schema validation after updating fields
		});

		// If course not found
		if (!result) return next(new ErrorResponse("No course found with the given ID", 404));

		await logActivity(
			`Course: ${result.title} updated`,
			`${result.title} is updated successfully.`
		)

		// send response
		res.status(200).json({
			success: true,
			message: "Course updated successfully"
		});

	} catch (error) {
		// Send Error Response
		next(error);
	}
};