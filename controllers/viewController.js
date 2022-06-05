
const Book = require("../models/bookModel");
const date = require("date-and-time");
const User = require("../models/userModel");
// exports.getAllBooks=async(req,res)=>{
// const allBooks=await Book.find()
//     console.log(allBooks)
//     res.status(200).render('books')
// }
// exports.getBooks=async(req,res)=>{
//     const books=await Book.find({ $or :[ {genre:req.params.id} ,{name:req.params.id}]})
//     res.status(200).render('test',{books})
// }

// exports.getBook=async(req,res)=>{
//     const book=await Book.findOne({slug:req.params.slug})

//     res.status(200).render('test1',{book})
// }

exports.getBook = async (req, res) => {
	const book = await Book.findOne({ slug: req.params.slug });
	res.status(200).render("book", { book });
};
exports.home = async (req, res) => {
	res.status(200).render("home");
};

exports.me = async (req, res) => {
	res.status(200).render("mydetails");
};
exports.login = async (req, res) => {
	res.status(200).render("login");
};
exports.signup = async (req, res) => {
	res.status(200).render("signup");
};
exports.getAllBooks = async (req, res) => {
	const books = await Book.find();
	res.status(200).render("books", { books });
};
exports.savedBooks = async (req, res) => {
// 	const array = res.locals.user.returnedBooks || [];
// 	const books = await Book.find();
	
// 	let saved = [];
//     let times=[]
// let end;
	// if (array.length > 0) {
	// 	books.forEach((book) => {
	// 		if (array.includes(book._id)) {
	// 			let start = date.format(new Date(), "YYYY/MM/DD HH:mm:ss");
	// 			end = date.format(book.endTime, "YYYY/MM/DD HH:mm:ss");

	// 			if (end < start) {

    //                 const time=book.endTime.getTime()
    //                 var newdate=new Date(time)
    //                 newdate=newdate.toDateString('DD/MM/YYYY')
    //                times.push(newdate)
	// 				saved.push(book);
	// 			} 
	// 		}
	// 	});

	// }

let array=res.locals.user.returnedBooks || [];

const books=await Book.find()
let saved=[]
books.forEach(book=>{
	if(array.includes(book._id)){
		saved.push(book)
	}
})

let time=res.locals.user.endTime || []
let times=[]
time.forEach(t=>{
	const timet=t.getTime();
	var newdate=new Date(timet);
	newdate=newdate.toDateString('DD/MM/YYYY');
	times.push(newdate)
})

	res.status(200).render("saved", { books: saved ,times});
};

exports.cart = async (req, res) => {
	const array = res.locals.user.cart || [];
	const books = await Book.find();
	let saved = [];
	let cost = 0;
	if (array.length > 0) {
		books.forEach((book) => {
			if (array.includes(book._id)) {
				saved.push(book);
				cost += book.price;
			}
		});
	}
	cost = Math.floor(cost / 2);

	res.status(200).render("cart", { books: saved, cost });
};
exports.issuedBooks = async (req, res) => {
	const array = res.locals.user.issuedBooks || [];
	const books = await Book.find();
	
	let saved = [];
    let times=[]
let end;
	if (array.length > 0) {
		books.forEach((book) => {
			if (array.includes(book._id)) {
				
				let start = date.format(new Date(), "YYYY/MM/DD HH:mm:ss");
				end = date.format(book.endTime, "YYYY/MM/DD HH:mm:ss");

				if (end > start) {

                    const time=book.endTime.getTime()
                    var newdate=new Date(time)
                    newdate=newdate.toDateString('DD/MM/YYYY')
                   times.push(newdate)
					saved.push(book);
				} 
			}
		});

	}


	res.status(200).render("issuedBooks", { books: saved ,times});
};


exports.interestedBooks= async (req, res) => {
	const array = res.locals.user.interestedBooks || [];
	const books = await Book.find();
	let saved = [];
	
	if (array.length > 0) {
		books.forEach((book) => {
			if (array.includes(book._id)) {
				saved.push(book);
			
			}
		});
	}
	

	res.status(200).render("interest", { books: saved });
};

exports.messages=async(req,res)=>{
	const books=await Book.find()
	let messages=[]
	let array=res.locals.user.messages ||[]
	books.forEach(book=>{
if(array.includes(book._id)){
	messages.push(book)
}
	})
	res.status(200).render('messages',{books:messages})
}