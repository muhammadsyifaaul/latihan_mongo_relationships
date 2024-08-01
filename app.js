const express = require('express')
const mongoose = require('mongoose')
const app = express()
const userRoutes = require('./routes/userRoutes')
const expressLayouts = require('express-ejs-layouts')


mongoose.connect('mongodb://127.0.0.1/book_db')
.then(res => console.log('connected to mongodb'))
.catch(err => console.log(err))

app.use(expressLayouts)
app.use('/',userRoutes)
app.use(express.urlencoded({extended: true}))

app.set('view engine','ejs')
app.set('layout', 'layouts/layout');
app.listen(3000, () => {
    console.log('server is running perfectly')
})