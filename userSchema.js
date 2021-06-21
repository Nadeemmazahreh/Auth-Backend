'use strict'

const mongoose = require('mongoose');
const bookSchema = require('./bookSchema')

const userSchema = new mongoose.Schema({
    email: String,
    books: [bookSchema]
});

module.exports = userSchema;