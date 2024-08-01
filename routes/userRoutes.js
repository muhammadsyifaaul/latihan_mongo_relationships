const express = require('express')
const app = express()
const router = express.Router()
const Book = require('../models/book')
const crudRouter = require('./crud')





router.get('/',(req,res) => {
    res.redirect('/home')
})

router.get('/home',  async (req,res) => {
    const getAllBook = await Book.find({})
    res.render('index',{
        title: 'Home',
        layout: 'layouts/main-layout',
        getAllBook
    })
})
router.get('/addBook', (req,res) => {
    res.render('addBook',{
        title: 'Add Book',
        layout: 'layouts/main-layout'
    })
})

router.use(crudRouter)




module.exports = router