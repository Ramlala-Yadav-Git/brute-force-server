const mongoose = require("mongoose");

let BookSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		featureImg: { type: String, required: true },
		type: { type: String, required: true },
		price: { type: Number, required: true },
		condition: { type: String, required: true },
		location: { type: String, required: true },
		seller: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		author: {
			type: String,
		},
		comments: [
			{
				author: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
				},
				text: String,
			},
		],
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

module.exports = mongoose.model("Book", BookSchema);
