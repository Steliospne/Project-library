const myLibrary = [];

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

display = document.querySelector(".display");
dialog = document.querySelector(".dialog");
addBookButton = document.querySelector(".addBook");
createBook = document.querySelector("#createBook");

addBookButton.addEventListener("click", () => {
    dialog.showModal();
});

// function removeBookFromLibrary(index) {
//     myLibrary.splice(index, 1);
// }

function addBookToLibrary(book) {
    myLibrary.push(book);
    book.index = `${myLibrary.indexOf(book)}`;
}

function bookElement() {
    newBook
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
    display.appendChild(document.createElement('div'))
    console.log(myLibrary);

    dialog.close();
});
