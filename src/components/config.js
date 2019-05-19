const options = {
  pages: 0,
  pageToken: 'CAoQAA',
  text: '',
  queueToDisplay: [],

  get itemsPerScreen() {
    if (document.body.clientWidth > 768) {
      return 4;
    }
    if (document.body.clientWidth < 769 && document.body.clientWidth > 500) {
      return 2;
    }
    return 1;
  },
};

export default options;
