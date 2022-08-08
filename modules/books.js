export default class Books {
    books = localStorage.getItem('books')
      ? JSON.parse(localStorage.getItem('books'))
      : [];

   add=(book) => {
     this.books.push(book);
     this.storeData();
   }

    remove=(title) => {
      this.books.splice(this.findIndexByTitle(title), 1);
      this.storeData();
    }

    findIndexByTitle=(title) => this.books.findIndex((b) => b.title === title)

    storeData=() => localStorage.setItem('books', JSON.stringify(this.books));
}