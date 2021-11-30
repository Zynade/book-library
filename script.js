let libraryArray;
const DEFAULT_LIBRARY_INFO = [
    {title:"Penpal", author:"Dathan Auerbach", pages:250, hasBeenRead:true},
    {title:"How to Do Your Mom", author:"nilzilla", pages:68, hasBeenRead:false},
    {title:"Introduction to English", author:"Narendra Modi", pages:420, hasBeenRead:true}
];

const titleField = document.querySelector('#title');
const authorField = document.querySelector('#author');
const pagesField = document.querySelector('#pages');
const readStatusField = document.querySelector("#read-status");
const tableBody = document.querySelector('#library-table-body');
const submitButton = document.querySelector('#submit-button');
const resetButton = document.querySelector('#reset-button');


submitButton.addEventListener('click', () => {
    addBookToLibrary();
    displayAllBooks();
})

resetButton.addEventListener('click', () => {
    titleField.value = "";
    authorField.value = "";
    pagesField.value = "";e
    // readStatusField.value = "none";
}
)

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasBeenRead = true;
    this.readInfo = () => this.hasBeenRead ? 'Read' : 'Not read';
}

function addBookToLibrary() {
    if (titleField.value.length == 0 || authorField.value.length == 0 || pagesField.value.length == 0) {
        alert("Please fill all details.");
    }
    else {
        const book = new Book(titleField.value, authorField.value, pagesField.value);
        libraryArray.push(book);
        updateLocalStorage();
    }
}

function checkLocalStorage() {
    if (!localStorage.getItem('libraryArray') || localStorage.getItem('libraryArray').length == 0) {
        libraryArray = DEFAULT_LIBRARY_INFO;
        updateLocalStorage();
    }
    else {
        libraryArray = JSON.parse(localStorage.getItem('libraryArray'));
    }
}

function updateLocalStorage() {
    localStorage.setItem("libraryArray", JSON.stringify(libraryArray));
    displayAllBooks();
}

function removeBook(bookIndex) {
    if (confirm(`Are you sure you want to remove ${libraryArray[bookIndex].title} by ${libraryArray[bookIndex].author}?`)) {
        libraryArray.splice(bookIndex, 1);
    }
    updateLocalStorage();
}

function getIndexOfBook(title) {
    if (libraryArray.length === 0 || !libraryArray.length) {
        return;
    }
    else {
        for (let book of libraryArray) {
            if (book.title === title) {
                return libraryArray.indexOf(book);
            }
        }
    }
}

function toggleReadStatus(bookIndex) {
    if (!libraryArray[bookIndex].hasBeenRead) {
        libraryArray[bookIndex].hasBeenRead = true;
    }
    else {
        libraryArray[bookIndex].hasBeenRead = false;
    }
    return libraryArray[bookIndex].hasBeenRead
}

function displayAllBooks() {
    checkLocalStorage();
    tableBody.innerHTML = "";
    libraryArray.forEach((book) => {
        const index = libraryArray.indexOf(book)
        const htmlBook = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.pages}</td>
            <td><button class="read-status-button" data-index="${index}">${book.hasBeenRead ? 'Read' : 'Not read'}</button></td>
            <td><button class="button delete-button" data-index="${index}">delete</button></td>
        `;
        const newTr = document.createElement('tr');
        newTr.innerHTML = htmlBook;
        tableBody.insertAdjacentElement('afterbegin', newTr);
    })
}

displayAllBooks();

const table = document.querySelector('table').addEventListener('click', e => {
    let index = e.target.dataset.index;
    let classList = Array.from(e.target.classList);
    if (classList.includes('delete-button')) {
        removeBook(index);
    }
    else if (classList.includes('read-status-button')) {
        let status = toggleReadStatus(index);
        
        if (status) e.target.classList.add('read-status-button-green');
        else e.target.classList.remove('read-status-button-green');
    }
    updateLocalStorage();
})