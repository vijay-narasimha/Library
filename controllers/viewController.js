const req = require('express/lib/request')
const res = require('express/lib/response')
const Book=require('../models/bookModel')


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

exports.getBook=async(req,res)=>{
    const book=await Book.findOne({slug:req.params.slug})
    res.status(200).render('book',{book})
}
exports.home=async(req,res)=>{

    res.status(200).render('home')
}

exports.me=async (req,res)=>{
    res.status(200).render('mydetails')
}
exports.login=async(req,res)=>{
    res.status(200).render('login')
}
exports.signup=async(req,res)=>{
    res.status(200).render('signup')
}
exports.getAllBooks=async(req,res)=>{
    const books=await Book.find();
    res.status(200).render('books',{books})
}