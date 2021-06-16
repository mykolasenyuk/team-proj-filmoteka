export default class Storage {
  // constructor() {
  //   localStorage.setItem('queue', JSON.stringify({}));
  //   localStorage.setItem('watched', JSON.stringify({}));
  // }

  getQueue() {
    return Object.values(this.#getList('queue'));
  }
  getWatched() {
    return Object.values(this.#getList('watched'));
  }
   addQueue(movie) {
    let list = this.#getList('queue');
    if(!list[movie.id]) {
     list[movie.id] = movie
   } else {
     delete list[movie.id]
   }

     this.#setList('queue', list);
  }
  addWatched(movie) {
    let list = this.#getList('watched');
    if(!list[movie.id]) {
      list[movie.id] = movie
    } else {
      delete list[movie.id]
     }
    this.#setList('watched', list);
  }
  removeQueue(id) {
    let list = this.#getList('queue');
    delete list[id]
     this.#setList('queue', list);
  }
  removeWatched(id) {
    let list = this.#getList('watched');
    delete list[id]
     this.#setList('watched', list);
  }
  
  #getList(name) {
     return JSON.parse(localStorage.getItem(name));
   }
   #setList(name, list) {
     localStorage.setItem(name, JSON.stringify(list));
  }
  #inQueue(id){
    return this.#getList('queue')[id]
  }
  #inWatched(id) {
    return this.#getList('watched')[id]
  }

  setMovieFlags(movie) {
    if(this.#inWatched(movie.id)) {
      movie.watched = true
    }

    if(this.#inQueue(movie.id)) {
      movie.queued = true
    }
    return movie
  }
}
