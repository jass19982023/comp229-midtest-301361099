/**
comp229-f2023-midterm-301361099
 * Student Name: Jaspreet kaur
 * Student Number: 301361099
 */

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     * 
     * render book details page
     * pass value of title property
     * pass blank value of books property
     *****************/
    res.render('books/details', {title: 'Add Book', books: {}});

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     * 
     * instantiate object = newBook
     *****************/
    let newBook = new book({
      title: req.body.title,
      price: req.body.price,
      author: req.body.author,
      genre: req.body.genre
    });
    
    book.create(newBook, (err, book) => {
      if (err) 
      {
        console.log(err);
      } else {
        res.redirect('/books');
      }
    });
});

// GET the Book Details page in order to edit an existing Book
router.get('/edit/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     * c
     * id = id property of requested object [in this case book]
     * find book by id
     * if no book, error msg
     * else render books details page [/books]
     * title property value 
     * books property = book value based on book id property
     *****************/
    let id = req.params.id;
		book.findById(id, (err, book) => {
			if(err) 
			{
				console.log(err);
				res.end(err);
			}
			else
			{
				// show the edit view
				res.render('books/details', {title: 'Edit Book', books: book});
			}
		});
    
});

// POST - process the information passed from the details form and update the document
router.post('/edit/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
    //  *****************/
    let id = req.params.id;
    let updatedBook= book ({
      "id": id,
      title: req.body.title,
      price: req.body.price,
      author: req.body.author,
      genre: req.body.genre
    });

    let query = {_id: id};
  book.update(query, (err, updatedBook) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/books');
    }
  });

    // book.updateOne( updatedBook, (err) => {
    //   if(err) 
    //   {
    //     console.log(err);
    //     //res.end(err);
    //   }
    //   else
    //   {
    //     // refresh booklist
    //     res.redirect('/books');
    //   }
		// });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id;
		book.remove({_id: id}, (err) => {
			if(err) 
			{
				console.log(err);
				res.end(err);
			}
			else
			{
				// refresh booklist
				res.redirect('/books');
			}
		});
});


module.exports = router;
