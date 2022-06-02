const Book = require("./../models/bookModel");
const Stripe = require("stripe");
const stripe=Stripe('sk_test_51KhVV5SFyNOjWcUPSEcI7sCuQh9YN2jeowqAft0gwvzROOcmDHyM8GSyQU8f4pLsbZ6tezenOsKcJfgAHvtVJd3f00PCbXHFsH')

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

exports.checkout = async (req, res) => {
	
	const book = await Book.findById(req.params.id);
	
	const session = await stripe.checkout.sessions.create({
		mode:'payment',
		payment_method_types:['card'],
		
		line_items: [{
				name: book.name,
				images: book.image,
				currency: "INR",
				quantity: 1,
			}],
			success_url: "http://localhost:8080",
		cancel_url: "http://localhost:8080/login",
		
	});

	res.status(200).json({
		status: "success",
		session
	});
};
