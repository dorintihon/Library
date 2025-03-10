

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

const dialog = document.querySelector('dialog');
const newBookButton = document.getElementById('newBook');
const sumbitButton = dialog.querySelector('#submit');


//Show dialog
newBookButton.addEventListener('click', () => {
    dialog.showModal();
});

//Close dialog
sumbitButton.addEventListener('click', () => {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    if(title === "" || author === "" || pages === ""){
        alert('Please fill all required fields');
        return;
    }

    addBookToLibrary(title, author, pages, read);
    displayLibrary();
    dialog.close();
});

// Close dialog when cancel is clicked
cancelButton.addEventListener("click", function () {
    newBookDialog.close();
});


window.onload = displayLibrary();