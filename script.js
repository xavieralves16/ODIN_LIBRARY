const myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  displayBooks();
}

function displayBooks() {
  const container = document.getElementById("libraryDisplay");
  container.innerHTML = ""; 

  myLibrary.forEach(book => {
    const card = document.createElement("div");
    card.classList.add("bookCard");
    card.dataset.id = book.id;

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p><strong>Author:</strong> ${book.author}</p>
      <p><strong>Pages:</strong> ${book.pages}</p>
      <p><strong>Read:</strong> ${book.read ? "Yes" : "No"}</p>

      <button class="removeBtn">Remove</button>
      <button class="toggleReadBtn">Toggle Read</button>
    `;

    container.appendChild(card);
  });

  setCardEventListeners();
}

function setCardEventListeners() {
  document.querySelectorAll(".removeBtn").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = e.target.parentElement.dataset.id;
      removeBook(id);
    });
  });

  document.querySelectorAll(".toggleReadBtn").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = e.target.parentElement.dataset.id;
      toggleBookRead(id);
    });
  });
}

function removeBook(id) {
  const index = myLibrary.findIndex(book => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    displayBooks();
  }
}

function toggleBookRead(id) {
  const book = myLibrary.find(book => book.id === id);
  if (book) {
    book.toggleRead();
    displayBooks();
  }
}


const dialog = document.getElementById("bookDialog");
const newBookBtn = document.getElementById("newBookBtn");
const closeDialog = document.getElementById("closeDialog");
const bookForm = document.getElementById("bookForm");

newBookBtn.addEventListener("click", () => dialog.showModal());
closeDialog.addEventListener("click", () => dialog.close());

bookForm.addEventListener("submit", e => {
  e.preventDefault(); 

  const title = bookForm.title.value;
  const author = bookForm.author.value;
  const pages = bookForm.pages.value;
  const read = bookForm.read.checked;

  addBookToLibrary(title, author, pages, read);

  bookForm.reset();
  dialog.close();
});
