export default class Storage {
  constructor() {
    localStorage.setItem('queue', JSON.stringify([]));
    localStorage.setItem('watched', JSON.stringify([]));
  }

  getQueue() {
    return this.#getList('queue');
  }
  getWatched() {
    return this.#getList('watched');
  }
  addQueue(id) {
    let list = this.#getList('queue');
    if (!this.inList(id, list)) {
      list.push(id);
    }
    this.#setList('queue', list);
  }
  addWatched(id) {
    let list = this.#getList('watched');
    if (!this.inList(id, list)) {
      list.push(id);
    }
    this.#setList('watched', list);
  }
  removeQueue(id) {
    let list = this.#getList('queue');
    let index = list.indexOf(id);
    if (this.inList(id, list)) {
      list.splice(index, 1);
    }
    this.#setList('queue', list);
  }
  removeWatched(id) {
    let list = this.#getList('watched');
    let index = list.indexOf(id);
    if (index !== -1) {
      list.splice(index, 1);
    }
    this.#setList('watched', list);
  }
  inList(id, list) {
    return list.indexOf(id) !== -1;
  }
  #getList(name) {
    return JSON.parse(localStorage.getItem(name));
  }
  #setList(name, list) {
    localStorage.setItem(name, JSON.stringify(list));
  }
}
