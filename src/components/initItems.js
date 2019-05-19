import options from './config';

export default function initialItems() {
  while (options.queueToDisplay.length >= 4) {
    const container = document.getElementById('container');
    const itemList = document.createElement('div');

    itemList.id = 'itemList';
    itemList.className = 'search-result';

    for (let i = 0; i < 4; i += 1) {
      const item = options.queueToDisplay.shift();
      itemList.appendChild(item.createHtml());
    }

    options.pages += 1;
    container.appendChild(itemList);
  }
}
