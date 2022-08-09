import utils from './modules/utils.js';
import Books from './modules/books.js';
import { DateTime } from './modules/luxon.min.js';

const displayContainer = utils.qs('.container');

const populateBooks = (books) => {
  utils.qs('div', displayContainer)?.remove();
  const div = document.createElement('div');
  books.forEach((book) => {
    const wrapper = utils.createElement({});

    wrapper.appendChild(
      utils.createElement({
        tagName: 'p',
        textContent: `"${book.title}" by ${book.author}`,
        class: 'title',
      }),
    );
    wrapper.appendChild(
      utils.createElement({
        tagName: 'button',
        type: 'button',
        class: 'remove',
        textContent: 'Remove',
      }),
    );
    div.appendChild(wrapper);
  });
  displayContainer.appendChild(div);
};

const books = new Books();

if (books.books.length) populateBooks(books.books);

displayContainer.addEventListener('click', (e) => {
  const { target } = e;

  if (!target.classList.contains('remove')) return;

  const title = utils.qs('p.title', target.parentElement).textContent;

  books.remove(title.match(/^"(.+?)"/)[0].replaceAll('"', ''));
  populateBooks(books.books);
});

utils.qs('form').addEventListener('submit', (e) => {
  const title = utils.qs('.title', e.target);
  const author = utils.qs('.author', e.target);

  e.preventDefault();

  if (!title.value.trim().length || !author.value.trim().length) return;

  books.add({
    title: title.value,
    author: author.value,
  });
  populateBooks(books.books);
  e.target.reset();

  utils.qs('header li a').click();
});

utils.qs('header').addEventListener('click', (e) => {
  e.preventDefault();

  const { target } = e;

  if (target.tagName !== 'A') return;

  const index = Array.prototype.indexOf.call(
    target.parentNode.parentNode.children,
    target.parentNode,
  );
  utils.qsa('.pages section').forEach((e, i) => {
    if (i === index) {
      e.classList.remove('hidden');
      return;
    }

    e.classList.add('hidden');
  });
});

utils.qs('.time').textContent = DateTime.local();
