import initialApp from './components/app';
import options from './components/config';
import requests from './components/sendReq';
import initialItems from './components/initItems';
import initialPagination from './components/pagination';
import reloadContent from './components/reload';
import initialSwipe from './components/swipe';

initialApp();
initialItems();

function processSearch(event) {
  event.preventDefault();
  document.querySelector('#search-form').removeEventListener('submit', processSearch, false);
  document.getElementById('container').remove();
  document.querySelector('.pagination').remove();

  const header = document.querySelector('.header');
  header.insertAdjacentHTML('afterend', '<div class="result-container" id="container"></div>');

  const app = document.getElementById('app');
  app.insertAdjacentHTML('beforeend', '<ul class="pagination"></ul>');

  options.pageToken = 'CAoQAA';
  options.queueToDisplay = [];
  options.pages = 0;
  options.text = encodeURI(document.querySelector('#search-form .search').value.trim());

  requests.sendRequest(options.text, options.pageToken).then((result) => {
    options.pageToken = result.nextPageToken;
    requests.processItems(result.items).then((clips) => {
      options.queueToDisplay.push(...clips);
      initialItems();
      initialPagination();
      initialSwipe();
      document.querySelector('#container').addEventListener('mouseup', reloadContent, false);
      document.querySelector('#container').addEventListener('touchend', reloadContent, false);
      document.querySelector('.pagination').addEventListener('click', reloadContent, false);
      document.querySelector('.pagination').addEventListener('touchend', reloadContent, false);
      document.querySelector('#search-form').addEventListener('submit', processSearch, false);
    })
      .then(() => document.dispatchEvent(new CustomEvent('process-items')));
  });
}

document.querySelector('#search-form').addEventListener('submit', processSearch, false);
