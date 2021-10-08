const mongoose = require("mongoose");

let MentorSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		age: { type: Number, required: true },
		gender: { type: String, required: true },
		latitude: { type: Number, required: true },
		longtitude: { type: Number, required: true },
		specialization: { type: String, required: true },
		cNumber: { type: String, required: true },
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

module.exports = mongoose.model("Mentor", MentorSchema);