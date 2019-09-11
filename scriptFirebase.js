let myLibrary = [{name: "A song of Ice and Fire", author: "George R.R. Martin",
                pages: "800", read: "yes"}, {name: "Braca Karamazovi", author: "F.M.Dostojevski",
                pages: "500", read: "no"}];

function Book(book) {
    [this.name, this.author, this.pages, this.read] = book;
}

const container = document.getElementById("container");

function render() {
    container.innerHTML = "";
    myLibrary = myLibrary.map(elem => {
        elem.index = myLibrary.indexOf(elem); //pri svakom renderiranju svakoj knjizi stavi/updateaj index
        return elem;
    })
    myLibrary.forEach(elem => {
        const div = document.createElement("div");
        div.classList.add("element");
        container.appendChild(div);
        for (let key in elem) {
            if (key == "index") continue;
            const span = document.createElement("span");
            span.innerText = elem[key];
            div.appendChild(span);
        }
        const index = myLibrary.indexOf(elem);
        div.innerHTML += `<button onclick="removeBook(${index})">Remove book</button>`;
        div.innerHTML += `<button onclick="toggleReadStatus(${index})">Toggle read status</button>`;
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

function removeBook(index) {
    myLibrary.splice(index, 1);
    render();
}

function toggleReadStatus(index) {
    if(myLibrary[index].read == "yes") {
        myLibrary[index].read = "no";
    }
    else myLibrary[index].read = "yes";
    render();
}

render();