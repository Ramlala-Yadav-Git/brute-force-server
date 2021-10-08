const mongoose = require("mongoose");

let StudentSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		age: { type: Number, required: true },
		gender: { type: String, required: true },
		latitude: { type: Number, required: true },
		longtitude: { type: Number, required: true },
		interest: { type: String, required: true },
		education: { type: String, required: true },
		imageUrl: { type: String, required: true },
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

module.exports = mongoose.model("Student", StudentSchema);
