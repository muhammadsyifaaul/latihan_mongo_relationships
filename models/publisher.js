const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/book_db')
.then(res => console.log('connected to mongodb'))
.catch(err => console.log(err))

const publisherSchema = new mongoose.Schema({
    name: String,
    address: {
        street: String,
        city: String
    },
    contact: Number
})