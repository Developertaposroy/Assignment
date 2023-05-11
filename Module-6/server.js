const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


let books = [];

app.get('/books', (req, res) => {
    res.json(books);
});


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


app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    const bookIndex = books.findIndex(book => book.id === id);
    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        res.json({ message: 'Book deleted successfully' });
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});


const port = 3000;
app.listen(port, () => {
    console.log(`Server Run Success`);
});
