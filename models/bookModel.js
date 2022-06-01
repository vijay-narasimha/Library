const mongoose = require("mongoose");
const slugify=require('slugify')
const BookSchema = new mongoose.Schema({
	name: String,
	genre: String,
	price: Number,
	author: String,
	description: String,
    image:{
        type:String,
        default:'default.jpg'
    },
	slug:String,
});

BookSchema.pre('save',function(next){
	this.slug=slugify(this.name,{lower:true});
	next();
})

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
