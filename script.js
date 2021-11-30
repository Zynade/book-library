let myLibrary = [];

const tableBody = document.querySelector('#library-table-body');

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasBeenRead = false;
    this.readInfo = () => this.hasBeenRead ? 'Read' : 'Not read';
    // this.Info = () => `${title} by ${author}, ${pages} pages, ${this.hasBeenRead ? "Read" : "Not read"}`;
}

const myBook1 = new Book("Penpal", "Dathan Auerbach", 250);
const myBook2 = new Book("How to Do Your Mom", "nilzilla", 68);
const myBook3 = new Book("Introduction to English", "Narendra Modi", 420);
addBookToLibrary(myBook1);
addBookToLibrary(myBook2);
addBookToLibrary(myBook3);

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayAllBooks() {
    myLibrary.forEach((book) => {
        const htmlBook = `
        <tr>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td>${book.readInfo()}</td>
            <td><button class="delete-button">delete</button></td>
        </tr>
        `;
        // console.log(htmlBook);
        tableBody.innerHTML += htmlBook;
    })
}

displayAllBooks();