const mongoose = require("mongoose");

const connect = () => {
	return mongoose.connect(
		"mongodb+srv://Ramlala:Ramlala@123@cluster0.n467z.mongodb.net/brute-force?retryWrites=true&w=majority",
		{
			useCreateIndex: true,
			useFindAndModify: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}
	);
};

module.exports = connect;
//mongodb+srv://Ramlala:Ramlala@123@cluster0.n467z.mongodb.net/brute-force?retryWrites=true&w=majority
