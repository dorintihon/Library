class Library {
  constructor() {
    this.library = [];
  }

  addBookToLibrary(title, author, pages, read) {
    const book = new Book();
    book.title = title;
    book.author = author;
    book.pages = pages;
    book.read = read;
    this.library.push(book);
  }

  removeBookFromLibrary(ID) {
    const index = this.library.findIndex((book) => book.ID === ID);
    this.library.splice(index, 1);
    this.displayLibrary();
  }

  toggleReadStatus(ID) {
    const book = this.library.find((book) => book.ID === ID);
    book.read = !book.read;
    this.displayLibrary();
  }

  displayLibrary() {
    const libraryContainer = document.getElementById("libraryContainer");
    libraryContainer.innerHTML = "";

    for (let i = 0; i < this.library.length; i++) {
      const bookElement = document.createElement("div");
      bookElement.classList.add("book");
      bookElement.innerHTML = `
                <h3>Book ${i + 1}</h3>
                <p>ID: ${this.library[i].ID}</p>
                <h1>${this.library[i].title}</h1>
                <p>Author: ${this.library[i].author}</p>
                <p>Pages: ${this.library[i].pages}</p>
                <p>Read: ${this.library[i].read ? "Yes" : "No"}</p>
            `;

      // Create Remove button
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.addEventListener("click", () => {
        this.removeBookFromLibrary(this.library[i].ID);
      });

      // Create Toggle Read Status button
      const toggleBtn = document.createElement("button");
      toggleBtn.textContent = "Toggle Read Status";
      toggleBtn.addEventListener("click", () => {
        this.toggleReadStatus(this.library[i].ID);
      });

      bookElement.appendChild(removeBtn);
      bookElement.appendChild(toggleBtn);

      libraryContainer.appendChild(bookElement);
    }
  }
}

class Book {
  constructor() {
    this.ID = crypto.randomUUID();
    this.title = "";
    this.author = "";
    this.pages = 0;
    this.read = false;
  }
}

const libraryInstance = new Library();

const dialog = document.querySelector("dialog");
const newBookButton = document.getElementById("newBook");
const sumbitButton = dialog.querySelector("#submit");
const cancelButton = dialog.querySelector("#cancel");

//Show dialog
newBookButton.addEventListener("click", () => {
  dialog.showModal();
});

//Close dialog
sumbitButton.addEventListener("click", () => {
  const form = document.getElementById("newBookForm");
  const title = document.getElementById("title");
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").checked;

  // Check if the form is valid
  if (!checkValidity()) {
    return;
  } else {
    libraryInstance.addBookToLibrary(title.value, author, pages, read);
    libraryInstance.displayLibrary();
    dialog.close();
  }

  form.reset();
});

// Close dialog when cancel is clicked
cancelButton.addEventListener("click", function () {
  newBookDialog.close();

  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("read").checked = false;
});

function checkValidity() {
  const title = document.getElementById("title");
  const author = document.getElementById("author");
  const pages = document.getElementById("pages");

  // Title validation
  if (title.value.trim() === "") {
    title.setCustomValidity("Please enter a title.");
    title.reportValidity();
    return false;
  } else {
    title.setCustomValidity("");
  }

  // Author validation
  const trimmedAuthor = author.value.trim();
  if (trimmedAuthor === "") {
    author.setCustomValidity("Please enter an author.");
    author.reportValidity();
    return false;
  } else if (/^\d+$/.test(trimmedAuthor)) {
    author.setCustomValidity("Please enter a string, not just a number.");
    author.reportValidity();
    return false;
  } else {
    author.setCustomValidity("");
  }

  // Pages validation
  if (pages.value.trim() === "") {
    pages.setCustomValidity("Please enter a number of pages.");
    pages.reportValidity();
    return false;
  } else if (isNaN(pages.value) || parseInt(pages.value) <= 0) {
    pages.setCustomValidity("Please enter a valid positive number.");
    pages.reportValidity();
    return false;
  } else {
    pages.setCustomValidity("");
  }

  return true;
}

window.onload = libraryInstance.displayLibrary();
