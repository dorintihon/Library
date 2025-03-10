

const library = [];

function Book(){
    this.ID = crypto.randomUUID();
    this.title = "";
    this.author = "";
    this.pages = 0;
    this.read = false;
}

function addBookToLibrary(title, author, pages, read){
    const book = new Book();
    book.title = title;
    book.author = author;
    book.pages = pages;
    book.read = read;
    library.push(book);
}

function displayLibrary(){
    const libraryContainer = document.getElementById('libraryContainer');
    libraryContainer.innerHTML = "";

    for(let i = 0; i < library.length; i++){
       const bookElement = document.createElement('div');
        bookElement.classList.add('book');
        bookElement.innerHTML = `
            <h3>Book ${i + 1}</h3>
            <p>ID: ${library[i].ID}</p>
            <h1>${library[i].title}</h1>
            <p>Author: ${library[i].author}</p>
            <p>Pages: ${library[i].pages}</p>
            <p>Read: ${library[i].read ? "Yes" : "No"}</p>
        `;

        libraryContainer.appendChild(bookElement);
    }
}

document.getElementById("newBook").onclick = function(){
    const title = prompt("Enter the title of the book");
    const author = prompt("Enter the author of the book");
    const pages = parseInt(prompt("Enter the number of pages of the book"));
    const read = confirm("Have you read this book?");

    addBookToLibrary(title, author, pages, read);
    displayLibrary();
};

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, true);
addBookToLibrary("The Fellowship of the Ring", "J.R.R. Tolkien", 398, false);
addBookToLibrary("The Two Towers", "J.R.R. Tolkien", 327, false);

window.onload = displayLibrary;