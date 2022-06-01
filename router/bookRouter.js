const express=require('express')
const bookController=require('./../controllers/bookController')

const Router=express.Router()

Router.route('/').get(bookController.getAllBooks).post(bookController.createBook);

Router.route('/:id').get(bookController.getBook).delete(bookController.deleteBook)

module.exports=Router