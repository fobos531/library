let myLibrary = [{name: "A song of Ice and Fire", author: "George R.R. Martin",
                pages: "800", read: "yes"}, {name: "Braca Karamazovi", author: "F.M.Dostojevski",
                pages: "500", read: "no"}];

function Book(book) {
    [this.name, this.author, this.pages, this.read] = book;
}

const container = document.getElementById("container");

function render() {
    container.innerHTML = "";
    myLibrary.forEach(elem => {
        const div = document.createElement("div");
        div.innerText = "";
        for (let key in elem) {
            div.innerHTML += elem[key] + "<br>";
        }
        div.classList.add("element");
        container.appendChild(div);
    })
}

function addBookToLibrary() {
    let book = [];
    book.push(prompt("Enter the book\'s name:"));
    book.push(prompt("Enter the book\'s author:"));
    book.push(prompt("Enter the number of pages"));
    book.push(prompt("Have you read the book yet? Answer with either 'yes' or 'no'"));
    myLibrary.push(new Book(book));
    render();
}

render();