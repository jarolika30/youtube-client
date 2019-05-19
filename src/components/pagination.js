function showNumber(event) {
  event.preventDefault();

  if (event.target.tagName === 'A') {
    const app = document.getElementById('app');

    app.insertAdjacentHTML('beforeend',
      `<div class="popup">${event.target.textContent}</div>`);
  }
}

function removeNumber() {
  if (document.querySelector('.popup')) {
    document.querySelector('.popup').remove();
  }
}

export default function initialPagination() {
  const ul = document.querySelector('.pagination');

  ul.insertAdjacentHTML('afterbegin',
    `<li class="pagination__item" style="display: none;"><a href="#">0</a></li>
    <li class="pagination__item pagination__item--active"><a href="#">1</a></li>
    <li class="pagination__item"><a href="#">2</a></li>`);

  ul.addEventListener('mousedown', showNumber, false);
  ul.addEventListener('touchstart', showNumber, false);

  ul.addEventListener('mouseup', removeNumber, false);
  ul.addEventListener('touchend', removeNumber, false);
}
