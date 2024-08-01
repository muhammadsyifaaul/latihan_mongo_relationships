const express = require('express')
const router = express.Router()
const Book = require('../models/book')





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



module.exports = router