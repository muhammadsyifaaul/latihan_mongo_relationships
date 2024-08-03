const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const crudRouter = require('./crud');

router.get('/', (req, res) => {
    res.redirect('/home');
});

router.get('/home', async (req, res) => {
    const getAllBook = await Book.find({});
    res.render('index', {
        title: 'Home',
        layout: 'layouts/main-layout',
        getAllBook
    });
});

router.get('/addBook', (req, res) => {
    res.render('addBook', {
        title: 'Add Book',
        layout: 'layouts/main-layout'
    });
});

router.get('/details/:id', async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id)
        .populate('author', 'name')
        .populate('publisher', 'name');
    res.render('show', {
        title: 'Details',
        layout: 'layouts/main-layout',
        book
    });
});

router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const book = await Book.findById(id)
        .populate('author', 'name')
        .populate('publisher', 'name');
    const bookData = {
        _id: book._id,
        title: book.title,
        author: book.author.name,
        publisher: book.publisher.name,
    };
    res.render('edit', {
        title: 'Edit',
        layout: 'layouts/main-layout',
        book: bookData
    });
});

// router.put('/edit/:id', (req, res) => {
//     res.send('hello from userRoute.js');
// });

router.use(crudRouter);

module.exports = router;
