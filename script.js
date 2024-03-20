class Book {
    constructor(author, title, pages, read) {
        this.author = author;
        this.title = title;
        this.pages = pages;
        this.read = read;
    }

    setIndex(value) {
        this.index = value;
    }

    readStatus() {
        this.read = this.read == 0 ? "1" : "0";
    }
}

class Library {
    constructor() {
        this.bookCase = [];
    }

    addBookToLibrary(obj) {
        this.bookCase.push(obj);
        obj.index = `${this.bookCase.indexOf(obj)}`;
    }
}

class screenUpdate {
    constructor(document) {
        this.display = document.querySelector(".display");
        this.dialog = document.querySelector(".dialog");
        this.addBookButton = document.querySelector(".addBook");
        this.createBook = document.querySelector("#createBook");
        this.deleteBtnArray = document.getElementsByClassName("delBtn");

        this.addBookButton.addEventListener("click", () => {
            this.dialog.showModal();
        });

        this.createBook.addEventListener("click", (e) => {
            e.preventDefault();
            const author = document.querySelector("#author").value;
            const title = document.querySelector("#title").value;
            const pages = document.querySelector("#pages").value;
            const readStatus = document.getElementsByName("read");
            let read;
            if (readStatus[0].checked) {
                read = readStatus[0].value;
            } else {
                read = readStatus[1].value;
            }

            let newBook = new Book(author, title, pages, read);
            myLibrary.addBookToLibrary(newBook);
            this.createBookElement(author, title, pages, newBook);
            this.dialog.close();
        });
    }

    createBookElement(author, title, pages, obj) {
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
        this.readBtnStatus(obj, readButton);
        deleteButton.value = obj.index;
        deleteButton.textContent = "Delete";
        deleteButton.className = "delBtn";
        titleElement.textContent = title;
        descriptionElement.textContent = `Author: ${author}, Pages: ${pages}`;
        bookButtons.append(readButton, deleteButton);
        bookElement.append(titleElement, descriptionElement, bookButtons);
        this.display.append(bookElement);

        readButton.addEventListener("click", () => {
            obj.readStatus();
            this.readBtnStatus(obj, readButton);
        });

        deleteButton.addEventListener("click", (e) => {
            let index = e.target.value;
            myLibrary.bookCase.splice(index, 1);
            bookElement = document.querySelectorAll(".book");
            bookElement[index].remove();

            for (let i = 0; i < myLibrary.bookCase.length; i++) {
                myLibrary.bookCase[i].index = i;
                this.deleteBtnArray[i].value = i;
            }
        });
    }

    readBtnStatus(obj, readButton) {
        if (obj.read == "1") {
            readButton.textContent = "Read✓";
        } else {
            readButton.textContent = "Read✗";
        }
    }
}

const myScreen = new screenUpdate(document);
const myLibrary = new Library();
