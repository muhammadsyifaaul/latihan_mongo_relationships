const express = require('express')
const router = express.Router()
const Book = require('../models/book')
const Author = require('../models/author')
const Publisher = require('../models/publisher')

router.post('/addBook', async (req,res) => {
    const {title, author, publisher} = req.body
    
    const authorBook = new Author({
        name: author
    })
    
    const publisherBook = new Publisher({
        name: publisher
    })
    const book = new Book({
        title,
        author: author._id,
        publisher: publisher._id
    })

    Promise.all([authorBook.save(),publisherBook.save(),book.save()])
    .then(res => console.log('data succesfully added'))
    .catch(err => console.log(err))
    
    res.redirect('/home')
    
})


module.exports = router