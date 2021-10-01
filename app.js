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
// static class methods are defined on the class itself - you can't call a static method on an Object, only on an Object Class
class UI {
    static displayBooks() {
     
         // set books to the Array
         const books = Store.getBooks();
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
    // we need to be able to delete books that have been added to our list
    // wwe need to be sure that what we click contains the class 'delete'
    // 'el' is short for element
    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            // the parent of the delete class is <td> and its parent is 'row'
            el.parentElement.parentElement.remove();
        }
    }
    // create a Bootstrap alert when not all 3 fields are filled out
    // showAlert() method needs a message and a className so it can be styled
    // we'll insert the alert right into the HTML (ie. the UI)
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        //get parent element (ie. .container div)
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        //  insert the div before the form
        container.insertBefore(div, form);
        // make the alert only appear for 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
    // we need a method to clear form fields after new book data submitted
    static clearFields() {
        document.querySelector('#title').value = ' ';
        document.querySelector('#author').value = ' ';
        document.querySelector('#isbn').value = ' ';
    }
}



// the Store Class takes care of storage - Local Storage (ie. within the browser)
// the stored data doesn't go away when you refresh the browser or close the page - it stays until it's cleared
// Local Storage store key:value pairs - you can't store Objects in Local Storage it has to be a String so Objects need to be stringified
// we use 'static' methods so they can be called directly without having to instantiate the Store class
class Store {
    static getBooks() {
        let books;
        // check if there's a book item in local storage
        if (localStorage.getItem('books') === null ) {
            books = [ ];
        } else {
            // book data is stored as a string so we use JSON.parse to get an Array of Objects
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook() {
        const books = Store.getBooks();
        books.push(book);
        // reset book to Local Storage
        // right now 'books' is an Array of Objects not a String - so use JSON.stringify()
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook() {
        // we'll remove a book by its ISBN because it is unique
        const books = Store.getBooks();
        // loop through the Array of books with forEach()
        books.forEach((book, index) => {
            // check if book currently being looped through has an ISBN that matches
            // use splice() method to remove the book - 1 = number of books removed
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });
        // now we need to reset Local Storage with that book removed
        localStorage.setItem('books', JSON.stringify(books));
    }
}




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

    // we need to validate that all 3 fields are filled in before a new book is added
    if (title === ' ' || author === ' ' || isbn === ' ') {
        UI.showAlert('Please fill in all fields', 'danger');
    } else {
     // once we get the values we want to instantiate a book from the book class
    const book = new Book(title, author, isbn);
    // now we need to add the new book to our list in the UI using addBookToList()
    UI.addBookToList(book);

// add book to store
Store.addBook(book);

// show a 'success' message after a book is properly added to the list
// showAlert() takes in a message and a className
UI.showAlert('Book Added', 'success');

 // the new book has not been persisted to Local Storage yet
 // after we submit a new book the form fields remain populated - we need to clear them
   UI.clearFields();
    }
});

// we also need an Event to remove a book
// these Events are in the UI and in Local Storage
document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target)

  // remove book from store by getting its ISBN
   Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // the 'target' event property returns the element that triggered the event
    // also show a message that a book was deleted
    UI.showAlert('Book removed', 'success');
});