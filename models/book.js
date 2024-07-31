const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/book_db')
.then(res => console.log('connected to mongodb'))
.catch(err => console.log(err))


const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    publisher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Publisher'
    }
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book