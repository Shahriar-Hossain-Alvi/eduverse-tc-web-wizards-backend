const mongoose = require("mongoose");
const User = require("../schema/user.schema");
const ErrorResponse = require("../../../utils/middleware/error/error.response");


// update a user data
module.exports = async (req, res, next) => {
	const {
		params: { id },
		body: { first_name, last_name, phone, address, is_active },
	} = req;


	// check if the id is a valid mongodb id
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return next(new ErrorResponse("Invalid user ID", 400));
	}

	try {
		// create a update data object 
		const updateData = {};
		if(first_name) updateData.first_name = first_name;
		if(last_name) updateData.last_name = last_name;
		if(phone) updateData.phone = phone;
		if(address) updateData.address = address;
		if (typeof is_active !== "undefined") {
			updateData.is_active = is_active; // Update the field if is_active is provided
		  }
		

		// find user by id and update
		const result = await User.findByIdAndUpdate(id, updateData, {
			new: true, // returns the updated doc instead the old one
			runValidators: true //runs schema validation after updating the fields
		}).select("-password_hashed -__v");

		if (!result) return next(new ErrorResponse("No user found!", 404));

		res.status(200).json({
			success: true,
			message: "User updated successfully",
			data: result,
		});
		// On Error
	} catch (error) {
		// Send Error Response
		next(error);
	}
};