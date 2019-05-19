function unify(e) {
  if (e.changedTouches) {
    return e.changedTouches[0];
  }
  return e;
}

function updatePagination(item) {
  const elements = document.querySelector('.pagination').children;

  if (item === 0) {
    elements[0].style.display = 'none';
  } else {
    elements[0].style.display = 'block';
    elements[0].childNodes[0].textContent = item;
  }

  elements[1].childNodes[0].textContent = item + 1;
  elements[2].childNodes[0].textContent = item + 2;
}

export default function initialSwipe() {
  const container = document.querySelector('#container');
  let x0 = null;
  let locked = false;
  let item = 0;
  function lock(e) {
    if (e.target.tagName !== 'A') {
      x0 = unify(e).clientX;
      container.classList.toggle('smooth', !(locked = true));
    }
  }

  function drag(e) {
    if (e.target.tagName !== 'A') {
      e.preventDefault();

      if (locked) {
        container.style.setProperty('--tx', `${Math.round(unify(e).clientX - x0)}px`);
      }
    }
  }

  function move(e) {
    if (e.target.tagName !== 'A') {
      if (locked) {
        const dx = unify(e).clientX - x0;
        const s = Math.sign(dx);

        if (item > 0 || s < 0) {
          container.style.setProperty('--item', item -= s);
          updatePagination(item);
        }

        container.style.setProperty('--tx', '0px');
        container.classList.toggle('smooth', !(locked = false));
        x0 = null;
      }
    }
  }

  container.style.setProperty('--item', item);

  container.addEventListener('mousedown', lock, false);
  container.addEventListener('touchstart', lock, false);

  container.addEventListener('mousemove', drag, false);
  container.addEventListener('touchmove', drag, false);

  container.addEventListener('mouseup', move, false);
  container.addEventListener('touchend', move, false);

  document.querySelector('.pagination').addEventListener('click', (event) => {
    event.preventDefault();

    if (event.target.tagName === 'A') {
      container.style.setProperty('--item', event.target.textContent - 1);
      item = event.target.textContent - 1;

      updatePagination(item);

      container.style.setProperty('--tx', '0px');
      container.classList.toggle('smooth', !(locked = false));
      x0 = null;
    }
  }, false);
  document.querySelector('.pagination').addEventListener('touchend', (event) => {
    event.preventDefault();

    if (event.target.tagName === 'A') {
      container.style.setProperty('--item', event.target.textContent - 1);
      item = event.target.textContent - 1;

      updatePagination(item);

      container.style.setProperty('--tx', '0px');
      container.classList.toggle('smooth', !(locked = false));
      x0 = null;
    }
  }, false);
}
