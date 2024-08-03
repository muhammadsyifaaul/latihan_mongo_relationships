const express = require('express')
const router = express.Router()
const app = express()
const Book = require('../models/book')
const Author = require('../models/author')
const Publisher = require('../models/publisher')

const methodOverride = require('method-override');

router.use(methodOverride('_method'));

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

router.put('/edit/:id?',async (req,res) => {
    const {id} = req.params
    const {title, author, publisher} = req.body
    let findAuthor = await Author.findOne({ name: { $regex: author, $options: 'i' } });
    let findPublisher = await Publisher.findOne({ name: { $regex: publisher, $options: 'i' } });
    if(!findAuthor) {
        findAuthor = new Author({
            name: author,
            books: []
        })
    }
    if(!findPublisher) {
        findPublisher = new Publisher({
            name: publisher,
            books: []
        })
    }
    const updatedBook = await Book.findByIdAndUpdate(id,{
        title,
        author: findAuthor._id,
        publisher: findPublisher._id
    })
    if(!findAuthor.books.includes(updatedBook._id)) {
        findAuthor.books.push(updatedBook._id)
    }
    if(!findPublisher.books.includes(updatedBook._id)) {
        findPublisher.books.push(updatedBook._id)
    }
    await findAuthor.save()
    await findPublisher.save()
    res.redirect('/home')
})

module.exports = router