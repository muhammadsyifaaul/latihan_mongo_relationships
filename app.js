const express = require('express')
const mongoose = require('mongoose')
const app = express()
const userRoutes = require('./routes/userRoutes')

mongoose.connect('mongodb://127.0.0.1/book_db')
.then(res => console.log('connected to mongodb'))
.catch(err => console.log(err))

app.use('/',userRoutes)

app.listen(3000, () => {
    console.log('server is running perfectly')
})