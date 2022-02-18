class DomElements {
  constructor() {
    this.init();
  }

  init() {
    this.listElem = document.querySelector('#list');
    this.inputElem = document.querySelector('.main > input');
  }

  getInputElement() {
    return this.inputElem;
  }

  getListElement() {
    return this.listElem;
  }
}

export default new DomElements();