export default function initialApp() {
  const body = document.querySelector('body');
  const app = document.createElement('div');

  app.id = 'app';
  app.className = 'app';
  app.insertAdjacentHTML('afterbegin',
    `<div class="header">
      <form class="form" id="search-form">
        <input class="search" type="text" placeholder="Search">
        <button class="submit" type="submit"><i class="search-icon">&#x26B2;</i></button>
      </form>
    </div>
    <div class="result-container" id="container">
    </div>

    <ul class="pagination">
    </ul>`);

  body.prepend(app);
}
