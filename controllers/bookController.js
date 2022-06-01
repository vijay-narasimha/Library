const Book = require("./../models/bookModel");

exports.getAllBooks = async (req, res) => {
	try {
		const data = await Book.find();
		res.status(200).json({
			status: "success",
            total:data.length,
			data,
		});
	} catch (err) {
		res.status(400).json({
			status: "fail",
			error: err,
		});
	}
};

exports.getBook=async(req,res)=>{
    try{
const book =await Book.findById(req.params.id)
res.status(200).json({
    status:'success',
    data:book
})

    } catch (err) {
		res.status(400).json({
			status: "fail",
			error: err,
		});
	}
}

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
