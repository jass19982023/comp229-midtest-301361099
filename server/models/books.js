/**
comp229-f2023-midterm-301361099
 * Student Name: Jaspreet kaur
 * Student Number: 301361099
 * Completed on: Web June 21, 2023 
 */

let mongoose = require('mongoose');

// create a model class
let Book = mongoose.Schema({
    title: String,
    //Description: String,
    price: Number,
    author: String,
    genre: String
},
{
  collection: "books229"
});

module.exports = mongoose.model('Book', Book);
