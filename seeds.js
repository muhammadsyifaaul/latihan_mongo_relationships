const mongoose = require('mongoose')
const Publisher = require('./models/publisher')
const Book = require('./models/book')
const Author = require('./models/author')
mongoose.connect('mongodb://127.0.0.1/book_db')
.then(res => console.log('connected to mongodb'))
.catch(err => console.log(err))


const makeData = async () => {
    try {
      const publisher = new Publisher({
        name: 'Publisher 1',
        address: {
          street: 'Street 1',
          city: 'City 1'
        },
        contact: 123456789
      });
  
      const book = new Book({
        title: 'Book 1',
        publisher: publisher._id
      });
  
      const author = new Author({
        name: 'Author 1',
        address: {
          street: 'St Manonria',
          city: 'City 1'
        },
        contact: 123456749
      });
  
      // Simpan publisher, book, dan author
      await Promise.all([publisher.save(), book.save(), author.save()]);
  
      // Tambahkan ID book ke publisher dan author
      publisher.books.push(book._id);
      author.books.push(book._id);
  
      // Simpan perubahan pada publisher dan author
      await Promise.all([publisher.save(), author.save()]);
  
      console.log('Data saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  
  makeData();
  