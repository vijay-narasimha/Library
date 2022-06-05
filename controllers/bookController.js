const Book = require("./../models/bookModel");
const Stripe = require("stripe");
const User=require('../models/userModel')
const date=require('date-and-time')

exports.getAllBooks = async (req, res) => {
	try {
		const data = await Book.find();
		res.status(200).json({
			status: "success",
			total: data.length,
			data,
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			error: err,
		});
	}
};

exports.getBook = async (req, res) => {
	try {
		const book = await Book.findById(req.params.id);
		res.status(200).json({
			status: "success",
			data: book,
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			error: err,
		});
	}
};

exports.createBook = async (req, res) => {
	try {
		const book = await Book.create(req.body);
		res.status(201).json({
			status: "success",
			data: book,
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			error: err.message,
		});
	}
};
exports.deleteBook = async (req, res) => {
	try {
		const data = await Book.findByIdAndDelete(req.params.id);
		res.status(204).json({
			status: "success",
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			error: err,
		});
	}
};

exports.payment = async (req, res) => {
	try {
		let array = res.locals.user.cart;
		let mode = req.params.mode;
		array.forEach(async (book) => {
			let db = await Book.findById(book);

			db.NoofBooks = db.NoofBooks - 1;
			db.takenUser.push(res.locals.user._id);
			db.takenBy.push(mode);
			const newdate=new Date(Date.now()+60*24*5*60*1000)
			let now=date.format(newdate,'YYYY/MM/DD HH:mm:ss');
			db.endTime=now;
			await Book.findByIdAndUpdate(book, db);
		});

	
		let user=await User.findOne({email:res.locals.user.email})
		
	user.cart=[]
	
	user.issuedBooks.push(...array)
	await User.findByIdAndUpdate(user._id,user)

		res.status(204).json({
			status: "success",
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			error: err,
		});
	}
};
