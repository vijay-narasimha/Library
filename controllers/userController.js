const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const Book = require("../models/bookModel");
const User = require("../models/userModel");

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET);
};

const createSendToken = (user, code, req, res) => {
	const token = signToken(user._id);
	const cookieOptions = {
		expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
		httpOnly: true,
	};
	res.cookie("jwt", token, cookieOptions);
	user.password = undefined;
	res.status(code).json({
		status: "success",
		token,
		data: {
			user,
		},
	});
};

exports.register = async (req, res) => {
	const newUser = await User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		phonenumber: req.body.phonenumber,
	});
	createSendToken(newUser, 201, req, res);
};
exports.login = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });

	if (!user || !(await user.correctPassword(password, user.password))) {
		res.status(400).json({
			status: "fail",
			message: "incorrect email or password",
		});
	} else {
		createSendToken(user, 200, req, res);
	}
};

exports.logout = (req, res) => {
	res.cookie("jwt", "loggedout", {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true,
	});
	res.status(200).json({ status: "success" });
};

exports.isLoggedIn = async (req, res, next) => {
	res.locals.user = null;
	if (req.cookies.jwt) {
		try {
			const decoded = await jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);

			const currentUser = await User.findById(decoded.id);

			if (!currentUser) return next();
			res.locals.user = currentUser;

			return next();
		} catch (err) {
			return next();
		}
	}

	return next();
};

exports.saveBook = async (req, res) => {
	try {
		const bookId = req.params.id;

		if (!res.locals.user.savedBooks.includes(bookId)) {
			res.locals.user.savedBooks.push(bookId);
			await User.findByIdAndUpdate(res.locals.user._id, res.locals.user, {
				new: true,
			});
		}
		res.status(200).json({
			status: "success",
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			err,
		});
	}
};

exports.addCart = async (req, res) => {
	try {
		const bookId = req.params.id;
		if (!res.locals.user.cart.includes(bookId)) {
			res.locals.user.cart.push(bookId);
			await User.findByIdAndUpdate(res.locals.user._id, res.locals.user, {
				new: true,
			});
		}
		res.status(200).json({
			status: "success",
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			err,
		});
	}
};

exports.removeCart = async (req, res) => {
	try {
		const bookId = req.params.id;
		if (res.locals.user.cart.includes(bookId)) {
			res.locals.user.cart = res.locals.user.cart.filter(
				(book) => book !== bookId,
			);

			await User.findByIdAndUpdate(res.locals.user._id, res.locals.user, {
				new: true,
			});
		}

		res.status(200).json({
			status: "success",
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			err,
		});
	}
};

exports.addInterest = async (req, res) => {
	try {
		const bookId = req.params.id;
		if (!res.locals.user.interestedBooks.includes(bookId)) {
			res.locals.user.interestedBooks.push(bookId);
			await User.findByIdAndUpdate(res.locals.user._id, res.locals.user, {
				new: true,
			});
		}
		res.status(200).json({
			status: "success",
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			err,
		});
	}
};

exports.removeInterest = async (req, res) => {
	try {
		const bookId = req.params.id;
		if (res.locals.user.interestedBooks.includes(bookId)) {
			res.locals.user.interestedBooks = res.locals.user.interestedBooks.filter(
				(book) => book !== bookId,
			);

			await User.findByIdAndUpdate(res.locals.user._id, res.locals.user, {
				new: true,
			});
		}

		res.status(200).json({
			status: "success",
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			err,
		});
	}
};

exports.cancelPass = async (req, res) => {
	try {
		const id = req.params.id;

		const user = await User.findById(id);
		user.passAvailable = "no";

		await User.findByIdAndUpdate(id, user);
		res.status(200).json({
			status: "success",
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			err,
		});
	}
};

exports.acceptPass = async (req, res) => {
	try {
		const id = req.params.id;

		const user = await User.findById(id);
		user.passAvailable = "yes";

		await User.findByIdAndUpdate(id, user);
		res.status(200).json({
			status: "success",
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			err,
		});
	}
};
