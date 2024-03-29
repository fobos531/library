let myLibrary = [{name: "A song of Ice and Fire", author: "George R.R. Martin",
                pages: "800", read: "yes"}, {name: "Braca Karamazovi", author: "F.M.Dostojevski",
                pages: "500", read: "no"}];


function storageAvailable(type) { //check if localStorage object is available
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

function populateStorage() {
    // populate local storage with default values
    localStorage.setItem("library", JSON.stringify(myLibrary));
}

function grabFromStorage () {
    myLibrary = JSON.parse(localStorage.getItem("library")); //get current local storage contens
}

if(!localStorage.getItem('library')) {
    populateStorage();
  } else {
    grabFromStorage();
  }

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
    localStorage.setItem("library", JSON.stringify(myLibrary)); //add item to storage
    render();
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    localStorage.setItem("library", JSON.stringify(myLibrary));
    render();
}

function toggleReadStatus(index) {
    if(myLibrary[index].read == "yes") {
        myLibrary[index].read = "no";
    }
    else myLibrary[index].read = "yes";
    localStorage.setItem("library", JSON.stringify(myLibrary));
    render();
}

render();