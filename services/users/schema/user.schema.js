const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
			match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
		},
		password_hashed: { type: String, required: true },
		user_role: {
			type: String,
			enum: ["student", "faculty", "admin"],
			required: true,
		},
		is_active: { type: Boolean, default: true },
		first_name: { type: String, default: null },
		last_name: { type: String, default: null },
		user_name: { type: String, default: null },
		phone: { type: String, default: null },
		address: { type: String, default: null },
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
