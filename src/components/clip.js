export default class Clip {
  constructor(title, img, description, author, date, id, view) {
    this.title = title;
    this.img = img;
    this.description = description;
    this.author = author;
    this.baseDate = date;
    this.id = id;
    this.view = view;
  }

  get date() {
    const date = new Date(this.baseDate);
    return `${date.getMonth()}.${date.getDay()}.${date.getFullYear()}`;
  }

  createHtml() {
    const template = document.querySelector('[id="itemTmp"]');
    const clipTemp = document.importNode(template.content, true);
    clipTemp.querySelector('.item__img').src = `${this.img}`;
    clipTemp.querySelector('.item__img').alt = `${this.title}`;
    clipTemp.querySelector('.item__title a').href = `https://www.youtube.com/watch?v=${this.id}`;
    let text = `${this.title}`;
    if (text.length > 30) {
      let res;
      const temp = text.substring(0, 30);
      const index = temp.lastIndexOf(' ');
      if (index !== 0) {
        res = temp.substring(0, index);
      }
      if (res !== '') text = res;
    }
    clipTemp.querySelector('.item__title a').textContent = text;
    clipTemp.querySelector('.item__description p').textContent = `${this.description}`;
    clipTemp.querySelector('.item__author').innerHTML = `<img src="./src/img/user.svg" style="width: 15px; height: 15px; margin-right: 4px; margin-top: 4px;"><h3 style="display: inline-block;">${this.author}</h3`;
    clipTemp.querySelector('.item__date').innerHTML = `<img src="./src/img/calendar.svg" style="width: 15px; height: 15px; margin-right: 4px; margin-top: 4px;"><h3 style="display: inline-block;">${this.date}</h3>`;
    clipTemp.querySelector('.item__view').innerHTML = `<img src="./src/img/view.svg" style="width: 15px; height: 15px; margin-right: 4px; margin-top: 4px;"><h3 style="display: inline-block;">${this.view}</h3>`;

    return clipTemp;
  }
}
