import requests from './sendReq';
import options from './config';
import initialItems from './initItems';

export default function reloadContent() {
  const element = document.getElementById('container');
  const style = window.getComputedStyle(element);
  const currentPage = +style.getPropertyValue('--item') + 1;

  if (options.pages - currentPage === 1) {
    requests.sendRequest(options.text, options.pageToken).then((result) => {
      options.pageToken = result.nextPageToken;

      return requests.processItems(result.items).then((clips) => {
        options.queueToDisplay.push(...clips);
        initialItems();
      }).then(() => document.dispatchEvent(new CustomEvent('process-items')));
    });
  }
}
