'use strict'
const mongoose = require('mongoose');

const bookSchema = require('./bookSchema')
const userSchema = require('./userSchema')


const userModel = mongoose.model('user',userSchema)

const bookModel = mongoose.model('books',bookSchema)


module.exports = userModel, bookModel;

