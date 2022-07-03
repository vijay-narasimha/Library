const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const User = mongoose.Schema({
	name: {
		type: String,
		required: [true, "please provide name"],
	},
	email: {
		type: String,
		required: [true, "please provide email"],
	},
	password: {
		type: String,
		required: true,
	},
	phonenumber: {
		type: String,
		required: true,
	},
	returnedBooks: {
		type: Array,
	},
	issuedBooks: {
		type: Array,
	},
	interestedBooks: {
		type: Array,
	},
	cart: {
		type: Array,
	},
	passAvailable: {
		type: String,
		default: "yes",
	},
	endTime: {
		type: Array,
	},
	messages: {
		type: Array,
	},
	role: {
		type: String,
		default: "user",
	},
	// },{
	//     collection : 'Mini-project'
});

User.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

User.methods.correctPassword = async function (password, userpassword) {
	return await bcrypt.compare(password, userpassword);
};

const model = mongoose.model("User", User);

module.exports = model;
