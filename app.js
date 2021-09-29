// the Book Class represents a book
// everytime we create a book it will instantiate a Book Object
// 'constructor' is a method that runs when we instantiate a book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// the UI Class handles UI tasks
// we make all of the Methods in the UI Class static
// we start off with a hard coded Array of books stored in a Variable called StoredBooks
class UI {
    static displayBooks() {
         const StoredBooks = [
             {
             title: 'Tycoons War',
             author: 'Stephen Dando-Collins',
             isbn: '978-0-306-81856-1'
             },
             {
                 title: 'Oaxaca',
                 author: 'Cody Copeland',
                 isbn: '978-1-64049-089-5'
             }
         ];
         // set books to the Array
         const books = StoredBooks;
         // loop through the books in the Array - right now they're hard coded but will later be in Local Storage
         // then we want to add the Method addBookToList() in the UI Class
         books.forEach(( book ) => UI.addBookToList(book));
    }
    // create the addBookToList() Method
    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        // insert a table row element into the DOM
        const row = document.createElement('tr');
        // add the columns into the table row
        row.innerHTML = `
           <td>${book.title}</td>
           <td>${book.author}</td>
           <td>${book.isbn}</td>
           <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        // now we need to append the row to the list
        list.appendChild(row);
    }
}

// the Store Class takes care of storage - Local Storage (ie. within the browser)
// the stored data doesn't go away when you refresh the browser or close the page - it stays until it's cleared

// we need an Event to display books
// so call displayBooks()
document.addEventListener('DOMContentLoaded', UI.displayBooks());

// we need an Event to add a book
// we need to handle collecting the data from the form and handle instantiating a new book
// and call the addBookToList() method
// we grab the form which has an id of #book-form
document.querySelector('#book-form').addEventListener('submit', (e) => {
    // prevent default submit behaviour
    e.preventDefault();
    // get the form values - in input we don't want the actual element but the value placed in it
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;
    // once we get the values we want to instantiate a book from the book class
    const book = new Book(title, author, isbn);
    console.log(book);
})
// we also need an Event to remove a book
// these Events are in the UI and in Local Storage