const express = require('express')
const router = express.Router()
const app = express()
const Book = require('../models/book')
const Author = require('../models/author')
const Publisher = require('../models/publisher')

const methodOverride = require('method-override')


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
        author: authorBook._id,
        publisher: publisherBook._id
    })

   await Promise.all([authorBook.save(),publisherBook.save(),book.save()])


    authorBook.books.push(book._id)
    publisherBook.books.push(book._id)

    await Promise.all([authorBook.save(),publisherBook.save()])
    .then(res => console.log('data successfully added'))
    .catch(err => console.log(err))

    
    res.redirect('/home')
    
})

router.put('/edit/:id?_method=PUT',async (req,res) => {
    try {
        const {id} = req.params
    // const {title, author, publisher} = req.body
    // const findAuthor = await Author.findOne({name: {$regex: author,$option:'i'}})
    // if(!findAuthor) {
    //     const newAuthor = new Author({
    //         name: author
    //     })
    //     await newAuthor.save()
    // }
    const book = await Book.findById(id)
    console.log(book)
    } catch (error) {
        console.log(error)
    }
})


module.exports = router