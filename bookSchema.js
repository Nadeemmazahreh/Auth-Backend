'use strict'

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
});

module.exports = bookSchema;