const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const { v4: uuidv4 } = require('uuid');

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Array to store books
let books = [];

// Serve static index.html file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// GET route to fetch all books
app.get('/books', (req, res) => {
    res.json(books);
});

// POST route to add a new book
app.post('/books', (req, res) => {
    const { title, author, publishedDate } = req.body;
    const book = {
        id: uuidv4(),
        title,
        author,
        publishedDate
    };
    books.push(book);
    res.json(book);
});

// DELETE route to remove a book
app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    const index = books.findIndex(book => book.id === id);
    if (index !== -1) {
        books.splice(index, 1);
        res.json({ message: 'Book deleted successfully' });
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

const port = 3000;
app.listen(port,() => {
    console.log(`Server started`);
});
