

class Library{
    constructor(){
        this.library = [];
    }

    addBookToLibrary(title, author, pages, read){
        const book = new Book();
        book.title = title;
        book.author = author;
        book.pages = pages;
        book.read = read;
        this.library.push(book);
    }

    removeBookFromLibrary(ID){
        const index = this.library.findIndex(book => book.ID === ID);
        this.library.splice(index, 1);
        this.displayLibrary();
    }

    toggleReadStatus(ID){
        const book = this.library.find(book => book.ID === ID);
        book.read = !book.read;
        this.displayLibrary();
    }

    displayLibrary(){
        const libraryContainer = document.getElementById('libraryContainer');
        libraryContainer.innerHTML = "";
    
        for(let i = 0; i < this.library.length; i++){
           const bookElement = document.createElement('div');
            bookElement.classList.add('book');
            bookElement.innerHTML = `
                <h3>Book ${i + 1}</h3>
                <p>ID: ${this.library[i].ID}</p>
                <h1>${this.library[i].title}</h1>
                <p>Author: ${this.library[i].author}</p>
                <p>Pages: ${this.library[i].pages}</p>
                <p>Read: ${this.library[i].read ? "Yes" : "No"}</p>
            `;

            // Create Remove button
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.addEventListener('click', () => {
                this.removeBookFromLibrary(this.library[i].ID);
            });

            // Create Toggle Read Status button
            const toggleBtn = document.createElement('button');
            toggleBtn.textContent = 'Toggle Read Status';
            toggleBtn.addEventListener('click', () => {
                this.toggleReadStatus(this.library[i].ID);
            });

            bookElement.appendChild(removeBtn);
            bookElement.appendChild(toggleBtn);

    
            libraryContainer.appendChild(bookElement);
        }
    }
}


class Book{
    constructor(){
        this.ID = crypto.randomUUID();
        this.title = "";
        this.author = "";
        this.pages = 0;
        this.read = false;
    }
}

const libraryInstance = new Library();

const dialog = document.querySelector('dialog');
const newBookButton = document.getElementById('newBook');
const sumbitButton = dialog.querySelector('#submit');
const cancelButton = dialog.querySelector('#cancel');


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

    libraryInstance.addBookToLibrary(title, author, pages, read);
    libraryInstance.displayLibrary();
    dialog.close();

    document.getElementById('title').value = "";
    document.getElementById('author').value = "";
    document.getElementById('pages').value = "";
    document.getElementById('read').checked = false;
});

// Close dialog when cancel is clicked
cancelButton.addEventListener("click", function () {
    newBookDialog.close();

    document.getElementById('title').value = "";
    document.getElementById('author').value = "";
    document.getElementById('pages').value = "";
    document.getElementById('read').checked = false;
});


window.onload = libraryInstance.displayLibrary();