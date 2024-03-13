const myLibrary = [];

display = document.querySelector(".display");
dialog = document.querySelector(".dialog");
addBookButton = document.querySelector(".addBook");
createBook = document.querySelector("#createBook");
deleteBtnArray = document.getElementsByClassName("delBtn");

function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
    this.setIndex = (value) => {
        this.index = value;
    };
}

Book.prototype.readStatus = function () {
    this.read = this.read == 0 ? "1" : "0";
};

addBookButton.addEventListener("click", () => {
    dialog.showModal();
});

function readBtnStatus(book, readButton) {
    if (book.read == "1") {
        readButton.textContent = 'Read✓'
    } else {
        readButton.textContent = 'Read✗'  
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    book.index = `${myLibrary.indexOf(book)}`;
}

function createBookElement(author, title, pages, book) {
    let bookElement = document.createElement("div");
    let titleElement = document.createElement("h3");
    let descriptionElement = document.createElement("p");
    let bookButtons = document.createElement("div");
    let readButton = document.createElement("button");
    let deleteButton = document.createElement("button");

    bookButtons.className = "bookButton";
    bookElement.className = "book";
    readButton.textContent = "Read";
    readButton.value = "0";
    readBtnStatus(book, readButton)
    deleteButton.value = book.index;
    deleteButton.textContent = "Delete";
    deleteButton.className = "delBtn";
    titleElement.textContent = title;
    descriptionElement.textContent = `Author: ${author}, Pages: ${pages}`;
    bookButtons.append(readButton, deleteButton);
    bookElement.append(titleElement, descriptionElement, bookButtons);
    display.appendChild(bookElement);

    readButton.addEventListener("click", (e) => {
        book.readStatus();
        readBtnStatus(book, readButton)
    });

    deleteButton.addEventListener("click", (e) => {
        index = e.target.value;
        myLibrary.splice(index, 1);
        bookElement = document.querySelectorAll(".book");
        bookElement[index].remove();

        for (let i = 0; i < myLibrary.length; i++) {
            myLibrary[i].index = i;
            deleteBtnArray[i].value = i;
        }
    });
}

createBook.addEventListener("click", (e) => {
    e.preventDefault();
    const author = document.querySelector("#author").value;
    const title = document.querySelector("#title").value;
    const pages = document.querySelector("#pages").value;
    const readStatus = document.getElementsByName("read");

    if (readStatus[0].checked) {
        read = readStatus[0].value;
    } else {
        read = readStatus[1].value;
    }

    let newBook = new Book(author, title, pages, read);
    addBookToLibrary(newBook);
    createBookElement(author, title, pages, newBook);
    console.log(myLibrary);

    dialog.close();
});
