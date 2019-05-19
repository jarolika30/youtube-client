import Clip from './clip';

const key = 'AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y';

function sendRequest(search, pageToken) {
  const url = `https://www.googleapis.com/youtube/v3/search?key=${key}&type=video&part=snippet&maxResults=15&pageToken=${pageToken}&q=${search}`;
  const req = fetch(url)
    .then(response => response.json())
    .catch(new Error('Data has not been loaded.'));

  return req;
}

function processItems(items) {
  return Promise.all(items.map((elem) => {
    const url = `https://www.googleapis.com/youtube/v3/videos?key=${key}&id=${elem.id.videoId}&part=statistics,snippet`;

    return new Promise(resolve => fetch(url).then(response => response.json().then((res) => {
      const clip = new Clip(elem.snippet.title,
        elem.snippet.thumbnails.medium.url,
        elem.snippet.description,
        elem.snippet.channelTitle,
        elem.snippet.publishedAt,
        elem.id.videoId,
        res.items[0].statistics.viewCount);

      resolve(clip);
    })));
  }));
}

const requests = {
  sendRequest,
  processItems,
};

export default requests;
